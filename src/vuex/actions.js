import axios from "axios";
import Vue from "vue";
import router from "../router/index.js";
import { fetch } from '@/services/fetch';
import bet_fn from '@/services/bet_fn.js';
import baseUrl from '../gobal.js'
// axios.defaults.baseURL = "http://localhost:7000";    // 本地开发环境  baseURL
axios.defaults.baseURL = baseUrl; // 本地开发环境  baseURL
axios.defaults.headers.post['Content-Type'] = 'Content-Type:applycation/json';
//允许跨域
axios.defaults.withCredentials = true;

// axios.defaults.baseURL =  "http://47.94.208.182:7300";   //  linux 服务器 baseURL

export default {
	//登陆
	async userLogin({commit},params){
		let res = await fetch('post','userLogin',params)
		return res
	},
  // 注册
  async registerMember({commit},params){
    let res = await fetch('post','registerMember',params);
    // commit("registerMember", res.data)
    return res
  },
	//获取所有玩法说明
	async getGamesInfo({commit}){
		let res = await fetch('get','getGamesInfo')
		commit("getGamesInfo", res.data)
		return res
	},
	//获取侧边栏列表数据
	async getKind({commit}){
		let res = await fetch('get','getKind')
		commit("getKind", res.data)
	},
  //获取公告
  async queryMemberNoticeList({commit},params){
    let res = await fetch('get','queryMemberNoticeList',params);
    if(params==='?notice_type=3'){
      commit("queryMemberNoticeList1", res.data)
    }else if(params==="?notice_type=2&type=1"){
      commit("queryMemberNoticeList2", res.data)
      return res
    }else if(params==="?notice_type=2&type=2"){
    	return res
    }
  },
  async queryNoticeAlertList({commit},params){
    let res = await fetch('get','queryNoticeAlertList',params);
    commit("queryNoticeAlertList", res.data);
    return res
  },
  //删除公告
  async deleteNoticeAlert({commit},params){
    let res = await fetch('get','deleteNoticeAlert',params);
    commit("deleteNoticeAlert", res.code);
  },
  //查询充值
  async queryIncome({commit}){
    let res = await fetch('get','queryIncome');
    commit("queryIncome", res.data);
  },
  //查询银行
  async queryBank({commit},params){
    let res = await fetch('post','queryBank',params);
    commit("queryBank", res);
  },
  //读取信息
  async updateNoticeAlert({commit},params){
    let res = await fetch('get','updateNoticeAlert',params);
    commit("updateNoticeAlert", res.code);
  },
  //查询提现
  async queryDrawCondition({commit}){
    let res = await fetch('get','queryDrawCondition');
    commit("queryDrawCondition", res.data);
    return res
  },
  //个人报表
  async queryMemberReport({commit},params){
    let res = await fetch('post','queryMemberReport',params);
    commit("queryMemberReport", res.data);
    return res
  },
  //侧边栏切换小彩类(kindId)
	onSelectKindOrclassId({commit},data){
		commit("onSelectKindOrclassId",data)
	},
//	//获取投注面板数据
//	getDataList({commit}, obj) {
//		commit("getDataList", obj)
//	},
	//手动设置登陆状态
	setIsLogin({commit},boolen){
		commit("setIsLogin", boolen)
	},
	//获取投注面板数据以及所有玩法说明
	getDataOrSubGameList({commit},obj){
		commit("getDataOrSubGameList", obj)
	},
	//添加到购彩蓝
    addShoppingBasket({commit},data){
    		commit("addShoppingBasket", data)
    },
    //投注
    async quickBet({commit},params){
		let res = await fetch('post','quickBet',params)
		return res
	},
	//初始化投注面板样式
	initStyle({commit}){
		commit("initStyle")
	},
	//获取彩种倒计时
	async getTimes({commit},params){
		let res = await fetch('get','getTimes',params)
		commit("getTimes",{res:res,classId:params[1]})
		return res
	},
	setTimes({commit},data){
		commit("setTimes",data)
	},
	async getWinsDragon({commit},params){
		let res = await fetch('get','getWinsDragon',params)
		commit("getWinsDragon",res)
		return res
	},
	async getUserDetail({commit}){
		let res = await fetch('get','getUserDetail')
		commit("getUserDetail",res)
		return res
	},
	async signOut({commit}){
		let res = await fetch('get','signOut')
		return res
	},
	async queryDocumentContentList({commit}){
		let res = await fetch('get','queryDocumentContentList')
		commit("queryDocumentContentList",res)
		return res
	},
	setChasingNoteList({commit},data){
		commit("setChasingNoteList",data)
	},
	setSelectMode({commit},value){
		commit("setSelectMode",value)
	},
	sendMessage({commit},msg){
		commit("sendMessage",msg)
	},
	setRecentQuickBetList({commit},data){
		commit("setRecentQuickBetList",data)
	},
	updateAwarPeriod({commit},data){
		commit("updateAwarPeriod",data)
	},
	async queryLotteryOrderOwn({commit},data){
		let res = await fetch('post','queryLotteryOrderOwn',data)
		commit("queryLotteryOrderOwn",res)
		return res
	},
	async queryMemberReportOne({commit},data){
		let res = await fetch('post','queryMemberReportOne',data)
		return res
	},
	async cancelOrder({commit},arr){
		let res = await fetch('post','cancelOrder',arr)
		return res
	},
	async visitorLogin({commit},data){
		let res = await fetch('post','visitorLogin',data)
		return res
	},
	async oneTouchUrl_1({commit},data){
		let res = await fetch('post','oneTouchUrl_1',data)
		return res
	},
	async getChartMapList({commit},data){
		let res = await fetch('get','getChartMapList',data)
		commit("getChartMapList",res)
		return res
	},
	init({commit},data){
		commit("init",data)
	},
	initState({commit}){
		commit("initState")
		return true
	},
//	getGamesInfo({
//		commit
//	}, url) {
//		axios.get(url, {
//			emulateJSON: true
//		}).then(res => {
//			return res.data.data
//		}).then(json => {
//			commit("getGamesInfo", json)
//		}).catch(function(error) {
//			console.log(error)
//		})
//	},
//	//
	gamePlay({
		commit
	}, url) {
		axios.get(url, {
			emulateJSON: true
		}).then(res => {
			return res.data.data
		}).then(json => {
			commit("gamePlay", json)
		}).catch(function(error) {
			console.log(error)
		})
	},
	//获取长龙及开奖期数
	winsDragon({
		commit
	}, data) {
		axios.get(data.url, {
			emulateJSON: true
		}).then(res => {
			return res.data.data
		}).then(json => {
			commit("winsDragon", json)
		}).catch(function(error) {
			console.log(error)
		})
	},
//	//点击投注面板按钮
//	onSelect({
//		commit
//	}, obj) {
//		commit("onSelect", obj)
//	},
//	//快捷选号
//	quickSelect({
//		commit
//	}, obj) {
//		commit("quickSelect", obj)
//	},
//	//添加注单到购彩蓝
//	insererNote({
//		commit
//	}, data) {
//		commit("insererNote", data)
//	},
	//删除注单
	removeShoppingList({
		commit
	}, data) {
		commit("removeShoppingList", data)
	},
	//选择子彩种(kindId)
	onSelectKind({
		commit
	}, data) {
		commit("onSelectKind", data)
	},
//	//选择大彩种(classId)
//	onSelectClassId({
//		commit
//	}, data) {
//		commit("onSelectClassId", data)
//	},
	//选择GameName
	ChangeGameName({
		commit
	}, data) {
		commit("ChangeGameName", data)
	},
	//选择子玩法
	SelectSubGame({
		commit
	}, data) {
		commit("SelectSubGame", data)
	},
	//清空购彩篮数据
	clearShoppingList({
		commit
	}) {
		commit("clearShoppingList")
	},
	//提交投注参数
//	betChipIn({
//		commit
//	}, data) {
//		commit("betChipIn", data)
//	},
	//下注
//	axios({
//		commit
//	}, data) {
//		axios({
//					method: 'post',
//					url: '/inter/ticket/chipIn',
//					data: data
//				}).then(function(data) {
//					commit("axios", {code:data.data.code,msg:data.data.msg})
//				}).catch(function(error) {
//					console.log(error)
//				})
//
//	},
	//获取子玩法信息列表
	subGames({
		commit
	}, data) {
		axios({
			method: 'post',
			url: data.url,
			data: {
				gameIds:data.data
			}
		}).then(res => {
			return res.data.data
		}).then(json => {
			console.log(json)
			commit("subGames", json)
		}).catch(function(error) {
			console.log(error)
		})
	},

}
