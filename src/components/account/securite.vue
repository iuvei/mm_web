<template>
	<div class="securite">
		<Modal v-model=modal1 width="700">
        <p slot="header" style="text-align:center">
            <span>修改登录密码</span>
        </p>
        <div style="text-align:center;width: 400px;margin: 0 auto;" >
          <Form ref="formCustom" label-position="right" :model="formCustom" :rules="ruleCustom" :label-width="100">
            <FormItem label="旧登陆密码:" prop="passwd">
              <Input type="password" v-model="formCustom.passwd"></Input>
            </FormItem>
            <FormItem label="新登陆密码:" prop="passwdCheck">
              <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
            <FormItem label="确认新密码:" prop="age">
              <Input type="password" v-model="formCustom.age" ></Input>
            </FormItem>
          </Form>
        </div>
      <div slot="footer" style="width: 88px;margin: 0 auto;">
        <Button type="primary" @click="handleSubmit('formCustom')">确认修改</Button>
      </div>
    </Modal>
    <Modal v-model=modal3 width="700">
        <p slot="header" style="text-align:center">
            <span>安全问题</span>
        </p>
      <div style="text-align:center;width: 400px;margin: 0 auto;" v-show=safety1 >
        <Form  :label-width="100" label-position="right">
          <FormItem label="安全问题:"   >
            <span style="float: left">{{this.safetyQuestion}}</span>
          </FormItem>
          <FormItem label="安全问题回答:" >
            <span style="float: left">* * * * * * * * * * * </span>
          </FormItem>
        </Form>
      </div>
        <div style="text-align:center;width: 400px;margin: 0 auto;" v-show=safety0  >
            <Form ref="formLeft" :model="formLeft" label-position="right" :rules="ruleCustom" :label-width="100">
              <FormItem label="选择安全问题:"   prop="inputA">
                <Select v-model="formLeft.inputA" style="text-align: left">
                  <Option :value=item[1]  v-for="(item,index) in SecurityQuestions" :key="index">{{item[0]}}</Option>
                </Select>
              </FormItem>
        <FormItem label="安全问题回答:"  prop="inputB">
            <Input v-model="formLeft.inputB"></Input>
        </FormItem>
    </Form>
        </div>
        <div slot="footer" style="width: 88px;margin: 0 auto;" v-show=safety0>
            <Button type="primary"  @click="handleSubmit('formLeft')">保存</Button>
        </div>
    </Modal>
    <Modal v-model=modal2 width="700">
        <p slot="header" style="text-align:center">
            <span>修改资金密码</span>
        </p>
        <div style="text-align:center;width: 400px;margin: 0 auto;" >
            <Form ref="formRight" :model="formRight"  label-position="right" :rules="ruleCustom" :label-width="110">
        <FormItem label="旧资金密码:" width="200"  prop="inputC">
            <Input type="password" v-model="formRight.inputC"></Input>
        </FormItem>
        <FormItem label="新资金密码:"  prop="inputD">
            <Input type="password" v-model="formRight.inputD"></Input>
        </FormItem>
        <FormItem label="确认新资金密码:"  prop="inputE">
            <Input type="password" v-model="formRight.inputE"></Input>
        </FormItem>
    </Form>
        </div>
        <div slot="footer" style="width: 88px;margin: 0 auto;">
            <Button type="primary" @click="handleSubmit('formRight')" >确认修改</Button>
        </div>
    </Modal>
		<div class="user-safe">
			<p class="main-title">用户安全</p>
			<div class="safe-detail">
				<div style="color:#f5a623;font-size: 18px;display: flex;justify-content: space-between;">
					<div>
					<Rate :count="3" disabled v-model="valueDisabled" :class="valueDisabled==3?'green':'yellow'" :allow-half="true"></Rate><span :class="{gradeTil:gradeTilCool}">{{this.grade}}</span>
				    </div>
				    <div>
				    	<p :class="{gradeTil:gradeTilCool}">您的安全等级为 {{grade}} <span v-show="gradeTil">，请完善安全信息</span></p>
				    </div>
					</div>
					<div style="display: flex;justify-content: space-between;align-items: center;margin: 30px 0;">
					<div style="display: flex;justify-content: space-between;width: 356px;">
						<img src="../../../static/img/loginpsw_on.png"/>
						<div style="display: flex;flex-direction: column;justify-content: space-around;">
							<p style="font-size:16px;color:#3daeff;">登录密码</p>
							<p style="font-size:12px;color: #999999;">建议您使用数字和大小写字母混合，最好8位数以上</p>
						</div>
					</div>
					<Button type="ghost" style="color:#3daeff;border:1px solid #3daeff ;" @click="modal1=true">修改登陆密码</Button>
					</div>
					<div style="display: flex;justify-content: space-between;align-items: center;margin: 30px 0;">
					<div style="display: flex;justify-content: space-between;width: 356px;">
						<img src="../../../static/img/cashpsw_on.png"/>
						<div style="display: flex;flex-direction: column;justify-content: space-around;">
							<p style="font-size:16px;color:#3daeff;">资金密码</p>
							<p style="font-size:12px;color: #999999;">建议您使用数字和大小写字母混合，最好8位数以上</p>
						</div>
					</div>
					<Button type="ghost" style="color:#3daeff;border:1px solid #3daeff ;" @click="modal2=true">修改资金密码</Button>
					</div>
					<div style="display: flex;justify-content: space-between;align-items: center;margin: 30px 0;">
					<div style="display: flex;justify-content: space-between;width: 370px;">
						<img class="safetyImg" :src= "safetyImg" />
						<div style="display: flex;flex-direction: column;justify-content: space-around;">
							<p class="nav"  :class="{red:changeRed}">{{this.safetyTexe}}</p>
							<p style="font-size:12px;color: #999999;">安全问题可以帮助您找回或重设密码，请牢记安全问题</p>
						</div>
					</div>
					<Button type="ghost" style="color:#3daeff;border:1px solid #3daeff ;" @click="modal3=true">{{this.safety}}</Button>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    var SecurityQuestion = [
      [
        "您的母亲姓名是？",
        "1"
      ],
      [
        "您配偶的生日是？",
        "2"
      ],
      [
        "您的学号()或工号是？",
        "3"
      ],
      [
        "您母亲的生日是？",
        "4"
      ],
      [
        "您高中班主任的姓名是？",
        "5"
      ],
      [
        "您父亲的姓名是？",
        "6"
      ],
      [
        "您小学班主任的姓名是？",
        "7"
      ],
      [
        "您父亲的生日是？",
        "8"
      ],
      [
        "您配偶的姓名是？",
        "9"
      ],
      [
        "您初中班主任的姓名是？",
        "10"
      ],
      [
        "您最熟悉的童年好友姓名是？",
        "11"
      ],
      [
        "您最熟悉的学校宿舍室友姓名是？",
        "12"
      ],
      [
        "对您影响最大的人的姓名是？",
        "13"
      ]
    ];
	  export default {
        data () {
          const validatePass = (rule, value, callback) => {
            let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
            if (value === '') {
              callback(new Error('请输入旧密码!'));
            } else if (!reg.test(value)) {
              callback(new Error('旧密码为6-20位，至少包含数字和字母'));
            } else {
              callback();
            }
          };
          const validatePassCheck = (rule, value, callback) => {
            let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
            if (value === '') {
              callback(new Error('请输入新密码!'));
            }else if (!reg.test(value)) {
              callback(new Error('请填写新登录密码。密码6-20位，至少包含数字和字母'));
            } else if (value === this.formCustom.passwd) {
              callback(new Error('请重新填写新密码，新密码不能与旧密码相同'));
            } else {
              callback();
            }
          };
          const validateAge = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入新密码!'));
            } else if (value !== this.formCustom.passwdCheck) {
              callback(new Error('请填写新登录密码， 两次新登录密码必须相同'));
            } else {
              callback();
            }
          };
          const inputA = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入新密码!'));
            }
//            else if (value !== this.formCustom.passwdCheck) {
//              callback(new Error('请填写新登录密码，两次新登录密码必须相同'));
//            }
            else {
              callback();
            }
          };
          const inputC = (rule, value, callback) => {
            let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
            if (value === '') {
              callback(new Error('请输入当前资金密码!'));
            } else if (!reg.test(value)) {
              callback(new Error('当前密码是6-20位，包含数字和字母'));
            } else {
              callback();
            }
          };
          const inputD = (rule, value, callback) => {
            let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
            if (value === '') {
              callback(new Error('请输入新的资金密码!'));
            } else if (!reg.test(value)) {
              callback(new Error('请填写新资金密码。密码6-20位，至少包含数字和字母'));
            }else if (value === this.formRight.inputC) {
              callback(new Error('请重新填写新密码，新密码不能与旧密码相同'));
            } else {
              callback();
            }
          };
          const inputE = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入新的资金密码!'));
            }else if(value !== this.formRight.inputD) {
              callback(new Error('请再次输入新的资金密码， 两次新资金密码必须相同'));
            }else {
              callback();
            }
          };
            return {
                gradeTilCool: false,
                gradeTil: true,
                safetyQuestion: '',
                changeRed: false,
                safetyImg: '../../../static/img/safeqa_off.png',
                safetyTexe: '设置安全问题',
                safety1: false,
                safety0: true,
                grade: '中',
                safety: '设置安全问题',
                SecurityQuestions: SecurityQuestion,
                valueDisabled: 2,
                modal1: false,
                modal2: false,
                modal3: false,
                formLeft: {
                    inputA: '',
                    inputB: ''
                },
              formRight:{
                inputC: '',
                inputD: '',
                inputE: ''
              },
              formCustom: {
                passwd: '',
                passwdCheck: '',
                age: ''
              },
              ruleCustom: {
                passwd: [
                  { validator: validatePass, required: true, trigger: 'blur' }
                ],
                passwdCheck: [
                  { validator: validatePassCheck, required: true, trigger: 'blur' }
                ],
                age: [
                  { validator: validateAge, required: true, trigger: 'blur' }
                ],
                inputA:[
                  { validator: inputA, required: true, trigger: 'blur', message: '请选择安全问题'}
                ],
                inputB:[
                  {required: true, trigger: 'blur', message: '请填写安全问题的答案'}
                ],
                inputC:[
                  { validator: inputC,
                    required: true,
                    trigger: 'blur'
//                    message: '请输入当前资金密码'
                  }
                ],
                inputD:[
                  { validator: inputD, required: true, trigger: 'blur'}
                ],
                inputE:[
                  { validator: inputE, required: true, trigger: 'blur'}
                ]
              }
            }
        },
     created(){
        this._SafeQuestion();
     },
     computed:{
//       ...mapState('account',['querySafeQuestionList','updateLoginPasswordList','saveSafeQuestionList']),
       ...mapState('account',['querySafeQuestionList']),
       ...mapState('account',['updateLoginPasswordList']),
       ...mapState('account',['saveSafeQuestionList','userDetail']),
       ...mapState('account',['updateTradePasswordList'])
     },
     methods: {
       ...mapActions('account',['querySafeQuestion']),
       ...mapActions('account',['updateLoginPassword']),
       ...mapActions('account',['saveSafeQuestion']),
       ...mapActions('account',['signOut']),
       ...mapActions('account',['updateTradePassword']),
       _SafeQuestion(){
         this.querySafeQuestion().then((res) =>{
           if(res.code === 1){
             this.valueDisabled = 3;
             this.grade = "高";
             this.safety = "查看安全问题";
             this.safety0 = false;
             this.safety1 = true;
             this.safetyTexe = '安全问题';
             this.safetyImg = '../../../static/img/safeqa_on.png';
             this.changeRed = true;
             this.safetyQuestion = SecurityQuestion[parseInt(res.data)][0];
             this.gradeTil = false;
             this.gradeTilCool = true;
           }
         })
       },
       // 修改登录密码
       LoginPassword(){
         let oldP = hex_md5(this.formCustom.passwd);
         let newp = hex_md5(this.formCustom.passwdCheck);
         let data = {
           'oldPassword': oldP,
           'newPassword': newp
         };
         this.updateLoginPassword(data).then( res => {
           if(res.code === 0){
             this.$Message.success(res.msg);
             this.modal1 = false;
             this.outLonin()
           }else{
             this.$Message.error(res.msg);
           }
         })
       },
       // 登出
       outLonin(){
         this.signOut().then((res) => {
           if(res.code === 0) {
             this.$router.push({
               path: '/'
             })
           }
         })
       },
       // 保存安全问题
       SafeQuestion(){
         let data = {
           'safeQuestion': this.formLeft.inputA,
           'safeQuestionAnswer': this.formLeft.inputB
         };
         this.saveSafeQuestion(data).then((res) =>{
//         console.log(this.saveSafeQuestionList)
           if(res.code === 0){
             this.$Message.success(res.msg);
             this.modal3 = false;
             this.handleReset('formLeft');
             this._SafeQuestion()
           }else {
             this.$Message.error(res.msg);
           }
         });

       },
       // 修改资金密码
       TradePassword(){
         let data = {
           'newPassword': hex_md5(this.formRight.inputD),
           'oldPassword': hex_md5(this.formRight.inputC)
         };
         this.updateTradePassword(data).then((res) => {
           if(res.code === 0){
             this.$Message.success(res.msg);
             this.modal2 = false;
             this.handleReset('formRight')
           }else {
             this.$Message.error(res.msg);
           }
         })
       },
       handleSubmit (name) {
         if(name === 'formCustom') {
           this.$refs[name].validate((valid) => {
             if (valid) {
               this.LoginPassword();
             } else {
               this.$Message.error('请按要求填写必填项!');
             }
           });
         }else if(name === 'formRight'){
           this.$refs[name].validate((valid) => {
             if (valid) {
               this.TradePassword();
             } else {
               this.$Message.error('请按要求填写必填项!');
             }
           });
         }else if( name === 'formLeft'){
           this.$refs[name].validate((valid) => {
             if (valid) {
               this.SafeQuestion();
             } else {
               this.$Message.error('请按要求填写必填项!');
             }
           });
         }
       },
       handleReset (name) {
         if(name === 'formCustom'){
           this.$refs['formCustom'].resetFields();
         }else if(name === 'formLeft'){
           this.$refs['formLeft'].resetFields();
         }else if(name === 'formRight'){
           this.$refs['formRight'].resetFields();
         }
       },

     },
      watch:{
        modal1(){
          this.handleReset('formCustom')
        },
        modal2(){
          this.handleReset('formRight')
        },
        modal3(){
          this.handleReset('formLeft')
        }
      }
    }


</script>

<style>
	.securite{
		font-size: 20px;
	}
	.securite .user-safe .safe-detail{
		width: 800px;
		padding: 50px;
		background: #f5f5f5;
        border-radius: 10px;
		margin: 0 auto;
	}

	.securite .user-safe .main-title {
	padding: 20px 0;
    font-size: 20px;
    text-align: center;
    padding: 20px 0;
    color: #108ee9;
}
  .nav{
    font-size:16px;
    color:#f06868;
  }
  .red{
    color: #108ee9;
  }
  .gradeTil{
    color: #51a522;
  }
  .securite .green .ivu-rate-star-full:before{
    color: #21c546 !important;
  }
  .securite .yellow .ivu-rate-star-full:before{
    color: #f5a623 !important;
  }
  
</style>
