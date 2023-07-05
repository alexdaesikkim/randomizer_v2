import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { LimitCard } from "./components/LimitCard.js";
import { setName, setStrategyCard, setEXStrategy, addLimit, deleteLimit } from './redux/matchSlice.js'


const App = () => {

    const [matchSaved, setMatchSaved] = useState(false);
    const [matchID, setMatchID] = useState("");
    const [team1ID, setTeam1ID] = useState("");
    const [team2ID, setTeam2ID] = useState("");

    const match = useSelector((state) => state.match);
    const dispatch = useDispatch();

    const songLimitCard = match.songLimits.map((_, id) => {
        return(
            <LimitCard
                id={id}
                key={id}
                delete={() => dispatch(deleteLimit({id: id}))}
            />
        )
    })

    const saveAndFetchMatch = () => {
        const url = "http://localhost:3000/api/creatematch"
        const body = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "accepts": "application/json",
            },
            body: JSON.stringify(match)
        }
        console.log(body)

        fetch(url, body)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMatchSaved(true);
                setMatchID(data.message.matchID);
                setTeam1ID(data.message.team1ID);
                setTeam2ID(data.message.team2ID);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            {!matchSaved ? (<form>
                <div className={"team-container"}>
                    <div className={"team-column"}>
                        <label className={"team-item"}>
                            Team1 Name:
                            <br/>
                            <input value={match.team1Name} type="text" placeholder="Team 1" onChange={(e) => dispatch(setName({team: 1, value: e.target.value}))} />
                        </label>
                        <br/>
                        <br/>
                        <label className={"team-item"}>
                            # of Strategy Cards
                            <br/>
                            <input value={match.team1StrategyCards} type="number" min="0" max={match.songLimits.length} onChange={(e) => dispatch(setStrategyCard({team: 1, value: e.target.value}))} />
                        </label>
                    </div>
                    <div className={"team-column"}>
                        <label className={"team-item"}>
                            Team2 Name:
                            <br/>
                            <input value={match.team2Name} type="text" placeholder="Team 2" onChange={(e) => dispatch(setName({team: 2, value: e.target.value}))} />
                        </label>
                        <br/>
                        <br/>
                        <label className={"team-item"}>
                            # of Strategy Cards
                            <br/>
                            <input value={match.team2StrategyCards} type="number" min="0" max={match.songLimits.length} onChange={(e) => dispatch(setStrategyCard({team: 2, value: e.target.value}))} />
                        </label>
                    </div>
                </div>
                <div className={"common-container"}>
                    <div className={"common-column"}>
                        <label className={"checkbox-container"}>
                            <input type="checkbox" disabled id="exstrategy" name="exstrategy" value={match.exStrategyCard} onClick={() => dispatch(setEXStrategy())}/>
                            <label htmlFor="exstrategy">Use EX Strategy Card</label>
                        </label>
                    </div>
                </div>
                <div className={"songlimit-container"}>
                    <div className="songlimit-column">
                        Min Difficulty
                    </div>
                    <div className="songlimit-column">
                        Max Difficulty
                    </div>
                    <div className="songlimit-column">
                        Genre
                    </div>
                    <div className="songlimit-column">
                        Score
                    </div>
                    <div className="songlimit-column">
                    </div>
                    {songLimitCard}
                </div>
                <div className>
                    <button type="button" onClick={() => dispatch(addLimit())}>
                        Add Limit
                    </button>
                </div>
                <div className>
                    <button type="button" onClick={() => saveAndFetchMatch()}>
                        Submit
                    </button>
                </div>
                <br/>
                Team1 Name is: {match.team1Name}
                <br/>
                Team2 Name is: {match.team2Name}
                <br/>
                EX strategy is {match.exStrategyCard === true ? "Enabled" : "Disabled"}
            </form>) : 
                <>
                    <div className="">
                        MATCH URL: https://localhost:3001/streamview/{matchID}
                    </div>
                    <div className="">
                        {match.team1Name} URL: https://localhost:3001/match/{team1ID}
                    </div>
                    <div className="">
                        {match.team2Name} URL: https://localhost:3001/match/{team2ID}
                    </div>
                </>
            }
        </>
    );
};

export default App;