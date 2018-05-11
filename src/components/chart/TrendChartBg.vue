<template>
	<div>
		<v-layer class="lop">
			<div v-for="(result, resultIndex) in chartData">
			<v-rect   
				    :key="'bgBlockLayer_periodNoLayer_' + resultIndex"
                    :config="{
					x:0,
					y:unitHeight * resultIndex + headerHeight,
					width:stageWidth,
					height:unitHeight,
					fill:rowBgs[resultIndex % 2],
					stroke:borderColor,
					strokeWidth:1,
				}" />
				<v-rect
					:key="'bgBlockLayer_winNumberColGroup_' + resultIndex + '_' + positionIndex + '_cover'"
					v-for="(position, positionIndex) in result.numPosition"
					:config="{
					x:periodNoWidth + resultWidth + positionWidth * positionIndex,
					y:unitHeight * resultIndex + headerHeight,
					width:positionWidth,
					height:unitHeight,
					fill:colBgs[positionIndex % 2],
					}"
					 />
              </div>
		</v-layer>
	</div>
</template>

<script>
//	:chartData='chartMapList'
//                          :currentColorConfig='currentColorConfig'
//                          :headerHeight='headerHeight'
//                          :periodNoWidth='periodNoWidth'
//                          :positionWidth='positionWidth'
//                          :resultWidth='resultWidth'
//                          :stageWidth='stageWidth'
//                          :unitHeight='unitHeight'
export default {
		props:[
		'chartData',
		'currentColorConfig',
		'headerHeight',
		'periodNoWidth',
		'positionWidth',
		'resultWidth',
		'stageWidth',
		'unitHeight'
		],
		data(){
			return{
				borderColor:null,
				colBgs:null,
				rowBgs:null,
				selectedRowColor:null,
			}
			
		},
		created(){
			this.borderColor = this.currentColorConfig.borderColor;
			this.colBgs = this.currentColorConfig.colBgs;
			this.rowBgs = this.currentColorConfig.rowBgs;
			this.selectedRowColor = this.currentColorConfig.selectedRowColor;
//			console.log(this.chartData,this.rowBgs,this.borderColor,this.selectedRowColor)
		},
		destroyed(){
		},
		 computed:{
		 } ,
		 methods:{
		 	
		 },
		 watch:{
		 	
		 }
	}
</script>

<style>
</style>