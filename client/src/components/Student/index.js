import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Logout from '../Logout'
import './index.css'

const Student = () => {
  const studentJwtToken = Cookies.get('student_jwt_token')
  if (studentJwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <>
      <Logout />
      <h1 className="student-heading">Student</h1>
    </>
  )
}

export default Student
