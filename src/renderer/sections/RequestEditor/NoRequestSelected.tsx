import React from 'react';
import { Box, makeStyles, Typography, Toolbar } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '100%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

const MainSection: React.FC = () => {

  const classes = useStyles();

  return (
    <Box component="div" className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h4">
          Selecciona una solicitud
        </Typography>
      </div>
    </Box>
  )
}

export default MainSection;