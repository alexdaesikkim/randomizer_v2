import React, { useState, useEffect } from "react";

export const MatchCard = (props) => {

    console.log(props.songList)

    return (
        <div>
            <div>
                Match {props.index+1}
            </div>
            <div>
                {props.genre.toUpperCase()} Level {props.min_diff !== props.max_diff ? props.min_diff + "-" + props.max_diff : props.min_diff}
            </div>
            <div>
                <label className={"player-name"}>
                    <label htmlFor="player">Player Name</label>
                    <input type="text" id="player" name="player" value={props.playerName} onChange={(e) => props.changeName(e.target.value)}/>
                </label>
                <div>
                    {props.id !== -1 ?
                        <div>
                            Selected Song
                        </div> : <></>
                    }
                </div>
            </div>
        </div>
    )
};

export default MatchCard