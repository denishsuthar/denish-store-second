import React, {useState} from 'react';
import "./Header.css";
import { SpeedDial, SpeedDialAction } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Backdrop } from '@mui/material';
import { useHistory} from 'react-router-dom';
import { logout } from '../../../actions/UserAction';
import { useDispatch, useSelector } from 'react-redux';

const UserOptions = ({user}) => {
  const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
      ];

      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
      
      function dashboard() {
        history.push("/admin/dashboard");
      }
      function orders() {
        history.push("/orders");
      }
      function account() {
        history.push("/account");
      }
      function cart() {
        history.push("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert("Logout Successfully");
      }


  return (
    <>
    <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
        >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>

    </>
  )
}

export default UserOptions