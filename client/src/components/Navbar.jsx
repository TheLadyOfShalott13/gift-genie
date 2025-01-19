import '../styles/navbar.css'
import { useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../authContext"


const Navbar = () => {

    const navigate = useNavigate()

    const { user, dispatch } = useContext(AuthContext)
    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" });
        navigate("/")
    }
    return (
        <div className='navContainer'>
            <Link to="/">
                <p className='navLogo'>Gifts Manager</p>
            </Link>

            <input type="checkbox" id='menu-bar' />
            <label htmlFor="menu-bar">
                <FontAwesomeIcon
                    icon={faBars}
                    className="icon" />
            </label>
            <nav className='navbar'>
                <ul>
                    <Link to="/GiftRequests">
                        <li><p>Gift Requests</p></li>
                    </Link>
                    <Link to="/gifts">
                        <li><p>Gifts</p></li>
                    </Link>
                    <Link to="/interests">
                        <li><p>Interests</p></li>
                    </Link>
                    <Link to="/persons">
                        <li><p>Persons</p></li>
                    </Link>
                    {user ? (<>

                        <Link to={`/user/${user._id}`}>
                            <li onClick={handleClick}
                                style={{ cursor: "pointer" }}>
                                <p>Logout</p>
                            </li>
                            <li id="usernamename"><p>{user.username}</p></li>
                        </Link>
                    </>
                    ) :
                        (
                            <>
                                <Link to="/register">
                                    <li><p>Register</p></li>
                                </Link>
                                <Link to="/login">
                                    <li><p>Login</p></li>
                                </Link>
                            </>
                        )}
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
