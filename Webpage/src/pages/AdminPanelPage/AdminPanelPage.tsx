import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  SignOutButton,
  AccountPreviewProps,
} from '@toolpad/core/Account';
import type { Navigation, Router, Session } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LayersIcon from '@mui/icons-material/Layers';
import CustomPaginationActionsTable from '../../components/TableData/TableData'
import TableTest from '../../components/TableTest/TableTest'
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Основное',
  },
  {
    kind: 'page',
    segment: 'dashboard',
    title: 'Рассписание',
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Сведения',
  },
  {
    kind: 'page',
    segment: 'reports',
    title: 'Статистика',
    icon: <BarChartIcon />,
    children: [
      {
        kind: 'page',
        segment: 'sales',
        title: 'Посещаемость',
        icon: <TableChartIcon />,
      },
      {
        kind: 'page',
        segment: 'traffic',
        title: 'Загруженость',
        icon: <TableChartIcon />,
      },
      {
        kind: 'page',
        segment: 'degree',
        title: 'Успеваемость',
        icon: <TableChartIcon />,
      },
    ],
  },
  {
    kind: 'page',
    segment: 'integrations',
    title: 'Помощь',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
  const { handleClick, open, mini } = props;
  return (
    <Stack direction="column" p={0} overflow="hidden">
      <Divider />
      <AccountPreview
        variant={mini ? 'condensed' : 'expanded'}
        handleClick={handleClick}
        open={open}
      />
    </Stack>
  );
}

function SidebarFooterAccountPopover() {
  return (
    <SignOutButton />
  );
}

// const createPreviewComponent = (mini: boolean) => {
//   function PreviewComponent(props: AccountPreviewProps) {
//     return <AccountSidebarPreview {...props} mini={mini} />;
//   }
//   return PreviewComponent;
// };


// TODO: вместо трех точек в плашке админа сделать кнопку выхода из аккаунта!!!!!!!!
// TODO: вместо трех точек в плашке админа сделать кнопку выхода из аккаунта!!!!!!!!
// TODO: вместо трех точек в плашке админа сделать кнопку выхода из аккаунта!!!!!!!!

function SidebarFooterAccount({
  onSignOut,
  onProfileClick,
  onSignIn,
  session,
}: SidebarFooterProps & {
  onSignOut: () => void;
  onProfileClick: () => void;
  onSignIn: () => void;
  session: Session | null;
}) {
  return (
    <Box p={2}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {session ? (
          <>
            {/* User Profile Display */}
            <Box onClick={onProfileClick} sx={{ cursor: 'pointer' }}>
              <AccountPreview variant="expanded" />
            </Box>
            {/* Sign-Out Icon */}
            <Tooltip title="Выйти">
              <IconButton onClick={onSignOut} color="error" aria-label="Выйти">
                <PowerSettingsNewIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          /* Sign-In Button */
          <Tooltip title="Войти">
            <Button
              variant="text"
              startIcon={<LoginIcon />}
              onClick={onSignIn}
              color="primary"
              aria-label="Войти"
              sx={{
                justifyContent: 'flex-start',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)', // Optional: Hover effect
                },
              }}
            >
              Войти
            </Button>
          </Tooltip>
        )}
      </Stack>
    </Box>
  );
}




interface DemoProps {
  window?: () => Window;
}

const demoSession: Session = {
  user: {
    name: 'Админ 1',
    email: 'admin@edu.mirea.ru',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-oM39OqBCgUncMTs88Hk7fWuEPiihQaxmw&s',
  },
};

export default function DashboardLayoutAccountSidebar(props: DemoProps) {
  const { window } = props;

  // State Management
  const [pathname, setPathname] = React.useState('/adminpanel');
  const [session, setSession] = React.useState<Session | null>(demoSession);
  const [showAdminInfo, setShowAdminInfo] = React.useState(false);

  // Router Setup
  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  // Handlers
  const handleSignOut = () => {
    setSession(null);
  };

  const handleSignIn = () => {
    setSession(demoSession);
  };

  const activeSegment = router.pathname.split('/').pop();

  const handleProfileClick = () => {
    if (session) {
      setShowAdminInfo(!showAdminInfo);
    }
  };

  const currentNav = NAVIGATION.find(
    (nav) => nav.kind === 'page' && nav.segment === activeSegment
  );

  // Reset states on pathname change
  React.useEffect(() => {
    setShowAdminInfo(false);
  }, [pathname]);

  // Content Rendering
  const renderContent = () => {
    if (showAdminInfo && session?.user) {
      return (
        <Box>
          <Typography variant="h5">Информация об администраторе</Typography>
          <Typography>Имя: {session.user.name}</Typography>
          <Typography>Email: {session.user.email}</Typography>
        </Box>
      );
    }

    if (activeSegment === 'sales') {
      return (
        <Box>
          <Typography variant="h5">
            Выбранная вкладка: {currentNav?.title || 'Неизвестно'}
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <CustomPaginationActionsTable />
          </div>
        </Box>
      );
    }

    if (activeSegment === 'degree') {
      return (
        <Box>
          <Typography variant="h5">
            Выбранная вкладка: {currentNav?.title || 'Неизвестно'}
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <TableTest />
          </div>
        </Box>
      );
    }

    return (
      <Typography variant="body1">
        {`Текущая страница: ${currentNav?.title || 'Неизвестно'}`}
      </Typography>
    );
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: (
          <img src="https://mui.com/static/logo.png" alt="MUI logo" />
        ),
        title: 'Админ панель',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={{
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
      session={session}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: () => (
            <SidebarFooterAccount
              onSignOut={handleSignOut}
              onProfileClick={handleProfileClick}
              onSignIn={handleSignIn}
              session={session}
            />
          ),
        }}
      >
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}


