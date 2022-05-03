import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

export default function ModalUser() {

  return (
    <div className="modal-body">
      <p className="title">Add New User</p>
      <form>
        <div className="input-group">
          <TextField id="fullName" label="Full Name *" helperText="" style={{width: "140%"}} />
        </div>
        <div className="input-group">
          <TextField id="email" label="Email *" helperText="" type="email" style={{width: "140%"}} />
        </div>
        <div className="input-group">
          <TextField id="username" label="Username *" helperText="" style={{width: "140%"}} />
        </div>
        <div className="input-group">
          <TextField id="password" label="Password *" helperText="" type="password" autoComplete="current-password" style={{width: "140%"}} />
        </div>
        <div className="input-group">
          <FormControl style={{ width: "140%" }}>
            <InputLabel htmlFor="demo-customized-select-native">
              Role
            </InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              // value={role}
              // onChange={}
              // input={<BootstrapInput />}
            >
              <option aria-label="None" value="" />
              <option value={10}>Manager</option>
              <option value={11}>Agent</option>
              <option value={12}>Shipper</option>
            </NativeSelect>
          </FormControl>
        </div>
        <div className="extra"></div>
        <div className="p-t-10">
          <button
            className="btn--pill"
            type="submit"
            data-target="#"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
