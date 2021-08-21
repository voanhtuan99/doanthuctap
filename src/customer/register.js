import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
class RegistPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            sdt: '',
            diachi: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleSdt = this.handleSdt.bind(this)
        this.handleDiachi = this.handleDiachi.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
    }
    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    handleSdt(e) {
        this.setState({
            sdt: e.target.value
        })
    }

    handleDiachi(e) {
        this.setState({
            diachi: e.target.value
        })
    }

    handleRole(e) {
        this.setState({
            role: e.target.value
        })
    }



    addNewUser() {
        if (this.state.password !== this.state.confirmpassword) {
            document.querySelector(".confirmerr").innerHTML = "<p>Mật khẩu xác nhận không khớp</p>"
        }
        if (this.state.email === '') {
            document.querySelector(".gmailerr").innerHTML = "<p>Vui lòng điền gmail</p>"
        }
        if (this.state.password === '') {
            document.querySelector(".passworderr").innerHTML = "<p>Vui lòng điền mật khẩu</p>"
        }
        if (this.state.name === '') {
            document.querySelector(".nameerr").innerHTML = "<p>Vui lòng điền họ tên</p>"
        }
        if (this.state.confirmpassword === '') {
            document.querySelector(".confirmerr").innerHTML = "<p>Vui lòng điền xác nhận mật khẩu</p>"
        }
        if (this.state.sdt === '') {
            document.querySelector(".sdterr").innerHTML = "<p>Vui lòng điền số điện thoại</p>"
        }
        if (this.state.diachi === '') {
            document.querySelector(".diachierr").innerHTML = "<p>Vui lòng điền số địa chỉ</p>"
        }
        if (this.state.email !== "" && this.state.password !== "" &&
            this.state.name !== "" && this.state.sdt !== "" && this.state.diachi !== "") {
            let user = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                sdt: this.state.sdt,
                diachi: this.state.diachi,
                role: "customer"
            }
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/auth/register`,
                data: user
            }).then(response => {
                document.querySelector(".thanhcong").innerHTML = "<p>Đăng ký tài khoản thành công</p>"
            })
                .catch(err => {
                    document.querySelector(".thanhcong").innerHTML = "<p>Đăng ký tài khoản thất bại</p>"
                })
        }
    }

    render() {
        return (<div>

            <div className="dangnhap" style={{ backgroundImage: 'url(https://th.bing.com/th/id/R.f152a1b6f46ed3c3674c06a9ece41d75?rik=RoGmxivfdqXbXA&riu=http%3a%2f%2ffile.vforum.vn%2fhinh%2f2018%2f03%2fhinh-anh-hinh-nen-quyen-sach-dep-nhat-8.png&ehk=rQSvveJtmWrIU1S%2bpXPDtfrrWR1NjQdfwerKsUAqArs%3d&risl=&pid=ImgRaw)' }}>
                <div className="dangky">
                    <div className="form__title">
                        <h3>Register</h3>
                    </div>
                    <div className="form__input">
                        <input type="text" placeholder="Email" onChange={this.handleEmail} value={this.state.email} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err gmailerr"><br></br></div>
                    <div className="form__input">
                        <input type="text" placeholder="Họ tên" onChange={this.handleName} value={this.state.name} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err nameerr"><br></br></div>

                    <div className="form__input">
                        <input type="password" placeholder="PASSWORD" onChange={this.handlePassword} value={this.state.password} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err passworderr"><br></br></div>

                    <div className="form__input">
                        <input type="password" placeholder="Confirm Password" onChange={this.handleConfirmPassword} value={this.state.confirmpassword} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err confirmerr"><br></br></div>

                    <div className="form__input">
                        <input type="text" placeholder="Số điện thoại" onChange={this.handleSdt} value={this.state.sdt} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err sdterr"><br></br></div>

                    <div className="form__input">
                        <input type="text" placeholder="Địa chỉ" onChange={this.handleDiachi} value={this.state.diachi} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err diachierr"><br></br></div>

                    <button className="btn-green" onClick={this.addNewUser}>Đăng ký</button>
                    <div className="thanhcong"><br></br></div>

                    <div className="form__regis">
                        <div className="contain"> <p className="regis__title">Quay lại, Click vào đây!!</p>
                            <Link to="/login">
                                <button className="button-DN">Đăng nhập</button>
                            </Link></div>
                    </div>

                </div>
            </div></div>)
    }
}

export default RegistPage