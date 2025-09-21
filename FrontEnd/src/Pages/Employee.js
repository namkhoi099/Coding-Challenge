import { useState, useEffect } from 'react';
import EmployeeModal from '../Components/Employee/EmployeeModal';
import Button from 'react-bootstrap/Button';
import { BsTrash, BsPencilSquare, BsFillPersonPlusFill } from "react-icons/bs";
import { postAsync } from "../Utils/services";

const Employee = () => {
    const [modalShow, setModalShow] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState(0);

    const fetchData = async () => {
        try {
            const res = await postAsync("employees/getall", {});
            setEmployees(res);
        } catch (error) {
            console.log("Error while fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [modalShow]);


    const update = async (id) => {
        setEmployeeId(id);
        setModalShow(true);
    };

    const deleteByID = async (id) => {
        try {
            const employeeDelete = {
                id: id
            }
            const res = await postAsync("employees/deletebyid", employeeDelete);
            if (res.success)
                fetchData();
        } catch (error) {
            console.log("Error while insert data", error);
        }
    };
    return (
        <div>
            <Button variant="success" type="button" onClick={() => setModalShow(true)}><BsFillPersonPlusFill /> Create Employee</Button>
            <EmployeeModal show={modalShow} employeeId={employeeId} onHide={() => setModalShow(false)} />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email} </td>
                                <td>{employee.address}</td>
                                <td>
                                    <Button variant="warning" size="sm" className="me-1" type="button" onClick={() => update(employee._id)}><BsPencilSquare /></Button>
                                    <Button variant="danger" size="sm" type="button" onClick={() => deleteByID(employee._id)}><BsTrash /></Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Employee;
