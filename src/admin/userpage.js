import axios from "axios";
import { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isShowFormAdd: false,
            isShowFormDel: false,
            loading: true
        }
        this.showFormAdd = this.showFormAdd.bind(this)
        this.closeFormAdd = this.closeFormAdd.bind(this)
        this.add1user = this.add1user.bind(this)
        this.delUser = this.delUser.bind(this)
        this.closeDel = this.closeDel.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: 'https://tttn.herokuapp.com/api/auth/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },

        }).then(response => {
            this.setState({
                users: response.data.Users,
                loading: false
            })
        })
        console.log('componentDidMount')
    }


    showFormAdd() {
        this.setState({
            isShowFormAdd: true
        })
    }

    add1user(user) {
        let arrUser = this.state.users;
        arrUser.push(user)
        console.log(arrUser)
        this.setState({
            users: arrUser
        })
    }

    delUser() {
        this.setState({
            isShowFormDel: true,
        })
    }

    closeDel() {
        this.setState({
            isShowFormDel: false,
        })
    }

    closeFormAdd() {
        this.setState({
            isShowFormAdd: false
        })
    }

    render() {
        console.log('render')
        let role = localStorage.getItem("role")
        let { users, loading } = this.state
        let listuser = users.map((user, index) => {
            return <User user={user} key={index} delUser={this.delUser} role={role}></User>
        })

        console.log(sessionStorage.getItem('iddeluser'))
        let grpbtn
        if (role === "owner") {
            grpbtn = <li className="quanly">
                <p>Quản lý</p>
            </li>
        }
        else grpbtn = ''

        let formAdd, formdel
        if (this.state.isShowFormDel === true) {
            formdel = <FormAcceptDelete closeDel={this.closeDel} />
        }
        if (this.state.isShowFormAdd === true) {
            formAdd = <FormAddUser closeFormAdd={this.closeFormAdd} add1user={this.add1user} />
        }
        return (
            <div className="listproductadmin showwithsidebar">
                {formAdd}
                {formdel}
                <ul className="productadmin__navbar">
                    <li className="navbar__item">
                        <div className="nav__iconList"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" className="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                        </svg></div>
                        <h3>USER</h3>
                    </li>
                </ul>
                <div className="groupbtnuserlist">
                    <div className="btnadduser">
                        <button onClick={this.showFormAdd}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                            <p>+1 user</p>
                        </button>
                    </div>
                    <div className="btnadduser">
                        <button>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                            <p>Tìm kiếm</p>
                        </button>
                    </div>
                </div>
                <div className="listUserTable">
                    <ul className="column">
                        <li className="name">
                            <p>Họ Tên</p>
                        </li>
                        <li className="Email">
                            <p>Email</p>
                        </li>
                        <li className="password">
                            <p>Password</p>
                        </li>
                        <li className="sdt">
                            <p>Số điện thoại</p>
                        </li>
                        <li className="diachi">
                            <p>Địa chỉ</p>
                        </li>
                        <li className="role">
                            <p>Role</p>
                        </li>
                        {grpbtn}
                    </ul>
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                        <div className="listuserall">
                            {listuser}

                        </div>}

                </div>
            </div>
        )
    }
}

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.delUser = this.delUser.bind(this)
    }

    delUser(id) {
        this.props.delUser()
        sessionStorage.setItem('iddeluser', id)
    }

    render() {
        console.log(sessionStorage.getItem('iddeluser'))
        let role = this.props.role
        let grpbtn
        if (role === "owner") {
            grpbtn = <li className="quanly">
                <p className="del"><svg onClick={() => this.delUser(this.props.user._id)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-minus" className="svg-inline--fa fa-user-minus fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M624 208H432c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg></p>
            </li>
        }
        else grpbtn = ''
        return (
            <div>
                <ul className="column item">
                    <li className="name">
                        <p>{this.props.user.name}</p>
                    </li>
                    <li className="Email">
                        <p>{this.props.user.email}</p>
                    </li>
                    <li className="password">
                        <p>************</p>
                    </li>
                    <li className="sdt">
                        <p>{this.props.user.sdt}</p>
                    </li>
                    <li className="diachi">
                        <p>{this.props.user.diachi}</p>
                    </li>
                    <li className="role">
                        <p>{this.props.user.role}</p>
                    </li>
                    {grpbtn}
                </ul>

            </div>
        )
    }
}


class FormAddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            sdt: '',
            diachi: '',
            role: 'customer'
        }

        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleSdt = this.handleSdt.bind(this)
        this.handleDiachi = this.handleDiachi.bind(this)
        this.handleRole = this.handleRole.bind(this)
        this.closeFormAdd = this.closeFormAdd.bind(this)
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

    closeFormAdd() {
        this.props.closeFormAdd()
    }


    addNewUser() {
        if (this.state.password !== this.state.confirmpassword) {
            alert("sai")
        }
        else {
            let user = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                sdt: this.state.sdt,
                diachi: this.state.diachi,
                role: this.state.role
            }
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/auth/register`,
                data: user
            }).then(response => {
                alert('Thanh cong')
                this.props.add1user(user)
            })
                .catch(err => {
                    alert(err)
                })
        }
    }

    render() {
        return (
            <div className="addProductoverlay">
                <div className="addUserform">
                    <div className="adduser__title">
                        <h3>Thêm 1 USER</h3>
                    </div>
                    <div className="adduser__form">
                        <div className="adduser__field">
                            <input type="text" placeholder="Nhập họ tên" onChange={this.handleName} value={this.state.name} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="email" placeholder="Nhập email" onChange={this.handleEmail} value={this.state.email} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="password" placeholder="Nhập mật khẩu" onChange={this.handlePassword} value={this.state.password} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="password" placeholder="Xác nhận mật khẩu" onChange={this.handleConfirmPassword} value={this.state.confirmpassword} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="text" placeholder="Nhập số điện thoại" onChange={this.handleSdt} value={this.state.sdt} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="text" placeholder="Nhập địa chỉ" onChange={this.handleDiachi} value={this.state.diachi} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <p>role</p>
                            <select onChange={this.handleRole} value={this.state.role}>
                                <option value='customer'>customer</option>
                                <option value='admin'>admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="groupbtn">
                        <button className="add" onClick={this.addNewUser}>Thêm</button>
                        <button className="closeformadd" onClick={this.closeFormAdd}>Thoát</button>
                    </div>
                </div>
            </div>
        )
    }
}

class FormAcceptDelete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            email: ''
        }
        this.closeDel = this.closeDel.bind(this)
        this.del1User = this.del1User.bind(this)
    }

    closeDel() {
        this.props.closeDel()
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${sessionStorage.getItem('iddeluser')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    id: response.data.UserSelect._id,
                    email: response.data.UserSelect.email
                })
            })
    }

    del1User() {

    }

    render() {

        if (this.props.role === "Owner") {

        }
        return (<div className="addProductoverlay">
            <div className="deleteProductForm">
                <div className="editproduct__title">Bạn muốn xóa {this.state.email}?</div>
                <div className="editProduct__logo">

                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-slash" className="svg-inline--fa fa-user-slash fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M633.8 458.1L362.3 248.3C412.1 230.7 448 183.8 448 128 448 57.3 390.7 0 320 0c-67.1 0-121.5 51.8-126.9 117.4L45.5 3.4C38.5-2 28.5-.8 23 6.2L3.4 31.4c-5.4 7-4.2 17 2.8 22.4l588.4 454.7c7 5.4 17 4.2 22.5-2.8l19.6-25.3c5.4-6.8 4.1-16.9-2.9-22.3zM96 422.4V464c0 26.5 21.5 48 48 48h350.2L207.4 290.3C144.2 301.3 96 356 96 422.4z"></path></svg></div>
                <div className="groupbtn">
                    <button className='btn xoa' onClick={this.del1User}>Đồng ý</button>
                    <button className='btn thoat' onClick={this.closeDel}>Thoát</button>
                </div>

            </div>
        </div>)
    }
}