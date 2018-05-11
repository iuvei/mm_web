<template>
	<span class="BetSiderTimeCount">
		{{timeTxt}}
	</span>
</template>

<script>
	import gameConfig from "../../../static/js/gameConfig.js"
	import { mapState, mapActions } from "vuex";
	export default {
		props:['kindKey','classKey','currentOpen'],
		data(){
			return{
				timeTxt:'00:00',
				gameConfig:gameConfig,
				intervalId:null,
				oldTime:null,
				time:null,
				time2:0,
			}

		},
		created(){
			
			
		},
		destroyed(){
			clearInterval(this.intervalId)
		},
		 computed:{
		 	...mapState(["kindId","classId","times","timeTxts","awarPeriod"]),
		 } ,
		 methods:{
		 	...mapActions([
				"setTimes",
				"getWinsDragon"
			]),
		 	startTime() {
		 		let awarPeriod;
		 		if(this.intervalId!=null){
		 			clearInterval(this.intervalId)
		 			
		 		}
		 		this.intervalId = setInterval(()=>{
//		 			if(this.kindKey=='cqssc'){
//		 				this.getWinsDragon("/" +'cqssc').then((res)=>{
//		 					let time = new Date(res.data.currentTime);
//		 				})
//		 				}
                    if(this.kindKey=='cqssc'){
                    	if(this.time2  == 60000){
                    		this.getWinsDragon("/" +'cqssc').then((res)=>{
                    			let awarPeriod2 =  res.data.winList[1].awarPeriod.slice(8)
                    			if(awarPeriod2 * 1 >= 95 || awarPeriod2 * 1 < 24) {
							this.gameConfig['cqssc'].midleTime = 300;
						} else {
							this.gameConfig['cqssc'].midleTime = 600;
						}
		 					
		 					
		 				})
                    	}
		 				}
		 			if(this.time2  < 0){
		 				
		 				this.time2 = this.gameConfig[this.kindKey].midleTime*1000+this.time2
		 			}
		 			this.timeTxt = this.timeFormat(this.time2);
		 			if(this.kindKey == this.kindId){
						this.setTimes([this.timeTxt,this.time2])
						}
		 			this.time2 -=1000
		 		},1000)

			},
		 	timeFormat(time) {
				let hours = moment.duration(time).hours(),
				minutes = moment.duration(time).minutes(),
				seconds = moment.duration(time).seconds();
				hours.toString().length < 2 ? hours = 0 + "" + hours : hours = hours;
				minutes.toString().length < 2 ? minutes = 0 + "" + minutes : minutes = minutes;
				seconds.toString().length < 2 ? seconds = 0 + "" + seconds : seconds = seconds;
				if(time>3600000){
		 			return hours + ':'+minutes + ':' + seconds
		 		}else{
		 			return minutes + ':' + seconds
		 		}
				
			}
		 },
		 watch:{
		 	times(newTimes){
		 		
		 			this.time = newTimes[this.classKey][this.kindKey]*1000;
		 		
		 		
		 	},
		 	time(newTimes){
		 		if (isNaN(newTimes) || newTimes <  0||newTimes == 0){
		 			 this.time2 = this.gameConfig[this.kindKey].midleTime+newTimes;
		 		}else{
		 			this.time2 = newTimes
		 		}
		 		this.startTime()

		 	}
		 }
	}
</script>

<style>
</style>
