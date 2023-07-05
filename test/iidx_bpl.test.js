import { exportAllDeclaration } from '@babel/types';
import { expect, test, describe } from '@jest/globals';
import * as BPL from '../src/iidx_bpl.js';

const round1Limits = [
    {
        min_diff: 8,
        max_diff: 10,
        genre: "scratch"
    }, {
        min_diff: 10,
        max_diff: 10,
        genre: "notes"
    }, {
        min_diff: 11,
        max_diff: 11,
        genre: "peak"
    }
]

const round2Limits = [
    {
        min_diff: 8,
        max_diff: 10,
        genre: "chord"
    }, {
        min_diff: 11,
        max_diff: 11,
        genre: "charge"
    }, {
        min_diff: 12,
        max_diff: 12,
        genre: "soflan"
    }
]

describe('creating new match of type 1', () => {
    let match;
    let key;

    beforeAll(() => {
        match = BPL.createBPLMatch({
            songLimits: round1Limits,
            team1StrategyCards: 1,
            team2StrategyCards: 1,
            team1Name: "ROUND1",
            team2Name: "LEISURELAND",
            songScores: [1, 2, 3],
            exStrategyCard: false
        })
        key = Object.keys(match)[0]
    })

    test('expect config creation to return correct match1 format', () => {
        expect(match[key].team1.name).toBe("ROUND1")
        expect(match[key].team1.strategyCards).toBe(1)
        expect(match[key].team1.players.length).toBe(3)
        expect(match[key].team1.picks.length).toBe(3)
        expect(match[key].team2.name).toBe("LEISURELAND")
        expect(match[key].team2.strategyCards).toBe(1)
        expect(match[key].team2.players.length).toBe(3)
        expect(match[key].team2.picks.length).toBe(3)
        expect(match[key].songLimits).toEqual(round1Limits)
        expect(match[key].songScores).toStrictEqual([1, 2, 3])
        expect(match[key].result).toStrictEqual([0, 0, 0, 0, 0, 0])
        expect(match[key].exStrategyCard).toBe(false)
    })

    test('expect updating scores to return correct value', () => {
        let newMatch = BPL.updateSongResult(match, 1, 1)
        expect(newMatch[key].result).toStrictEqual([1, 0, 0, 0, 0, 0])

        newMatch = BPL.updateSongResult(newMatch, 2, 2)
        expect(newMatch[key].result).toStrictEqual([1, 2, 0, 0, 0, 0])
    })

    test('expect updating song IDs to return correct value', () => {
        let newMatch = BPL.updateSongPicks(match, 1, [42, 53, 61])
        expect(newMatch[key].team1.picks).toStrictEqual([42, 53, 61])
        expect(newMatch[key].team2.picks).not.toStrictEqual([42, 53, 61])

        newMatch = BPL.updateSongPicks(newMatch, 2, [1, 4, 3])
        expect(newMatch[key].team1.picks).toStrictEqual([42, 53, 61])
        expect(newMatch[key].team2.picks).toStrictEqual([1, 4, 3])

    })
})

describe('creating new match of type 2', () => {
    let match;

    beforeAll(() => {
        match = BPL.createBPLMatch({
            songLimits: round2Limits,
            team1StrategyCards: 0,
            team2StrategyCards: 0,
            team1Name: "GAMEPANIC",
            team2Name: "SILKHAT",
            songScores: [1, 2, 3],
            exStrategyCard: false
        })
    })

    test('expect config creation to return correct match2 format', () => {
    
        let key = Object.keys(match)[0]

        expect(match[key].team1.name).toBe("GAMEPANIC")
        expect(match[key].team1.strategyCards).toBe(0)
        expect(match[key].team1.players.length).toBe(3)
        expect(match[key].team1.picks.length).toBe(3)
        expect(match[key].team2.name).toBe("SILKHAT")
        expect(match[key].team2.strategyCards).toBe(0)
        expect(match[key].team2.players.length).toBe(3)
        expect(match[key].team2.picks.length).toBe(3)
        expect(match[key].songLimits).toEqual(round2Limits)
        expect(match[key].songScores).toStrictEqual([1, 2, 3])
        expect(match[key].result).toStrictEqual([0, 0, 0, 0, 0, 0])
    })
})