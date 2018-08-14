import React, { Component } from "react";
import { connect } from "react-redux";
import ReactS3Uploader from "react-s3-uploader";
import { updateUser } from "../../../redux/ducks/userReducer";
import "./Settings.css";
//form Dialog
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//end form dialog

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      role: this.props.user[0].role,
      profile_picture: this.props.user[0].profile_picture,
      open: false
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
  };
  //form dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.updateUser(this.state);
  };
  //end of form dialog

  //React s3 picture upload
  onPictureUpload = s3 => {
    this.setState({
      profile_picture: process.env.REACT_APP_DEV_S3_URL + s3.filename
    });
  };
  render() {
    let { last_name, first_name, email, role, profile_picture } = this.state;

    return (
      <div className="user-settings-container">
        <h1>User Settings</h1>
        <div className="user-list">
          <img
            className="profilePicture"
            src={this.state.profile_picture}
            alt="User Profile Picture"
          />
          <ul>
            <li>First Name: {first_name} </li>
            <li>Last Name: {last_name}</li>
            <li>email: {email} </li>
            <li>role: {role} </li>

            {/* //Start of Form dialog */}
            <div>
              <Button onClick={this.handleClickOpen}>
                Change User Settings
              </Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change User Settings
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Update your user settings here.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="First name"
                    type="text"
                    value={this.state.first_name}
                    onChange={e =>
                      this.setState({ first_name: e.target.value })
                    }
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Last Name"
                    type="text"
                    value={this.state.last_name}
                    onChange={e => this.setState({ last_name: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Role"
                    type="text"
                    value={this.state.role}
                    onChange={e => this.setState({ role: e.target.value })}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    value={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                    fullWidth
                  />
                  <ReactS3Uploader
                    signingUrl="/s3/sign"
                    signingUrlMethod="GET"
                    accept="image/*"
                    s3path=""
                    onProgress={this.progress}
                    onFinish={this.onPictureUpload}
                    contentDisposition="auto"
                    scrubFilename={filename =>
                      filename.replace(/[^\w\d_\-.]+/gi, "")
                    }
                    inputRef={cmp => (this.uploadInput = cmp)}
                    server={process.env.REACT_APP_DEV_HOST}
                    autoUpload
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    update
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </ul>
        </div>
        {/* end form dialog */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
}
export default connect(
  mapStateToProps,
  { updateUser }
)(Settings);
