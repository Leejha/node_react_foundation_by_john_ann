import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        const dispatch = useDispatch()

        useEffect(() => {
            const dpc = async () => {
                const response = await dispatch(authUser())
                console.log(response)

                // 로그인 x 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                }
                // 로그인 o
                else {
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    else {
                        if (!option) {
                            props.history.push('/')
                        }
                    }
                }
            }
            dpc()
        }, [])

        return < SpecificComponent /> 
    }

    return AuthenticationCheck

}
    
