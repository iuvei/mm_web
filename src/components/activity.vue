<template>
	<div class="activity">
		<div style="width: 1200px;">
		<Card style="margin-top: 10px;" :bordered="false" v-for="(item,index) in activityDocumentList.data" :key="index">
			<div >
				<div class="activity-bg" style="border: 1px solid lightgrey; border-radius: 3px; padding: 5px; margin-top: 5px;display: flex;flex-direction: column;justify-content: ;">
					<img :src="item.documentImageNewname" style="width: 100%; height: 160px;" @click="openText(index)">
					<div v-html="item.documentConetnt" v-show="openIndex == index&&show">
					</div>
					<Button v-show="openIndex == index&&show" @click="showModal" style="background: #27ae60;
    color: #fff;
    border: 1px solid #e9e9e9;
    height: 38px;
    width: 87px;
    outline: 0;
    margin: 0 auto;">参加活动</Button>
				</div>

			</div>
		</Card>
		</div>
	</div>
</template>

<script>
	import  {bus}  from '../bus.js'
	import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
				show: false,
				openIndex:0,
			}
		},
		created() {
			this.queryDocumentContentList().then(() => {
			})
		},
		methods: {
			...mapActions([
				"queryDocumentContentList"
			]),
			showModal(){
				bus.$emit('show' )
			},
			openText(index){
				this.show = !this.show;
				this.openIndex = index
			}

		},
		computed: mapState(["activityDocumentList"]),
	}
</script>

<style>
	/*.activity .activity-bg::before {
		content: '';
		position: absolute;
		margin-top: -.6rem;
		left: 4rem;
		height: 24px;
		width: 24px;
		background: url(../../static/img/news.png) no-repeat left center;
	}*/
	.activity-bg::before {
    content: '';
    position: absolute;
    margin-top: -.6rem;
    left: 4rem;
    height: 24px;
    width: 24px;
    background: url(../../static/img/news.png) no-repeat left center;
}
	
	.activity {
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		overflow-x:hidden ;
		font-size: 12px;
		padding: 8px 0;
	}
</style>