var http = require("http");  
var fs = require('fs');
var url =require('url')

var app = http.createServer(function(request , response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query; // ?id= name
    if (_url == '/'){
        _url = '/index.html'
    }
    if(request.url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    //response.end(fs.readFileSync(__dirname + _url));
    var title = queryData.id
    fs.readFile(`./data/${title}`, 'utf8' , (err, data) => {
        templeate = 
        `
        <html>
        <head>
            <meta charset="utf-8">
    
        </head>
        <body>
            <h1> ${title} </h1>
            <p>
                <ul>
                    <li><a href="/?id=html"> html </a></li>
                    <li><a href="/?id=css"> css </a></li>
                    <li><a href="/?id=JavaScript"> JavaScript </a></li>
                </ul>
                ${data}
            </p>
            </body>
        </html>
        ` 
        response.end(templeate)
      })
});
app.listen(3000);