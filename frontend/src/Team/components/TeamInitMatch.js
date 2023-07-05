import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { initialize, setPlayerName, setPicks, setTeamName } from '../redux/teamSlice.js'

import songData from '../../../../SongData/BPLS3/regular/song_data.json';

import { MatchCard } from './MatchCard.js';

export const TeamInitMatch = (props) => {

    const dispatch = useDispatch();
    const team = useSelector((state) => state.team)

    /*

        
    */

    const getSongData = (id) => {
        if(id === -1) return({});
        let songType = id.replace(/[0-9]/g, '');
        let songID = id.replace(/\D/g, '');
        return(songData[songType][songID]);
    }

    const filterSongList = (type, config) => {
        return(songData[type].filter((value) => {
            return (value.level >= config.min_diff && value.level <= config.max_diff)
        }))
    }

    const matches = team.songLimits.map((value, index) => {
        return (
            <MatchCard
                min_diff = {value.min_diff}
                max_diff = {value.max_diff}
                genre = {value.genre}
                songList = {filterSongList(value.genre, {min_diff: value.min_diff, max_diff: value.max_diff})}
                selectedSong = {getSongData(team.picks[index])}
                id = {team.picks[index]}
                playerName = {team.players[index]}
                changeName = {(name) => dispatch(setPlayerName({value: name, id: index}))}
                index = {index}
            />
        )
    })

    console.log(team);

    return (
        <form>
            <div>
                <label className={"team-name"}>
                    <label htmlFor="player">Team Name</label>
                    <input type="text" id="player" name="player" value={team.name} onChange={(e) => dispatch(setTeamName({value: e.target.value}))}/>
                </label>
            </div>
            <div>
                {matches}
            </div>

        </form>
    )
};

export default TeamInitMatch