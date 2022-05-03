import TextField from "@material-ui/core/TextField";

export default function Register() {
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-title">
          <h1>Register</h1>
        </div>
        <div className="register-container-form">
          <form>
            <div className="input-group">
              <TextField
                id="fullName"
                label="Full Name *"
                helperText=""
                style={{ width: "100%" }}
              />
            </div>
            <div className="input-group">
              <TextField
                id="email"
                label="Email *"
                helperText=""
                type="email"
                style={{ width: "100%" }}
              />
            </div>
            <div className="input-group">
              <TextField
                id="username"
                label="Username *"
                helperText=""
                style={{ width: "100%" }}
              />
            </div>
            <div className="input-group">
              <TextField
                id="password"
                label="Password *"
                helperText=""
                type="password"
                autoComplete="current-password"
                style={{ width: "100%" }}
              />
            </div>
            <div className="extra"></div>
            <div className="p-t-10">
              <button className="btn--pill" type="submit" data-target="#">
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
