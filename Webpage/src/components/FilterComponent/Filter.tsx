import React, { useEffect, useState } from 'react';
import { CircularProgress, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';

interface DropdownFilterProps {
  label: string; // Метка фильтра
  fetchOptions: () => Promise<string[]>; // Функция для загрузки данных
  onChange: (value: string | null) => void; // Callback для выбранного значения
  defaultValue?: string; // Опциональное значение по умолчанию
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ label, fetchOptions, onChange, defaultValue }) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue || '');

  useEffect(() => {
    setLoading(true);
    fetchOptions()
      .then((data) => {
        setOptions(data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Ошибка загрузки данных:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchOptions]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setSelectedValue(value); // Обновляем локальное состояние
    onChange(value || null); // Передаём значение в родительский компонент
  };

  return (
    <FormControl size="small" style={{ minWidth: 200, margin: 8 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={selectedValue || ''}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
            if (!selected) {
            return <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{label}</span>;
            }
            return selected;
        }}
        disabled={loading && !loaded}
        >
        {loading && !loaded ? (
            <MenuItem disabled>
            <Box display="flex" alignItems="center">
                <CircularProgress size={16} style={{ marginRight: 8 }} />
                Загрузка...
            </Box>
            </MenuItem>
        ) : [
            <MenuItem key="none" value="">
            <em>None</em>
            </MenuItem>,
            ...options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            )),
        ]}
        </Select>
    </FormControl>
  );
};

export default DropdownFilter;
