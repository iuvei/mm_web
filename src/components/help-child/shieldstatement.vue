<template>
	<div class="aboutus">
		<p class="main-title">安全声明</p>
		<p class="sub-title">安全保障</p>
		<div class="sub-detail">
			<p class="row-with-margin">1.红客联盟核心成员带领百人团队，从事安全行业二十余年，为您打造绝对安全放心的购彩平台</p>
			<p class="row-with-margin">2.每月邀请国际安全专家进行平台安全测试与评估，综合多方建议，不断完善安全的购彩平台</p>
			<p class="">3.百人专业运维团队，7X24小时为安全平台保驾护航</p>
		</div>
		<p class="sub-title">安全技术</p>
		<div class="sub-detail">
			<p class="row-with-margin">1.<span>{{groupName}}</span>彩票采用国际流行的SSL或SET方式加密，通过国内各大银行的支付网关进行网上支付，由银行方面负责安全性。</p>
			<p class="row-with-margin">2.网银在线不收集用户的银行卡资料。当用户需要填写银行卡资料时，实际上已经到达到银行的支付网关。所以，用户不必担心您的银行卡资料会在经由网银在线泄露。</p>
			<p class="">3.银行和相关金融部门提供在线支付使用的支付平台，通过非常安全的SSL256位加密。您的资料均经过安全保密处理并直接提交给认证系统，有关银行认证后会以安全的方式通知我们相应订单金额结果。</p>
		</div>
		<p class="sub-title">安全声明</p>
		<div class="sub-detail">
			<p class="row-with-margin"><span>{{groupName}}</span>彩票采用了先进的Internet安全技术，在未经许可的情况下任何人不得访问，公司绝不会将用户产生的数据提供给任何无关的第三方。</p>
			<p class="row-with-margin">通过SSL3.0/TLS与<span>{{groupName}}</span>彩票联接，确保在您在终端与<span>{{groupName}}</span>彩票服务器之间的传输数据不会被窃取。</p>
			<p class="row-with-margin">客户信息无法使用http访问，所有http联接重新导向https（SSL/TLS）。</p>
			<p class="row-with-margin">储存于数据库或文件中的客户密码均通过多种不可逆散列算法进行加密，为客户信息提供加密保护，使之不可读取。</p>
			<p class="row-with-margin"><span>{{groupName}}</span>彩票使用了企业级云计算中心来存储您的信息，您的数据是私密的，安全的，和M5II彩票上的其他企业或组织完全分离。</p>
			<p class="row-with-margin"><span>{{groupName}}</span>彩票企业级云计算中心拥有充足的负载均衡器与核心交换机。客户数据自动备份，并在备份文件生成后，使用AES算法进行加密。</p>
			<p class="row-with-margin"><span>{{groupName}}</span>彩票给每个登陆者提供了独一无二的用户名和密码，用户每次登录都必须输入用户名和密码。</p>
			<p class=""><span>{{groupName}}</span>彩票仅给特定会话持续时间内的记录加密的身份认证信息发送会话"cookie"。会话"cookie"不包括用户的用户名和密码。<span>{{groupName}}</span>彩票不使用"cookies"来存储其他机密用户和会话信息，而是根据动态数据和编码会话ID，对用户数据进行更加高级的安全保护。</p>
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
  span{
    /*font-size: 16px;*/
    /*color: #108ee9;*/
  }
</style>
