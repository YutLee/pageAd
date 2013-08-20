(function(window, undefined) {
	var ohm = window.ohm = window.ohm || {};
	
	var url = 'http://192.168.0.8:800/banner/cross.js?',
		param = 'userId=123',
		rand = Math.ceil(Math.random() * 10000000),
		script = document.createElement('script');
		
	url = url + '&r=' + rand;
	script.setAttribute('src', url);  
	//通过插件script标签发送文章信息并获取关键词
	document.getElementsByTagName('head')[0].appendChild(script); 
	
	//获取关键词后的回调函数
	ohm.callback = function (data){  
		var container = document.getElementsByTagName('body')[0];
		var content = container.innerHTML;
		var newContent = getNewContent(data, content);
		container.innerHTML = newContent;
	};
	
	var pop = document.createElement('div'),
		title = document.createElement('div'),
		content = document.createElement('div'),
		img = document.createElement('img');
	img.style.width = '100px';
	img.style.height = '100px';
	pop.setAttribute('style', 'display:none;position:absolute;width:300px;top:0;left:0;background:#eee;');
	pop.appendChild(title);
	pop.appendChild(img);
	pop.appendChild(content);
	
	var play, isOnPop = false, isOnLink = true;
	var $body = document.getElementsByTagName('body')[0];
	ohm.show = function(t) {	//显示关键词广告内容
		var img = t.getAttribute('data-img');
		var title = t.getAttribute('data-title');
		var content = t.getAttribute('data-content');
		var top = 0, left = 0;
		clearTimeout(play);
		isOnLink = true;
		$body.appendChild(pop);
		pop.childNodes[0].innerHTML = title;
		pop.childNodes[1].src = img;
		pop.childNodes[2].innerHTML = content;
		pop.style.display='block';
		left = t.offsetLeft;
		top = (t.offsetTop - $body.scrollTop >= pop.offsetHeight + t.offsetHeight) ? t.offsetTop - pop.offsetHeight : t.offsetTop + t.offsetHeight;
		pop.style.left = left + 'px';
		pop.style.top = top + 'px';
		bind(t, 'mouseout', hander);
		bind(pop, 'mouseout', popOut);
		bind(pop, 'mouseover', popOver);
		
		function hander() {
			clearTimeout(play);
			play = setTimeout(function() {
				if(!isOnPop) {
					pop.style.display = 'none';
					isOnLink = false;
				}else {
					pop.style.display = 'block';
					isOnPop = false;
				}
			}, 20);
		}
		function popOut(e) {
			clearTimeout(play);
			play = setTimeout(function() {
				if(!isOnLink && !isOnPop) {
					pop.style.display = 'none';
					isOnLink = true;
				}else {
					pop.style.display = 'block';
					isOnPop = false;
				}
			}, 20);
			stopBubble(e);
		}
		function popOver(e) {
			isOnPop = true;
			isOnLink = false;
			stopBubble(e);
		}
	};
	
	//对关键词添加标签
	function addTag(data, repIndex, keywork) {
		var style = 'color:green;text-decoration: underline;',
			now = data[repIndex[keywork]],
			href = now['url'],
			img = now['img'],
			title = now['title'],
			content = now['content'],
			startTag = '<a target="_blank" onmouseover="ohm.show(this)" data-title="' + title + '" data-content="' + content + '" data-img="' + img + '" href="' + href + '" style="' + style + '">',
			endTag = '</a>',
			result = startTag + keywork + endTag;
		return result;
	}
	
	//解析html
	function getNewContent(data, content) {

		var keywork = [], repIndex = {}, i = 0, j = 0, len = data.length;
		for(i; i < len; i++){
			var now = data[i]['keywork'];
			keywork.push(now);
			repIndex[now] = i;
		}
		var startTime1 = new Date();
		
		var key = '';
		for(j; j < len; j++) {
			(j === len - 1) ? key += keywork[j] : key += keywork[j] + '|';
		}
		
		var regStr = '(<(?!(a|script|style))[^>]*\\s*[^>]*>[^<]*?(?=(' + key + ')))(' + key + ')',
			reg = new RegExp(regStr);
		
		while(content.match(reg)) {
			var reWork = reg.exec(content)[4];
			content = content.replace(reg, '$1' + addTag(data, repIndex, reWork));
		}
		
		var endTime1 = new Date();
		console.log(endTime1 - startTime1);		

		return content;
	}
	
	function isArray(obj) {  
		return Object.prototype.toString.call(obj) === '[object Array]';   
	}
	
	//绑定事件函数
	function bind(el, event, hander) {
		if(el.addEventListener) {
			el.addEventListener(event, hander, false);
		}else if(t.attachEvent) {
			el.attachEvent(event, hander);
		}
		return el;
	}
	
	//阻止事件冒泡函数
	function stopBubble(e) {
		(e && e.stopPropagation) ? e.stopPropagation() : window.event.cancelBubble = true;
	}

})(window);