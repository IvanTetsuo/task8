const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('./routes/user');

app.use(express.json()); //это для того чтобы распарсить json (в body)
app.use('/user', userRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
