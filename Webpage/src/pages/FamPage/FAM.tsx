import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import {
  Account,
  AccountPreview,
  AccountPopoverFooter,
  SignOutButton,
  AccountPreviewProps,
} from '@toolpad/core/Account';
import type { Navigation, Router, Session } from '@toolpad/core/AppProvider';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
// import { useDemoRouter } from '@toolpad/core/internal';
import { DataGrid } from '@mui/x-data-grid';

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
        icon: <DescriptionIcon />,
      },
      {
        kind: 'page',
        segment: 'traffic',
        title: 'Загруженость',
        icon: <DescriptionIcon />,
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

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}
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

const accounts = [
  {
    id: 1,
    name: 'Админ 1',
    email: 'admin@edu.mirea.ru',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-oM39OqBCgUncMTs88Hk7fWuEPiihQaxmw&s',
    projects: [
      {
        id: 3,
        title: 'Project X',
      },
    ],
  },
  {
    id: 2,
    name: 'sdgsdf',
    email: 'dsfsfz@mdsfi.com',
    color: '#8B4513', // Brown color
    projects: [{ id: 4, title: 'Project A' }],
  },
];

function SidebarFooterAccountPopover() {
  return (
    <Stack direction="column">
      <Typography variant="body2" mx={2} mt={1}>
        Accounts
      </Typography>
      <MenuList>
        {accounts.map((account) => (
          <MenuItem
            key={account.id}
            component="button"
            sx={{
              justifyContent: 'flex-start',
              width: '100%',
              columnGap: 2,
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.95rem',
                  bgcolor: account.color,
                }}
                src={account.image ?? ''}
                alt={account.name ?? ''}
              >
                {account.name[0]}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
              primary={account.name}
              secondary={account.email}
              primaryTypographyProps={{ variant: 'body2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />
          </MenuItem>
        ))}
      </MenuList>
      <Divider />
      <AccountPopoverFooter>
        <SignOutButton />
      </AccountPopoverFooter>
    </Stack>
  );
}

const createPreviewComponent = (mini: boolean) => {
  function PreviewComponent(props: AccountPreviewProps) {
    return <AccountSidebarPreview {...props} mini={mini} />;
  }
  return PreviewComponent;
};

function SidebarFooterAccount({ mini }: SidebarFooterProps) {
  const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
  return (
    <Account
      slots={{
        preview: PreviewComponent,
        popoverContent: SidebarFooterAccountPopover,
      }}
      slotProps={{
        popover: {
          transformOrigin: { horizontal: 'left', vertical: 'bottom' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          disableAutoFocus: true,
          slotProps: {
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: (theme) =>
                  `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                mt: 1,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  bottom: 10,
                  left: 0,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translate(-50%, -50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          },
        },
      }}
    />
  );
}

interface DemoProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const demoSession = {
  user: {
    name: 'Админ 1',
    email: 'admin@edu.mirea.ru',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-oM39OqBCgUncMTs88Hk7fWuEPiihQaxmw&s',
  },
};

export default function DashboardLayoutAccountSidebar(props: DemoProps) {
  const { window } = props;

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  const demoWindow = window !== undefined ? window() : undefined;

  const [session, setSession] = React.useState<Session | null>(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => setSession(demoSession),
      signOut: () => setSession(null),
    };
  }, []);

  const rows = [
    { id: 1, user: 'Hanna Villarreal', age: 39, gender: 'Female' },
    { id: 2, user: 'Hanna Villarreal', age: 39, gender: 'Female' },
    { id: 3, user: 'Hanna Villarreal', age: 39, gender: 'Female' },
  ];

  const columns = [
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'gender', headerName: 'Gender Identity', width: 150 },
  ];

  // Получаем текущий активный путь
  const activeSegment = router.pathname.split('/').pop();

  const currentNav = NAVIGATION.find((nav) => nav.kind === 'page' && nav.segment === activeSegment);

  const renderContent = () => {
    if (activeSegment === 'sales') {
      return (
        <Box>
          <Typography variant="h5">
            Выбранная вкладка: {currentNav?.title || 'Неизвестно'}
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} checkboxSelection />
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
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Админ панель',
      }}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      authentication={authentication}
      session={session}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: SidebarFooterAccount,
        }}
      >
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}