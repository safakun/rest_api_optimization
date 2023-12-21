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
5. Optimize database queries and indexing to improve performance - done.
6. Refactor the code to use Typescript - done
Please provide a detailed report outlining the changes you made, the rationale
behind them, and any performance improvements observed. 


# To run the project

```bash
npm install
docker compose up -d

```

Create .env file and paste following text:
```bash
PORT=5000
MONGO_URI=mongodb://root:rootpassword@localhost:27017/test?authSource=admin
```
Start the app
```bash
npm start
```

Created on node v.20.10.0

# Report

- Best practice is to use sensitive data like passwords in .env files. So I installed and used package 'dotenv'. Also used port 5000 instead of 3000, because on port 3000 is used by frontend apps like React or Nextjs by default
- I installed cors package to be able to obtain requests from client 
- Made refactoring for Mongodb connection with mongo_uri - added password and username for security
- Added error handling, logging and input validation middleware
- Added params count and offset to limit users queries for better performance
- Refactored the code
- Implemented typescript and types
- Added rate limiting 

Get all users (by default limited by 10)
```bash
GET http://localhost:5000/api/user/users
```
Add new user
```bash
POST http://localhost:5000/api/user/add 
```
```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "age": 25
}
```
