<template>
  <div>
    <transition name="fade">
      <div @click="returnTop" v-if="show" :style="BackTop"  class="BackTop">
        <i></i>
      </div>
    </transition>
  </div>
</template>
<script>
  import {bus} from '../bus.js';
  export default {
    props:{
      bottom:{
        type:Number,
        default:100
      },
      right:{
        type:Number,
        default:30
      },
      height:{
        type:Number,
        default:400
      },
      duration:{
        type:Number,
        default:1000
      }
    },
    data(){
      return{
        BackTop:{
          bottom:this.bottom+'px',
          right:this.right+'px',
        },
        show:false,
        scrollTop:0,
        top:0
      }
    },
    mounted(){
      let that=this;
      bus.$on('onScroll',function (scroll) {
        that.scrollTop=scroll;
        if(scroll>that.height){
          that.show=true
        }else{
          that.show=false
        }

      })
    },
    methods:{
      //回到顶部
      returnTop(){
        let top=this.scrollTop;
        var timer;
        let sleep=top/this.duration
        if(timer){
          clearInterval(timer);
        }
        timer=setInterval(function () {
          top-=sleep;
          if(top<0){
            clearInterval(timer)
          }
          bus.$emit('scrollTop',top)
        },1)
      }
    }

  }
</script>
<style scoped>
  .BackTop{
    overflow: hidden;
    position: fixed
  }
  .BackTop>i{
    display: inline-block;
    padding: 8px 12px;
    background-color:rgba(0,0,0,.4);
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.2);
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
  .BackTop>i:before{
    content: '';
    display: inline-block;
    border-color: white;
    border-style: solid;
    border-width: 0 0.25em 0.25em 0;
    height: 0.6em;
    margin-top: -1em;
    transform: rotate(225deg);
    width: 0.6em;
  }
  .BackTop>i:hover{
    background-color:rgba(0,0,0,0.6)
  }
  .fade-enter, .fade-leave-to{
    opacity:0
  }
  .fade-enter-active,.fade-leave-active{
    transition:opacity 0.4s
  }

</style>
