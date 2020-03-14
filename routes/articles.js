const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

var feed = require('rss-to-json');
const to = require('../utils/to');

exp = {}

exp.fetch = async(req, res) => {
    feed.load('https://medium.com/feed/iecse-hashtag/', function (err, rss) {
        if (err) {
            return res.sendError(err);
        }
        const result = rss.items.map(item => {
            return Object.assign(
                {},
                {
                    title: item.title,
                    link: item.link,
                    category: item.category,
                    author: item.dc_creator,
                    punblishedOn: item.pubDate,
                    description: item.content_encoded.substring(item.content_encoded.indexOf("h4>")+3, item.content_encoded.indexOf("/h4")-1),
                    imagelink: ("https://miro" + item.content_encoded.substring(item.content_encoded.indexOf("cdn") + 12, item.content_encoded.indexOf("png")+3)).replace("1024", "1408") 
                }
            )
        })
        return res.sendSuccess(result, null);
    });
}

module.exports = exp;