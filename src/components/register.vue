<template>
  <div id="register">
    <div>
      <img src="../../static/img/register_m5_logo.png" alt="">
    </div>
    <div class="register_nav">
      <div class="register_nav_img">
        <img src="../../static/img/login_banner.jpg" alt="">
      </div>
      <div class="register_nav_form">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom"  label-position="top">
          <FormItem label="账号" prop="account" >
            <Input type="text" v-model="formCustom.account"></Input>
          </FormItem>
          <FormItem label="昵称" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input type="text" v-model="formCustom.password" number></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')" long>注册</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  export default {
    data () {
      const account = (rule, value, callback) => {
        let regs = /^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        if (value === '') {
          callback(new Error('账号不能为空!'));
        } else if (!regs.test(value)) {
          callback(new Error('账号必须包含数字和字母,长度在6-16之间!'));
        } else {
          callback();
        }
      };
      const password = (rule, value, callback) => {
        let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        if (value === '') {
          callback(new Error('密码不能为空!'));
        }else if(!reg.test(value)){
          callback(new Error('密码为6-20位，至少包含数字和字母'));
        }else {
          callback();
        }
      };
      return {
        formCustom: {
          account: '',
          name: '',
          password: ''
        },
        ruleCustom: {
          account: [
            { validator: account, trigger: 'blur', required: true }
          ],
          name: [
            { trigger: 'blur', required: true, message: '请填写用户昵称' }
          ],
          password: [
            { validator: password, trigger: 'blur', required: true }
          ]
        }
      }
    },
     created(){
    	this.setIsLogin(false)
    },
    methods: {
      ...mapActions(['registerMember','setIsLogin']),
      register(){
        let windLocation = window.location.href;
        let urlId = windLocation.substring(windLocation.indexOf("register")+9,windLocation.length);
        if(urlId==""||urlId==null||urlId==undefined){
          urlId="ff80808162232b920162327de2270133";
        }
        let md5_pwd = hex_md5(this.formCustom.password);
        let params = {
          'memberAccount': this.formCustom.account,
          'password': md5_pwd,
          'memberName': this.formCustom.name,
          'promoteId': urlId,
          'way': '1'
        };
        this.registerMember(params).then((res) => {
          if (res.code === 0){
            this.$Message.success(res.msg);
            this.$router.replace({path: '/'})
          }else if(res.code != 0) {
            this.$Message.error(res.msg);
            this.formCustom.account = '';
            this.formCustom.name = '';
            this.formCustom.password = '';
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            this.$Message.error('填写必填参数!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>
<style>
  #register{
    width: 1000px;
    overflow: hidden;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 71.2px;
    margin: 0 auto;
    overflow: hidden;
    font-size: 12px;
    background: #ececec;
    padding:50px 8px;
    box-sizing: border-box;

  }
  .register_nav{
    height: 300px;
    border-radius: 7px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: #d7d7d7 0px 0px 3px 3px ;
  }
  .register_nav_img{
    width: 603px;
    height: 278px;
    float: left;
  }
  .register_nav_form{
    float: left;
    width: 260px;
    height: 280px;
    padding:5px 10px;
    box-sizing: border-box;
  }
</style>
