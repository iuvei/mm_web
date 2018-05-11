import { fetch } from '@/services/fetch' ;
import address from './address.js';
export default {
	namespaced: true,
    state: {
      // adderss,省市级联数据
      address : address,
    	// 登入记录列表数据
      memberLoginInfoList: [],
      countAllnum: '',
    	// 已绑定银行卡列表数据
      memberBankAccountList: [],
    	//支持的银行列表
      companyBankAccountList: [],
    	//  账变记录数据
      queryChildBillList: [],
      // 金流记录
      myCashList: [],
      // 彩票报表
      queryLotteryReportList: [],
      // 代理会员
      queryAgentMemberInfoList: [],
      // //新增会员
      agentRegisterMemberList:[],
      // 查询会员配额
      baseMembers: [],
      InfoEditlistRebate: [ ],
      //查看返水配额:
      baseLotteryClass:[],
      listRebate:[],
      ownRebate:[],
      //转点下级
      turnPointList:[],
      //绑定第一张银行卡
      saveMemberBankList:[],
      //查询安全问题
      querySafeQuestionList:[],
      // 修改登录密码
      updateLoginPasswordList:[],
      // 保存安全问题
      saveSafeQuestionList:[],
      // 修改资金密码
      updateTradePasswordList:[],
      // 修改反水配额
      updateTeamRebetList:[],
      // 转为代理
      updateMemberAgentList:[],
      // 推广链接1
      queryPromoteUrlList:[],
      // 推广链接2_修改配水
      savePromoteUrlList:[],
      // 分红契约
      queryMemberWagesList:[],
      conOrCanelWagesList:[]
    },
    getters: {},
    mutations: {
    	queryLoginInfo(state,data){
    		state.memberLoginInfoList = data.data.memberLoginInfoList;
        state.countAllnum = data.data.countAll
    	},
    	memberIfBind(state,data){
    		state.companyBankAccountList = data.data.companyBankAccountList;
    		state.memberBankAccountList = data.data.memberBankAccountList
    	},
    	queryChildBill(state,data){
    		state.queryChildBillList = data.data
    	},
    	queryLotteryReport(state,data){
    		state.queryLotteryReportList = data.data
    	},
      myCash(state,data){
        state.myCashList = data.data
      },
      //代理会员
      queryAgentMemberInfo(state,data){
        state.queryAgentMemberInfoList = data.data
      },
      //新增会员
      agentRegisterMember(state,data){
        state.agentRegisterMemberList = data.data
      },
      //查询会员详情
      queryMemberInfoEdit(state,data){
        state.baseMembers = data.data.baseMembers;
        state.InfoEditlistRebate = data.data.listRebate
      },
      //查看返水配额
      queryTeamQutaType(state,data){
        state.baseLotteryClass = data.data.baseLotteryClass;
        state.listRebate = data.data.listRebate;
        state.ownRebate = data.data.ownRebate;
      },
      // 转点下级
      turnPoint(state,data){
        state.turnPointList = data.data
      },
      //绑定第一张银行卡
      saveMemberBank(state,data){
        state.saveMemberBankList = data.data
      },
      // 查询安全问题
      querySafeQuestion(state,data){
        state.querySafeQuestionList = data.data
      },
      // 修改登录密码
      updateLoginPassword(state,data){
        state.updateLoginPasswordList = data.data
      },
      // 保存安全问题
      saveSafeQuestion(state,data){
        state.saveSafeQuestionList = data.data
      },
      // 修改资金密码
      updateTradePassword(state,data){
        state.updateTradePasswordList = data.data
      },
      // 修改反水配额
      updateTeamRebet(state,data){
        state.updateTeamRebetList = data.data
      },
      // 转为代理
      updateMemberAgent(state,data){
        state.updateMemberAgentList = data.data
      },
      // 推广链接1
      queryPromoteUrl(state, data){
        state.queryPromoteUrlList = data.data
      },
      // 推广链接2_修改配水
      savePromoteUrl(state, data){
        state.savePromoteUrlList = data.data
      },
      // 分红契约
      queryMemberWages(state, data){
        state.queryMemberWagesList = data.data
      },
      // 分红契约
      conOrCanelWages(state, data){
        state.conOrCanelWagesList = data.data
      }
    },
    actions: {
    	//查询登入记录
    	async queryLoginInfo({commit},params){
		    let res = await fetch('post','queryLoginInfo',params);
		    commit("queryLoginInfo", res);
		    return res
    	},
      async signOut({commit}){
        let res = await fetch('get','signOut')
        return res
      },
    	//查询绑定银行卡资料
    	async memberIfBind({commit}){
		let res = await fetch('get','memberIfBind');
		commit("memberIfBind", res);
        return res
    	},
    	//绑定其他银行卡资料
    	async saveMemberOtherBank({commit},data){
    		let res = await fetch('post','saveMemberOtherBank',data)
    		return res
    	},
    	//查询账变记录
    	async queryChildBill({commit},data){
    		let res = await fetch('post','queryChildBill',data)
    		commit("queryChildBill", res)
    		return res
    	},
    	// 查询彩票报表
    	async queryLotteryReport({commit},data){
    		let res = await fetch('post','queryLotteryReport',data);
    		commit("queryLotteryReport", res);
    		return res
    	},
      // 金流记录
      async myCash({commit},data){
        let res = await fetch('get','myCash',data);
        commit("myCash", res);
        return res
      },
      //代理会员
      async queryAgentMemberInfo({commit},data){
    	  let res = await fetch('post','queryAgentMemberInfo',data);
    	  commit('queryAgentMemberInfo',res);
    	  return res
      },
      //新增会员
      async agentRegisterMember({commit},data){
        let res = await fetch('post','agentRegisterMember',data);
        commit('agentRegisterMember',res);
        return res
      },
      //查询会员详情
      async queryMemberInfoEdit({commit},data){
        let res = await fetch('get','queryMemberInfoEdit',data);
        commit('queryMemberInfoEdit',res);
        return res
      },
      //查看返水配额
      async queryTeamQutaType({commit},data){
        let res = await fetch('post','queryTeamQutaType',data);
        commit('queryTeamQutaType',res);
        return res
      },
      // 转点下级
      async turnPoint({commit},data){
        let res = await fetch('post','turnPoint',data);
        commit('turnPoint',res);
        return res
      },
      // 绑定第一张银行卡
      async saveMemberBank({commit},data){
        let res = await fetch('post','saveMemberBank',data);
        commit('saveMemberBank',res);
        return res
      },
      // 查询安全问题
      async querySafeQuestion({commit},data){
        let res = await fetch('get','querySafeQuestion',data);
        commit('querySafeQuestion',res);
        return res
      },
      // 修改登录密码
      async updateLoginPassword({commit},data){
        let res = await fetch('post','updateLoginPassword',data);
        commit('updateLoginPassword',res);
        return res
      },
      // 保存安全问题
      async saveSafeQuestion({commit},data){
        let res = await fetch('post','saveSafeQuestion',data);
        commit('saveSafeQuestion',res);
        return res
      },
      // 修改资金密码
      async updateTradePassword({commit},data){
        let res = await fetch('post','updateTradePassword',data);
        commit('updateTradePassword',res);
        return res
      },
      // 修改反水配额
      async updateTeamRebet({commit},data){
        let res = await fetch('post','updateTeamRebet',data);
        commit('updateTeamRebet',res);
        return res
      },
      // 转为代理
      async updateMemberAgent({commit}, data){
        let res = await fetch('get','updateMemberAgent',data);
        commit('updateMemberAgent',res);
        return res
      },
      // 推广链接1
      async queryPromoteUrl({commit}, data){
    	  let res = await fetch('get', 'queryPromoteUrl', data);
    	  commit('queryPromoteUrl', res);
    	  return res
      },
      // 推广链接2_修改配水
      async savePromoteUrl({commit}, data){
        let res = await fetch('post', 'savePromoteUrl', data);
        commit('savePromoteUrl', res);
        return res
      },
      // 注册
      async registerMember({commit},params){
        let res = await fetch('post','registerMember',params);
        // commit("registerMember", res.data)
        return res
      },
       async updateMemberWages({commit},params){
      	let res = await fetch('post','updateMemberWages',params);
        return res
      },
      // 分红契约
      async queryMemberWages({commit},params){
        let res = await fetch('get','queryMemberWages',params);
        commit("queryMemberWages", res)
        return res
      },
      // 签订分红契约
      async conOrCanelWages({commit},params){
        let res = await fetch('get','conOrCanelWages',params);
        commit("conOrCanelWages", res)
        return res
      }
    }
}
