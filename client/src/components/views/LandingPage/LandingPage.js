import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('https://5000-turquoise-rhinoceros-aapmw8m3.ws-us16.gitpod.io/api/hello')
        .then(response => console.log(response.data))
    
    }, [])
    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
