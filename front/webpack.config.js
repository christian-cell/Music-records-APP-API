const webpack = require('webpack');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');

module.exports = () =>{
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev , next)=>{
        prev[`process.env${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {})

    return {
        pluggins : [
            new webpack.DefinePlugin(envKeys),
            new Dotenv()
        ]
    }
}