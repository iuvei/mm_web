<template>
	<div class="bet_content" >
		<div class="bet_left" >
			<div class="nouvelle">
        <Announcement></Announcement>
      </div >
			<Aside v-if="show"></Aside>
		</div>
		<div class="bet_center" v-if="show">
			<UnRound></UnRound>
			<div class="bet_menu">
				<BetMenu></BetMenu>
			</div>
			<div class="shoppingTable">
				<ShoppingTable></ShoppingTable>
			</div>
			<div>
				<Chase></Chase>
			</div>
		</div>
    <div class="bet_right" v-if="show">
		   <BetCollapse></BetCollapse>
		</div>
	</div>
</template>

<script>
	import Aside from "./bet/aside.vue"
	import UnRound from "./bet/unRound.vue"
	import BetMenu from "./bet/menu.vue"
	import BetCollapse from "./bet/BetCollapse.vue"
	import ShoppingTable from "./bet/shoppingTable.vue"
	import Chase from "./bet/chase.vue"
    import Announcement from "./announcement.vue"
	import { mapState, mapActions } from "vuex";
	export default {
		name:"bet",
		activated(){
			if(!this.keepAlive){
				this.show = false;
				setTimeout(()=>{
					this.show = true
				})

			}
		},
		created() {
			this.show = true
        },
		data() {
		return {
        modal2: false,
        show:false,
        isActive:true,
      }
		},
		methods: {
    },
		computed: mapState(["classId","keepAlive"]),
		components: {
			Aside,
			UnRound,
			BetMenu,
			ShoppingTable,
			Chase,
			BetCollapse,
      Announcement
		},

		watch: {
			subGameId(newId) {
				this.subGames({
					url: "/inter/ticket/subGames",
					data: newId
				})
			}
		}
	}
</script>

<style scoped>
	.bet_content {
		position: relative;
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		top: 0;
		bottom: 0;
	}
  .bet_content .bet_left {
		position: relative;
		/*background: #f3f3f3;*/
    background: #373737;
		/*border-left: 1px solid #b4b4b4;*/
		/*border-right: 1px solid #b4b4b4;*/
		width: 150px;
		box-sizing: border-box;
		height: 100%;
	}
	.bet_content .bet_right {
		position: absolute;
		/*background: #ececec;;*/
    background: #373737;
		top: 0;
		left:940px;
		width: 260px;
		overflow: auto;
		height: 100%;
	}
  .bet_content .bet_center {
		width: 780px;
		height: 100%;
		position: absolute;
		top: 0px;
		left: 155px;
		bottom: 0px;
		overflow: auto;
		overflow-x: hidden;
		background: #FFFFFF;
	}
  .bet_content .nouvelle {
		width: 150px;
		height: 34px;
    color: #ececec;
		/*background: #FFFFFF;*/
		/*border-bottom: 1px solid #b4b4b4;*/
    border-bottom: 5px solid #2d2d2d;

    background: #373737;
	}

  .bet_menu{
    margin-bottom: 3px;
  }

	/*开奖详情*/
	/*开奖详情*/
</style>
