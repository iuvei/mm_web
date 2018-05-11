import fn from "../../static/js/commun.js";
import store from "./store.js";
export default {
	getGamesInfo(state, data) {
		state.GameList = data
	},
	getKind(state, json) {
		state.kindList = json;
	},
	setIsLogin(state, boolen) {
		state.isLogin = boolen
	},
  queryMemberNoticeList1(state,json){
    state.NoticeList1=json;
  },
  queryMemberNoticeList2(state,json){
    state.NoticeList2=json;
  },
  queryNoticeAlertList(state,json){
    state.AlertList=json;
  },
  deleteNoticeAlert(state,code){
    state.deleteNotice=code;
  },
  updateNoticeAlert(state,code){
    state.updateAlert=code;
  },
  queryIncome(state,json){
    state.Income=json;
  },
  queryBank(state,json){
    state.Bank=json.data;
    state.status=json.code;
  },
  queryDrawCondition(state,json){
    state.DrawCondition=json
  },
  queryMemberReport(state,json){
    state.MemberReport=json
  },
  setIsOnline(state,boolen){
		state.isOnline = boolen;
	},
	getDataList(state, obj) {
		state.betDataList = createBetNumbers(obj)
	},
	getDataOrSubGameList(state, obj) {
		state.betDataList = obj.data;
		
		state.oddTxtShow = obj.oddTxtShow;
		state.subGameId = obj.subGameId;
		state.leftName = obj.leftName;
		state.rightName = obj.rightName;
		state.subGameList = obj.subGameList;
		
		
		
		
	},
	addShoppingBasket(state, data) {
		state.lotteryDatas = data;
		state.lotteryData = state.lotteryDatas[state.kindId]
		Object.assign({}, state)
	},
	initStyle(state) {
		state.betDataList.numbers.forEach((item1) => {
			item1.cols.forEach((item2) => {
				item2.data_selected = false;
			})
		})
	},
	getTimes(state, data) {
		state.times[data.classId] = data.res.data;
		state.times = Object.assign({},state.times)
	},
	setTimes(state, data) {
		state.timeTxts = data[0]
		state.seconds = data[1]
	},
	getWinsDragon(state, data) {
		state.dragons = data.data.dragons;
        state.hotCold = data.data.hotCold;
        state.omit = data.data.omit;
		state.winList = data.data.winList
		state.awarPeriod = data.data.winList[0].awarPeriod;
		if(data.data.winList[1]){
			state.prevAwarPeriod = data.data.winList[1].awarPeriod
		}
		
	},
	getUserDetail(state, data) {
		state.userDetail = data.data;
		state.userDetail = Object.assign({},state.userDetail)

	},
	setChasingNoteList(state, data) {
		state.cachingArray  = data.cachingArray;
		state.chaseStop = data.chaseStop;
		state.confirmBetType = data.confirmBetType;
	},
	setSelectMode(state, value) {
		state.selectMode = value;
	},
	removeShoppingList(state, data) {
		let kindId = state.kindId,
			index = data.index;
		state.lotteryDatas[kindId].splice(index, 1)
		state.lotteryData = state.lotteryDatas[kindId]

	},
	onSelectKindOrclassId(state, data) {
		state.kindId = data.split("-")[0];
		state.classId = data.split("-")[1];
		state.lotteryData = state.lotteryDatas[state.kindId];
	},
	clearShoppingList(state) {
		let kindId = state.kindId;
		state.lotteryDatas[kindId] = [];
		state.lotteryData = state.lotteryDatas[kindId];
	},
	setRecentQuickBetList(state,data){
		let kindId = data[0].kindId;
		let ary = state.recentQuickBetList[kindId];
		if(!ary){
			ary = []
		}
		state.recentQuickBetList[kindId] = ary.concat(data);
		state.recentQuickBetList = Object.assign({},state.recentQuickBetList)
	},
	updateAwarPeriod(state,data){
		state.awarPeriod = data;
	},
	queryDocumentContentList(state,data){
		state.activityDocumentList = data;
	},
  transmitTimes(state,date){
    state.Times=date
  },
//	betChipIn(state, data) {
//		let numbers = fn.presentation(state.newNumbers, state.GamesList, state.subGameId);
//		let pamres = new Object();
//		data.orderList = [];
//		numbers = numbers.replace(/\?/g, "");
//		pamres.lotteryNum = numbers;
//		pamres.orderNum = state.ticketCount;
//		pamres.periodNo = state.awarPeriod;
//		pamres.subGameId = state.subGameId;
//		pamres.totalAmount = data.unitPrice * pamres.orderNum;
//		pamres.unitPrice = data.unitPrice;
//		data.orderList.push(pamres)
//		store.dispatch("axios", data)
//	},
//
//	winsDragon(state, data) {
//		state.prevAwarPeriod = data.winList[1].awarPeriod;
//		state.awarPeriod = data.winList[0].awarPeriod
//	},
//	axios(state, data) {
//
//	},
	subGames(state, json) {
		state.subGames = json
	},
	sendMessage(state,msg){
		state.message = msg
	},
	queryLotteryOrderOwn(state,data){
		state.lotteryOrderOwnList = data.data
	},
	getChartMapList(state,data){
		state.chartMapList = data.data
	},
	init(state){
		state.lotteryDatas = {}
	},
	initState(state){
		state = {
 activityDocumentList:{},
 isLogin:false,//登陆状态
// ticketCount:0,//当前选中注数
 subGameList:[],//所有玩法说明列表
 kindList:[],
 GameList:[],
 gamePlayList:[],
 betDataList:[],//投注面板数据
// newNumbers:[],//当前注单选中的号码
 shoppingAllList:{},//所有购彩蓝列表数据
 shoppingList:[],//当前子彩种购彩蓝数据
 kindId:"m5ffc",//当前选中的子彩类
 classId:"3",//当前选中大彩类
 leftName:"定位胆",//左名称
 rightName:"定位胆",//右名称
 subGameId:"300101",//子玩法id
 gameName:"定位胆",
 awarPeriod:"201803160520",//当前期号
 prevAwarPeriod:"",//上一期期号
 subGames:[],//子玩法说明
 betdata:null,//快捷投注参数
 lotteryDatas:{},//所有彩种购彩蓝数据
 lotteryData:[],//当前彩种购彩蓝数据
 times:{'1':{},'2':{},'3':{},'4':{},'5':{},'6':{}},//彩种时间
 timeTxts:'00:00',//当前彩种倒计时
 winList:[],//
 userDetail:{},//用户详情
 cachingArray:[],
 chaseStop:true,
 confirmBetType:"1",
 selectMode:"0",//选号方式(1任选，0常规)
 NoticeList1:[],//最新消息
 NoticeList2:[3],//近期公告
 AlertList:[],//站内私信
 deleteNotice:1,//删除信息
 hotCold:[],//冷热
 omit:[],//遗漏
 message:{},//websocket消息
 dragons:[],//长龙
 recentQuickBetList:{},//最近快捷投注
 Income:[],//充值信息
 Bank:[],//银行
 DrawCondition:[],//提现信息
 lotteryOrderOwnList:[],
 seconds:0,
 Times:'',
 MemberReport:[],//个人报表数据
 chartMapList:[],//走势图数据
 oddTxtShow:true,
}
		state = Object.assign({},state)
	},
	setKeepAlive(state,boolen){
		state.keepAlive = boolen
	}


}
