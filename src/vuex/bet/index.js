import { fetch } from '@/services/fetch' 
export default {
	namespaced: true,
    state: {
    	//所有玩法列表数据
    	gamePlayList :[],
    	showCheckBox:false,
    		
    	
    },
    getters: {
    },
    mutations: {
    	gamePlay(state,json){
    	 state.gamePlayList = json
    	},
    	setShowCheckBox(state,boolen){
		 state.showCheckBox = boolen;
    	},
    	
    },
    actions: {
    	//获取所有玩法列表
    	async gamePlay({commit},params){
		let res = await fetch('get','gamePlay',params)
		 commit("gamePlay", res.data)
    	},
    	setShowCheckBox({commit},boolen){
		 commit("setShowCheckBox", boolen)
    	},
    	
    }
}