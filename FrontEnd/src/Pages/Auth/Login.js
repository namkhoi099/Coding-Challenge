import { useContext, useEffect, useState } from "react";
import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const { userLogin, updateUserLogin, login, loginError } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/');
    };
    
    return (
        <div>
            <Form onSubmit={(e) => {login(e, handleSubmit)}}>
                <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Login</h2>
                            <Form.Control type="email" placeholder="Enter your email" onChange={(e) => { updateUserLogin({ ...userLogin, email: e.target.value }) }} />
                            <Form.Control type="password" placeholder="Enter your password" onChange={(e) => { updateUserLogin({ ...userLogin, password: e.target.value }) }} />
                            <Button variant="primary" type="submit">Login</Button>
                            {
                                loginError?.error && (<Alert variant="danger"><p>{loginError.error}</p></Alert>)
                            }

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Login;
