import { createSlice } from '@reduxjs/toolkit'

const songLimitFormat = {
    min_diff: 8,
    max_diff: 12,
    genre: "free"
}

const initialState = {
    songLimits: Array(3).fill(songLimitFormat),
    team1Name: "",
    team2Name: "",
    songScores: [1,2,3],
    team1StrategyCards: 1,
    team2StrategyCards: 1,
    exStrategyCard: false
}

export const matchSlice = createSlice({
    name: 'match',
    initialState: initialState,
    reducers: {
        setName: (state, action) => {
            if(action.payload.team === 1) state.team1Name = action.payload.value;
            else state.team2Name = action.payload.value;
        },
        setStrategyCard: (state, action) => {
            if(action.payload.team === 1) state.team1StrategyCards = action.payload.value;
            else state.team2StrategyCards = action.payload.value;
        },
        setEXStrategy: (state) => {
            state.exStrategyCard = !state.exStrategyCard
        },
        addLimit: (state) => {
            console.log([...state.songLimits, songLimitFormat])
            state.songLimits = [...state.songLimits, songLimitFormat]
            state.songScores = [...state.songScores, 3]
        },
        deleteLimit: (state, action) => {
            state.songLimits = state.songLimits.filter((_, id) => id !== action.payload.id);
            state.songScores = state.songScores.filter((_, id) => id !== action.payload.id);
        },
        updateLimit: (state, action) => {
            state.songLimits[action.payload.id] = action.payload.value
        },
        updateScore: (state, action) => {
            state.songScores[action.payload.id] = action.payload.value
        }
    }
})

export const { setName, setStrategyCard, setEXStrategy, addLimit, deleteLimit, updateLimit, updateScore } = matchSlice.actions;

export default matchSlice.reducer;