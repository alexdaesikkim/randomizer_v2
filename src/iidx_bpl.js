import { matchesPattern } from "@babel/types";

const blankMatchFormat = {
    team1: {
        name: "",
        id: "",
        players: [],
        picks: [],
        strategyCards: 0
    },
    team2: {
        name: "",
        id: "",
        players: [],
        picks: [],
        strategyCards: 0
    },
    limits: [],
    scores: [],
    result: []
}

/*
    createBPLMatch

    input: config (object)
    output: new match setting (object)

    config needs the following:
    config.limits -> array of song limits, defined by: min_diff, max_diff, and genre
    config.team<num>StrategyCards -> num of strategy available
    config.team<num>Name -> names of teams
    config.scores -> score distribution of each match
*/

export const createBPLMatch = (config) => {
    let songLimits = config.limits;
    let copyMatch = {...blankMatchFormat};
    let matchID = Math.random().toString(36).slice(2);
    copyMatch.limits = songLimits;
    copyMatch.scores = config.scores
    copyMatch.result = new Array(songLimits.length*2).fill(0);
    copyMatch.team1.id = Math.random().toString(36).slice(2);
    copyMatch.team2.id = Math.random().toString(36).slice(2);
    copyMatch.team1.players = new Array(songLimits.length).fill("");
    copyMatch.team1.picks = new Array(songLimits.length).fill(-1);
    copyMatch.team2.players = new Array(songLimits.length).fill("");
    copyMatch.team2.picks = new Array(songLimits.length).fill(-1);
    copyMatch.team1.strategyCards = config.team1StrategyCards;
    copyMatch.team2.strategyCards = config.team2StrategyCards;
    copyMatch.team1.name = config.team1Name;
    copyMatch.team2.name = config.team2Name;
    let newMatch = {};
    newMatch[matchID] = copyMatch
    //shouldn't we connect to redis here?
    return newMatch;
}

/*
    updateSongResult

    input: match, songNum, winner
    songNum: integer
    winner: integer (1 or 2, only referring to the winner)
    output: updated match json
    updates the result array
*/

export const updateSongResult = (match, songNum, winner) => {
    let key = Object.keys(match)[0]
    let updatedArray = match[key].result;
    updatedArray[songNum-1] = winner;
    let newObj = {...match}
    newObj[key].result = updatedArray;
    return newObj;
}

/*
    updateSongPicks

    input: match, team, songArray
    team: team in integer
    songArray: array of songIDs (defined for BPL only)
    output: updated match json
*/
export const updateSongPicks = (match, team, songArray) => {
    let key = Object.keys(match)[0]
    if(team === 1) return {
        ...match,
        [key]:{
            ...match[key],
            team1: {
                ...match[key].team1,
                picks: songArray
            }
        }
    }
    else return {
        ...match,
        [key]:{
            ...match[key],
            team2: {
                ...match[key].team2,
                picks: songArray
            }
        }
    }
}