import React, {useEffect} from 'react';
import axios from 'axios';
import { withRouter }  from 'react-router-dom';

function LandingPage(props) {
    const apiUrl = 'https://5000-turquoise-rhinoceros-aapmw8m3.ws-us16.gitpod.io';

    const onClickhandler = () => {
        const reqUrl = apiUrl + '/api/users/logout';

        const push = async () => {
            const response = await axios.get(reqUrl)
            if (response.data.success) {
                props.history.push('/login');
            }
            else {
                alert('로그아웃에 실패하였습니다.')
            }
        }
        push()
    }

    return (
        <div style = {{
            display : 'flex', justifyContent: 'center', alignItems : 'center',
            width : '100%', height : '100vh'
        }}>
            <h2>
                시작 페이지
            </h2>
            <button  onClick = { onClickhandler }>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage) 
