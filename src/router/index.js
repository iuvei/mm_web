import Vue from 'vue'
import Router from 'vue-router'
import Weclome from '@/components/weclome.vue'
import Help from '@/components/help.vue'
import Aboutus from '@/components/help-child/aboutus.vue'
import Aboutbet from '@/components/help-child/aboutbet.vue'
import Aboutreport from '@/components/help-child/aboutreport.vue'
import Drawsteps from '@/components/help-child/drawsteps.vue'
import Drawquota from '@/components/help-child/drawquota.vue'
//
import Transdeposit from '@/components/help-child/transdeposit.vue'
import Bankdeposit from '@/components/help-child/bankdeposit.vue'
import Thirddeposit from '@/components/help-child/thirddeposit.vue'
import Howtobet from '@/components/help-child/howtobet.vue'
import Chasewithdraw from '@/components/help-child/chasewithdraw.vue'
import Accountshield from '@/components/help-child/accountshield.vue'
import Shieldstatement from '@/components/help-child/shieldstatement.vue'


import Activity from '@/components/activity.vue'
import Bet from '@/components/bet.vue'
import Qa from '@/components/help-child/qa.vue'
import Rules from '@/components/help-child/rules.vue'
import Report from '@/components/report.vue'
import Mybet from '@/components/mybet.vue'
import Chart from '@/components/chart/line-chart.vue'
import Account from '@/components/account.vue'
import Cashflow from '@/components/account/cashflow.vue'
import Securite from '@/components/account/securite.vue'
import Spreadlink from '@/components/account/spreadlink.vue'
import Turnpoint from '@/components/account/turnpoint.vue'
import Members from '@/components/account/members.vue'
import Loginlog from '@/components/account/loginlog.vue'
import Mybanks from '@/components/account/mybanks.vue'
import Chargelog from '@/components/account/chargelog.vue'
import Lotteryreport from '@/components/account/lotteryreport.vue'
import OneBank from '@/components/account/oneBank.vue'
import Register from '@/components/register.vue'
import Dividend from '@/components/account/dividend.vue'
import Dailypay from '@/components/account/dailypay.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  //首页
    {
      path: '/',
      name: 'Weclome',
      component: Weclome,
      meta:{isOnline: false}
    },
    {
      //帮助
      path: '/help',
      // name: 'help',
      component: Help,
      meta:{isOnline: false},
      children:[
      {
           path:'/',
           redirect:'aboutus',
      },
      {
              path:'aboutus',
              name:'aboutus',
              component:Aboutus,
              meta:{isOnline: false}
      },
      {
              path:'aboutbet',
              name:'aboutbet',
              component:Aboutbet,
              meta:{isOnline: false}
      },
       {
              path:'aboutreport',
              name:'aboutreport',
              component: Aboutreport,
              meta:{isOnline: false}
      },
      {
              path:'drawsteps',
              name:'drawsteps',
              component: Drawsteps,
              meta:{isOnline: false}
      },
      {
              path:'drawquota',
              name:'drawquota',
              component: Drawquota,
              meta:{isOnline: false}
      },
      {
              path:'transdeposit',
              name:'transdeposit',
              component: Transdeposit,
              meta:{isOnline: false}
      },
      {
              path:'bankdeposit',
              name:'bankdeposit',
              component: Bankdeposit,
              meta:{isOnline: false}
      },
      {
              path:'thirddeposit',
              name:'thirddeposit',
              component: Thirddeposit,
              meta:{isOnline: false}
      },
      {
              path:'howtobet',
              name:'howtobet',
              component: Howtobet,
              meta:{isOnline: false}
      },
      {
              path:'chasewithdraw',
              name:'chasewithdraw',
              component: Chasewithdraw,
              meta:{isOnline: false}
      },
      {
              path:'accountshield',
              name:'accountshield',
              component: Accountshield,
              meta:{isOnline: false}
      },
      {
              path:'shieldstatement',
              name:'shieldstatement',
              component: Shieldstatement,
              meta:{isOnline: false}
      },
      {
              path:'qa',
              name:'qa',
              component:Qa,
              meta:{isOnline: false}
      },
      {
              path:'rules',
              name:'rules',
              component:Rules,
              meta:{isOnline: false}
      },
      ]
    },
    //投注
    {
      path: '/bet',
      name: 'bet',
      component: Bet,
      meta:{isOnline: true,keepAlive: true}
    },
     {
      path: '/activity',
      name: 'activity',
      component: Activity,
      meta:{isOnline: true}
    },
    // 注册
    {
      path: '/register',
      name: 'register',
      component: Register
      // meta:{isOnline: true}
    },
    {
      // 注册页
      path: '/register/:id',
      name: 'register',
      component: Register
      // meta:{ isOnline: true}
    },
    // 个人报表
    {
      path: '/report',
      name: 'report',
      component: Report,
      meta: {isOnline: true}
    },
    //我的投注
    {
    	path: '/mybet',
      name: 'mybet',
      component: Mybet,
      meta: {isOnline: true}
    },
    //走势图
    {
    	path: '/chart',
      name: 'chart',
      component: Chart,
      meta:{isOnline: true}
    },
    //用户中心
    {
      path: '/account',
      // name: 'account',
      component: Account,
      children:[
      {
           path:'/',
           redirect:'securite',
      },
        // 登入记录
      {
              path:'loginlog',
              name:'loginlog',
              component:Loginlog,
              meta:{isOnline: true},
      },
        // 绑定银行卡
      {
              path:'mybanks',
              name:'mybanks',
              component:Mybanks,
              meta:{isOnline: true},
      },
        // 金流记录
      {
              path:'cashflow',
              name:'cashflow',
              component:Cashflow,
              meta:{isOnline: true},
      },
        // 安全中心
      {
              path:'securite',
              name:'securite',
              component:Securite,
              meta:{isOnline: true},
      },
        // 推广链接
      {
              path:'spreadlink',
              name:'spreadlink',
              component:Spreadlink,
              meta:{isOnline: true},
      },
        // 转点下级
      {
              path:'turnpoint',
              name:'turnpoint',
              component:Turnpoint,
              meta:{isOnline: true},
      },
        // 代理会员
      {
              path:'members',
              name:'members',
              component:Members,
              meta:{isOnline: true},
      },
        // 帐变记录
      {
              path:'chargelog',
              name:'chargelog',
              component:Chargelog,
              meta:{isOnline: true},
      },
        // 当前分红契约
        {
          path:'dividend',
          name:'dividend',
          component:Dividend,
          meta:{isOnline: true},
        },
        // 当前日工资契约
        {
          path:'ddailypay',
          name:'ddailypay',
          component:Dailypay,
          meta:{isOnline: true},
        },
        // 彩票报表
       {
              path:'lotteryreport',
              name:'lotteryreport',
              component:Lotteryreport,
              meta:{isOnline: true},
      }]
    },
    //绑定第一张银行卡
    {
      path: '/oneBank',
      name: 'onaBank',
      component: OneBank
    }
  ]
})
