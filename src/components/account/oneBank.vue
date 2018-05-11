<template>
  <div class="oneBank">
      <div  style="color:#000000;width: 876px;height: 36px;line-height: 36px;border: 1px solid #fff3cf;
    background-color: #fffaeb;padding: 0 16px;margin: 0 auto;    border-radius: 4px;color: rgba(0,0,0,.65);
    font-size: 12px;" >您必须先绑定资料才能进行用户中心的其他操作</div>
      <div style="width: 340px;margin:10px 200px ;">
        <Form  ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder=""></Input>
          </FormItem>
          <FormItem label="开户银行" prop="bankName">
            <Select placeholder="" v-model="formValidate.bankName">
              <Option v-for="item in companyBankAccountList" :key="item.bankNo" :value="item.id">{{ item.bankName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="分行名称" prop="offshootName">
            <Input v-model="formValidate.offshootName" placeholder=""></Input>
          </FormItem>
          <FormItem label="银行支行" prop="bankBranch">
            <Input v-model="formValidate.bankBranch" placeholder=""></Input>
          </FormItem>
          <FormItem label="支行行号" prop="branchCode">
            <Input v-model="formValidate.branchCode" placeholder=""></Input>
          </FormItem>
          <FormItem label="地址" prop="provinceOrCity">
            <!--@on-change="change"-->
            <Cascader :data="address" v-model="formValidate.provinceOrCity" @on-change="change"></Cascader>
          </FormItem>
          <FormItem label="银行卡号" prop="bankAccount" :show-message="false">
            <Input v-model="formValidate.bankAccount" placeholder="" @on-keyup="bankAccountValidate" type="text"></Input><br />
            <span style="position: absolute;top: 30px;color:rgba(0,0,0,.43);">已输入{{count}}位</span>
          </FormItem>
          <FormItem label="确认银行卡号" prop="confirmBankAccount">
            <Input v-model="formValidate.confirmBankAccount" placeholder=""></Input>
          </FormItem>
          <FormItem label="电话号码" prop="phone">
            <Input v-model="formValidate.phone" placeholder="">
            <span slot="prepend">+86</span>
            </Input>
          </FormItem>
          <FormItem label="资金密码" prop="tradePassword">
            <Input v-model="formValidate.tradePassword" placeholder=""></Input>
          </FormItem>
        </Form>
        <div style="margin: 0 auto;width:146px;">
          <!--<Button type="ghost">取消</Button>-->
          <Button type="primary" @click="bindBankCard('formValidate')">绑定</Button>
        </div>
      </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
    created() {
      this.routingReset();
      this.memberIfBind().then(res=>{
        this.esc = res.code;
        if(res.code == "1"){
          this.$Notice.error({
            title: 'M5II通知',
            desc: res.msg,
          });
          this.modal = true;
        }else if(res.code == "0"){
//            this.$Notice.success({
//              title: 'M5II通知',
//              desc: res.msg
//            });
          this.modal = false;
        }
      });
    },
    data() {
      let that =this;
      return {
        msgTel: '',
        city:"",
        province:"",
        count: 0,
        bankNameList: [{
          name: "中国银行"
        },
          {
            name: "农业银行"
          }
        ],
        formValidate: {
          name:'',
          bankName: '',
          offshootName: '',
          bankBranch: '',
          branchCode: '',
          provinceOrCity: [],
          bankAccount: '',
          confirmBankAccount: '',
          phone: '',
          tradePassword: "",
          firstBankAccount: "",
        },
        ruleValidate: {
          name: [{
            required: true,
            message: '请填写银行卡持有者姓名',
            trigger: 'blur'
          }],
          bankName: [{
            required: true,
            message: '请选择开户银行',
            trigger: 'blur'
          },
            {
              validator(rule, value, callback, source, options) {
                var errors = [];
                if(value.length=="") {
                  callback("请选择开户银行");
                }
                callback(errors);
              }
            }
          ],
          offshootName: [{
            message: 'Mailbox cannot be empty',
            trigger: 'blur'
          }, ],
          bankBranch: [{
            message: 'The name cannot be empty',
            trigger: 'blur'
          }],
          branchCode: [{
            message: 'The name cannot be empty',
            trigger: 'blur'
          }],
          provinceOrCity: [{
            required: true,
            message: '请选择地址',
//						trigger: 'blur'
          },
            {
              validator(rule, value, callback, source, options) {
                var errors = [];
                if(value.length<2) {
                  callback("请选择地址");
                }
                callback(errors);
              }
            }
          ],
          bankAccount: [{
            required: true,
            trigger: 'blur',
          },
            {
              validator(rule, value, callback, source, options) {
                var errors = [];
                if(!/^[0-9]{16,19}$/.test(value)) {
                  callback("请填写正确的银行卡号");
                }
                callback(errors);
              }
            }

          ],
          confirmBankAccount: [{
            required: true,
            message: '两次银行卡号必须相同',
            trigger: 'blur'
          },
            {
              validator (rule, value, callback, source, options){
                var errors = [];
                if(value != that.formValidate.bankAccount) {
                  callback("两次银行卡号必须相同");
                }
                callback(errors);
              }
            }
          ],
          phone: [{
            required: true,
            message: '请输入正确的电话号码',
            trigger: 'blur'
          },
            {
              validator (rule, value, callback, source, options){
                var errors = [];
                if(!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
                  callback("请输入正确的电话号码");
                }
                callback(errors);
              }
            }
          ],
          tradePassword: [
            {
              required: true,
              message: '密码为6-20位，至少包含数字和字母',
              trigger: 'blur'
            },
            {
              validator (rule, value, callback, source, options){
                var errors = [];
                if(!/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/.test(value)) {
                  callback("密码为6-20位，至少包含数字和字母");
                }
                callback(errors);
              }
            }

          ],
          firstBankAccount: [
            {
              required: true,
              message: '请填写第一张银行卡号',
              trigger: 'blur'
            },
            {
              validator(rule, value, callback, source, options) {
                var errors = [];
                if(!/^[0-9]{16,19}$/.test(value)) {
                  callback("请填写正确的银行卡号");
                }
                callback(errors);
              }
            }
          ],
        },
        modal: false,
        columns: [{
          title: '姓名',
          key: 'bankAccountHolder',
          width: 174
        },
          {
            title: '银行名称',
            key: 'bankName'
          },
          {
            title: '提现账号',
            key: 'bankAccount',
            width: 342
          },
          {
            title: '省(or国家)',
            key: 'province'
          },
          {
            title: '县市',
            key: 'city'
          }
        ],
        activeName: "5",
        names: ["loginlog", "mybanks", "chargelog", "lotteryreport", "cashflow", "securite", "members", "turnpoint", "spreadlink"]
      }
    },
    computed: mapState("account", ["companyBankAccountList",'saveMemberBankList',"address",]),
    methods: {
      ...mapActions("account", [
        "memberIfBind",
        'saveMemberBank'
      ]),
      routingReset(){
        let name = this.$router.history.current.name;
        this.names.forEach((item,index)=>{
          let reg = new RegExp(item,"g");
          if(reg.test(name)){
            this.activeName = String(index);
            return false
          }
        })
      },
      bindBankCard(name) {
        let data = {};
        data.name = this.formValidate.name;
        data.bankAccount = this.formValidate.bankAccount;
        data.bankBranch = this.formValidate.bankBranch;
//        data.bankName = '中国银行';
        data.branchCode = this.formValidate.branchCode;
        data.city = this.city;
        data.province = this.province;
        data.phone = this.formValidate.phone;
        data.tradePassword = hex_md5(this.formValidate.tradePassword);
        data.offshootName = this.formValidate.offshootName;
        data.companyBankId = this.formValidate.bankName ;
//        data.firstBankAccount = this.formValidate.firstBankAccount;
        this.$refs[name].validate((valid) => {
          if(valid) {
            this.saveMemberBank(data).then((res)=>{
              if(res.code == "1"){
                this.$Notice.error({
                  title: 'M5II通知',
                  desc: res.msg,
                });
              }else if(res.code == "0"){
                this.$Notice.success({
                  title: 'M5II通知',
                  desc: res.msg
                });
                this.$router.push({
                  path: '/account'
                })
              }
            });
          } else {
            this.$Message.error('请填写所有必填项');
          }
        })
      },
      changeRouter(name) {
        this.$router.push({
          name: this.names[name]
        })
      },
      change(we, rt) {
        this.formValidate.provinceOrCity = rt;
        this.city = rt[1].__label.split("/")[1];
        this.province = rt[1].__label.split("/")[0]
      },
      bankAccountValidate() {
        this.count = this.formValidate.bankAccount.length
      }
    },
    watch: {
      $route(to, from) {
        if(to.name == "securite"){
          this.$nextTick(()=>{
            this.activeName = "5";
            this.$refs.contactMenu.currentActiveName = "5";
          })

        }
      },
      model(){
        if(this.model === false){
          if( this.esc = '1' ){
            this.$router.push({
              path: '/bet'
            })
          }else {
            this.$router.push({
              path: '/account/securite'
            })
          }
        }else if(this.model === false){
          this.$router.push({
            path: '/account/securite'
          })
        }
      }
    }
  }
</script>

<style>
  .oneBank {
    width: 1200px;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 71.2px;
    margin: 0 auto;
    overflow: auto;
    font-size: 12px;
    background: #FFFFFF;
    padding:8px;
  }
  .oneBank .ivu-menu {
    margin-bottom: 12px;
  }

  .oneBank .ivu-menu .ivu-menu-item {
    font-size: 12px;
  }
  .ivu-form ivu-form-label-right{
    width: 800px;
  }
</style>
