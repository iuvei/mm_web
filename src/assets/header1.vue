<template>
  <div id="navbar">
  <div class="logo_box nav_left">
    <img src="../../static/img/m5_logo.png" />
    <!--<img src="../../static/img/sy_03.png" style="width: 60px;height: 45px"  />-->
    <!--<img src="../../static/img/text_03.png" style="width: 60px;height: 60px" />-->
    <!--<img src="../../static/img/sy_logo.png" alt="">-->
  </div>
  <div class="nav_right"  >
  	<Menu mode="horizontal"  :active-name="activeName" @on-select="changeRouter">
        <MenuItem name="0">
            首页
        </MenuItem>
        <span class="offline-link-divider"></span>
        <MenuItem name="1">
            彩票品牌
        </MenuItem>
        <span class="offline-link-divider"></span>
        <MenuItem name="2">
            彩票介绍
        </MenuItem>
        <span class="offline-link-divider"></span>
        <MenuItem name="3">
            常见问题
        </MenuItem>
    </Menu>
  </div>
  </div>
</template>

<script >
	export default {
		data(){
			return{
				activeName:"0",
				paths:["/","/help","/help/rules","/help/qa"],
        groupName: 'M5II'
			}
		},
		created() {
			this.routingReset()
		},
		methods:{
			routingReset(){
				let path = this.$router.history.current.path
			this.paths.forEach((item,index)=>{
				let reg = new RegExp(item,"g")
				if(reg.test(path)){
					this.activeName = String(index)
					return false
				}
			})
			},
			changeRouter(name){
				this.$router.push({path:this.paths[name]})
			},

		},

  }
</script>

<style scoped="scoped">
		#navbar .ivu-menu-horizontal.ivu-menu-light:after {
    content: '';
    display: none;

}
#navbar .nav_right .ivu-menu .offline-link-divider,#navbar .nav_right .ivu-menu .ivu-menu-item{
	float: left;
}
#navbar .offline-link-divider {
    display: inline-block;
    height: 30px;
    width: 1px;
    margin: 0 20px;
    background: linear-gradient(0,rgba(238,238,238,0) 0,rgba(255,255,255,.43) 55%,rgba(238,238,238,0) 100%);
}
#navbar .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item{
	border-bottom:none;
	padding:  0 4px;
	font-size: 16px;
	color: #dbdcd9;
}
#navbar .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,#navbar .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover {
   color:#eb8c20 !important;


}
   #navbar{
   width: 1200px;
   margin: 0 auto;
   height: 100%;
   box-sizing: border-box;
     position: relative;
    z-index: 100;
   }
   #navbar .nav_left{
   	float: left;
   }
   #navbar .nav_right{
   	float: right;
   }
   #navbar .nav_right .ivu-menu{
   	height: 64px;
   	background: none;
   	color: #fff;
   	display: flex;
   	align-items: center;
   }
   #navbar .nav_right .ivu-menu li{
   	color: #fff;
   }
    #navbar .nav_right .ivu-menu .ivu-menu-item-active,#navbar .nav_right .ivu-menu .ivu-menu-item-selected{
   	color: #2d8cf0;
   }
   #navbar .nav_right .ivu-menu li:hover{
   	color: #2d8cf0;
   }
   #navbar .logo_box{
   	/*margin-left: 50px;*/
   	height: 64px;
   	display: flex;
   	justify-content: center;
   	align-items: center;
   }
   #navbar .logo_box img{
   	display: inline-block;
    height: 45px;
    width: 120px;
    /*margin-right: 10px;*/
    border: none;
   }
</style>
