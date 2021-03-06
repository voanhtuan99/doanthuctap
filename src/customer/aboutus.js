import { Component } from 'react'
class AboutUs extends Component {
    render() {
        return (<div>
            {/* <div id="preloader">
                <div className="jumper">
                    <div />
                    <div />
                    <div />
                </div>
            </div> */}
            {/* ***** Preloader End ***** */}
            {/* Header */}
            {/* <header className="">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="navbar-brand" href="index.html"><h2>Sach99 <em>Shop</em></h2></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickHomepage}>Home
                                        <span className="sr-only">(current)</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickProductpage}>Our Products</div>
                                </li>
                                <li className="nav-item active">
                                    <div className="nav-link" onClick={this.props.clickAboutus}>About Us</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickContactpage}>Contact Us</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickLoginPage}>Login</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header> */}
            {/* Page Content */}
            <div className="page-heading about-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-content">
                                <h4>about us</h4>
                                <h2>C???a h??ng c???a t??i</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="best-features about-features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>C??ng vi???c c???a ch??ng t??i</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="right-image">
                                <img src="https://vnwriter.net/wp-content/uploads/2016/10/sach-cu-binh-tinh.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="left-content">
                                <h4>Ch??ng t??i l?? ai &amp; Ch??ng t??i cung c???p nh???ng g??</h4>
                                <p>Ch??ng t??i l?? sach99. B??n s??ch v???i gi?? c??? h???p l?? nh???t cho m???i ng?????i??? ?????i d???ch l???n 1 ch??a qua th?? l???n 2 l???i ?????n. Nh?? s??ch t??i th???t kh??ng th??? c???m c??? ???????c n???a, ngh??? b??n n??n thanh l?? to??n b??? h??n 1000 ?????u s??ch, ch??? t??? 1k/cu???n nh?? l???i tri ??n b???n ?????c ???? ???ng h??? su???t nh???ng n??m qua.
                                    ??? ?????c gi??? g???n xa gh?? mua s??ch #gi??_r???_x???_kho, nh?? s??ch c?? ship to??n qu???c. b??n thu h???i v???n, ???????c ?????ng n??o hay ?????ng ?????y.
                                    Mong anh ch??? ???ng h??? t??i m???i ng?????i m???t v??i cu???n, t??i r???t c???m ??n!</p>
                                <ul className="social-icons">
                                    <li><div><i className="fa fa-facebook" /></div></li>
                                    <li><div><i className="fa fa-twitter" /></div></li>
                                    <li><div><i className="fa fa-linkedin" /></div></li>
                                    {/* <li><div><i className="fa fa-behance" /></div></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <p>C???m ??n ???? tin t?????ng ch??ng t??i
                                    - Owner: TUANVO99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>)
    }
}

export default AboutUs