import { useDispatch } from 'react-redux'
import { requests as AT } from '../types/actionTypes'
import { Request } from '../types/requests'

export const useRequestsActions = () => {
  const dispatch = useDispatch()

  return {
    addRequest: (payload: Request) => dispatch({ type: AT.ADD_REQUEST, payload }),
    putRequest: (payload: Request) => dispatch({ type: AT.PUT_REQUEST, payload }),
    deleteRequest: (payload: Request) => dispatch({ type: AT.DELETE_REQUEST, payload }),
    selectRequest: (payload: Request) => dispatch({ type: AT.SELECT_REQUEST, payload }),
  }
}