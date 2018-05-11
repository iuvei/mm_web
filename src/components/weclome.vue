<template>
	<div class="welcome">
		<div class="banner" style="height: 350px;">
			<Carousel v-model="value" loop v-if="show" arrow="always" :autoplay-speed="3000" :autoplay="true">
				<CarouselItem>
					<div class="demo-carousel"><img src="../../static/img/banner1.jpg" class="banner_img" /></div>
				</CarouselItem>
				<CarouselItem>
					<div class="demo-carousel"><img src="../../static/img/banner2.jpg" class="banner_img" /></div>
				</CarouselItem>
			</Carousel>
			<div class="login_from_warp">
				<div class="line"></div>
				<Login ></Login>
			</div>

		</div>
		<div>
			<div class="controlled-block">
				<div class="ant-row-flex ant-row-flex-middle welcome-notice"><span class="notice-label">最新消息/NEWS：</span>
					<div class="scroll-area">
						<div class="scroll"><span class="scroll-inner-item">{{msg==''?'欢迎来到M5Ⅱ彩票！感谢您对我们的信任，M5Ⅱ竭诚带给您最优质的购彩体验，高奖金高回报。选M5Ⅱ彩票，赢世界！':msg}}</span></div>
						<div class="scroll"><span class="scroll-inner-item">{{msg==''?'欢迎来到M5Ⅱ彩票！感谢您对我们的信任，M5Ⅱ竭诚带给您最优质的购彩体验，高奖金高回报。选M5Ⅱ彩票，赢世界！':msg}}</span></div>
					</div>
				</div>
				<div class="part1 ant-row-flex ant-row-flex-space-between">
					<div>
						<div class="ant-row-flex ant-row-flex-middle row-with-margin"><i class="welcome-icon welcome-icon-quickcash"></i><span class="main-title highlight">急速充值</span></div>
						<p class="detail">与多家银行合作，为用户提供安全、稳定、快速的资金支付渠道，彻底保障用户支付安全</p>
						<p class="sub-title">隐私安全</p>
						<p class="detail">M5集团是用户个人信息的唯一拥有者，不会将资料提供、遗弃或出售给任何第三方</p>
						<p class="sub-title">购彩安全</p>
						<p class="detail">M5集团根据国家彩票管理部门的官方开奖号码进行开奖，奖金即刻发放到账户中</p>
						<p class="sub-title">信息安全</p>
						<p class="detail">数据库密码均通过MD5不可逆算法进行加密，为客户信息提供加密保护</p>
					</div>
					<div class="part1-right">
						<div>
							<div class="ant-row-flex ant-row-flex-middle row-with-margin"><i class="welcome-icon welcome-icon-account"></i><span class="main-title highlight">账户安全</span></div>
							<p class="detail">为保证用户在游戏过程中信息和资金的安全性，M5集团采用了256位SSL国际安全标准的数据加密方式，并设置了多重加密验证，以确保用户的资料及投注数据在网络传输过程中不被篡改和窃取</p>
						</div>
						<div>
							<div class="ant-row-flex ant-row-flex-middle row-with-margin"><i class="welcome-icon welcome-icon-lottery"></i><span class="main-title highlight">彩票多元化</span></div>
							<p class="detail">拥有20多个自营和官方彩种，200多种玩法，每一种都贴合玩家的喜好设定，包括北京赛车，重庆时时彩等热门彩种。</p>
						</div>
					</div>
				</div>
				<div class="part2">
					<div class="ant-row-flex ant-row-flex-bottom">
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-global"></i></div>
							<p class="highlight">全球化高防服务器</p>
							<p>采用国际标准化CDN，最高防御200G</p>
						</div>
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-data"></i></div>
							<p class="highlight">分布式存储</p>
							<p>分布在多个数据库，保证资料绝对安全</p>
						</div>
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-store"></i></div>
							<p class="highlight">实时备份</p>
							<p>全天不断电式实时备份，误差缩减为0.01秒</p>
						</div>
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-wall"></i></div>
							<p class="highlight">三层防火墙</p>
							<p>银行系统防火墙，防止黑客入侵</p>
						</div>
					</div>
					<div class="ant-row-flex ant-row-flex-bottom">
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-cash"></i></div>
							<p class="highlight">公司实力雄厚</p>
							<p>营资过亿，诚信出款</p>
						</div>
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-gift"></i></div>
							<p class="highlight">活动多多 福利多多</p>
							<p>每日均有在线活动供客户选择</p>
						</div>
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-service"></i></div>
							<p class="highlight">服 务</p>
							<p>7*24小时人工服务，及时解决任何问题</p>
						</div>
						<div class="part2-item center-align">
							<div><i class="welcome-icon welcome-icon-team"></i></div>
							<p class="highlight">顶尖团队 联手打造</p>
							<p>优秀的团队，带来优质的购彩体验</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Login from "./login.vue";
	import { mapState, mapActions } from "vuex";
	export default {
		created() {
			this.init()
			setTimeout(() => {
				this.show = true
			}, 0)

			this.queryMemberNoticeList('?notice_type=2&type=2').then((res)=>{
				if(res.data.length!=0){
					this.msg = res.data[0].content
				}
			})
		},
		data() {
			return {
				value:0,
				show: false,
				msg:'',
			}
		},
		 methods:{
		 	...mapActions([
				"queryMemberNoticeList",
				"init"
			]),
		 },
		beforeRouteLeave(to, from, next){
			console.log(to)
			to.meta.keepAlive = false;
			next()
		},
		components: {
			Login
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
	@keyframes todayScroll {
	0% {
		transform: translate(0)
	}
	100% {
		transform: translate(-300%)
	}
}
.welcome{
	background: #FFFFFF;
}
	.welcome .banner_img {
		width: 100%;
		height: 350px;
	}

	.welcome .banner {
		position: relative;
		width: 100%;
		min-width: 1200px;
	}

	.welcome  .ivu-carousel-arrow{
		display: block;
		width: 30px !important;
		height: 58px !important;
		margin:0 20px ;
	}

	.welcome  .ivu-carousel-arrow .ivu-icon-chevron-left{
    width: 40px;
    height: 40px;
    border-right: 5px solid #fff;
    border-bottom: 5px solid #fff;
    transform: rotate(135deg);
    opacity: .7;

	}
	.welcome  .ivu-carousel-arrow .ivu-icon:hover{

    opacity: 1;

	}
	.welcome  .ivu-carousel-arrow .ivu-icon-chevron-right{
    width: 40px;
    height: 40px;
    border-right: 5px solid #fff;
    border-bottom: 5px solid #fff;
    transform: rotate(-45deg);
    opacity: .7;

	}

	.ivu-icon-chevron-left:before,.ivu-icon-chevron-right:before {
    display: none;
   }
	.welcome .controlled-block {
		width: 1200px;
		margin: 8px auto;
		padding: 0 8px;
	}

	.welcome {
		font-size: 14px;
	}

	.welcome .login_from_warp{
		min-width: 1200px;
		position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
	}
	.welcome .login_from_warp .line{
	display: block;
    width: 62.5%;
    float: left;
    height: 1px;
    -webkit-box-flex: 0;
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
	}

	.welcome .welcome-notice {
		line-height: 32px;
	}

	.welcome .ant-row-flex-middle {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.welcome .ant-row-flex,
	.welcome .ant-row-flex:after,
	.welcome .ant-row-flex:before {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.welcome .ant-row-flex {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row wrap;
		flex-flow: row wrap;
	}

	.welcome .notice-label {
		color: #eb0000;
	}

	.welcome .scroll-area {
		color: #212121;
		height: 32px;
		-ms-flex: 1;
		flex: 1;
	}

	.welcome .fontSize {
		white-space: nowrap;
		font-size: 50px;
		line-height: 35px;
		padding: 5px 0;
		border-radius: 4px;
		text-align: center;
		color: #d80c09;
		font-family: clock-number, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, times;
	}
	.welcome .scroll {
	color: #212121;
	position: absolute;
	line-height: 64px;
	left: 100%;
	top: 0;
	width: 100%;
	white-space: nowrap;
	animation: todayScroll 50s linear infinite
}

.welcome .scroll+.scroll {
	animation: todayScroll 50s linear 25s infinite
}

.welcome .scroll-inner-item {
	margin-right: 20px
}
	.welcome .scroll-area {
		position: relative;
		height: 64px;
		overflow: hidden;
		color: #fff;
	}

	.welcome .scroll {
		line-height: 32px;
	}

	.welcome .scroll {
		position: absolute;
		line-height: 64px;
		left: 100%;
		top: 0;
		width: 100%;
		white-space: nowrap;
		animation: todayScroll 50s linear infinite;
	}

	.welcome .part1 {
		padding: 5px 0 20px;
		border-bottom: 1px solid #999;
	}

	.welcome .ant-row-flex-middle {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.ant-row-flex,
	.ant-row-flex:after,
	.ant-row-flex:before {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.welcome .ant-row-flex {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row wrap;
		flex-flow: row wrap;
	}

	.welcome .part1 .welcome-icon {
		margin-right: 10px;
	}

	.welcome .welcome-icon {
		display: inline-block;
	}

	.welcome-icon-quickcash {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -103px;
		width: 31px;
		height: 30px;
	}

	.welcome .part1 .detail {
		line-height: 2;
		margin-bottom: 15px;
	}

	.welcome .part1 .sub-title {
		font-size: 16px;
		font-weight: 700;
	}

	.welcome .part1 .detail {
		line-height: 2;
		margin-bottom: 15px;
	}

	.welcome .part1 .sub-title {
		font-size: 16px;
		font-weight: 700;
	}

	.welcome .highlight {
		color: #eb8c20;
	}

	.welcome .part1 .main-title {
		font-size: 18px;
	}

	.welcome .part1-right {
		display: -ms-flexbox;
		display: flex;
		-ms-flex: 1;
		flex: 1;
		margin-left: 100px;
		-ms-flex-direction: column;
		flex-direction: column;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}

	.ant-row-flex-middle {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.ant-row-flex,
	.ant-row-flex:after,
	.ant-row-flex:before {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.ant-row-flex {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row wrap;
		flex-flow: row wrap;
	}

	.row-with-margin {
		margin-bottom: 12px;
	}

	.welcome .welcome-icon {
		display: inline-block;
	}

	.welcome-icon-account {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -68px;
		width: 31px;
		height: 30px;
	}

	.welcome .highlight {
		color: #eb8c20;
	}

	.ant-row-flex-bottom {
		-webkit-box-align: end;
		-ms-flex-align: end;
		align-items: flex-end;
	}

	.ant-row-flex,
	.ant-row-flex:after,
	.ant-row-flex:before {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.ant-row-flex {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row wrap;
		flex-flow: row wrap;
	}

	.welcome .part2-item {
		-ms-flex: 1;
		flex: 1;
		margin: 30px 0;
	}

	.center-align {
		text-align: center;
	}

	.welcome .part2-item .welcome-icon {
		margin-bottom: 10px;
	}

	.welcome .welcome-icon {
		display: inline-block;
	}

	.welcome-icon-global {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -217px;
		width: 36px;
		height: 36px;
	}

	.welcome-icon-lottery {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -33px;
		width: 31px;
		height: 30px;
	}

	.welcome-icon-data {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -258px;
		width: 36px;
		height: 36px;
	}

	.welcome-icon-store {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -340px;
		width: 37px;
		height: 36px;
	}

	.welcome-icon-wall {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -381px;
		width: 32px;
		height: 36px;
	}

	.welcome-icon-cash {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -422px;
		width: 29px;
		height: 37px;
	}

	.welcome-icon-gift {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -177px;
		width: 39px;
		height: 35px;
	}

	.welcome-icon-service {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -299px;
		width: 36px;
		height: 36px;
	}

	.welcome-icon-team {
		background-image: url(../../static/img/welcome_icons.png);
		background-position: 0 -138px;
		width: 40px;
		height: 34px;
	}

	.home .ant-back-top {
		bottom: 100px;
	}

	.ant-back-top {
		z-index: 10;
		position: fixed;
		right: 100px;
		bottom: 50px;
		height: 40px;
		width: 40px;
		cursor: pointer;
	}

	.ant-back-top-content {
		height: 40px;
		width: 40px;
		border-radius: 20px;
		background-color: rgba(64, 64, 64, .4);
		color: #fff;
		text-align: center;
		transition: all .3s cubic-bezier(.645, .045, .355, 1);
	}

	.ant-back-top-icon {
		font-size: 20px;
		margin-top: 10px;
	}

	.anticon {
		display: inline-block;
		font-style: normal;
		vertical-align: baseline;
		text-align: center;
		text-transform: none;
		line-height: 1;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
