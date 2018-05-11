<template>
	<div class="mybanks">
		<Modal v-model="modal" width="600">
			<p slot="header" style="color:#000000;text-align:center">
				<span>新增银行卡</span>
			</p>
			<div style="width: 340px;margin: 0 auto;">
				<Form :label-width="120" ref="formValidate" :model="formValidate" :rules="ruleValidate">
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
						<Input type="password" v-model="formValidate.tradePassword" placeholder=""></Input>
					</FormItem>
					<FormItem label="第一张银行卡号" prop="firstBankAccount">
						<Input v-model="formValidate.firstBankAccount" placeholder=""></Input>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="modal=false">取消</Button>
				<Button type="primary" @click="bindBankCard('formValidate')">绑定</Button>

				</Row>

			</div>
		</Modal>
		<Alert show-icon>
			使用提示
			<template slot="desc">
				<p>1.银行卡绑定成功后，平台任意区域都 <span style="color: red;font-weight: 900;">不会</span> 出现您的完整银行帐号，开户姓名等信息。</p>
				<p>2.每个游戏帐户最多绑定 <span style="color: red;font-weight: 900;">5</span> 张银行卡，您已经成功绑定 <span style="color: red;font-weight: 900;">{{memberBankAccountList.length}}</span>张。</p>
				<p>3.一个帐户只能绑定同一个开户人姓名的银行卡。</p>
			</template>
		</Alert>
		<div class="mybanks_table">
			<div class="table-title">
				<span>上次更新时间：<span>{{this.newTime}}</span>
            </span>
				<Button type="primary" @click="modal=true" v-if="memberBankAccountList.length < 5">
             	新增银行卡</Button>
			</div>
			<Table border :columns="columns" :data="memberBankAccountList"></Table>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapState } from "vuex";
	export default {
		created() {
			this.memberIfBind();
			this.time()
		},
		data() {
            let that =this;
			return {
        newBankBut:true,
        newTime:'',
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
			}
		},
		computed: mapState("account", ["memberBankAccountList", "companyBankAccountList", "address"]),
		methods: {
			...mapActions("account", [
				"memberIfBind",
				"saveMemberOtherBank"
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
			change(we, rt) {
				this.formValidate.provinceOrCity = rt;
				this.city = rt[1].__label.split("/")[1];
				this.province = rt[1].__label.split("/")[0]
			},
			bindBankCard(name) {
				let data = {};
        data.name = this.formValidate.name;
        data.bankAccount = this.formValidate.bankAccount;
        data.bankBranch = this.formValidate.bankBranch;
        data.bankName = '';
        data.branchCode = this.formValidate.branchCode;
        data.city = this.city;
        data.province = this.province;
        data.phone = this.formValidate.phone;
        data.tradePassword = hex_md5(this.formValidate.tradePassword);
        data.offshootName = this.formValidate.offshootName;
        data.companyBankId = this.formValidate.bankName ;
        data.firstBankAccount = this.formValidate.firstBankAccount;

//				data.bankAccount = this.formValidate.bankAccount;
//				data.bankBranch = this.formValidate.bankBranch;
//				data.bankName = "";
//				data.branchCode = this.formValidate.branchCode;
//				data.city = this.city;
//				data.province = this.province;
//				data.phone = this.formValidate.phone;
//				data.tradePassword = hex_md5(this.formValidate.tradePassword);
//				data.offshootName = this.formValidate.offshootName;
//				data.companyBankId = this.formValidate.bankName;
//				data.firstBankAccount = this.formValidate.firstBankAccount;

				this.$refs[name].validate((valid) => {
					if(valid) {
						this.saveMemberOtherBank(data).then((res)=>{
							if(res.code == "1"){

					this.$Notice.error({
                    title: 'M5II通知',
                    desc: res.msg
                });
							}else if(res.code == "0"){
				this.$Notice.success({
                    title: 'M5II通知',
                    desc: res.msg
                });
                this.modal = false;
                this.memberIfBind();
							}
						})
					} else {
						this.$Message.error('请填写所有必填项');
					}
				})
			},
			bankAccountValidate() {
				this.count = this.formValidate.bankAccount.length
			},
      handleReset (name) {
        this.$refs[name].resetFields();
      }
		},
    watch:{
      modal(){
        this.handleReset('formValidate')
      }
    }
	}
</script>

<style>
	.mybanks .mybanks_table .table-title {
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
</style>
