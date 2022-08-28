import express from 'express';
import bodyParser = require('body-parser');
import { tempData } from './temp-data';
import { serverAPIPort, APIPath } from '@fed-exam/config';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Ticket } from '../client/src/api';
import { stringify } from 'querystring';
// Import the filesystem module
const fs = require('fs');
  


console.log('starting server', { serverAPIPort, APIPath });

const app = express();

const PAGE_SIZE = 20;

// declare global {
	
// var favourites_array: Array<Ticket>;
// }
// favourites_array = new Array<Ticket>();

app.use(bodyParser.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});



//get tickets
app.get(APIPath, (req, res) => {
	// @ts-ignore
	const page: number = req.query.page || 1;

	const paginatedData = tempData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

	res.send(paginatedData);
});


//clone ticket 


	app.post(APIPath, (req, res) => {
		
	// @ts-ignore
	console.log("====>SERVER:clone")
	tempData.push(req.body.ticket)
	console.log(tempData[tempData.length-1])
	res.send(true);

});


// //get tickets changing the path? 
// app.get(APIPath+"/fav", (req, res) => {

// 	console.log("====>SERVER: get favourites")
// 	// @ts-ignore
// 	const page: number = req.query.page || 1;
	
// 	const paginatedDataFav = favourites_array.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

// 	res.send(paginatedDataFav);
	
// });

app.put(APIPath, (req, res) => {
		
	// @ts-ignore
	console.log("====>SERVER: put favourites")
	console.log(req.body.ticket)
	console.log("length before: " + tempData.length.toString())
	let index = tempData.indexOf(req.body.ticket)
	tempData.splice(index,1)
	console.log("length after: " + tempData.length.toString())
	res.send(true);
});

app.listen(serverAPIPort);
console.log('server running', serverAPIPort);
