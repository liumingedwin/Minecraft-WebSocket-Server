# Minecraft-WebSocket-Server
A Easy Minecraft Server.


点击 node-v10.16.3-x64.msi，一路回车

双击init.bat

然后双击Start.bat

最后在游戏中 /connect 127.0.0.1:7777

这个东西可以解决游客不能执行命令

## 格式
### homedata.txt
#### @go home
回家
```
{"人":"坐标","人":"坐标","人":"坐标",...}
```
#### @maincity
回主城
这个写死了
Ctrl+F 寻找这一串
```
-163 144 973
```
然后更改，OK

#### @kill
自杀

#### @mp
允许传送至你

#### @tp 玩家
传送至某人


#### @dp
取消允许传送至你
