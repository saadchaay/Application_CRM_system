import TextField from "@material-ui/core/TextField";

export default function ModalCustomer(props) {
  
  return (
    <div className="modal-body">
      <p className="title">Add New User</p>
      <form>
        <div className="input-group">
          <TextField
            id="fullName"
            label="Full Name *"
            helperText=""
            style={{ width: "140%" }}
          />
        </div>
        <div className="input-group">
          <TextField
            id="email"
            label="Email *"
            helperText=""
            type="email"
            style={{ width: "140%" }}
          />
        </div>
        <div className="input-group">
          <TextField
            id="phone"
            label="Phone *"
            helperText=""
            style={{ width: "140%" }}
          />
        </div>
        <div className="input-group">
          <TextField
            id="address"
            label="Address *"
            helperText=""
            style={{ width: "140%" }}
          />
        </div>
        <div className="extra"></div>
        <div className="p-t-10">
          <button className="btn--pill" type="submit">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
