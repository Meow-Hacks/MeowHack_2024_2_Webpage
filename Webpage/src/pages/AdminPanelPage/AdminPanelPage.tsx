import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout, SidebarFooterProps } from '@toolpad/core/DashboardLayout';
import { AccountPreview, SignOutButton } from '@toolpad/core/Account';
import type { Navigation, Router, Session } from '@toolpad/core/AppProvider';
import CustomPaginationActionsTable from '../../components/TableData/TableData';
import TableTest from '../../components/TableTest/TableTest';
import DropdownFilter from '@/components/FilterComponent/Filter';
import { UniversalTable } from '@/components/UniversalTable/Table';
import { useAuth } from '../../api/useAuth';
import { useNavigate } from 'react-router-dom';
import { useAdminBranches } from '../../api/useAdminBranches';
import { useAdminInstitutes } from '@/api/useAdminInstitutes';
import { useAdminGroups } from '@/api/useAdminGroups';
import { useAdminLessons } from '@/api/useAdminLessons';


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

function SidebarFooterAccount({
  onProfileClick,
  isSidebarCollapsed,
}: {
  onProfileClick: () => void;
  isSidebarCollapsed: boolean;
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Функция выхода из аккаунта
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (err) {
      setError('Ошибка авторизации');
      setOpen(true);
      console.error('Ошибка авторизации:', err);
    }
  };

  return (
    <Box
      p={2}
      sx={{
        position: 'sticky',
        bottom: 0,
        width: '100%',
        backgroundColor: 'background.paper',
        zIndex: 1,
        boxShadow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={isSidebarCollapsed ? 0 : 1}
      >
        <>
          <Box
            onClick={onProfileClick}
            sx={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <AccountPreview variant={isSidebarCollapsed ? "condensed" : "expanded"} />
          </Box>
          {!isSidebarCollapsed && (
            <Tooltip title="Выйти">
              <IconButton onClick={handleLogout} color="primary" aria-label="Выйти">
                <ExitToAppIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
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

const columns = [
  { label: 'Аудитория', key: 'name' },
  { label: 'Описание', key: 'hours' },
  { label: 'Статус', key: 'status' },
];

const data = [
  { name: 'А-10', hours: 12, status: 'занят' },
  { name: 'А-11', hours: 24, status: 'свободен' },
  { name: 'А-12', hours: 32, status: 'зарезервирован' },
];

interface NavigationItem {
  kind: 'header' | 'page' | 'divider';
  title: string;
  segment?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
}

type Navigation = NavigationItem[];

export default function DashboardLayoutAccountSidebar() {
  const { branches, loading: branchesLoading, error: branchesError, getBranches, addBranch, updateBranch, deleteBranch } = useAdminBranches();
  const { Institutes, loading: institutesLoading, error: institutesError, getInstitutes, addInstitute, updateInstitute, deleteInstitute } = useAdminInstitutes();
  const { groups, loading: groupsLoading, error: groupsError, getGroups, getGroupById, addGroup, updateGroup, deleteGroup } = useAdminGroups();
  const { Lessons, loading: lessonsLoading, error: lessonsError, getLessons, getLessonById, addLesson, updateLesson, deleteLesson } = useAdminLessons();

  const fetchCities = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  };

  // Преобразуем данные для фильтра
  const fetchGroups = async () => {
    if (!groups) return [];
    return groups.map((group) => group.group_code);
  };
  const fetchInstitutes = async () => {
    if (!Institutes) return [];
    return Institutes.map((institute) => institute.name);
  };
  // State Management
  const [pathname, setPathname] = React.useState('/adminpanel');
  const [session, setSession] = React.useState<Session | null>(demoSession);
  const [showAdminInfo, setShowAdminInfo] = React.useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleIconClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.getAttribute('data-testid') === 'MenuIcon') {
        console.log('Клик по MenuOpenIcon');
        setIsSidebarCollapsed(false);
      } else if (target.getAttribute('data-testid') === 'MenuOpenIcon') {
        console.log('Клик по MenuIcon');
        setIsSidebarCollapsed(true);
      }
    };
    document.addEventListener('click', handleIconClick);
    return () => {
      document.removeEventListener('click', handleIconClick);
    };
  }, []);

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
    console.log(branches)
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
      case 'dashboard':
        return (
          <Box>
            <div style={{ height: 400, width: '100%' }}>
              <Box padding={2}>
                <DropdownFilter
                  label="Факультет"
                  fetchOptions={fetchInstitutes}
                  onChange={(value) => console.log('Выбран институт:', value)}
                />
                <DropdownFilter
                  label="Группа"
                  fetchOptions={fetchGroups}
                  onChange={(value) => console.log('Выбрана страна:', value)}
                />
              </Box>
              <UniversalTable columns={[{ label: 'Предмет', key: 'subject_id' }, { label: 'Группа', key: 'group_id' }, { label: 'Аудитория', key: 'auditory_id' }, { label: 'Начало', key: 'start_time' }, { label: 'Конец', key: 'end_time' }]}
                data={Lessons} />
            </div>
          </Box>
        );
      case 'state1':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Пу пу пууу</h3>
              <UniversalTable columns={columns} data={data} />
            </div>
          </Box>
        );
      case 'monitoring1':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Заварю ка</h3>
              <UniversalTable columns={columns} data={data} />
            </div>
          </Box>
        );
      case 'access1':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Кофейку</h3>
              <UniversalTable columns={columns} data={data} />
            </div>
          </Box>
        );
      case 'monitoring2':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>На</h3>
              <UniversalTable columns={[{ label: 'Филиал', key: 'name' }, { label: 'Адрес', key: 'address' },]}
                data={branches} />
              <UniversalTable columns={[{ label: 'Институт', key: 'name' }, { label: 'Филиал', key: 'branch_name' },]}
                data={
                  Institutes.map((institute) => {
                    const branch = branches.find((b) => b.id == institute.branch_id);
                    return {
                      ...institute,
                      branch_name: branch ? branch.name : 'Не найдено', // Название филиала или сообщение о том, что он не найден
                    };
                  })} />
            </div>
          </Box>
        );
      case 'access2':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Папей</h3>
              <UniversalTable columns={columns} data={data} />
            </div>
          </Box>
        );
      case 'state3':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Галочка, ты</h3>
              <UniversalTable columns={columns} data={data} />
            </div>
          </Box>
        );
      case 'monitoring3':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Щас умрешь</h3>
              <UniversalTable columns={columns} data={data} />
            </div>
          </Box>
        );
      case 'sales':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <CustomPaginationActionsTable />
            </div>
          </Box>
        );
      case 'traffic':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <h3>Абоба</h3>
              <UniversalTable columns={columns} data={data} />
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
      case 'integrations':
        return (
          <Box>
            <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography>
            <div style={{ height: 400, width: '100%' }}>
              <br /><h3 style={{ fontSize: 40 }}>Бог с вами</h3>
              <h3 style={{ fontSize: 13 }}>ещё не закончил</h3>
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
        signIn: handleSignIn,                                            //////////////////////////////////
        signOut: handleSignOut,
      }}
      session={session}
    >
      <DashboardLayout
        slots={{
          toolbarAccount: () => null,
          sidebarFooter: () => (
            <SidebarFooterAccount
              onProfileClick={handleProfileClick}
              isSidebarCollapsed={isSidebarCollapsed}
            />
          ),
        }}
      >
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}
