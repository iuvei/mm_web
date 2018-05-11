<style>
  .nouvelle_main{
    width: 120px;
    height: inherit;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
  .nouvelle_main:hover .category{
    background-image: url("../../static/img/category2.png");
  }
  .nouvelle_main:hover .messages{
    background-image: url("../../static/img/message2.png");
  }
  .nouvelle_main div{
    width: 20px;
    height: 20px;
    background-size: cover;
  }
  .nouvelle_main div:nth-child(1){
    background-image: url("../../static/img/category.png");
  }
  .nouvelle_main div.messages{
    width: 24px;
    height: 24px;
    background-image: url("../../static/img/message.png");
  }
  .notice_tip{
    height:200px;
    line-height:200px;
    margin:auto;
    text-align: center;
  }
  .announce_modal .ivu-modal-content{
    height: 380px;
    min-width: 440px;
  }
  .announce_modal .ivu-modal-body{
    height: 315px;
    overflow: auto;
  }
  .announce_modal  .ivu-modal-footer{
    border-top: none!important;
  }
  .announce_modal .ivu-table-wrapper{
    border: 1px solid #dddee1!important;
  }
  .announce_modal .header-left{
    display: flex;
    align-items: center;
    width: 70%;
  }
  .announce_modal .ivu-tabs-bar{
    margin-bottom: 10px;
  }
  .announce_modal .ivu-menu-horizontal{
    height: 50px;
    margin-bottom: 10px;
  }
  .announce_modal .header-left button:hover{
    background: red;
    transition: 0.8s;
  }
  .announce_modal .header-left button:hover span{
    color: white;
    transition: .8s;
  }
  .nouvelle_main .modal2 .ivu-modal-content{
    height: auto!important;
  }
  .nouvelle_main .modal2 .ivu-modal-body{
    height: auto;
  }

</style>

<template>

    <div class="nouvelle_main">
      <div class="category"></div>
      <Badge :dot="dot">
        <div @click="modal2 = true" class="messages"></div>
      </Badge>
      <Modal
             v-model="modal2"
             title="公告消息"
             width="700px"
             class-name="announce_modal"
      >
        <Tabs>
          <TabPane label="近期公告" icon="volume-high">
            <Collapse v-if="NoticeList2.length>0">
              <Panel v-for="(item,index) in NoticeList2" :key="index">
                {{item.title}}
                <p slot="content">{{item.content}}</p>
              </Panel>
            </Collapse>
            <div class="notice_tip" v-else>暂时没有消息</div>
          </TabPane>
          <TabPane label="最新消息" icon="chatbox-working">
            <Collapse v-if="NoticeList1.length>0">
              <Panel v-for="(item,index) in NoticeList1" :key="index">
                {{item.title}}
                <p slot="content">{{item.content}}</p>
              </Panel>
            </Collapse>
            <div class="notice_tip" v-else>暂时没有消息</div>
          </TabPane>
          <TabPane :label="label">
              <Menu mode="horizontal"  active-name="0"  @on-select="NoticeList">
                <MenuItem name="" >

                  全部
                </MenuItem>
                <MenuItem name="1">

                  已读
                </MenuItem>
                <MenuItem name="0">

                  未读
                </MenuItem>
              </Menu>
              <Table @on-expand="update" @on-selection-change="select"	 border ref="selection" :columns="columns4" :data="AlertList">
                <div slot="header" style="display: flex">
                  <div class="header-left">
                    <Button @click="removeMessage()" size="default" style="margin-left: 10px;height: 32px;color: red">删除</Button>
                    <span style="margin-left: 10px">上次更新时间：{{time}}</span>
                  </div>
                  <div style="width: 30%;height:48px;display: flex;align-items: center;justify-content: flex-end;margin-right: 10px">
                    <Button @click="refresh()" icon="android-refresh" size="default" style="height: 32px;float: right">刷新</Button>
                  </div>
                </div>
              </Table>
            </TabPane>


        </Tabs>
        <div slot="footer"></div>
      </Modal>
      <Modal
        v-model="modal1"
        title="会员公告"
        width="700"
        class-name="modal2"
      >
        <template v-if="NoticeList2.length>0">
          <p v-for="(item,index) in NoticeList2" :key="index" style="border-bottom: 1px solid grey;padding-bottom: 10px;margin-top: 10px">{{item.content}}</p>
        </template>
        <p style="font-weight: 600;text-align: center" v-else="">您不在线期间没有最新会员公告</p>
        <div slot="footer">
          <Button @click="modal1=false" type="primary" size="default">确认</Button>
        </div>
      </Modal>
    </div>

</template>
<script>
  import { mapState, mapActions } from "vuex";
  import {bus} from '../bus.js';
  export default {
    mounted(){
      bus.$on('announce',()=>{
        this.modal1=true;
      })
      let that=this;
      this.queryMemberNoticeList("?notice_type=3");
      this.queryMemberNoticeList("?notice_type=2&type=1");
      that.NoticeList(0);
      this.$http({
        method:'get',
        url:'/notice/queryNoticeAlertList?is_read=0&memberid='+this.userDetail.account
      }).then(function (data) {
       if(data.data.data.length!==0){
         that.dot=true
       }else{
         that.dot=false
       }
      }).catch(function (error) {
        console.log(error)
      })
      this.Times(new Date());
      this.$Notice.config({
        top: 64,
        duration: 3
      });
    },
    data() {
      return {
        modal2: false,
        time:'',
        columns4:[
          {
            type:'expand',
            width: 50,
            align: 'center',
            render: function (createElement) {
              return createElement(
                'div',{

                },
                [
                  createElement('p', this.row.content)
                ]
              )
            }
          },
          {
            type: 'selection',
            width: 55,
            align: 'center'
          },
          {
            title: '标题',
            key: 'title',
            render: (h, params) => {
              return h('div',{

              }, [
                h('span', params.row.title),
                h('Badge', {
                  props: {
                    dot:params.row.isRead==0?true:false,
                  },
                  attrs: {
                    id: params.row.id
                  },

                })
              ]);
            }
          },
          {
            title: '发送人',
            key: 'sentPersonName'
          },
          {
            title: '发送时间',
            key: 'sentTime'
          }
        ],
        //选中项
        selection:'',
        //选中id
        id:[],
        //判断为全部，未读，已读
        name:'',
        //所读信息的id
        isRead:'',
        dot:false,
        label: (h) => {
          return h('div',
            [
            h('Icon',{
              props: {
                type: 'android-mail'
              }
            }),
            h('span', '站内私信'),
            h('Badge', {
              props: {
                dot:this.dot
              }
            })
          ])
        },
        modal1:false,

      }
    },
    methods: {
      ...mapActions([
        "queryMemberNoticeList",
        "queryNoticeAlertList",
        "deleteNoticeAlert",
        "updateNoticeAlert"
      ]),
//时间解析;
   Times(now){
    let year=new Date(now).getFullYear();
    let month=new Date(now).getMonth()+1;
    let date=new Date(now).getDate();
    let houer=new Date(now).getHours();
    let minute=new Date(now).getMinutes();
    let second=new Date(now).getSeconds();
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if(minute<10) minute="0"+minute;
    if(second<10) second="0"+second;
    if(houer<10) houer="0"+houer;
     this.time = year+"-"+month+"-"+date+" "+houer+":"+minute+":"+second
  },
      NoticeList(name){
        this.name=name;
        this.queryNoticeAlertList('?is_read='+name+'&memberid='+this.userDetail.account).then((res)=>{
//        console.log(res)
          if(name==='0'){
            if(res.data.length===0){
              this.dot=false;
            }else{
              this.dot=true;
            }
          }
        });

        this.Times(new Date());
      },
      select(selection){
        this.selection=selection;
      },
      //删除信息
      removeMessage(){
        let time;
//      console.log(this.selection)
        if(this.selection.length!==0){
          this.selection.map(function (item) {
            this.id.push(item.id)
          }.bind(this))
        }else{
          this.$Notice.warning({
            title: 'M5Ⅱ通知',
            desc:'至少选择一条消息'
          });
        }
        this.id.join(',');
        let that=this;
        new Promise(function (resolve,reject) {
          clearTimeout(time);
          that.deleteNoticeAlert('?messageIds='+that.id);
          resolve();
        }).then(function () {
           time=setTimeout(function () {
            that.queryNoticeAlertList('?is_read='+that.name+'&memberid='+that.userDetail.account);
          },300)
          that.id=[];
          that.selection=[];
        }).catch(function (error) {
          console.log(error)
        })
      },
      //刷新
      refresh(){
        this.queryNoticeAlertList('?is_read='+this.name+'&memberid='+this.userDetail.account);
        this.Times(new Date());
      },
      //读取信息
      update(row,status){
        this.isRead=row.isRead;
        if((this.name=='0'||this.name=='')&&status==true){
          this.updateNoticeAlert('?messageId='+row.id);
          let dot=document.getElementById(row.id);
          if(dot){
            dot.parentNode.removeChild(dot);
          }
          if(document.getElementsByClassName('ivu-badge-dot').length<=2){
            this.dot=false
          }
        }
      },
    },
    computed: mapState(["NoticeList1","NoticeList2","AlertList","deleteNotice","userDetail","model"]),

  }
</script>

