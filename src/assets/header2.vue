<template>
  <div id="navbar2">
    <Modal
      v-model="recharge"
      title="充值"
      :transition-names="['ease', 'fade']"
      class-name="charge"
      :styles="{width:750+'px'}"
      @on-visible-change="make"
    >
      <Steps :current="step">
        <Step title="选择充值方式" content=""></Step>
        <Step title="填写充值信息" content=""></Step>
        <Step title="前往充值" content=""></Step>
        <Step title="等待客服审核" content=""></Step>
      </Steps>
      <Tabs v-if="this.Income.length!=0" v-model="type" @on-click="queryBanks">
        <TabPane :label="this.Income[0].typeName" name="0">
          <div class="chargePage" v-show="show">
            <div class="warm_tip" v-html="this.Income[0].remark"></div>
            <Form :label-width="179" :model="formValidate" :rules="ruleValidate">
              <FormItem label="选择公司账户：" :required="true">
                <RadioGroup v-model="formValidate.bank" @on-change="banks">
                  <Radio v-for="(item,index) in Bank" :label="index" :key="index"><img style="width: 126px; height: 36px; border: 1px solid lightgrey; border-radius: 3px;" :src="item.bankLogo" :alt="item.bankName" :title="item.bankName"></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="充值金额：" :required="true">
                <Row>
                  <Col span="4">
                  <InputNumber ref="input1" @on-change="round" :max="Number(maxMoney)" :min="Number(minMoney)" v-model="value1"></InputNumber>
                  </Col>
                  <Col span="7">
                  <span> {{text}}</span>
                  </Col>
                </Row>
                <Row>
                  <span style="color:rgba(0,0,0,.43)">单次充值上限为{{maxMoney}}元，最少充值{{minMoney}}元</span>
                </Row>
              </FormItem>
              <FormItem label="充值人姓名：" prop="name" :required="true">
                <Row>
                  <Col span="19">
                  <Input  type="text" v-model="formValidate.name">
                  </Input>
                  </Col>
                </Row>
                <Row>
                  <span style="color:rgba(0,0,0,.43)">请填入开户人姓名，避免出现无法核实的情况</span>
                </Row>
              </FormItem>
              <template v-if="Bank.length!=0&&Bank[0].firstDeposit">
                <div v-show="firstDeposit">
                  <FormItem label="首次充值优惠：">
                    充值至少 <Tag  color="#d2eafb"><span style="color:#108ee9">{{Bank[0].discountAmount}}</span></Tag>元时，可以享受首次充值优惠 <Tag  color="#d2eafb"><span style="color: #108ee9">{{Bank[0].discountPercent}}%</span></Tag> ，最高优惠 <Tag  color="#d2eafb"><span style="color: #108ee9">{{Bank[0].maxDiscountAmount}}</span></Tag>
                  </FormItem>
                  <FormItem style="margin-bottom: 24px" label="首存打码倍数：">
                    当前打码倍数为<Tag  color="#d2eafb"><span style="color:#108ee9">{{Bank[0].firstDiscountTimes}}</span></Tag>
                  </FormItem>
                </div>
                <FormItem label="是否享受首存优惠：">
                  <Row>
                    <RadioGroup @on-change="selectFirstDeposit" v-model="select">
                      <Radio label="1">
                        <span>是</span>
                      </Radio>
                      <Radio label="0">
                        <span>否</span>
                      </Radio>
                    </RadioGroup>
                  </Row>
                  <Row>
                    <span style="color:rgba(0,0,0,.43)">打码大于<Tag  color="#d2eafb"><span style="color:#108ee9">{{Bank[0].firstDiscountTimes}}</span></Tag>才能提现</span>
                  </Row>

                </FormItem>
              </template>
              <FormItem>
                <Row>
                  <Button @click="recharge_in('formValidate')" size="default" type="primary">下一步</Button>
                </Row>
              </FormItem>
            </Form>
          </div>
          <div id="payment" v-show="pamentShow">
            <Form :label-width="179">
              <FormItem label="充值银行：">
                <Row>
                  <Col span="18"><img :src="bankType.bankLogo" :alt="bankType.bankName" :title="bankType.bankName"></Col>
                  <Col span="4">
                  <div>
                    <div>【扫码充值】</div>
                    <img style="width:90px;height: 90px;" :src="bankType.qrCode" alt="">
                  </div>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="订单号：">
                <Row>
                  <Col span="18">{{bankType.orderNo}}</Col>
                  <Button @click="copy()" class="btn" type="primary" :data-clipboard-text="bankType.orderNo">复制</Button>
                </Row>
              </FormItem>
              <FormItem label="网点：">
                <div style="display: flex;">
                  <Col span="18">{{bankType.bankPoint}}</Col>
                  <Button @click="copy()" class="btn"  type="primary" :data-clipboard-text="bankType.bankPoint">复制</Button>
                </div>
              </FormItem>
              <FormItem label="银行账号：">
                <Row>
                  <Col span="18">{{bankType.bankAccount}}</Col>
                  <Button @click="copy()" class="btn" type="primary" :data-clipboard-text="bankType.bankAccount">复制</Button>
                </Row>
              </FormItem>
              <FormItem label="收款人：">
                <Row>
                  <Col span="18">{{bankType.receiver}}</Col>
                  <Button @click="copy()" class="btn" type="primary" :data-clipboard-text="bankType.receiver">复制</Button>
                </Row>
              </FormItem>
              <FormItem label="充值人姓名：">
                <div style="display: flex;">
                  <Col span="18"><div>{{formValidate.name}}</div></Col>
                  <Button @click="copy()" class="btn" type="primary" :data-clipboard-text="formValidate.name">复制</Button>
                </div>
              </FormItem>
              <FormItem label="充值金额：">
                <span>{{value1}}</span>
              </FormItem>
              <FormItem >
                <Row>
                  <Col span="3" ><Button @click="confirm()" type="primary">充值完成请点我</Button></Col>
                  <Col span="3" offset="4"><Button @click="enterCharge()">进入充值</Button></Col>
                  <Col span="8" offset="2"><Button @click="cancelOrder('5')">取消订单</Button></Col>
                </Row>
              </FormItem>
            </Form>
          </div>
          <Row v-if="chargeFinish" style="font-size: 20px;display: flex;justify-content: center;padding-top: 30px">
            <Col span="1"><Icon color="skyblue" type="android-done"></Icon></Col>
            <Col span="10">充值完成，请耐心等待客服审核</Col>
          </Row>
        </TabPane>
        <TabPane :label="this.Income[2].typeName" name="2">
          <div v-show="threeBankShow" class="threeBank">
            <div class="warm_tip" v-html="this.Income[2].remark" style="margin-bottom: 12px"></div>
            <Alert show-icon v-show="threeBank.length===0">
              暂时无法充值
              <template slot="desc">没有可用的充值账户 </template>
            </Alert>
            <Form :label-width="179" v-show="threeBank.length!==0" :rules="ruleValidate">
              <FormItem label="选择三方账户：" :required="true">
                <RadioGroup v-model="threeBankType" @on-change="selectThreeBanks">
                  <Radio v-for="(item,index) in threeBank" :label="index" :key="index"><img style="width: 126px; height: 36px; border: 1px solid lightgrey; border-radius: 3px;" :src="item.bankLogo" :alt="item.serviceType" :title="item.serviceType"></Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="充值金额：" :required="true">
                <Row>
                  <Col span="4">
                  <InputNumber ref="input2" @on-change="round" :max="Number(threeMaxMoney)" :min="Number(threeMinMoney)" v-model="value2"></InputNumber>
                  </Col>
                  <Col span="7">
                  <span>{{text}}</span>
                  </Col>
                </Row>
                <Row>
                  <span style="color:rgba(0,0,0,.43)">单次充值上限为{{threeMaxMoney}}元，最少充值{{threeMinMoney}}元</span>
                </Row>
              </FormItem>
              <FormItem>
                <Row>
                 <Button @click="saveThreeOrder()"  size="default" type="primary">提交</Button>
                </Row>
              </FormItem>
            </Form>
          </div>
          <div v-show="!threeBankShow">
            <p v-show="redirection" style="font-size: 20px;text-align: center;margin-top: 40px">{{textTip}}<span v-show="textTip==='正在跳转中'" class="dotting"></span></p>
            <div v-show="!redirection">
              <div id="erCode" style="display: flex;justify-content: center;margin-top: 20px;">
              </div>
              <p style="margin-bottom: 12px;text-align: center">充值金额：{{value2}}元</p>
              <p style="text-align: center">请扫描上方二维码完成支付，完成支付后关闭弹框即可</p>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div slot="footer">
      </div>
    </Modal>
    <Modal
      v-model="withdraw"
      class-name="withdraw"
      width="700"
      title="提现"
      @on-visible-change="reveal"
    >
      <Form ref="formValidate" :label-width="200" :model="formValidate" :rules="ruleValidate">
        <FormItem label="提示信息：">
          <div v-html="DrawCondition.tip"></div>
        </FormItem>
        <FormItem label="消费比例：">
          <p>提现需达投注量<Tag  color="#d2eafb"><span style="color:#108ee9">{{DrawCondition.memberConsumeNeed}}</span></Tag>已达投注量<Tag  color="#d2eafb"><span style="color:#108ee9">{{DrawCondition.memberConsume}}</span></Tag></p>
        </FormItem>
        <FormItem label="账户金额：">
          <span>{{Number(DrawCondition.accountBalance).toFixed(2)}}</span>
        </FormItem>
        <FormItem  label="提现账号：" :required="true">
          <Row>
            <Col span="19">
            <Select v-model="selectBank">
              <Option v-for="item in DrawCondition.bankList" :value="item[0]" :key="item">{{item[1]}}</Option>
            </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="提现金额：" :required="true">
          <Row>
            <Col span="12">
            <div>
              <InputNumber v-model="withdrawMoney" @on-change="NumberToChinese(withdrawMoney)"  :max="DrawCondition.drawDegreeTimes" :min="DrawCondition.drawFloorTimes"></InputNumber>
              <span>{{text}}</span>
            </div>
            </Col>
          </Row>
          <Row>
            <span style="color:rgba(0,0,0,.43)">您本次最高提现{{DrawCondition.drawDegreeTimes}}元，最低提现{{DrawCondition.drawFloorTimes}}元</span>
          </Row>
        </FormItem>
        <FormItem label="免收手续费次数：">
          <span>{{DrawCondition.newNoCharges}}</span>
        </FormItem>
        <FormItem label="扣手续费：">
          <span>{{DrawCondition.chargesPoint===0?'免收':DrawCondition.chargesPoint}}</span>
        </FormItem>
        <FormItem label="资金密码：" prop="assertPassword">
          <Row>
            <Col span="19">
            <Input v-model="formValidate.assertPassword" type="password"></Input>
            </Col>
          </Row>
        </FormItem>
        <FormItem >
          <Button @click="withdrawSubmit('formValidate')" type="primary">提交</Button>
        </FormItem>
      </Form>
      <div slot="footer"></div>
    </Modal>
    <div class="logo_box nav_left">
      <img src="../../static/img/m5_logo.png" />
    </div>
    <div class="nav_center">
      <Menu mode="horizontal" ref="me" :active-name="activeName" @on-select="changeRouter">
        <MenuItem name="0"> 投注大厅
        </MenuItem>
        <MenuItem name="1"> 走势图
        </MenuItem>
        <MenuItem name="2"> 我的投注
        </MenuItem>
        <MenuItem name="3"> 个人报表
        </MenuItem>
        <MenuItem name="4" v-if="userDetail.type=='0'"> 用户中心
        </MenuItem>
        <MenuItem name="5"> 优惠活动
        </MenuItem>
        <MenuItem name="6"> 帮助中心
        </MenuItem>
      </Menu>

    </div>
    <div :class="userDetail.type=='0'?'nav_right member':'nav_right tourist'">
      <Poptip trigger="hover" placement="bottom-end">
        <div :class="'avatar '+'sprite-icon-'+iconClass"></div>
        <div slot="title">点击更换头像</div>
        <div slot="content">
          <div style="width: 352px;display: flex;justify-content: space-around;flex-wrap: wrap;">
            <div class="" v-for="item in spriteIconList" :key="item" :class="'avatar-list '+'sprite-icon-'+item" @click="changeIconClass(item)"></div>
          </div>
        </div>
      </Poptip>
      <div style="width:51px;height:100%;color: #fff;font-size: 14px;line-height: 64px;margin-left: 10px;">
        <div style="height: 50%;line-height: 44px;">{{userDetail.type=='0'?userDetail.account:'游客'}}</div>
        <Poptip trigger="hover" placement="bottom">
          <div style="height: 50%;line-height: 20px;">{{userDetail.accountBalance.toFixed(2)}}</div>
          <div @click="getUserDetail" slot="title" style="color: rgba(0,0,0,.65);display: flex;align-items: center;"><span>钱包</span>
            <Icon type="ios-loop" style="font-size: 16px;margin-left: 4px;"></Icon>
          </div>
          <div slot="content" style="color: rgba(0,0,0,.65)">{{userDetail.accountBalance.toFixed(2)}}</div>
        </Poptip>
      </div>
      <div style="height:100%;" class="btnBox">
        <Button @click="charge()" v-if="userDetail.type=='0'" class="recharge">充值</Button>

        <Button  @click="_withdraw()" v-if="userDetail.type=='0'" class="cash">提现</Button>

        <Button class="signout" @click="onSignOut">退出</Button>
      </div>
      <a href="https://messenger.providesupport.net/messenger/0jqsflyt6rgek1v5new4nlcvoe.html" target="_blank" class="call" style="display: flex;align-items: center;margin-left: 8px;">
        <img src="../../static/img/kefu.png" style="width: 24px;height: 24px;" />
        <span style="font-size: 14px;color: #FFFFFF;margin-left: 4px;">客服</span>
      </a>
    </div>
  </div>
</template>

<script>
  import  {bus}  from '../bus.js'
  import { mapState, mapActions } from "vuex";
  export default {

    data() {
      return {
        activeName: "0",
        paths: ["/bet", "/chart", "/mybet", "/report", "/account", "/activity", "/help",],
        visible: false,
        spriteIconList: ["1", "10", "11", "12", "13", "14", "15", "17", "18", "19", "2", "20", "3", "4", "6", "9"],
        iconClass: "1",
        recharge:false,
        type:'0',
        formValidate: {
          assertPassword:'',
          bank:'',
          name:''
        },
        ruleValidate: {
          assertPassword: [
            {
              required: true,
              trigger: 'change',
              message: '资金密码不能为空'
            }
          ]
        },
        Bank:[],
        threeBank:[],
        value1:0,
        value2:0,
        text:'123',
//        chnNumChar:["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"],
//        chnUnitSection:["","万","亿","万亿","亿亿"],
//        chnUnitChar:["","拾","佰","仟"],
        unit:new Array("仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"),
        maxMoney:'',
        minMoney:'',
        select:'1',
        //选择银行的信息
        bankMessage:'',
        //当前步骤
        step:1,
        //是否展示充值订单
        show:true,
        //是否首存优惠
        firstDeposit:true,
        bankType:'',
        notice:false,
        pamentShow:false,
        chargeFinish:false,
        threeBankType:'',
        //选择三方的信息
        threeBankMessage:'',
        threeMaxMoney:'',
        threeMinMoney:'',
        threeBankShow:true,
        redirection:true,
        withdraw:false,
        //充值选择银行
        selectBank:'',
        withdrawMoney:0,
        //三方充值文本提示
        textTip:'正在跳转中',
      }
    },
    mounted() {
      bus.$on('show', () => {
        this.charge();
      });
      bus.$on('report',()=>{
        let that=this;
        new Promise(function (reslove,reject) {
          that.activeName='3';
          reslove();
        }).then(function () {
          that.changeRouter('3');
          that.routingReset();
        })
      });
      bus.$on('returnLotteryReporter',()=>{
          this.activeName='4';
          this.$refs.me.currentActiveName = this.activeName;
      });
      this.routingReset();
    },
    methods: {
      ...mapActions([
        "signOut",
        "getUserDetail",
        "queryIncome",
        "queryDrawCondition",
        "initState"
      ]),
      ...mapActions('account',['memberIfBind']),
      //提现模态框显隐时的回调函数
      reveal(display){
        let that=this;
        that.$refs['formValidate'].resetFields();
        if(display===true){
          that.queryDrawCondition().then(function (res) {
            if(res.code===0){
              that.selectBank=that.DrawCondition.bankList[0][0];
              that.withdrawMoney=that.DrawCondition.drawFloorTimes;
              that.NumberToChinese(that.withdrawMoney);
            }
          });
        }
      },
      //充值模态框显隐时的回调函数
      make(display){
        if(display===true){
          this.queryBanks('0');
        }
      },
      //选择银行
      banks(index){
        this.maxMoney=this.Bank[index].gatherMax;
        this.minMoney=this.Bank[index].gatherMin;
        this.value1=Math.ceil(this.Bank[index].gatherMin);
        this.NumberToChinese(this.value1);
      },
      //选择三方充值方式
      selectThreeBanks(index){
        this.threeMaxMoney=this.threeBank[index].gatherMax;
        this.threeMinMoney=this.threeBank[index].gatherMin;
        this.threeBank[index].gatherMin==0?this.value2=1:this.value2=Math.ceil(this.threeBank[index].gatherMin);
        this.NumberToChinese(this.value2);
      },
      toDx(n) {
        switch (n) {
          case "0":
            return "零";
          case "1":
            return "壹";
          case "2":
            return "贰";
          case "3":
            return "叁";
          case "4":
            return "肆";
          case "5":
            return "伍";
          case "6":
            return "陆";
          case "7":
            return "柒";
          case "8":
            return "捌";
          case "9":
            return "玖";
        }
      },
      // 转换算法主函数
      NumberToChinese(m){
        m *= 100;
        m += "";
        var length = m.length;
        var result = "";
        for (var i = 0; i < length; i++) {
          if (i == 2) {
            result = "元" + result;
          } else if (i == 6) {
            result = "万" + result;
          }
          if (m.charAt(length - i - 1) == 0) {
            if (i != 0 && i != 1) {
              if (result.charAt(0) != '零' && result.charAt(0) != '元' && result.charAt(0) != '万') {
                result = "零" + result;
              }
            }
            continue;
          }
          result = this.toDx(m.charAt(length - i - 1)) + this.unit[this.unit.length - i - 1] + result;
        }
        result += result.charAt(result.length - 1) == '元' ? "整" : "";
        this.text=result;
      },
      //四舍五入
      round(num){
        num=num.toFixed(0);
        this.$refs.input1.currentValue=num;
        this.$refs.input2.currentValue=num;
        this.value1=Number(num);
        this.value2=Number(num);
        this.NumberToChinese(num);
      },
      //首存优惠选择
      selectFirstDeposit(option){
        if(option==='0'){
          this.firstDeposit=false;
        }else{
          this.firstDeposit=true;
        }
      },
      //充值
      recharge_in(){
        let that =this;
        this.bankType=this.Bank[this.formValidate.bank];
        if(this.bankType.firstDeposit===false){
          var firstDeposit='0';
        }else{
          var firstDeposit=this.select;
        }
        if(this.formValidate.name===''){
          this.$Message.warning('请输入充值人姓名');
        }else{
          that.$http({
            method:'post',
            url:'inter/money/saveMoneyOrder',
            data:{
              'bankAccountId':that.bankType.bankAccount,
              'firstDeposit':firstDeposit,
              'incomeType':'0',
              'memberName':that.formValidate.name,
              'orderNo':that.bankType.orderNo,
              'saveAmount':that.value1+'',
              'way':'1'
            }
          }).then(function (data) {
            if(data.data.code===0){
              that.step=2;
              that.show=false;
              that.pamentShow=true;
            }else if(data.data.code===666){
              that.$router.push({path:'/'})
            }else if(data.data.code===1){
              that.$Notice.warning({
                title: 'M5II通知',
                desc:data.data.msg
              });
            }
          }).catch(function (error){
            console.log(error)
          })
        }
      },
      //提交三方订单
      saveThreeOrder(){
        let that=this;
        that.redirection=true;
        this._threeBankType=this.threeBank[this.threeBankType];
//      console.log(this._threeBankType)
        this.$http({
          method:'post',
          url:'/inter/money/saveThreeOrder',
          data:{
            'baseThreeBusinessId':this._threeBankType.bankAccountId,
            'orderNo':this._threeBankType.orderNo,
            'saveAmount':this.value2+'',
            'serviceType':this._threeBankType.serviceType,
            'way':'1'
          }
        }).then(function (data) {
          let mark=data.data.data;
          if(data.data.code===0){
              that.threeBankShow=false;
              that.step=2;
              that.$http({
                method:'post',
                url:'/inter/money/updateThreeOrder',
                data:{
                  'orderNo':that._threeBankType.orderNo,
                  'payType':that._threeBankType.serviceType
                }
              }).then(function (data) {
                if(mark==='0'){
                  if(data.data.data.respCode==='SUCCESS'&&data.data.data.qrCode!==''){
                    that.redirection=false;
                    document.getElementById("erCode").innerHTML ='';
                    let qrcode = new QRCode(document.getElementById("erCode"), {
                      width: 128,
                      height:128,
                    });
                    qrcode.makeCode(data.data.data.qrCode);
                  }else{
                    if(data.data.data.resultDesc){
                      that.textTip=data.data.data.resultDesc
                    }else{
                      that.textTip='生成订单失败，请重试';
                    }
                  }
                }else if(mark==='1'){
//                  that.actionUrl=data.data.data.actionUrl;
                    that.textTip='请在新打开的页面完成支付，完成支付后关闭弹框即可';
//                    window.open('https://00m52.com/pay_star/bankpay/selBk.htm');
                  let pay=that.decode(data.data.data);
//                  window.open(`https://00m52.com/pay_star/bankpay/selBk.htm?${pay}`)
                  window.open(`${window.location.protocol}//${window.location.host}/pay.html?${pay}`)
                }
              }).catch(function () {

              })

          }else if(data.data.code===666){
            that.$router.push({path:'/'});
          }else if(data.data.code===1){
            this.$Notice.warning({
              title: 'M5II通知',
              desc:data.data.msg
            });
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //充值银行
      charge(){
        let that=this;
        that.recharge=true;
        that.type='0';
        that.queryIncome();
      },
      queryBanks(name){
        let that=this;
        that.chargeFinish=false;
        that.$http({
          method:'post',
          url:'/inter/money/queryBank',
          data: {'type': name, 'pcOrPhone': '0'}
        }).then(function (data) {

           if(name==='0'){
            if(data.data.code===1){
              that.notice=true;
              that.step=2;
              that.show=false;
              that.pamentShow=true;
              that.bankType=data.data.data[0];
              that.value1=that.bankType.amount;
              that.name=that.bankType.name;
            }else if(data.data.code===2){
              that.notice=false;
              that.step=1;
              that.show=true;
              that.pamentShow=false;
              that.Bank=data.data.data;
              that.formValidate.name='';
              that.formValidate.bank=0;
              that.maxMoney=that.Bank[0].gatherMax;
              that.minMoney=that.Bank[0].gatherMin;
              that.value1=Math.ceil(that.Bank[0].gatherMin);
              that.NumberToChinese(that.value1);
            }else if(data.data.code===666){
              that.$router.push({path:'/'});
            }
          }else if(name==='2'){
            if(data.data.code===2){
              that.textTip='正在跳转中';
              that.threeBankShow=true;
              that.threeBank=data.data.data;
              that.threeBankType=0;
              that.step=1;
              that.threeMaxMoney=that.threeBank[0].gatherMax;
              that.threeMinMoney=that.threeBank[0].gatherMin;
              that.threeBank[0].gatherMin===0?that.value2=1:that.value2=Math.ceil(that.threeBank[0].gatherMin);
              that.NumberToChinese(Number(that.value2));
            }else if(data.data.code===666){
              that.$router.push({path:'/'});
            }
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //复制文本
      copy(){
        let clipboard = new Clipboard('.btn');
        clipboard.on('success', e => {
          this.$Message.success('复制成功');
          clipboard.destroy();
        })

      },
      //提示充值是否完成
      confirm(){
        let that=this;
        if(this.notice===true){
          this.$Modal.confirm({
            title: '',
            content: '<h3>是否完成充值？</h3><p>如果您已经完成充值，请点击 已完成</p>',
            okText:'已完成',
            cancelText:'未完成',
            onOk: function () {
              that.cancelOrder('1');
            }
          });
//          this.notice=false
        }else{
          this.cancelOrder('1');
        }

      },
      //进入充值
      enterCharge(){
        window.open('https://mybank.icbc.com.cn/icbc/newperbank/perbank3/frame/frame_index.jsp');
      },
      //更新订单
      cancelOrder(num){
        let that=this;
        this.$http({
          method:'post',
          url:'/inter/money/updateMoneyOrder',
          data:{
            orderNo:this.bankType.orderNo,
            orderStatus:num
          }
        }).then(function (data) {
//        console.log(data);
          if(data.data.code===0){
            if(num==='1'){
              that.pamentShow=false;
              that.chargeFinish=true;
              that.step=3;
            }else{
              that.recharge=false;
            }
          }else if(data.data.code===666){
            that.$router.push({path:'/'});
          }else{
            that.$Notice.error({
              title: num==='5'?'订单取消失败':'充值失败'
            });
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      //提现
      _withdraw(){
        let that=this;
        that.withdraw=true;
      },
      //提现提交
      withdrawSubmit(name){
        var that=this;
        that.$refs[name].validate((valid) => {
          if (valid) {
            if(that.withdrawMoney+that.DrawCondition.chargesPoint>Number(that.DrawCondition.accountBalance)){
              that.$Notice.warning({
                title: 'M5II通知',
                desc:"您的提现金额+手续费大于您的余额，无法提现"
              });
            }else{
              that.$http({
                method:'post',
                url:'/inter/money/saveDrawMoneyInfo',
                data:{
                  "applyAmount":String(that.withdrawMoney),
                  "bankId":String(that.selectBank),
                  "bankBranch":"",
                  "bankPoundage":String(that.DrawCondition.chargesPoint),
                  "memberConsume":String(that.DrawCondition.memberConsume),
                  "memberConsumeNeed":String(that.DrawCondition.memberConsumeNeed),
                  "tradePassword":hex_md5(that.formValidate.assertPassword),
                  "branch_code":'',
                  "offshootName":'',
                  "way":"1"
                }
              }).then(function (data) {
                if(data.data.code===0){
                  that.withdraw=false;
                  that.$Notice.success({
                    title: 'M5II通知',
                    desc:'已提交申请提现，请耐心等待客服审核'
                  });
                }else if(data.data.code===666){
                  that.$router.push({path:'/'});
                }else{
                  that.$Notice.info({
                    title: 'M5II通知',
                    desc: data.data.msg
                  });
                }
              }).catch(function (error) {
                console.log(error)
              })
            }




          }
        })
      },
      routingReset() {
        let path = this.$router.history.current.path
        this.paths.forEach((item, index) => {
          let reg = new RegExp(item, "g")
          if(reg.test(path)) {
            this.activeName = String(index)
            this.$nextTick(()=>{
              this.$refs.me.currentActiveName = this.activeName;
            })
            return false
          }
        })
      },
      onSignOut() {
        this.signOut().then((res) => {
        	this.initState()
          if(res.code == "0") {
            this.$router.push({
              path: '/'
            })
          }
        })
      },
      changeIconClass(index) {
        this.iconClass = index;
      },
      changeRouter(name) {
        if(this.paths[name] == '/account' ){
          this.memberIfBind().then(res=>{
            if(res.code == "1"){
              this.$router.push({
                path: '/oneBank'
              })
            }else if(res.code == "0"){
              this.$router.push({
                path: this.paths[name]
              })
            }
          });
        }else {
          this.$router.push({
            path: this.paths[name]
          })
        }
      },
      leave() {
        this.visible = false
      },
      enter() {
        this.visible = true
      },
      decode(data){
        var str='';
        for(let key in data){
          var code;
          if(key==='productName'){
             code=encodeURIComponent(data[key]);

          }else{
             code=data[key];
          }
          let a=key+'$&=&$'+code+'&$&$&';
          str+=a;
        }
        str=str.slice(0,str.length-5);
//      console.log(str)
        return str
      }
    },
    computed:{
      ...mapState([ "userDetail", "Income", "DrawCondition"]),
      ...mapState('account', [ "companyBankAccountList",'saveMemberBankList'])
    },
    watch:{
      textTip(){
        this.dotting=false
      }
    }
  }
</script>

<style>
  #navbar2 .ivu-menu-horizontal.ivu-menu-light:after {
    content: '';
    display: none;
  }

  #navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
  #navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
  #navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
  #navbar2 .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
    color: rgb(255, 219, 74) !important;
    border-bottom: none;
  }

  #navbar2 {
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    margin: 0 auto;
    /*z-index: 10000;*/
  }

  #navbar2 .nav_left {
    float: left;
  }

  #navbar2 .nav_center {
    float: left;
  }

  #navbar2 .nav_right.member {
    margin-left: 40px;
    float: left;
    width: 363px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  #navbar2 .nav_right.tourist {
    margin-left: 40px;
    padding-left: 80px;
    float: right;
    width: 363px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  #navbar2 .nav_right .avatar-list {
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    background-image: url(../../static/img/sprite.png);
    background-size: 64px 1100px;
  }

  #navbar2 .nav_right .ivu-poptip {
    display: flex;
  }

  #navbar2 .nav_right .ivu-poptip .ivu-poptip-inner {
    z-index: 901;
  }

  #navbar2 .nav_right .avatar {
    width: 44.8px;
    height: 44.8px;
    border-radius: 50%;
    background-image: url(../../static/img/sprite.png);
    background-size: 44.8px 770px;
  }

  #navbar2 .nav_center .ivu-menu {
    height: 64px;
    background: none;
    color: #fff;
  }

  #navbar2 .nav_center .ivu-menu li {
    color: #fff;
  }

  #navbar2 .nav_center .ivu-menu .ivu-menu-item-active,
  #navbar2 .nav_center .ivu-menu .ivu-menu-item-selected {
    color: #2d8cf0;
  }

  #navbar2 .nav_center .ivu-menu li:hover {
    color: #2d8cf0;
  }

  #navbar2 .logo_box {
    /*margin-left: 50px;*/
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #navbar2 .logo_box img {
    display: inline-block;
    height: 45px;
    width: 120px;
    margin-right: 10px;
    border: none;
  }

  #navbar2 .btnBox {
    margin-left: 36px;
  }
  #navbar2 .nav_right.tourist .btnBox {
    margin-left: 50px;
  }


  #navbar2 .btnBox .recharge {
    background: rgb(33, 196, 71);
    color: white;
    border-color: rgb(33, 196, 71);
    padding: 0 10px;
    font-size: 12px;
    border-radius: 4px;
    height: 22px;
    margin: 2px;
  }

  #navbar2 .btnBox .cash {
    background: #ffdb4a;
    border-color: #ffdb4a;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 4px;
    height: 22px;
    margin: 2px;
  }

  #navbar2 .btnBox .cash:hover {
    background: #FFFFFF;
    border-color: #2b85e4;
  }

  #navbar2 .btnBox .signout {
    color: #f04134;
    background-color: #f7f7f7;
    border-color: #d9d9d9;
    padding: 0 10px;
    font-size: 12px;
    border-radius: 4px;
    height: 22px;
    margin: 2px;
  }

  #navbar2 .btnBox .signout:hover {
    color: #f7f7f7;
    background-color: #f04134;
    border-color: #f04134;
  }

  .sprite-icon-1.avatar {
    background-position: 0 -48px;
  }

  .sprite-icon-1 {
    background-position: 0 -69px;
  }

  .sprite-icon-10 {
    background-position: 0 -552px;
  }

  .sprite-icon-11 {
    background-position: 0 -138px;
  }

  .sprite-icon-12 {
    background-position: 0 -207px;
  }

  .sprite-icon-13 {
    background-position: 0 -276px;
  }

  .sprite-icon-14 {
    background-position: 0 -345px;
  }

  .sprite-icon-15 {
    background-position: 0 -414px;
  }

  .sprite-icon-17 {
    background-position: 0 -483px;
  }

  .sprite-icon-18 {
    background-position: 0 0;
  }

  .sprite-icon-19 {
    background-position: 0 -621.6px;
  }

  .sprite-icon-2 {
    background-position: 0 -690px;
  }

  .sprite-icon-20 {
    background-position: 0 -759px;
  }

  .sprite-icon-3 {
    background-position: 0 -828.4px;
  }

  .sprite-icon-4 {
    background-position: 0 -897.4px;
  }

  .sprite-icon-6 {
    background-position: 0 -966.6px;
  }

  .sprite-icon-9 {
    background-position: 0 -1035.6px;
  }

  .sprite-icon-10.avatar {
    background-position: 0 -387px;
  }

  .sprite-icon-11.avatar {
    background-position: 0 -97px;
  }

  .sprite-icon-12.avatar {
    background-position: 0 -145px;
  }

  .sprite-icon-13.avatar {
    background-position: 0 -193px;
  }

  .sprite-icon-14.avatar {
    background-position: 0 -242px;
  }

  .sprite-icon-15.avatar {
    background-position: 0 -290px;
  }

  .sprite-icon-17.avatar {
    background-position: 0 -339px;
  }

  .sprite-icon-18.avatar {
    background-position: 0 0;
  }

  .sprite-icon-19.avatar {
    background-position: 0 -436px;
  }

  .sprite-icon-2.avatar {
    background-position: 0 -483.4px;
  }

  .sprite-icon-20.avatar {
    background-position: 0 -531.4px;
  }

  .sprite-icon-3.avatar {
    background-position: 0 -580px;
  }

  .sprite-icon-4.avatar {
    background-position: 0 -628px;
  }

  .sprite-icon-6.avatar {
    background-position: 0 -677px;
  }

  .sprite-icon-9.avatar {
    background-position: 0 -725px;
  }
  .ivu-modal-header-inner{
    font-weight: normal;
  }
  /*.ivu-modal-wrap{*/
  /*z-index: 10002;*/
  /*}*/
  .charge .ivu-modal-content{
    /*width: 750px;*/
    min-height:606px;
  }
  .charge .ivu-modal-footer{
    padding: 0;
    border-top: 0;
    text-align: left;
  }
  .warm_tip{
    margin-left: 25%;
    margin-bottom: 12px;
  }
  .chargePage .ivu-form-item:nth-child(2){
    margin-bottom: 0;
  }
  .chargePage .ivu-form-item:nth-child(3){
    margin-bottom: 0;
  }
  /*.ivu-modal-mask{*/
  /*z-index: 10001;*/
  /*}*/
  #payment .ivu-form-item:last-child{
    margin-bottom: 0;
  }
  .ivu-modal-confirm-head{
    height:0;
  }
  .threeBank .ivu-form-item:nth-child(2){
    margin-bottom: 0;
  }
  .dotting {
    display: inline-block; min-width: 2px; min-height: 2px;
    box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor; /* for IE9+, ..., 3个点 */
    animation: dot 4s infinite step-start both; /* for IE10+, ... */
  }
  .dotting:before { content: '...'; } /* for IE8. 若无需兼容IE8, 此行以及下一行删除*/
  .dotting::before { content: ''; } /* for IE9+ 覆盖 IE8 */
  :root .dotting { margin-right: 8px; } /* for IE9+,FF,CH,OP,SF 占据空间*/

  @keyframes dot {
    25% { box-shadow: none; }                                  /* 0个点 */
    50% { box-shadow: 2px 0 currentColor; }                    /* 1个点 */
    75% { box-shadow: 2px 0 currentColor, 6px 0 currentColor;  /* 2个点 */ }
  }
  .charge .ivu-tabs{
    height: 515px;
    overflow-y: auto;
  }
  .withdraw .ivu-modal-footer{
    border-top: 0;

  }
  .withdraw .ivu-form-item:nth-child(5){
    margin-bottom: 0;
  }
  .ivu-radio-group{
    display: flex;
    flex-wrap: wrap;
  }
  .ivu-radio-wrapper{
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
</style>
