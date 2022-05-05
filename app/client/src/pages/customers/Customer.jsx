import {
  LocationSearching,
  MailOutline,
  Phone,
  Place,
} from "@material-ui/icons";
import "./styles/customer.css";

export default function User() {
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Customer</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">Anna Becker</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Customer Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">annabeck99@gmail.com</span>
            </div>
            <div className="userShowInfo">
              <Phone className="userShowIcon" />
              <span className="userShowInfoTitle">+212 615 207 417</span>
            </div>
            <div className="userShowInfo">
              <Place className="userShowIcon" />
              <span className="userShowInfoTitle">Lot lafarge, Bsk Casablanca</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">Total Transactions: $ {7200.22}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="annabeck99@gmail.com"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="userUpdateInput"
                />
              </div>
            </div>
              <button className="userUpdateButton">
                Update
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
