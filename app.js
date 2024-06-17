var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');
var app_port = process.env.VCAP_APP_PORT || 3000;
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//图片上传
var multiparty = require('multiparty');
//post请求json需要添加中间件
// see https://github.com/expressjs/body-parser
// 添加 body-parser 中间件就可以了
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var xss = require('xss');
//var html = xss('<script>alert("xss");</script>');
//异步流程控制
var async =require('async');
// 连接字符串格式为mongodb://主机/数据库名
//mongoose.connect('mongodb://127.0.0.1:27017/feedback');
mongoose.connect('mongodb://eda2a007-e9d7-4f63-b47e-a9c577c111c9:YatMdZx-ZDcqEL0AUZuWbQ@10.9.58.169:27017/f80fcc03-51b0-4d0f-bad9-dbb4cfe6e6f9');
var db = mongoose.connection;

db.on('error', function callback() {
    console.log("Connection error");
});

db.once('open', function callback() {
    console.log("Mongo working!");
    console.info("当前小时数"+new Date().getHours());
});
//构建意见反馈模型
var Schema = mongoose.Schema;

var fbSchema = new Schema({
    feedbackMessage: String,
    contact: String
});
var fb = mongoose.model('fb', fbSchema);
//文章模块定义

var articleSchema = new Schema({
    articleid :Number,
    title: String,
    author: String,
    category: String,
    content: String
});

var articlema = mongoose.model('article', articleSchema);
/**
 *页面数据抓取
 * @param url 要抓取的地址
 * @param fun 回调函数
 * @param c  callback名称
 * @param r response
 */
function btoa(str) {
    return new Buffer(str).toString('base64')
}
function superres(url, fun, c, r) {
    //console.log('common in superagent');
    superagent.get(url)
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var cc = cheerio.load(sres.text);
            /*var items = {
             statusCode:'0000',
             titile: $('.post-inner span[itemprop="name"]').text(),
             author: $('.post-inner .entry').find('p').eq(0).text(),
             content: $.html('.article_text')
             };*/
            var items = fun(cc);
            if (c)r.send(c + '(' + JSON.stringify({items: items}) + ')');
            else r.send(items);
        });
}

//睡眠函数
function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}
/**
 * 应该要写一个循环的爬虫，先爬链接，然后再用链接进去爬
 * @type {{core: Function, init: Function, wenzhangba: Function, ihx: Function}}
 */

var autosuper = {
    core: function (url, ifun) {
        superagent.get(url)
            .set({
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.99 Safari/537.36'
            })
            .end(function (err, sres) {
                // 常规的错误处理
                if (err) {
                    autosuper.core(url, ifun);
                    console.error(err);
                } else {
                    var cc = cheerio.load(sres.text);
                        ifun(cc);

                }
                // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
                // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
                // 剩下就都是 jquery 的内容了
            });
    },
    init: function () {
        var self = this;
        var wzbList = [], ihx = [];
        for (var i = 1; i < 20; i++) {
            wzbList.push('http://www.wenzhangba.com/zheligushi/list_23_' + i + '.html');
            ihx.push('http://w.ihx.cc/category/meiriyiwen/page/' + i);
        }
        self.wenzhangba(wzbList);
        self.ihx(ihx);
    },
    wenzhangba: function (arr) {
        var self = this;
        async.eachSeries(arr, function (item, callback) {
            self.core(item, function ($) {
                var $subBox = $('.cmt_info .subBox');
                var aList = $subBox.map(function (idx, element) {
                    var $element = $(element).find('.tit a');
                    return $element.attr('href');

                }).get();
                console.info(aList);
                async.eachSeries(aList, function (item, callback2) {
                    self.core(item, function ($) {
                        var html = $('.a_detail');
                        html.find('img').remove();
                        html.find('a').attr('href', 'javascript:void(0)');
                        html.find('#content_article').remove();
                        html.find('div').last().remove();
                        var htmlDetail = $.html('.a_detail').replace('www.wenzhangba.com', 'raclen.win');
                        var text = $('.c_a_info h1 a').text();
                        console.log("text=" + text);
                        if (!!text) {
                            var thor = new articlema({
                                title: text,
                                author: '来自网络',
                                category: '001',
                                content: htmlDetail
                            });
                            thor.save(function (err, thor) {
                                if (err) return console.log(err);
                            });
                        }
                        callback2();
                    });
                }, function (err) {
                    console.error('err is content===' + err);
                    callback()
                })


            });

        }, function (err) {
            console.error('err is item===' + err);
        })

    },
    ihx: function (arr) {
        var self = this;
        async.eachSeries(arr, function (item, callback) {
            console.log(item)
            self.core(item, function ($) {
                var $itemlist = $('.post-listing .item-list');
                var linkList = $itemlist.map(function (idx, element) {
                    var $element = $(element).find('.post-title a');
                    return $element.attr('href');
                }).get();
                console.log(linkList);
                async.eachSeries(linkList, function (item, callback2) {
                    self.core(item, function ($) {
                        var author = $('.post-inner .entry').find('p').eq(0).text();
                        var content = $.html('.article_text');
                        var text = $('.post-inner span[itemprop="name"]').text();
                        console.log("text=" + text);
                        if (!!text) {
                            var thor = new articlema({
                                title: text,
                                author: author,
                                category: '002',
                                content: content
                            });
                            thor.save(function (err, thor) {
                                if (err) return console.log(err);
                                //console.log(thor);
                            });

                        }
                        //sleep(500)
                        callback2(null)
                    });
                }, function (err) {
                    console.log("content==============" + err);
                    //sleep(500)
                    callback(null)
                });
            })

        }, function (err) {
            console.log("item==============" + err);
        })
    }

};

/*var hours =new Date().getHours();
if(hours=='00'){
    articlema.find().remove().exec(function(err,item){
     console.log("删除数据成功")
    });
    autosuper.init();
}*/


app.get('/category', function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    var categoryid = req.query.categoryid;
    if (!categoryid) {
        res.send('缺少必要参数categoryid');
        return;
    }
    var callback = req.query.callback;
    articlema.find({category: categoryid},function (err, item) {
        if (err) return console.err(err);
        var count =item.length;
        console.dir("count"+count);
        //分页查询
        console.log("common in findAll");
        var pageSize = 10; //每一页显示的数据条数
        //var start = 1; //这边可以改为接收参数后的计算 (页数-1)*pageSize;
        var start = (page - 1) * pageSize; //这边可以改为接收参数后的计算
        articlema.find({category: categoryid}).skip(start).limit(pageSize).exec(function (err, article) {
            //dosomething for your page
            //datas 是分页后的数据 这边写你的数据渲染或其他操作
            if (err) return console.err(err);
            console.dir(article);
            var items = [];
            var len = article.length;
            for (var i = 0; i < len; i++) {
                items.push({
                    articleid: article[i]._id,
                    title: article[i].title,
                    author: article[i].author

                });

            }

            var results = {
                statusCode: '0000',
                items: items,
                count: count
            }
            if (callback)res.send(callback + '(' + JSON.stringify(results) + ')');
            else res.send(JSON.stringify(results));
        });
    });

});


app.get('/contents', function (req, res, next) {
    var categoryid = req.query.categoryid;
    var articleid = req.query.articleid;
    var callback = req.query.callback;
    if (!categoryid) {
        res.send('缺少必要参数categoryid');
        return;
    }
    var categoryobject = {
        '003': 'http://meiriyiwen.com/random'
    }
    var supUrl = categoryobject[categoryid];
  if (categoryid == '003') {
        var itemFun = function ($) {
            var items = {
                statusCode: '0000',
                titile: $('#article_show h1').eq(0).text(),
                author: $('.article_author span').text(),
                content: $.html('.article_text')

            };
            return items;
        }
        superres(supUrl, itemFun, callback, res);
    } else{
        //通过id查找一篇
        articlema.findOne({category:categoryid,_id: articleid}, function (err, thor) {
            if (err) return console.err(err);
            var items = {
                statusCode: '0000',
                titile: thor.title,
                author: thor.author,
                content: thor.content

            };
            res.send(callback + '(' + JSON.stringify({items: items}) + ')');
        });
    }
/*    var items = {
        statusCode: '0001',
        message: '未知错误'
    };
    res.send(callback + '(' + JSON.stringify({items: items}) + ')');*/
});


app.get('/submitfeedback', function (req, res, next) {
    var feedbackMessage = xss(req.query.feedbackMessage);
    var contact = xss(req.query.contact);
    var callback = xss(req.query.callback);
    var thor = new fb({
        feedbackMessage: feedbackMessage,
        contact: contact
    });
    thor.save(function (err, thor) {
        if (err) return console.log(err);
        console.log(thor);
        var items = {
            status: '0000'
        };
        if (callback)
            res.send(callback + '(' + JSON.stringify(items) + ')');
        else
            res.send(JSON.stringify(items));
    });

})

app.get('/findfeedback', function (req, res, next) {
    var callback = req.query.callback;
    //删除那条脏数据
    // fb.remove({_id: "5643fc76b913a22100f2de06"}, function (err, thor) {
    //    if (err) return console.err(err);
    //  console.dir(thor);
    //});
//查找所有用户反馈
    fb.find(function (err, fb) {
        if (err) return console.err(fb);
        console.log(fb);
        if (callback)res.send(callback + '(' + JSON.stringify(fb) + ')');
        else res.send(JSON.stringify(fb));
    });

});
//添加文章
app.post('/addarticle', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    //console.log(req);
    //console.log(req.body);
    var title = xss(req.body.title);
    var author = xss(req.body.author);
    var category = xss(req.body.category);
    var content = req.body.content;
    var thor = new articlema({
        title: title,
        author: author,
        category :category,
        content: content
    });

    thor.save(function (err, thor) {
        if (err) return console.log(err);
        console.log(thor);
        var items = {
            statusCode: '0000'
        };
        res.send(JSON.stringify(items));
    });

});

//删除文章
app.get('/delarticle', function (req, res) {
    var articleid = req.query.articleid;
    articlema.remove({_id: articleid}, function (err, thor) {
        if (err) return console.err(err);
        console.dir(thor);
        var items = {
            statusCode: '0000'
        };
        res.send(JSON.stringify(items));
    });

});

app.post('/uploadImg', function (req, res, next) {
    var form = new multiparty.Form({uploadDir: './public/upload'});
    //form.uploadDir = __dirname + '/../public/upload';
    //form.uploadDir = "/upload"
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }
        //console.log(files)
        var image = files.file[0];
        var path = image.path;
        path = path.replace(/\\/g, '/');
        //console.log(path)
        var url = 'http://raclen-wenzhang.coding.io/upload' + path.substr(path.lastIndexOf('/'), path.length);
        res.send(url);
    });

});
//在线聊天socket
//在线用户
var onlineUsers = {};
//当前在线人数
var onlineCount = 0;
io.on('connection', function (socket) {
    console.log('a user connected');

    //监听新用户加入
    socket.on('login', function (obj) {
        //将新加入用户的唯一标识当作socket的名称，后面退出的时候会用到
        socket.name = obj.userid;

        //检查在线列表，如果不在里面就加入
        if (!onlineUsers.hasOwnProperty(obj.userid)) {
            onlineUsers[obj.userid] = obj.username;
            //在线人数+1
            onlineCount++;
        }

        //向所有客户端广播用户加入
        io.emit('login', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
        console.log(obj.username + '加入了聊天室');
    });

    //监听用户退出
    socket.on('disconnect', function () {
        //将退出的用户从在线列表中删除
        if (onlineUsers.hasOwnProperty(socket.name)) {
            //退出用户的信息
            var obj = {userid: socket.name, username: onlineUsers[socket.name]};

            //删除
            delete onlineUsers[socket.name];
            //在线人数-1
            onlineCount--;

            //向所有客户端广播用户退出
            io.emit('logout', {onlineUsers: onlineUsers, onlineCount: onlineCount, user: obj});
            console.log(obj.username + '退出了聊天室');
        }
    });

    //监听用户发布聊天内容
    socket.on('message', function (obj) {
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.username + '说：' + obj.content);
    });

    //接收用户发来的图片
    socket.on('img', function (obj) {
        //通过一个newImg事件分发到除自己外的每个用户
        //socket.broadcast.emit('newImg', socket.nickname, imgData);
        io.emit('newImg', obj);
        console.log(obj.username + '说：' + obj.imgdata);
    });

});
var server = http.listen(app_port, function (req, res) {
    console.log('Listening on port %d', server.address().port);
});


