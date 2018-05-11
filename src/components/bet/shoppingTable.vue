<template>
	<div class="table">
		<Table border :columns="columns" :data="showTableList">

		</Table>
		<div class="table_footer">
			<Row>
				<Col span="8">
				<div class="clear_btn">
					<Button @click="clearShoppingList">清空</Button>
				</div>
				</Col>
				<Col span="8">
				<div class="footer_center">
					<div>
						<div class="betNote_tag" style="margin:0 8px;">
							共选择了
							<Tag checkable color="#d2eafb" >{{ticketCount}}</Tag>注
						</div>
						<div class="betNote_tag" style="margin:0 8px;">
							共
							<Tag checkable color="#d2eafb" >{{totalPrice}}</Tag>元
						</div>
					</div>
				</div>
				</Col>
				<Col span="8">
				<div class="bet_btn">
					<Poptip
		placement="top-end"
        confirm
        :title="title"
        @on-ok="ok"
        @on-cancel="cancel"
        ok-text="确认"
        cancel-text="我再看看"
        >
        <Button :loading="modal_loading" >确认下注</Button>
    </Poptip>

				</div>

				</Col>
			</Row>
		</div>
		<div class="page" v-if="showTableList.length!=0&&lotteryData">
			<Page :total="lotteryData.length" size="small" :page-size="5" show-elevator @on-change="changePage" show-total></Page>
		</div>
	</div>
</template>

<script>
	import bet_fn from '@/services/bet_fn.js';
	import { mapState, mapActions } from "vuex";
	export default {
		created() {
		},
		data() {
			return {
                lotteryType:{"1":"福体彩","2":"六合彩","3":"时时彩","4":"快三","5":"11选5","6":"PK10"},
				title:"",
				modal_loading:false,
				showTableList:[],
				current:1,
				ticketCount:0,
				totalPrice:0,
				columns: [{
						title: '玩法',
						key: 'subGames',
						 width:140,
					},
					{
						title: '选号',
						key: 'selecteNum',
						width: 250
					},
					{
						title: '注数(注)',
						key: 'ticketCount'
					},
					{
						title: '奖金(元)',
						key: 'oddMax'
					},
					{
						title: '金额(元)',
						key: 'totalPrice'
					},
					{
						title: '操作',
						key: 'operer',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.removeShoppingList({
												index: params.index,
												kindId: this.kindId
											})
										}
									}
								}, '删除')
							]);
						}
					},
				]
			}
		},
		computed: {

			...mapState(["kindId","lotteryData","awarPeriod","lotteryDatas","confirmBetType","chaseStop","cachingArray","subGameList","classId"]),

		},
		methods: {
			ok(){
				if(this.showTableList.length != 0){
					this.modal_loading = true;
					this.bet()
				}else{
					this.$Notice.warning({
					title: 'M5Ⅱ通知',
					desc: '购菜篮为空，请先添加到购菜篮'
				});
				}
			},
			cancel(){

			},
			...mapActions([
				"removeShoppingList",
				"clearShoppingList",
				"quickBet",
				"addShoppingBasket",
				"getUserDetail"
			]),
			bet(){

				let orderType = "0";
				let lotteryData;
				let params;
				let noState = true;
				if(this.confirmBetType == "1"){
				    lotteryData = this.lotteryData;
					params = bet_fn.quickBets({lotteryData:lotteryData,kindId:this.kindId,orderFrom:"1",orderType:orderType,periodNo:this.awarPeriod,noState:noState});
				}else{
					let noState = false;
					if(this.chaseStop){
						orderType  = "2"
					}else{
						orderType  = "1"
					}
					lotteryData = bet_fn.chaseBets(this.lotteryData,this.cachingArray);
					params = bet_fn.quickBets({lotteryData:lotteryData,kindId:this.kindId,orderFrom:"1",orderType:orderType,periodNo:this.awarPeriod,noState:noState});
				}

				this.quickBet(params).then((res)=>{
					this.modal_loading = false;
					if(res.code == "0"){
						this.getUserDetail()
						this.$Message.success('下注成功');
						this.lotteryDatas[this.kindId] = [];
						this.addShoppingBasket(this.lotteryDatas)
					}else{
						 this.$Message.error('下注失败, '+res.msg);
					}
				})
			},
			changePage(current){
				this.current = current;
				this.showTableList = this.lotteryData.slice((this.current-1)*5,this.current*5)
			}
		},
		watch:{
			lotteryData(){
				this.ticketCount = 0;
				this.totalPrice = 0;
				if(this.lotteryData){
					if(this.lotteryData.length!=0){
						this.lotteryData.forEach((item,index)=>{
					this.ticketCount+=item.ticketCount
					this.totalPrice+=item.totalPrice
				})
						this.showTableList = this.lotteryData.slice((this.current-1)*5,(this.current-1)+5)
					}else{
						this.showTableList = []
					}

				}else{
						this.showTableList = []
					}


			},
			subGameList(newList){
				this.title = this.lotteryType[this.classId]+"单注最高中奖金额"+newList[0].oneNoteLimit+"元,单期最高中奖金额"+newList[0].singleLimit+"元,下注之前请确定期号,请最后确认投注!"
			}
		}

	}
</script>

<style>
	.table {
		padding: 10px 0;
		background: #FFFFFF;
	}

	.table .ivu-table-wrapper {
		border: 1px solid #e9e9e9;
		border-radius: 4px 4px 0 0;
	}

	.table .ivu-table:before {
		background-color: #fff !important;
	}

	.table_footer {
		padding: 10px 8px;
		height: 49px;
		background-color: #f8f8f9;
		border: 1px solid #e9e9e9;
		border-top: none;
		border-radius: 0 0 4px 4px;
	}

	.table .table_footer .clear_btn .ivu-btn {
		color: #f04134
	}

	.table .table_footer .bet_btn .ivu-btn {
		/*background: linear-gradient(0, #272a32 0, #4b4e58 100%)!important;*/
		color: #fff!important;

    background: #4c4a4d;
	}

	.table .ivu-table:before {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		left: 0;
		bottom: 0;
		background-color: #fff;
		z-index: 1;
	}

	.table .ivu-table:after {
		content: '';
		width: 1px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background-color: #fff;
		z-index: 3;
	}

	.table_footer .ivu-row,
	.table_footer .ivu-row .ivu-col {
		height: 100%;
	}

	.table_footer .clear_btn,.table_footer .footer_center div,.table_footer .bet_btn{
		display: flex;
		align-items: center;
	}

	.table .table_footer .footer_center {
		justify-content: center;
		align-items: center;
	}

	.table .table_footer .bet_btn {
		display: flex;
		justify-content: flex-end;
	}

	.table .page .ivu-page {
		display: flex;
		justify-content: flex-end;
		padding: 10px 0;
	}
	.table .betNote_tag .ivu-tag-text{

		color:#108ee9 !important;
		}
	.table .table_footer .ivu-poptip-popper{
		width: 600px !important;
		color: rgba(0,0,0,.65)
	}
	.table .table_footer .ivu-poptip-confirm .ivu-poptip-popper {
     max-width: 700px;
}
.table .table_footer .ivu-poptip-footer .ivu-btn:nth-child(1){
	background: #FFFFFF !important;
	color: rgba(0,0,0,.65) !important;
	border: 1px solid #d9d9d9;
}
.table .table_footer .ivu-poptip-footer .ivu-btn:nth-child(1):hover{
	color: #2d8cf0 !important;
	border: 1px solid #2d8cf0 !important;
}
.table .table_footer .ivu-poptip-footer .ivu-btn:nth-child(2){
	color: #fff !important;
    background: #108ee9 !important;
    border-color: #108ee9 !important;
}
  .table .ivu-table-body{
    overflow: hidden;
  }




  .table .ivu-table-border th{
    background: #c1c1c1 !important;
    border: 0 !important;
  }

</style>
