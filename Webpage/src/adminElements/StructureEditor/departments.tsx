import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { UniversalTable } from '@/components/UniversalTable/Table';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAdminDepartments } from '@/api/useAdminDepartments';

export default function DepartmentsEditor(){

    const { Departments, loading: departmentsLoading, error: departmentsError, getDepartments, addDepartment, updateDepartment, deleteDepartment } = useAdminDepartments();


    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [selectedBranch, setSelectedBranch] = React.useState<any>(null);
    const [editedBranch, setEditedBranch] = React.useState<{ name: string; address: string }>({
      name: '',
      address: '',
    });
    const [newBranch, setNewBranch] = React.useState<{ name: string; address: string }>({
      name: '',
      address: '',
    });

    const handleEditClick = (branch: any) => {
        setSelectedBranch(branch);
        setEditedBranch({
          name: branch.name || '',
          address: branch.address || '',
        });
        setOpenEditDialog(true);
      };
    
      const handleDeleteClick = (branch: any) => {
        setSelectedBranch(branch);
        setOpenDeleteDialog(true);
      };

    return (
          <Box>
            {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
            <div style={{ height: 400, width: '100%' }}>
              <UniversalTable
                columns={[
                  { label: 'Институт', key: 'name' },
                  {
                    label: 'Действия',
                    key: 'actions',
                    render: (value, row) => (
                      <>
                        <IconButton onClick={() => handleEditClick(row)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteClick(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    ),
                  },
                ]}
                data={Departments}
              />
            </div>

          </Box>
        );
}