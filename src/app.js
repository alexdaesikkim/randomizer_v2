import dotenv from "dotenv";
import express, {json} from 'express';
import * as BPL from './iidx_bpl';
import * as redis from 'redis';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(json())
app.use(cors())

const PORT = process.env.PORT || 3000;

const redisClient = redis.createClient({
    socket: {
        host: process.env.REDISHOST,
        port: process.env.REDISPORT
    },
    password: process.env.REDISPASSWORD
})

redisClient.on('connect', _ => {
    console.log('connected')
})

//main page
//admin
//team view
//stream view

redisClient.on('error', err => console.log('Redis Server Error', err));

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Successful call to the app"})
})

app.get('/api/retrievematch/:matchid', async (req, res) => {
    console.log()
})

app.get('/api/retrievematch/:matchid/:teamid', async(req, res) => {
    let matchID = req.params.matchid
    let teamID = req.params.teamid

    await redisClient.connect();
    let matchObj = await redisClient.json.get(matchID, {path: '.'});
    console.log(matchObj);
    //console.log(await redisClient.json.get(matchID, {path: `.[${teamID}]`}))
    await redisClient.quit();
    let returnObj = {}
    if(teamID === matchObj.team1.id){
        returnObj = matchObj.team1
    } else if(teamID === matchObj.team2.id){
        returnObj = matchObj.team2
    } else {
        return res.status(404).json({error: 'Match not found'})
    }
    returnObj.songLimits = matchObj.songLimits;
    returnObj.exStrategyCard = matchObj.exStrategyCard;
    returnObj.songScores = matchObj.songScores;

    return res.json({ status: true, message: returnObj})
})

app.post('/api/creatematch', async (req, res) => {
    console.log(req.body)
    let response = BPL.createBPLMatch(req.body);
    let matchID = Object.keys(response)[0];
    await redisClient.connect();
    await redisClient.json.set(matchID, '.', response[matchID]);
    
    let returnObj = {
        matchID: matchID,
        team1ID: response[matchID].team1.id,
        team2ID: response[matchID].team2.id
    }

    await redisClient.quit();
    console.log(returnObj)

    res.json({ status: true, message: returnObj});
})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`))