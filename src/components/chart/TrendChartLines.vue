<template>
	<div>
		<v-layer >
                        <v-line v-for="(pointes, index) in linePoints" :key="'line' + index" :config="{
                        	stroke:lineBgs[index % 2],
                        	strokeWidth:2,
                        	points:pointes,
                        	
                        }"  />
            </v-layer>
		
	</div>
</template>

<script>
          
export default {
		props:[
		'lineBgs',
		'linePoints',
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
//			console.log(this.lineBgs,this.linePoints,"1234")
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