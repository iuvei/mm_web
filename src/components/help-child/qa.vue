<template>
	<div class="qa">
		<div class="qa_menu">
			 <Button v-for="(item,index) in titleList" :key="index" :class="selectedIndex==index?'selected':''" @click="onBtn(index)">{{item}}</Button>
		</div>
				<Collapse v-show = "selectedIndex==0">
					<Panel name="1">
						个人资料安全吗？
						<p slot="content"><span>{{groupName}}</span>彩票为保障每位客户的权益，绝对禁止将个人资料泄露给非本人，同时也会要求会员个人姓名与银行卡持有人是要相符的，并请会员要保全好您的账号密码及注册资料避免透露给他人得知，<span>{{groupName}}</span>彩票也不会将客户的资料透漏给第三方，除非我们的保密条款有其他的规定。提醒会员，尽量不要在公共计算机上登入本站网页，以保障账户安全。</p>
					</Panel>
					<Panel name="2">
						当我使用我的密码登陆时出现错误？
						<p slot="content">
							请检查您是否正确输入了密码，密码至少为6位的阿拉伯数字和英文字母，同时密码是区分大小写的。如果您仍然不能解决问题，请直接与24小时在线客服联系。</p>
					</Panel>
					<Panel name="3">
						忘记密码了怎么办？
						<div slot="content">
							<div>1、联系在线客服，提供客服要求的相对应的信息，资料核实正确后即可为您修改密码。</div>
							<div>2、建议您初始拿到账号请到平台进行登录密码、提款密码、密保问题的设定。</div>
							<div>3、请妥善保管好您的个人信息，如果资金密码，登录密码和密保遗忘将无法再修改和找回密码。</div>
							<div>4、可以通过首页，忘记密码选项自行找回密码。</div>
						</div>
					</Panel>
					<Panel name="4">
						比赛结束后我的投注需要多久时间才会结算输赢？
						<p slot="content">我们将尽快进行所有投注的输赢结算，不过有一些赛事需要官方确认赛果后才能进行结算，这将有可能延迟进行结算的过程。在确认赛事的最终结果后即会进行派彩，请耐心等候，不便之处敬请见谅。</p>
					</Panel>
					<Panel name="5">
						我无法看到这个网站上的部分图片，怎么办？
						<p slot="content">旧版本的Adobe Flash Player在显示部分Flash图片时存在问题。我们建议您安装使用Adobe Flash 9.0或更高的版本，或者联系24小时在线客服。</p>
					</Panel>
					<Panel name="6">
						可否同时注册拥有多个账号？
						<p slot="content">客户不可以同时拥有多个账号，如发现客户拥有多个户口，公司有权取消其户口以及投注 ,本公司保留权利取消或关闭您的账户本公司有权限制客户只保留其中一个户口。</p>
					</Panel>
					<Panel name="7">
						我的投注清单和登录框不能正常显示，怎么解决？？
						<p slot="content">一些客户可能会遇到“投注清单”和“登录框”移到了荧幕外而看不到的情况。这通常是由于您的个人电脑荧幕解析度设置得太低造成的（低于1024X768）。为了更好地使用本网站，请确保您的电脑荧幕解析度设置为1024X768或更高。</p>
					</Panel>
					<Panel name="8">
						如何更改我的登陆/提现密码？
						<p slot="content">登录会员账户，依次点击 会员中心--账户信息--安全中心--登录/提现密码，便可以进行更改。</p>
					</Panel>
					<Panel name="9">
						网站打不开？
						<p slot="content">1、可能当前路线正在维护或者该路线已经失效。请进入网站测速地址或者在线客服索要最新的路线。</p>
					</Panel>
				</Collapse>
				<Collapse v-show = "selectedIndex==1">
					<Panel name="1">
						提款金额限制
						<p slot="content"><span>{{groupName}}</span>彩票最低提款金额为RMB 100元，工商最高单笔200000元，其他银行单笔50000元。</p>
					</Panel>
					<Panel name="2">
						提款到帐时间需要多久？
						<p slot="content">我们严格要求每笔提款到帐时间须控制在30分钟之内，除非我们已经特别提醒您，您的提款交易是需要额外验证的。</p>
					</Panel>
					<Panel name="3">
						充值金额限制
						<p slot="content"><span>{{groupName}}</span>彩票最低充值金额为RMB 10元，最高充值金额无上限。</p>
					</Panel>
					<Panel name="4">
						充值未到账如何处理？
						<p slot="content">由于跨行汇款的到账时间是取决银方面办理速度，一般都是有1-8小时的到账时间，请您耐心等待。如果已成功汇款，可能是由于第三方支付公司还没有收到您的款项，请麻烦发送小票的扫描件或是清晰照片（如果是网银汇款请发送汇款回单的截图）给我们，我们会马上为您提交到第三方支付公司进行查询。</p>
					</Panel>
					<Panel name="5">
						转账附言是什么？为什么一定要填？
						<p slot="content">填写充值金额并获取充值卡号的时候，我们会提供验证信息给您。在您通过银行转账时，除了准确金额和转账账户以外，请一定要在备注/附言/捎句话等处填上验证信息，否则无法自动到账。若填错或不填的话，您必须联系客服。</p>
					</Panel>
					<Panel name="6">
						充值至旧的银行卡账户怎么办？
						<p slot="content">每次充值前请获取最新的银行卡账户，存至旧的银行卡账户恕不负责。</p>
					</Panel>
				</Collapse>
				<Collapse v-show = "selectedIndex==2">
					<Panel name="1">
						游戏撤单问题？
						<div slot="content">
							<p>1、如果要撤单，必须在停止投注之前进行撤单，如果投注时间已截止，那么将无法再进行撤单操作。</p>
							<p> 2、如果投注时间未截止，请点击游戏记录或者游戏大厅最下方近期订单记录，点击“撤单”按钮即可。</p>
							<p>3、如果是撤消追号单，需要点击“撤销追号”按钮即可。</p>
							<p>4、在彩票页面投注后，屏幕右下方订单后面有个撤单按钮，点击撤单选择确定即可。</p>
						</div>
					</Panel>
					<Panel name="2">
						奖金限额
						<div slot="content">
							<p class="row-with-margin">高频彩种每期最高奖金限额600000.00元，超出按600000.00元计算，超出的奖金无效并清0；</p>
							<p class="row-with-margin">低频彩种每期最高奖金限额150000.00元，超出按150000.00元计算，超出的奖金无效并清0；</p>
							<p class="row-with-margin">用户可根据自身情况可向平台申请VIP通道，增加每期奖金限额；</p>
							<p class="row-with-margin">任何彩种每期单挑奖金限额30000.00元，超出按30000.00元计算，超出的奖金无效并清0。</p>
							<p class="">单挑模式说明：彩种和玩法通过换算后属于单挑规定之内的，中奖率低于总注数2%均为单挑模式。例如【五星直选】2000注及以内，【四星直选】200注及以内，【三星直选】20注及以内，【二星直选】2注及以内。十一选五任选单挑模式：【五中五】最低10注，【四中四】最低7注， 【三中三】最低4注，如果有多个账户或恶意投注同一号码行为，平台有权取消其所有注单。建议会员投注时注意自己的投注注数及中奖金额，如超过奖金限制，平台概不负责。如有争议，以本平台处理为准，特此公告，永久有效。</p>
						</div>
					</Panel>
					<Panel name="3">
						第三方机构不开奖，投注单如何处理？
						<p slot="content">所有游戏，如遇第三方机构不开奖，平台会对超过180分钟后未获得开奖号码的期数进行撤单返款。撤单后无论第三方以任何形式补开，平台均维持撤单处理。</p>
					</Panel>
				</Collapse>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				selectedIndex:0,
				titleList:["常见问题","资金问题","彩票问题"],
				activeName2: 'first',
				activeNames: ['1'],
        groupName: 'M5II'
			};
		},
		methods: {
			onBtn(index){
				this.selectedIndex = index;
			},
			handleClick(tab, event) {
//				console.log(tab, event);
			}
		}
	};
</script>
<style>
	.qa {
		width: 100%;
		height: 100%;
	}
	.qa{
		    padding: 20px;
	}
	.qa_menu{
		display: flex;
		justify-content: center;
		margin-bottom: 14px;
	}
	.qa_menu .ivu-btn{
	margin-left: 7px;
	margin-right: 7px;
	color: rgba(0,0,0,.65);
    background-color: #fff;
    border: none;
    font-size: 16px;
    border-radius: 4px;
    height: 28px;
    line-height: 1.15;
	}
	.qa_menu .ivu-btn.selected{
	margin-left: 7px;
	margin-right: 7px;
	color: #fff;
    background-color: #108ee9;
    border: none;
    font-size: 16px;
    border-radius: 4px;
    height: 28px;
    line-height: 1.15;
	}
	.qa .el-tabs {
		margin-left: 180px;
		background: #FFFFFF;
		padding: 15px 10px;
		border: 1px solid #ccc;
	}
	.qa .ivu-collapse {
    background-color: #FFFFFF;
    border-radius: 3px;
    border: 1px solid #dddee1;
}
.qa .ivu-collapse-content{
	border-top: 1px solid #dddee1;
}
  .qa .ivu-collapse-header:hover {
  	 background-color: #f7f7f7;
  }
</style>
