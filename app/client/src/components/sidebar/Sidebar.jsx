import "./style/sidebar.css";
import {
  Timeline,
  PermIdentity,
  Storefront,
  AccountCircle,
  Announcement,
  MonetizationOn,
  Home,
  SupervisorAccount,
  Ballot,
  Category,
  ExitToApp,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <Home className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <MonetizationOn className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <SupervisorAccount className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/customers" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Customers
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li className="sidebarListItem">
                <Ballot className="sidebarIcon" />
                Orders
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
            <Link to="/categories" className="link">
              <li className="sidebarListItem">
                <Category className="sidebarIcon" />
                Categories
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Account</h3>
          <ul className="sidebarList">
            <Link to="/profil" className="link">
              <li className="sidebarListItem">
                <AccountCircle className="sidebarIcon" />
                Profil
              </li>
            </Link>
            <Link to="/reports" className="link">
              <li className="sidebarListItem">
                <Announcement className="sidebarIcon" />
                Reports
              </li>
            </Link>
            <Link to="/logout" className="link">
              <li className="sidebarListItem logout">
                <ExitToApp className="sidebarIcon" />
                LogOut
              </li>
            </Link>
            
          </ul>
        </div>
      </div>
    </div>
  );
}