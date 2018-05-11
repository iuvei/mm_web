<template>
	<div class="aboutus">
		<p class="main-title">账号安全</p>
		<p class="sub-title">账户安全</p>
		<div class="sub-detail">
			<p class=""><span>{{groupName}}</span>彩票为保障每位客户的权益，绝对禁止将个人资料泄露给非本人，同时也会要求会员个人姓名与银行卡持有人是要相符的，并请会员要保全好您的账号密码及注册资料避免透露给他人得知，<span>{{groupName}}</span>彩票也不会将客户的资料透漏给第三方，除非我们的保密条款有其他的规定。提醒会员，尽量不要在公共计算机上登入本站网页，以保障账户安全。</p>
		</div>
		<p class="sub-title">资金安全</p>
		<div class="sub-detail">
			<p class="row-with-margin">1、用户每次发起提款都需输入资金密码才可提交提款。</p>
			<p class="row-with-margin">2、用户绑定的银行卡账户名必须和用户注册时填写的姓名一致，否则将提款不成功。</p>
			<p class="row-with-margin">3、银行卡锁定后，不允许用户私自修改，若要修改，需联系客服人员，核对详细的资料后，才可以修改。</p>
			<p class="row-with-margin">4、用户注册时所填写的姓名及用户的绑定的银行卡号，在填写成功后，个人资料中都无法查看到。</p>
			<p class="">注：为保障用户的合法权益，避免在中奖时因用户注册资料与情况不符而发生纠纷，请用户注册时务必按照匹配、全面的原则填写注册信息。</p>
		</div>
		<p class="sub-title">充值安全</p>
		<div class="sub-detail">
			<p class="">本站提供多种充值方式，与15家银行开通直联网管，彻底解决通过银行汇款进行支付的不安全因素，为用户提供安全、稳定、快速的资金支付渠道，彻底保障用户支付安全。</p>
		</div>
		<p class="sub-title">购彩安全</p>
		<div class="sub-detail">
			<p class=""><span>{{groupName}}</span>彩票根据国家彩票管理部门的官方开奖号码进行开奖。若用户自购彩票中奖，本站在开奖后，将奖金全额派发至中奖用户在本站的账户中。用户可以随时对自己在本站的账户中的资金进行提现。</p>
		</div>
		<p class="sub-title">隐私安全</p>
		<div class="sub-detail">
			<p class="row-with-margin">1、<span>{{groupName}}</span>彩票正确处理用户提供的私人信息。平台使用用户的个人信息以及其他信息的目的在于：处理用户的投注、管理用户的账户、向用户提供服务等。<span>{{groupName}}</span>彩票是用户个人信息的唯一拥有者，不会将资料提供、遗弃或出售给任何第三方。</p>
			<p class="">2、所有个人资料在不需要被保留时将被销毁。</p>
		</div>
		<p class="sub-title">加密防盗技术</p>
		<div class="sub-detail">
			<p class="">为保证用户在游戏过程中信息和资金的安全性，<span>{{groupName}}</span>彩票采用了128位SSL国际安全标准的数据加密技术，并设置了多重加密，以确保用户的资料及投注数据在网络传输过程中不被篡改和窃取。</p>
		</div>
	</div>
</template>

<script>
  export default {
    data(){
      return{
        groupName: 'M5II'
      }
    }
  }
</script>

<style>
	 .aboutus {
    padding: 20px 0;
}
.aboutus .main-title {
    color: #108ee9;
    font-size: 18px;
    text-align: center;
    padding-bottom: 20px;
    margin: 0 20px 20px;
    border-bottom: 1px solid #ccc;
}
.aboutus .summary {
    margin: 20px;
    font-size: 14px;
}
.aboutus .sub-title {
    height: 32px;
    line-height: 32px;
    border-left: 4px solid #108ee9;
    color: #108ee9;
    font-size: 16px;
    padding-left: 10px;
}
 .aboutus .sub-detail {
    padding: 20px;
}
.aboutus .row-with-margin {
    margin-bottom: 12px;
}

</style>
