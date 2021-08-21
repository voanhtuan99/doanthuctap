import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import BackHomepage from "./backHomepage";
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.btnClickLogin = this.btnClickLogin.bind(this)
    }


    componentDidMount() {

    }


    btnClickLogin() {
        if (this.state.email === "") {
            document.querySelector(".gmailerr").innerHTML = "<p>Vui lòng điền gmail</p>"
        }
        if (this.state.password === "") {
            document.querySelector(".passerr").innerHTML = "<p>Vui lòng điền mật khẩu</p>"
        }
        if (this.state.email !== '' && this.state.password !== '') {
            axios({
                method: "POST",
                url: 'https://tttn.herokuapp.com/api/auth/login',
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            }).then(response => {


                if (response.data.user.role === 'customer') {
                    console.log(response.data.user.accessToken)
                    localStorage.setItem("accessToken", response.data.accessToken)
                    localStorage.setItem("name", response.data.user.name)
                    localStorage.setItem("id", response.data.user._id)
                    localStorage.setItem("role", response.data.user.role)
                    this.props.history.push("/")
                }
                else if (response.data.user.role === 'admin') {
                    localStorage.setItem("accessToken", response.data.accessToken)
                    localStorage.setItem("name", response.data.user.name)
                    localStorage.setItem("id", response.data.user._id)
                    localStorage.setItem("role", response.data.user.role)
                    this.props.history.push("/admin")
                }

            }).catch(err => {
                document.querySelector(".passerr").innerHTML = "<p>Gmail hoặc mật khẩu không chính xác</p>"
            })
        }
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    render() {
        let { email, password } = this.state
        return (<div>
            <BackHomepage />
            <div className="dangnhap" style={{ backgroundImage: 'url(https://th.bing.com/th/id/R.17bacde7417ced8892d5257d7eae082e?rik=G1bJcb6dCfA3gA&riu=http%3a%2f%2ffile.vforum.vn%2fhinh%2f2016%2f08%2fhinh-anh-quyen-sach-dep-9.jpg&ehk=LNiVzdZFW2yx%2blD8tTamGKilqgD1%2bdQdcRVX2vrxyaA%3d&risl=&pid=ImgRaw)' }}>
                <div className="formdangnhap">
                    <div className="form__title">
                        <h3>LOGIN</h3>
                    </div>
                    <div className="form__input">
                        <input type="text" placeholder="USERNAME" onChange={this.handleChangeEmail} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err gmailerr"><br></br></div>
                    <div className="form__input">
                        <input type="password" placeholder="PASSWORD" onChange={this.handleChangePassword} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err passerr"><br></br></div>

                    <h5>Quên mật khẩu</h5>
                    <button className="btn-green" onClick={this.btnClickLogin}>Đăng nhập</button>
                    <div className="form__regis">
                        <div className="contain">
                            <p className="regis__title">Bạn chưa có tài khoản? Click</p>
                            <Link to="/regis">
                                <button className="button-DN">Đăng ký</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div></div>)
    }
}

export default Login