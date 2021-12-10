import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
export const setUserSession = (user) => {
    sessionStorage.setItem('user', user._id);
    sessionStorage.setItem('userName', user.name);
}
function SigninScreen(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    let history = useNavigate();

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post(
            'http://localhost:8080/users/auth',
            {email: username.value, password: password.value}
        ).then(response => {
            console.log(response.data)
            setLoading(false);
            setUserSession(response.data);
            history("/")
        }).catch(error => {
            console.log(error)
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            Login<br /><br />
            <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{marginTop: 10}}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            {error && <><small style={{color: 'red'}}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'}
                onClick={handleLogin} disabled={loading} /><br />
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default SigninScreen;
