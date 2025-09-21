import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const Register = () => {
    const { userRegister, updateUserRegister, register, registerError } = useContext(AuthContext);
    return (
        <div>
            <Form onSubmit={register}>
                <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                    <Col xs={6}>
                        <Stack gap={3}>
                            <h2>Register</h2>
                            <Form.Control type="text" placeholder="Enter your name" onChange={(e) => { updateUserRegister({ ...userRegister, name: e.target.value }) }} />
                            <Form.Control type="email" placeholder="Enter your email" onChange={(e) => { updateUserRegister({ ...userRegister, email: e.target.value }) }} />
                            <Form.Control type="password" placeholder="Enter your password" onChange={(e) => { updateUserRegister({ ...userRegister, password: e.target.value }) }} />
                            <Button variant="primary" type="submit">Register</Button>

                            {
                                registerError?.error && (<Alert variant="danger"><p>{registerError.error}</p></Alert>)
                            }

                        </Stack>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Register;
