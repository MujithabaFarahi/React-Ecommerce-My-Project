import Container from "react-bootstrap/Container";
import {Helmet} from "react-helmet-async";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";

export default function SignUpPage() {
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <Container className={"small-container"}>
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className={"my-3"}>Sign Up</h1>
            <Form>
                <Form.Group className={"mb-3"} controlId={"name"}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type={"email"} required/>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId={"email"}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type={"email"} required/>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId={"password"}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type={"password"} required/>
                </Form.Group>

                <Form.Group className={"mb-3"} controlId={"confirmPassword"}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type={"password"} required/>
                </Form.Group>

                <div className={"mb-3"}>
                    <Button type={"submit"}>Sign Up</Button>
                </div>
                <div className={"mb-3"}>
                    Already have an account?{' '}
                    <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
            </Form>
        </Container>
    )
}