/*
* @Author: hp
* @Date:   2019-12-08 19:23:40
* @Last Modified by:   hp
* @Last Modified time: 2019-12-11 09:50:52
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}
	else{
		return getComputedStyle(obj,null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer)
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now=0;
			if(attr=='opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}
			else{
				now=parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr]-now)/8;
			speed= speed>0?Math.ceil(speed):Math.floor(speed);
			var current = now + speed;
			if(attr=='opacity'){
				obj.style.opacity= current/100;
			}
			else{
				obj.style[attr]= current+"px";
			}
			if(json[attr] !== current){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)

}