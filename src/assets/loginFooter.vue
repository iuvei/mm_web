<template>
  <div id="foot">
    <div class="footer">
      <div>
        <ul class="footer_center">
          <li>
            <div class="footer_center_left" style="float: left;width: 100px;line-height: 71px;font-size: 16px;">
              <span><img src="../../static/img/xinshouzhinan.png" style="margin: 22px 6px 0 0"/>  新手指南</span>
            </div>
            <ul class="footer_center_right">
              <li  @click="toPath('aboutus')">关于我们</li>
              <li  @click="toPath('rules')">游戏玩法</li>
              <li  @click="toPath('qa')">常见问题</li>
            </ul>
          </li>
          <li>
            <div class="footer_center_left" style="float: left;width: 100px;font-size: 16px">
              <span><img src="../../static/img/jisudaozhang.png" style="margin: 22px 6px 0 0"/>  极速到账</span>
            </div>
            <ul class="footer_center_right">
              <li  @click="toPath('thirddeposit')">如何充值</li>
              <li  @click="toPath('drawsteps')">如何提现</li>
              <li  @click="toPath('drawquota')">提现额度</li>
            </ul>
          </li>
          <li>
            <div class="footer_center_left" style="float: left;width: 100px;font-size: 16px">
              <span><img src="../../static/img/anquanbaozhang.png" style="margin: 22px 6px 0 0"/>  安全保障</span>
            </div>
            <ul class="footer_center_right">
              <li  @click="toPath('accountshield')">账号安全</li>
              <li  @click="toPath('accountshield')">资金安全</li>
              <li  @click="toPath('shieldstatement')">安全声明</li>
            </ul>
          </li>
          <li>
            <div class="footer_center_left" style="float: left;width: 100px;font-size: 16px">
              <span><img src="../../static/img/zhifufangshi.png" style="margin: 22px 6px 0 0"/>  支付方式</span>
            </div>
            <ul class="footer_center_right">
              <li @click="toPath('transdeposit')">转账充值</li>
              <li @click="toPath('bankdeposit')">网银充值</li>
              <li @click="toPath('thirddeposit')">三方充值</li>
            </ul>
          </li>
          <li style="width: 250px;padding: 0 15px;">
            <p class="center-align" style="line-height: 71px"><span>{{groupName}}</span>彩票娱乐线上系统2.0 ©版权所有</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
     return{
       groupName: 'M5II'
     }
    },
    methods:{
      toPath(name){
        this.$router.push({
          path: "/help/"+name
        });

      }
    }
 }
</script>
<style scoped="scoped">
  #foot{
    width: 100%;
    height: 100%;
    /*background: linear-gradient(0,#282b33 0,#4b4e58 100%)!important;*/
    background: #363636;
  }
  .footer{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    font-size: 12px;
    color: #fff;
    /*background: linear-gradient(0,#282b33 0,#4b4e58 100%)!important;*/
    background: #363636;
  }
  .footer div{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  ul li{
    list-style: none;
  }
  .footer_center>li{
    width: 182px;
    float: left;
    height: 100%;
  }
  .footer_center>li>ul{
    float: left;
  }
  .footer_center_left{
    float: left;
    width: 100px ;
    height: 100%;
    line-height: 71px;
  }
  .footer_center_right{
    float: left !important;
    width: 50px;
    font-size: 12px;
    color: #cccccc;
    padding: 5px 0;
    margin-left: 8px;
  }
  .footer_center_right>li{
   padding: 1px 0;
    cursor: pointer;
  }
  .footer_center_right>li:hover{
   color: #108ee9;
  }
  img{
    float: left;
    width: 27px;
    height: 27px;
  }
</style>
