/**
 * Created by dixiao on 2016/1/4.
 */
var request = require("request");
var cheerio = require('cheerio');
var express = require('express');
var app = express();
var fs = require('fs');
var jar = request.jar();
var app_port = process.env.VCAP_APP_PORT || 3000;
var http = require('http').Server(app);
app.use(express.static(__dirname + '/public'));


var options = {
    url: '',
    encoding: "utf-8",
    headers: {
        "Connection": "keep-alive",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
       // 'cookie':'userid=123456; mycookie2=abcdefg',
        "Accept-Encoding": "gzip, deflate, sdch",
        "Accept-Language": "zh-CN,zh;q=0.8",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.66 Safari/537.36"
    },
    json: true
};

//格式化cookies
function formatCookies(c) {
    var cookies = {};
    var pairs = c.split(/[;,] */);
    for (var i = 0; i < pairs.length; i++) {
        var idx = pairs[i].indexOf('=');
        var key = pairs[i].substr(0, idx);
        var val = pairs[i].substr(++idx, pairs[i].length).trim();
        cookies[key] = val;
    }
    return cookies;
}

app.get('/ptqrshow', function (req, res, next) {
    var j = request.jar();
    var url = "https://ssl.ptlogin2.qq.com/ptqrshow?appid=501004106&e=0&l=M&s=5&d=72&v=4&t=0.4139144900254905";
    var referer = "https://ui.ptlogin2.qq.com/cgi-bin/login";
    options.url=url,options.jar=j,options.method= 'GET',options.headers.Referer=referer;
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            request.get(url).pipe(fs.createWriteStream('./public/image/doodle.png'));
            var cookie_string = j.getCookieString(url);
            //console.log(cookie_string);
            var item = {
                cookies: cookie_string,
                url: 'image/doodle.png'
            };
            res.send(item)
        }
    });
});

function ptqrlogin(cookie){
    console.log(cookie);
    var j = request.jar();
    var url = "https://ssl.ptlogin2.qq.com/ptqrlogin?webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=0-0-136435&mibao_css=m_webqq&t=undefined&g=1&js_type=0&js_ver=10139&login_sig=&pt_randsalt=0";
    options.url=url,options.jar=j,options.method= 'GET', options.headers.Cookie=cookie;
    options.headers.Host="ssl.ptlogin2.qq.com";
    options.headers["Upgrade-Insecure-Requests"]=1;
    console.log(options)
    request(options, function (error, response, body) {
        console.log(response.statusCode)
        if (!error && response.statusCode == 200) {
            var cookie_string = j.getCookieString(url);
            var temp = body.toString();
            console.log(temp);
            if (temp.indexOf("成功") > -1) {
                console.log(temp);
                var url = temp.split(',')[2];
                url = url.substring(1, url.length - 2);
                console.log(url);
                //再往下执行
                Login1(url);
            }
            else if (temp.indexOf("已失效") != -1) {
                res.send({
                    statusCode: '0001',
                    statusMessage: '二维码已失效'
                })
            }

        }
    });
}
app.get('/ptqrlogin', function (req, res, next) {
    var cookie =req.query.cookie;
    console.log(cookie);
    var j = request.jar();
    var url = "https://ssl.ptlogin2.qq.com/ptqrlogin?webqq_type=10&remember_uin=1&login2qq=1&aid=501004106&u1=http%3A%2F%2Fw.qq.com%2Fproxy.html%3Flogin2qq%3D1%26webqq_type%3D10&ptredirect=0&ptlang=2052&daid=164&from_ui=1&pttype=1&dumy=&fp=loginerroralert&action=0-0-136435&mibao_css=m_webqq&t=undefined&g=1&js_type=0&js_ver=10139&login_sig=&pt_randsalt=0";
    options.url=url,options.jar=j,options.method= 'GET', options.headers.Cookie=cookie;
    options.headers.Host="ssl.ptlogin2.qq.com";
    options.headers["Upgrade-Insecure-Requests"]=1;
    console.log(options)
    request(options, function (error, response, body) {
        console.log(response.statusCode)
        if (!error && response.statusCode == 200) {
            var cookie_string = j.getCookieString(url);
            var temp = body.toString();
            console.log(temp);
            if (temp.indexOf("成功") > -1) {
                console.log(temp);
                var url = temp.split(',')[2];
                url = url.substring(1, url.length - 2);
                console.log(url);
                //再往下执行
                Login1(url);
            }
            else if (temp.indexOf("已失效") != -1) {
                res.send({
                    statusCode: '0001',
                    statusMessage: '二维码已失效'
                })
            }

        }
    });
});


/*jar.getCookies(options, function(error,cookies){
 console.log(error)
 console.log(cookies)

 });*/
/*var j = request.jar();
 request({url: options.url, jar: j}, function (error, response, body) {
 if (!error && response.statusCode == 200) {
 var $ = cheerio.load(body);
 console.log(body.toString())
 var url= $('img').attr('src');
 console.log(url);
 }

 var cookie_string = j.getCookieString(options.url);
 var cookies ={};
 var pairs = cookie_string.split(/[;,] *//*);
 for (var i =0; i < pairs.length; i++){
 var idx = pairs[i].indexOf('=');
 var key = pairs[i].substr(0, idx);
 var val = pairs[i].substr(++idx, pairs[i].length).trim();
 cookies[key] = val;
 }
 console.log(cookies.qrsig)
 *//*  var cookies = j.getCookies(options.url);
 console.log(cookies)*//*
 // [{key: 'key1', value: 'value1', domain: "www.google.com", ...}, ...]
 })*/


var server = http.listen(app_port, function (req, res) {
    console.log('Listening on port %d', server.address().port);
});

