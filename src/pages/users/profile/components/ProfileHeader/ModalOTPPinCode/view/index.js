// ** React Imports
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Store & Actions
import { getUser } from '../store/action'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserInfoCard from './UserInfoCard'
import UserTimeline from './UserTimeline'
// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = props => {
  // ** Vars
  const store = useSelector(state => state.users),
    dispatch = useDispatch(),
    { id } = useParams()

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getUser(parseInt(id)))
  }, [dispatch])

  return store.selectedUser !== null && store.selectedUser !== undefined ? (
    <div className='app-user-view'>
      <Row>
        <Col md='12'>
          <UserInfoCard selectedUser={store.selectedUser} />
        </Col>
      </Row>
      <Row>
          <Col md='12'>
              <UserTimeline />
          </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/apps/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
