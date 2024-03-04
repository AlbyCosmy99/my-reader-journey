import './Welcome.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import consts from '../../../../consts';



export default function Welcome() {
    const [name, setName] = useState('')

    useEffect(() => {
        getName()
    }, [])
    
    function getName() {
        const token = localStorage.getItem('jwt');
        if(token) {
            try {
                const payload = jwtDecode(token);
                setName(payload.name)
            } catch(error) {
                console.error("Failed to decode token", error);
                localStorage.removeItem('jwt')
                window.location.href = `${consts.getFrontendUrl()}`
            }
        }
    }

    return (
        <div className="welcome-container">
            <h1 style={{marginTop:'1.6rem', fontSize:'70px', border:'4px solid #9B7973', textAlign:'center'}} className='header'>Welcome {name}</h1>
            <p style={{fontSize:'25px', border:'4px solid #9B7973', textAlign:'center'}}>Keep track of your books!</p>
        </div>
    )
}