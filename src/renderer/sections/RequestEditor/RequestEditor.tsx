import { Box, makeStyles, Typography, Toolbar, TextField } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import _ from 'lodash'

import { Request, RequestStore } from '@redux/types/requests'
import { useRequestsActions } from '@redux/actions/requests'
import { getSelectedRequest } from '@redux/selectors/requests'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
  const { putRequest } = useRequestsActions()

  const [editionMode, setEditionMode] = useState(false)
  const [editedTitle, setEditedTitle] = useState<string>(request.name)

  useEffect(() => {
    setEditionMode(false);
    setEditedTitle(request.name)
  }, [request])

  const handleEditClick = () => {
    setEditionMode(true)
  }

  const handleTitleChange = (e: any) => {
    setEditedTitle(e.target.value)
  }

  const handleTitleTextFieldEnter = (e: any) => {
    if (e.key === 'Enter') {
      const newRequest = _.cloneDeep(request)
      newRequest.name = editedTitle;

      putRequest(newRequest);
    }
  }

  return (
    <Box component="div" className={classes.root}>
      <div className={classes.title}>
        {
          editionMode ? (
            <>
              <TextField label="Nombre" value={editedTitle} onChange={handleTitleChange} onKeyDown={handleTitleTextFieldEnter}/>
            </>
          ) : (
            <>
              <Typography variant="h5">
                {request.name}
              </Typography>
              <EditIcon className={classes.editIcon} onClick={handleEditClick}/>
            </>
          )
        }
      </div>
    </Box>
  )
}

export default MainSection;