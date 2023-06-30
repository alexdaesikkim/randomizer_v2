import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { updateLimit, updateScore } from './../redux/matchSlice.js'

export const LimitCard = (props) => {

    const limit = useSelector((state) => state.match.songLimits[props.id]);
    const score = useSelector((state) => state.match.songScores[props.id]);
    const dispatch = useDispatch();

    return(
        <>
            <div className="songlimit-column">
                <label className={"songlimit-diff"}>
                    <input
                        value={limit.min_diff}
                        type="number"
                        min={1}
                        max={limit.max_diff < 12 ? limit.max_diff : 12}
                        onChange={(e) =>
                            dispatch(updateLimit({
                                    id: props.id,
                                    value: {...limit,
                                        min_diff: parseInt(e.target.value)
                                    }
                                })
                            )} />
                </label>
            </div>
            <div className="songlimit-column">
                <label className={"songlimit-diff"}>
                    <input
                        value={limit.max_diff}
                        type="number"
                        min={limit.min_diff > 1 ? limit.min_diff : 1}
                        max={12}
                        onChange={(e) => dispatch(updateLimit({id: props.id, value: {...limit, max_diff: parseInt(e.target.value)}}))} />
                </label>
            </div>
            <div className="songlimit-column">
                <label className={"songlimit-diff"}>
                    <select className={"select-genre"} value={limit.genre} onChange={(e) => dispatch(updateLimit({id: props.id, value: {...limit, genre: e.target.value}}))}>
                        <option>free</option>
                        <option>notes</option>
                        <option>peak</option>
                        <option>chord</option>
                        <option>scratch</option>
                        <option>charge</option>
                        <option>soflan</option>
                        <option>trend</option>
                    </select>
                </label>
            </div>
            <div className="songlimit-column">
                <label className={"songlimit-diff"}>
                    <select className={"select-genre"} value={score} onChange={(e) => dispatch(updateScore({id: props.id, value: e.target.value}))}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                </label>
            </div>
            <div className="songlimit-column delete-button-container">
                <button type="button" className="delete-button" onClick={() => props.delete()}>
                    -
                </button>
            </div>
        </>
    )
}

export default LimitCard