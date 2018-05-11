<template>
	<div class="lotteryreport">
	<Row>
        <Col span="5">
        	<p class="title">下级账号:</p>
        	<Input  icon="search" placeholder="请输入下级账号" style="width: 200px" @on-change="watchSubclass" @on-click="search" v-model="childAccount"></Input>
        	<p style="color: rgba(0,0,0,0.43);margin:1px;">为空时查询自己</p>
        </Col>
        <Col span="6">
        	<p class="title">日期:</p>
        	<DatePicker @on-change="search()" type="date" :options="options1" v-model="startTime" placeholder="请选择日期" style="width: 118px"></DatePicker>
        	<span style="margin: 5px;">-</span>
        	<DatePicker @on-change="search()" type="date" :options="options2" v-model="endTime" placeholder="请选择日期" style="width: 118px"></DatePicker>
        </Col>
        <Col span="5">
        	<p class="title">快速选择:</p>
        	<div style="width:210px;display: flex;justify-content: space-around;flex-wrap: wrap;margin-bottom: 18px;">
        		<Button  type="ghost" v-for="(item,index) in selectButtons" :key="'Button'+index" style="margin: 5px;" @click="fastSelection(item.value)">{{item.label}}</Button>
        	</div>
        </Col>
    </Row>
    <div class="table">
    	<div class="table-title">
    		<div>当前查询账号：{{crumb?Account:userDetail.account}}  上次更新时间：{{newTime}}    &nbsp&nbsp&nbsp&nbsp彩票报表查询时间为 起始时间07:00 ~ 截止时间07:00 的数据。例如：2018-01-01 07:00 ~ 2018-01-02 07:00
          <div >
            <Breadcrumb separator=">">
              <BreadcrumbItem v-for="(item,index) in crumbNum" :key="'BreadcrumbItem'+index">
                <div style="cursor: pointer" @click="searchAccount(item.account,index)">
                  <Icon :type="item.type"></Icon> {{item.account}}
                </div>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>
        <div>
          <Button type="ghost" @click="renovate()">
            <Icon type="refresh" ></Icon>刷新</Button>
        </div>


    	</div>

    	<Table border :columns="columns1" :data="dataList" ></Table>
    </div>
	</div>
</template>

<script>
	import { mapActions,mapState } from "vuex";
  import  {bus}  from '../../bus.js'
	export default {
		data(){
			return{
	    Account:'',
        dataList:[],
        page:1,
        countAll:1,
        pageSize:10,
        pages:1,
        newTime:'',
				childAccount:"",
				maxTime:new Date(),
				endTime: new Date(),
				startTime: new Date(),
				selectItem:["充值","提现","转点","活动优惠"],
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
				columns1: [
                    {
                        title: '账号',
                        key: 'member_account'
                    },
                    {
                        title: '总充值',
                        key: 'p_deposit'
                    },
                    {
                        title: '总提现',
                        key: 'p_draw'
                    },
                    {
                        title: '总下注额',
                        key: 'total_pay',
                        render:(h,params)=>{
                          if(params.row.member_account.indexOf('总计')===-1&&params.row.total_pay!==0&&params.row.total_pay!==0){
                            return h('span',{
                              style:{
                                color:'rgb(16, 142, 233)',
                                cursor:'pointer'
                              },
                              on:{
                                click:()=>{
                                  if(params.row.member_account!==this.inferior&&params.row.has_child!==0){
                                    this.search(params.row.member_account);
                                  }else{
                                    bus.$emit('report',params.row.member_account,this.startTime,this.endTime);
                                  }
                                }
                              }
                            },params.row.total_pay.toFixed(2))
                          }else{
                            return h('span',params.row.total_pay.toFixed(2))
                          }
                        }
                    },
                    {
                        title: '总投注笔数',
                        key: 'cnt'
                    },
                    {
                        title: '销售返点',
                        key: 'rebate'
                    },
                    {
                        title: '派彩金额',
                        key: 'win_amount',
                      render:function (h,params) {
                        return h('span',params.row.win_amount.toFixed(2))
                      }
                    },
                    {
                        title: '团队赚水',
                        key: 'quit_amount'
                    },
                    {
                        title: '盈亏',
                        key: 'real_amount',
                      render:function (h,params) {
                        return h('span',params.row.real_amount.toFixed(2))
                      }
                    },
                    {
                        title: '活动',
                        key: 'p_preferential',
                      render:(h,params)=>{
                        if(params.row.member_account.indexOf('总计')===-1&&params.row.total_pay!==0&&params.row.p_preferential!==0){
                          return h('span',{
                            style:{
                              color:'rgb(16, 142, 233)',
                              cursor:'pointer'
                            },
                            on:{
                              click:()=>{
                                if(params.row.member_account!==this.inferior&&params.row.has_child!==0){
                                  this.search(params.row.member_account);
                                }else{
                                  bus.$emit('chargeLog',params.row.member_account,this.startTime,this.endTime);
                                }
                              }
                            }
                          },params.row.p_preferential.toFixed(2))
                        }else{
                          return h('span',params.row.p_preferential.toFixed(2))
                        }
                      }
                    },
                    {
                        title: '实际盈亏',
                        key: 'real_amount',
                      render:function (h,params) {
                        return h('span',params.row.real_amount.toFixed(2))
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
        //延迟搜索下级计时器
        setTime:'',
        //面包屑显隐
        crumb:false,
        //下级账号
        member:'',
        //用来对比的账号
        inferior:'',
        crumbNum:[]
			}
		},
    created(){
	  this.crumbNum.push({account:this.userDetail.account,type:'ios-home'});
      if(this.userDetail.account){
      	this.fastSelection();
      }
      this.time();
    },
		computed:{ ...mapState( "account",['queryLotteryReportList']), ...mapState(['userDetail','Times'])},
		methods:{
			...mapActions("account",[
				"queryLotteryReport"
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
//        $('.loginRecord_time').html(n+"-"+y+"-"+t+" "+h+":"+m+":"+mi);
        this.newTime = n+"-"+y+"-"+t+" "+h+":"+m+":"+mi
      },
      //点击账号查询时传参account
			search(account) {
			  let that=this;
        if(this.childAccount === "" ){
          this.Account = this.userDetail.account
        }else {
          this.Account = this.childAccount
        }
        if(that.Times.mark==1){
          this.startTime=that.Times.startTime;
          this.endTime=that.Times.endTime;
        }
        let data = {
          'memberAccount': account?account:this.Account,
          'endTime' :this.Time(this.endTime),
          'startTime' :this.Time(this.startTime)
        };
        this.queryLotteryReport(data).then(res=>{
          that.inferior=data.memberAccount;
          if(res.code===0){
            that.dataList = res.data;
            that.crumb=true;
            that.member=account;
            if(data.memberAccount!==that.userDetail.account){
              that.crumbNum.push({account:data.memberAccount,type:'android-person'})
            }
            if(that.dataList.length!==0){
              let cnt=0,has_child=0,p_deposit=0,p_draw=0,p_preferential=0,quit_amount=0,real_amount=0,rebate=0,total_pay=0,win_amount=0
              that.dataList.forEach(function (item) {
                cnt+=item.cnt;
                has_child+=item.has_child;
                p_deposit+=item.p_deposit;
                p_draw+=item.p_draw;
                p_preferential+=item.p_preferential;
                quit_amount+=item.quit_amount;
                real_amount+=item.real_amount;
                rebate+=item.rebate;
                total_pay+=item.total_pay;
                win_amount+=item.win_amount;
              })
              that.dataList.push({'member_account':'总计'+that.dataList.length+'人','cnt':cnt,'has_child':has_child,'p_deposit':p_deposit,'p_draw':p_draw,'p_preferential':p_preferential,'quit_amount':quit_amount,'real_amount':real_amount,'rebate':rebate,'total_pay':total_pay,'win_amount':win_amount});

            }

          }else if(res.code===1){
            that.$Notice.info({
              title: 'M5Ⅱ通知',
              desc:res.msg
            });
          }
				})
        that.$store.commit('transmitTimes',{mark:2,account:that.account,startTime:that.startTime,endTime:that.endTime})

			},
      //搜索下级监听
      watchSubclass(){
        let that=this,i=0;
        clearInterval(that.setTime);
        that.setTime=setInterval(function () {
          i+=1;
//        console.log(i);
          if(i===10){
            that.search();
            clearInterval(that.setTime);
          }
        },100)


      },
      //切换页码
      changePage(page){
        this.getQueryLoginInfo(page);
        this.page = page;
      },
      getQueryLoginInfo(){
        let data = {
          'memberAccount': this.Account,
          'endTime' : this.formt(this.endTime),
          'startTime' : this.formt(this.startTime)
        };
        this.queryLotteryReport(data).then(res => {
          this.countAll = res.data.length;
          this.pages = Math.ceil(this.countAll/this.pageSize);
          this.dataList = this.queryLotteryReportList
        }).catch(err =>{
          console.log(err)
        })
      },
			changeRouter(name){
				this.$router.push({name:this.names[name]})
			},
      Time: function(now) {
        let year = new Date(now).getFullYear();
        let month = new Date(now).getMonth() + 1;
        let date = new Date(now).getDate();
        if(month < 10) month = "0" + month;
        if(date < 10) date = "0" + date;
        return year + "-" + month + "-" + date
      },
      //本周第一天；
      showWeekFirstDay:function() {
        let Nowdate=new Date();
        let WeekFirstDay;
        if(Nowdate.getDay()==0){
          WeekFirstDay=new Date(Nowdate-6*86400000);
        }else{
          WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
        }
        let M=Number(WeekFirstDay.getMonth())+1;
        if(M<10){
          M="0"+M;
        }
        let D=WeekFirstDay.getDate();
        if(D<10){
          D="0"+D;
        }
        return WeekFirstDay.getFullYear()+"-"+M+"-"+D;
      },
      //本周最后一天
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
      //获得某月的天数：
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
            this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDay()==0?new Date().getDate() -13:new Date().getDate() -new Date().getDay()-6));
            this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()==0?new Date().getDate() -7:new Date().getDate() - new Date().getDay()));
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
				this.search();
			},
      // 刷新
      renovate (){
        this.search();
        this.time()
      },
      //点击面包屑事件
      searchAccount(account,index){
        this.search(account);
        this.crumbNum.splice(index+1)
      }
		},
		watch:{
			userDetail(){
			
      	this.fastSelection();
      
				}
		}
  }
</script>

<style >
	.lotteryreport .ivu-btn:focus {
    box-shadow: none;
    border-color: #57a3f3;
    color:#57a3f3 ;
}
	.lotteryreport .title{
		line-height: 32px;
	}
	.lotteryreport .ivu-radio-group-item{
		    margin:2px 8px 8px 2px;
            border-left:1px solid #dddee1 ;
		border-radius: 4px !important;
	}
	.lotteryreport .ivu-btn-ghost{
		display: flex;
		align-items: center;
		font-size: 12px;
	}
	.lotteryreport .table-title{
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
  .lotteryreport .ivu-table-body{
    overflow: hidden;
  }


</style>
