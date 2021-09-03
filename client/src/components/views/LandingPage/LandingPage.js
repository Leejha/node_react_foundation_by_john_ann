import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage(props) {
    const apiUrl = 'https://5000-turquoise-rhinoceros-aapmw8m3.ws-us16.gitpod.io';

    const onClickhandler = () => {
        const reqUrl = apiUrl + '/api/users/logout';
        axios.get(reqUrl)
            .then( response => {
                if (response.data.success) {
                    props.history.push('/login');
                }
                else {
                    alert('로그아웃에 실패하였습니다.')
                }
            })
    }

    // useEffect(() => {
    //     axios.get('https://5000-turquoise-rhinoceros-aapmw8m3.ws-us16.gitpod.io/api/hello')
    //     .then(response => console.log(response.data))
    
    // }, [])
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

export default LandingPage
