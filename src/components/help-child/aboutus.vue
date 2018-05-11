<template>
	<div >
			<div class="aboutus">
				<p class="main-title">关于我们</p>
				<p class="summary"><span>{{groupName}}</span>彩票是“一站式”网站娱乐平台，是行业发展迅速、口碑绝佳、操作便捷的一家多元化线上娱乐平台。</p>
				<p class="sub-title"><span>{{groupName}}</span>集团的承诺</p>
				<div class="sub-detail">
					<p class="row-with-margin">自成立以来，<span>{{groupName}}</span>集团始终坚持一个目标：在竞争中不断超越自我，立志成为业内一流的博彩网站之一。</p>
					<p class="row-with-margin">在此激励下，我们致力于向我们的合作伙伴提供一个公平合理、安全可靠和准确快捷的货币交易平台，并为活跃用户提供7*24的支援。</p>
					<p class="">我们的使命不仅仅是为您提供一流的线上娱乐，同时协助您设置每场游戏的限额，让您在良好的娱乐心态下获得最佳的娱乐体验。</p>
				</div>
				<p class="sub-title">技术团队</p>
				<div class="sub-detail">
					<p class="row-with-margin">聘请8年网站设计经验的专业工作室，进行网站设计，力求时尚大气</p>
					<p class="row-with-margin">红客联盟核心成员率领的百人团队，为您提供安全有保障的购彩体验</p>
					<p class="row-with-margin">聘请国内一流运维团队，保证您能7*24小时不间断享受<span>{{groupName}}</span>彩票带来的购彩体验</p>
					<p class="">200名客服人员，确保您任何的需求都能够在第一时间响应</p>
				</div>
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
	/*.help .help-content {
    background: #fff;
    border: 1px solid #ccc;
    font-size: 14px;
    margin-left: 175px;
    min-height: 100%;
}
.help .aboutus {
    padding: 20px 0;
}*/

</style>
