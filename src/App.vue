<template>
	<div id="app" v-if="isRouterAlive">
		<Modal v-model="announcement" title="会员公告">
			<p>{{textContent}}</p>
			<div slot="footer">
				<Button @click="announcement=false" type="primary" size="default">确认</Button>
			</div>
		</Modal>
		<Layout>
			<Header v-if="!isLogin"  >
				<OffHeader></OffHeader>
			</Header>
			<Header v-if="isLogin">
				<OnHeader></OnHeader>
			</Header>
			<Content ref="con" @scroll.native="handleScroll">
				<keep-alive :include="['bet']">
					<router-view  />
				</keep-alive>
			</Content>
			<Footer>
				<vFooter v-if="!isLogin"></vFooter>
				<lFooter v-if="isLogin"></lFooter>
			</Footer>
		</Layout>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import OffHeader from "./assets/header1.vue";
	import OnHeader from "./assets/header2.vue";
	import vFooter from "./assets/footer.vue";
	import lFooter from "./assets/loginFooter.vue";
	import baseUrl from './gobal.js';
	import { bus } from './bus.js'
	export default {

		created() {
			try {
				document.body.removeChild(document.getElementById('appLoading'))
			} catch(e) {

			}
			this.$Notice.config({
				top: 64,
				duration: 3
			});
			if(this.$router.history.current.name != 'register') {
				this.getUserDetail().then((res) => {
					if(res.code == '666') {
						this.setIsLogin(false)
					} else {
						this.setIsLogin(true)
//						this.websoket()
						if(window.location.pathname == "/") {
							this.$router.push({
								path: "/bet"
							})
						}
					}
				})
			}

		},
		mounted() {
			bus.$on('scrollTop', (scroll) => {
				this.$refs.con.$el.scrollTop = scroll;
			})
		},
		data() {
			return {
				webSocket: null,
				isOnline: true,
				announcement: false,
				textContent: '',
				isRouterAlive:true
			}

		},
		methods: {
			...mapActions([
				"setIsLogin",
				"getUserDetail",
				"sendMessage",
				"queryMemberNoticeList",
			]),
			...mapMutations([
				"setKeepAlive"
			]),

			websoket() {
				let URL_1;
				URL_1 = baseUrl;
				let accord = window.location.protocol;
				let str = "wss:";
				if(accord == 'https:') {
					URL_1 = baseUrl.slice(6)
					str = "wss:"
				} else if(accord == 'http:') {
					URL_1 = baseUrl.slice(5)
					str = "ws:"
				}
				let websocket = new WebSocket(encodeURI(str + URL_1 + "/notify/" + this.userDetail.account));
				this.webSocket = websocket;
				websocket.onopen = function() {
										console.log("连接成功")
				};
				websocket.onerror = function() {};
				websocket.onclose = function() {
										console.log("退出成功")
				};

				websocket.onmessage = (message) => {
					this.sendMessage(message)
					if(JSON.parse(message.data).messageType !== '3' && JSON.parse(message.data).messageType !== '10') {
						this.getUserDetail();
						this.$Notice.info({
							title: 'M5II通知',
							desc: JSON.parse(message.data).content
						});
					} else if(JSON.parse(message.data).messageType === '10') {
						this.queryMemberNoticeList('?notice_type=2&type=1')
						this.textContent = JSON.parse(message.data).notice;
						this.announcement = true;
					}
				}
			},
			//滚动事件
			handleScroll(e) {
				bus.$emit('onScroll', e.srcElement.scrollTop);
			},
		},
		name: 'app',
		components: {
			OffHeader,
			OnHeader,
			vFooter,
			lFooter
		},
		computed: mapState(["isLogin", "userDetail", 'message']),
		watch: {
			$route(to, from) {

				if(to.path == '/' && this.isLogin) {
					this.webSocket.close()
				} else {

				}
				if(from.path == '/'||!this.isLogin) {
					this.setKeepAlive(false)
					this.websoket()
				} else {
					this.setKeepAlive(true)
				}
				new Promise(function(reslove, reject) {
					if(from.path == '/'&&to.path.indexOf("help")==-1) {
						reslove();
					}
				}).then(() => {
					bus.$emit('announce');
				})
				if(from.path !== '/account/lotteryreport') {
					sessionStorage.setItem('mark', 2);
					sessionStorage.setItem('mark2', 2);
				}
			}
		}

	}
</script>

<style scoped="scoped">
	* {
		margin: 0;
		padding: 0;
	}

	html,
	body,
	#app {
		height: 100%;
		width: 100%;
	}

	#app .ivu-layout {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow: auto;
	}

	#app .ivu-layout-header {
		min-width: 1200px;
		/*background: linear-gradient(0, #272a32 0, #4b4e58 100%)!important;*/
    background: #363636;
    border-bottom: 1px solid #af6c12;
	}

	#app .ivu-layout-footer {
		height: 71.2px;
		/*background: linear-gradient(0, #272a32 0, #4b4e58 100%)!important;*/
		padding: 0 !important;
    background: #363636;
	}

	#app .ivu-layout-content {
		min-width: 1200px;
		height: 100%;
		overflow-x: hidden;


		background: #2d2d2d;
	}
	/*.el-header,.el-footer{
		padding: 0;
		margin: 0;
		height: 64px !important;
		background: linear-gradient(0,#272a32 0,#4b4e58 100%)!important;

	}
	.el-menu{
		background: linear-gradient(0,#272a32 0,#4b4e58 100%)!important;
	}
	.el-main{
		flex: 1;
		margin: 0 ;
		padding: 0;
		position: relative;
		background: #ececec;

	}
	 .el-carousel__arrow{
	 	font-size: 48px;
		display: block;
		width: 58px !important;
		height:58px !important;
		margin: 0 5%;
	}
	.el-carousel{
		height: 350px;
	}
	.el-carousel__container{
		height: 100%;
	}*/
</style>
