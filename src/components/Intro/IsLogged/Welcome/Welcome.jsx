import './Welcome.css';
import { useEffect, useState } from 'react';
import backendUrlPath from '../../../../backendUrlPath';
export default function Welcome() {
    const [name, setName] = useState('')
    
    useEffect(() => {
        fetch(`${backendUrlPath}/api/users`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => res.json())
        .then(res => {
            setName(res.name)
        })
    }, [])
    return (
        <div className="welcome-container">
            <h1 style={{marginTop:'1.6rem', fontSize:'70px', border:'4px solid #9B7973', textAlign:'center'}} className='header'>Welcome {name}</h1>
            <p style={{fontSize:'25px', border:'4px solid #9B7973', textAlign:'center'}}>Keep track of your books!</p>
        </div>
    )
}