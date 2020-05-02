import React, { ReactNode } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

type BackTopBarProps = {
  children?: ReactNode;
};

export default function BackTopBar({ children }: BackTopBarProps) {
  const { goBack } = useHistory();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" onClick={goBack}>
          <ArrowBack />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  );
}
