import axios from "axios";
import { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default class HistoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            isShowCancelOrder: false
        }
        this.handleshowcancelform = this.handleshowcancelform.bind(this)
        this.handleclosecancelform = this.handleclosecancelform.bind(this)
        this.huydonhang = this.huydonhang.bind(this)
    }

    componentDidMount() {
        axios({
            method: `POST`,
            url: `https://tttn.herokuapp.com/api/select/orderofuser`,
            data: {
                id: localStorage.getItem("id")
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    orders: response.data.listDDH,
                })
            })
            .catch(err => {
            })
    }


    handleshowcancelform() {
        this.setState({
            isShowCancelOrder: true
        })
    }

    handleclosecancelform() {
        this.setState({
            isShowCancelOrder: false
        })
    }

    huydonhang(ordernew) {
        let arrOrder = this.state.orders
        arrOrder.forEach((order, key) => {
            if (order._id === ordernew._id) {
                arrOrder[key].TrangThai = ordernew.TrangThai
            }
        })
        this.setState({
            orders: arrOrder
        })
    }

    clickOption(method, id) {
        let mang = ["tatca", "choxacnhan", "danggiao", "dagiao", "dahuy"]
        var listoption = []
        mang.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.querySelector(`.${id}`).classList.add('active')
        document.querySelector(`.${listoption[0]}`).classList.remove('active')
        document.querySelector(`.${listoption[1]}`).classList.remove('active')
        document.querySelector(`.${listoption[2]}`).classList.remove('active')
        document.querySelector(`.${listoption[3]}`).classList.remove('active')
        if (method === "all") {
            axios({
                method: `POST`,
                url: `https://tttn.herokuapp.com/api/select/orderofuser`,
                data: {
                    id: localStorage.getItem("id")
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    this.setState({
                        orders: response.data.listDDH
                    })
                })
        }
        else {
            axios({
                method: `POST`,
                url: `https://tttn.herokuapp.com/api/select/laytheotrangthai`,
                data: {
                    id: localStorage.getItem("id"),
                    TrangThai: method
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    if (response.data.listDDH === []) {
                        this.setState({
                            orders: []
                        })
                    }
                    else {
                        this.setState({
                            orders: response.data.listDDH
                        })
                    }
                })
                .catch(er => {

                })
        }
    }

    render() {
        let { orders, isShowCancelOrder } = this.state
        let listorder = orders.map((order, index) => {
            return <ItemOrder handleshowcancelform={this.handleshowcancelform} order={order} key={index} />
        })
        let formcancel
        if (isShowCancelOrder === true) {
            formcancel = <FormCancanOrder huydonhang={this.huydonhang} handleclosecancelform={this.handleclosecancelform} />
        }

        return (

            <div className="historybuypage">
                {formcancel}
                <div className="historypage__title">
                    <h2>Lịch sử mua hàng</h2>
                </div>
                <ul className="history__option">
                    <li className="tatca active" onClick={() => this.clickOption("all", "tatca")}><p>Tất cả</p></li>
                    <li className="choxacnhan " onClick={() => this.clickOption("Chưa xác nhận", "choxacnhan")}><p>Chờ xác nhận</p></li>
                    <li className="danggiao" onClick={() => this.clickOption("Đã xác nhận", "danggiao")}><p>Đang giao</p></li>
                    <li className="dagiao" onClick={() => this.clickOption("Đã nhận", "dagiao")}><p>Đã giao</p></li>
                    <li className="dahuy" onClick={() => this.clickOption("Đã hủy", "dahuy")}><p>Đã hủy</p></li>
                </ul>
                <div className="listorderinuser">

                    {listorder}


                </div>
            </div>
        )
    }
}

class ItemOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdetail: []
        }
        this.huydonhang = this.huydonhang.bind(this)
    }

    componentDidMount() {
        axios({
            method: `GET`,
            url: `https://tttn.herokuapp.com/api/detailorder/${this.props.order._id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    listdetail: response.data.listDetail
                })
            })
    }


    huydonhang() {
        sessionStorage.setItem("idordercancel", this.props.order._id)
        this.props.handleshowcancelform()
    }

    render() {
        let { listdetail } = this.state
        let listitem = listdetail.map((detail, index) => {
            return <ItemDetailOrder detail={detail} key={index} />
        })
        let btnhuydonhang
        if (this.props.order.TrangThai === "Chưa xác nhận") {
            btnhuydonhang = <div className="groupbtn">
                <button onClick={this.huydonhang}>Huỷ đơn hàng</button>
            </div>
        }
        return (
            <div className="order__item">
                <div className="item__title">
                    <h3>{this.props.order.TrangThai}</h3>
                    <div className="line"></div>
                    <p>Giá: {this.props.order.TongTien}đ</p>
                </div>
                <div className="listdetailorder">
                    {listitem}
                </div>
                {btnhuydonhang}
            </div>
        )
    }
}

class ItemDetailOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: '',
            TenSP: '',
            Gia: 0,
            KhuyenMai: 0
        }
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/product/${this.props.detail.idsp}`
        })
            .then(response => {
                this.setState({
                    img: response.data.productget.img,
                    TenSP: response.data.productget.TenSP,
                    Gia: response.data.productget.DonGia,
                    KhuyenMai: response.data.productget.KhuyenMai
                })
            })
    }
    render() {
        return (
            <div className="detailorder__item">
                <div className="img">
                    <img src={this.state.img} />
                </div>
                <div className="info">
                    <p>Tên sp: {this.state.TenSP}
                    </p>
                    <span>Số lượng: {this.props.detail.SoLuong}</span>
                </div>
                <div className="giaorder">
                    <p>{parseInt(this.state.Gia) - parseInt(this.state.Gia * this.state.KhuyenMai / 100)}đ</p>
                </div>
            </div>
        )
    }
}

class FormCancanOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {}
        }
        this.handleclosecancelform = this.handleclosecancelform.bind(this)
        this.huydonhang = this.huydonhang.bind(this)
    }
    handleclosecancelform() {
        this.props.handleclosecancelform()
        sessionStorage.removeItem("idordercancel")
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/order/${sessionStorage.getItem("idordercancel")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                order: response.data.OrderGet
            })
        })

    }

    huydonhang() {
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/order/${this.state.order._id}`,
            data: {
                TrangThai: "Đã hủy",
                user: this.state.order.user,
                diachinhanhang: this.state.order.diachinhanhang,
                TongTien: this.state.order.TongTien
            }
        }).then(response => {
            console.log(response.data.updateOrder)
            sessionStorage.removeItem("idordercancel")
            this.props.huydonhang(response.data.updateOrder)
            this.props.handleclosecancelform()

        })
    }
    render() {
        console.log(this.state.order)
        return (
            <div className="formhuydonhang">
                <div className="huydonuser__title">
                    <h3>Hủy đơn hàng: </h3>
                    <h4>{sessionStorage.getItem("idordercancel")}</h4>
                </div>
                <div className="huydonuser__icon">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="window-close" className="svg-inline--fa fa-window-close fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 394c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h404c3.3 0 6 2.7 6 6v340zM356.5 194.6L295.1 256l61.4 61.4c4.6 4.6 4.6 12.1 0 16.8l-22.3 22.3c-4.6 4.6-12.1 4.6-16.8 0L256 295.1l-61.4 61.4c-4.6 4.6-12.1 4.6-16.8 0l-22.3-22.3c-4.6-4.6-4.6-12.1 0-16.8l61.4-61.4-61.4-61.4c-4.6-4.6-4.6-12.1 0-16.8l22.3-22.3c4.6-4.6 12.1-4.6 16.8 0l61.4 61.4 61.4-61.4c4.6-4.6 12.1-4.6 16.8 0l22.3 22.3c4.7 4.6 4.7 12.1 0 16.8z"></path></svg>
                </div>
                <div className="groupbtn">
                    <button onClick={this.huydonhang}>Đồng ý</button>
                    <button onClick={this.handleclosecancelform}>Thoát</button>
                </div>
            </div>
        )
    }
}