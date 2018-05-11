<template>
	<div class="aside" v-if ="show">
		<Menu ref="menu" width="148px" style="background-color:#f3f3f3;"   @on-select="selectKindOrclassId" :open-names="openNames" :active-name="kindId+'-'+classId" accordion>
			<!--<a class="tiyu" name="0-0"><img class="hot" src="../../../static/img/hot.png" /><img src="../../../static/img/tiyu.png" style="width: 24px;height: 24px; position: absolute;left: 10px;top: 5px;" href="#" />热门体育<img class="new" src="../../../static/img/new.png" /></a>-->
			<Submenu  :name="items.classId" v-for="(items,index1) in kindList" :key="index1">
				<template slot="title" >
					<div style="position: absolute;width:100%" class="child_div" @click="openChange(items.classId)">
					<img :src="'../../../static/img/'+(items.classId)+'.png'" style="width: 24px;height: 24px; position: absolute;left: 10px;top: 5px;" /> {{items.className}}
					</div>
				</template>
				<MenuItem :name="item.kindId+'-'+items.classId" v-for="(item,index2) in items.kindList" :key="index2"><span>{{item.kindName}}</span><BetSiderTimeCount   style="float: right;margin-right:8px;" :kindKey="item.kindId" :classKey="items.classId" :currentOpen = "currentOpen" ></BetSiderTimeCount></MenuItem>
			</Submenu>
		</Menu>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import gameConfig from "../../../static/js/gameConfig.js"
	import BetSiderTimeCount from "./BetSiderTimeCount.vue"
	export default {
		data() {
			return {
				show: false,
				openNames:[],
				gameConfig:gameConfig,
				currentOpen:'3',
			}
		},
		created() {
			this.getTimes('/' + this.classId)
			this.getKind().then(() => {
				this.show = true;
				this.openNames = [this.classId]
			})
		},
		components: {
			BetSiderTimeCount
		},
		methods: {
			...mapActions([
				"onSelectKindOrclassId",
				"getKind",
				"getTimes",
				"setSelectMode",
			]),
			selectKindOrclassId(name) {
				this.setSelectMode("0");
				this.onSelectKindOrclassId(name)
			},
			openChange(name){
				this.currentOpen = name;
      }
		},
        computed: mapState(["kindList", "kindId", "classId", "times"]),
		watch: {
			kindId() {
//				console.log(this.kindId, this.classId)
			},
			currentOpen(newOpen){
				this.getTimes('/' + newOpen).then((res)=>{
//				  console.log(res.data)
        });
			}
		}
	}
</script>

<style>
	.aside .ivu-menu .ivu-menu-submenu .ivu-menu li {
		height: 34px;
		border-right: none;
		padding: 0;
		padding-left: 26px !important;
		line-height: 34px;
		/*background: #fff;*/
		/*border-bottom: 1px solid #b4b4b4;*/
		font-size: 12px;

    background: #414141;
    color: white;
	}
	.aside .hot{
		width: 24px;
		height: 24px;
		position: absolute;
		top: -5px;
		left: -10px;
	}
	.aside .new{
		width: 34px;
		height: 34px;
		position: absolute;
		top: 0px;
		right: 0px;
	}
	.aside .tiyu:hover{
		background:rgba(255,0,0,.8);
		color: #ffdb4a !important;
	}
	.aside .tiyu{
		display: block;
	  width: 100%;
    line-height: 34px;
    font-size: 12px;
    height: 34px;
    padding: 0px;
    padding-left: 45px !important;
    line-height: 34px;
    /*border-bottom: 1px solid #b4b4b4;*/
    font-size: 12px;
    color: #d81e06 !important;
    z-index: 1000;
    border-right:none !important;
    }

	.aside .ivu-menu .ivu-menu-submenu .ivu-menu-submenu-title{
		width: 100%;
		height: 34px;
		padding: 0px;
		line-height: 34px;
		/*border-bottom: 1px solid #b4b4b4;*/
		font-size: 12px;
		z-index: 1000;

    background: #373737;
    color: #cbccd1;
	}
	.aside .ivu-menu .ivu-menu-submenu .ivu-menu-submenu-title .child_div{
		padding-left: 45px;
		line-height: 34px;
		font-size: 12px;
		z-index: 1000;
	}

	.aside .ivu-icon-ios-arrow-down {
		top: 10.2px !important;
	}

	.aside .ivu-menu-submenu:hover {
		color: #2d8cf0;
	}

	.aside .ivu-menu-submenu .ivu-menu-item-active,
	.aside .ivu-menu-submenu .ivu-menu-item-selected {
		/*background: #ffdb4a !important;*/
		/*color: #d80c09 !important;*/

    background: #414141 !important;
    color: #5babfd !important;
	}

	.aside .ivu-menu-submenu .ivu-menu-item:hover {
		/*background: #ffdb4a !important;*/
		/*color: #d80c09 !important;*/

    background: #414141 !important;
    color: #5babfd !important;
	}

	.aside .ivu-menu-submenu .ivu-menu-item:before {
		content: '';
		position: absolute;
		left: 10px;
		top: 15px;
		width: 4px;
		height: 4px;
		border-radius: 2px;
		background: currentColor;
	}
</style>
