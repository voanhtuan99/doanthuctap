
import axios from "axios";
import { Component } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts"
export default class ChartPage extends Component {
    constructor(props) {
        super(props);
        var tomonth = new Date()
        var d = tomonth.getMonth() + 1
        this.state = {
            data: [

            ],
            COLORS: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#345678"],
            optionthang: d,
            tongtiennhap: 0,
            tongtienxuat: 0
        }
        this.handleThang = this.handleThang.bind(this)
    }
    componentDidMount() {
        var tomonth = new Date()
        var d = tomonth.getMonth() + 1
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/top5sach`,
            data: {
                Thang: this.state.optionthang
            }
        })
            .then(response => {
                this.setState({
                    data: response.data
                })
            })

        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/chartnhapxuat`,
            data: {
                Thang: this.state.optionthang
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                this.setState({
                    tongtiennhap: response.data.tongtiennhap,
                    tongtienxuat: response.data.tongtienxuat

                })
            })
    }

    componentDidUpdate() {
        var tomonth = new Date()
        var d = tomonth.getMonth() + 1
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/top5sach`,
            data: {
                Thang: this.state.optionthang
            }
        })
            .then(response => {
                this.setState({
                    data: response.data
                })
            })

        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/chartnhapxuat`,
            data: {
                Thang: this.state.optionthang
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                this.setState({
                    tongtiennhap: response.data.tongtiennhap,
                    tongtienxuat: response.data.tongtienxuat

                })
            })
    }

    handleThang(e) {
        this.setState({
            optionthang: e.target.value
        })
        console.log(e.target.value)
    }
    render() {
        const { data } = this.state;
        let listmau = data.map((inf, key) => {
            return <ItemGT inf={inf} key={key} />
        })
        let mau = this.state.COLORS.map((color, key) => {
            return <ListMau color={color} key={key} />
        })

        return (
            <div className="listproductadmin showwithsidebar">
                <div className="chart thongkethang">
                    <div className="title"><h3>Thống kê tháng: </h3></div>
                    <select value={this.state.optionthang} onChange={this.handleThang}>
                        <option value={1}>Tháng 1</option>
                        <option value={2}>Tháng 2</option>
                        <option value={3}>Tháng 3</option>
                        <option value={4}>Tháng 4</option>
                        <option value={5}>Tháng 5</option>
                        <option value={6}>Tháng 6</option>
                        <option value={7}>Tháng 7</option>
                        <option value={8}>Tháng 8</option>
                        <option value={9}>Tháng 9</option>
                        <option value={10}>Tháng 10</option>
                        <option value={11}>Tháng 11</option>
                        <option value={12}>Tháng 12</option>
                    </select>
                </div>
                <div className="chart so1">
                    <div className="title"><h3>Top 5 sách bán chạy nhất tháng {this.state.optionthang}</h3></div>


                    <div className="content">
                        <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
                            <Pie
                                data={this.state.data}
                                cx={150}
                                cy={200}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="sum"

                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />
                                ))}
                            </Pie>

                        </PieChart>
                        <div className="content__all">

                            <div className="content__data">
                                <h4>Giải thích:</h4>
                                <div className="bangmau">
                                    <div className='listmau'>
                                        {mau}
                                    </div>
                                    <div className="tensach">
                                        {listmau}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="nhapxuatthang">
                        <h3 className="nhapxuatthang__title">
                            Nhập xuất tháng
                        </h3>
                        <div className="nhap"><p>Tổng tiền nhập: </p><span>{this.state.tongtiennhap} đ</span></div>
                        <div className="xuat"><p>Tổng tiền xuất: </p><span>{this.state.tongtienxuat} đ</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

class ItemGT extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p>{this.props.inf.product.TenSP}</p>
            </div>
        )
    }
}

class ListMau extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='mau' style={{ backgroundColor: this.props.color }}>

            </div>
        )
    }
}