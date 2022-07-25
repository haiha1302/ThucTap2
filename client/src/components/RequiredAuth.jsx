import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { checkUser } from '../redux/slice/userSlice'

const RequiredAuth = (props) => {
    const user = useSelector(state => state.User.inforUserLogin)
    const mode = props.mode || 'navigate'
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser())
    }, [])

    if (!user) {
        if (mode === 'navigate') {
            return <Navigate to='/login' replace={true} /> 
        }

        if (mode === 'hidden') {
            return null
        }

        if (mode === 'fallback') {
            return <p>This is private area. User should log in to see this.</p>
        }
        
        return null
    }

    return (
        props.children
    )
}

export default RequiredAuth