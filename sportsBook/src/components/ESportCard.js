import React, { Component } from 'react';


export default class ESportCard extends Component {


    render() {
        let matches = this.props.matches;
        function parseDate(date) {
            return (
                new Intl.DateTimeFormat('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(Date.parse(date))  // format the date of each match to make it more user-friendly in render
            )
        }
        return (

            <div className="container">
                <div className="row card-head">
                    <div className="col-md-6 esport-match-name">{matches[0].eventName}</div>
                    <div className="col-md-2 market">Market</div>
                    <div className="col-md-1">1</div>
                    <div className="col-md-1">X</div>
                    <div className="col-md-1">2</div>
                    <div className="col-md-1"></div>
                </div>
                {matches.map(m => (
                    <div className="row card-info" key={m.$.ID}>
                        <div className="col-sm-2 .col-12">{parseDate(m.$.StartDate)}</div>
                        <div className="col-sm-4 .col-12 esport-match-name">{m.$.Name}<span> / {matches[0].gameName} /</span></div>
                        <div className="col-sm-2 .col-12">{m.Bet ? m.Bet[0].$.Name : "locked"}</div>
                        <div className="odd col-sm-1 .col-4">{m.Bet ? m.Bet[0].Odd[0].$.Value : "locked"}</div>
                        <div className="odd col-sm-1 .col-4">  </div>
                        <div className="odd col-sm-1 .col-4">{m.Bet ? m.Bet[0].Odd[1].$.Value : "locked"}</div>
                        <div className="odd-number col-sm-1 .col-12">{m.Bet ? "+" + m.Bet.length : 0}</div>
                    </div>
                ))}

            </div>
        )
    }
}