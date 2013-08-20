(function() {	//获取src参数
	var script = document.getElementsByTagName('script'),
		src,
		userId;
	script = script[0];
	src = script.src;
	userId = /userId=([^&]+)/i.exec(src);
	console.log(userId);
})();
(function(window, undefined) {
	var ohm = window.ohm = window.ohm || {};
	var data = [{'keywork': '周杰', 'url': 'http://weibo.com/u/1647334697?zw=ent', 'title': '周杰', 'img': 'http://i0.sinaimg.cn/ent/s/m/w/2013-07-29/U8711P28T3D3974637F326DT20130729110619.jpg', 'content': '周杰尔康'}, 
				{'keywork': '林心如的妈妈', 'url': 'http://weibo.com/u/1218270987?zw=ent', 'title': '林心如的妈妈', 'img': 'http://ww3.sinaimg.cn/thumbnail/6f627ceajw1e72izn2jioj20de0hsac7.jpg', 'content': '林心如的妈妈是谁？'},
				{'keywork': '王琳', 'url': 'http://weibo.com/u/1868725482?zw=ent', 'title': '王琳', 'img': 'http://i2.sinaimg.cn/ent/s/m/w/2013-07-29/U8711P28T3D3974637F328DT20130729110619.jpg', 'content': '王琳不认识'},
				{'keywork': '林心如', 'url': 'http://weibo.com/u/1564945772?zw=ent', 'title': '林心如', 'img': 'http://i3.sinaimg.cn/ent/s/m/w/2013-07-29/U8711P28T3D3974637F329DT20130729110619.jpg', 'content': '林心如紫薇'}
				];
	ohm.callback(data);
})(this);