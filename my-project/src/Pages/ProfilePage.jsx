import React, {useContext, useReducer, useState} from "react";
import {Store} from "../Store";
import {Helmet} from "react-helmet-async";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {toast} from "react-toastify";
import {getError} from "../Util";
import axios from "axios";

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_REQUEST':
            return { ...state, loadingUpdate: true};
        case 'UPDATE_SUCCESS':
            return { ...state, loadingUpdate: false};
        case 'UPDATE_FAIL':
            return { ...state, loadingUpdate: false};
        default:
            return state;
    }
};

export default function ProfilePage() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [name, setName] = useState(userInfo.name);
    const [email, setEmail] = useState(userInfo.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
        loadingUpdate: false,
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do no match");
            return;
        }
        try{
            const { data } = await axios.put(
                '/api/users/profile',
                {
                    name,
                    email,
                    password,
                },
                {
                    headers: { Authorization: `Bearer ${userInfo.token}`},
                }
            );
            dispatch({
                type: 'UPDATE_SUCCESS',
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('User updated successfully');
        } catch (err) {
            dispatch({
                type: 'FETCH_FAIL'
            });
            toast.error(getError(err));
        }
    };

    return (
        <div className={"container small-container"}>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <h1 className={"my-3"}>User Profile</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className={"mb-3"} controlId={"name"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        placeholder={"Enter Your Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"email"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder={"name@example.com"}
                        type={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"password"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder={"Enter Your Password"}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"confirmPassword"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder={"Confirm Your Password"}
                        type={"password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className={"mb-3"}>
                    <Button type={"submit"}>Update</Button>
                </div>
            </form>
        </div>
    );
}