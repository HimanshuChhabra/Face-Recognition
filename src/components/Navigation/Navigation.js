import React from 'react'

const Navigation = ({ onRouteChange , isSignedIn}) => {
    if(isSignedIn){
        return (
            <nav style ={{display : 'flex', justifyContent: 'flex-end'}}> 
                <p className = 'f4 link dim black underline pa3 pointer grow '
                onClick = {() => onRouteChange('signout')}
                >
                Sign out
                </p>
            </nav>
        );
    } else {
        return (
            <nav style ={{display : 'flex', justifyContent: 'flex-end'}}> 
                <p className = 'f4 link dim black underline pa3 pointer grow '
                onClick = {() => onRouteChange('signin')}
                >
                Signin
                </p>
                <p className = 'f4 link dim black underline pa3 pointer grow '
                onClick = {() => onRouteChange('register')}
                >
                Register
                </p>
            </nav>
        );
    }
    
}

export default Navigation;