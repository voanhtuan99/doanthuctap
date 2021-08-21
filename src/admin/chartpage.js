
import axios from "axios";
import { Component } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts"
export default class ChartPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [

            ],
            COLORS: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#345678"]
        }
    }
    componentDidMount() {
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/top5sach`,
            data: {
                Thang: 8
            }
        })
            .then(response => {
                this.setState({
                    data: response.data
                })
            })
    }
    render() {
        const { data } = this.state;
        console.log(data)
        let listmau = data.map((inf, key) => {
            console.log(inf)
            return <ItemGT inf={inf} key={key} />
        })
        let mau = this.state.COLORS.map((color, key) => {
            return <ListMau color={color} key={key} />
        })
        return (
            <div className="listproductadmin showwithsidebar">
                <div className="chart so1">
                    <div className="title"><h3>Top 5 sách bán chạy nhất tháng</h3></div>


                    <div className="content">
                        <PieChart width={500} height={500} onMouseEnter={this.onPieEnter}>
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