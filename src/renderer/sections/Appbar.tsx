import { makeStyles, AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const MyAppBar: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Clipped drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar;
