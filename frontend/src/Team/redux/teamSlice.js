import { createSlice } from '@reduxjs/toolkit'

const initialState =  {
    "name": "",
    "id": "",
    "players": [
        "",
        "",
        ""
    ],
    "picks": [
        -1,
        -1,
        -1
    ],
    "strategyCards": 1,
    "songLimits": [
        {
            "min_diff": 8,
            "max_diff": 10,
            "genre": "soflan"
        },
        {
            "min_diff": 11,
            "max_diff": 11,
            "genre": "soflan"
        },
        {
            "min_diff": 12,
            "max_diff": 12,
            "genre": "soflan"
        }
    ],
    "exStrategyCard": false,
    "songScores": [
        1,
        2,
        3
    ]
}

export const teamSlice = createSlice({
    name: 'match',
    initialState: initialState,
    reducers: {
        //initialize after backend call, replaces entire initial state
        initialize: (_, action) => {
            return action.payload.value;
        },
        //set player name (action takes string and id)
        setTeamName: (state, action) => {
            state.name = action.payload.value;
        },
        setPlayerName: (state, action) => {
            state.players[action.payload.id] = action.payload.value;
        },
        //set pick ID (action takes string and id)
        setPicks: (state, action) => {
            state.picks[action.payload.id] = action.payload.value;
        }
    }
})

export const { initialize, setPlayerName, setPicks, setTeamName } = teamSlice.actions;

export default teamSlice.reducer;