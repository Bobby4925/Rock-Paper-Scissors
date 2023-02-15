const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path')
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
let d = require('./database');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on("connection", (socket) => {
  // ...
	//console.log(d.databaseSet("1","2"))
	socket.on('user',(user) =>{
		console.log(user);
	});
	function AI_Action(){
		let x = Math.floor(Math.random() * 3);
		let a = "";
		if(x == 0){
			a = "Rock"
		}
		if(x == 1){
			a = "Paper"
		}
		if(x == 2){
			a = "Scissors"
		}
		return a; 
		}
	let score = 0;
	function Score(){
		score++; 
		return score; 
	}
	console.log("A user connected");
	socket.on('disconnect',() => {
		console.log("A user disconnected")
	});
	socket.on('action',(move) =>{
		let placeholder = false
		let AI = AI_Action();
		console.log(AI);
		let score;
		if(move == "Paper" && AI == "Rock")
		{
			 score = Score();
			console.log(score);
			io.emit('action',("Player wins!"))
			io.emit('score',(score))
			AI = AI_Action();
		}
		else if(move == "Rock" && AI == "Paper")
		{
			io.emit('action',("AI wins!"))
		}
		else if(move == "Scissors" && AI == "Paper")
		{
			score = Score();
			console.log(score);
			io.emit('action',("Player wins!"))
			io.emit('score',(score))
			AI = AI_Action();
			
		}
		else if(move == "Paper" && AI == "Scissors")
		{
			io.emit('action',("AI wins!"))
		}
		else if(move == "Rock" && AI == "Scissors")
		{
			score = Score();
			console.log(score);
			io.emit('action',("Player wins!"))
			io.emit('score',(score))
			AI = AI_Action();
		}
		else if(move == "Scissors" && AI == "Rock")
		{
			io.emit('action',("AI wins!"))
		}
		else{
			io.emit('action',("It is a tie!"))
		}
	});
});


httpServer.listen(3000);