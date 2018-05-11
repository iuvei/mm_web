import Vue from 'vue';
import axios from 'axios';
import router from '../router';

Vue.prototype.$http = axios;
//const baseUrl = "http://192.168.0.56:8081";
const axiosURL = {
	userLogin:'/inter/user/userLogin',
	queryLoginInfo:'/inter/user/queryLoginInfo',
	memberIfBind:'/inter/user/memberIfBind',
	getGamesInfo:"/collect/gamesInfo",
	gamePlay:"/inter/ticket/gamePlay",
	getKind:"/inter/ticket/kind",
	saveMemberOtherBank:"/inter/user/saveMemberOtherBank",
	queryChildBill: "/inter/user/queryChildBill",
	queryLotteryReport:"/inter/user/queryLotteryReport",
	getSubGames:"/inter/ticket/subGames",
	quickBet:'/inter/ticket/chipIn',
	getTimes:'/inter/ticket/timeLeft',
	getWinsDragon:'/inter/ticket/winsDragon',
	getUserDetail:'/inter/user/userDetail',
	signOut:'/inter/user/userLogOut',
   queryMemberNoticeList:'/notice/queryMemberNoticeList',
   queryNoticeAlertList:'/notice/queryNoticeAlertList',
   deleteNoticeAlert:'/notice/deleteNoticeAlert',
  updateNoticeAlert:'/notice/updateNoticeAlert',
  myCash: '/inter/user/myCash/',
  queryAgentMemberInfo: '/inter/user/queryAgentMemberInfo',
  agentRegisterMember: '/inter/user/agentRegisterMember',
  queryMemberInfoEdit: '/inter/user/queryMemberInfoEdit/',
  queryTeamQutaType: '/inter/user/queryTeamQutaType',
  queryIncome:'/inter/money/queryIncome',
  queryBank:'/inter/money/queryBank',
  queryDrawCondition:'/inter/money/queryDrawCondition',
  turnPoint: '/inter/user/turnPoint',
  saveMemberBank: '/inter/user/saveMemberBank',
  querySafeQuestion: '/inter/user/querySafeQuestion',
  updateLoginPassword: '/inter/user/updateLoginPassword',
  saveSafeQuestion: '/inter/user/saveSafeQuestion',
  updateMemberAgent: '/inter/user/updateMemberAgent/',
  updateTradePassword: '/inter/user/updateTradePassword' ,
  updateTeamRebet: '/inter/user/updateTeamRebet',
  queryDocumentContentList: '/notice/queryDocumentContentList/?documentListId=402880435f948968015f948c1c8a0000',
  queryLotteryOrderOwn: '/inter/user/queryLotteryOrderOwn',
  queryMemberReportOne: '/inter/user/queryMemberReportOne',
  cancelOrder: '/inter/ticket/cancelOrder',
  visitorLogin: '/inter/user/visitorLogin',
  queryMemberReport: '/inter/user/queryMemberReport',
  queryPromoteUrl: 'inter/user/queryPromoteUrl',
  savePromoteUrl: '/inter/user/savePromoteUrl',
  getChartMapList:'/inter/ticket/chartMap',
  registerMember: '/inter/user/registerMember',
  queryMemberWages:'/inter/user/queryMemberWages',
  updateMemberWages:'/inter/user/updateMemberWages',
  conOrCanelWages: '/inter/user/conOrCanelWages'
}
export var fetch = async(type = 'POST', url = '', data = '') => {
  let result;
  type = type.toUpperCase();
  if (type === 'GET') {
    	url = axiosURL[url] + data;
    await axios.get(url)
        .then(res => {
        	result = res.data
        	let currentPath = router.history.current.path;
            let reg = /help/g;

            let boolen = reg.test(currentPath);
        	if(result.code == '666'&&!boolen){
        		router.push({path:"/"})
        	}
        }).catch((err)=>{
        	console.log(err)
        })
  } else if (type === 'POST') {
    	url = axiosURL[url];
    await axios.post(url,data)
        .then(res => {
        	result = res.data
        	let currentPath = router.history.current.path;
            let reg = /help/g;
            let boolen = reg.test(currentPath)
        	if(result.code == '666'&&!boolen){
        		router.push({path:"/"})
        	}
        }).catch((err)=>{
        	console.log(err)
        })
  }
  return result
};


