import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";

class VisualDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            metric: "",
            lineChartTitle: "Users",
            userArray: [
                {
                    date: "4/1/17",
                    total: 12248268,
                    ad: 7863901,
                    premium: 4384367
                },
                {
                    date: "5/1/17",
                    total: 11862824,
                    ad: 7587179,
                    premium: 4275645
                },
                {
                    date: "6/1/17",
                    total: 11880081,
                    ad: 7339473,
                    premium: 4540608
                },
                {
                    date: "7/1/17",
                    total: 11937315,
                    ad: 7258026,
                    premium: 4679289
                },
                {
                    date: "8/1/17",
                    total: 11741538,
                    ad: 7225856,
                    premium: 4515682
                },
                {
                    date: "9/1/17",
                    total: 12845348,
                    ad: 7874945,
                    premium: 4970403
                },
                {
                    date: "10/1/17",
                    total: 13381016,
                    ad: 8391798,
                    premium: 4989218
                }
            ],
            revenueArray: [
                {
                    date: "4/1/17",
                    total: 5322604,
                    ad: 784857,
                    premium: 4537747
                },
                {
                    date: "5/1/17",
                    total: 5027634,
                    ad: 764987,
                    premium: 4262647
                },
                {
                    date: "6/1/17",
                    total: 5083773,
                    ad: 669870,
                    premium: 4413903
                },
                {
                    date: "7/1/17",
                    total: 5130864,
                    ad: 662659,
                    premium: 4468205
                },
                {
                    date: "8/1/17",
                    total: 4640004,
                    ad: 602170,
                    premium: 4037834
                },
                {
                    date: "9/1/17",
                    total: 5399450,
                    ad: 656385,
                    premium: 4743065
                },
                {
                    date: "10/1/17",
                    total: 5466510,
                    ad: 748911,
                    premium: 4717599
                }
            ],
            streamsArray: [
                {
                    date: "4/1/17",
                    total: 7478932815,
                    ad: 3078134723,
                    premium: 4400798092
                },
                {
                    date: "5/1/17",
                    total: 7637383080,
                    ad: 3127859489,
                    premium: 4509523591
                },
                {
                    date: "6/1/17",
                    total: 7465492281,
                    ad: 2867727507,
                    premium: 4597764774
                },
                {
                    date: "7/1/17",
                    total: 7651207170,
                    ad: 2882522615,
                    premium: 4768684555
                },
                {
                    date: "8/1/17",
                    total: 7580618120,
                    ad: 2919910063,
                    premium: 4660708057
                },
                {
                    date: "9/1/17",
                    total: 8121446702,
                    ad: 3115612816,
                    premium: 5005833886
                },
                {
                    date: "10/1/17",
                    total: 8725424037,
                    ad: 3492854683,
                    premium: 5232569354
                }
            ]
        };

        this.handleClick = this.handleClick.bind(this);
        this.pushData = this.pushData.bind(this);
        this.priorMonthCalcLoop = this.priorMonthCalcLoop.bind(this);
        this.percentToPriorMonthCalc = this.percentToPriorMonthCalc.bind(this);
        this.monlthyShareCalcLoop = this.monlthyShareCalcLoop.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: this.state.userArray
        });

        this.priorMonthCalcLoop(this.state.userArray);
        this.monlthyShareCalcLoop(this.state.userArray);
    }

    pushData(metric) {
        if (metric === "users") {
            this.setState({
                data: this.state.userArray,
                lineChartTitle: "Users"
            });
        } else if (metric === "revenue") {
            this.setState({
                data: this.state.revenueArray,
                lineChartTitle: "Revenue"
            });
        } else if (metric === "streams") {
            this.setState({
                data: this.state.streamsArray,
                lineChartTitle: "Streams"
            });
        }
    }

    handleClick(e) {
        e.preventDefault();
        let metric = "";

        if (e.target.getAttribute("name") === "users") {
            metric = "users";
            this.pushData(metric);
            this.priorMonthCalcLoop(this.state.userArray);
            this.monlthyShareCalcLoop(this.state.userArray);
        } else if (e.target.getAttribute("name") === "revenue") {
            metric = "revenue";
            this.pushData(metric);
            this.priorMonthCalcLoop(this.state.revenueArray);
            this.monlthyShareCalcLoop(this.state.revenueArray);
        } else if (e.target.getAttribute("name") === "streams") {
            metric = "streams";
            this.pushData(metric);
            this.priorMonthCalcLoop(this.state.streamsArray);
            this.monlthyShareCalcLoop(this.state.streamsArray);
        }
    }

    priorMonthCalcLoop(arr) {
        const totalPercentArray = [];
        const adPercentArray = [];
        const premPercentArray = [];

        const totalPercentObj = {}
        const adPercentObj = {}
        const premPercentObj = {}

        for (let i = 1; i < arr.length; i++) {
            let currentTotal = arr[i].total;
            let prevTotal = arr[i - 1].total;

            let currentAdTotal = arr[i].ad;
            let prevAdTotal = arr[i-1].ad;

            let currentPremTotal = arr[i].premium;
            let prevPremTotal = arr[i-1].premium;

            let totalResult = this.percentToPriorMonthCalc(prevTotal, currentTotal);
            let adResult = this.percentToPriorMonthCalc(prevAdTotal, currentAdTotal);
            let premResult = this.percentToPriorMonthCalc(prevPremTotal, currentPremTotal);

            totalPercentObj[i] = totalResult;
            adPercentObj[i] = adResult;
            premPercentObj[i] = premResult;
        }
        totalPercentArray.push(totalPercentObj);
        adPercentArray.push(adPercentObj);
        premPercentArray.push(premPercentObj);


        this.setState({
            totalPriorMonthArray: totalPercentArray,
            adPriorMonthArray: adPercentArray,
            premPriorMonthArray : premPercentArray
        });
        console.log(totalPercentArray);
        console.log(adPercentArray);
        console.log(premPercentArray);
    }

    percentToPriorMonthCalc(prevMonthTotal, currentMonthTotal) {
        let finalPercentage = ((currentMonthTotal / prevMonthTotal - 1) * 100).toFixed(0);

        if (finalPercentage > 0) {
            finalPercentage = '+' + finalPercentage + '%'
            console.log( finalPercentage);
            return finalPercentage
        } else {
            finalPercentage = finalPercentage + '%';
            console.log( finalPercentage);
            return finalPercentage
        }
    }

    monlthyShareCalcLoop(arr) {
        const adShareArray = [];
        const premShareArray = [];

        const adShareObj = {};
        const premShareObj = {};

        for (let i = 0; i < arr.length; i++) {
            let currentTotal = arr[i].total;
            let adTotal = arr[i].ad;
            let premTotal = arr[i].premium;

            let monthlyAdShare = ((adTotal/currentTotal) * 100).toFixed(0) + '%';
            let monlthyPremShare = ((premTotal/currentTotal) * 100).toFixed(0) + '%';

            adShareObj[i] = monthlyAdShare;
            premShareObj[i] = monlthyPremShare;
        }
        adShareArray.push(adShareObj);
        premShareArray.push(premShareObj);

        this.setState({
            monthlyAdShareArray: adShareArray,
            monthlyPremShareArray: premShareArray
        });

        console.log(adShareArray)
        console.log(premShareArray);
        
    }


    render() {
        const logoStyle = {
            width: "50px",
            height: "50px"
        };

        const navFilterStyle = {
            marginTop: "10px",
        };

        const chartTitleStyle = {
            fontSize: '1.5em',
            fontWeight: 'bold',
            textAlign: 'center'
        }

        return (
            <div className='main-container'>

                <div className="navbar-container">
                    <div className="navbar-logo">
                        <img
                            src="https://i.ibb.co/k9W20Wc/spotify.png"
                            style={logoStyle}
                            alt="spotifyLogo"
                        />
                        <p><strong>Spotify Dashboard</strong></p>
                    </div>
                    <div className="navbar-links" style={navFilterStyle}>
                        <p>Select a Metric Below:</p>
                        <ul style={{ paddingLeft: 0 }}>
                            <li name="users" onClick={this.handleClick}>Users</li>
                            <li name="revenue" onClick={this.handleClick}>Revenue</li>
                            <li name="streams" onClick={this.handleClick}>Stream</li>
                        </ul>
                    </div>
                </div>

                <div className="content-flex-container">

                    <div className="line-chart-flex">
                        <p style={chartTitleStyle}>{this.state.lineChartTitle} by Month</p>
                        <ResponsiveContainer
                            className="line-chart-container"
                            width="99%"
                            height={288}
                            aspect={2}
                        >
                            <LineChart data={this.state.data} className="line-chart-div">
                                <CartesianGrid strokeDasharray="1 1" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="natural" dataKey="total" stroke="#000000" />
                                <Line type="natural" dataKey="ad" stroke="#3f72af" />
                                <Line type="natural" dataKey="premium" stroke="#293462" />
                            </LineChart>
                        </ResponsiveContainer>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="tableHeader">% to Prior Month</th>
                                        <th>4/1/17</th>
                                        <th>5/1/17</th>
                                        <th>6/1/17</th>
                                        <th>7/1/17</th>
                                        <th>8/1/17</th>
                                        <th>9/1/17</th>
                                        <th>10/1/17</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.totalPriorMonthArray && this.state.totalPriorMonthArray.map((result, index) =>
                                        <tr key={index} className='tableHeader'>
                                            <th>Total</th>
                                            <td>-</td>
                                            <td>{result[1]}</td>
                                            <td>{result[2]}</td>
                                            <td>{result[3]}</td>
                                            <td>{result[4]}</td>
                                            <td>{result[5]}</td>
                                            <td>{result[6]}</td>
                                        </tr>
                                        )}
                                    {this.state.adPriorMonthArray && this.state.adPriorMonthArray.map((result, index) =>
                                        <tr key={index} className='tableHeader'>
                                            <th>Ad-Funded</th>
                                            <td>-</td>
                                            <td>{result[1]}</td>
                                            <td>{result[2]}</td>
                                            <td>{result[3]}</td>
                                            <td>{result[4]}</td>
                                            <td>{result[5]}</td>
                                            <td>{result[6]}</td>
                                        </tr>
                                    )}

                                    {this.state.premPriorMonthArray && this.state.premPriorMonthArray.map((result, index) =>
                                        <tr key={index} className='tableHeader'>
                                            <th>Premium</th>
                                            <td>-</td>
                                            <td>{result[1]}</td>
                                            <td>{result[2]}</td>
                                            <td>{result[3]}</td>
                                            <td>{result[4]}</td>
                                            <td>{result[5]}</td>
                                            <td>{result[6]}</td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bar-chart-flex">
                        <p style={chartTitleStyle}>{this.state.lineChartTitle} - Monthly Share % (Ad-Funded vs.
                            Premium)</p>
                        <ResponsiveContainer
                            width="99%"
                            height={288}
                            aspect={2}
                        >
                            <BarChart
                                width={480}
                                height={288}
                                data={this.state.data}
                                className="bar-chart-container"
                            >
                                <XAxis dataKey="date" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="1 1" />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="ad" stackId="a" fill="#3f72af" />
                                <Bar dataKey="premium" stackId="a" fill="#293462" />
                            </BarChart>
                        </ResponsiveContainer>

                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="tableHeader">Share %</th>
                                        <th>4/1/17</th>
                                        <th>5/1/17</th>
                                        <th>6/1/17</th>
                                        <th>7/1/17</th>
                                        <th>8/1/17</th>
                                        <th>9/1/17</th>
                                        <th>10/1/17</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.monthlyAdShareArray && this.state.monthlyAdShareArray.map((result, index) =>
                                        <tr key={index} className='tableHeader'>
                                            <th>Ad-Funded</th>
                                            <td>{result[0]}</td>
                                            <td>{result[1]}</td>
                                            <td>{result[2]}</td>
                                            <td>{result[3]}</td>
                                            <td>{result[4]}</td>
                                            <td>{result[5]}</td>
                                            <td>{result[5]}</td>
                                        </tr>
                                        )}
                                    {this.state.monthlyPremShareArray && this.state.monthlyPremShareArray.map((result, index) =>
                                        <tr key={index} className='tableHeader'>
                                            <th>Premium</th>
                                            <td>{result[0]}</td>
                                            <td>{result[1]}</td>
                                            <td>{result[2]}</td>
                                            <td>{result[3]}</td>
                                            <td>{result[4]}</td>
                                            <td>{result[5]}</td>
                                            <td>{result[5]}</td>
                                        </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default VisualDashboard;
