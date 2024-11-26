import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';


export default function HelpPage(){
    return (
        <Box>
          {/* <Typography variant="h5">Выбранная вкладка: {currentNav?.title || 'Неизвестно'}</Typography> */}
          <div style={{ height: 400, width: '100%' }}>
            <br /><h3 style={{ fontSize: 40 }}>Бог с вами</h3>
            <h3 style={{ fontSize: 13 }}>ещё не закончил</h3>
          </div>
        </Box>
      );
}
