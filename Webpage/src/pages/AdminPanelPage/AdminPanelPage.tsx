import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import EventIcon from '@mui/icons-material/Event';
import BusinessIcon from '@mui/icons-material/Business';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BarChartIcon from '@mui/icons-material/BarChart';
import InsightsIcon from '@mui/icons-material/Insights';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SpeedIcon from '@mui/icons-material/Speed';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { AccountPreview, SignOutButton } from '@toolpad/core/Account';
import type { Navigation, Router, Session } from '@toolpad/core/AppProvider';
import CustomPaginationActionsTable from '../../components/TableData/TableData';
import TableTest from '../../components/TableTest/TableTest';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Основное' },
  { kind: 'page', segment: 'dashboard', title: 'Расписание', icon: <EventIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Сведения' },
  {
    kind: 'page',
    segment: 'room-management',
    title: 'Управление помещениями',
    icon: <BusinessIcon />, 
    children: [
      {
        kind: 'page',
        segment: 'classrooms',
        title: 'Аудитории',
        icon: <MeetingRoomIcon />, 
        children: [
          { kind: 'page', segment: 'state1', title: 'Состояние', icon: <AssignmentTurnedInIcon /> },
          { kind: 'page', segment: 'monitoring1', title: 'Мониторинг', icon: <VisibilityIcon /> },
          { kind: 'page', segment: 'access1', title: 'Доступы', icon: <VpnKeyIcon /> },
        ],
      },
      {
        kind: 'page',
        segment: 'premises',
        title: 'Помещения',
        icon: <ApartmentIcon />, 
        children: [
          { kind: 'page', segment: 'monitoring2', title: 'Мониторинг', icon: <VisibilityIcon /> },
          { kind: 'page', segment: 'access2', title: 'Доступы', icon: <VpnKeyIcon /> },
        ],
      },
    ],
  },
  {
    kind: 'page',
    segment: 'education-management',
    title: 'Управление обучением',
    icon: <AccessibleForwardIcon />, 
    children: [
      {
        kind: 'page',
        segment: 'classrooms',
        title: 'Ученики',
        children: [
          { kind: 'page', segment: 'state3', title: 'Список', icon: <FormatListBulletedIcon /> },
          { kind: 'page', segment: 'monitoring3', title: 'Успеваемость', icon: <BarChartIcon /> },
        ],
      },
    ],
  },
  {
    kind: 'page',
    segment: 'reports',
    title: 'Статистика',
    icon: <InsightsIcon />, 
    children: [
      { kind: 'page', segment: 'sales', title: 'Посещаемость', icon: <AssignmentIndIcon /> },
      { kind: 'page', segment: 'traffic', title: 'Загруженность', icon: <SpeedIcon /> },
      { kind: 'page', segment: 'degree', title: 'Успеваемость', icon: <EmojiEventsIcon /> },
    ],
  },
  { kind: 'page', segment: 'integrations', title: 'Помощь', icon: <HelpOutlineIcon /> },
];

const customTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#2A4364',
          paper: '#112E4D',
        },
        text: {
          primary: '#FFFFFF', // White text for primary
          secondary: '#FFFFFF', // White text for secondary
        },
        action: {
          active: '#FFFFFF', // White color for active icons
        },
        common: {
          white: '#000000',
        }
      },
    },
    dark: true,
  },
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

function SidebarFooterAccount({ onSignOut, onProfileClick, onSignIn, session }: SidebarFooterProps & {
  onSignOut: () => void;
  onProfileClick: () => void;
  onSignIn: () => void;
  session: Session | null;
}) {
  return (
    <Box p={2} sx={{ position: 'sticky', bottom: 0, width: '100%', backgroundColor: 'background.paper', zIndex: 1, boxShadow: 1 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {session ? (
          <>
            <Box onClick={onProfileClick} sx={{ cursor: 'pointer' }}>
              <AccountPreview variant="expanded" />
            </Box>
            <Tooltip title="Выйти">
              <IconButton onClick={onSignOut} color="primary" aria-label="Выйти">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
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
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
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

const demoSession: Session = {
  user: {
    name: 'Админ 1',
    email: 'admin@edu.mirea.ru',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-oM39OqBCgUncMTs88Hk7fWuEPiihQaxmw&s',
  },
};

interface NavigationItem {
  kind: 'header' | 'page' | 'divider';
  title: string;
  segment?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

type Navigation = NavigationItem[];



export default function DashboardLayoutAccountSidebar() {
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

  // Handlers
  const handleSignOut = () => setSession(null);
  const handleSignIn = () => setSession(demoSession);
  const handleProfileClick = () => setShowAdminInfo((prev) => !prev);

  const activeSegment = router.pathname.split('/').pop();
  
  function findCurrentNav(navItems: Navigation, segment: string): NavigationItem | null {
    for (const item of navItems) {
      if (item.segment === segment) {
        return item; // Нашли элемент с точным совпадением сегмента
      }
      if (item.children) {
        const found = findCurrentNav(item.children, segment);
        if (found) {
          return found;
        }
      }
    }
    return null; // Если ничего не нашли
  }


  React.useEffect(() => {
    setShowAdminInfo(false);
  }, [pathname]);

  // Content Rendering
  const renderContent = () => {
    const currentNav = activeSegment ? findCurrentNav(NAVIGATION, activeSegment) : null;

    if (showAdminInfo && session?.user) {
      return (
        <Box>
          <Typography variant="h5">Информация об администраторе</Typography>
          <Typography>Имя: {session.user.name}</Typography>
          <Typography>Email: {session.user.email}</Typography>
        </Box>
      );
    }

    switch (activeSegment) {
      case 'sales':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <CustomPaginationActionsTable />
            </div>
          </Box>
        );
      case 'degree':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <TableTest />
            </div>
          </Box>
        );
        case 'degree':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <TableTest />
            </div>
          </Box>
        );
      default:
        return <Typography variant="body1">Текущая страница: {currentNav?.title || 'Неизвестно'}</Typography>;
    }
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'Админ панель',
      }}
      router={router}
      theme={customTheme}
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
