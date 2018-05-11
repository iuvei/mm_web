<template>
  <div class="members">
  	
  	<Modal v-model="modal2" width="700" class="modal2"
  		>
        <p slot="header" style="text-align:center">
            <span>日工资设置</span>
        </p>
        <div>
           <div>
           	<Button type="ghost" @click="addRow1">新增</Button>
           </div>
           <div>
           	<div class="tabel_title" style="display: flex;
		height: 62px;
		border: 1px solid #e9e9e9;
    padding-left: 8px;
    padding-right: 8px;
    align-items: center;
    border-radius: 4px 4px 0 0;
    margin-top: 10px;
    " >
           		<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;"><span>当前工资契约</span><div><Button type="primary"  @click="sign1" style="margin-right: 10px;"><Icon type="edit"></Icon><span style="margin-left: 5px;">签约</span></Button><Button type="ghost" style="float: right" @click="refresh1"><Icon type="refresh" ></Icon> 刷新</Button></div></div>
           	</div>
           	<Table border :columns="columns3" :data="data3"></Table>
           </div>
           <div style="border: 1px solid rgb(221, 221, 221); margin-top: 2rem; border-radius: 4px; padding: 1rem 0.6rem;"><p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem;">填写规则：日量从上往下递增，不可以等于；日工资是正整数</p><p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem; margin-top: 0.5rem;">日量为<span style="color: rgb(252, 91, 107);">{{maxList.amountStart}}</span>元;固定日工资上限为<span style="color: rgb(252, 91, 107);">{{maxList.wages}}</span>元</p><p style="margin-top: 0.5rem;">日工资有效人数为<span style="color: rgb(252, 91, 107);"> {{maxList.peopleStart}} </span>人</p></div>
        </div>
        <div slot="footer">
            
        </div>
    </Modal>
    <Modal v-model="modal3" width="700" class="modal2"
  		>
        <p slot="header" style="text-align:center">
            <span>日分红设置</span>
        </p>
        <div>
           <div>
           	<Button type="ghost" @click="addRow2">新增</Button>
           </div>
           <div>
           	<div class="tabel_title" style="display: flex;
		height: 62px;
		border: 1px solid #e9e9e9;
    padding-left: 8px;
    padding-right: 8px;
    align-items: center;
    border-radius: 4px 4px 0 0;
    margin-top: 10px;
    " >
           		<div style="display: flex;justify-content: space-between;align-items: center;width: 100%;"><span>当前工资契约</span><div><Button type="primary"  @click="sign2" style="margin-right: 10px;"><Icon type="edit"></Icon><span style="margin-left: 5px;">签约</span></Button><Button type="ghost" style="float: right" @click="refresh2"><Icon type="refresh" ></Icon> 刷新</Button></div></div>
           	</div>
           	<Table border :columns="columns4" :data="data4"></Table>
           </div>
           <div style="border: 1px solid rgb(221, 221, 221); margin-top: 2rem; border-radius: 4px; padding: 1rem 0.6rem;"><p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem;">填写规则：日量从上往下递增，不可以等于；日工资是正整数且分红最多保留两位小数</p><p style="border-bottom: 1px solid rgb(221, 221, 221); padding-bottom: 0.5rem; margin-top: 0.5rem;">日量为<span style="color: rgb(252, 91, 107);">{{maxList.amountStart}}</span>元;分红为<span style="color: rgb(252, 91, 107);">{{maxList.wages}}</span>%</p><p style="margin-top: 0.5rem;">有效人数为<span style="color: rgb(252, 91, 107);"> {{maxList.peopleStart}} </span>人</p></div>
        </div>
        <div slot="footer">
            
        </div>
    </Modal>
    <Modal class="mode3" v-model="moda3" width="400" class-name="model_b"  >
        <p slot="header" style="color:#000000;text-align:center">
          <span>团队返水配额</span>
        </p>
        <div style="width: 250px;margin: 0 auto;">
          <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="110">
            <FormItem :label= "this.maxpei">
              <Select v-model="formItem.select" @on-change="peiChange(formItem.select)">
                <Option v-for="(item, index) in selectList" :key="'Option'+index" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
            <FormItem  v-show="peiA" label="配额1" prop="">
              <Input type="text"  v-model="formItem.pei1"></Input>
            </FormItem>
            <FormItem v-show="peiB" label="配额2" prop="">
              <Input type="text" v-model="formItem.pei2"></Input>
            </FormItem>
            <FormItem v-show="peiC" label="配额3" prop="">
              <Input type="text" v-model="formItem.pei3" ></Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="moda3=false">取消</Button>
          <Button type="primary" @click="TeamRebet()" >保存</Button>
        </div>
      </Modal>
    <Modal v-model="moda2" width="600">
      <p slot="header" style="color:#000000;text-align:center">
        <span>新增会员</span>
      </p>
      <div style="width: 340px;margin: 0 auto;">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="会员身份" prop="gender">
            <RadioGroup v-model="formCustom.gender">
              <Radio label="0"  name="sf" checked="checked" >会员</Radio>
              <Radio label='1'  name="sf" value="1" >代理</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="会员账号" prop="passwd">
            <Input type="text"  v-model="formCustom.passwd"></Input>
          </FormItem>
          <FormItem label="账号密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
          </FormItem>
          <FormItem label="会员名称" prop="age">
            <Input type="text" v-model="formCustom.age" ></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">新增</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">撤销</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <!--<Button @click="moda2=false">取消</Button>-->
        <!--<Button type="primary">保存</Button>-->
      </div>
    </Modal>
    <Modal class="mode1" v-model="modal" width="800" class-name="model_a" :transfer='false'>
      <p slot="header" style="color:#000000;text-align:center">
        <span>账号详情</span>
      </p>
      <div style="text-align:center">
        <Table :border="showBorder" :columns="columns2" :data="baseMembersList"></Table>
        <Table :border="showBorder" :columns="tableColumns1" :data="InfoEditlistRebateList"></Table>
      </div>
      <div slot="footer">
        <!--<Button >关闭</Button>-->
        <!--</Row>-->
      </div>
    </Modal>
    <div class="tableTitle">
      <!--<Row>-->
        <Col span="15">
        <div>
          <p>当前查询账号：{{this.Account}} 上次更新时间：{{this.newTime}}</p>
          <p style="margin-top: 6px;">
            <!--<Icon type="ios-home-outline" style="font-weight: 900;margin-right: 6px;"></Icon><span style="font-weight: 900;">{{this.Account}}</span>-->
            <Breadcrumb separator=">" >
            	
              <BreadcrumbItem   v-for="(item,index) in accountList" :key="'BreadcrumbItem'+index"><span class="select_span" @click="queryAgentMember(item)"><Icon v-if="index==0" type="ios-home-outline"></Icon><Icon v-if="index>0" type="android-person"></Icon><span>{{item}}</span></span></BreadcrumbItem>
            </Breadcrumb>
          </p>
        </div>
        </Col>
        <Col span="9">
        <div>
          <Input v-model="childAccount" placeholder="输入会员账号查询" style="width: 200px" ></Input>
          <Button type="primary" @click="search()">查询</Button>
          <Button @click="search()" >
            <Icon type="refresh"></Icon>
            刷新
          </Button>
          <Button type="primary" @click="moda2=true">新增</Button>
        </div>
        </Col>
      <!--</Row>-->
    </div>
    <Table class="table_a" :border="showBorder" :stripe="showStripe" :show-header="showHeader" :height="fixedHeader ? 250 : ''"
           :size="tableSize" :data="queryAgentMemberdataList" :columns="tableColumns3"></Table>
  </div>
</template>
<script>
  import { mapActions,mapState } from "vuex";
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        let regs = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        if (value === '') {
          callback(new Error('账号名称不能为空!'));
        } else {
          if (!regs.test(value)) {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('请输入6-16位包含数字和字母的账号!')
          }
          callback()
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        if (value === '') {
          callback(new Error('密码不能为空!'))
        } else if (!reg.test(value)) {
          callback(new Error('请输入6-20位包含数字和字母的密码!'))
        } else {
          callback()
        }
      };
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入你的账号名称!'))
        }else {
          callback()
        }
      };
      return {
        accountList:[],
        acc:[],
        baseMembershierarchy:"",
        baseLotteryAccount:'',
        baseLotteryClassId:'',
        TeamRebetAccount:'',
        ClassIdList: { 1:'福体彩', 2:'六合彩', 3:'时时彩', 4:'快三', 5:'11选5', 6:'北京赛车'},
        statusList: { 0: '正常', 1: '禁止登入', 2: '黑名单', 4: '返回限制降点'},
        typeList:{ 0:"会员",1:"代理"},
        InfoEditlistRebateList:[],
        baseMembersList:[],
        queryAgentMemberdataList:[],
        Sselect:'',
        childName:'',
        maxpei:'',
        minRp:'',
        minp:'',
        rebatePoint:'',
        selectList:[],
        maxWages:0,
        newTime:'',
        childAccount:"",
        signAccount:'',
        Account:'',
        accountName:'',
        formCustom: {
          gender:'0',
          passwd: '',
          passwdCheck: '',
          age: ''
        },
        ruleCustom: {
          passwd: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          passwdCheck: [
            { validator: validatePassCheck, trigger: 'blur', required: true }
          ],
          age: [
            { validator: validateAge, trigger: 'blur', required: true }
          ],
          gender: [
            { required: true, message: '请选择会员身份', trigger: 'change' }
          ]
        },
        formItem: {
          pei1: '',
          pei2: '',
          pei3: '',
          select: ''
        },
        columns2: [
          {
            title: '账号',
            key: 'account',
//            width: 100
          },
          {
            title: '身份',
            key: 'hierarchy',
//            width: 150,
            align: 'center',
            render: (h, params) => {
              if (this.baseMembershierarchy === '代理') {
                return h('span', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      float: 'left',
                      width: 50,
                      lineHeight: '24px',
                      textAlign: 'center'
                    }
                  }, this.baseMembershierarchy)
              }else if (this.baseMembershierarchy !== '代理') {
                return h('div', [
                  h('span', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      float: 'left',
                      width: 50,
                      lineHeight: '24px'
                    }
                  }, this.baseMembershierarchy),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px',
                      float: 'left',
                      width: 50
                    },
                    on: {
                      click: () => {
                        this.MemberAgent(params.row.account)
                      }
                    }
                  }, '转为代理')
                ])
              }
            }
          },
          {
            title: '状态',
            key: 'status',
            width: 80
          },
          {
            title: '建立时间',
            key: 'createTime'
          },
          {
            title: '最后登录时间',
            key: 'lastLoginTime',
            width: 150
          },
          {
            title: '登录次数',
            key: 'loginTimes',
            width: 90
          }
        ],
        standbyArray:[],
        modal2:false,
        modal3:false,
        modal: false,
        moda2: false,
        moda3: false,
        peiA: true,
        peiB: true,
        peiC: true,
        visible:false,
        maxRebatePoint: '',
        Point: '',
        showBorder: true,
        showStripe: false,
        showHeader: true,
        showIndex: false,
        showCheckbox: false,
        fixedHeader: false,
        tableSize: 'default',
        data3:[
        
        ],
        data4:[],
        maxList:{},
        columns4: [
                    {
                        title: '日量≧（元）',
                        key: 'amountStart',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.amountStart,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
//                                    	event.target.value = event.target.value.replace(/[^\d]/g,'')
                                      	params.row.amountStart = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '活跃人数（人）',
                        key: 'peopleStart',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.peopleStart,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
                                      	params.row.peopleStart = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '亏损金额（元）',
                        key: 'lossStart',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.lossStart,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
                                      	params.row.lossStart = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '分红(%)',
                        key: 'wages',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.wages,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	var res = event.target.value.match( /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,1000})?$/);
      	                                   if(res){
      	                                   	
      	                                   	       let index = event.target.value.indexOf(".")   
      	                                      	 index!=-1?event.target.value =  event.target.value.slice(0,index+3):null;
      	                                        }else{
      	                                        	event.target.value = '';
      	                                        }
                                      	params.row.wages = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '操作',
                        key: 'address',
                      render: (h, params) => {
            return h('Poptip',{
            	props: {
                confirm: 'confirm',
                title:"你确定要删除吗？",
              },
              on: {
                'on-ok': () => {
                  this.data4.splice(params.index,1)
                  
                },
                'on-cancel':()=>{
                }
              }
            }, [ 
            h('Button', {
              props: {
                type: 'ghost'
              },
              on: {
              	click: () => {
                }
                
              }
            }, '删除'),
            
            ],)
          }
                    },
                ],
                columns3: [
                    {
                        title: '日量≧（元）',
                        key: 'amountStart',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.amountStart,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
                                      	params.row.amountStart = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '活跃人数（人）',
                        key: 'peopleStart',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.peopleStart,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
                                      	params.row.peopleStart = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '亏损金额（元）',
                        key: 'lossStart',
                        render: (h, params) => {
                        params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.lossStart,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
                                      	params.row.lossStart = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '日工资',
                        key: 'wages',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                        	params.row = this.standbyArray[params.index]
                        	 	return h('Input', {
                        	 		props: {
                        	 			value:params.row.wages,
                        	 	    },
                        	 	  on:{
                                      'on-blur':(event)=>{
                                      	event.target.value = this.zhengze(event.target.value)
                                      	params.row.wages = event.target.value;
                                      }
                                      }
                        	 	},
                            )
                        }
                    },
                    {
                        title: '操作',
                        key: 'address',
                      render: (h, params) => {
            return h('Poptip',{
            	props: {
                confirm: 'confirm',
                title:"你确定要删除吗？",
              },
              on: {
                'on-ok': () => {
                  this.data3.splice(params.index,1)
                  
                },
                'on-cancel':()=>{
                }
              }
            }, [ 
            h('Button', {
              props: {
                type: 'ghost'
              },
              on: {
              	click: () => {
                }
                
              }
            }, '删除'),
            
            ],)
          }
                    },
                ]
      }
    },
    created(){
      this.search();
    },
    methods:{
      ...mapActions('account',
        [
          'queryAgentMemberInfo',
          'agentRegisterMember',
          'queryMemberInfoEdit',
          'queryTeamQutaType',
          'updateTeamRebet',
          'updateMemberAgent',
          'queryMemberWages',
          'updateMemberWages'
        ]
      ),
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
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var hh = date.getHours() + ':';
        var mm = date.getMinutes() + ':';
        var ss = date.getSeconds();
        return Y+M+D+hh+mm+ss;
      },
      formt(time) {
        let da = new Date(time.valueOf());
        let year = da.getFullYear();
        let month = da.getMonth() + 1;
        let date = da.getDate();
        return [year, month, date].join('-');
      },
      zhengze(value){
      	 var res = value.match(/[^\d]/);
      	 if(res){
      	 	value = res.input.slice(0,res.index)
      	 }
      	return value
      },
      //代理会员查询
      search(acc) {
      	this.time();
        if(acc ){
          this.Account = acc
        }else if(this.childAccount === ""){
          this.Account = this.userDetail.account
          if(this.accountList.indexOf(this.userDetail.account)==-1){
                		this.accountList.push(this.userDetail.account)
                	}
          
        }else {
          this.Account = this.childAccount
        }
//        console.log(this.Account);
        let data = {
          'memberAccount':this.Account,
          'sort': '1',
          'type': '1'// 1-账号排序,2-余额排序，3-建立时间排序，4-最后登录时间排序})
        };
        this.queryAgentMemberInfo(data).then((res) => {
          this.queryAgentMemberdataList = this.queryAgentMemberInfoList;
//          console.log(this.queryAgentMemberdataList);
          this.queryAgentMemberdataList.forEach((item) => {
//            console.log(item.createTime.length);
            this.acc.push(item.account);
            if (item.lastLoginTime === null) {
              item.lastLoginTime = item.createTime
            }
            if (item.childAmount === null) {
              item.childAmount = '0'
            }
            item.create_Time = item.createTime.slice(0,19);
            item.last_LoginTime = item.lastLoginTime.slice(0,19);
          })
        })
//        console.log(this.acc,'123')
      },
      // 新增会员
      newMember(){
        let md5_pwd = hex_md5(this.formCustom.passwdCheck);
        let data = {
          'memberType':this.formCustom.gender,
          'password': md5_pwd,
          "addMemberAccount": this.formCustom.passwd,
          "name": this.formCustom.age,
          "way": '1'
        };
        this.agentRegisterMember(data).then( res=>{
                if(res.code === 0){
                  this.$Message.success(res.msg);
                  this.moda2 = false;
                  this.search();
                }else if(res.code === 1){
                  this.$Message.error(res.msg);
                }
        })
      },
      sign1(){
      	let flag = true;
      	this.data3 = this.standbyArray;
      	this.data3.forEach((item,index)=>{
      		if(item.amountStart ==''||item.peopleStart==''||item.lossStart==''||item.wages==''){
      			flag = false;
      			this.$Notice.warning({
					                             title: 'M5Ⅱ通知',
					                             desc: '请将签约条件填写完整',
				                                });
				                                return false;
      		}
      		if(index>0){
      			if(item.amountStart*1>this.data3[index-1].amountStart*1){
      			}else{
      				flag = false;
      				this.$Notice.warning({
					                             title: 'M5Ⅱ通知',
					                             desc: '日量从上往下递增，不可以等于',
				                                });
				                                return false
      			}
      		} 
      		if(item.wages>this.maxWages){
      			flag = false;
      			this.$Notice.warning({
					                             title: 'M5Ⅱ通知',
					                             desc: '日工资不能大于'+this.maxWages+'元',
				                                });
				                                return false
      		}
      	})
      	if(!flag){
      		return false
      	}
      	this.data3.forEach((item)=>{
      		item.memberAccount = this.signAccount;
      		item.wagesType = '1';
      	})
      	let data ={
      		memberAccount:this.signAccount,
      		wagesType:'1',
      		syWageslist:this.data3
      	}
      	this.updateMemberWages(data).then((res)=>{
      		if(res.code == 0){
      			this.$Message.success('签约成功');
      		}else{
      			this.$Message.error(res.msg);
      		}
      	})
      },
      sign2(){
      	let flag = true;
      	this.data4 = this.standbyArray;
      	this.data4.forEach((item,index)=>{
      		if(item.amountStart ==''||item.peopleStart==''||item.lossStart==''||item.wages==''){
      			flag = false;
      			this.$Notice.warning({
					                             title: 'M5Ⅱ通知',
					                             desc: '请将签约条件填写完整',
				                                });
				                                return false;
      		}
      		if(index>0){
      			if(item.amountStart*1>this.data4[index-1].amountStart*1){
      			}else{
      				flag = false;
      				this.$Notice.warning({
					                             title: 'M5Ⅱ通知',
					                             desc: '日量从上往下递增，不可以等于',
				                                });
				                                return false
      			}
      		} 
      		if(item.wages>this.maxWages){
      			flag = false;
      			this.$Notice.warning({
					                             title: 'M5Ⅱ通知',
					                             desc: '分红不能大于'+this.maxWages+'%',
				                                });
				                                return false
      		}
      	})
      	if(!flag){
      		return false
      	}
      	this.data4.forEach((item)=>{
      		item.memberAccount = this.signAccount;
      		item.wagesType = '2';
      	})
      	let data ={
      		memberAccount:this.signAccount,
      		wagesType:'2',
      		syWageslist:this.data4
      	}
      	this.updateMemberWages(data).then((res)=>{
      		if(res.code == 0){
      			this.$Message.success('签约成功');
      		}else{
      			this.$Message.error(res.msg);
      		}
      	})
      },
      // 查询会员详情
      MemberInfoEdit(accName){
        this.modal = true;
        this.childName = accName;
        let data = this.childName;
        this.queryMemberInfoEdit(data).then((res) => {
            this.InfoEditlistRebateList = this.InfoEditlistRebate ;
          this.baseMembersList = [this.baseMembers] ;
            this.InfoEditlistRebateList.forEach((item)=>{
              item.baseLotteryClassName = this.ClassIdList[item.baseLotteryClassId];
            });
            if(this.baseMembersList[0].hierarchy == "0"){
              this.baseMembershierarchy = '会员'
            }else {
              this.baseMembershierarchy = '代理'
            };
          if(this.baseMembersList[0].status == "0"){
            this.baseMembersList[0].status = '正常'
          }else if(this.baseMembersList[0].status == "1"){
            this.baseMembersList[0].status = '禁止登入'
          }else if(this.baseMembersList[0].status == "2"){
            this.baseMembersList[0].status = '黑名单'
          }else if(this.baseMembersList[0].status == "4"){
            this.baseMembersList[0].status = '返回限制降点'
          };
          if(this.baseMembersList[0].lastLoginTime == null){
            this.baseMembersList[0].lastLoginTime = this.baseMembersList[0].createTime
          }

          this.baseMembersList[0].createTime = this.timestampToTime(this.baseMembersList[0].createTime);
          this.baseMembersList[0].lastLoginTime = this.timestampToTime(this.baseMembersList[0].lastLoginTime)
        })
      },
      // 查询配额
      TeamQutaType( acc, id){
        this.TeamRebetAccount = acc;
        let data = {
          'account': acc,
          'type': id
        };
        this.selectList = [];
        this.queryTeamQutaType(data).then((res) => {
//          console.log(this.baseLotteryClass);
//          console.log(this.listRebate);
          this.maxpei =  "反水(最高" + this.listRebate[0].rebatePoint + ")";
          this.minRP = this.baseLotteryClass.minRebatePoint;
          this.minp = this.listRebate[0].rebatePoint;
          this.Point = this.ownRebate[0].rebatePoint;
          this.formItem.select = this.Point.toFixed(1);
//          console.log(this.formItem.select, 'cdx');
          this.rebatePoint = this.ownRebate[0].rebatePoint.toFixed(1);
          this.maxRebatePoint = this.baseLotteryClass.maxRebatePoint;
//          console.log(this.Point, this.rebatePoint,this.maxRebatePoint);
          this.formItem.pei1 = this.ownRebate[0].teamQuota1;
          this.formItem.pei2 = this.ownRebate[0].teamQuota2;
          this.formItem.pei3 = this.ownRebate[0].teamQuota3;
//        console.log(this.ownRebate[0].teamQuota1,'123');
//        console.log(this.Point, this.maxRebatePoint);
          if (this.Point < this.maxRebatePoint-0.2){
            this.peiA = false;
            this.peiB = false;
            this.peiC = false;
          } else if (this.Point === this.maxRebatePoint-0.2){
            this.peiA = false;
            this.peiB = false;
            this.peiC = true;
            this.formItem.pei1 = '0';
            this.formItem.pei2 = '0';
          } else if (this.rebatePoint === this.maxRebatePoint-0.1){
            this.peiA = false;
            this.peiB = true;
            this.peiC = true;
            this.formItem.pei1 = '0';
          } else if (this.Point === 1){
            this.peiA = true;
            this.peiB = true;
            this.peiC = true;
          }
          for (var i=this.minRP*10,d=[]; i<=this.minp*10;i++){
            let p = (i/10).toFixed(1);
            d.push(p);
          };
          this.selectList = d.reverse()
        })
      },
      // 修改反水配额
      TeamRebet(){
//      console.log(this.formItem.select);
        let data ={
          'account': this.TeamRebetAccount,
          'childRebet': this.formItem.select+'',
          'teamQuota1': this.formItem.pei1+"",
          'teamQuota2': this.formItem.pei2+"",
          'teamQuota3': this.formItem.pei3+"",
          'type': this.baseLotteryClassId// 彩种 1-福体彩 3-时时彩 4-快三 5 - 11选5  6-赛车
        };
        this.updateTeamRebet(data).then((res) => {
          if(res.code === 0){
            this.$Message.success(res.msg);
            this.moda3 = false
          }else {
            this.$Message.error(res.msg);
          }
        })
      },
      // 转为代理
      MemberAgent(acc){
        let data = acc;
          this.updateMemberAgent(data).then((res)=> {
            if(res.code === 0){
              this.$Message.success(res.msg);
              this.MemberInfoEdit(acc)
            }else {
              this.$Message.error(res.msg);
            }
          })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.newMember();
          } else {
            this.$Message.error('请填写正确的必填参数!');
          }
        })
      },
       addRow1(){
      	let row = {
        	amountStart:'',
        	peopleStart:'',
        	lossStart:'',
        	wages:'',
        }
      	this.data3.push(row)
      	this.standbyArray = this.data3
      },
      addRow2(){
      	let row = {
        	amountStart:'',
        	peopleStart:'',
        	lossStart:'',
        	wages:'',
        }
      	this.data4.push(row)
      	this.standbyArray = this.data4
      },
      queryAgentMember(account){
     let end = this.accountList.indexOf(account)
     this.accountList = this.accountList.slice(0,end+1)
      	this.search(account)
      },
      refresh1(){
                	this.queryMemberWages('/'+this.signAccount+'/'+"1").then((res)=>{
                		 if(res.data.wagesList){
                		 	this.data3 = res.data.wagesList;
                		 	this.standbyArray = this.data3;
                		 }else{
                		 	this.data3 = [];
                		 	this.standbyArray = [];
                		 }
                	})
      },
      refresh2(){
                	this.queryMemberWages('/'+this.signAccount+'/'+"2").then((res)=>{
                		 if(res.data.wagesList){
                		 	this.data4 = res.data.wagesList;
                		 	this.standbyArray = this.data4
                		 }else{
                		 	this.data4 = []
                		 	this.standbyArray = []
                		 }
                	})
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      peiChange(name){
        let that = this;
        if(name<=0.2){
          that.peiA = false;
          that.peiB = false;
          that.peiC = false;
        }else if(name>0.2){
          if(name < that.maxRebatePoint-0.2){
            that.peiA = false;
            that.peiB= false;
            that.peiC = false;
          }else if( name == that.maxRebatePoint-0.2) {
            that.peiA = false;
            that.peiB = false;
            that.peiC = true;
          }else if(name == that.maxRebatePoint-0.1){
            that.peiA = false;
            that.peiB = true;
            that.peiC = true;
          }else if(name == that.maxRebatePoint){
            that.peiA = true;
            that.peiB = true;
            that.peiC = true;
          }
        }
      }
    },
    computed: {
      ...mapState(['userDetail']),
      ...mapState( "account",['queryAgentMemberInfoList',]),
      ...mapState("account",['InfoEditlistRebate','baseMembers']),
      ...mapState( "account",['baseLotteryClass','listRebate','ownRebate']),
      ...mapState( "account",['updateTeamRebetList','updateMemberAgentList']),
      tableColumns3 () {
        let columns = [];
        if (this.showCheckbox) {
          columns.push({
            type: 'selection',
//              width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns.push({
            type: 'index',
//              width: 60,
            align: 'center'
          })
        }
        columns.push({
          title: '会员账号',
//          key: 'account',
          sortable: true,
          render: (h, params) => {
            if (params.row.account === this.Account) {
//                color = '#495060'
            }
            return h('Span',{
              props: {
                type: 'text'
              },
              style: {
                color: '#4ca5e9',
                cursor: 'pointer'
              },
              on: {
                click:()=>{
                	if(this.accountList.indexOf(params.row.account)==-1){
                		this.accountList.push(params.row.account)
                	}
                  this.search(params.row.account);
                }
              }
            },params.row.account)
          }
        });
        columns.push({
          title: '账号名称',
          key: 'name'
        });
        columns.push({
          title: '彩票钱包余额',
          key: 'accountBalance',
          sortable: true
        });
        columns.push({
          title: '团队人数',
          key: 'childCount'
        });
        columns.push({
          title: '注册时间',
          key: 'create_Time',
          sortable: true,
          width: 200
        });
        columns.push({
          title: '最后登录时间',
          key: 'last_LoginTime',
          sortable: true,
          width: 150
        });
        columns.push({
          title: '下级总额',
          key: 'childAmount'
        });
        columns.push({
          title: '操作',
          width:180,
//          key: 'hierarchy',
          render: (h, params) => {
            if (params.row.account === this.Account) {
              return false;
            }
            return h('div', [ 
            h('Button', {
              props: {
//            	size:'small',
                type: 'ghost'
              },
              on: {
                click: () => {
                  this.MemberInfoEdit(params.row.account);
                }
              }
            }, '详情'),
//          h('Button', {
//            props: {
//            	size:'small',
//              type: 'ghost'
//            },
//            on: {
//              click: () => {
//              	this.maxWages = 0;
//              	this.queryMemberWages('/'+this.userDetail.account+'/'+"1").then((res)=>{
//              		if(res.data.wagesList){
//              			res.data.wagesList.forEach((item)=>{
//              				if(item.wages*1>this.maxWages){
//              					this.maxWages = item.wages;
//              					this.maxList = item
//              				}
//              			})
//              		}
//              		 
//              	})
//              	this.signAccount = params.row.account;
//              	this.queryMemberWages('/'+params.row.account+'/'+"1").then((res)=>{
//              		 if(res.data.wagesList){
//              		 	this.data3 = res.data.wagesList;
//              		 	this.standbyArray = this.data3;
//              		 }else{
//              		 	this.data3 = []
//              		 	this.standbyArray = [];
//              		 }
//              		 this.modal2 = true;
//              	})
//              
//              }
//            }
//          }, '日工资'),
//          h('Button', {
//            props: {
//            	size:'small',
//              type: 'ghost'
//            },
//            on: {
//              click: () => {
//              	this.maxWages = 0;
//              	this.queryMemberWages('/'+this.userDetail.account+'/'+"2").then((res)=>{
//              		if(res.data.wagesList){
//              			console.log(res.data.wagesList,"22222")
//              			res.data.wagesList.forEach((item)=>{
//              				
//              				if(item.wages*1>this.maxWages){
//              					this.maxWages = item.wages;
//              					this.maxList = item
//              				}
//              			})
//              		}
//              		 
//              	})
//              	this.signAccount = params.row.account;
//              	this.queryMemberWages('/'+params.row.account+'/'+"2").then((res)=>{
//              		 if(res.data.wagesList){
//              		 	this.data4 = res.data.wagesList;
//              		 	this.standbyArray = this.data4;
//              		 }else{
//              		 	this.data4 = []
//              		 		this.standbyArray = []
//              		 }
//              		 this.modal3 = true;
//              	})
//              
//              }
//            }
//          }, '日分红')
            ])
          }
        });
        return columns;
      },
     
      tableColumns1 () {
        let columns1 = [];
        if (this.showCheckbox) {
          columns1.push({
            type: 'selection',
//              width: 60,
            align: 'center'
          })
        }
        if (this.showIndex) {
          columns1.push({
            type: 'index',
//              width: 60,
            align: 'center'
          })
        }
        columns1.push({
          title: '彩种',
          key: 'baseLotteryClassName'
        });
        columns1.push({
          title: '返水(%)',
          key: 'rebatePoint'
        });
        columns1.push({
          title: '配额1',
          key: 'teamQuota1'
        });
        columns1.push({
          title: '配额2',
          key: 'teamQuota2'
        });
        columns1.push({
          title: '配额3',
          key: 'teamQuota3'
        });
        columns1.push({
          title: '修改',
//          key: 'hierarchy',
          render: (h, params) => {
            this.baseLotteryAccount = params.row.account;
            this.baseLotteryClassId = params.row.baseLotteryClassId;
            return h('Button', {
              props: {
                type: 'ghost'
              },
              on: {
                click: () => {
                  this.moda3 = true;
                  this.TeamQutaType(this.baseLotteryAccount, params.row.baseLotteryClassId);
                }
              }
            }, '详情配置')
          }
        });
        return columns1;
      }
    },
    watch:{
      moda3(){
        this.handleReset('formCustom')
      },
      moda2(){
        this.handleReset('formCustom')
      },
      userDetail(){
      	this.search()
      }
    }
  }
</script>
<style>
	.members .select_span:hover{
		color: rgb(76, 165, 233);
	}
  .members .tableTitle{
    border-radius: 6px 6px 0 0;
    padding: 16px 0;
    padding-left: 8px;
    padding-right: 8px;
    height: 94px;
    border: 1px solid #dddee1;
    border-bottom: none;
  }
  .members .table_a .ivu-table-body .ivu-table-row td:nth-child(8) .ivu-table-cell{
  	padding: 0 !important;
  }
  .members .table_a .ivu-table-body .ivu-table-row td:nth-child(8) .ivu-table-cell div{
  	width: 100%;
  	display: flex !important;
  	justify-content:  space-around;
  } 
  /*.model_a{*/
    /*z-index: 1000;*/
  /*}*/
  /*.model_b{*/
    /*z-index: 1001;*/
    /*outline-color: rgba(17, 17, 17, 0.91)*/
  /*}*/
</style>
