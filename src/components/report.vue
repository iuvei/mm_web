
<template>
	<div id="report">
    <Modal
      v-model="detail"
      title="注单明细"
      width="700"
      class-name="detail"
      >
      <Form ref="formInline" >
        <FormItem label="注单号：" :label-width="125">
          <span>{{dataDetail.orderNo}}</span>

        </FormItem>
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="下注时间：" :label-width="125">
              <span>{{dataDetail.payTime.slice(0,-2)}}</span>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="注数：" :label-width="125">
              <span>{{dataDetail.payTimes}}</span>
            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="单注金额：" :label-width="125">
              <span>{{dataDetail.singleAmount}}</span>

            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="投注总额：" :label-width="125">
              <span>{{dataDetail.allAmount}}</span>
            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem >
        <Row>
          <Col span="12">
          <FormItem label="彩种：" :label-width="125">
            <span>{{dataDetail.lotteryName}}</span>

          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="期号：" :label-width="125">
            <span>{{dataDetail.periodNo}}</span>

          </FormItem>
          </Col>
        </Row>
      </FormItem >
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="奖金：" :label-width="125">
              <span>{{dataDetail.odds}}</span>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="返点：" :label-width="125">
              <span>{{dataDetail.rebatePercent}}</span>
            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="玩法：" :label-width="125">
              <span>{{dataDetail.gameName}}</span>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="销售返点：" :label-width="125">
              <span>{{dataDetail.rebateAmount}}</span>

            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="开奖号码：" :label-width="125">
              <span>{{dataDetail.winNumbers}}</span>

            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="中奖金额：" :label-width="125">
              <span>{{dataDetail.winAmount}}</span>
            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="状态：" :label-width="125">
              <span>{{dataDetail.statusView}}</span>
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="实际输赢：" :label-width="125">
              <span>{{dataDetail.realAmount}}</span>

            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem >
          <Row>
            <Col span="12">
            <FormItem label="中奖号码：" :label-width="125">
              <span>{{dataDetail.remark}}</span>

            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="中奖注数：" :label-width="125">
              <span>{{dataDetail.winTimes}}</span>

            </FormItem>
            </Col>
          </Row>
        </FormItem >
        <FormItem  label="下注号码：" :label-width="125">
          <span>{{dataDetail.lotteryNumbers}}</span>
        </FormItem>
      </Form>
      <div slot="footer" ></div>
    </Modal>
		<div class="report_head">
			<div>
				<div>彩类:</div>
				<Select @on-change="selectLotters" v-model="kindId" style="width:140px" >
          <!--<Option  value="" >全部</Option>-->
					<Option v-for="item in  lotters" :value="item.kindId" :key="item.kindId">{{ item.kindName }}</Option>
				</Select>
			</div>
			<div>
				<div>日期:</div>
				<Col span="12" style="float: left;z-index: 999">
				<DatePicker @on-change="selectTime"  type="date" placeholder="开始时间" style="width: 130px" transfer :options="{disabledDate:disableStartTime}"  v-model="startTime"></DatePicker>
				</Col>
				<!--<div style="width: 10px;height: 32px;background-color: #CCCCCC;float: left"></div>-->
				<Col span="12" style="float: left">
				<DatePicker @on-change="selectTime" type="date" placeholder="结束时间" style="width: 130px" transfer  :options="{disabledDate:disableEndTime}"  v-model="endTime"></DatePicker>
				</Col>
			</div>
			<div>
				<div>快速选择:</div>
				<Button type="ghost" :key="'Button'+index" v-for="(item,index) in buttons" @click="query(item.option)" :style="{'borderColor':activeindex===item.option?'#108ee9':'#d9d9d9','color':activeindex===item.option?'#108ee9':'rgba(0, 0, 0, 0.65)'}">{{item.text}}</Button>
			</div>
		</div>
		<div class="report_table" v-show="sels">
			<div class="report_table_but">
				<div>当前查看账号：{{account}}，更新时间：{{Time(new Date())}} {{ nowTime}} <Button v-show="account!==userDetail.account" @click="queryLoginAccount" type="ghost">查看当前登录账号</Button></div>
				<Button @click="personReport" type="ghost" icon="ios-refresh-empty" style="float: right">刷新</Button>
			</div>
			<div>
				<Table border :columns="columns1" :data="dataList"></Table>
			</div>
			<div class="go_router">
				<Button @click="returnLotteryReporter" type="primary" style="float: right">返回到彩票报表</Button>
			</div>
		</div>
		<div class="report_tableA" v-show="sel">
			<div class="report_table_but">
				<div>当前查看账号：{{account}}，报表日期：{{dayTime}}，报表类型：{{type}}，更新时间：{{Time(new Date())}} {{ nowTime}}  </div>
				<Button type="primary" style="float: right" @click="toAllList()">返回完整报表</Button>
        <Button type="ghost" @click="renovateReportAll" icon="ios-refresh-empty" style="float: right;margin-right: 20px">刷新</Button>
			</div>
			<div>
				<Table border :columns="columns2" :data="datas.data.lotteryOrder"></Table>
        <ul class="tableZ" v-show="showZ">
          <li style="width: 340px"><div style="text-align: right;">小计</div></li>
          <li><div>{{datas.data.sumMin.orderAmount.toFixed(2)}}</div></li>
          <li><div>{{datas.data.sumMin.rebateAmount.toFixed(2)}}</div></li>
          <li><div>{{datas.data.sumMin.winAmount.toFixed(2)}}</div></li>
          <li><div>{{datas.data.sumMin.backAmount.toFixed(2)}}</div></li>
          <li style="width: 424px;border-right: 1px solid #e9eaec;"><div :style="{color:datas.data.sumMin.realAmount>0?'red':datas.data.sumMin.realAmount<0?'#21c447':'#495060'}">{{datas.data.sumMin.realAmount.toFixed(2)}}</div></li>
        </ul>
        <ul class="tableZ" v-show="showZ">
          <li style="width: 340px"><div style="text-align: right;">总计</div></li>
          <li><div>{{datas.data.sumMax.orderAmount.toFixed(2)}}</div></li>
          <li><div>{{datas.data.sumMax.rebateAmount.toFixed(2)}}</div></li>
          <li><div>{{datas.data.sumMax.winAmount.toFixed(2)}}</div></li>
          <li><div>{{datas.data.sumMax.backAmount.toFixed(2)}}</div></li>
          <li style="width: 424px;border-right: 1px solid #e9eaec;"><div :style="{color:datas.data.sumMax.realAmount>0?'red':datas.data.sumMax.realAmount<0?'#21c447':'#495060'}">{{datas.data.sumMax.realAmount.toFixed(2)}}</div></li>
        </ul>
			</div>
			<div class="go_router">
				<Page :current="currentPage" v-show="showZ" @on-change="changePage" :total="datas.data.countAll" :page-size="10"	 show-total show-elevator style="float: right"></Page>
			</div>
			<Modal v-model="modal4" title="注单明细">
				<ul class="mx_moda">
					<li> <span>注单号</span>: </li>
					<li> <span>下注时间</span>:</li>
					<li> <span>注数</span>:</li>
					<li> <span>单注金额</span>:</li>
					<li> <span>彩种</span>:</li>
					<li> <span>玩法</span>:</li>
					<li> <span>开奖号码</span>:</li>
					<li> <span>销售返点</span>:</li>
					<li> <span>中奖金额</span>:</li>
					<li> <span>实际输赢</span>:</li>
					<li> <span>状态</span>:</li>
					<li> <span>下注号码</span>:</li>
				</ul>
			</Modal>
		</div>
	</div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  import {bus} from '../bus.js';
	export default {
    data() {
			return {
				columns1: [{
						title: '报表日期',
						key: 'dayTime'
					},
					{
						title: '有效笔数',
						key: 'cun'
					},
					{
						title: '有效投注额',
						key: 'allAmount'
					},
					{
						title: '实际盈亏',
						key: 'allRealAmount',
            render:(h,params)=>{
						  return h('span',{
						    style:{
                  color:params.row.allRealAmount>0?'red':params.row.allRealAmount<0?'#21c447':'#495060'
                }
              },params.row.allRealAmount.toFixed(2))
            }
					},
					{
						title: '操作',
						key: 'action',
						width: 400,
						render: (h, params) => {
						  if(!params.row.action){
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px',
                      float: 'left'
                    },
                    on: {
                      click: (event) => {
                        this.type=event.target.innerText;
                        this.queryMemberReportAll(1,params,'');
                      }
                    }
                  },'全部'),
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px',
                      float: 'left'
                    },
                    on: {
                      click: () => {
                        this.type=event.target.innerText;
                        this.queryMemberReportAll(1,params,'0');
                      }
                    }
                  },'中奖'),
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px',
                      float: 'left'
                    },
                    on: {
                      click: () => {
                        this.type=event.target.innerText;
                        this.queryMemberReportAll(1,params,'4,5');
                      }
                    }
                  },'退码'),
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.type=event.target.innerText;
                        this.queryMemberReportAll(1,params,'0,1,2')
                      }
                    },
                    style: {
                      marginRight: '20px',
                      float: 'left'
                    }
                  },'有效'),
                  h('Button', {
                    props: {
                      type: 'ghost',
                      size: 'small'
                    },
                    style: {
                      marginRight: '20px',
                      float: 'left'
                    },
                    on: {
                      click: () => {
                        this.type=event.target.innerText;
                        this.queryMemberReportAll(1,params,'2')
                      }
                    }
                  }, '未颁奖')
                ])
              }else {
						    return h('span',{},'-')
              }

						}
					}
				],
        columns2:[
          {
            title: '彩种',
            key: 'baseLotteryName',
            width:'100'
          },
          {
            title:'期数',
            key:'periodNo',
            width:'120'
          },
          {
            title:'玩法',
            key:'gameName',
            width:'120'
          },
          {
            title:'下注金额',
            key:'orderAmount',
            width:'100',
            render:(h,params)=>{
              return h('span',params.row.orderAmount.toFixed(2))
            }
          },
          {
            title:'返水金额',
            key:'rebateAmount',
            width:'100',
            render:(h,params)=>{
              return h('span',params.row.rebateAmount.toFixed(2))
            }
          },
          {
            title:'中奖金额',
            key:'winAmount',
            width:'100',
            render:(h,params)=>{
              return h('span',params.row.winAmount.toFixed(2))
            }
          },
          {
            title:'返还金额',
            key:'backAmount',
            width:'100',
            render:(h,params)=>{
              return h('span',params.row.backAmount.toFixed(2))
            }
          },
          {
            title:'实际输赢',
            key:'realAmount',
            width:'100',
            render:(h,params)=>{
              return h('span',{
                style:{
                  color:params.row.realAmount>0?'red':params.row.realAmount<0?'#21c447':'#495060'
                }
              },params.row.realAmount.toFixed(2))
            }
          },
          {
            title:'状态',
            key:'statusView',
            width:'100',
            render:(h,params)=>{
              return h('span',{
                style:{
                  color:params.row.statusView==='中奖'?'red':'rgba(0, 0, 0, 0.65)'
                }
              },params.row.statusView)
            }
          },
          {
            title:'注单明细',
            render:(h,params)=>{
              return h('Button',{
                on:{
                  click:()=>{
                    this.queryMemberReportOne(params);
                  }
                }
              },'查看')
            }
          }
        ],
        maxTime:'',
				startTime: ' ',
				endTime: ' ',
				isActive: false,
				nowTime: "",
				sel: false,
				sels: true,
				modal4: false,
        buttons:[{text:'今天',option:'today'},{text:'本周',option:'weeks'},{text:'本月',option:'month'},{text:'昨天',option:'yesterday'},{text:'上周',option:'lastWeek'},{text:'上月',option:'lastMonth'}],
        //判断点击的按钮
        activeindex:'',
        //所选彩类
        kindId:'1',
        //彩类
        lotters:'',
        //投注数据
        dataList:[],
        datas:{
          code:0,
          data:{
            countAll:2,
            lotteryOrder:[
              {
                backAmount:0,
                baseLotteryName:"重庆彩",
                gameName:"定位胆 (定位胆)",
                orderAmount:0.1,
                orderNo:"DIQ-f7aff3d7d83d4a088ce4190f409b0f9b",
                periodNo:"20180310079",
                realAmount:-0.1,
                rebateAmount:0,
                statusView:"未中奖",
                winAmount:0
              },
              {
                backAmount:0,
                baseLotteryName:"重庆彩",
                gameName:"定位胆 (定位胆)",
                orderAmount:1,
                orderNo:"DIQ-a289233f08644d60aa991e8a5c1f5f91",
                periodNo:"20180310069",
                realAmount:-1,
                rebateAmount:0,
                statusView:"未中奖",
                winAmount:0
              }
            ],
            sumMax:{
              backAmount:0,
              name:'总计',
              orderAmount:1.1,
              realAmount:-1.1,
              rebateAmount:0,
              winAmount:0
            },
            sumMin:{
              backAmount:0,
              name:'小计',
              orderAmount:1.1,
              realAmount:-1.1,
              rebateAmount:0,
              winAmount:0
            }
          },
          msg:''

        },
        //报表类型
        type:'',
        dayTime:'',
        statusWin:'',
        //详情模态框
        detail:false,
        dataDetail:{
          allAmount:0.1,
          gameName:"定位胆 (定位胆)",
          lotteryName:"重庆彩",
          lotteryNumbers:",,,1,",
          memberAccount:"xiaofei2",
          odds:"9.5000",
          orderNo:"DIQ-f7aff3d7d83d4a088ce4190f409b0f9b",
          payTime:"2018-03-10 18:49:31.0",
          payTimes:"1",
          periodNo:"20180310079",
          realAmount:-0.1,
          rebateAmount:0,
          rebatePercent:"10",
          remark:null,
          singleAmount:0.1,
          statusView:"未中奖",
          winAmount:0,
          winNumbers:"2,7,7,0,2",
          winTimes:"0"
        },
        showZ:true,
        account:'',
        currentPage:1
      }
		},
		created() {
      let date = new Date();
			this.maxTime = this.Time(date);
      // 初始化当前时间；
      this.startTime = this.Time(new Date().getTime());
      this.endTime = this.Time(new Date().getTime());
      this.catchLotters();
        bus.$on('report',(account,startTime,endTime)=>{
          sessionStorage.setItem('mark',1)
          sessionStorage.setItem('startTime',startTime);
          sessionStorage.setItem('endTime',endTime);
          sessionStorage.setItem('queryAccount',account);
        })
        if(this.userDetail.account){
        	 this.personReport();
        }

    },
		methods: {
      ...mapActions([
        "queryMemberReport",
      ]),
			//时间解析；
			Time(now) {
				let self = this;
				let year = new Date(now).getFullYear();
				let month = new Date(now).getMonth() + 1;
				let date = new Date(now).getDate();
				let hours = new Date(now).getHours();
				let minutes = new Date(now).getMinutes();
				let seconds = new Date(now).getSeconds();
				if(hours < 10) hours = '0' + hours;
				if(minutes < 10) minutes = '0' + minutes;
				if(seconds < 10) seconds = '0' + seconds;
				if(month < 10) month = '0' + month;
				if(date < 10) date = '0' + date;
				self.nowTime = hours + ':' + minutes + ':' + seconds;
				return year + '-' + month + '-' + date
			},
			//本周第一天
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
      showWeekLastDay:function () {
        let Nowdate=new Date();
        let WeekFirstDay=new Date(Nowdate-(Nowdate.getDay()-1)*86400000);
        let WeekLastDay=new Date((WeekFirstDay/1000+6*86400)*1000);
        let M=Number(WeekLastDay.getMonth())+1;
        if(M<10){
          M="0"+M;
        }
        let D=WeekLastDay.getDate();
        if(D<10){
          D="0"+D;
        }
        return WeekLastDay.getFullYear()+"-"+M+"-"+D;
      },
			//获得某月的天数：
			getMonthDays: function(myMonth) {
				let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
				let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
				let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
				return days;
			},
      //获取小彩类
      catchLotters () {
        let arr=[{kindName:'全部',kindId:'1'}];
        for(let i=0;i<this.kindList.length;i++){
          if(this.kindList[i].kindList!=[]){
            for(let k=0;k<this.kindList[i].kindList.length;k++){
              arr.push(this.kindList[i].kindList[k]);
            }
          }
        }
        this.lotters=arr;
  },
      //选择彩类
      selectLotters(){
			  this.startTime=this.Time(this.startTime);
			  this.endTime=this.Time(this.endTime);
        this.personReport();
      },
      //选择时间
      selectTime(){
        this.personReport();
      },
      //起始时间禁用
      disableStartTime(time){
        if(time.valueOf()>new Date(this.endTime)){
          return true
        }
      },
      //终止时间禁用
      disableEndTime(time){
        if(time.valueOf()<new Date(this.startTime)){
          return true
        }
        if(time.valueOf()>new Date()){
          return true
        }
      },
			//查询
			query(way) {
			  this.activeindex=way;
				switch(way) {
					case 'today':
						this.startTime = this.maxTime;
						this.endTime = this.maxTime;
						break;
					case 'yesterday':
						this.startTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
						this.endTime = this.Time(new Date().getTime() - 24 * 60 * 60 * 1000);
						break;
					case 'weeks':
						this.startTime = this.showWeekFirstDay();
						this.endTime = this.maxTime;
						break;
					case 'lastWeek':
						this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDay()==0?new Date().getDate() -13:new Date().getDate() -new Date().getDay()-6));
						this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()==0?new Date().getDate() -7:new Date().getDate() - new Date().getDay()));
						break;
					case 'month':
						this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
						this.endTime = this.maxTime;
						break;
					case 'lastMonth':
						this.startTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1));
						this.endTime = this.Time(new Date(new Date().getFullYear(), new Date().getMonth() - 1, this.getMonthDays(new Date().getMonth() - 1)));
						break;
				}
				this.personReport();
			},
			//返回完整报表
			toAllList() {
				this.sels = true;
				this.sel = false;
			},
      //个人报表查询
      personReport(){
			  let id;
			  let that=this;
			  var params;
        if(that.kindId==='1'){
			    id='';
        }else{
			    id=that.kindId;
        }
        //mark为1，则是从彩票报表跳过来
        if(sessionStorage.getItem('mark')==1){
          that.account=sessionStorage.getItem('queryAccount');
          if(sessionStorage.getItem('startTime')){
            that.startTime=that.Time(sessionStorage.getItem('startTime'));
            that.endTime=that.Time(sessionStorage.getItem('endTime'));
            params={
              'account': that.account,
              'baseLotteryId':'',
              "endTime":that.endTime ,
              "startTime":that.startTime
            }
          }else{
            that.startTime=that.Time(that.startTime);
            that.endTime=that.Time(that.endTime);
              params={
              'account': that.account,
              'baseLotteryId':'',
              "endTime":that.endTime ,
              "startTime":that.startTime
            }
          }
        }else{
          that.startTime=that.Time(that.startTime);
          that.endTime=that.Time(that.endTime);
          that.account=that.userDetail.account;
           params = {
            'account': that.userDetail.account,
            'baseLotteryId': id,
            "endTime": that.endTime,
            "startTime": that.startTime
          }
        }
        this.queryMemberReport(params).then(res=>{
          if(res.code===0){
            that.dataList=res.data;
            that.sels = true;
            that.sel = false;
            if(that.dataList.length!==0){
              let cun=0,allAmount=0,allRealAmount=0;
              that.dataList.forEach(function (item) {
                cun+=item.cun;
                allAmount+=item.allAmount;
                allRealAmount+=item.allRealAmount;
              })
              that.dataList.push({dayTime:'总计',cun:cun,allAmount:allAmount,allRealAmount:allRealAmount,action:'-',cellClassName:{action:'fontColorLose'}})
            }
          }else if(res.code===1){
            that.$Notice.info({
              title: 'M5Ⅱ通知',
              desc:res.msg
            });
          }else if(!res.data){
            this.$Notice.error({
              title:'M5Ⅱ通知',
              desc: '出了一点小意外，请稍后重试'
            });
          }
          sessionStorage.removeItem('startTime');
          }
        )
      },
      //个人报表—全部，中奖，退码等
      queryMemberReportAll(page,params,statusWin){
        let id;
        let that=this;
        this.currentPage=page;
        if(params){
          this.dayTime=params.row.dayTime;
          this.statusWin=statusWin;
        }
        if(this.kindId==='1'){
          id='';
        }else{
          id=this.kindId;
        }
        this.$http({
          method:'post',
          url: '/inter/user/queryMemberReportAll',
          data: {
            'account':this.account,
            'baseLotteryId':id,
            'dayTime':this.dayTime,
            'statusWin':this.statusWin,
            'page':page
          }
        }).then(function (data) {
//        console.log(data);
          if(data.data.code===0){
            that.sels = false;
            that.sel = true;
            that.datas=data.data;
            if(that.datas.data.countAll!==0){
              that.showZ=true
            }else{
              that.showZ=false
            }
          }else if(data.data.code===666){
            that.router.push({path:"/"})
          }else if(!data.data.data){
            that.$Notice.error({
              title:'M5Ⅱ通知',
              desc: '出了一点小意外，请稍后重试'
            });
          }
        }).catch(function (error) {

        })

      },
      //刷新报表
      renovateReportAll(){
        this.Time(new Date());
        this.queryMemberReportAll(1);
      },
      //个人报表明细
      queryMemberReportOne(params){
        let that=this;
        this.$http({
          method:'post',
          url: '/inter/user/queryMemberReportOne',
          data: {
            'dayTime':this.dayTime,
            'orderNo':params.row.orderNo
          }
        }).then(function (data) {
          if(data.data.code===0){
            that.dataDetail=data.data.data;
            that.detail=true;
          } else if(data.data.code===666){
            that.router.push({path:"/"})
          }else if(!data.data.data){
            that.$Notice.error({
              title:'M5Ⅱ通知',
              desc: '出了一点小意外，请稍后重试'
            });
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //分页跳转
      changePage(page){
        this.queryMemberReportAll(page);
      },
      //查看登录号
      queryLoginAccount(){
        sessionStorage.setItem('mark',2);
        this.personReport();
      },
      //返回到彩票报表
      returnLotteryReporter(){
        let that=this;
        new Promise((resolve,reject)=> {
          bus.$emit('returnLotteryReporter')
          this.$router.push({
            path:'account/lotteryreport'
          });
          resolve();
        }).then(()=>{
          that.$store.commit('transmitTimes',{mark:1,account:that.account,startTime:that.startTime,endTime:that.endTime});
        })
      }
    },

    computed: mapState(["kindList","userDetail","MemberReport"]),
    watch:{
    	userDetail(){
    		this.personReport()
    	}
    }
	}
</script>
<style scoped>
  #report {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
  }
  .report_head {
    overflow: hidden;
    height: 120px;
    z-index: 10;
  }
  .report_head>div {
    float: left;
  }
  .report_head>div:nth-child(1) {
    width: 150px;
  }
  .report_head>div:nth-child(2) {
    width: 340px;
  }

  .report_head>div:nth-child(3) {
    width: 230px;
  }

  .report_head>div:nth-child(3)>Button {
    margin: 4px 6px;
  }

  .report_table {}

  .report_table_but {
    height: 66px;
    border: 1px solid #e9e9e9;
    padding: 16px 8px;
    position: relative;
    top: 1px;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    line-height: 32px;
  }

  .report_table_but>div {
    display: inline-block;
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

  .go_router {
    margin: 10px;
    overflow: hidden;
  }

  .active {
    border-color: #108ee9;
    color: #108ee9;
  }

  .report_table_ul {
    width: 100%;
    height: 49px;
    border-left: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
  }

  .report_table_ul:hover {
    background-color: #ebf7ff;
  }

  .report_table_ul>li {
    float: left;
    height: 49px;
    width: 190px;
    border-right: 1px solid #e9e9e9;
    line-height: 20px;
    padding: 15px;
    box-sizing: border-box;
  }

  .report_table_ul>li:nth-child(2) {
    width: 191px;
  }

  .report_table_ul>li:nth-child(3) {
    width: 191px;
  }

  .report_table_ul>li:nth-child(4) {
    width: 191px;
  }

  .report_table_ul>li:nth-child(5) {
    width: 400px;
  }

  .report_tableA>.report_table_ul>li {
    width: 107px;
  }

  .report_tableA>.report_table_ul>li:nth-child(1) {
    width: 321px;
    text-align: right;
  }
  .report_tableA>.report_table_ul>li:nth-child(6) {
    width: 414px;
  }
  .mx_moda>li {
    padding: 10px 0;
  }
  .tableZ{
    display: flex;
    list-style: none;
  }
  .tableZ>li{
    width: 100px;
    border:1px solid #e9eaec;
    border-top: none;
    border-right: none;
  }
  .tableZ>li>div{
    padding: 16px 18px;
  }
</style>

