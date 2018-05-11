<template>
	<div class="cashflow">
	<Row>
        <Col span="3">
        	<p class="title">交易类型:</p>
        	<Select @on-change="search()" v-model="mode1" style="width:100px">
            <Option v-for="item in selectItem" :value="item.type" :key="item.type">{{ item.title }}</Option>
          </Select>
        </Col>
        <Col span="6">
        	<p class="title">日期:</p>
        	<DatePicker @on-change="selectTime" type="date" :options="options1" placeholder="请选择日期" style="width: 118px" v-model="startTime"></DatePicker>
        	<span style="margin: 5px;">-</span>
        	<DatePicker @on-change="selectTime" type="date" :options="options2" placeholder="请选择日期" style="width: 118px" v-model="endTime"></DatePicker>
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
    		<span>上次更新时间：<span>{{Time(new Date())}} {{ newTime}} </span>
            </span>
             <Button type="ghost" @click="renovate()" >
             	<Icon type="refresh" ></Icon>
             	刷新</Button>
    	</div>
    	<Table border :columns="columns1" :data="dataList"></Table>
      <div class="page" ref="FyPage" v-if="countAll >0" >
        <Page :current="currentPage" :total="countAll" show-elevator show-total @on-change = "changePage"></Page>
      </div>
    </div>
	</div>
</template>

<script>
  import { mapActions,mapState } from "vuex";
	export default {
    data () {
      return {
        dataList: [],
        maxTime: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        mode1: "0",
        countAll: 1,
        pageSize: 10,
        pages: 1,
        newTime: '',
        selectItem: [{
          title: "全部",
          type: "0"
        }, {
          title: "充值",
          type: "1"
        }, {
          title: "提现",
          type: "2"
        }, {
          title: "投注",
          type: "3"
        }, {
          title: "优惠",
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
        }],
        columns1: [
          {
            title: '交易时间',
            key: 'tradeDate',
            render:(h,params)=>{
              return h('span',params.row.tradeDate.slice(0,-2))
            }
          },
          {
            title: '交易前金额',
            key: 'amountBefore',
            render:function (h,params) {
              return h('span',Number(params.row.amountBefore).toFixed(2))
            }
          },
          {
            title: '交易金额',
            key:'tradeAmount',
            render:function (h,params) {
              return h('span',params.row.tradeAmount.toFixed(2))
            }
          },
          {
            title: '交易后金额',
            key: 'amountAfter',
            render:function (h,params) {
              return h('span',params.row.amountAfter.toFixed(2))
            }
          },
          {
            title: '交易类型',
            key: 'tradeType'
          },
          {
            title: '项目',
            key: 'tradeItem'
          },
          {
            title: '备注',
            key: 'tradeRemark',
          }
        ],
        options1: {
          disabledDate: (time) => {
            if (time.valueOf() > new Date(this.endTime)) {
              return true
            }
          },
        },
        options2: {
          disabledDate: (time) => {
            if (time.valueOf() < new Date(this.startTime)) {
              return true
            }
            if (time.valueOf() > new Date()) {
              return true
            }
          }
        },
        currentPage:1
      }
    },
        created () {
          this.fastSelection('0');
        },
        computed: mapState("account", ["myCashList"]),
        methods: {
          ...mapActions("account", [
            "myCash"
          ]),
          search (page) {
            this.currentPage=page;
            var data = +this.mode1 + "/" + this.Time(this.startTime) + "/" + this.Time(this.endTime) + "/" +page;
            this.myCash(data).then((res) => {
              if(res.code===0){
                this.countAll = res.data.count;
                this.dataList = res.data.dataList;
              }else if(!res.data){
                this.$Notice.error({
                  title:'M5Ⅱ通知',
                  desc: '出了一点小意外，请稍后重试'
                });
              }else if(res.code===1){
                that.$Notice.info({
                  title: 'M5Ⅱ通知',
                  desc:res.msg
                });
              }
            })
          },
          //切换页码
          changePage (page) {
            this.search(page);
          },
          changeRouter (name) {
            this.$router.push({name: this.names[name]})
          },
          Time: function (now) {
            let year = new Date(now).getFullYear();
            let month = new Date(now).getMonth() + 1;
            let date = new Date(now).getDate();
            if (month < 10) month = "0" + month;
            if (date < 10) date = "0" + date;
            var h = new Date(now).getHours();
            if (h < 10) { h = '0' + h }
            var m = new Date(now).getMinutes();
            if (m < 10) { m = '0' + m }
            var mi = new Date(now).getSeconds();
            if (mi < 10) { mi = '0' + mi }
            this.newTime = h + ":" + m + ":" + mi
            return year + "-" + month + "-" + date;
          },
          //本周第一天
          showWeekFirstDay: function () {
            let Nowdate = new Date();
            let WeekFirstDay;
            if (Nowdate.getDay() == 0) {
              WeekFirstDay = new Date(Nowdate - 6 * 86400000);
            } else {
              WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            }
            let M = Number(WeekFirstDay.getMonth()) + 1;
            if (M < 10) {
              M = "0" + M;
            }
            let D = WeekFirstDay.getDate();
            if (D < 10) {
              D = "0" + D;
            }
            return WeekFirstDay.getFullYear() + "-" + M + "-" + D;
          },
          //本周最后一天
          showWeekLastDay: function () {
            let Nowdate = new Date();
            let WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
            let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
            let M = Number(WeekLastDay.getMonth()) + 1;
            if (M < 10) {
              M = "0" + M;
            }
            let D = WeekLastDay.getDate();
            if (D < 10) {
              D = "0" + D;
            }
            return WeekLastDay.getFullYear() + "-" + M + "-" + D;
          },
          //获得某月的天数：
          getMonthDays: function (myMonth) {
            let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
            let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
            let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
          },
          fastSelection (value) {
            let currentDate = new Date();
            switch (value) {
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
                this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date().getDate() - 13 : new Date().getDate() - new Date().getDay() - 6));
                this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() == 0 ? new Date().getDate() - 7 : new Date().getDate() - new Date().getDay()));
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
          // 刷新
          renovate () {
            this.search(1);
          },
          //选择时间
          selectTime () {
            this.search(1);

          },
        }
    }


</script>

<style >
	.cashflow .ivu-btn:focus {
    box-shadow: none;
    border-color: #57a3f3;
    color:#57a3f3 ;
}
	.cashflow .title{
		line-height: 32px;
	}
	.cashflow .ivu-radio-group-item{
		    margin:2px 8px 8px 2px;
            border-left:1px solid #dddee1 ;
		border-radius: 4px !important;
	}
	.cashflow .ivu-btn-ghost{
		display: flex;
		align-items: center;
		font-size: 12px;
	}
	.cashflow .table-title{
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
  .cashflow .ivu-table-body{
    overflow: hidden;
  }
</style>
