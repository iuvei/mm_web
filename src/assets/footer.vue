<template>
	<div class="footer">
		<div>
			<p class="row-with-margin"></p>
			<p class="center-align"><span>{{groupName}}</span>彩票娱乐线上系统2.0 ©版权所有</p>
			<p class="center-align row-with-margin">友情提示：理性购彩，热心公益，未满18周岁禁止购彩及兑奖</p>
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
<style scoped="scoped">
	.footer{
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		font-size: 12px;
		color: #fff;
		/*background: linear-gradient(0,#272a32 0,#4b4e58 100%)!important;*/
	}
	.footer div{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
</style>
