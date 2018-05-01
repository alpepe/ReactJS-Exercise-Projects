import React, { Component } from 'react';
import ESportCard from './ESportCard'
import { getAllMatches } from '../api/remote'

export default class ESports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            groupedMatches: [],
            allMatches: [],
            filter: "all",
        }

        this.takeAllMatches = this.takeAllMatches.bind(this);
        this.takeAllEvents = this.takeAllEvents.bind(this);
        this.gameFilter = this.gameFilter.bind(this);
        this.groupMactchesByEvent = this.groupMactchesByEvent.bind(this);
    }

    componentDidMount() {
        this.getData(this.state.filter)
        setInterval(() => {
            this.getData(this.state.filter)
            // console.log(this.state.filter)
        }, 10000)
    }


    async getData(filter) {

        const res = await getAllMatches()
        console.log(res)
        const events = res.XmlSports.Sport[0].Event
        const allMatches = this.takeAllMatches(events)
        const filteredMatches = this.state.filter === "all" ? allMatches : allMatches.filter(el => el.gameName === this.state.filter)
        const groupedMatches = this.groupMactchesByEvent(filteredMatches)
        const groupedEvents = this.takeAllEvents(events)

        this.setState({ allMatches: allMatches })
        this.setState({ groupedMatches: groupedMatches })
        this.setState({ events: groupedEvents })
        // console.log(this.state.groupedMatches)
        // console.log(this.state.events)
    }

    takeAllMatches(events) {
        let matchesArr = [];          // I create an array in which I will put all the matches so that I can sort them
        for (let event of events) {
            for (let match of event.Match) {
                match.gameName = event.$.Name.split(',')[0]   // I add the name of the game to the match so I can render them after
                match.eventName = event.$.Name.split(',')[1]   // I add the name of the event to the match so I can render and group them after
                matchesArr.push(match)
            }
        }
        matchesArr = matchesArr.sort(function (a, b) {
            return new Date(a.$.StartDate) - new Date(b.$.StartDate); //sorted all matches by StartDate
        })

        return matchesArr;
    }

    takeAllEvents(events) {
        let eventsArr = [];   // I create an array in which I will put objects with the names of the games(eSport) and their events

        for (let event of events) {
            let gameName = event.$.Name.split(', ')[0];
            let eventName = event.$.Name.split(', ')[1];
            let id = event.$.ID;
            if (eventsArr.filter(el => el.game === gameName).length === 0) {
                eventsArr.push({ game: gameName, events: [eventName], ID: id })
            } else {
                eventsArr.filter(el => el.game === gameName)[0].events.push(eventName)
            }
        }

        return eventsArr
    }

    groupMactchesByEvent(arr) {
        let groupedMatchesArr = []  // here I will put the sorted matches by date, if there are 2 or more of one event, one after the other I group them
        for (let i = arr.length - 1; i >= 0; i--) {
            if (i !== arr.length - 1 && arr[i].eventName === arr[i + 1].eventName) {
                groupedMatchesArr[0].unshift(arr[i])
            } else {
                groupedMatchesArr.unshift([arr[i]])
            }
        }
        return groupedMatchesArr
    }

    // gameFilter(matches, game) {
    //     if (game === "all") {
    //         return matches
    //     } else {
    //         let filteredMatchesArr = matches.filter(el => el.gameName === game)
    //         return filteredMatchesArr
    //     }
    // }

    gameFilter(matches, game) {
        this.setState({ filter: game })
        if (game === "all") {
            let m = this.groupMactchesByEvent(matches)
            this.setState({ groupedMatches: m })
        } else {
            this.setState({ groupedMatches: this.state.allMatches })
            let filteredMatchesArr = matches.filter(el => el.gameName === game)
            filteredMatchesArr = this.groupMactchesByEvent(filteredMatchesArr)
            this.setState({ groupedMatches: filteredMatchesArr })
        }
    }

    render() {

        return (
            <div className="container-fluid e-sport">
                {this.state.groupedMatches.length === 0 ? <span className="loading">Loading...</span> : (
                    <div className="row space-top">
                        <div className="col-md-2 .col-1">
                            <div className="game-btn-container">
                                <button className="gameBtn" onClick={(e) => this.gameFilter(this.state.allMatches, "all", e)}>All</button>
                                {this.state.events.map(event => (
                                    <button key={event.ID} className="gameBtn" onClick={(e) => this.gameFilter(this.state.allMatches, event.game, e)}>{event.game}</button>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-10 .col-12">
                            {this.state.groupedMatches.map((matches, index) => (
                                <ESportCard
                                    key={index}
                                    matches={matches}
                                />
                            ))}
                        </div>
                    </div>
                )
                }
            </div>
        );
    }
}