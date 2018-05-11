<template>
	<div id="mybet">
		<div class="mybet_head">
			<RadioGroup v-model="checkVal" type="button">
				<Radio label="1">注单查询</Radio>
				<Radio label="2">追号查询</Radio>
				<Radio label="3">撤单查询</Radio>
			</RadioGroup>
			<Select style="width:150px;margin-left: 10px;" v-model="selectVal">
				<Option v-for="item in selectList" :value="item.kindId" :key="item.kindId">{{ item.kindName }}</Option>
			</Select>
		</div>
		<div class="mybet_table">
			<div class="mybet_table_but">
				<Button type="ghost" style="width: 60px;" v-show="checkVal!='3'" :loading="modal_loading" @click="onCancelOrder">撤单</Button>
				<Button type="ghost" style="float: right" @click="refresh"><Icon type="refresh" ></Icon> 刷新</Button>
			</div>
			<div class="mybet_table_text">
				<div>
					<Table @on-selection-change="onSelectionChange" border ref="selection" :columns="checkVal!=3?columns4:columns1" :data="lotteryOrderOwnList.lotteryOrder"></Table>
					<ul :class="checkVal!='3'?'mybet_statistice':'mybet_statistice_c'" v-if="tableList.length!=0">
						<li v-if="lotteryOrderOwnList.sumMax"><span>{{lotteryOrderOwnList.sumMax.name}}</span><b>{{lotteryOrderOwnList.sumMax.sum}}</b></li>
						<li v-if="lotteryOrderOwnList.sumMin"><span>{{lotteryOrderOwnList.sumMin.name}}</span><b>{{lotteryOrderOwnList.sumMin.sum}}</b></li>
					</ul>
				</div>
				<div style="float: right;padding: 10px 0" v-if="tableList.length!=0">
					<Page :total="lotteryOrderOwnList.countAll" show-total @on-change="changePage"></Page>
				</div>
			</div>
			<Modal v-model="modal4" width="700" class="noteDetail">
				<p slot="header">
					<span>注单明细</span>
				</p>
				<div>
					<Row style="margin-bottom: 24px;">
						<Col span="3">注单号：</Col>
						<Col span="21">{{noteDetail.orderNo}}</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">下注时间：</Col>
							<Col span="18">{{noteDetail.payTime}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">注数：</Col>
							<Col span="18">{{noteDetail.payTimes}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">单注金额：</Col>
							<Col span="18">{{noteDetail.singleAmount}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">投注总额：</Col>
							<Col span="18">{{noteDetail.allAmount}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">单注金额：</Col>
							<Col span="18">{{noteDetail.singleAmount}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">投注总额：</Col>
							<Col span="18">{{noteDetail.allAmount}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">彩种：</Col>
							<Col span="18">{{noteDetail.lotteryName}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">期号：</Col>
							<Col span="18">{{noteDetail.periodNo}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">奖金：</Col>
							<Col span="18">{{noteDetail.odds}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">返点：</Col>
							<Col span="18">{{noteDetail.rebatePercent}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">玩法：</Col>
							<Col span="18">{{noteDetail.gameName}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">销售返点：</Col>
							<Col span="18">{{noteDetail.rebateAmount}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">开奖号码：</Col>
							<Col span="18">{{noteDetail.winNumbers}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">中奖金额：</Col>
							<Col span="18">{{noteDetail.winAmount}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">状态：</Col>
							<Col span="18">{{noteDetail.statusView}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">实际输赢：</Col>
							<Col span="18">{{noteDetail.winAmount-noteDetail.allAmount}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="12">
						<Row>
							<Col span="6">中奖号码：</Col>
							<Col span="18">{{noteDetail.remark}}</Col>
						</Row>
						</Col>
						<Col span="12">
						<Row>
							<Col span="6">中奖注数：</Col>
							<Col span="18">{{noteDetail.winTimes}}</Col>
						</Row>
						</Col>
					</Row>
					<Row style="margin-bottom: 24px;">
						<Col span="3">下注号码：</Col>
						<Col span="21">{{noteDetail.lotteryNumbers}}</Col>
					</Row>
				</div>
				<div slot="footer">
				</div>
			</Modal>
		</div>
	</div>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	export default {
		created() {
			if(this.kindList.length == 0) {
				this.getKind().then(() => {
					this.selectList = this.concatKind();
				})
			} else {
				this.selectList = this.concatKind()
			}
			this.search()
		},
		data() {
			return {
				modal_loading:false,
				selectVal: "whole",
				checkVal: "1",
				tableList: [],
				noteDetail: {},
				columns4: [{
						type: 'selection',
						width: 60,
						align: 'center'
					},
					{
						title: ' 下注时间',
						key: 'payTime',
            width:150,
						render: (h, params) => {
                            return h('div', params.row.payTime.slice(0,19))
                        }
					},
					{
						title: '期数',
						key: 'periodNo',
            width:150,
					},
					{
						title: '彩种',
						key: 'baseLotteryName',
            width:150,
					},
					{
						title: '玩法',
						key: 'gameName',
            width:180,
					},
					{
						title: '单注金额',
						key: 'singleAmount',
            width:120,
					},
					{
						title: '投注总额',
						key: 'allAmount',
            width:120,
					},
					{
						title: '注单明细',
						key: 'action',
						render: (h, params) => {

							return h('div', [
								h('Button', {
									props: {
										type: 'ghost',
									},
//									style: {
//										marginRight: '5px'
//									},
									on: {
										click: () => {
											let data = {};
											data.dayTime = '';
											data.orderNo = params.row.orderNo;
											this.queryNotedetail(data)
                    }
									}
								}, '查看')
							])
						}
					}
				],
				columns1: [{
						title: ' 下注时间',
						key: 'payTime',
						render: (h, params) => {
                            return h('div', params.row.payTime.slice(0,19))
                        }
					},
					{
						title: '期数',
						key: 'periodNo '
					},
					{
						title: '彩种',
						key: 'baseLotteryName'
					},
					{
						title: '玩法',
						key: 'gameName'
					},
					{
						title: '单注金额',
						key: 'singleAmount'
					},
					{
						title: '投注总额',
						key: 'allAmount'
					},
					{
						title: '注单明细',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'ghost',
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											let data = {};
											data.dayTime = '';
											data.orderNo = params.row.orderNo;
											this.queryNotedetail(data)

										}
									}
								}, '查看')
							])
						}
					}
				],
				modal4: false,
				selectList: [],
				currentPage: 1,
				cancelOrderList:[],
			}
		},
		computed: {
			...mapState(["lotteryOrderOwnList", "kindList"]),
		},
		methods: {
			onSelectionChange(list){
				this.cancelOrderList = list
			},
			...mapActions([
				"queryLotteryOrderOwn",
				"getKind",
				"queryMemberReportOne",
				"cancelOrder",
				"getUserDetail",
			]),
			onCancelOrder(){
				if(this.cancelOrderList.length==0){
					this.$Notice.warning({
                    title: 'M5II通知',
                    desc: '至少选择一条投注记录'
                });
                return false
				}
				this.modal_loading = true;
				let arr = []
				this.cancelOrderList.forEach((item)=>{
					arr.push(item.orderNo)
				})
				this.cancelOrder(arr).then((res)=>{

					if(res.code==0&&res.msg=="OK"){
						this.getUserDetail()
						this.search().then(()=>{
							this.modal_loading = false;
						})
					}else{
						this.modal_loading = false;
						this.$Message.error(res.msg);
					}
				})
			},
			refresh() {
				this.search()
			},
			changePage(page) {
				this.currentPage = page;
				this.search()
			},
			async search() {
				let data = {};
				this.selectVal == 'whole' ? data.baseLotteryId = '' : data.baseLotteryId = this.selectVal;
				data.page = this.currentPage;
				data.status = this.checkVal;
				this.queryLotteryOrderOwn(data).then(() => {
					this.tableList = this.lotteryOrderOwnList.lotteryOrder;
				})
			},
			concatKind() {
				let arr = [];
				arr.push({
					kindName: '全部',
					kindId: "whole"
				});
				this.kindList.forEach((item1) => {
					item1.kindList.forEach((item2) => {
						let obj = {};
						obj.kindId = item2.kindId;
						obj.kindName = item2.kindName;
						arr.push(obj)
					})
				});
				return arr
			},
			queryNotedetail(data) {
				this.queryMemberReportOne(data).then((res) => {
					this.noteDetail = res.data;
					this.modal4 = true;
				})
			},
		},
		watch: {
			checkVal() {
				this.currentPage = 1;
				this.search()
			},
			selectVal() {
				this.currentPage = 1;
				this.search()
			}
		}
	}
</script>
<style scoped>
	#mybet {
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		background-color: #ffffff;
		padding: 10px;
		box-sizing: border-box;
		overflow: auto;
	}
	.noteDetail .ivu-row .ivu-col-span-3 {
		text-align: right;
	}
	.noteDetail .ivu-row .ivu-col-span-21 {
		text-align: left;
	}
	.noteDetail .ivu-row .ivu-col-span-6 {
		text-align: right;
	}
	.noteDetail .ivu-row .ivu-col-span-18 {
		text-align: left;
	}
	.mybet_head {
		display: flex !important;
		margin-bottom: 12px;
	}
	.mybet_table_but {
		height: 66px;
		border: 1px solid #e9e9e9;
		padding: 16px 8px;
		position: relative;
		top: 1px;
		border-radius: 4px 4px 0 0;
		box-sizing: border-box;
	}
	.mybet_head_active {
		border-color: #108ee9;
		color: #108ee9;
		background-color: #FFFFFF;
	}
	.mybet_table_text {
		overflow: hidden;
	}
	.no_data {
		width: 100%;
		height: 50px;
		text-align: center;
		padding: 15px;
		line-height: 20px;
		box-sizing: border-box;
		border: 1px solid #e9e9e9;
	}
	.mx_moda>li {
		padding: 10px 0;
	}
	.mybet_statistice>li,.mybet_statistice_c>li {
		height: 50px;
		padding: 0 15px;
		line-height: 50px;
		box-sizing: border-box;
		border-left: 1px solid #e9e9e9;
		border-right: 1px solid #e9e9e9;
		border-bottom: 1px solid #e9e9e9;
		border-top: 0;
	}
	.mybet_statistice>li:hover,.mybet_statistice_c>li:hover {
		background-color: #ebf7ff;
	}
	.mybet_statistice>li>span,.mybet_statistice_c>li>span {
		display: inline-block;
		width:795px;
		border-right: 1px solid #e9e9e9;
		text-align: right;
		padding: 0 15px;
		box-sizing: border-box;
	}
	.mybet_statistice>li>b,.mybet_statistice_c>li>b {
		display: inline-block;
		padding: 0 15px;
	}
	.mybet_statistice_c>li>span {
		width: 842px !important;
	}
</style>
