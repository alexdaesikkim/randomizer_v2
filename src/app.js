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

app.get('/api/retrievematch', async(req, res) => {
    const value = await client.get('test1');
    console.log(value)
})

app.get('/api/creatematch', async (req, res) => {
    console.log(req)
    let config = {
        limits: [
            {
                min_diff: 8,
                max_diff: 10,
                genre: "soflan"
            }, {
                min_diff: 11,
                max_diff: 11,
                genre: "soflan"
            }, {
                min_diff: 12,
                max_diff: 12,
                genre: "soflan"
            }
        ],
        team1Name: "ROUND1",
        team2Name: "LEISURELAND",
        team1StrategyCards: 1,
        team2StrategyCards: 1,
        scores: [1, 2, 3]
    }
    let response = BPL.createBPLMatch(config);
    let matchID = Object.keys(response)[0];
    await redisClient.connect();
    await redisClient.json.set(matchID, '.', response[matchID]);
    
    let returnObj = {
        matchID: matchID,
        team1ID: response[matchID].team1.id,
        team2ID: response[matchID].team2.id
    }

    await redisClient.quit();

    res.json({ status: true, message: returnObj});
})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`))