import { combineReducers } from 'redux'

import credentials from './credentials'
import requests from './requests'

export default combineReducers({ credentials, requests })