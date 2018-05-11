<template>
	<div class="rules" v-if="show">
		<div class="rules_menu">
			 <Button :key="'Button'+index" v-for="(item,index) in GameList" :class="index1==index?'selected':''" @click="onBtn(index)">{{item.className}}</Button>
		</div>
		<Menu mode="horizontal"  :active-name="index2" @on-select = "onSelect">
        <MenuItem :name="index" v-for="(item,index) in GameList[index1].gamePlayList" :key="index">
                          {{item.gameName}}
        </MenuItem>
    </Menu>
    <table class="rules_table" style="width:958px">
    	<tr>
    		<th style="width: 100px;">玩法</th>
    		<th style="width: 153px;">玩法说明</th>
    		<th style="width: 405px;">中奖规则</th>
    		<th>中奖示例</th>
    	</tr>
    	<tr class="hoverColor" v-for="(item,index) in tableList" >
    		<td>{{item.leftName == item.rightName||item.rightName==null?item.leftName:item.leftName+'('+item.rightName+')'}}</td>
    		<td>{{item.remark}}</td>
    		<td>{{item.tips}}</td>
    		<td>{{item.example}}</td>
    	</tr>
    </table>



  </div>
</template>
<script>
  import {mapState,mapActions} from "vuex";
  import bet_fn from '@/services/bet_fn.js'
  export default {
  	created(){
  			this.getGamesInfo().then(()=>{
  				this.show = true;
				this.tableList = bet_fn.helpReducer(this.GameList[this.index1].gamePlayList[this.index2])
  			})
  	},
    data() {
      return {
      	show:false,
      	index1:0,
      	index2:0,
      	special:["和值",],
      	tableList:[],
        columns: [
                    {
                        title: '玩法',
                        key: 'leftName'
                    },
                    {
                        title: '玩法说明',
                        key: 'tips',
                        width: 350,
                    },
                    {
                        title: '中奖规则',
                        key: 'remark'
                    },
                    {
                        title: '中奖示例',
                        key: 'example'
                    },
                ],
      };
    },
    computed: mapState(["GameList"])
	,
    methods: {
    	onSelect(name){
    		this.index2 = name;
    	},
    	onBtn(index){

				this.index1 = index;
				this.index2 = 0;
			},
      handleClick(tab, event) {
//      console.log(tab, event);
      },
      ...mapActions([
			'getGamesInfo',
			]),
    },
    watch:{
    	index1(){
    		this.tableList = bet_fn.helpReducer(this.GameList[this.index1].gamePlayList[this.index2])
    		this.index2 = 0;
//  		console.log(this.tableList)
    	},
    	index2(){
    		this.tableList = bet_fn.helpReducer(this.GameList[this.index1].gamePlayList[this.index2])
    	},
    }
  };
</script>
<style>
	.rules{

		    padding: 20px;
	}
	.rules_table{
		border-collapse:collapse;
		border: 1px solid #e9e9e9;
    border-right: 0;
    border-bottom: 0;
	}
	.rules_table>tr>th{
	background: #f7f7f7;
    font-weight: 500;
    transition: background .3s ease;
    text-align: left;
    color: rgba(0,0,0,.85);
    padding: 16px 8px;
    word-break: break-all;
    font-size: 12px;
	}
	.rules_table>tr>th,.rules_table>tr>td{
		border-right: 1px solid #e9e9e9;
		border-bottom: 1px solid #e9e9e9;
		padding: 16px 8px;
    word-break: break-all;
    font-size: 12px;
	}
	.rules .hoverColor:hover{
		background: #ecf6fd;
	}
	.rules_menu{
		display: flex;
		justify-content: center;
		margin-bottom: 14px;
	}
	.rules_menu .ivu-btn{
	margin-left: 7px;
	margin-right: 7px;
	color: rgba(0,0,0,.65);
    background-color: #fff;
    border: none;
    font-size: 16px;
    border-radius: 4px;
    height: 28px;
    line-height: 1.15;
	}

	.rules_menu .ivu-btn.selected{
	margin-left: 7px;
	margin-right: 7px;
	color: #fff;
    background-color: #108ee9;
    border: none;
    font-size: 16px;
    border-radius: 4px;
    height: 28px;
    line-height: 1.15;
	}
</style>
