// pages/map/map.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
		lrc: "[00:00.00] 王菲 : 《约定》\n[00:15.00] 作曲 : 陈小霞\n[00:20.00] 作词 : 林夕\n[00:25.00]编曲 : Adrian Chan\n[00:32.590]还记得当天旅馆的门牌\n[00:39.150]还留住笑着离开的神态\n[00:45.590]当天整个城市 那样轻快\n[00:51.110]沿路一起走半里长街\n[00:57.280]还记得街灯照出一脸黄\n[01:03.050]还燃亮那份微温的便当\n[01:09.490]剪影的你轮廓太好看\n[01:14.590]凝住眼泪才敢细看\n[01:23.770]忘掉天地 彷佛也想不起自己\n[01:29.710]仍未忘相约看漫天黄叶远飞\n[01:36.230]就算会与你分离 凄绝的戏\n[01:41.540]要决心忘记我便记不起\n[01:47.670]明日天地 只恐怕认不出自己\n[01:53.650]仍未忘跟你约定假如没有死\n[02:00.160]就算你壮阔胸膛 不敌天气\n[02:06.140]两鬓斑白都可认得你\n[02:38.780]还记得当天吉他的和弦\n[02:45.110]还明白每段旋律的伏线\n[02:51.470]当天街角流过你声线\n[02:56.690]沿路旅程如歌褪变\n[03:05.790]忘掉天地 彷佛也想不起自己\n[03:11.690]仍未忘相约看漫天黄叶远飞\n[03:18.130]就算会与你分离 凄绝的戏\n[03:23.610]要决心忘记我便记不起\n[03:29.710]明日天地 只恐怕认不出自己\n[03:35.680]仍未忘跟你约定假如没有死\n[03:42.080]就算你壮阔胸膛 不敌天气\n[03:48.100]两鬓斑白都可认得你\n[03:54.200]就算你壮阔胸膛 不敌天气\n[04:00.250]两鬓斑白都可认得你\n[04:05.740]\n",
		lrcObj : {},
		lrc_word : ""
  },
	showAnimated: function () {
		var t = this;
		setTimeout(function () {
			t.setData({
				top_bg: "animated fadeIn",
			})
		}, 1e3), 
		setTimeout(function () {
			t.setData({
				top_one: "animated bounceIn"
			})
		}, 1500), 
		setTimeout(function () {
			t.setData({
				top_two: "animated bounceInDown"
			})
		}, 1800), 
		setTimeout(function () {
			t.setData({
				top_three: "animated lightSpeedIn"
			})
		}, 1900)
		setTimeout(function () {
			t.setData({
				music_word: "animated lightSpeedIn"
			})
		}, 1900)
	},
	cleanAnimated: function () {
	this.setData({
			top_bg: "animated fadeOut",
			top_one: "animated fadeOut",
			top_two: "animated fadeOut",
			top_three: "animated fadeOut",
			music_word: "animated fadeOut",
			lrc_word: "",
			lrcObj: {}
		})
	},
	Time: function () {
		let that = this;
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var hour = date.getHours();

		var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

		var EstablishedDate = new Date(2018, 5, 16);
		var dateSecond = date.getTime();
		var establishSecond = EstablishedDate.getTime();
		var EstablishTime = Math.floor((dateSecond - establishSecond)/(1000 * 60 * 60 * 24)); /*每一天的毫秒数*/

		var now = " "+EstablishTime + '天 ' + hour + "小时" + minute + "分"+ second + "秒";

		this.setData({
			time: now
		});
		setTimeout(function () {
			that.Time();
		}, 500);
	},

	getLyric: function(){
		var lyrics = this.data.lrc.split("\n");
		var lrcO = {};
		for(var i = 0; i<lyrics.length;i++){
			/*console.log(lyrics[i]);获取每段歌词的时间+内容*/
			var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
			var timeRegExpArr = lyrics[i].match(timeReg);
			/*console.log(timeRegExpArr); 获取歌词时间*/
			if (!timeRegExpArr) continue;
			var clause = lyrics[i].replace(timeReg, '');
			/*console.log(clause);歌词内容放在clause数组*/
			for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
				var t = timeRegExpArr[k];
				var min = Number(String(t.match(/\[\d*/i)).slice(1)),
						sec = Number(String(t.match(/\:\d*/i)).slice(1));
				var time = min * 60 + sec;
				/*console.log(time);歌词时间单位转为秒*/
				lrcO[time] = clause;
				/*console.log(lrcO);歌词时间作为数组下标存入对应歌词内容*/
			}
		}
		this.setData({
			lrcObj : lrcO
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		/*console.log("start onload");*/
		var that = this;
		var updateLrc = "";
		that.getLyric();
		const backgroundAudioManager = wx.getBackgroundAudioManager();
		backgroundAudioManager.title = '约定';
		backgroundAudioManager.epname = '情.菲.得意';
		backgroundAudioManager.singer = '王菲';
		backgroundAudioManager.src = 'https://m10.music.126.net/20180817202434/79c1ec63f09e6dc62602e03d3a445ccd/ymusic/8af2/e130/063a/aebb396665cc36bad70eb508c2788121.mp3'; // 设置了 src 之后会自动播放
		backgroundAudioManager.stop();
		backgroundAudioManager.play();
		backgroundAudioManager.onPlay(function () {
			 updateLrc = setInterval(function () {
				/*console.log(backgroundAudioManager.currentTime);获取现在音乐播放时间*/
			 var num = Math.round(backgroundAudioManager.currentTime);
			 var icrWord = that.data.lrcObj[num];
			 if (icrWord != undefined) {
					  /*console.log(num);*/
					  that.setData({
						lrc_word: icrWord
					})
				}
			}, 500);
		});
		
		backgroundAudioManager.onStop(function(){
			clearInterval(updateLrc);
			that.setData({
				lrc_word: ""
			})
		});

		backgroundAudioManager.onEnded(function(){
			clearInterval(updateLrc);
			setTimeout(function(){
				backgroundAudioManager.src = 'https://m10.music.126.net/20180817202434/79c1ec63f09e6dc62602e03d3a445ccd/ymusic/8af2/e130/063a/aebb396665cc36bad70eb508c2788121.mp3';
			}, 5000);
		}) 
  },


	/**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
	onShow: function () {
		/*console.log("start onshow");*/
		var t = this;
		t.showAnimated();
		t.Time();
		setTimeout(function () {
			t.setData({
				bottom_one: "animated slideInUp"
			})
		}, 2100), 
		setTimeout(function () {
			t.setData({
				bottom_two: "animated slideInUp"
			})
		}, 2200), 
		setTimeout(function () {
			t.setData({
				bottom_three: "animated slideInUp"
			})
		}, 2300), 
		setTimeout(function () {
			t.setData({
				bottom_four: "animated slideInUp"
			})
		}, 2400), 
		setTimeout(function () {
			t.setData({
				bottom_one: "bottom-4s-move"
			})
		}, 3100), 
		setTimeout(function () {
			t.setData({
				bottom_two: "bottom-3s-move"
			})
		}, 3200), 
		setTimeout(function () {
			t.setData({
				bottom_three: "bottom-2s-move"
			})
		}, 3300), 
		setTimeout(function () {
			t.setData({
				bottom_four: "bottom-1s-move"
			})
		}, 3400)
	},
	/**
   * 生命周期函数--监听页面隐藏
   */
	onHide: function () {
		this.cleanAnimated(), this.setData({
			bottom: "",
			bottom_one: "",
			bottom_two: "",
			bottom_three: "",
			bottom_four: ""
		})
	},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
		//刷新加载
		var t = this;
		t.cleanAnimated();
		t.onLoad();
		t.onShow();
		setTimeout(function () {
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
			wx.showNavigationBarLoading() //在标题栏中显示加载
			wx.showToast({
				title: '刷新成功',
				icon: 'success',
				duration: 2000
			})
		}, 2500);
	},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})