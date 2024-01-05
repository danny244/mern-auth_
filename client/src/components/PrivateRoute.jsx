/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ component: component, ...rest }) {
  const { currentUser } = useSelector((state) => state.user);

  // so what we did down here is that if currentuser is true we show the children of the components in the app.jsx using the OUTLET component else when the link is clicked it will direct us to the sign in
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
export default PrivateRoute;
