import axios from 'axios'
import { Component } from 'react'
import ItemInCart from './itemincart'
import FormSuccess from './formSuccess'
import { remove } from 'lodash'
import { withRouter } from 'react-router-dom'
class CartPage extends Component {
  constructor(props) {
    let list = JSON.parse(sessionStorage.getItem('listproductincart'))
    console.log(list)
    super(props)
    let listt
    if (list === null) {
      listt = []
    }
    else listt = list
    console.log(list)
    let TongTien = listt.reduce((acc, curr) => {
      return acc + curr.GiaBan * curr.SoLuong
    }, 0)
    let GiaGoc = listt.reduce((acc, curr) => {
      return acc + curr.DonGia * curr.SoLuong
    }, 0)
    this.state = {
      listproduct: list,
      isShowFormSuccess: false,
      TongTien: TongTien,
      diachitt: '',
      GiaGoc: GiaGoc
    }
    this.taodondathang = this.taodondathang.bind(this)
    this.ClickBackFormSuccess = this.ClickBackFormSuccess.bind(this)
    this.handleDiachitt = this.handleDiachitt.bind(this)
    this.xoasanpham = this.xoasanpham.bind(this)
    this.thaydoisoluong = this.thaydoisoluong.bind(this)
    this.taodondathangonline = this.taodondathangonline.bind(this)
  }

  xoasanpham(product) {
    let list = JSON.parse(sessionStorage.getItem('listproductincart'))
    remove(list, (item) => {
      return item._id === product._id
    })
    this.setState({
      listproduct: list
    })
    sessionStorage.setItem("listproductincart", JSON.stringify(list))
  }

  thaydoisoluong(product) {
    let arrproduct = this.state.listproduct
    console.log(arrproduct)
    arrproduct.forEach((element, key) => {
      if (element._id === product._id) {
        arrproduct[key] = product
      }
    });
    console.log(arrproduct)
    sessionStorage.setItem('listproductincart', JSON.stringify(arrproduct))
    let TongTien = arrproduct.reduce((acc, curr) => {
      return acc + curr.GiaBan * curr.SoLuong
    }, 0)
    let GiaGoc = arrproduct.reduce((acc, curr) => {
      return acc + curr.DonGia * curr.SoLuong
    }, 0)
    this.setState({
      listproduct: arrproduct,
      TongTien: TongTien,
      GiaGoc: GiaGoc
    })

  }

  taodondathang() {
    if (this.state.diachitt !== '') {
      axios({
        method: 'POST',
        url: 'https://tttn.herokuapp.com/api/order/insert',
        data: {
          TrangThai: 'Chưa xác nhận',
          user: localStorage.getItem('id'),
          diachinhanhang: this.state.diachitt,
          TongTien: this.state.TongTien
        }
      }).then(response => {
        for (let i = 0; i < this.state.listproduct.length; i++) {
          axios({
            method: 'POST',
            url: 'https://tttn.herokuapp.com/api/detailorder/insert',
            data: {
              SoLuong: this.state.listproduct[i].SoLuong,
              idorder: response.data.newOrder._id,
              idsp: this.state.listproduct[i]._id

            }
          }).then(require => {

          })
            .catch(err => {
              alert(err)
            })
          axios({
            method: 'PUT',
            url: `https://tttn.herokuapp.com/api/product/${this.state.listproduct[i]._id}`,
            data: {
              TenSP: this.state.listproduct[i].TenSP,
              SoLuong: this.state.listproduct[i].soluongtrongkho - this.state.listproduct[i].SoLuong,
              DonGia: this.state.listproduct[i].DonGia,
              KhuyenMai: this.state.listproduct[i].KhuyenMai,
              Mota: this.state.listproduct[i].Mota,
              img: this.state.listproduct[i].img,
              TacGia: this.state.listproduct[i].TacGia,
              loaisp: this.state.listproduct[i].loaisp
            }
          })
            .then(response => {

            })
            .catch(err => {
              alert(err)
            })
        }
        sessionStorage.removeItem('listproductincart')
        this.setState({
          listproduct: [],
          isShowFormSuccess: true
        })
      }).catch(err => {
        alert(`err123 ${err}`)
      })
    }
    else {
      document.querySelector('.err').innerHTML = "<p>Nhập địa chỉ</p>"
    }
  }

  taodondathangonline() {
    if (this.state.diachitt !== '') {
      axios({
        method: 'POST',
        url: 'https://tttn.herokuapp.com/api/order/insert',
        data: {
          TrangThai: 'Thanh Toán Online',
          user: localStorage.getItem('id'),
          diachinhanhang: this.state.diachitt,
          TongTien: this.state.TongTien
        }
      }).then(response => {
        for (let i = 0; i < this.state.listproduct.length; i++) {
          axios({
            method: 'POST',
            url: 'https://tttn.herokuapp.com/api/detailorder/insert',
            data: {
              SoLuong: this.state.listproduct[i].SoLuong,
              idorder: response.data.newOrder._id,
              idsp: this.state.listproduct[i]._id

            }
          }).then(require => {

          })
            .catch(err => {
              alert(err)
            })
          axios({
            method: 'PUT',
            url: `https://tttn.herokuapp.com/api/product/${this.state.listproduct[i]._id}`,
            data: {
              TenSP: this.state.listproduct[i].TenSP,
              SoLuong: this.state.listproduct[i].soluongtrongkho - this.state.listproduct[i].SoLuong,
              DonGia: this.state.listproduct[i].DonGia,
              KhuyenMai: this.state.listproduct[i].KhuyenMai,
              Mota: this.state.listproduct[i].Mota,
              img: this.state.listproduct[i].img,
              TacGia: this.state.listproduct[i].TacGia,
              loaisp: this.state.listproduct[i].loaisp
            }
          })
            .then(response => {

            })
            .catch(err => {
              alert(err)
            })
        }
        sessionStorage.removeItem('listproductincart')
        this.setState({
          listproduct: []
        })
        window.location = "https://paypalprojectnode.herokuapp.com/"
      }).catch(err => {
        alert(`err123 ${err}`)
      })
    }
    else {
      document.querySelector('.err').innerHTML = "<p>Nhập địa chỉ</p>"
    }
  }


  ClickBackFormSuccess() {
    this.setState({
      isShowFormSuccess: false
    })
  }

  handleDiachitt(e) {
    this.setState({
      diachitt: e.target.value
    })
  }

  render() {
    console.log(this.state.diachitt)
    let list
    if (this.state.listproduct === null) {
      list = []
    }
    else list = this.state.listproduct
    let showList
    let giagoc = list.reduce((acc, curr) => {
      return acc + curr.DonGia
    }, 0)
    let cartpayment;
    console.log(list)
    if (list.length !== 0) {
      showList = list.map((productincart, index) => {
        return <ItemInCart
          thaydoisoluong={this.thaydoisoluong}
          xoasanpham={this.xoasanpham} product={productincart} key={index} />
      })
      cartpayment = <div className="cart__payment">
        <div className="cart__content">
          <div className="cart__price">
            <h4>Giá gốc: </h4>
            <p>{this.state.GiaGoc}đ</p>
          </div>
          <div className="cart__price discount">
            <h4>Giảm giá: </h4>
            <p>{this.state.GiaGoc - this.state.TongTien}đ</p>
          </div>
          <div className="cart__price total">
            <h4>Tổng: </h4>
            <p>{this.state.TongTien}đ</p>
          </div>
        </div>
        <div className="payment__diachinhanhang">
          <p>Địa chỉ nhận hàng</p>
          <input type="text" className="inputdiachinhanhang" onChange={this.handleDiachitt} value={this.state.diachitt} />
          <div className="err"><br></br></div>
        </div>
        <div className="payment__button" >
          <button onClick={this.taodondathang}>Thanh toán trực tiếp</button>
          <button onClick={this.taodondathangonline}>Thanh toán online</button>
        </div>
      </div>
    }
    else if (list.length === 0) {
      showList = <GioHangTrong />
      cartpayment = ''
      console.log('giohangtrong')
    }
    let formSuccess

    if (this.state.isShowFormSuccess === true) formSuccess = <FormSuccess ClickBackFormSuccess={this.ClickBackFormSuccess} />
    else formSuccess = ''
    return (
      <div className="customercart">
        {formSuccess}
        <div className="cart__box">
          <div className="customercart__title">
            <h3>Sản phẩm trong giỏ hàng</h3>
          </div>
          <div className="cart__list">
            {showList}
          </div>
          {cartpayment}
        </div>
      </div>)
  }
}

class GioHangTrong extends Component {
  render() {
    return (
      <div className="giohangtrong">
        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png" />
        <p>Chưa có sản phẩm trong giỏ hàng</p>
      </div>
    )
  }
}



export default withRouter(CartPage)