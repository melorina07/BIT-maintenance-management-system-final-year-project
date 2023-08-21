import {Link} from 'react-router-dom'
import useAuthorization from "../utils/authorization";

const Nav = () => {
	const authorization = useAuthorization()

	return (
		<div className=" text-2xl font-bold ">
		<nav>
			{authorization.checkAccess("request", "read") && <Link to="/">Home</Link>}
			{authorization.checkAccess("faculity", "read") && <Link to="/Faculity">Faculity</Link>}
		</nav>
		</div>
	);
};

export default Nav