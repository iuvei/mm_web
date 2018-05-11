<template>
	<div class="chase" style="padding:10px  0;">
	<RadioGroup v-model="confirmBetType">
		<span>下注方式：</span>
        <Radio label="1">普通投注</Radio>
        <Radio v-if="classId!=='1'" label="2" :disabled="disabled1"><span :style="disabled1?{color:'rgba(0,0,0,.25)'}:''">常规追号</span></Radio>
        <Radio v-if="classId!=='1'" label="3" :disabled="disabled2"><span :style="disabled2?{color:'rgba(0,0,0,.25)'}:''">高级追号</span></Radio>
    </RadioGroup>
    <div class="explain">
    	购彩篮有投注时，才可以选择追号;仅有一条投注时，可以选择高级追号
    </div>
    <div class="setChase">
    	<div class="box_1" v-show="confirmBetType=='2'">
    	<Row>
    		<Col span="4">
    			<span>总期数</span>：<span>{{chasePeriods}}</span>
    		</Col>
    		<Col span="6">
    			<span>追号总金额</span>：<span>{{chaseList.length!=0?chaseList[chaseList.length-1].hasPay:''}}</span>
    		</Col>
    		<Col span="6">
    			<span>中奖后停止追号</span>：
    				<i-switch v-model="chaseStop">
         <Icon type="android-done" slot="open"></Icon>
        <Icon type="android-close" slot="close"></Icon>
                 </i-switch>

    		</Col>
    		<Col span="8">
    			<Button class="generateChase" @click="goChase()">生成追号方案</Button>
    		</Col>
    	</Row>
    	<Row style="margin-top: 4px;">
    		<Col span="6">
    			<span>追号期数</span>：<InputNumber :max="10000" :min="1" v-model="chasePeriods"></InputNumber>
    		</Col>
    		<Col span="6">
    			<span>起始倍数</span>：<InputNumber :max="10000" :min="1" v-model="chaseTimes"></InputNumber>
    		</Col>
    	</Row>
    	</div>
    	<div class="box_2" v-show="confirmBetType=='3'">
    	<Row>
    		<Col span="4">
    			<span>总期数</span>：<span>10期</span>
    		</Col>
    		<Col span="6">
    			<span>追号总金额</span>：<span>20.00元</span>
    		</Col>
    		<Col span="6">
    			<span>中奖后停止追号</span>：
    				<i-switch v-model="chaseStop">
         <Icon type="android-done" slot="open"></Icon>
        <Icon type="android-close" slot="close"></Icon>
                 </i-switch>

    		</Col>
    		<Col span="8">
    			<Button class="generateChase" @click="goChase()">生成追号方案</Button>
    		</Col>
    	</Row>
    	<Row style="margin-top: 4px;">
    		<Col span="6">
    			<span>追号期数</span>：<InputNumber :max="10000" :min="1" v-model="chasePeriods"></InputNumber>
    		</Col>
    		<Col span="6">
    			<span>起始倍数</span>：<InputNumber :max="10000" :min="1" v-model="chaseTimes"></InputNumber>
    		</Col>
    		<Col span="6">
    			<span>已投入(元)</span>：<InputNumber :max="10000" :min="1" v-model="chasePrePay"></InputNumber>
    		</Col>
    	</Row>
    	<Row>
    	<RadioGroup v-model="chaseWinType" vertical>
        <Radio label="1" style="margin: 10px 0;">
            <span>全程最低盈利率(%):</span><InputNumber :max="10000" :min="1" v-model="chaseMinPercent"></InputNumber>
        </Radio>
        <Radio label="2" style="margin: 10px 0;">
            <span>前:</span><InputNumber :max="10000" :min="1" style="width: 70px;" v-model="chaseBeforePeriod"></InputNumber><span style="margin-right: 12px;margin-left: 2px;">期</span>
            <span>盈利率(%):</span><InputNumber :max="10000" :min="1" v-model="chaseBeforePercent"></InputNumber >
            <span style="margin-left: 20px;">之后盈利率(%):</span><InputNumber :max="10000" :min="1"  style="width: 70px;" v-model='chaseAfterPercent'></InputNumber>
        </Radio>
        <Radio label="3" style="margin: 10px 0;">
            <span>全程最低盈利(元):</span><InputNumber :max="10000" :min="1" style="width: 70px;" v-model="chaseMinNumber"></InputNumber>
        </Radio>
    </RadioGroup>
    	</Row>
    	</div>
    </div>
    <div class="chaseTable">
    <div class="chaseTable_title">
    	<span>注：多条注单将以'--'展示盈利,最大倍数为99999倍</span>
    </div>
    <Table border  :columns="columns" :data="tablesList">
    </Table>
    </div>
    <div class="page" v-if="chaseList.length">
			<Page :total="chaseList.length" size="small" :page-size="10" show-elevator @on-change="changePage" :current="currentPage" show-total></Page>
		</div>
	</div>
</template>

<script>
	import bet_fn from '@/services/bet_fn.js';
	import { mapState, mapActions } from "vuex";
	export default {
        data () {
            return {
            	cachingArray:[],
            	currentPage:1,
            	isFirst: true,
            	chaseList:[],
            	chaseTimes:1,//起始倍数
            	chasePeriods:10,//追号总期数
            	chaseStop:true,//中奖后是否停止追号
            	chasePrePay:0,//已投入
            	chaseMinPercent:30,//全程最低盈利率
            	chaseBeforePeriod:5,//前?期
            	chaseBeforePercent:50,//前?期盈利率
            	chaseAfterPercent:20,//之后盈利率
             	chaseMinNumber:30,//全程最低盈利
            	disabled1:true,
            	disabled2:true,
            	tempArray:[],
            	tablesList:[],
                confirmBetType:"1",//投注方式(普通1，常规2，高级3)
                chaseWinType:"1",//高级追号方式
                columns:[
	 				{
                        title: '期号',
                        key: 'periodNo',
                        render: (h, params) => {
                        	params.row = this.tempArray[params.index]
                        	 if(params.index == 0&&this.currentPage == 1){
                        	 	return h('div', params.row.periodNo+"(当前期)")
                        	 }else{
                        	 	 return h('div',
                                 params.row.periodNo
                            );
                        	 }
                        }
                    },
                    {
                        title: '倍数',
                        key: 'times',
                        render: (h, params) => {
                        	 	return h('InputNumber', {
                        	 		props: {
                        	 			value:this.tempArray[params.index].times,
                        	 	    },
                        	 	  on:{
                                      'on-change':(value)=>{
                                      	params.row.times = value
                                      	this.tempArray[params.index].times = params.row.times;
                                      	this.onchangeChase(this.cachingArray).then(()=>{
                                      		this.tempArray = this.cachingArray.slice((this.currentPage-1)*10,this.currentPage*10)
                                      		params.row = this.tempArray[params.index]
                                      	});
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '当前投入(元)',
                        key: 'currentPay',
                        render: (h, params) => {
                        	params.row = this.tempArray[params.index]
                            return h('div',
                                 params.row.currentPay
                            );
                        }
                    },
                    {
                        title: '累积投入(元)',
                        key: 'hasPay',
                         render: (h, params) => {
                         	params.row = this.tempArray[params.index]
                             return h('div',
                                 params.row.hasPay
                            );
                        }
                    },
                    {
                        title: '盈利(元)',
                        key: 'profit',
                        render: (h, params) => {
                        	params.row = this.tempArray[params.index]
                            return h('div',
                                 params.row.profit
                            );
                        }
                    },
                    {
                        title: '盈利率',
                        key: 'profitRate',
                        render: (h, params) => {
                        	params.row = this.tempArray[params.index]
                            return h('div',
                                 params.row.profitRate
                            );
                        }
                    },
	 			]
            }
        },
        methods:{
        	...mapActions([
				"setChasingNoteList"
			]),
			changePage(page){
				this.currentPage = page;
				this.tempArray = this.cachingArray.slice((page-1)*10,page*10)
				this.tablesList = this.tempArray

			},
			async goChase(){
				this.currentPage = 1;
				this.$Message.destroy()
				this.isFirst = true;
				let gameType,confirmBetFields = {};
				let betList=[],chaseList = this.chaseList,isFirst = this.isFirst,periodNo = this.awarPeriod;
				if(this.confirmBetType == 2){
				confirmBetFields.chasePeriods = this.chasePeriods;
				confirmBetFields.chaseTimes = this.chaseTimes;
				confirmBetFields.chaseStop = this.chaseStop;
				confirmBetFields.confirmBetType = this.confirmBetType*1;
				}else if(this.confirmBetType == 3){
				confirmBetFields.chasePeriods = this.chasePeriods;
				confirmBetFields.chasePrePay = this.chasePrePay;
				confirmBetFields.chaseMinPercent = this.chaseMinPercent;
				confirmBetFields.chaseBeforePeriod = this.chaseBeforePeriod;
				confirmBetFields.chaseBeforePercent = this.chaseBeforePercent;
				confirmBetFields.chaseAfterPercent = this.chaseAfterPercent;
				confirmBetFields.chaseMinNumber = this.chaseMinNumber;
				confirmBetFields.chaseWinType = this.chaseWinType*1;
				confirmBetFields.chaseTimes = this.chaseTimes;
				confirmBetFields.chaseStop = this.chaseStop;
				confirmBetFields.confirmBetType = this.confirmBetType*1;
				}

				this.kindList.forEach((item1)=>{
					if(item1.classId == this.classId){
						item1.kindList.forEach((item2)=>{
							if(item2.kindId == this.kindId){
								gameType = item2
								return false;
							}
						})
						return false;
					}
				})
				this.lotteryData.forEach((item)=>{
					let obj ={}
					obj.Gameplay = item.subGames;
					obj.xuanhao = item.selecteNum;
					obj.oddMax = item.oddMax;
					obj.totalPrice = item.totalPrice;
					obj.noteNumber = item.ticketCount;
					obj.kindId=this.kindId;
					Object.assign(obj,this.subGameList[0])
					betList.push(obj)
				})
				this.chaseList = createChaseList({
					confirmBetFields,
					betList,
					chaseList,
					periodNo,
					gameType,
					isFirst
				})
				this.cachingArray = this.chaseList;
				this.tempArray = this.cachingArray.slice((this.currentPage-1)*10,this.currentPage*10)
				this.tablesList = this.tempArray
				if(this.chasePeriods>this.chaseList.length){
					this.$Message.error('您设定的条件只能生成'+this.chaseList.length+"期追号");
				}else{
					this.$Message.success('生成追号方案成功');
				}
				this.setChasingNoteList({cachingArray:this.cachingArray,confirmBetType:this.confirmBetType,chaseStop:this.chaseStop})
			},
			async onchangeChase(list){
				this.$Message.destroy()
				this.isFirst = false;
				let gameType,confirmBetFields = {};
				let betList=[],chaseList = list,isFirst = this.isFirst,periodNo = this.awarPeriod;
				if(this.confirmBetType == 2){
				confirmBetFields.chasePeriods = this.chasePeriods;
				confirmBetFields.chaseTimes = this.chaseTimes;
				confirmBetFields.chaseStop = this.chaseStop;
				confirmBetFields.confirmBetType = this.confirmBetType*1;
				}else if(this.confirmBetType == 3){
				confirmBetFields.chasePeriods = this.chasePeriods;
				confirmBetFields.chasePrePay = this.chasePrePay;
				confirmBetFields.chaseMinPercent = this.chaseMinPercent;
				confirmBetFields.chaseBeforePeriod = this.chaseBeforePeriod;
				confirmBetFields.chaseBeforePercent = this.chaseBeforePercent;
				confirmBetFields.chaseAfterPercent = this.chaseAfterPercent;
				confirmBetFields.chaseMinNumber = this.chaseMinNumber;
				confirmBetFields.chaseWinType = this.chaseWinType*1;
				confirmBetFields.chaseTimes = this.chaseTimes;
				confirmBetFields.chaseStop = this.chaseStop;
				confirmBetFields.confirmBetType = this.confirmBetType*1;
				}
				this.kindList.forEach((item1)=>{
					if(item1.classId == this.classId){
						item1.kindList.forEach((item2)=>{
							if(item2.kindId == this.kindId){
								gameType = item2
								return false;
							}
						})
						return false;
					}
				})
				this.lotteryData.forEach((item)=>{
					let obj ={}
					obj.Gameplay = item.subGames;
					obj.xuanhao = item.selecteNum;
					obj.oddMax = item.oddMax;
					obj.totalPrice = item.totalPrice;
					obj.noteNumber = item.ticketCount;
					obj.kindId=this.kindId;
					Object.assign(obj,this.subGameList[0])
					betList.push(obj)
				})
				let result = createChaseList({
					confirmBetFields,
					betList,
					chaseList,
					periodNo,
					gameType,
					isFirst
				})
				if(this.chasePeriods>result.length){
					this.$Message.error('您设定的条件只能生成'+result.length+"期追号");
				}else{
					this.$Message.success('生成追号方案成功');
				}

			   this.cachingArray = result;
			   this.setChasingNoteList({cachingArray:this.cachingArray,confirmBetType:this.confirmBetType,chaseStop:this.chaseStop})
				return result


			},
        },
        computed: {
			...mapState(["lotteryData","subGameList","kindList","kindId","classId","awarPeriod"])
		},
		watch:{
			lotteryData(newData){
				if(newData){
					if(newData.length==0){
					this.confirmBetType = "1";
					this.disabled1 =true;
					this.disabled2 =true;
					}else if(newData.length == 1){
						this.disabled1 =false;
					    this.disabled2 =false;
					}else{
						if(this.confirmBetType == "3"){
							this.confirmBetType = "2"
						}
						this.disabled1 =false;
					    this.disabled2 =true;
					}
				}else{
					this.disabled1 =true;
					this.disabled2 =true;
				}
				if(this.confirmBetType!="1"){
					this.goChase()
				}

			},
			confirmBetType(newVal){
				if(newVal == "1"){
					this.tempArray = [];
					this.tablesList = [];
					this.chaseList = [];
					this.setChasingNoteList({cachingArray:this.cachingArray,confirmBetType:this.confirmBetType,chaseStop:this.chaseStop})
				}else if(newVal == '2'){
					this.goChase().then(()=>{
						this.tempArray = this.cachingArray.slice(0,10);
						this.tablesList = this.tempArray;


					})
				}else if(newVal == '3'){
					this.goChase().then(()=>{
						this.tempArray = this.cachingArray.slice(0,10)
						this.tablesList = this.tempArray
					})
				}
			},
			kindId(){
				this.chaseList = []
				this.confirmBetType = "1"
			},
			awarPeriod(){
				if(this.confirmBetType!='1'){
					this.goChase().then(()=>{
						this.tempArray = this.cachingArray.slice(0,10)
						this.tablesList = this.tempArray
					})
				}

			}


		}
    }
</script>

<style>
	.chase .ivu-radio-group .ivu-radio-wrapper{
		margin-right: 14px;
	}
	.chase .ivu-radio-group {
		margin-bottom: 9px;

    padding: 0 10px;
	}
	.chase .explain {
		padding-left: 64px;
		color: rgba(0,0,0,.43);
        line-height: 1.5;
	}
	.chase .chaseTable .chaseTable_title{
    /*width: 746px;*/
	  border: 1px solid #e9e9e9;
	  border-bottom: none;
    padding: 16px 5px;
    position: relative;
    top: 1px;
    /*border-radius: 4px 4px 0 0;*/

    width: 100%;
	}
	.chase .chaseTable .chaseTable_title span{
		padding-left: 8px;
    padding-right: 8px;
	}
	.chase .generateChase{
		    background: linear-gradient(0, #272a32 0, #4b4e58 100%)!important;
		    color: #FFFFFF;
	}
	.chase .setChase{
		margin: 12px 1px;
	}
	.chase .setChase .ivu-row {
		display: flex;
		align-items: center;
	}
	.chase .page{
		float: right;
		margin: 10px;
	}
	.chase .ivu-table:after{
		width: 0px;
	}


  .chase .ivu-table-border th{
    background: #c1c1c1 !important;
    border: 0 !important;
  }
</style>
