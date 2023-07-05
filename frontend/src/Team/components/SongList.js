import React, { useState, useEffect } from "react";

export const SongList = (props) => {

    const songItem = (
        <li>
            {props.song.level}
            {props.song.title}
            {props.song.difficulty}
        </li>
    )

    return (
        <div>
            <ul>

            </ul>
        </div>
    )
};

export default SongList