//author:Toka 2018.8/
//index.js 
//获取应用实例
const app = getApp()

Page({
	//swiper
  data: {
		imgUrls: [
			'/images/Alade.jpg',
			'/images/Alade.jpg',
			'/images/Alade.jpg',
		],

		indicatorDots: true,
		vertical: false,
		autoplay: true,
		circular: true,
		interval: 5000,
		duration: 2000,
		previousMargin: 0,
		nextMargin: 0,
		indicatorActiveColor: "#36bde0",

		lastTouchTime:0,
		flipstateTx:1,
		flipstateKk:1,
		flipstateCy:1
  },
	cleanAnimated: function () {
		this.setData({
			box_swiper: "animated fadeOut",
			container: "animated fadeOut",
			item_two: "animated fadeOut",
			item_five: "animated fadeOut",
			item_eight: "animated fadeOut",
		})
	},

	containerTap: function (res) {
		// console.log(res.touches[0]);
		var x = res.touches[0].pageX-4;
		var y = res.touches[0].pageY+85;
		this.setData({
			rippleStyle: ''
		});
		this.setData({
			rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 1s linear;animation:ripple 1s linear;'
		});

	},
	
	flipTx: function(e){
		var t = this;
		// console.log(t.data.lastTouchTime);
		var curTime = e.timeStamp;
		if (curTime - t.data.lastTouchTime > 0) {
			if (curTime - t.data.lastTouchTime > 1e3) {
				this.setData({
					lastTouchTime: curTime
				})
				if (t.flipstateTx == 0) {
					t.flipstateTx = 1,
						//console.log(t.flipstate);
						setTimeout(function () {
							t.setData({
								item_imgTx: "animated flipInY"
							})
						}, 1e3);
					t.setData({
						item_text1: "animated fadeOut"
					});
				} else {
					t.flipstateTx = 0,
						//console.log(t.flipstate);
						t.setData({
							item_imgTx: "animated flipOutY"
						});
					setTimeout(function () {
						t.setData({
							item_text1: "animated fadeIn"
						})
					}, 1e3);
				} 
			}
		}
	},
	flipKk: function (e) {
		var t = this;
		// console.log(t.data.lastTouchTime);
		var curTime = e.timeStamp;
		if (curTime - t.data.lastTouchTime > 0) {
			if (curTime - t.data.lastTouchTime > 1e3) {
				this.setData({
					lastTouchTime: curTime
				})
				if (t.flipstateKk == 0) {
					t.flipstateKk = 1,
						//console.log(t.flipstate);
						setTimeout(function () {
							t.setData({
								item_imgKk: "animated flipInY"
							})
						}, 1e3);
					t.setData({
						item_text2: "animated fadeOut"
					});
				} else {
					t.flipstateKk = 0,
						//console.log(t.flipstate);
						t.setData({
							item_imgKk: "animated flipOutY"
						});
					setTimeout(function () {
						t.setData({
							item_text2: "animated fadeIn"
						})
					}, 1e3);
				}
			}
		}
	},
	flipCy: function (e) {
		var t = this;
		// console.log(t.data.lastTouchTime);
		var curTime = e.timeStamp;
		if (curTime - t.data.lastTouchTime > 0) {
			if (curTime - t.data.lastTouchTime > 1e3) {
				this.setData({
					lastTouchTime: curTime
				})
				if (t.flipstateCy == 0) {
					t.flipstateCy = 1,
						//console.log(t.flipstate);
						setTimeout(function () {
							t.setData({
								item_imgCy: "animated flipInY"
							})
						}, 1e3);
					t.setData({
						item_text3: "animated fadeOut"
					});
				} else {
					t.flipstateCy = 0,
						//console.log(t.flipstate);
						t.setData({
							item_imgCy: "animated flipOutY"
						});
					setTimeout(function () {
						t.setData({
							item_text3: "animated fadeIn"
						})
					}, 1e3);
				}
			}
		}
	},
  //事件处理函数
    bindViewTap: function() {
  
  },
    onLoad: function () {
		this.Time();
  },
	onShow: function () {
		var t = this;
		setTimeout(function () {
			t.setData({
				box_swiper: "animated fadeIn",
			})
		}, 1e3),
		setTimeout(function () {
			t.setData({
				container: "animated fadeIn",
			})
		}, 1500),
		setTimeout(function () {
			t.setData({
				item_two: "animated fadeIn",
			})
		}, 1800),
		setTimeout(function () {
			t.setData({
				item_five: "animated fadeIn",
			})
		}, 2100),
		setTimeout(function () {
			t.setData({
				item_eight: "animated fadeIn",
			})
		}, 2400)
	},
	onReady: function () {

	},
	Time : function() {
		var that =this;
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		
		var now= [year, month, day].join('/') + ' ' + [hour, minute, second].join(':');
		this.setData({
			time: now
		});
		setTimeout(function(){
			that.Time();
		},500);
	},
	/** 生命周期函数--监听页面隐藏**/
	onHide: function () {
		this.cleanAnimated()
	},
	//下拉刷新
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
})

