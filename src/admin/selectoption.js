import axios from 'axios'
import { Component } from 'react'
class SelectOption extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            diachi: '',
            sdt: '',
            role: ''
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangesdt = this.handleChangesdt.bind(this)
        this.handleChangediachi = this.handleChangediachi.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${localStorage.getItem('id')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    username: response.data.UserSelect.name,
                    email: response.data.UserSelect.email,
                    diachi: response.data.UserSelect.diachi,
                    sdt: response.data.UserSelect.sdt,
                    role: response.data.UserSelect.role
                })
            })
    }

    handleChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }


    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangesdt(e) {
        this.setState({
            sdt: e.target.value
        })
    }
    handleChangediachi(e) {
        this.setState({
            diachi: e.target.value
        })
    }

    render() {
        console.log(this.state.user)
        return (<div className="listproductadmin showwithsidebar">
            <div className="profile">
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 ">
                    <div className="profile__header">
                        <h3>Edit Profile</h3>
                        <h4>Complete your profile</h4>
                    </div>
                    <div className="profile__info">
                        <input type="text" aria-invalid="false" className="input__username" placeholder="USERNAME" onChange={this.handleChangeUsername} value={this.state.username} />
                        <input type="text" aria-invalid="false" className="input__username" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.email} />
                        <div className="profile__name">
                            <input type="text" aria-invalid="false" className="input__username" placeholder="SDT" onChange={this.handleChangesdt} value={this.state.sdt} />
                            <input type="text" aria-invalid="false" className="input__username" placeholder="Địa chỉ" onChange={this.handleChangediachi} value={this.state.diachi} />
                        </div>
                        <div className="profile__role">
                            <p>Role: </p>
                            <span>{this.state.role}</span>
                        </div>
                    </div>
                    <button>Update</button>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 ">
                    <div className="profile__image" style={{ backgroundImage: 'url(https://th.bing.com/th/id/OIP.j8E9qm8ci1w8W1J1OPieBwHaE2?pid=ImgDet&rs=1)' }}>
                    </div>
                    <p className="img__title">Your Avatar</p>
                </div>
            </div>
        </div>)
    }
}

export default SelectOption