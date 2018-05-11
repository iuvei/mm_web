<template>
	<div class="help">

    <Layout>
			<Sider style="background: none;">
				<div class="help-sider">
					<div class="help-wrapper">
						<div class="help-header ant-row-flex ant-row-flex-center ant-row-flex-middle"><i class="anticon anticon-book"></i>
							<!-- react-text: 269 -->&nbsp;
							<!-- /react-text --><span>帮助中心</span></div>
						<div class="help-list">
							<p class="title">新手指南</p>
							<p class="line"><span class="item"><router-link to="/help/aboutus" >关于我们</router-link></span><span class="seprator">|</span><span class="item"><router-link to="/help/qa">常见问题</router-link></span></p>
							<p class="line"><span class="item"><router-link to="/help/aboutbet">投注查询</router-link></span><span class="seprator">|</span><span class="item"><router-link to="/help/aboutreport">报表查询</router-link></span></p>
						</div>
						<div class="help-list">
							<p class="title">提现问题</p>
							<p class="line"><span class="item"><router-link to="/help/drawsteps">如何提现</router-link></span><span class="seprator">|</span><span class="item"><router-link to="/help/drawquota">提现额度</router-link></span></p>
						</div>
						<div class="help-list">
							<p class="title">充值问题</p>
							<p class="line"><span class="item"><router-link to="/help/transdeposit">转账充值</router-link></span><span class="seprator">|</span><span class="item"><router-link to="/help/bankdeposit">网银充值</router-link></span></p>
							<p class="line"><span class="item"><router-link to="/help/thirddeposit">三方充值</router-link></span></p>
						</div>
						<div class="help-list">
							<p class="title">彩种知识</p>
							<p class="line"><span class="item"><router-link to="/help/rules">游戏玩法</router-link></span><span class="seprator">|</span><span class="item"><router-link to="/help/howtobet">如何投注</router-link></span></p>
							<p class="line"><span class="item"><router-link to="/help/chasewithdraw">追号撤单</router-link></span></p>
						</div>
						<div class="help-list">
							<p class="title">账号安全</p>
							<p class="line"><span class="item"><router-link to="/help/accountshield">账号安全</router-link></span><span class="seprator">|</span><span class="item"><router-link to="/help/shieldstatement">安全声明</router-link></span></p>
						</div>
					</div>
				</div>
			</Sider>
      <Layout  >
        <Content  :style="{ minHeight: '260px'}" class="help-content">
          <router-view />
        </Content>
      </Layout>
    </Layout>
    <BackTop :right="100" :duration="100"></BackTop>
	</div>
</template>

<script>
  import BackTop from '../assets/BackTop.vue'
  export default{
    components:{
      BackTop
  },
    methods:{

    }

  }
</script>

<style scoped="scoped">
	body *,
	html * {
		box-sizing: border-box;
	}

	a {
		font-size: 12px !important;
	}

	body {
		font-family: Helvetica Neue For Number, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;
		font-size: 12px;
		line-height: 1.5;
		color: rgba(0, 0, 0, .65);
		background-color: #fff;
	}

	.help {
		width: 1200px;
		height: 100%;
		padding-top: 10px;
		/*padding-bottom: 10px;*/
		margin: 0 auto;


	}

	.help .help-sider {
		width: 165px;
		display: inline-block;
		color: #108ee9;
	}

	.help .help-sider .help-wrapper {
		background: #fff;
		border: 1px solid #ccc;
	}

	.help .help-sider,
	.help .help-content {
		float: left;
	}

	.help .help-sider .help-header {
		height: 40px;
		font-size: 20px;
		border-bottom: 1px solid #ccc;
	}

	.ant-row-flex-middle {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.ant-row-flex-center {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
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

	* {
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
  .anticon:before {
		display: block;
		font-family: anticon!important;
	}
  .help .help-sider .help-list {
		padding: 20px 0 10px 0;
		margin: 0 20px;
		background: #fff;
	}
  .help .help-sider .title {
		margin-bottom: 15px;
		font-size: 18px;
		color: #212121;
	}

	.help .help-sider .line {
		margin-bottom: 10px;
	}

	.help .help-sider .help-list+.help-list {
		border-top: 1px solid #ccc;
	}

	.help .help-sider .seprator {
		margin: 0 5px;
	}
	.help .help-content {
    background: #fff;
    border: 1px solid #ccc;
    font-size: 14px;
    /*min-height: 100%;*/
}
.help .router-link-active{
	  color: #ffa300;
}
  .help .ivu-layout{
    height:100%;
    overflow: inherit;
  }
  .help>div{
    /*height:100%;*/
    background-color: #ececec;
  }
  .help .ivu-layout-sider{
    flex: 0 0 175px!important;
    min-width: 0!important;
  }
.help .help-content{
  min-height:auto!important;
}

</style>
