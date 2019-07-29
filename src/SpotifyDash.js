import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';

class SpotifyDash extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            metric: '',
            userArray: [
                {
                    date: '4/1/17',
                    total: 12248268,
                    ad: 7863901,
                    premium: 4384367
                },
                {
                    date: '5/1/17',
                    total: 11862824,
                    ad: 7587179,
                    premium: 4275645
                },
                {
                    date: '6/1/17',
                    total: 11880081,
                    ad: 7339473,
                    premium: 4540608
                },
                {
                    date: '7/1/17',
                    total: 11937315,
                    ad: 7258026,
                    premium: 4679289
                },
                {
                    date: '8/1/17',
                    total: 11741538,
                    ad: 7225856,
                    premium: 4515682
                },
                {
                    date: '9/1/17',
                    total: 12845348,
                    ad: 7874945,
                    premium: 4970403
                },
                {
                    date: '10/1/17',
                    total: 13381016,
                    ad: 8391798,
                    premium: 4989218
                }],
            revenueArray: [
                {
                    date: '4/1/17',
                    total: 5322604,
                    ad: 784857,
                    premium: 4537747
                },
                {
                    date: '5/1/17',
                    total: 5027634,
                    ad: 764987,
                    premium: 4262647
                },
                {
                    date: '6/1/17',
                    total: 5083773,
                    ad: 669870,
                    premium: 4413903
                },
                {
                    date: '7/1/17',
                    total: 5130864,
                    ad: 662659,
                    premium: 4468205
                },
                {
                    date: '8/1/17',
                    total: 4640004,
                    ad: 602170,
                    premium: 4037834
                },
                {
                    date: '9/1/17',
                    total: 5399450,
                    ad: 656385,
                    premium: 4743065
                },
                {
                    date: '10/1/17',
                    total: 5466510,
                    ad: 748911,
                    premium: 4717599
                }
            ],
            streamsArray: [
                {
                    date: '4/1/17',
                    total: 7478932815,
                    ad: 3078134723,
                    premium: 4400798092
                },
                {
                    date: '5/1/17',
                    total: 7637383080,
                    ad: 3127859489,
                    premium: 4509523591
                },
                {
                    date: '6/1/17',
                    total: 7465492281,
                    ad: 2867727507,
                    premium: 4597764774
                },
                {
                    date: '7/1/17',
                    total: 7651207170,
                    ad: 2882522615,
                    premium: 4768684555
                },
                {
                    date: '8/1/17',
                    total: 7580618120,
                    ad: 2919910063,
                    premium: 4660708057
                },
                {
                    date: '9/1/17',
                    total: 8121446702,
                    ad: 3115612816,
                    premium: 5005833886
                },
                {
                    date: '10/1/17',
                    total: 8725424037,
                    ad: 3492854683,
                    premium: 5232569354
                }
            ]
        }

        this.handleClick = this.handleClick.bind(this);
        this.pushData = this.pushData.bind(this);
        this.percentToPriorMonthCalc = this.percentToPriorMonthCalc.bind(this);
    }

    componentDidMount() {
        this.setState({
            data: this.state.userArray
        })

        this.percentToPriorMonthCalc(this.state.userArray);
    }

    pushData(metric) {
        if (metric === 'users') {
            this.setState({
                data: this.state.userArray
            })

        } else if (metric === 'revenue') {
            this.setState({
                data: this.state.revenueArray
            })
        } else if (metric === 'streams') {
            this.setState({
                data: this.state.streamsArray
            })
        }
    }


    handleClick(e) {
        e.preventDefault();
        let metric = '';

        if (e.target.getAttribute('name') === 'users') {
            metric = 'users'
            this.pushData(metric)
        } else if (e.target.getAttribute('name') === 'revenue') {
            metric = 'revenue'
            this.pushData(metric)
        } else if (e.target.getAttribute('name') === 'streams') {
            metric = 'streams'
            this.pushData(metric)
        }
    }

    percentToPriorMonthCalc(arr) {
        const calcArray = [];

        for (let i=1; i < arr.length; i++) {
            let currentTotal = arr[i].total;
            let prevTotal = arr[i-1].total;

            let calc = ((currentTotal/prevTotal-1) * 100).toFixed(0) + '%';
            calcArray.push(calc);
        }
        this.setState({
            tableArray: calcArray
        })
    }


    render() {
        const logoStyle = {
            width: '50px',
            height: '50px',
        }

        const topContainerStyle = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '10px'
        }

        const chartTitle = {
            marginTop: '50px',
            fontSize: '14px'
        }

        const totalTableCalc = this.state.tableArray && this.state.tableArray.map((i, perc) => (
            <tr key={i}>
                <th className='tableHeader'>TOTAL</th>
                <td>-</td>
                <td>{perc}</td>
                {/* <td>{perc}</td>
                <td>{perc}</td>
                <td>{perc}</td>
                <td>{perc}</td> */}
            </tr>
        ))

        return (
            <React.Fragment>
                <div className='topContainer' style={topContainerStyle}>
                    <div className='logoDiv'>
                        <img src='https://i.ibb.co/k9W20Wc/spotify.png' style={logoStyle} alt='spotifyLogo' />
                        <p><strong>Spotify Dashboard</strong></p>
                    </div>
                    <div className='chartTitle' style={chartTitle}>
                        <p>Select Metric Below:</p>
                        <p name='users' onClick={this.handleClick}>Users</p>
                        <p name='revenue' onClick={this.handleClick}>Revenue</p>
                        <p name='streams' onClick={this.handleClick}>Streams</p>
                    </div>
                </div>
                <ResponsiveContainer width='80%' height={400} className='spotDash'>
                    <LineChart
                        data={this.state.data}
                        margin={{
                            top: 100, right: 30, left: 70, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Text />
                        <Line type='natural' dataKey='total' stroke='#000000' />
                        <Line type='natural' dataKey='ad' stroke='#E50D0D' />
                        <Line type='natural' dataKey='premium' stroke='#008000' />
                    </LineChart>
                </ResponsiveContainer>

                <div className='tableDiv'>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
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
                            {totalTableCalc}
                            {/* <tr>
                                <th className='tableHeader'>Ad-Funded</th>
                                <td>-</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                            </tr>
                            <tr>
                                <th className='tableHeader'>Premium</th>
                                <td>-</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td>50%</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

export default SpotifyDash;