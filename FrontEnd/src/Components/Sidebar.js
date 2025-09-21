import { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom"
import { AuthContext } from "../Context/AuthContext";
import { getStorage } from "../Utils/services";

const Sidebar = () => {
    const { logout } = useContext(AuthContext);
    const [user, setUser] = useState({});
    useEffect(() => {
        const user = getStorage("user");
        setUser(user);
    }, []);
    return (
        <div>
            <Navbar bg="dark" className="mn-4" style={{ height: "3.75rem" }}>
                <Container>
                    <h2>
                        <Link to="/" className="link-light text-decoration-none">
                            Employee Task</Link>
                    </h2>
                    <Nav>
                        <Stack direction="horizontal" gap={3}>
                            {
                                user && (
                                    <Link onClick={() => logout()} to="/login" className="link-light text-decoration-none">
                                        Logout
                                    </Link>)
                            }
                            {
                                !user && (
                                    <div>
                                        <Link to="/login" className="link-light text-decoration-none me-2">
                                            Employee Login
                                        </Link>
                                        <Link to="/phoneverify" className="link-light text-decoration-none">
                                            Owner Login
                                        </Link>
                                    </div>
                                )
                            }
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Sidebar;
