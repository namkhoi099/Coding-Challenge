import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { useEffect, useState } from 'react';
import { postAsync } from '../../Utils/services';

const EmployeeModal = (props) => {
    const employeeId = props.employeeId;
    const [employee, setEmployee] = useState({});


    useEffect(() => {
        const getEmployee = async () => {
            const emp = { id: employeeId };
            try {
                const res = await postAsync("employees/getemployee", emp);
                if (res)
                    setEmployee(res);
            } catch (error) {
                console.log("Error while insert data", error);
            }
        };

        if (employeeId)
            getEmployee();
    }, [employeeId])


    const inputHandler = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const btnClick = async () => {
        if (!employeeId)
            insert();
        else if (employeeId)
            update();
    }


    const update = async () => {
        try {
            const res = await postAsync("employees/update", employee);
            if (res)
                props.onHide();
        } catch (error) {
            console.log("Error while insert data", error);
        }
    };

    const insert = async () => {
        try {
            const res = await postAsync("employees/insert", employee);
            if (res)
                props.onHide();
        } catch (error) {
            console.log("Error while insert data", error);
        }
    };

    return (
        <Modal {...props} dialogClassName="modal-lg" aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Employee details
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" name="name" value={employee.name} onChange={inputHandler} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={employee.email} onChange={inputHandler} />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" name="address" value={employee.address} onChange={inputHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridPhoneNumber">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control placeholder="Enter your phone number" name="phoneNumber" value={employee.phoneNumber} onChange={inputHandler} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="button" onClick={btnClick}>Save changes</Button>
                <Button variant="secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EmployeeModal;
