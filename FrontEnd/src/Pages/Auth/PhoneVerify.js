import { Form, Stack, Row, Col, Button, Alert } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

const PhoneVerify = () => {
    const { isStepVerifyCode, sendPhoneAccessCode, validatePhoneAccessCode, updatePhoneVerify } = useContext(AuthContext);
    const [phoneVerify, setPhoneVerify] = useState({});

    useEffect(() => { updatePhoneVerify(phoneVerify) }, [phoneVerify])

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/employee');
    };

    if (!isStepVerifyCode)
        return (
            <div>
                <Form onSubmit={sendPhoneAccessCode}>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Col sm="12">
                            <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                                <Col xs={6}>
                                    <Stack gap={3}>
                                        <h2>Sign In</h2>
                                        <Form.Control value={phoneVerify?.phoneNumber} placeholder="Enter your phone" onChange={(e) => { setPhoneVerify({ phoneNumber: e.target.value }) }} />
                                        <Button variant="primary" type="submit">Next</Button>
                                        {/* {
                                registerError?.error && (<Alert variant="danger"><p>{registerError.error}</p></Alert>)
                            } */}

                                    </Stack>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                </Form>
            </div>
        );
    else
        return (
            <div>
                <Form onSubmit={(e) => { validatePhoneAccessCode(e, handleSubmit) }}>
                    <Row style={{ height: "100vh", justifyContent: "center", paddingTop: "10%" }}>
                        <Col xs={6}>
                            <Stack gap={3}>
                                <h2>Phone verification</h2>
                                <Form.Control value={phoneVerify?.accessCode} placeholder="Enter your access code" onChange={(e) => { setPhoneVerify({ ...phoneVerify, accessCode: e.target.value }) }} />
                                <Button variant="primary" type="submit">Submit</Button>
                                {/* {
                                registerError?.error && (<Alert variant="danger"><p>{registerError.error}</p></Alert>)
                            } */}

                            </Stack>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
}

export default PhoneVerify;
