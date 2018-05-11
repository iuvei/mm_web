<template>
	<div class="chargelog">
		<Row>
			<Col span="3">
			<p class="title">记录类型:</p>
			<Select @on-change="search(1)" v-model="mode1" style="width:100px">
				<Option v-for="item in selectItems" :value="item.type" :key="item.type">{{ item.title }}</Option>
			</Select>
			</Col>
			<Col span="5">
			<p class="title">下级账号:</p>
			<Input @on-change="watchSubclass" icon="search" placeholder="请输入下级账号" style="width: 200px" @on-click="search(1)" v-model="childAccount"></Input>
			<p style="color: rgba(0,0,0,0.43);margin:1px;">为空时查询自己</p>
			</Col>
			<Col span="6">
			<p class="title">日期:</p>
			<!--<DatePicker  format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>-->
			<DatePicker @on-change="search()" type="date" :options="options1" placeholder="请选择日期" style="width: 118px" v-model="startTime"></DatePicker>
			<span style="margin: 5px;">-</span>
			<DatePicker @on-change="search()" type="date" :options="options2" placeholder="请选择日期" style="width: 118px" v-model="endTime"></DatePicker>

			</Col>
			<Col span="5">
			<p class="title">快速选择:</p>
			<div style="width:210px;display: flex;justify-content: space-around;flex-wrap: wrap;margin-bottom: 18px;">
				<Button type="ghost" :key="index" v-for="(item,index) in selectButtons" style="margin: 5px;" @click="fastSelection(item.value)">{{item.label}}</Button>
			</div>
			</Col>
		</Row>
		<div class="table">
			<div class="table-title">
				<span>上次更新时间：{{newTime}}
            </span>
				<Button type="ghost" @click="renovate()">
             	<Icon type="refresh" ></Icon>
             	刷新</Button>
			</div>
			<Table border :columns="columns1" :data="lotteryOrder"></Table>
			<table class="statistics"  rules="none" v-if="lotteryOrder.length!=0">
				<tr class="subtotal" >
					<td style="width:900px">{{queryChildBillList.sumMin.name}}</td>
					<td><span style="padding-left: 10px ">{{queryChildBillList.sumMin.sum.toFixed(2)}}</span></td>
				</tr>
				<tr class="total">
					<td >{{queryChildBillList.sumMax.name}}</td>
					<td><span style="padding-left: 10px">{{queryChildBillList.sumMax.sum.toFixed(2)}}</span></td>
				</tr>
			</table>
      <div class="page" ref="FyPage" v-if="lotteryOrder.length!=0">
        <Page :current="currentPage" :total="queryChildBillList.countAll" show-total show-elevator @on-change = "changePage"></Page>
      </div>
		</div>
	</div>
</template>

<script>
	import { mapActions,mapState } from "vuex";
	import {bus} from '../../bus.js'
	export default {
		created(){
      bus.$on('chargeLog',(account,startTime,endTime)=>{
        sessionStorage.setItem('mark2',1);
        sessionStorage.setItem('startTime2',startTime);
        sessionStorage.setItem('endTime2',endTime);
        sessionStorage.setItem('queryAccount2',account);
      })
      if(this.userDetail.account){
        	 this.search(1);
        }
      
      this.time();
		},
		data() {
			return {
			  Account:'',
        newTime:'',
				lotteryOrder:[],
				page: 1,
        pageSize:10,
        pages:1,
				childAccount: "",
				maxTime: new Date(),
				startTime: new Date(),
				endTime: new Date(),
				mode1: "1",
				selectItems: [{
					title: "充值",
					type: "1"
				}, {
					title: "提现",
					type: "2"
				}, {
					title: "转点",
					type: "3"
				}, {
					title: "活动优惠",
					type: "4"
				}],
				selectButtons: [{
					label: "今天",
					value: "0"
				}, {
					label: "本周",
					value: "2"
				}, {
					label: "本月",
					value: "4"
				}, {
					label: "昨天",
					value: "1"
				}, {
					label: "上周",
					value: "3"
				}, {
					label: "上月",
					value: "5"
				} ],
				columns1: [{
						title: '账号',
						key: 'memberAccount',
            width:300
					},
					{
						title: '科目',
						key: 'item',
            width:300
					},
					{
						title: '时间',
						key: 'changeTime',
            width:300
					},
					{
						title: '金额',
						key: 'amount',
            render:(h,params)=>{
						  return h('span',params.row.amount.toFixed(2))
            }
					}
				],

				options1: {
					disabledDate: (date) => {
						if(this.endTime == "") {
							return date && date.valueOf() > Date.now()
						}
						return date && date.valueOf() > this.endTime.valueOf();
					}
				},
				options2: {
					disabledDate: (date) => {
						if(this.startTime == "") {
							return date && date.valueOf() < Date.now() && date.valueOf() > Date.now()
						}
						return date && date.valueOf() < this.startTime.valueOf();
					}
				},
        currentPage:1
			}
		},
    computed:{ ...mapState( "account",['queryChildBillList']), ...mapState(['userDetail'])},
		methods: {
			...mapActions("account",[
				"queryChildBill"
			]),
      time() {
        var date = new Date();
        var n = date.getFullYear();
        var y = date.getMonth()+1;
        if(y < 10){ y= '0'+y }
        var t = date.getDate();
        if(t < 10){ t= '0'+t }
        var h = date.getHours();
        if(h < 10){ h= '0'+h }
        var m = date.getMinutes();
        if(m < 10){ m= '0'+m }
        var mi = date.getSeconds();
        if(mi < 10){ mi= '0'+mi }
        this.newTime = n+"-"+y+"-"+t+" "+h+":"+m+":"+mi
      },
      Time: function(now) {
        let year = new Date(now).getFullYear();
        let month = new Date(now).getMonth() + 1;
        let date = new Date(now).getDate();
        if(month < 10) month = "0" + month;
        if(date < 10) date = "0" + date;
        return year + "-" + month + "-" + date
      },
      // 本周第一天；
      showWeekFirstDay: function() {
        let Nowdate = new Date();
        let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay()) * 86400000);
        let M = Number(WeekFirstDay.getMonth()) + 1;
        if(M < 10) {
          M = "0" + M;
        }
        let D = WeekFirstDay.getDate();
        if(D < 10) {
          D = "0" + D;
        }
        return WeekFirstDay.getFullYear() + "-" + M + "-" + D;
      },
      // 本周最后一天
      showWeekLastDay: function() {
        let Nowdate = new Date();
        let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
        let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
        let M = Number(WeekLastDay.getMonth()) + 1;
        if(M < 10) {
          M = "0" + M;
        }
        let D = WeekLastDay.getDate();
        if(D < 10) {
          D = "0" + D;
        }
        return WeekLastDay.getFullYear() + "-" + M + "-" + D;
      },
      // 获得某月的天数：
      getMonthDays: function(myMonth) {
        let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
        let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
      },
      fastSelection(value) {
        let currentDate = new Date();
        switch(value) {
          case '0':
            this.startTime = this.maxTime;
            this.endTime = this.maxTime;
            break;
          case '1':
            this.startTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
            this.endTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
            break;
          case '2':
            this.startTime = this.showWeekFirstDay();
            this.endTime = this.maxTime;
            break;
          case '3':
            this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - new Date().getDay() - 6));
            this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + (6 - new Date().getDay() - 6)));
            break;
          case '4':
            this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
            this.endTime = this.maxTime;
            break;
          case '5':
            this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
            this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth() - 1, this.getMonthDays(new Date().getMonth() - 1)));
            break;
        }
        this.search(1);
      },
			search(page) {
				var data = {};
				this.currentPage=page;
        if(sessionStorage.getItem('mark2')==1){
          this.childAccount === ""?this.childAccount=this.userDetail.account:this.childAccount=this.childAccount;
          this.childAccount=sessionStorage.getItem('queryAccount2');
          this.mode1='4';
          if(sessionStorage.getItem('startTime2')){
            this.startTime=this.Time(sessionStorage.getItem('startTime2'));
            this.endTime=this.Time(sessionStorage.getItem('endTime2'));
            data={
              account:this.childAccount,
              endTime:this.endTime,
              startTime:this.startTime,
              page:page,
              type:this.mode1
            }
          }else{
            this.endTime=this.Time(this.endTime);
            this.startTime=this.Time(this.startTime);
            data={
              account:this.childAccount,
              endTime:this.endTime,
              startTime:this.startTime,
              page:page,
              type:this.mode1
            }
          }
        }else{
          this.childAccount === ""?this.Account=this.userDetail.account:this.Account=this.childAccount;
          this.endTime=this.Time(this.endTime);
          this.startTime=this.Time(this.startTime);
          data.account = this.Account;
          data.endTime = this.Time(this.endTime);
          data.startTime = this.Time(this.startTime);
          data.page = page;
          data.type = this.mode1;
        }
				this.queryChildBill(data).then((res)=>{
          if(res.code===0){
            this.lotteryOrder = res.data.lotteryOrder;
            this.lotteryOrder.forEach((item) =>{
              item.changeTime = item.confirmDate.slice(0,19)
            })
          }else if(res.code===1){
            this.$Notice.info({
              title: 'M5Ⅱ通知',
              desc:res.msg
            });
          }else if(!res.data){
            this.$Notice.error({
              title:'M5Ⅱ通知',
              desc: '出了一点小意外，请稍后重试'
            });
          }
          sessionStorage.removeItem('startTime2');
				})
			},
      //切换页码
      changePage(page){
        this.search(page);
      },
			changeRouter(name) {
				this.$router.push({
					name: this.names[name]
				})
			},
      //搜索下级监听
      watchSubclass(){
        let that=this,i=0;
        clearInterval(that.setTime);
        that.setTime=setInterval(function () {
          i+=1;
          if(i===10){
            that.search(1);
            clearInterval(that.setTime);
          }
        },100)
      },
      // 刷新
      renovate(){
        this.search(1);
        this.time()
      }
		},
		watch:{
			userDetail(){
				this.search(1);
			}
			 
		}
	}
</script>

<style>
	.chargelog .statistics{
		width: 1184px;
		 border: 1px solid #e9e9e9;
		 border-top: none;
	}
	.chargelog .statistics tr td:first-child{
		width: 887.4px;
		height: 50.6px;
		text-align:right ;
	}
	.chargelog .statistics tr td{
		padding: 16px 8px;
		border: 1px solid #e9e9e9;
	}
	.chargelog .statistics tr:hover{
		background: #EBF7FF;
	}
	.chargelog .statistics .subtotal td{
		border-top: none;
	}
	.chargelog .statistics .total td{
		height: 50.6px;
		text-align:left ;
	}
	.chargelog .ivu-btn:focus {
		box-shadow: none;
		border-color: #57a3f3;
		color: #57a3f3;
	}
	.chargelog .title {
		line-height: 32px;
	}
	.chargelog .ivu-radio-group-item {
		margin: 2px 8px 8px 2px;
		border-left: 1px solid #dddee1;
		border-radius: 4px !important;
	}
	.chargelog .ivu-btn-ghost {
		display: flex;
		align-items: center;
		font-size: 12px;
	}
	.chargelog .table-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 62px;
		border: 1px solid #e9e9e9;
		border-bottom: none;
		padding-left: 8px;
		padding-right: 8px;
		border-radius: 4px 4px 0 0;
	}
  .page{
    float: right;
    margin: 10px;
  }
  .chargelog .ivu-table-body{
    overflow: hidden;
  }
</style>
