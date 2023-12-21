### Task 3: Optimise a RESTful API 

Made by Dmitry Safarov https://t.me/jsdeemon

Below is an existing RESTful API implemented using Express.js and MongoDB. Your
task is to optimise the API's performance and maintainability.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const uri = 'mongodb://localhost:27017/mydb';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology:
true, useCreateIndex: true });
const userSchema = new mongoose.Schema({
name: String,
email: { type: String, unique: true },
age: Number
});
const User = mongoose.model('User', userSchema);
app.get('/users', async (req, res) => {
try {
const users = await User.find({});
res.json(users);
} catch (err) {
console.error(err);
res.status(500).send('Internal server error');
}

});
app.post('/users', async (req, res) => {
try {
const newUser = new User(req.body);
const savedUser = await newUser.save();
res.status(201).json(savedUser);
} catch (err) {
console.error(err);
res.status(500).send('Internal server error');
}
});
app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});
``` 

Consider the following areas for optimisation:
1. Refactor the code to follow best practices for modularisation and separation of
concerns - done.
2. Implement input validation for all incoming requests - done.
3. Add comprehensive error handling and logging  - done.
4. Implement rate limiting to protect against abuse and denial-of-service attacks - done.
5. Optimize database queries and indexing to improve performance -done.
6. Refactor the code to use Typescript - done
Please provide a detailed report outlining the changes you made, the rationale
behind them, and any performance improvements observed. 

# Explanation

- Best practice is to use sensitive data like passwords in .env files. So i inastalled and used package 'dotenv'
- I installed cors package to be able to obtain requests from client 
- Made refactoring for Mongodb connection with mongo_uri - added password and username for security
- Added error handling, logging and input validation middleware