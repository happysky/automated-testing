var webPage = require('webpage');
var page = webPage.create();
var url = 'https://www.so.com/';
var resultLoaded = false;

var app = {
	init: function(){
		page.viewportSize = { width: 1920, height: 1080 };

		app.bindEvent();

		page.open(url, function(status){
			var result = page.evaluate(function(_obj) {
				try{
					var forms = document.querySelectorAll('form');
					var input = document.querySelector('#input');

					//设置为新窗口打开，方便下面控制
					for(var i=0,l=forms.length;i<l;i++){
						forms[i].setAttribute('target', '_blank');
					}

					//输入内容
					input.value = "123";

					//搜索
					document.querySelector('#search-button').click()

			 		//强制新窗口，本窗口打开的会调用当前窗口的 onLoadFinished 事件，
			 		//新窗口打开的，会调用当前窗口的 onPageCreated
			 		//item.setAttribute('target', '_blank');
			 		
			 		//item.click();
			 		return {
			 			msg: '成功'
			 		}
				}catch(e){
					return {
						msg: e.message
					}
				}
			});

			console.log(result.msg);

			page.render('page.jpeg', {format: 'jpeg', quality: '100'});			
		});
	},
	loadResult: function(page1){
		page1.render('page1.jpeg', {format: 'jpeg', quality: '100'});

		var result = page1.evaluate(function(_obj) {
			try{
				var forms = document.querySelectorAll('form');
				var input = document.querySelector('#keyword');

				//设置为新窗口打开，方便下面控制
				for(var i=0,l=forms.length;i<l;i++){
					forms[i].setAttribute('target', '_blank');
				}

				//输入内容
				input.value = "abc";

				//搜索
				document.querySelector('#su').click()
		 		return {
		 			msg: '成功'
		 		}
			}catch(e){
				return {
					msg: e.message
				}
			}
		});

		console.log(result.msg);
	},
	clickResult: function(page1){
		page1.render('page1-1.jpeg', {format: 'jpeg', quality: '100'});

		var result = page1.evaluate(function(_obj) {
			var link_url = '';
			var link_text = '';
			try{
				var items_len = document.querySelectorAll('a').length;
		 		var items_index = Math.floor(Math.random() * items_len);
		 		var item = document.querySelectorAll('a')[items_index];
		 		link_url = item.href;
		 		link_text = item.innerText;

		 		//强制新窗口，本窗口打开的会调用当前窗口的 onLoadFinished 事件，
		 		//新窗口打开的，会调用当前窗口的 onPageCreated
		 		item.setAttribute('target', '_blank');
		 		
		 		item.click();
		 		return {
		 			msg: '成功'
		 		}
			}catch(e){
				return {
					msg: e.mess
				}
			}
		});
	},
	bindEvent: function(){
		page.onPageCreated = function(page1){
			page1.onLoadFinished = function(){
				if(!resultLoaded){
					app.loadResult(page1);
					resultLoaded = true;
				}else{
					app.clickResult(page1);
				}
            };

            page1.onPageCreated = function(page2){
				page2.onLoadFinished = function(){
					page2.render('page2.jpeg', {format: 'jpeg', quality: '100'});

					phantom.exit();
	            };
			}
		}
		
	}
};


app.init();