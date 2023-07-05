import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { initialize } from './redux/teamSlice.js';

import { TeamInitMatch } from './components/TeamInitMatch.js';

import songData from '../../../SongData/BPLS3/regular/song_data.json';

const notes = songData.notes;
const peak = songData.peak;
const chord = songData.chord;
const charge = songData.charge;
const scratch = songData.scratch;
const soflan = songData.soflan;
const trend = songData.trend;

const Team = () => {

    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);

    const dispatch = useDispatch();

    const grabTeamData = () => {
        const url = "http://localhost:3000/api/retrievematch/" + params.get("matchid") + "/" + params.get("teamid") + "/"
        const body = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "accepts": "application/json",
            }
        }

        fetch(url, body)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                dispatch(initialize({value: data.message}))
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        grabTeamData()
    }, [])

    return (
        <TeamInitMatch
            notes = {notes}
            peak = {peak}
            chord = {chord}
            charge = {charge}
            scratch = {scratch}
            soflan = {soflan}
            trend = {trend}
        />
    )
};

export default Team;