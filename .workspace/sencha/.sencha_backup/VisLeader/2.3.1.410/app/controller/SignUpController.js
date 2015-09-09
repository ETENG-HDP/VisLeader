Ext.define('VisLeader.controller.SignUpController', {
    extend: 'ETFramework.app.Controller',
	config: {
	  	control: {
	  		'viewport': {
	  			registuser: 'registuser',
	  			registRegion: 'registRegion',
	  			login: 'handleLogin',
	  			signup: 'handleSignUp',
	  			appinit: 'appinit'
	  		},
	  		refs: {
	  			newButton: 'button[action=newurl]',
				mynewUrl: 'textfield[name=myurll]',
				storeUrl: 'textfield[name=store_url]'
	  		},
	  		control: {
	  			newButton: {
					tap: 'loginUrl'
				}
			}
	  	}
	},

	handleSignUp: function () {
		this.redirectTo('signup');
	},

	//登录方法
    handleLogin: function(usernameProxy, passwordProxy) {

	    if(usernameProxy == '') {
	        Toast.toast('账号信息不能为空');
	        return;
	    } else if(passwordProxy == '') {  
	        Toast.toast('密码信息不能为空');
	        return;
	    }

	    Ext.Viewport.setMasked({
		        xtype: 'loadmask',
		        message: '正在登陆请稍候……'
		});

	    this.request({
	    	url: bcpConfig.loginURL + '/servlet/MobileSubmitAction',
			bo: 'et.bcp.account.AccountBO',
			params: {
				action: 'pubLogin',
				account_code: usernameProxy,
				account_password: passwordProxy
			},
			callback: function(err,flag,userObj) {
				if(err){
					this.cancelMask();
					Toast.toast('请检查网路')
				}else{
					if(flag=='true'||flag=="true"||flag==true){
						console.log(userObj);
						if((localStorage.user_id == userObj[0]) || !localStorage.user_id){							
							localStorage.user_id=userObj[0];
							localStorage.user_name=userObj[1];//姓名
							localStorage.corp_id=userObj[2];
							localStorage.storegroup=userObj[3];//库存组织;
							localStorage.user_code=usernameProxy;//账号
							localStorage.username=usernameProxy;//用户名
							localStorage.password=passwordProxy;//密码
							localStorage.identity_type = userObj[4];//业代的类型  自销或贸易  该字段对应产品品牌的自销和贸易字段
							this.cancelMask();
							Toast.toast('欢迎'+userObj[1]+'登录', 1000);
							this.enter(false);
							this.redirectTo('');
							//this.redirectTo('main');
						}else{
							Ext.Msg.confirm("提示", localStorage.user_name+"使用过该软件,是否清除该用户数据,登录本软件?", function(state) {
								if (state == 'yes') {
									localStorage.clear();
									localStorage.user_id=userObj[0];
									localStorage.user_name=userObj[1];//姓名
									localStorage.corp_id=userObj[2];
									localStorage.storegroup=userObj[3];//库存组织;
									localStorage.user_code=usernameProxy;//账号
									localStorage.username=usernameProxy;//用户名
									localStorage.password=passwordProxy;//密码
									localStorage.identity_type = userObj[4];//业代的类型  自销或贸易  该字段对应产品品牌的自销和贸易字段
									this.cancelMask();
									Toast.toast('欢迎'+userObj[1]+'登录', 1000);
									this.enter(false);
									this.redirectTo('');
									Ext.Viewport.query('main')[0].setActiveItem(0);
								}
							}, this);
						}

					} else {
						this.cancelMask();
						Toast.toast(userObj);
					}
				}	
			},
			scope: this
		});

    },

	//注册时查询区域的方法
	registRegion: function() {
		this.request({//暂时走BOSS系统
			//url: bcpConfig.loginURL + '/servlet/MobileSubmitAction',
			bo: 'et.bcp.Region.RegionBO',
			params: {
				action: 'query',
				user_corp_id: bcpConfig.appcorpid //应用的id,不同公司不同,对应公司的corp_id,测试公司0002
			},
			callback: function(err, flag, message) {
				console.log(message);
				if(err != null) {

				}else if(flag == 'true' || flag && message != 'undefined' && message != null) {
					Ext.Viewport.fireEvent('signup');
					var store = Ext.StoreMgr.lookup('registregionstore');					if(store.getAllCount !=0) {
						store.removeAll();
					}

					message.forEach(function(data) {
						if(data.region_type == 1 || data.region_type ==2) {
							store.add(data);
						}
					})
				}else {//没有数据   提示
					//Toast.toast(message);
				}
			}
		})
	},

	//应用初始化
	appinit:function(){
		//用户名初始化
		var commit = Ext.Viewport.query('container[name = more_container]')[0];
		if(commit != undefined){
		}else{
			Ext.Viewport.add(Ext.create('VisLeader.view.more.MoreApp'));
			var commit = Ext.Viewport.query('container[name = more_container]')[0];
		}
		var commit2 = Ext.Viewport.query('img[name = more_user]')[0];
		if(commit2 != undefined){
			commit2.destroy();
		}
		commit.add({
			xtype: 'img',
		    name: 'more_user',
			height:'3em',
			html:[
					'<div style="width: 18em;vertical-align:middle;text-align:center; margin: 0.5em 0em 0em 0em; ">',
							'<span style="margin:0em 0em 0em 0.5em" >'+localStorage.user_name+'</span>',
					'</div>'	
			].join("")
		})
		Ext.Viewport.fireEvent('updateApk',true);
		$(function(){
			$('#QRZXWcode')[0].innerHTML='';
			var identity_type = localStorage.identity_type;
			var user_id = localStorage.user_id;
			var user_name = localStorage.user_name;
			var txt=''+identity_type+','+user_id+','+user_name;
			console.log(txt);
			var options = {		render: 'div',
		            ecLevel: "H",
		            width:170,
		            height:170,
					text: utf16to8(txt)
				};
			jQuery('#QRZXWcode').qrcode(options);
		});
		var htmlSlice = jQuery('#QRZXWcode').html();
		var el = $( '<p id="QRZXWcode" align="center"></p>');
		el.html(htmlSlice);
		Ext.Viewport.query('moreApp')[0].config.items[1].html=el[0];
		Ext.Viewport.fireEvent('searchCenter');
	},
	
	/*注册方法*/
	registuser: function() {
		var view = Ext.Viewport.query('signup')[0];
		var account = view.down('numberfield[name=phone]').getValue();
		var password = view.down('passwordfield[name=password]').getValue();
		var repassword = view.down('passwordfield[name=repassword]').getValue();
		// var region = view.down('selectfield[name=region]').getValue();
		/*手机号码验证  由于使用的是numberfield这里不允许出现“+”号，若允许，则可以使用textfield*/
		// var re = /^(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}$/g;
		// if(re.test(account+'')){
		// 	//console.log(account);
		// } else {
		// 	Toast.toast('请输入正确的电话号码', 2000);
		// 	return;
		// }
		if(account == null || account.toString().trim() == ""){
			ViewSwitch.toast('手机号码不能为空', 2000);
			return;
		}
		if(password.trim() == "" || repassword.trim() == "" || password == null || repassword == null) {
			Toast.toast('密码不能为空', 2000);
			return;
		}
		/*密码验证*/
		if(repassword != password) {
			Toast.toast('密码不一致', 2000);
			return;
		}

		//提交数据
		this.request({
			url: bcpConfig.loginURL + '/servlet/MobileSubmitAction',
			bo: 'et.bcp.account.AccountBO',
			params: {
				action: 'leaderRegister',
				phone_num: account,
				account_password: password,
				// region_id: region,
				user_corp_id: localStorage.corp_id
			},
			
			callback: function(err, state, message) {
				console.log(message);
				if(err != null) {
					Toast.toast('请检查网络', 1000);
				} else {
					//console.log(state);
					if(state == "true" || state && message) {
						localStorage.clear();
						
						localStorage.user_id = message[0]; //用户id
						localStorage.user_name = message[1]; //用户名
						localStorage.corp_id= message[2]; //公司编码
//						localStorage.storegroup= message[3]//库存组织;
						localStorage.user_code = account; //用户编码
						localStorage.username = account;//账号 (平台用)
						localStorage.password = password;//密码(平台用)
						localStorage.identity_type = message[3];//人员类型 仓库，中心经理，营销中心人员，业代(自销和贸易)
						
						Toast.toast('注册成功', 1000);
						this.enter(false);
						this.redirectTo('');
					} else if(state == "false" || !state){
						Toast.toast(message, 2000);
					}
				}
			},
			scope: this
		});
	},

	cancelMask: function() {
		Ext.Viewport.setMasked(false);
		var mask = Ext.Viewport.query('loadmask')[0];
		console.log(mask);
		if(mask != null) {
			Ext.Viewport.remove('mask', true);
		}
	},

	toUpdate: function() {
		var activeItem = Ext.Viewport.getActiveItem();
		this.redirectTo('bcp/updateurl');
		Ext.Viewport.query('updateUrl')[0].setData({toView:activeItem});
	},
	
	loginUrl: function(){
		var myurl = this.getMynewUrl().getValue();
		var storeUrl = this.getStoreUrl().getValue();
		updateUrlStore.removeAll(myurl);
		updateUrlStore.add({'mybase_url':myurl});
		
		localStorage.mybase_url=myurl;
		localStorage.store_url = storeUrl;//可用量Store
		bcpConfig.storeURL = storeUrl;
		bcpConfig.loginURL = myurl;
		
		ViewSwitch.toast("登录链接修改成功", 2000);
		var urlView = Ext.Viewport.query('updateUrl')[0];
		
		if(urlView) {
			var toView = urlView.getData().toView;
			Ext.Viewport.setActiveItem(toView);
			urlView.destroy();
		}
	}
	
});	function utf16to8(str) {
	    var out, i, len, c;
	    out = "";
	    len = str.length;
	    for (i = 0; i < len; i++) {
	        c = str.charCodeAt(i);
	        if ((c >= 0x0001) && (c <= 0x007F)) {
	            out += str.charAt(i);
	        } else if (c > 0x07FF) {
	            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
	            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
	            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	        } else {
	            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
	            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
	        }
	    }
	    return out;
	}