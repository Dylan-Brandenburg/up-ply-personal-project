import React, { Component } from "react";
import { connect } from "react-redux";
import ReactS3Uploader from "react-s3-uploader";
import { updateUser } from "../../../redux/ducks/userReducer";
import "./Settings.css";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.user[0].first_name,
      last_name: this.props.user[0].last_name,
      email: this.props.user[0].email,
      role: this.props.user[0].role,
      profile_picture: this.props.user[0].profile_picture
    };
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.updateUser(this.state);
  };
  //React s3 picture upload
  onPictureUpload = s3 => {
    //check if photo state is empty, conditionally update profile: if photo state empty, then don't update photo.
    this.setState({
      profile_picture: `https://s3.us-east-2.amazonaws.com/upply-userprofile/${
        s3.filename
      }`
    });
    {
      console.log(this.state.profile_picture);
    }
  };
  render() {
    {
      console.log(this.props.user);
    }
    let { last_name, first_name, email, role, profile_picture } = this.state;

    return (
      <div>
        <h1>settings</h1>
        <div>
          <ul>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                {" "}
                <img
                  className="profilePicture"
                  src={this.state.profile_picture}
                  alt="User Profile Picture"
                />
              </li>
              <li>
                First Name: {first_name}{" "}
                <input
                  placeholder="First Name"
                  value={this.state.first_name}
                  onChange={e => this.setState({ first_name: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                Last Name: {last_name}
                <input
                  placeholder="Last Name"
                  value={this.state.last_name}
                  onChange={e => this.setState({ last_name: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                email: {email}{" "}
                <input
                  placeholder="email"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <li>
                role: {role}{" "}
                <input
                  placeholder="lastName"
                  value={this.state.role}
                  onChange={e => this.setState({ role: e.target.value })}
                  type="text"
                />
              </li>
            </form>
            <form onSubmit={this.onSubmitHandler}>
              <label className="ProfileCreate__uploader">
                UPLOAD
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
              </label>
              <button> Submit</button>
            </form>
          </ul>
        </div>
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
