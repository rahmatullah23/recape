import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { userContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const LoginManager = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo : '',
    })
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const handleBlur = (e) => {
        console.log(e.target.name, e.target.value);
        // debugger;
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const hasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && hasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }

    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    console.log(res)
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserInfo(user.name,user.photo)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then((res) => {
                const signOut = {
                    isSignIn: false,
                    name: '',
                    email: '',
                    password: '',
                    success: false,
                    error: '',
                    photo: ''
                }
                setUser(signOut);
            }).catch((error) => {
                // An error happened.
            });
    }
    const updateUserInfo = (name,photo) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
            photoURL: "https://via.placeholder.com/150/771796"
        }).then(function () {
            console.log('update successfully')
        }).catch(function (error) {
            console.log(error)
        });
    }

    return (
        <div class="App">
            <h3>RS Auth System</h3>
            <button onClick={handleSignOut}>SignOut</button>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} id="switchForm" name="switchForm" />
            <label htmlFor="switchForm">New User</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input name="name" onBlur={handleBlur} type="text" placeholder="name" />}
                <br />
                <input name="email" onBlur={handleBlur} type="text" placeholder="email" />
                <br />
                <input name="password" onBlur={handleBlur} type="password" placeholder="password" />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            {
                user.error && <p style={{ color: 'red' }}>{user.error}</p>
            }
            {
                user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'login'}successfully</p>
            }
        </div>
    );
};

export default LoginManager;