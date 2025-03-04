import React, { useRef, useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiServices from '../services/apiService'
import firebase from 'firebase/compat';

export default function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const { signup, token } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault();
        if (passwordConfirmRef.current!.value !== passwordRef.current!.value) {
            console.log('password dont match'); return
        }
        try {
            setLoading(true)
            const user: any = await signup(emailRef.current!.value, passwordRef.current!.value);
            const tokenFromUser = user.user.getIdToken();
            if (tokenFromUser) {
                tokenFromUser.then( async (t: string) => {
                    await apiServices.register(t, user.user!.uid, nameRef.current!.value);
                    navigate('/');
                })
            } else {
                console.log('No token in time')
            }
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }
    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
            <div>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' required ref={emailRef}></Form.Control>
                            </Form.Group>
                            <Form.Group id='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type='text' required ref={nameRef}></Form.Control>
                            </Form.Group>
                            <Form.Group id='password'>
                                <Form.Label>password</Form.Label>
                                <Form.Control type='password' required ref={passwordRef}></Form.Control>
                            </Form.Group>
                            <Form.Group id='email'>
                                <Form.Label>password confirmation</Form.Label>
                                <Form.Control type='password' required ref={passwordConfirmRef}></Form.Control>
                            </Form.Group>
                            <Button disabled={loading} className='w-100 text-center mt-2' type='submit' >Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Already have an account?  <Link to="/login">Log in</Link>
                </div>
            </div>
        </Container>
    );
}

