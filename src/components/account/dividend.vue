<template>
  <div class="loginlog">
    <div class="table-title">
      <span>当前分红契约</span>
      <div>
        <Poptip
          placement="left"
          confirm
          content="content"
          title="分红签约?"
          @on-ok="ok"
          @on-cancel="cancel">
          <Button type="primary" v-if="this.isWages == 'false'"><Icon type="edit"></Icon>签约</Button>
        </Poptip>
        <Button type="ghost" @click="renovate()"><Icon type="refresh"></Icon>刷新</Button>
      </div>
    </div>
    <Table border  :columns="columns" :data="wagesList" :no-data-text="noDataText"></Table>
  </div>
</template>

<script>
  import { mapActions,mapState } from "vuex";
  export default {
    created(){
      this.MemberWages();
    },
    data () {
      return {
        newTime:'',
        columns: [
          {
            title: '总销量≧(元)',
            key: 'amountStart'
          },
          {
            title: '活跃人数(人)',
            key: 'peopleStart'
          },
          {
            title: '亏损金额(元)',
            key: 'lossStart'
          },
          {
            title: '分红比例(%)',
            key: 'wages'
          }
        ],
        page:1,
        countAll:1,
        pageSize:10,
        pages:1,
        wagesList:[],
        countAllnum: 0,
        isWages: "true",
        noDataText:'暂无数据'
      }
    },
    computed:{ ...mapState( "account",['queryMemberWagesList','conOrCanelWagesList']), ...mapState(['userDetail'])},
    methods: {
      ...mapActions("account",[
        "queryMemberWages",
        "conOrCanelWages",
        "signOut"
      ]),
      MemberWages() {
        this.isWages = "true";
        this.noDataText = '暂无数据';
        this.queryMemberWages('/'+this.userDetail.account + '/2').then(res => {
          this.wagesList = this.queryMemberWagesList.wagesList;
          this.isWages = this.queryMemberWagesList.isWages;
          if(this.isWages == 'false' && this.wagesList == '' ){
            this.noDataText = '你的签约已删除，请确认是否同意签约!'
          }
          this.pages = Math.ceil(this.countAll/this.pageSize)
        }).catch(err => {
          console.log(err)
        })
      },
      ok () {
        this.conOrCanelWages('/2/2').then(res => {
          if(res.code ===  0){
            this.$Message.success('签约成功!');
            this.MemberWages();
          }else if(res.code ===  1){
            this.$Message.error("签约失败!");
          }
        })
      },
      cancel () {
        this.conOrCanelWages('/1/2').then(res => {
          if(res.code ===  0){
            this.$Message.success('取消签约成功!');
            this.MemberWages();
          }else if(res.code ===  1){
            this.$Message.error(res.data);
          }
        })
      },
      // 刷新
      renovate(){
        this.MemberWages(this.page);
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