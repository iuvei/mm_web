<template>
	<div class="login_from">
		<div class="login-title">会员登录</div>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="0" style="width:256px">
			<FormItem :label-width="0" prop="user">
				<Input type="text" @on-enter="login('formCustom')" placeholder="请输入用户名" v-model="formCustom.user"></Input>
			</FormItem>
			<FormItem :label-width="0" prop="pwd">
				<Input type="password" @on-enter="login('formCustom')" placeholder="请输入密码" v-model="formCustom.pwd"></Input>
			</FormItem>
			<FormItem :label-width="0" prop="validateCode" class="validateCode_inp">
				<Input type="text" @on-enter="login('formCustom')" placeholder="请输入验证码" v-model="formCustom.validateCode" style="width: 142px;"></Input>
				<div id="validateCode" :style="validateCode" @click="updatevValidateCode"></div>
			</FormItem>

			<FormItem style="margin-bottom: 12px;">
				<Button type="primary" :loading="modal_loading" @click="login('formCustom')">登陆</Button>
				<Button type="ghost" :loading="modal_loading2" @click="touristLogin('formCustom')" style="margin-left: 8px">试玩</Button>
			</FormItem>
			<div><span class="bg_icon"></span><span>忘记密码？</span>
				<!--<a style="color: rgb(218, 37, 29);" href="https://messenger.providesupport.net/messenger/0jqsflyt6rgek1v5new4nlcvoe.html" target="_blank"><b>在线客服</b></a>-->
        <a style="color: rgb(218, 37, 29);margin-right: 10px;" href="https://messenger.providesupport.net/messenger/0jqsflyt6rgek1v5new4nlcvoe.html" target="_blank"><b>在线客服</b></a>
           <router-link to="/register" >立即注册</router-link>
			</div>
		</Form>

	</div>
</template>
<script>
	import { mapState, mapActions } from "vuex";
	import baseUrl from '../gobal.js'

	export default {
		created() {
			this.$destroy()
			this.setIsLogin(false)
			this.updatevValidateCode()
		},
		data() {
			return {
				modal_loading2:false,
				modal_loading: false,
				formCustom: {
					user: '',
					pwd: '',
					validateCode: ''
				},
				ruleCustom: {
					user: [{
							trigger: 'blur'
						},
						{
							validator(rule, value, callback, source, options) {
								var errors = [];
								if(value === '') {
									callback(new Error('用户名不能为空'));
								} else {
									let reg = /^[A-Za-z0-9]{6,16}$/
									if(!reg.test(value)) {
										callback(new Error('账号必须包含数字和字母,长度在6-16之间!'));
									}
								}
								callback(errors);
							}
						}
					],
					pwd: [{
							trigger: 'blur'
						},
						{
							validator(rule, value, callback, source, options) {
								var errors = [];
								let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
								if(value === '') {
									callback(new Error('密码不能为空'));
								} else if(!reg.test(value)) {
									callback(new Error('密码6-20位，至少包含数字和字母'));

								}
								callback(errors);
							}
						}
					],
					validateCode: [{
							trigger: 'blur'
						},
						{
							validator(rule, value, callback, source, options) {
								var errors = [];
								let reg = /^[0-9]{4}$/;
								if(value === '' || !reg.test(value)) {
									callback(new Error('请填写4位数字验证码'));
								}
								callback(errors);
							}
						}
					]
				},
				validateCode: {
					"background": ""
				},
			}
		},
		computed: mapState(["isLogin"]),
		methods: {
			...mapActions([
				"userLogin",
				"setIsLogin",
				"visitorLogin",
				"getUserDetail"
			]),
			updatevValidateCode() {
				let timestamp = Date.parse(new Date());
				this.validateCode = {
					"background": "url("+baseUrl+"/inter/user/validateCode?" + timestamp + ") 45% 100%"
				}
			},
			touristLogin(name){

				this.$refs[name].validateField('validateCode',(msg)=>{
					if(msg==''){
						this.modal_loading2 = true;
						let validationCode = {"validationCode": this.formCustom.validateCode}
						this.visitorLogin(validationCode).then((res)=>{
                             
							if(res.code=='302'){
								this.modal_loading2 = false;
								this.updatevValidateCode();
								this.$Notice.error({
									title: 'M5Ⅱ通知',
									desc: res.msg
								});
							}else if(res.code == '0'){

								this.getUserDetail().then((res)=>{
								this.modal_loading2 = false;
								this.setIsLogin(true)
								this.$router.push({
									name: "bet"
								})
			                   })


							}
						})
					}

				})
			},
			login(name) {
				this.$refs[name].validate((valid) => {
					if(valid) {
						this.modal_loading = true;
						let md5_pwd = hex_md5(this.formCustom.pwd);
						let params = {
							'loginFrom': "1",
							'password': md5_pwd,
							"username": this.formCustom.user,
							"validationCode": this.formCustom.validateCode
						}
						this.userLogin(params).then(res => {

							if(res.code === 0) {
								this.getUserDetail().then((res)=>{
								this.modal_loading = false;
								this.setIsLogin(true);
								this.$router.push({
									name: "bet"
								})
			                   })

							} else {
								this.modal_loading = false;
								this.$Notice.error({
									title: 'M5Ⅱ通知',
									desc: res.msg
								});
								this.updatevValidateCode();
							}

						}).catch(err => {

						})
					}
				})

			},

		},
		watch: {
			isLogin(val) {
				this.$Notice.warning({
					title: 'M5II通知',
					desc: '退出登录',
				});
			}
		}

	}
</script>

<style>
	#validateCode {
		display: inline-block;
		width: 110px;
		height: 32px;
		vertical-align: middle;
		line-height: normal;
	}

	.login_from {
		float: left;
		width: 300px;
		height: 324px;
		margin-top: 13px;
		z-index: 999;
		padding: 10px 20px;
		background-color: rgba(37, 39, 46, .07);
		border: 2px solid rgba(255, 255, 255, .42);
		border-radius: 5px;
		color: #fff;
		box-sizing: border-box;
	}

	.login_from .login-title {
		margin-top: 10px;
		font-size: 22px;
		font-weight: 700;
		text-align: center;
		margin-bottom: 15px;
		letter-spacing: 4px;
		color: #dbdcd9;
	}

	.login_from .ivu-form-item-content .ivu-btn {
		padding: 0;
	}

	.login_from .ivu-form-item-content .ivu-btn:nth-child(1) {
		width: 120px;
		height: 32px;
		line-height: 32px;
		background: linear-gradient(0, #7c5529 8%, #c18446 48%, #d9c18e 89%);
		float: left;
		font-size: 14px;
		color: #FFFFFF;
		border: none;
	}

	.login_from .ivu-form-item-content .ivu-btn:nth-child(2) {
		width: 120px;
		height: 32px;
		line-height: 32px;
		background: linear-gradient(0, #2f323c 4%, #a8a8a8 100%);
		float: right;
		font-size: 14px;
		color: #FFFFFF;
		border: none;
	}

	.login_from .validateCode_inp input {
		border-right: none;
		border-radius: 4px 0 0 4px;
	}

	.login_from .validateCode_inp .ivu-form-item-content {
		display: flex;
	}

	.login_from .validateCode_inp #validateCode {
		width: 100px;
		height: 32px;
		cursor: pointer;
		box-sizing: border-box;
		background: transparent no-repeat center/cover;
	}

	.login_from .validateCode_inp .ivu-input-wrapper {
		flex: 1;
	}

	.login_from .bg_icon {
		display: inline-block;
		width: 18px;
		height: 18px;
		margin-right: 5px;
		background: url(../../static/img/login_tip.png);
		vertical-align: text-bottom;
	}
</style>
