var ws = require("nodejs-websocket");
var fs = require("fs")
console.log("Started to Create...")
Date.prototype.format = function(fmt)
{ 
var o = {
"M+" : this.getMonth()+1, //月份
"d+" : this.getDate(), //日
"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
"H+" : this.getHours(), //小时
"m+" : this.getMinutes(), //分
"s+" : this.getSeconds(), //秒
"q+" : Math.floor((this.getMonth()+3)/3), //季度
"S" : this.getMilliseconds() //毫秒
};
if(/(y+)/.test(fmt))
fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
for(var k in o)
if(new RegExp("("+ k +")").test(fmt))
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
return fmt;
}
var gohomedata={"Edwinlao":"-179 101 984","小懒大侠":"-179 101 984"};
var server = ws.createServer(function(conn){
conn.on("text", function (str) {
	try{
    console.log("REceive:"+str)
	var parsed=JSON.parse(str);
	console.log(parsed);
	var message=parsed.body.properties.Message,sender=parsed.body.properties.Sender;
	var command_two=message.slice(0,3);
	var command_eight=message.slice(0,9);
	if(command_two=="@go")
	{
		if(message.slice(4,8)=="home"&&message.length==8)
		{
			gohomedata=JSON.parse(fs.readFileSync('homedata.txt').toString());
		conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "/tp `+sender+" "+gohomedata[sender]+`",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
		}
	}
	if(command_two=="@mp")
	{
	fs.writeFileSync(sender,sender);
	}
	if(command_two=="@tp")
	{
		var flag=0;
		try{
		var playertp=fs.readFileSync(message.slice(4,20));
		}catch(e){
			flag=1;
		}
		if(!flag)
				conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "/tp `+sender+" "+playertp+`",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
	}
	if(command_two=="@dp")
	{
	fs.unlink(sender, callback);
	}
	if(command_eight=="@maincity")
	{
		conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "/tp `+sender+" "+`-163 144 973",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
		conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "/gamemode 2 `+sender+" "+`",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
	}
	if(message="@kill")
	{
		
		conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "/kill`+sender+" "+`",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
	}
	}catch(e)
	{
		
	}
})
    conn.on("close", function (code, reason) {
        console.log("关闭连接")
});
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
});


setInterval(function(){
	        conn.sendText(`{
	"body": {
		"eventName": "PlayerMessage"
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "subscribe",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
	var time1 = new Date().format("yyyy-MM-dd HH:mm:ss");
	if(new Date().getSeconds()==0)
	conn.sendText(`{
	"body": {
		"origin": {
			"type": "player"
		},
		"commandLine": "say Time:`+time1+`",
		"version": 1
	},
	"header": {
		"requestId": "00000000-0000-0000-0000-000000000000",
		"messagePurpose": "commandRequest",
		"version": 1,
		"messageType": "commandRequest"
	}
}`);
	
},1000);
}).listen(7777)

console.log("WebSocket done")
