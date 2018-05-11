<template>

	<div class="bet_menu" v-if="show">
		<Menu mode="horizontal" theme="primary" :active-name="0" class="level_1" ref="level_1" @on-select="changeIndex1">
        <MenuItem :name="index" :key="index" v-for="(item1,index) in standGameList" >
        	{{item1.gameName}}
        </MenuItem>
        </Menu>
        <!--二级导航-->
        <Menu mode="horizontal"  class="level_2" @on-select="changeIndex2" ref="level_2"  :active-name="activeName">
        <MenuItem :name="item.leftName+'-'+item.rightName+'-'+item.subGameId+'-'+index" :key="index" v-for="(item,index) in standGameList[lv1_idx].rightList"  v-if="standGameList[lv1_idx].showRight" class="item">
        	{{item.gameId=='4001'||item.gameId=='2003'?item.leftName:item.rightName}}
        </MenuItem>
		<MenuItem :name="val[0].leftName+'-'+val[0].rightName+'-'+val[0].subGameId+'-'+index" :key="index" v-for="(val, key,index) of standGameList[lv1_idx].gameSons"  v-if="val.length == 1&&!standGameList[lv1_idx].showRight" class="item" >
        	{{key}}
        </MenuItem>
        <Submenu :name="index" v-for="(val, key,index) of standGameList[lv1_idx].gameSons" :key="index" v-if="val.length > 1&&!standGameList[lv1_idx].showRight" class="item">
            <template slot="title">
               {{index==lv2_idx.split('-')[3]?key+'('+lv2_idx.split('-')[1]+')':key}}
            </template>
            <MenuGroup >
                <MenuItem :name="item.leftName+'-'+item.rightName+'-'+item.subGameId+'-'+index" v-for="(item,index2) in val" :key="index2">{{item.rightName}}</MenuItem>
            </MenuGroup>
        </Submenu>
				</Menu>
				<div class="ant-row row-with-margin" style="height:auto;line-height:2.5;box-sizing: border-box;padding-left: 20px;">
					<div class="ant-alert-info ant-alert ant-alert-no-icon">
						<div class="ant-row-flex ant-row-flex-space-between row-with-gutter-16" style="font-size: 14px;display: flex;align-items: center;">
							<div class="ant-col-20 col-with-gutter-16">{{subGameList.length==0?'':subGameList[0].gameRemark}}</div>
							<div class="ant-col-4 col-with-gutter-16">
								<div class="ant-row-flex ant-row-flex-end" >
									<Tooltip class="menu_tooltip" v-if="subGameList.length!== 0" :transfer="true" :content="subGameList[0].gameTip" placement="top">
                                    <span style="margin-right: 10px;display: flex;align-items: center;"><Icon style="font-size: 18px;margin-right: 4px;" type="ios-information-outline"></Icon><span>说明</span></span>
									</Tooltip>
									<Tooltip class="menu_tooltip" v-if="subGameList.length!== 0" :transfer="true" :content="subGameList[0].gameCase" placement="top">
									<span style="display: flex;align-items: center;"><Icon type="ios-help-outline" style="font-size: 18px;margin-right: 4px;"></Icon><span>示例</span></span>
									</Tooltip>


								</div>
							</div>
						</div>
					</div>
				</div>
		<BetPlatte ></BetPlatte>
	</div>
</template>
<script>
	import bet_fn from '@/services/bet_fn.js';
	import BetPlatte from "./betPlatte.vue";
	import { mapState, mapActions } from "vuex";
	export default {
		data() {
			return {
				name: "0",
				changeIndex: 0,
				show: false,
				standGameList:[],
				lv1_idx:0,
				lv2_idx:'',
				activeName:'',
				specialChoice:['301001','301101','301201'],


			}
		},
		created() {
			this.getGamePlayList(`/${this.classId}/${this.kindId}`)
		},
		methods: {
			getGamePlayList(params) {
				this.gamePlay(params).then(() => {
					this.selectMode == "0"
					?
					this.standGameList = bet_fn.dataStructure(this.gamePlayList.standGameList)
					:
					this.standGameList = bet_fn.dataStructure(this.gamePlayList.optionGameList);
					let obj = this.standGameList[this.lv1_idx].gameSons
					this.activeName = obj[Object.keys(obj)[0]][0].leftName+'-'+obj[Object.keys(obj)[0]][0].rightName+'-'+obj[Object.keys(obj)[0]][0].subGameId+"-0";
					this.lv2_idx = this.activeName;
					bet_fn.renderingData(this.activeName,this.gamePlayList.standGameList[this.lv1_idx]).then((res)=>{
						this.getDataOrSubGameList(res)
					});
					this.lv1_idx = 0;
					this.show = true;
					this.$nextTick(() => {
                    this.$refs.level_2.updateActiveName()
                    })
				})
			},
			...mapActions("bet", [
				"gamePlay",
				"getDataList",
				"setShowCheckBox",
			]),
			...mapActions([
				"getDataList",
				"getDataOrSubGameList",
			]),
			changeIndex1(index){
				this.lv1_idx = index;
				let obj = this.standGameList[this.lv1_idx].gameSons;
				let result = obj[Object.keys(obj)[0]][0];
				this.specialChoice.indexOf(result.subGameId) == -1?this.setShowCheckBox(true):this.setShowCheckBox(false);
				this.lv2_idx = result.leftName+'-'+result.rightName+'-'+result.subGameId+"-0";
				this.activeName = result.leftName+'-'+result.rightName+'-'+result.subGameId+"-0";
				bet_fn.renderingData(this.lv2_idx,this.gamePlayList.standGameList[this.lv1_idx]).then((res)=>{
						this.getDataOrSubGameList(res)
				});
				this.$refs.level_2.currentActiveName = this.activeName;
				this.$nextTick(() => {
                this.$refs.level_2.updateActiveName()
                })
			},
			changeIndex2(index){
				this.lv2_idx = index
				let obj = this.standGameList[this.lv1_idx].gameSons;
				let result = obj[Object.keys(obj)[0]][0];
				this.activeName = result.leftName+'-'+result.rightName+'-'+result.subGameId+"-0";
				let newId = index.split("-")[2];
				this.specialChoice.indexOf(newId) == -1?this.setShowCheckBox(true):this.setShowCheckBox(false);
				bet_fn.renderingData(this.lv2_idx,this.gamePlayList.standGameList[this.lv1_idx]).then((res)=>{
					this.getDataOrSubGameList(res)
					});
				this.$nextTick(() => {
                this.$refs.level_2.updateActiveName()
                })
			},
			onChangeGameName(name) {
//								this.$refs.menu[name].currentActiveName = this.$refs.menu[name].activeName
//								this.changeIndex = 0
//								this.ChangeGameName(name)
			},
			onSelectSubGame(name) {
				//				this.SelectSubGame(name)
				//				let arr = name.split('-')
				//				this.changeIndex = arr[3]*1

			}
		},
		computed: {
			...mapState("bet", ["gamePlayList"]),
			...mapState(["classId", "kindId","subGameList","selectMode","subGameId"])
		},
		components: {
			BetPlatte
		},
		watch: {
			kindId(newKindId) {
				this.getGamePlayList(`/${this.classId}/${this.kindId}`)
				this.lv1_idx = 0;
				this.$refs.level_1.currentActiveName = this.lv1_idx;
				this.$nextTick(() => {
                this.$refs.level_1.updateActiveName()
                })
			},
			selectMode(){
				this.getGamePlayList(`/${this.classId}/${this.kindId}`)
				this.lv1_idx = 0;
				this.$refs.level_1.currentActiveName = this.lv1_idx;
				this.$nextTick(() => {
                this.$refs.level_1.updateActiveName()
                })
			},

		}
	}
</script>

<style>
	@charset "UTF-8";
	@font-face {
		font-family: clock-number;
		src: url(../../../fonts/LED.eot?) format("eot");
		src: url(../../../fonts/LED.woff) format("woff"), url(../../../fonts/LED.ttf) format("truetype")
	}

	.bet_menu .ivu-menu-submenu-title .ivu-icon {
		display: none;
	}
	.bet_menu .ant-row {
		/*border: 1px solid #d2eafb;*/
		/*background-color: #ecf6fd;*/


    border: 1px solid #ececec;
    background-color: #eeeeee;
	}
	/*新央视*/
	.bet_menu .level_1{
		/*background: #f3f3f3;*/
		height: 35.6px;

    background: #c1c1c1;
	}
	.bet_menu .level_1 .ivu-menu-item-active.ivu-menu-item-selected{
		background: #ffffff;
	}
	.bet_menu .level_1 .ivu-menu-item{
		height: 35.6px;
		line-height:35.6px ;
		color: #212121 !important;
		font-size: 12px;
	}
	.bet_menu .level_1 .ivu-menu-item:hover{
		background: #ffffff !important;
	}
	.bet_menu .level_2{
		background: #FFFFFF;
		height: 35.6px;
	}
	.bet_menu .level_2 .ivu-menu-item.item,.bet_menu .level_2 .ivu-menu-submenu{
		height: 35.6px !important;
		line-height:35.6px !important;
		color:rgba(0,0,0,.65) !important;
		font-size: 12px;
	}
	.bet_menu .ivu-menu-item-active.ivu-menu-submenu{
		color:#2d8cf0 !important;
		}
	.bet_menu .ivu-menu-submenu,.bet_menu .ivu-menu-item.item{
		padding-left: 15px;
		padding-right: 15px;
		}
	.bet_menu .level_1 .ivu-menu-item-active.ivu-menu-item{
		color:#2d8cf0 !important;
		}
	.bet_menu .ivu-menu-item-active.ivu-menu-item.item{
		color:#2d8cf0 !important;
		}
	.bet_menu .ivu-select-dropdown ul {
		padding-top: 0;
		text-align: center;
	}
	.bet_menu .ivu-menu-submenu .ivu-menu-item-group-title{
		display:none;
	}
	.bet_menu .ant-col-20 {
		display: block;
		width: 78%;
	}
	.ivu-tooltip-inner {
	max-width: 250px;
    padding: 8px 10px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    background-color: rgba(64,64,64,.85);
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    min-height: 34px;
    white-space: initial !important;
}


/*.bet_menu .ivu-menu-submenu .ivu-menu-submenu-title {
	    height: 35.6px !important;
		line-height:35.6px !important;
		color:rgba(0,0,0,.65) !important;
		font-size: 12px;
}*/
</style>
