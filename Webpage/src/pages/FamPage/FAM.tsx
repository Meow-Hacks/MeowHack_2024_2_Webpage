/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
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

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;
  const router = useDemoRouter('/dashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  const rows = [
    { id: 1, user: 'Hanna Villarreal', age: 39, gender: 'Female' },
    { id: 2, user: 'Hanna Villarreal', age: 39, gender: 'Female' },
    { id: 3, user: 'Hanna Villarreal', age: 39, gender: 'Female' }
  ];

  const columns = [
    { field: 'user', headerName: 'User', width: 150 },
    { field: 'age', headerName: 'Age', width: 100 },
    { field: 'gender', headerName: 'Gender Identity', width: 150 },
  ];

  // Получаем текущий активный путь
  const activeSegment = router.pathname.split('/').pop();

  const currentNav = NAVIGATION.flatMap((nav) =>
    'segment' in nav && nav.segment === activeSegment ? nav : []
  )[0];

  const renderContent = () => {
    if (activeSegment === 'sales') {
      return (
        <>
          <Typography variant="h5">
            Выбранная вкладка: {currentNav?.title || 'Неизвестно'}
          </Typography>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} checkboxSelection />
          </div>
        </>
      );
    }

    return (
      <Typography variant="h5">
        Выбранная вкладка: {currentNav?.title || 'Неизвестно'}
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
    >
      <DashboardLayout>
        {renderContent()}
      </DashboardLayout>
    </AppProvider>
  );
}
