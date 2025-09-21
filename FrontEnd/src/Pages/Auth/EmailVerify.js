import { useNavigate, useParams } from "react-router";
import { useState } from 'react';
import { postAsync } from "../../Utils/services";
import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap";

const EmailVerify = () => {
    const { token } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleEmailVerify = async (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword)
            return;

        const body = {
            token: token,
            userName: user.userName,
            password: user.password
        }
        const res = await postAsync('employees/verifyemail', body);
        if (res)
            navigate('/login');
    }

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    return (
        <div>
            <Form onSubmit={handleEmailVerify}>
                <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Email Verfication</h2>

                            <Form.Group className="mb-2" controlId="formUserName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="userName" onChange={inputHandler} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={inputHandler} />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="formConfirmPassword">
                                <Form.Label>Confirm password</Form.Label>
                                <Form.Control type="password" name="confirmPassword" onChange={inputHandler} />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default EmailVerify;
