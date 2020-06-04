const request = require('request');
const cheerio = require('cheerio');

exp = {}

exp.fetch = async(req, res) => {
    try {
        request('https://medium.com/iecse-hashtag/latest?limit=50', async(err, response, html) => {
            if(err)
                res.sendError(err);
            if(response.statusCode == 200)
            {   
                const data = [];
                const $ = cheerio.load(html);
                $("div.js-block").each(async(i, element) => {
                    const link = $(element).find("div.postArticle-content").find("a").attr("href")
                    const author = $(element).find("a.u-accentColor--textDarken").text();
                    const title = $(element).find("h3.graf--title").text();            
                    const publishedOn = $(element).find("a.link--darken").find("time").attr("datetime");
                    const imagelink = ($(element).find("div.postArticle-content").find("img").attr("src")).replace("480", "700");
                    request(link, async (err, response, html) => {
                        if (err)
                            sendError(err);
                        else if (response.statusCode == 200) {
                            const $ = cheerio.load(html);
                            const description = $("div#0337").find("h2").text();
                            console.log(description);
                            data.push({
                                link: link,
                                author: author,
                                title: title,
                                publishedOn: publishedOn,
                                imagelink: imagelink,
                                //description: description
                            })
                        }
                    })
                });
                await res.sendSuccess(data);
            }
            else
            {
                res.sendError();
            }
        })
    } catch (error) {
        res.sendError();
    }
}

module.exports = exp;