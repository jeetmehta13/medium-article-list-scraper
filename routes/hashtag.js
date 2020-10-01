import request from 'request';
import cheerio from 'cheerio';

exports.hashtag = async (req, res) => {
    try {
        request('https://medium.com/iecse-hashtag/latest?limit=100', async (err, response, html) => {
            if (err) res.sendError(err);
            if (response.statusCode == 200) {
                const data = [];
                const $ = cheerio.load(html);
                $("div.js-block").each(async (i, element) => {
                    data.push({
                        author: $(element).find("a.u-accentColor--textDarken").text(),
                        link: $(element).find("div.postArticle-content").find("a").attr("href"),
                        title: $(element).find("h3.graf--title").text(),
                        description: $(element).find("h4.graf--subtitle").text(),
                        publishedOn: $(element).find("a.link--darken").find("time").attr("datetime"),
                        imagelink: ($(element).find("div.postArticle-content").find("img").attr("src")).replace("480", "700")
                    });
                });
                res.sendSuccess(data);
            }
            else res.sendError();
        });
    } catch (err) {
        return res.sendError(err);
    }
};
