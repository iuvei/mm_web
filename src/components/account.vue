<template>
	<div class="account" v-if="show">
		<Menu ref="contactMenu" mode="horizontal" :active-name="activeName" @on-select="changeRouter">
			<MenuItem name="0"> 登入记录
			</MenuItem>
			<MenuItem name="1"> 我的银行卡
			</MenuItem>
			<MenuItem name="2"> 账变记录
			</MenuItem>
			<MenuItem name="3"> 彩票报表
			</MenuItem>
			<MenuItem name="4"> 金流记录
			</MenuItem>
      <!--<MenuItem name="10"> 分红契约
      </MenuItem>
      <MenuItem name="9"> 日工资契约
      </MenuItem>-->
			<MenuItem name="5"> 用户安全
			</MenuItem>
			<MenuItem name="6" v-if="userDetail.hierarchy!=0"> 代理会员
			</MenuItem>
			<!--<MenuItem name="7" v-if="userDetail.hierarchy!=0"> 转点下级-->
			</MenuItem>
			<MenuItem name="8" v-if="userDetail.hierarchy!=0"> 推广链接
			</MenuItem>
		</Menu>
		<router-view></router-view>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";
	import {bus} from '../bus.js'
	export default {
		created(){
			this.show = true;
		},
		mounted() {
      bus.$on('chargeLog',()=>{
        let that=this;
        new Promise(function (reslove,reject) {
          that.activeName='2';
          reslove();
        }).then(function () {
          that.changeRouter('2');
          that.routingReset();
        })
      })
      this.routingReset();
		},
		data() {
      let that =this;
			return {
				show:false,
				activeName: "5",
				names: ["loginlog", "mybanks", "chargelog", "lotteryreport", "cashflow", "securite", "members", "turnpoint", "spreadlink",]
//				"ddailypay" ,"dividend"
			}
		},
    computed:{
    	 ...mapState("account", ["companyBankAccountList",'saveMemberBankList',"address",]),
    	 ...mapState(["userDetail"]),
    },
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
          this.$nextTick(()=>{
            this.$refs.contactMenu.currentActiveName = this.activeName;
          })
					return false
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
      }
		},
		 watch: {
       $route(to, from) {
         if (to.name == "securite") {
           this.$nextTick(() => {
             this.activeName = "5";
             this.$refs.contactMenu.currentActiveName = "5";
           })
         }
       }
     }
	}
</script>
<style>
	.account {
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		overflow: auto;
		font-size: 12px;
		background: #FFFFFF;
		padding: 8px;
	}
	.account .ivu-menu {
		margin-bottom: 12px;
	}
	.account .ivu-menu .ivu-menu-item {
		font-size: 12px;
	}
</style>
