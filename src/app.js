import express, {json} from 'express';
import * as BPL from './iidx_bpl';
import cors from 'cors';

const app = express();

app.use(json())
app.use(cors())

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.json({ status: true, message: "Successful call to the app"})
})

app.get('/test', async (req, res) => {
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
    res.json({ status: true, message: BPL.createBPLMatch(config)})
})

app.listen(PORT, () => console.log(`App listening at port ${PORT}`))