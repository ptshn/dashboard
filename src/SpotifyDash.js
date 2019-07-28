import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class SpotifyDash extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            data: [
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
                },
            ]
        }
    }

    render() {
        return (
            <LineChart
                width={864}
                height={288}
                data={this.state.data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
            <XAxis dataKey='date' />
            <YAxis />
            <Line type='natural' dataKey='total' stroke='#000000' />
            <Line type='natural' dataKey='ad' stroke='#000000' />
            <Line type='natural' dataKey='premium' stroke='#000000' />

            </LineChart>
        )
    }
}

export default SpotifyDash;