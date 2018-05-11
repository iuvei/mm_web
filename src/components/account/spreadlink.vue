<template>
	<div class="spreadlink">
		<Form :label-width="286" :model="formLeft">
			<FormItem label="推广链接：">
				<div style="color: rgba(0,0,0,.65);">
					<span class="copyBtn">{{this.queryPromoteUrlList.promoteUrl}}</span>
					<!--<span class="copyBtn">{{this.url}}</span>-->
					<Button type="primary" v-clipboard:copy=this.queryPromoteUrlList.promoteUrl v-clipboard:success="onCopy" v-clipboard:error="onError" style="margin-left: 10px;">复制  </Button>
				</div>
				<p>可复制到
					<a href="http://dwz.wailian.work/index.php" target="view_window">新浪短地址</a>或
					<a href="https://parg.co/" target="view_window">parg.co</a>获取短地址</p>
			</FormItem>
			<!--<FormItem label="短地址：">
				<Button v-show="playBut" type="primary" @click="shortAddress()" style="margin-left: 20px;" :loading="modal_loading">一键生成短地址 </Button>
				<div v-show="onBut">
					<span style="width: 200px;">{{shortUrl}}</span>
					<Button type="primary" style="margin-left: 20px;" v-clipboard:copy=this.shortUrl v-clipboard:success="onCopy" v-clipboard:error="onError">复制 </Button>
				</div>
			</FormItem>-->
			<FormItem label="是否有代理功能：">
				<RadioGroup v-model="formLeft.radio">
					<Radio label="0" name="sf" checked="checked">是</Radio>
					<Radio label="1" name="sf">否</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="已成功推荐人数：">
				<span>{{this.queryPromoteUrlList.successNumber}}人</span>
			</FormItem>
			</FormItem>
			<FormItem :label=item.lotteryClassName v-for="(item, index) in childRebateList" :key="index">
				<div @click="indexN(index)" style="width: 81px;display: inline">
					<InputNumber @on-change="inp" :max=item.rebatePoint :min=item.minRebatePoint :value=item.childRebatePoint></InputNumber>
				</div>
				<span>上限 {{item.rebatePoint}}% 下限 {{item.minRebatePoint}}%</span>
			</FormItem>
			<FormItem>
				<Button type="primary" style="font-size: 14px;" @click="savePromote()">保存</Button>
			</FormItem>
		</Form>
	</div>
</template>
<script>
	import { mapActions, mapState } from 'vuex';
	//  import axios from 'axios';
	//import Clipboard from 'clipboard.min.js';
	let clipboard = new Clipboard('.copyBtn');
	export default {
		data() {
			return {
				url: '192.168.0.138:8080/register/ff80808160b00a1f0160b010905a0012',
				childRebateList: [],
				formLeft: {
					radio: '0',
					inpNum: []
				},
				IndexN: '',
				peiIndex: '',
				playBut: true,
				onBut: false,
				shortUrl: '',
				modal_loading: false,
				shortAddressText: ''
			}
		},
		created() {
			this.PromoteUrl();
		},
		computed: {
			...mapState('account', ['queryPromoteUrlList', 'savePromoteUrlList'])
		},
		methods: {
			...mapActions('account', ['queryPromoteUrl', 'savePromoteUrl']),
			PromoteUrl() {
				this.queryPromoteUrl().then((res) => {
					this.childRebateList = this.queryPromoteUrlList.childRebateList;
					//              console.log(this.childRebateList,'123');
					this.childRebateList.forEach((item) => {
						//                this.childRebatePoint = item.childRebatePoint;
					})
				})
			},
			savePromote() {
				let data = {
					'childHierarchy': this.formLeft.radio,
					'childRebateList': this.childRebateList
				};
				this.savePromoteUrl(data).then((res) => {
					if(res.code === 0) {
						this.$Message.success(res.msg);
					} else {
						this.$Message.error(res.msg);
					}
				})
			},
			inp(val) {
				this.peiIndex = val;
				this.childRebateList[this.IndexN].childRebatePoint = val;
			},
			indexN(index) {
				this.IndexN = index;
			},
			// 复制
			copyUrl() {
				let clipBoardContent = this.queryPromoteUrlList.promoteUrl;
				//            window.clipboardData.setData("Text",clipBoardContent);
				this.$Message.success('复制成功!');
			},
			onCopy: function(e) {
				this.$Message.success('复制成功!');
			},
			onError: function(e) {
				this.$Message.error('无法复制文本!')
			},
			// 一键生成短地址
			shortAddress() {
				this.modal_loading = true;
				var instance = this.$http.create({}) // 这样创建出来的 只需要：
				instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
				instance({
					baseURL: 'https://parg.co/api/shorten',
					method: 'post',
					transformRequest: [function(data) {
						let ret = ''
						for(let it in data) {
							ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
						}
						return ret
					}],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: {
						'url': this.queryPromoteUrlList.promoteUrl,
						'email': 'fh345392977@gmail.com',
						'api_key': '1cabcd44e2a41b7268399e3181ab34c2'
					}
				}).then((data) => {
					this.shortUrl = data.data.short_url;
					this.modal_loading = false;
					this.playBut = false;
					this.onBut = true;
				}).catch(function(error) {
					//              this.$Message.error( error.result)
				});

			}
		}
	}
</script>