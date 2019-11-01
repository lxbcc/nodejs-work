#!usr/bin/node
const { chapterList, userList} = require('./data'),
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    qs=require("querystring");
    var id;
    var now={};
http.createServer((req,res)=>{
    let path=url.parse(req.url).pathname;
    //登录面
     if(path == '/login'){
        res.writeHead(200,{'Content-Type':'text/html'});
        fs.readFile('login.html','utf-8',(err,data)=>{
            if(err){
                console.log(err);
            }else{    
                res.end(data);
            }
        })
     }
     //用户密码
     else if(path == '/listmanager'){
        var username=url.parse(req.url, true).query.username;
        var pwd=url.parse(req.url, true).query.pwd
        if( username== userList[0].username &&  pwd==userList[0].pwd ){
            res.writeHead(200,{'Content-Type':'text/html'});
            fs.readFile('list.html','utf-8',(err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    res.end(data);
                }
            })
        }else{
            res.statusCode=404;
            res.end('Error');
        }
    }
    else if(req.url=='/addChapter'){//添加文章
        // var listPath = path.join(__dirname,'addChapter.html');
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile('addChapter.html',(err,data)=>{
          if(err){
            console.log(err);
          }
          else{
            res.end(data);
            }
        });
    }else if(path == '/addtit'){
        console.log('添加成功')
        var newadd = {};
        var data= ""; 
         req.addListener("data",(post)=> {
            data += post;
            var title=qs.parse(data).title;
            var content=qs.parse(data).content;
            newadd.chapterId=chapterList.length+1;
            newadd.chapterName=title;
            newadd.chapterDes=content;
            newadd.chapterContent=content;
            newadd.publishTimer= "2019-10-27";
            newadd.author="admin";
            newadd.views=1;
            newadd.imgPath='';
            chapterList.push(newadd);
        });
     }
    else if(path=="/list"){
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile('chapterList.html','utf-8',(err,data)=>{
          if(err){
            console.log(err);
          }
          else{
            res.end(data);             
          }          
        })
    }else if(path == '/chaplist/'){
        res.write(JSON.stringify(chapterList));
        res.end();
    }else if(path=="/detail"){
        id=url.parse(req.url).query.replace(/chapterId=/,"")-1;
        res.writeHead(200,{"Content-Type":"text/html"});
        fs.readFile('chapter.html','utf-8',(err,data)=>{
          if(err){
            console.log(err);
          }else{
            res.end(data);
          }      
        })
    }else if(req.url == '/tits/'){
             res.write(JSON.stringify(chapterList));
             res.end();
    }else if(req.url == '/now/'){
             res.writeHead(200,{'Content-Type':'text/json'});
             now=chapterList[id];  
             res.end(JSON.stringify(now));
    }





    else if(req.url !== '/'){
        var urls = '.'+req.url;
        res.writeHead(200,{'Content-type':"text/css"});
        fs.readFile(urls,(err, data)=> {
            if (err) {
                console.log(err);
            }else{
                res.end(data);
            }
        });
     }
}).listen(8083);