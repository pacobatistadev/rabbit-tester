import { Box, makeStyles, Typography, Toolbar } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { getSelectedRequest } from '@redux/selectors/requests'
import { Request, RequestStore } from '@redux/types/requests'

import NoRequestSelected from './RequestEditor/NoRequestSelected'
import RequestEditor from './RequestEditor/RequestEditor'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
  },
  headerWrapper: {
    flex: '0 0 auto',
  },
  contentWrapper: {
    flex: '1 1 auto',
    overflow: 'auto'
  },
  content: {
    flex: '0 0 auto',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    "& > *": {
      margin: theme.spacing(0, 1, 0, 0),
      color: theme.palette.grey[700]
    }
  },
  editIcon: {
    cursor: 'pointer'
  }
}))

const MainSection: React.FC = () => {

  const classes = useStyles();

  const request = useSelector<Request, RequestStore>(getSelectedRequest)

  return (
    <Box component="main" className={classes.root}>
      <div className={classes.headerWrapper}>
        <Toolbar />
      </div>
      <div className={classes.contentWrapper}>
        <div className={classes.content}>
          {
            request ? (
              <RequestEditor />
            ) : (
              <NoRequestSelected />
            )
          }
        </div>
      </div>
    </Box>
  )
}

export default MainSection;