<template>
	<div class="loginlog">
		 <div class="table-title">
    		<span>上次更新时间：<span>{{this.newTime}}</span>
            </span>
             <Button type="ghost" @click="renovate()">
             	<Icon type="refresh"></Icon>
             	刷新</Button>
    	</div>
		 <Table border  :columns="columns" :data="memberLoginInfoList"></Table>
		 <div class="page" >
       <!--<span style="line-height: 32px;margin-right: 10px">共{{this.countAllnum}}条</span>-->
		 	<Page :total="countAllnum"  show-elevator show-total @on-change = "changePage"></Page>
		 </div>
	</div>
</template>

<script>
	import { mapActions,mapState } from "vuex";
    export default {
    	created(){
    		this.getQueryLoginInfo(this.page);
        this.time()
    	},
        data () {
            return {
              newTime:'',
                columns: [
                    {
                        title: 'IP',
                        key: 'ip'
                    },
                    {
                        title: '登录时间',
                        key: 'loginTime'
                    },
                    {
                        title: '地区',
                        key: 'address'
                    }
                ],
                page:1,
                countAll:1,
                pageSize:10,
                pages:1,

            }
        },
      computed:{ ...mapState( "account",['memberLoginInfoList','countAllnum']), ...mapState(['userDetail'])},
        methods: {
			...mapActions("account",[
				"queryLoginInfo"
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
			//切换页码
			changePage(page){
				this.getQueryLoginInfo(page);
				this.page = page
			},
			getQueryLoginInfo(page){
				this.queryLoginInfo({page:page}).then(res => {
					this.countAll = this.userDetail.account;
					this.pages = Math.ceil(this.countAll/this.pageSize)
				}).catch(err =>{
					console.log(err)
				})
			},
          // 刷新
          renovate(){
            this.getQueryLoginInfo(this.page);
            this.time()
          }
		}
    }
</script>
<style>
	.loginlog .table-title{
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
	.loginlog .page .ivu-page-item-active {
    border: none;
      }
	.loginlog .page{
		margin-top: 16px;
		display: flex;
		justify-content: flex-end;
	}
	.loginlog .page .ivu-page{
		display: inline-block;
	}
</style>
