import React, { useCallback } from 'react'
import { Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Divider, makeStyles } from '@material-ui/core'
import { useSelector } from 'react-redux';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { getRequests, getSelectedRequest } from '@redux/selectors/requests'
import { useRequestsActions } from '@redux/actions'
import { Request, RequestStore } from '@redux/types/requests';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  }
}));

export const MyDrawer: React.FC = () => {
  const classes = useStyles();
  const requests = useSelector<RequestStore, Request[]>(getRequests);
  const selectedRequest = useSelector<RequestStore, Request>(getSelectedRequest);
  const { addRequest, selectRequest } = useRequestsActions();

  const handleAddRequest = useCallback(() => {
    addRequest({
      name: 'test',
      queue: 'yes',
      message: 'hi'
    })
  }, [addRequest])

  const handleSelectRequest = useCallback((request: Request) => {
    selectRequest(request)
  }, [selectRequest])

  return (
    <Drawer
      className={classes.root}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button onClick={handleAddRequest}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Agregar solicitud"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {requests.map((request: Request) => (
            <ListItem button className={request.id === selectedRequest?.id ? classes.selected : ''} key={request.id} onClick={() => handleSelectRequest(request)}>
              <ListItemText primary={request.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export default MyDrawer
