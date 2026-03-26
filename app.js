import 'dotenv/config';
import express from 'express';
import {connectToDB} from "./db/connect.db.js";
import userRouter from "./users/user.controller.js";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use((err, req, res, next) => {
    return res.status(err.status || 500).send({error: err.message || 'internal server error'});
});

connectToDB().then(() => {
    app.listen(process.env.PORT,  () => {
        console.log(`Server started on port ${process.env.PORT}`);
        }
    );
}).catch((err) => {console.error(err)});

