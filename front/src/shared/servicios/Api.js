import axios from 'axios';
require('dotenv').config();

export const API = axios.create({
	baseURL: process.env.REACT_APP_BACK || process.env.REACT_APP_BACK_DEV,
	timeout: 6000,
	headers: {
		Accept : 'application/json',
		'Content-Type' : 'application/json',
		'Access-Control-Allow-Origin' : '*',
		'Authorization' : 'Bearer' + localStorage.getItem('token')
	}
})