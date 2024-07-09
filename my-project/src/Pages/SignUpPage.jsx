import Container from "react-bootstrap/Container";
import {Helmet} from "react-helmet-async";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {Store} from "../Store";
import {toast} from "react-toastify";
import {getError} from "../Util";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {userInfo} =state;

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do no match");
            return;
        }
        try {
            const { data } = await Axios.post('/api/users/signup', {
                name,
                email,
                password,
            });
            ctxDispatch({ type: 'USER_SIGNIN', payload: data});
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');
        } catch (err) {
            toast.error(getError(err));
            // alert("Invalid Email or password")
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <Container className={"small-container"}>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <h1 className={"my-3"}>Sign Up</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className={"mb-3"} controlId={"name"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder={"Enter Your Name"} required onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"email"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        placeholder={"name@example.com"}
                        type={"email"}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"password"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        placeholder={"Enter Password"}
                        type={"password"}
                        minLength={8}
                        maxLength={16}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId={"confirmPassword"}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control placeholder={"Confirm Password"} type={"password"} required onChange={(e) => setConfirmPassword(e.target.value)}/>
                </Form.Group>
                <div className={"mb-3"}>
                    <Button type={"submit"}>Sign Up</Button>
                </div>
                <div className={"mb-3"}>
                    Already Have an Account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </Form>
        </Container>
    );
}