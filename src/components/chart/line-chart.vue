<template>
	<div class="chart" style="font-size: 14px;overflow: auto;height:100%;" v-if="showChart">
		<div class="set" style="font-size: 12px;padding: 10px 0;
    margin: 0 auto;
    width:1200px;
    min-width: 1200px;">
			<div style="margin-left: 20px;display: flex;
				">
				<div class="lineBoack">
					<span>选择彩种：</span>
					<Select size="small" style="width:100px" v-model="selectVal">
						<Option v-for="item in selectList" :value="item.kindId" :key="item.kindId">{{ item.kindName }}</Option>
					</Select>
				</div>
				<div class="lineBoack">
					<span>连续期数：</span>
					<RadioGroup v-model="num">
						<Radio label="30"></Radio>
						<Radio label="50"></Radio>
						<Radio label="100"></Radio>
					</RadioGroup>
				</div>
				<div class="lineBoack">
					<span>字体大小：</span>
					<Select style="width:100px" v-model="fontSize">
						<Option :value="12"></Option>
						<Option :value="14"></Option>
						<Option :value="16"></Option>
						<Option :value="18"></Option>
						<Option :value="20"></Option>
						<Option :value="22"></Option>
					</Select>
				</div>
				<div class="lineBoack">
					<!--<Checkbox >十字</Checkbox>
				<Checkbox >高亮</Checkbox>-->
					<Checkbox v-model="brokenLine">折线</Checkbox>
					<Checkbox v-model="missing">遗漏</Checkbox>
				</div>
				<div class="lineBoack">
					<Button type="ghost" size="small" style="margin-left: 4px;background: #fff;" @click="refresh"><Icon type="refresh" ></Icon> 刷新</Button>
					<!--<Button type="ghost" size="small" style="margin-left: 4px;background: #fff;"> 清除高亮行</Button>-->
				</div>

			</div>
		</div>
		<div :class="className.length==0?'':className.length==1?className[0]:className[0]+' '+className[1]" v-if="show">
			<v-stage style="margin: 0 auto;" ref="stage" :config="configKonva">
				<v-layer ref="layer">
					<v-group>
						<v-rect :config="{
				x: 0,
				y: 0,
				width: periodNoWidth,
				height: headerHeight,
				fill: chartColorConfig[0].headerBg,
				stroke:chartColorConfig[0].borderColor,
				strokeWidth: 1
			}" />
						<v-text :config="{
				x: 0,
				y: (headerHeight - fontSize) / 2,
				width: periodNoWidth,
				fill: chartColorConfig[0].headerColor,
				text: '期号',
				align: 'center',
				fontSize:fontSize,
			}" />
					</v-group>
					<v-group>
						<v-rect :config="{
				x: periodNoWidth,
				y: 0,
				width: resultWidth,
				height: headerHeight,
				fill: chartColorConfig[0].headerBg,
				stroke: chartColorConfig[0].borderColor,
				strokeWidth: 1
			}" />
						<v-text :config="{
				x: periodNoWidth,
				y: (headerHeight - fontSize) / 2,
				width: resultWidth,
				fill: chartColorConfig[0].headerColor,
				text: '开奖号码',
				align: 'center',
				fontSize: fontSize,
			}" />
					</v-group>
					<v-group v-for="(position,positionIndex) in chartSizeConfig[selectVal].resultPositions" :key="positionIndex">
						<v-group :key="positionIndex">
							<v-rect :config="{
					x:periodNoWidth + resultWidth + positionWidth*positionIndex,
					y:0,
					width:positionWidth,
					height:unitHeight,
					fill:chartColorConfig[0].headerBg,
					stroke:chartColorConfig[0].borderColor,
					strokeWidth:1
				}" />
							<v-text :config="{
					x:periodNoWidth + resultWidth + positionWidth * positionIndex,
					y:(unitHeight - fontSize) / 2,
					width:positionWidth,
					fill:chartColorConfig[0].headerColor,
					'text':position,
					align:'center',
					fontSize:fontSize,
				}" />
						</v-group>
						<v-group>
							<div v-for="(item, numberIndex) in chartSizeConfig[selectVal].numberValues" :key="numberIndex">
								<v-group>
									<v-rect :config="{
					x:periodNoWidth + resultWidth + positionWidth * positionIndex + unitHeight * numberIndex,
					y:unitHeight,
					width:unitHeight,
					height:unitHeight,
					fill:chartColorConfig[0].headerBg,
					stroke:chartColorConfig[0].borderColor,
					strokeWidth:1
				}" />
									<v-text :config="{
					x:periodNoWidth + resultWidth + positionWidth * positionIndex + unitHeight * numberIndex,
					y:unitHeight + (unitHeight - fontSize) / 2,
					width:unitHeight,
					fill:chartColorConfig[0].headerColor,
					'text':item,
					align:'center',
					fontSize:fontSize,
				}" />
								</v-group>
							</div>
						</v-group>
					</v-group>
				</v-layer>
				<TrendChartBg :chartData='chartMapList' :currentColorConfig='currentColorConfig' :headerHeight='headerHeight' :periodNoWidth='periodNoWidth' :positionWidth='positionWidth' :resultWidth='resultWidth' :stageWidth='stageWidth' :unitHeight='unitHeight' />
				<v-layer>
					<div v-for="(result, resultIndex) in chartMapList" :key="resultIndex">
						<v-text :key="result.periodNo" :config="{
                    	x:0,
                    	y:(unitHeight * resultIndex + headerHeight)+(unitHeight - fontSize) / 2,
                    	width:periodNoWidth,
                    	align:'center',
                    	text:result.periodNo,
                    	fill:currentColorConfig.periodNoColor,
                    	fontSize:fontSize,
                    }" />
					</div>
				</v-layer>
				<v-layer>
					<div v-for="(result, resultIndex) in chartMapList" :key="resultIndex">
						<v-text :key="result.periodNo" :config="{
                    	x:periodNoWidth,
                    	y:(unitHeight * resultIndex + headerHeight)+(unitHeight - fontSize) / 2,
                    	width:resultWidth,
                    	align:'center',
                    	text:result.winNumber,
                    	fill:currentColorConfig.resultColor,
                    	fontSize:fontSize,
                    }" />
					</div>
				</v-layer>
				<v-layer>
					<div v-for="(analyze, analyzeIndex) in analyzeDataLayer" :key="analyzeIndex">
						<v-group :key="analyzeIndex">
							<v-group>
								<v-rect :config="{
                    	x:0,
                    	y:unitHeight * (dataLength + analyzeIndex) + headerHeight,
                    	width:periodNoWidth + resultWidth,
                    	height:unitHeight,
                    	fill:rowBgs[(dataLength + analyzeIndex) % 2],
                    	stroke:borderColor,
                    	strokeWidth:1,
                    }" />
								<v-text :config="{
                    	x:0,
                    	y:(unitHeight * (dataLength + analyzeIndex) + headerHeight)+(unitHeight - fontSize) / 2,
                    	width:periodNoWidth + resultWidth - 10,
                    	align:'right',
                    	text:analyze.name,
                    	fill:currentColorConfig.periodNoColor,
                    	fontSize:fontSize,
                    }" />
							</v-group>
							<div v-for="(item, numberIndex) in analyze.values">
								<v-group :key="numberIndex">
									<v-rect :config="{
                    	x:periodNoWidth + resultWidth + unitHeight * numberIndex,
                    	y:unitHeight * (dataLength + analyzeIndex) + headerHeight,
                    	width:unitHeight,
                    	height:unitHeight,
                    	fill:rowBgs[(dataLength) % 2],
                    	stroke:borderColor,
                    	strokeWidth:1,
                    }" />
									<v-rect :config="{
                    	x:periodNoWidth + resultWidth + unitHeight * numberIndex,
                    	y:unitHeight * (dataLength + analyzeIndex) + headerHeight,
                    	width:unitHeight,
                    	height:unitHeight,
                    	fill:colBgs[(Math.floor(numberIndex / numberValues.length)) % 2],
                    	stroke:borderColor,
                    	strokeWidth:1,
                    }" />
									<v-text :config="{
                    	x:periodNoWidth + resultWidth + unitHeight * numberIndex,
                    	y:(unitHeight * (dataLength + analyzeIndex) + headerHeight)+(unitHeight - fontSize) / 2,
                    	width:unitHeight,
                    	fill:omitColor,
                    	text:item + '',
                    	align:'center',
                    	fontSize:fontSize,
                    }" />
								</v-group>
							</div>
						</v-group>
					</div>
				</v-layer>
				<v-layer>
					<v-group v-for="(result, resultIndex) in chartMapList" :key="resultIndex">
						<div v-for="(position, positionIndex) in result.numPosition">
							<v-group :key="'winNumberColGroup' + positionIndex + '' + itemIndex" v-for="(item, itemIndex) in trendChartOmit(position)">
								<v-text v-if="itemIndex != numberValues.indexOf(result.winNumber.split(',')[positionIndex])" :config="{
						         	x:(periodNoWidth + resultWidth + positionWidth * positionIndex + unitHeight * itemIndex),
						         	y:(unitHeight * resultIndex + headerHeight) + (unitHeight - fontSize) / 2,
						         	radius:unitHeight / 2,
						         	width:unitHeight,
						         	fill:omitColor,
						         	text:item + '',
						         	align:'center',
						         	fontSize:fontSize,
						         	
						         }" />
							</v-group>
						</div>
					</v-group>
				</v-layer>

				<TrendChartLines :lineBgs="lineBgs" :linePoints="linePoints" />

				<v-layer>
					<v-group v-for="(result, resultIndex) in chartMapList" :key="resultIndex">
						<div v-for="(position, positionIndex) in result.numPosition">

							<v-group :key="'winNumberColGroup' + positionIndex + '' + itemIndex" v-for="(item, itemIndex) in trendChartOmit(position)">
								<v-circle v-if="itemIndex == numberValues.indexOf(result.winNumber.split(',')[positionIndex])" :config="{
						         	x:(periodNoWidth + resultWidth + positionWidth * positionIndex + unitHeight * itemIndex) + unitHeight / 2,
						         	y:(unitHeight * resultIndex + headerHeight) + unitHeight / 2,
						         	radius:unitHeight / 2,
						         	fill:lineBgs[positionIndex % 2],
						         	
						         }" />
								<v-text v-if="itemIndex == numberValues.indexOf(result.winNumber.split(',')[positionIndex])" :config="{
						         	x:(periodNoWidth + resultWidth + positionWidth * positionIndex + unitHeight * itemIndex),
						         	y:(unitHeight * resultIndex + headerHeight) + (unitHeight - fontSize) / 2,
						         	radius:unitHeight / 2,
						         	width:unitHeight,
						         	fill:'white',
						         	text:result.winNumber.split(',')[positionIndex] + '',
						         	align:'center',
						         	fontSize:fontSize,
						         	
						         }" />

							</v-group>
						</div>
					</v-group>
				</v-layer>
			</v-stage>
		</div>
	</div>
</template>

<script>
	import chartConfig from "../../../static/js/chartConfig.js"
	import { mapState, mapActions } from "vuex";
	import TrendChartBg from "./TrendChartBg.vue";
	import TrendChartOmit from "./TrendChartOmit.vue";
	import TrendChartLines from "./TrendChartLines.vue";
	export default {
		created() {
			this.showChart = true;
			this.getChartMapList('/' + this.selectVal + '/' + this.num).then(() => {
				this.renderMap()
			})
			if(this.kindList.length == 0) {
				this.getKind().then(() => {
					this.selectList = this.concatKind();

				})
			} else {
				this.selectList = this.concatKind()

			}

		},
		methods: {

			...mapActions([
				"getChartMapList",
				"getKind"
			]),
			refresh() {
				this.show = false;
				this.getChartMapList('/' + this.selectVal + '/' + this.num).then(() => {
					this.renderMap()
					this.show = true;
				})
			},
			renderMap() {
				this.analyzeDataItem = {
					hitTimes: [],
					omitTimes: []
				};
				this.analyzeData = [];
				this.analyzeDataLayer = [{
						name: '出现总次数',
						values: []
					},
					{
						name: '平均遗漏值',
						values: []
					},
					{
						name: '最大遗漏值',
						values: []
					}
				];
				this.chartColorConfig = chartConfig.chartColorConfig;
				this.chartSizeConfig = chartConfig.chartSizeConfig
				this.dataLength = this.chartMapList.length
				this.unitHeight = this.fontSize * 1.5 + 10;
				this.periodNoWidth = this.chartSizeConfig[this.selectVal].periodNoRadio * this.fontSize;
				this.resultWidth = this.chartSizeConfig[this.selectVal].resultRadio * this.fontSize;
				// 表头高度
				this.headerHeight = this.unitHeight * 2
				// 表头高度
				this.analyzeHeight = this.unitHeight * 3
				// 画布宽度
				this.stageWidth = this.periodNoWidth + this.resultWidth + (this.chartSizeConfig[this.selectVal].resultPositions.length) * this.chartSizeConfig[this.selectVal].numberValues.length * this.unitHeight;
				this.stageHeight = this.dataLength * this.unitHeight
				this.stageHeight += this.analyzeHeight
				this.stageHeight += this.headerHeight
				this.configKonva.width = this.stageWidth;
				this.configKonva.height = this.stageHeight;
				this.positionWidth = this.chartSizeConfig[this.selectVal].numberValues.length * this.unitHeight;
				this.currentColorConfig = this.chartColorConfig[0]
				this.currentSizeConfig = this.chartSizeConfig[this.selectVal]
				this.borderColor = this.currentColorConfig.borderColor;
				this.omitColor = this.currentColorConfig.omitColor;
				this.numberValues = this.currentSizeConfig.numberValues
				this.colBgs = this.currentColorConfig.colBgs;
				this.rowBgs = this.currentColorConfig.rowBgs;
				this.selectedRowColor = this.currentColorConfig.selectedRowColor;
				this.lineBgs = this.currentColorConfig.lineBgs
				this.setAnalyzeData()
				this.getLinePoints()
			},
			trendChartOmit(numPosition) {
				let realPosition = [];
				realPosition = numPosition.reduce((prev, item) => item !== null ? [...prev, item] : prev, realPosition)
				return realPosition
			},
			getLinePoints() {
				this.linePoints = []
				this.chartMapList.forEach((result, resultIndex) => {
					const resultNumbers = result.winNumber.split(',')
					const y = this.unitHeight * resultIndex + this.headerHeight
					result.numPosition.forEach((position, positionIndex) => {
						const currentResultNumber = resultNumbers[positionIndex];
						const currentResultNumberIndex = this.numberValues.indexOf(currentResultNumber);
						let realPosition = [];
						realPosition = position.reduce((prev, item) => item !== null ? [...prev, item] : prev, realPosition);
						realPosition.forEach((item, itemIndex) => {
							const x = this.periodNoWidth + this.resultWidth + this.positionWidth * positionIndex + this.unitHeight * itemIndex
							this.analyzeData[positionIndex].omitTimes[itemIndex].push(item)
							if(itemIndex === currentResultNumberIndex) {
								this.analyzeData[positionIndex].hitTimes[itemIndex]++;
								const pointX = x + this.unitHeight / 2;
								const pointY = y + this.unitHeight / 2;
								if(this.linePoints[positionIndex]) {
									this.linePoints[positionIndex].push(...[pointX, pointY])
								} else {
									this.linePoints[positionIndex] = [pointX, pointY]
								}
							}
						})
					})
				})
				this.show = true;
			},
			concatKind() {
				let arr = [];
				this.kindList.forEach((item1) => {
					item1.kindList.forEach((item2) => {
						let obj = {};
						obj.kindId = item2.kindId;
						obj.kindName = item2.kindName;
						arr.push(obj)
					})
				})
				return arr
			},
			setAnalyzeData() {
				for(let position = this.currentSizeConfig.resultPositions.length; position > 0; position--) {

					for(let i = this.currentSizeConfig.numberValues.length; i > 0; i--) {
						this.analyzeDataItem.hitTimes.push(0)
						this.analyzeDataItem.omitTimes.push([])
					}
					this.analyzeData.push(this.analyzeDataItem)
				}
				this.analyzeData.forEach((position, positionIndex) => {
					position.hitTimes.forEach(item => {
						if(!item) item = 0
						const aveOmit = item === 0 ? this.dataLength : Math.floor(this.dataLength / item)
						this.analyzeDataLayer[0].values.push(item)
						this.analyzeDataLayer[1].values.push(aveOmit)
					})
					position.omitTimes.forEach(item => {
						const maxOmit = item.length > 0 ? Math.max.apply(Math, item) : 0
						this.analyzeDataLayer[2].values.push(maxOmit)
					})
				})
			}
		},
		computed: mapState(["chartMapList", "kindList"]),
		components: {
			TrendChartBg,
			TrendChartOmit,
			TrendChartLines
		},
		data() {
			return {
				showChart:false,
				className: ["missing", "brokenLine"],
				brokenLine: true,
				missing: true,
				num: "30",
				selectVal: "shssl",
				selectList: [],
				show: false,
				omitLayer: '',
				winNumberLayer: '',
				omitColGroup: '',
				lineBgs: '',
				omitRowGroup: '',
				winNumberColGroup: '',
				linePoints: [],
				configStyle1: {},
				configStyle2: {},
				configStyle3: {},
				configStyle4: {},
				positionWidth: 0,
				unitHeight: 0,
				periodNoWidth: 0,
				resultWidth: 0,
				headerHeight: 0,
				analyzeHeight: 0,
				stageWidth: 0,
				stageHeight: 0,
				fontSize: 12,
				chartColorConfig: [],
				chartSizeConfig: [],
				configKonva: {
					width: 0,
					height: 0
				},
				analyzeDataItem: {
					hitTimes: [],
					omitTimes: []
				},
				analyzeData: [],
				analyzeDataLayer: [{
						name: '出现总次数',
						values: []
					},
					{
						name: '平均遗漏值',
						values: []
					},
					{
						name: '最大遗漏值',
						values: []
					}
				],
				borderColor: null,
				colBgs: null,
				rowBgs: null,
				selectedRowColor: null,

			}
		},
		watch: {
			selectVal() {
				this.show = false;
				this.getChartMapList('/' + this.selectVal + '/' + this.num).then(() => {
					this.renderMap()
					this.show = true;
				})

			},
			fontSize() {
				this.renderMap()
			},
			num() {
				this.show = false;
				this.getChartMapList('/' + this.selectVal + '/' + this.num).then(() => {
					this.renderMap()
					this.show = true;
				})
			},
			brokenLine(val) {
				if(val) {
					if(this.className.indexOf('brokenLine') == -1) {
						this.className.push('brokenLine')
					}
				} else {
					if(this.missing) {
						this.className = ['missing']
					} else {
						this.className = []
					}

				}

			},
			missing(val) {
				if(val) {
					if(this.className.indexOf('missing') == -1) {
						this.className.push('missing')
					}
				} else {
					if(this.brokenLine) {
						this.className = ['brokenLine']
					} else {
						this.className = []
					}

				}
			}

		}

	};
</script>

<style>
	.chart {
		width: 100%;
		min-width: 1200px;
		margin: 0 auto;
	}
	
	.chart canvas:nth-child(6) {
		display: none;
	}
	
	.chart canvas:nth-child(7) {
		display: none;
	}
	
	.chart .missing canvas:nth-child(6) {
		display: block;
	}
	
	.chart .brokenLine canvas:nth-child(7) {
		display: block;
	}
	
	.chart .lineBoack {
		display: flex;
		margin-left: 8px;
		align-items: center;
	}
	
	.chart .set {
		display: flex;
		justify-content: center;
		margin: 0 auto;
	}
	
	.chart .konvajs-content {
		margin: 0 auto;
	}
</style>