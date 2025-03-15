import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, initialState } from '../../redux/features/Auth/userSlice'
import { apiSignIn, apiSignOut } from '../../services/AuthService'
import { onSignInSuccess, onSignOutSuccess } from '../../redux/features/Auth/sessionSlice'
import appConfig from '../../configs/app.config'
import { REDIRECT_URL_KEY } from '../../constants/App'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const query = useQuery()
    const { token, signedIn } = useSelector((state) => state.auth.session)
    const [loading, setLoading] = useState(false)

    const signIn = async (values) => {
        setLoading(true)
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(onSignInSuccess(token))
                if (resp.data.user) {
                    dispatch(setUser(resp.data.user || {
                        avatar: '',
                        userName: '',
                        fullName: '',
                        authority: ['USER'],
                        email: ''
                    }))
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
                return {
                    status: 'success',
                    message: 'Đăng nhập thành công'
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = () => {
        dispatch(onSignOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        setLoading(true)
        try {
            await apiSignOut()
            handleSignOut()
        } finally {
            setLoading(false)
        }
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signOut,
        loading
    }
}

export default useAuth