# ImgsUrlWeb

<strong>项目介绍：</strong>
<br/>
前后端分离的个人图床管理网站--前端部分
 
<strong>技术栈：</strong>
<br/>
 前后端分离练手项目：.Net + Vue
<br/>
 前端项目主体使用Vue2.0框架、Axios发送请求、Element-ui处理样式；
<br/>
 后端使用.Net WebApi提供交互交口，EF6进行数据库交互，Identity进行身份验证；
 
<strong>开发中的问题：</strong>
<br/>
Axios会发送OPTIONS预检请求，导致跨域问题。处理方式：后端做Options处理，直接允许通过返回200；应该有更妥善的处理方法。
<br/>
封装的Axios方法，对API进行请求时，会由不同的Content-Type造成请求出错。后来直接使用了Axios，可以对封装方法进行优化。
<br/>
整个小项目请求交互问题处理内容会多一些，其他的UI参考Element官方文档简单解决。

 
<strong>功能介绍：</strong>
 
 1.上传图片生成访问URL
 
 2.后台管理
   <br/>
   2.1系统参数设置
   <br/>
     上传数量总量限制.
     游客上传数量限制.
     文件格式.
     文件大小.
     ...
     其他系统设置.
   <br/>
   2.2
   <br/>
     图片管理（图片信息查看、删除）
     列表管理（缩略图、原图进行区分，优化使用体验）

3.其他
  <br/>
  登陆后两小时身份失效需重新登录
  <br/>
  登陆后上传数量无限制
  
  
<strong>项目使用:</strong>

  --安装依赖
  npm install

  --运行项目
  npm run serve

  --打包项目
  npm run build
  
<strong>项目截图</strong>
<br/>
<img src="http://81.68.146.67:8000/imgsUrl/eedeb3f756904eac93dcdbf43cf3604a.png" style="width:500px;"/>
<img src="http://81.68.146.67:8000/imgsUrl/381e15bfd6bc48dbba970449e196fdc1.png" style="width:500px;"/>
<img src="http://81.68.146.67:8000/imgsUrl/c2f333f77a2c4d819d608d171a8cafc4.png" style="width:500px;"/>
<img src="http://81.68.146.67:8000/imgsUrl/21a8d6ff8108405c8219e44387ed70e5.png" style="width:500px;"/>
<img src="http://81.68.146.67:8000/imgsUrl/3842cbc4ae5e4715a9e134fbec6b6f1e.png" style="width:500px;"/>
