<template>
	<div class="betCollapse">
		<Collapse  v-model="defaultOpen"   style="border: 0 !important;">
        <Panel name="1">
            开奖历史
            <div slot="content" >
            <div style="display: flex;justify-content: space-around;" v-for="(item,index) in winList" v-if="index>0">
            	<div style="color:rgb(16, 142, 233) ;">{{item.awarPeriod}}</div>
            	<div v-for="(item2,index2) in gameConfig[kindId].labels.length">{{item.awardNum==null?'?':item.awardNum.split(',')[index2]}}</div>
            </div>
            </div>
        </Panel>
        <Panel name="2" v-show="classId!='2'">
            长龙
            <div slot="content">
            	<div style="display: flex;justify-content: space-around;" v-for="(item,index) in dragons">
        <div>{{item.figure}}</div>
        <div>{{item.bigType}}</div>
        <div>{{item.bigNum}}</div>
         <div>{{item.figure}}</div>
        <div>{{item.singleType}}</div>
        <div>{{item.singleNum}}</div>
            	</div>
            </div>
        </Panel>
        <Panel name="3" class="kjtz" style="background: #373737 !important;">
            最近快捷投注
            <div slot="content" >
            	<Table  :columns="columns" :data="tableList1" style="width: 100%"></Table>
            	<div style="display:flex ;justify-content: center;padding-top: 9px;" class="btn_box"> <Button @click="modal2=true">详细信息</Button></div>
            </div>
        </Panel>
    </Collapse>
    <Modal v-model="modal2" width="900">
        <p slot="header" >
          最近快捷投注
        </p>
        <div style="text-align:center">
        	<Table  :columns="columns2" :data="tableList2" style="width: 100%"></Table>
        </div>
        <div slot="footer">
            <Page v-if="totalTableList.length>0" :total="totalTableList.length" @on-change="changePage" show-elevator show-total :page-size="10"></Page>
        </div>
    </Modal>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import bet_fn from '@/services/bet_fn.js';
	import gameConfig from "../../../static/js/gameConfig.js"
	 export default {
        data () {
            return {
            	totalTableList:[],
            	currentPage:1,
            	modal2:false,
            	defaultOpen:["1","2","3"],
            	tableList1:[],
            	tableList2:[],
            	gameConfig:gameConfig,
                columns: [
                    {
                        title: '玩法名称',
                        key: 'subGames',
                        width:106,
                    },
                    {
                        title: '注数',
                        key: 'ticketCount'
                    },
                    {
                        title: '金额',
                        key: 'totalPrice'
                    }
                ],
                columns2: [
                    {
                        title: '下注时间',
                        key: '_date',
                        width:160,
                    },
                    {
                        title: '彩种',
                        key: 'lotteryType',
                        width:100,
                    },
                    {
                        title: '玩法',
                        key: 'subGames',
                        width:140,
                    },
                    {
                        title: '下注号码',
                        key: 'selecteNum',
                        width:200,
                    },
                     {
                        title: '注数',
                        key: 'ticketCount',
                        width:80,
                    },
                    {
                        title: '金额',
                        key: 'totalPrice',
                        width:100,
                    },
                    {
                        title: '操作',
                        key: 'operation',
                        render: (h, params) => {

							return h('div', [
								h('Button', {
									props: {
									},
									on: {
										click: () => {
											params.row.periodNo = this.awarPeriod;
											let data = bet_fn.quickBets({lotteryData:[params.row],kindId:this.kindId,orderFrom:"1",orderType:"0",periodNo:this.awarPeriod});
											this.bet(data)
										}
									}
								}, '下注')
							]);
						}
                    }
                ],

            }
        },
        methods:{
        	changePage(page){
        		this.currentPage = page
        		this.tableList2 = this.recentQuickBetList[this.kindId].slice((this.currentPage-1)*10,this.currentPage*10)
        	},
        	...mapActions([
				"quickBet",
				"getUserDetail"
			]),
        	bet(data){
        		this.quickBet(data).then((res)=>{
					if(res.code == "0"){
				this.$Message.success('下注成功');
				this.getUserDetail()
					}else{
						 this.$Message.error('下注失败, '+res.msg);
					}
				})
        	}
        },
        watch:{
        	recentQuickBetList(newList){
        		this.totalTableList = newList[this.kindId];
        		this.tableList1 = newList[this.kindId].slice(0,5);
        		this.tableList2 = newList[this.kindId].slice((this.currentPage-1)*10,this.currentPage*10)
        	},
        	kindId(){
        		if(this.recentQuickBetList[this.kindId]){
        			this.tableList1 = this.recentQuickBetList[this.kindId].slice(0,5);
        		this.tableList2 = this.recentQuickBetList[this.kindId];
        		}else{
        			this.tableList1 = [];
        		this.tableList2 = [];
        		}

        	}
        },
        computed: {
        ...mapState(["winList","kindId","dragons","recentQuickBetList","awarPeriod","classId"]),
        },

    }
</script>

<style>
  .betCollapse{
    background: #4c4a4d;
  }
	.betCollapse .kjtz .ivu-collapse-content{
		padding: 0;

    background: #373737;
	}
	.betCollapse .ivu-collapse-content>.ivu-collapse-content-box{
		padding-top: 8px;
		padding-bottom: 8px;
	}
	.kjtz .ivu-collapse-content>.ivu-collapse-content-box{
		padding-top: 0px;
		padding-bottom: 8px;
	}
	.kjtz .ivu-table th {
	height: 38px;
    /*background-color: #ffffff;*/

    background: #414141;
    color: #ececec;

}
.kjtz .ivu-table td {
     height: 30px;

  background: #414141;
  color: #ececec;
}
.kjtz .ivu-table td .ivu-table-cell,.kjtz .ivu-table th .ivu-table-cell{
     padding-left: 4px;
     padding-right: 4px;
}
.kjtz .ivu-collapse-content{
	background: none;
}
.kjtz .btn_box .ivu-btn{
	    /*color: #2d8cf0;*/
	    /*border: 1px solid #2d8cf0;*/


  background: #dddddd;
}
.betCollapse .kjtz .ivu-table:before {
		content: '';
		width: 100%;
		height: 0px;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 1;
	}

	.betCollapse .kjtz .ivu-table:after {
		content: '';
		width: 0px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #fff;
		z-index: 3;
	}



  .betCollapse .ivu-collapse-header{
    color: #ffffff !important;
    background: #373737;
  }
  .betCollapse .ivu-collapse-content{
    background: #414141;
    color: #9e9e9e;
  }
  .ivu-collapse>.ivu-collapse-item{
    border: 0 !important;
  }
  .betCollapse .ivu-table-wrapper{
    border: 0 !important;
  }
  .betCollapse .ivu-table td{
    border: 0 !important;
  }
  .betCollapse .ivu-table th{
    border: 0 !important;
  }
  .betCollapse .ivu-table table {
    table-layout: fixed;
    width: 260px !important;
  }
</style>
