<template>
	<div class="betPlatte">
		<div v-if="selectMode == '1'&&showCheckBox" style="display: flex;align-items: center;flex-direction: column;margin-top: 10px;">
			<div>温馨提示：你选择了<Tag checkable color="#d2eafb" >{{checkAllGroup.length}}</Tag>个位置，系统自动根据位置组合成<Tag checkable color="#d2eafb" >{{selectNum}}</Tag>个方案。<Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            style="margin: 0 20px"
            @click.prevent.native="handleCheckAll">全选</Checkbox></div>
    <CheckboxGroup  v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox :label="item" v-for="(item,index) in checkAllValue" style="margin: 0 8px;" :key="index">{{item}}</Checkbox>
    </CheckboxGroup>
		</div>
		<!--普通button面板-->
		<div class="ordinaryPanel" style="margin: 12px 0;" v-if="!inputFormat&&!isKsSumVal&&!isSscSpecial&&!ispk10Special&&classId!='2'" >
			<div v-for="(item1,index1) in betDataList.numbers" :key="index1">
				<Row>
					<Col :span="sumValArr.indexOf(subGameId)!=-1?'22':'18'">
					<Row>
						<Col span="4">
						<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20">
						<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button  type="ghost"  :style="item2.data_selected?selectedStyle:''" :class="squareButtonArr.indexOf(subGameId)!=-1?'squareButton':''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
					</Col>
					<Col :span="sumValArr.indexOf(subGameId)!=-1?'2':'6'">
					<div class="quickSelect">
						<Button type="ghost" html-type="button" value="0" v-for="(item3,index3) in betDataList.quickBtnOption" :key="index3" @click="quickSelect({row:index1,value:item3.value})">{{item3.label}}</Button>
					</div>
					</Col>
				</Row>
				<Row class="hotCold" v-if="showHotColdOrOmit.indexOf(subGameId)!=-1&&fruit.indexOf('冷热')!=-1">
					<Col span="18">
						<Row>
							<Col span="4">
								<span class="hotcold-label">冷热</span>
							</Col>
							<Col span="20">
								<Tag v-if="index>1" v-for="(item,index) in hotCold[index1+1+'']" :key="index" :class="item.hotCold !=null?item.hotCold == 'blue'?'bgblue':'bgred':''" >{{item.count}}</Tag>
							</Col>
						</Row>
					</Col>
				</Row>
				<Row class="omit" v-if="showHotColdOrOmit.indexOf(subGameId)!=-1&&fruit.indexOf('遗漏')!=-1">
					<Col span="18">
						<Row>
							<Col span="4">
								<span class="hotcold-label">遗漏</span>
							</Col>
							<Col span="20">
								<Tag v-if="index>1" v-for="(item,index) in omit[index1+1+'']" :key="index" :class="item.hotCold !=null?item.hotCold == 'blue'?'bgblue':'bgred':''" >{{item.count}}</Tag>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
		<!--六合彩-->
		<div class="hk6Style" v-if="classId=='2'" v-cloak>
		<div class="ordinaryPanel hk6" style="margin: 12px 0;" v-if="hk6BetNumbersConfig.other[subGameId]" >
			<div v-for="(item1,index1) in betDataList.numbers" :key="index1">
				<Row>
					<Col :span="sumValArr.indexOf(subGameId)!=-1?'22':'18'">
					<Row>
						<Col span="4">
						<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20">
						<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button  type="ghost"  :style="item2.data_selected?item2.btnColor=='red'?selectedStyle_red:item2.btnColor=='blue'?selectedStyle_blue:item2.btnColor=='green'?selectedStyle_green:'':''" :class="'hk6Btn '+item2.btnColor" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
					</Col>
					<Col :span="sumValArr.indexOf(subGameId)!=-1?'2':'6'">
					<div class="quickSelect">
						<Button type="ghost" html-type="button" value="0" v-for="(item3,index3) in betDataList.quickBtnOption" :key="index3" @click="quickSelect({row:index1,value:item3.value})">{{item3.label}}</Button>
					</div>
					</Col>
				</Row>
				<Row class="omit" v-if="showHotColdOrOmit.indexOf(subGameId)!=-1&&fruit.indexOf('遗漏')!=-1">
					<Col span="18">
						<Row>
							<Col span="4">
								<span class="hotcold-label">遗漏</span>
							</Col>
							<Col span="20">
								<Tag v-if="index>1" v-for="(item,index) in omit[index1+1+'']" :key="index" :class="item.hotCold !=null?item.hotCold == 'blue'?'bgblue':'bgred':''" >{{item.count}}</Tag>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
		<!--六合彩特肖-->
		<div class="panel_1" style="margin: 12px 4px;" v-if="hk6BetNumbersConfig.texiao[subGameId]">
			<Row>
				<Col span="12">
					<Row v-for="(item1,index1) in betDataList.numbers" :key="index1" v-if="index1<6" style="margin: 4px 0;">
						<Col span="3" >
							<Button class="zodiac" :style="item1.data_selected?selectedStyleHk6:''" @click="onSelectHk6(index1)">{{item1.rowName}}</Button>
						</Col>
						<Col span="3" >
							<span style="line-height: 40px;color: red;">{{item1.cols.length>4?odds[0].split(',')[1]:odds[0].split(',')[0]}}</span>
						</Col>
						<Col span="18">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.btnColor=='red'?selectedStyle_red:item2.btnColor=='blue'?selectedStyle_blue:item2.btnColor=='green'?selectedStyle_green:''" :class="'hk6Btn '+item2.btnColor" >{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
				</Col>
				<Col span="12" >
					<Row v-for="(item1,index1) in betDataList.numbers" :key="index1" v-if="index1>5" style="margin: 4px 0;">
						<Col span="3" >
							<Button class="zodiac" :style="item1.data_selected?selectedStyleHk6:''" @click="onSelectHk6(index1)">{{item1.rowName}}</Button>
						</Col>
						<Col span="3" >
							<span style="line-height: 40px;color: red;">{{item1.cols.length>4?odds[0].split(',')[1]:odds[0].split(',')[0]}}</span>
						</Col>
						<Col span="18">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.btnColor=='red'?selectedStyle_red:item2.btnColor=='blue'?selectedStyle_blue:item2.btnColor=='green'?selectedStyle_green:''" :class="'hk6Btn '+item2.btnColor" >{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
		<!--六合彩特两面，正码1-6-->
		<div class="panel_1" style="margin: 12px 4px;" v-if="hk6BetNumbersConfig.telm[subGameId]">
			<Row>
				<Col span="12">
					<Row v-for="(item1,index1) in betDataList.numbers"  style="margin: 4px 0;" :key="index1">
						<Col span="3" >
						</Col>
						<Col span="3" >
						</Col>
						<Col span="18">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" style="margin:4px 20px;" :key="index2">
							<Button class="telmBtn" :style="item2.data_selected?selectedStyle:''"  :class="squareButtonArr.indexOf(subGameId)!=-1?'squareButton':''"  @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						    </div>
						</Col>
					</Row>
				</Col>

			</Row>
		</div>
		<!--六合彩总和-->
		<div>
			<div class="panel_1" style="margin: 12px 4px;" v-if="hk6BetNumbersConfig.zonghe[subGameId]">
			<Row>
				<Col span="24">
					<Row v-if="index1==0" v-for="(item1,index1) in betDataList.numbers" :key="index1"  style="margin: 4px 0;">

						<Col span="12" style="display: flex;">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2" style="margin:4px 20px;">
							<Button class="telmBtn" :style="item2.data_selected?selectedStyle:''"  :class="squareButtonArr.indexOf(subGameId)!=-1?'squareButton':''"  @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						    </div>
						</Col>
					</Row>
					<Row>
						<Col span="24">
							<p>※ 所有七个开奖号码的分数总和大于等于175为总分大；分数总和小于或等于174为总分小。</p>
						</Col>
					</Row>
					<Row v-if="index1==1" v-for="(item1,index1) in betDataList.numbers" :key="index1"  style="margin: 4px 0;">

						<Col span="12" style="display: flex;">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2" style="margin:4px 20px;">
							<Button class="telmBtn" :style="item2.data_selected?selectedStyle:''"  :class="squareButtonArr.indexOf(subGameId)!=-1?'squareButton':''"  @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						    </div>
						</Col>
					</Row>
				</Col>

			</Row>
		</div>
		</div>
		<!--六合彩色波-->
		<div>
			<div class="panel_1" style="margin: 12px 4px;" v-if="hk6BetNumbersConfig.sebo[subGameId]">
			<Row>
				<Col span="12">
					<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1<6" :key="index1" style="margin: 4px 0;">
						<Col span="4" >
							<Button class="seboBtn" :style="item1.data_selected?item1.rowName=='红'?selectedStyle_red:item1.rowName=='蓝'?selectedStyle_blue:item1.rowName=='绿'?selectedStyle_green:'':''" @click="onSelectHk6(index1)">{{item1.rowName}}</Button>
						</Col>
						<Col span="3" >
							<span style="line-height: 40px;color: red;">{{subGameList[index1].oddMax}}</span>
						</Col>
						<Col span="17">
							<div class="btn_box sebo" v-for="(item2,index2) in item1.cols" :key="index2" style="width: 36px;height: 36px;">
							<Button :style="item2.btnColor=='red'?selectedStyle_red:item2.btnColor=='blue'?selectedStyle_blue:item2.btnColor=='green'?selectedStyle_green:''" :class="'hk6Btn '+item2.btnColor" >{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
				</Col>

			</Row>
		</div>
		</div>
		<!--六合彩半波-->
		<div>
			<div class="panel_1" style="margin: 12px 4px;" v-if="hk6BetNumbersConfig.banbo[subGameId]">
			<Row>
				<Col span="12">
					<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1<6" :key="index1" style="margin: 4px 0;">
						<Col span="4" >
							<Button class="banbo" :style="item1.data_selected?selectedStyleHk6:''" @click="onSelectHk6(index1)">{{item1.rowName}}</Button>
						</Col>
						<Col span="4" >
							<span style="line-height: 40px;color: red;">{{subGameList[index1].oddMax}}</span>
						</Col>
						<Col span="16">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.btnColor=='red'?selectedStyle_red:item2.btnColor=='blue'?selectedStyle_blue:item2.btnColor=='green'?selectedStyle_green:''" :class="'hk6Btn '+item2.btnColor" >{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
				</Col>

			</Row>
		</div>
		</div>
		</div>
		<!--单式面板-->
		<div style="margin: 12px 0;" v-if="inputFormat" class="inputFormat">
			<div class="title">
				<span>温馨提示：多注号码请用英文逗号(,)或者英文分号(;)或者空格或者回车来分开</span>
				<Button class="empty" @click="empty">清空</Button>
			</div>
			<p style="color: rgb(240, 65, 52);height:18px;line-height:18px;text-align: center;margin-top: 2px;margin-bottom: 8px;">{{errPrompt}}</p>
			<div class="textarea">
				<Input  type="textarea"  placeholder="" :rows="8" @on-change="judgeFromat" v-model="inputTxt"></Input>
			</div>
		</div>
		<!--快三和值面板-->
		<div style="margin: 12px 0;" v-if="isKsSumVal" class="ksSumVal">
			<div class="btn_quick">
				<Button type="ghost" @click="quickSelect({row:0,value:'small'})">小(3-10)</Button>
				<Button type="ghost" @click="quickSelect({row:0,value:'odd'})">单(所有奇数)</Button>
				<Button type="ghost" @click="quickSelect({row:0,value:'even'})">双(所有偶数)</Button>
				<Button type="ghost" @click="quickSelect({row:0,value:'big'})">大(11-18)</Button>
			</div>
			<div v-for="(item1,index1) in betDataList.numbers" class="btn_num" :key="index1">
						<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
			</div>
			<div class="oddBox">
				<div class="odd" v-for="(item,index) in subGameList" v-if="index<8" :key="index">{{item.oddMax}}</div>
			</div>
		</div>
		<!--时时彩两面盘面板-->
		<div :style="SscSpecialStyle" v-if="isSscSpecial" class="sscSpecial">
			<!--整合面板-->
			<div class="integration" v-if="subGameId=='301401'">
			<Row>
				<Col span="12" style="margin-left: 30px;">
			    <Row v-for="(item1,index1) in betDataList.numbers" v-if="index1<5" :key="index1">
						<Col span="4">
						<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20">
						<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
						</Col>
				</Row>
			    </Col>
			    <Col span="9" style="margin-left: 30px;">
			    <Row v-for="(item1,index1) in betDataList.numbers" v-if="index1==5" :key="index1">
						<Col span="4">
						<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20">
						<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
						</Col>
					</Row>

			    </Col>
			</Row>
			</div>
			<!--龙虎合-->
			<div class="dragonTiger" v-if="subGameId!='301401'">
				<Row class="maxBox">
					<Col span="6" >

						<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1<4" :key="index1">
							<Col span="4" :style="subGameId =='301418'?{marginRight: '40px'}:{}">
								<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span></div>
							</Col>
							<Col span="20" >
								<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						        </div>
							</Col>
						</Row>
					</Col>
					<Col span="6" >
						<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1>=4&&index1<7" :key="index1">
							<Col span="4" :style="subGameId =='301418'?{marginRight: '40px'}:{}">
								<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span></div>
							</Col>
							<Col span="20">
								<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
							</Col>
						</Row>
					</Col>
					<Col span="6" >
						<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1>=7&&index1<9" :key="index1">
							<Col span="4" :style="subGameId =='301418'?{marginRight: '40px'}:{}">
								<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span></div>
							</Col>
							<Col span="20">
								<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
							</Col>
						</Row>
					</Col>
					<Col span="6" >
						<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1>=9" :key="index1">
							<Col span="4" :style="subGameId =='301418'?{marginRight: '40px'}:{}">
								<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span></div>
							</Col>
							<Col span="20">
								<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
							</Col>
						</Row>
					</Col>

				</Row>

			</div>
		</div>
		<!--北京赛车两面盘面板-->
		<div class="pk10_special" v-if="ispk10Special" style="margin: 12px 30px">
			<!--大小单双--><!--龙虎-->
			<div class="panel_1" v-if="subGameId=='600501'||subGameId=='600502'">
			<Row>
				<Col span="12">
					<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1<5" :key="index1">
						<Col span="4" :style="subGameId=='600502'?{marginRight:'40px'}:{}">
							<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
				</Col>
				<Col span="12" >
					<Row v-for="(item1,index1) in betDataList.numbers" v-if="index1>4" :key="index1">
						<Col span="4" >
							<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">{{item1.rowName}}</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20">
							<div class="btn_box" v-for="(item2,index2) in item1.cols" :key="index2">
							<Button :style="item2.data_selected?selectedStyle:''" @click="onSelect({row:index1,col:index2})">{{item2.label}}</Button>
						</div>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
		<!--冠亚合值-->
		<div class="panel_2" v-if="subGameId=='600503'||subGameId=='600507'">
			        <Row >
						<Col span="4" >
							<div class="ant-row-flex ant-row-flex-center ant-row-flex-middle"><span class="bet-number-btn-title skin-1"><span class="title">冠亚和值</span><span class="tri-arrow"></span></span>
						</div>
						</Col>
						<Col span="20" >
							<div class="btn_box"  v-for="(item1,index1) in betDataList.numbers" :key="index1">
							<Button :style="item1.cols[0].data_selected?selectedStyle:''" @click="onSelect({row:index1,col:0})">{{item1.cols[0].label}}</Button>
							<div  style="width: 40px;text-align: center;" >
								{{subGameList[index1].oddMax}}
							</div>
						    </div>
						</Col>
					</Row>
					<Row style="margin-bottom: 20px;">
						<Col span="4" >
						</Col>
						<Col span="20">

						</Col>
					</Row>
    </div>
    </div>
		<div class="checkbox" v-show="showHotColdOrOmit.indexOf(subGameId)!=-1">
			<CheckboxGroup v-model="fruit">
				<Checkbox label="冷热"></Checkbox>
				<Checkbox label="遗漏"></Checkbox>
			</CheckboxGroup>
		</div>
		<div style="display: flex;justify-content:center;align-items: center;">
			<Select size="large" style="width: 50px;margin-right: 16px;" v-model="unite" :transfer="true">
				<Option v-for="item in multipe" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</Select>
			<div style="margin-right: 24px;">
				<span>单价：</span>
				<InputNumber :max="99999" :min="1" v-model="price" @on-change="changeInput"></InputNumber>
			</div>
			<div class="oddMax_tag">
				<span>赔率&nbsp;</span>
				<Tag checkable color="#fcdbd9">{{oddTxtShow?odds.join(','):'--'}}</Tag>
			</div>
			<div class="betNote_tag" style="margin:0 8px;">
				您选中了
				<Tag checkable color="#d2eafb">{{ticketCount}}</Tag>注
			</div>
			<div class="betNote_tag" style="margin:0 8px;">
				共
				<Tag checkable color="#d2eafb">{{totalPrice}}</Tag>元
			</div>
			<div class="btn">
				<Button @click="quickBets" :loading="modal_loading">快捷投注</Button>
				<Button @click="insererNotes">
        		<Icon type="plus"></Icon>
        		添加</Button>
			</div>

		</div>
	</div>
</template>

<script>
	import bet_fn from '@/services/bet_fn.js';
	import gameConfig from "../../../static/js/gameConfig.js"
	import { mapState, mapActions } from "vuex";
	export default {
		created() {
		},
		 activated(){
            this.initStyle()
			this.inputTxt = "";
			this.ticketCount = 0;
			this.totalPrice = 0;
        },
		data() {
			return {
				odds:[],
				hk6BetNumbersConfig:hk6BetNumbersConfig,
				modal_loading:false,
				gameConfig:gameConfig,
				showHotColdOrOmit:bet_fn.showHotColdOrOmit,
				squareButtonArr:["300312","300412","300512","400201","400301","400501","200201","200701","200705","200709","200713","200717","200721","200502"],
				SscSpecialArr:["301407","301401","301418"],
				sumValArr:["100303","100403","200101","300203","300207","300211","300215","300303","300309","300403","300409","300503","300509","301003","301006","301103","301109","200501","200601","200602","200603","200604","200605","200606"],
				pk10SpecialArr:["600501","600502","600503","600507"],
				isSscSpecial:false,
				ispk10Special:false,
				ticketCount:0,
				inputFormat:false,
				fruit: [''],
				isKsSumVal:false,
				multipe: [{
						value: 1,
						label: '元',

					},
					{
						value: 0.1,
						label: '角'
					},
					{
						value: 0.01,
						label: '分'
					}
				],
				//button选中后的样式
				selectedStyle: {
//					background: "linear-gradient(0,#272a32 0,#4b4e58 100%)",
					color: "#ffffff",

          background: "#4c4a4d"
				},
				//六合彩特肖选中
				selectedStyleHk6:{
					background: '#fd9306  !important',
                    color: '#fff !important',
                    border: '#ccc 2px inset !important',
				},
				//六合彩button选中后的样式
				selectedStyle_red: {
					background: "#fa001a",
				},
				selectedStyle_blue: {
					background: "#0286c2",
				},
				selectedStyle_green: {
					background: "#449d44 ",
				},
				//两面盘面板样式
				SscSpecialStyle:{
					margin: "12px 0",
				},
				//总价
				totalPrice: 0,
				//单价
				price: 1,
				//金额单位元角分
				unite: 1,
				bileCodeArr:[],
				indeterminate: true,
                checkAll: false,
                checkAllGroup: ['万位', '千位'],
                checkAllValue:['万位','千位','百位','十位','个位'],
                specialChoice:['301001','301101','301201'],
                defaultSelectNum:2,
                selectNum:0,
                temporary:'',
                errPrompt:"",
                inputTxt:'',

			}

		},
		computed: {
			...mapState(["classId","lotteryDatas","betDataList", "leftName", "rightName", "subGameId", "kindId", "gameName", "awarPeriod","subGameList","selectMode","hotCold","omit","oddTxtShow"]),
			...mapState("bet",["showCheckBox"]),
		},
		methods: {
			...mapActions([
				"initStyle",
				 "quickBet",
				 "addShoppingBasket",
				 "setRecentQuickBetList",
				 "getUserDetail"
			]),
			...mapActions('bet',[
				"setShowCheckBox"
			]),
			empty(){
				this.inputTxt = '';
				this.errPrompt = '';
			},
			judgeFromat() {
				let result = calcInputBetCount(this.betDataList, this.inputTxt, [])
				this.errPrompt =result.msg;
				this.ticketCount = result.ticketCount;
				this.newNumbers = result.numbers;
			},
			changeInput(value) {
				this.totalPrice = this.price * this.unite * this.ticketCount;
			},
			onSelect(obj){
				let result;
				if(this.selectMode == '1'&&this.showCheckBox){
					result = bet_fn.onSelectBtn(obj,this.subGameId,this.betDataList,this.bileCodeArr,this.checkAllGroup);
				}else{
					result = bet_fn.onSelectBtn(obj,this.subGameId,this.betDataList,this.bileCodeArr,[]);
				}
				this.ticketCount = result.ticketCount;
				this.newNumbers = result.newNumbers;
			},

			onSelectHk6(index){
				if(hk6BetNumbersConfig.texiao[this.subGameId]&&this.subGameId!='200401'&&this.subGameId!='200901'){
					let numbersLg= this.subGameId.slice(4,6)*1
					if(this.newNumbers.length>=numbersLg&&!this.betDataList.numbers[index].data_selected){
						this.$Notice.warning({
					title: '投注提示',
					desc: '最多只能选取'+numbersLg+'个号码',
				});
				return false
					}
				}
				this.betDataList.numbers[index].data_selected = !this.betDataList.numbers[index].data_selected;
				let result = calcChooseBetCount(this.betDataList, []);
				this.ticketCount = result.ticketCount;
				this.newNumbers = result.newNumbers;
			},
			quickSelect(obj){
				let result
				if(this.selectMode == '1'&&this.showCheckBox){
					 result = bet_fn.quickBtnSelect(this.betDataList,obj,this.checkAllGroup);
				}else{
					 result = bet_fn.quickBtnSelect(this.betDataList,obj,[]);
				}
			    this.ticketCount = result.ticketCount;
				this.newNumbers = result.newNumbers;
			},
			insererNotes(){
				let boolen = false,data = {};
				this.ticketCount == 0 ? boolen = false : boolen = true;
				data.leftName = this.leftName;data.rightName = this.rightName;data.subGameId = this.subGameId;data.totalPrice = this.totalPrice;data.price = this.price;data.unite= this.unite;
				data.subGameList = this.subGameList;data.kindId = this.kindId;data.newNumbers = this.newNumbers;data.ticketCount = this.ticketCount;data.betDataList = this.betDataList;data.periodNo = this.awarPeriod;
				if(boolen){
				let lotteryData = bet_fn.getLotteryData(data,this.checkAllGroup);
				if(this.lotteryDatas[this.kindId]==null){
					this.lotteryDatas[this.kindId] = []
				}
				this.lotteryDatas[this.kindId] = this.lotteryDatas[this.kindId].concat(lotteryData)
				this.addShoppingBasket(this.lotteryDatas)
				this.initStyle()
				this.ticketCount = 0;
				this.totalPrice = 0;
				this.inputTxt = "";
				}else{
					this.$Notice.warning({
					title: 'M5II通知',
					desc: '请至少选择一注'
				});
				}
			},
			quickBets(){
				var d=new Date();
                var _date=d.toLocaleString();
                var lotteryType = this.gameConfig[this.kindId].gameName;
				let boolen = false,data = {},params;
				this.ticketCount == 0 ? boolen = false : boolen = true;
				data.leftName = this.leftName;data.rightName = this.rightName;data.subGameId = this.subGameId;data.totalPrice = Math.round(this.totalPrice*100)/100;data.price = this.price;data.unite= this.unite;
				data.subGameList = this.subGameList;data.kindId = this.kindId;data.newNumbers = this.newNumbers;data.ticketCount = this.ticketCount;data.betDataList = this.betDataList;data.periodNo = this.awarPeriod;
				if(boolen){
				this.modal_loading = true;
				let lotteryData = bet_fn.getLotteryData(data,this.checkAllGroup);
				let params = bet_fn.quickBets({lotteryData:lotteryData,kindId:this.kindId,orderFrom:"1",orderType:"0",periodNo:this.awarPeriod});
				this.quickBet(params).then((res)=>{
					this.modal_loading = false;
					if(res.code == "0"){
						this.$Message.success('下注成功');
						this.getUserDetail()
				this.initStyle()
				this.inputTxt = "";
				this.ticketCount = 0;
				this.totalPrice = 0;

				lotteryData.forEach((item)=>{
					item._date = _date;
					item.lotteryType = lotteryType;
					item.kindId = this.kindId;
				})
				this.setRecentQuickBetList(lotteryData)
					}else{
						 this.modal_loading = false;
						 this.$Message.error('下注失败, '+res.msg);
						 this.initStyle()
						 this.inputTxt = "";
				this.ticketCount = 0;
				this.totalPrice = 0;
					}
				})
				}else{
					this.$Notice.warning({
					title: 'M5II通知',
					desc: '请至少选择一注'
				});
				}
			},
			 handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['万位','千位','百位','十位','个位'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === this.checkAllValue.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
             combination(arr, num) {
        var result = [];
        (function f(t, a, n) {
            if (n === 0)
                return result.push(t);
            for (var i = 0, l = a.length; i <= l - n; i++) {
                f(t.concat([a[i]]), a.slice(i + 1), n - 1);
            }
        })([], arr, num);
        return result;
    },
    oddsTxt(){
    	        this.odds = []
			    if(this.classId == '3'){

			    	if(this.leftName == '整合'||this.leftName == '和值单双'){
			    		this.odds.push(this.subGameList[0].oddMax)
			    	}else if(this.leftName == '龙虎'){
			    		this.odds.push(this.subGameList[0].oddMax)
			    		this.odds.push(this.subGameList[10].oddMax)
			    	}else{
			    		this.subGameList.forEach((item)=>{
					this.odds.push(item.oddMax);
				})

			    	}
			    }else{
			    	this.subGameList.forEach((item)=>{
					this.odds.push(item.oddMax);
				})
			    }
    },
		},
		watch: {
			ticketCount() {
				this.totalPrice = Math.round(this.price * this.unite * this.ticketCount*100)/100
			},
			price() {
			this.totalPrice = Math.round(this.price * this.unite * this.ticketCount*100)/100
			},
			unite() {
				this.totalPrice = Math.round(this.price * this.unite * this.ticketCount*100)/100
			},
			betDataList(newData){
				this.oddsTxt()
				this.bileCodeArr = [];
				this.inputFormat = newData.inputFormat;
				if(this.subGameId=='400101'){
				this.isKsSumVal = true
			    }else{
				this.isKsSumVal = false
			    }
			    if(this.SscSpecialArr.indexOf(this.subGameId)!=-1){
			    	this.isSscSpecial = true
			    }else{
			    	this.isSscSpecial = false
			    }
			    if(this.pk10SpecialArr.indexOf(this.subGameId)!=-1){
			    	this.ispk10Special = true
			    }else{
			    	this.ispk10Special = false
			    }

			},
			subGameId(newId){
				this.specialChoice.indexOf(newId) == -1?this.setShowCheckBox(true):this.setShowCheckBox(false);
				this.defaultSelectNum  = newId.slice(3,4)*1+2;
 				this.checkAllGroup = this.checkAllValue.slice(0,this.defaultSelectNum);
 				this.inputTxt = "";
			},
			checkAllGroup(newArr){
				let length = newArr.length;

				if(length<this.defaultSelectNum){
					this.selectNum = 0;
				}else{
					this.selectNum = this.combination(this.checkAllGroup,this.defaultSelectNum).length
				}
				let result = calcChooseBetCount(this.betDataList, this.checkAllGroup)
				this.ticketCount = result.ticketCount;
				this.newNumbers = result.newNumbers;

			}
		}
	}
</script>

<style>
	[v-cloak] { display: none }
	.betPlatte .ant-row-flex-middle {
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.betPlatte .ant-row-flex-center {
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
	}

	.betPlatte .ant-row-flex,
	.ant-row-flex:after,
	.ant-row-flex:before {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.betPlatte .ant-row-flex {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-flow: row wrap;
		flex-flow: row wrap;
		font-size: 12px;
		color: rgba(0, 0, 0, .65);
	}

	.betPlatte .bet-number-btn-title {
		height: auto;
		margin-right: -15px;
		white-space: nowrap;
		margin-left: 10px;
	}

	.betPlatte .skin-1 {
		/*background: linear-gradient(0, #272a32 0, #4b4e58 100%)!important;*/
		color: #fff!important;

    background: #4c4a4d;
	}

	.betPlatte .bet-number-btn-title .title {
		display: inline-block;
		height: 25px;
		line-height: 25px;
		color: #fff;
		padding: 0 8px;
	}

	.betPlatte .bet-number-btn-title .tri-arrow {
		display: inline-block;
		position: relative;
		width: 30px;
		height: 25px;
		vertical-align: top;
	}

	.betPlatte .bet-number-btn-title .tri-arrow:before {
		top: 0;
		border-top: 25px solid #fff;
	}

	.betPlatte .bet-number-btn-title .tri-arrow:after,
	.bet-number-btn-title .tri-arrow:before {
		position: absolute;
		content: '';
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
	}

	.betPlatte .bet-number-btn-title .tri-arrow:after {
		bottom: 0;
		border-bottom: 25px solid #fff;
	}

	.betPlatte .bet-number-btn-title .tri-arrow:after,
	.bet-number-btn-title .tri-arrow:before {
		position: absolute;
		content: '';
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
	}
	.betPlatte .btn_box{
		width: 40px;
		height: 40px;
	}
	.betPlatte .btn_box .ivu-btn {
		width: 40px;
		height: 40px;
		line-height: 1.15;
		font-size: 20px;
		/*background: linear-gradient(0, #e1e2e4 0, #fdfeff 100%);*/
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-radius: 50%;

    background: #eeeeee;
	}

	.betPlatte .btn_box .ivu-btn:hover {
		width: 40px;
		height: 40px;
		line-height: 1.15;
		font-size: 20px;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-radius: 50%;
	}

	.betPlatte .ivu-btn:focus {
		box-shadow: none;
		/*border-color: #57a3f3;*/
		/*color: #57a3f3;*/
	}

	.betPlatte .ivu-col-span-18 .ivu-col-span-4 .ant-row-flex {
		vertical-align: middle;
		height: 46px;
	}

	.betPlatte .ivu-col-span-18 .ivu-col-span-20 {
		padding-left: 5px;
		padding-right: 5px;
		height: 44px;
		padding-top: 2px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.betPlatte .quickSelect .ivu-btn {
		padding: 0 8px;
	}

	.betPlatte .ivu-row .ivu-col.ivu-col-span-6 {
		height: 44px;
		display: flex;
		align-items: center;
	}

	.betPlatte .checkbox {
		height: 32px;
		line-height: 32px;
		text-align: center;
	}

	.betPlatte .ivu-select .ivu-select-selection {
		height: 32px;
	}

	.betPlatte .ivu-select .ivu-select-selection .ivu-select-selected-value {
		height: 32px;
		line-height: 32px;
		font-size: 12px;
	}

	.betPlatte .oddMax_tag .ivu-tag .ivu-tag-text {
		color: #f04134 !important;
	}

	.betPlatte .betNote_tag .ivu-tag-text {
		color: #108ee9 !important;
	}

	.betPlatte .btn .ivu-btn:nth-child(1) {
		/*background: linear-gradient(0, #272a32 0, #4b4e58 100%)!important;*/
		color: #fff!important;

    background: #4c4a4d;
	}

	.betPlatte .ivu-select-dropdown {
		position: absolute !important;
	}
	.betPlatte .inputFormat .title{
		display: flex;
		justify-content:center;
		align-items: center;
		color: rgba(0,0,0,.65);
	}
	.betPlatte .inputFormat .title .empty{
		margin-left: 14px;
		color: #ffffff;
		/*background: linear-gradient(0,#272a32 0,#4b4e58 100%)!important;*/

    background: #4c4a4d;
	}
	.betPlatte .inputFormat .textarea{
		width: 720px;
		height: 200px;
		overflow: auto;
		margin: 0 auto;
	}
	.betPlatte .inputFormat .textarea textarea{
		width: 720px;
		min-height: 190px;
		overflow: hidden;
	}
	.betPlatte .ksSumVal .btn_quick{
		display: flex;
		justify-content: center;
	}
	.betPlatte .ksSumVal .ivu-btn-ghost{
		margin: 5px;
	}
	.betPlatte .ivu-btn-ghost{
		color: rgba(0,0,0,.65);
	}
	.betPlatte .ivu-btn-ghost:hover{
		color:#2d8cf0 ;
	}
	.betPlatte .ksSumVal .btn_num{
		display: flex;
		width: 520px;
		justify-content: center;
		flex-wrap: wrap;
		margin:0 auto;
	}
	.betPlatte .ksSumVal .btn_num .btn_box{

		margin: 10px;
	}
	.betPlatte .ksSumVal .oddBox{
		display: flex;
		width: 520px;
		justify-content: center;
		margin:0 auto;
	}
	.betPlatte .ksSumVal .oddBox .odd{
		width: 40px;
		height: 18px;
		margin:0 10px;
		text-align: center;
	}
	.betPlatte .sscSpecial .ivu-col-span-12 .ivu-row .ivu-col-span-4{
		margin-right: 24px;
	}
	.betPlatte .sscSpecial .ivu-col-span-9 .ivu-row .ivu-col-span-4{
		margin-right: 24px;
	}
	.betPlatte .sscSpecial .ivu-col-span-12 .ivu-row .ivu-col-span-20 .btn_box{
		margin:2px 5px;
	}
	.betPlatte .sscSpecial .ivu-col-span-12 .ivu-row ,.betPlatte .sscSpecial .ivu-col-span-12 .ivu-row {
		display: flex;
		align-items: center;
	}
	.betPlatte .sscSpecial .ivu-col-span-12 .ivu-row .ivu-col-span-4,.betPlatte .sscSpecial .ivu-col-span-12 .ivu-row .ivu-col-span-20{
		display: flex;
	}
	.betPlatte .sscSpecial .ivu-col-span-9 .ivu-row{
		display: flex;
	}
	.betPlatte .sscSpecial .ivu-col-span-9 .ivu-row .ivu-col-span-4,.betPlatte .sscSpecial .ivu-col-span-9 .ivu-row .ivu-col-span-20{
		display: flex;
		align-items: center;
	}
	.betPlatte .sscSpecial .ivu-col-span-9 .ivu-row .ivu-col-span-20 .btn_box{
		margin:2px 5px;
	}
	.betPlatte .dragonTiger .ivu-row .ivu-col-span-6{
		display: flex;
		flex-wrap: wrap;
	}
	.betPlatte .dragonTiger .ivu-row .ivu-col-span-6 .ivu-row{
		display: flex;
		align-items: center;
	}
	.betPlatte .dragonTiger .ivu-row .ivu-col-span-6 .ivu-row .ivu-col-span-4{
		display: flex;
		align-items: center;
		margin-right: 30px;

	}
	.betPlatte .dragonTiger .ivu-row .ivu-col-span-6 .ivu-row .ivu-col-span-20{
		display: flex;
		align-items: center;



	}
	.betPlatte .dragonTiger .ivu-row .ivu-col-span-6 .ivu-row .ivu-col-span-20 .btn_box{
		margin: 2px 1px;

	}
	.betPlatte .dragonTiger .ivu-row.maxBox{
		display: flex;
		height: 176px;

	}
	.betPlatte .dragonTiger .bet-number-btn-title{
		margin-left: 8px;
	}
	.betPlatte .ordinaryPanel .ivu-row .ivu-col-span-22 .ivu-row{
		display: flex;
		align-items: center;
	}
	.betPlatte .ordinaryPanel .ivu-row .ivu-col-span-22 .ivu-row .ivu-col-span-20{
		display: flex;
		flex-wrap: wrap;
	}
	.betPlatte .ordinaryPanel .ivu-row .ivu-col-span-22 .ivu-row .ivu-col-span-20 .btn_box{
		margin: 4px;
	}
	.betPlatte .ordinaryPanel .ivu-row{
		display: flex;
		align-items: center;
	}
	.betPlatte .ordinaryPanel .ivu-row .ivu-col-span-2 .quickSelect{
		display: flex;


	}
	.betPlatte .hk6Style .panel_1 .ivu-row .ivu-col-span-12 .ivu-row{
		display: flex;
		justify-content: center;
	}
	.betPlatte .hk6Style .panel_1 .ivu-row .ivu-col-span-12 .ivu-col{
		display: flex;

	}
	.betPlatte .hk6Style .panel_1 .ivu-row .ivu-col-span-12 .ivu-col-span-20 .btn_box{
		margin: 4px;
	}
	.betPlatte .pk10_special .panel_1 .ivu-row .ivu-col-span-12 .ivu-row{
		display: flex;
		justify-content: center;
	}
	.betPlatte .pk10_special .panel_1 .ivu-row .ivu-col-span-12 .ivu-col{
		display: flex;

	}
	.betPlatte .pk10_special .panel_1 .ivu-row .ivu-col-span-12 .ivu-col-span-20 .btn_box{
		margin: 4px;
	}
	.betPlatte .pk10_special .panel_2  .ivu-row{
		display: flex;
		justify-content: center;
	}
	.betPlatte .pk10_special .panel_2 .ivu-row  .ivu-col{
		display: flex;
		flex-wrap: wrap;
	}
	.betPlatte .pk10_special .panel_2 .ivu-row  .ivu-col-span-20 .btn_box{
		margin:10px 12px;
	}
	.betPlatte .pk10_special{
		margin-left: 32px;
	}
	.betPlatte .ivu-col .btn_box .squareButton{
		width: auto;
		border-radius: 4px;
		padding: 0 15px;
	}
	.betPlatte .hotCold .ivu-tag.bgblue,.betPlatte .omit .ivu-tag.bgblue{
		background: #d2eafb;
		border: none;
	}
	.betPlatte .hotCold .ivu-tag.bgred,.betPlatte .omit .ivu-tag.bgred{
		background: #fcdbd9;
		border: none;
	}
	.betPlatte .hotCold .ivu-tag.bgblue span,.betPlatte .omit .ivu-tag.bgblue span{
		color: #108ee9;
	}
	.betPlatte .hotCold .ivu-tag.bgred span,.betPlatte .omit .ivu-tag.bgred span{
		color: #f04134;
	}
	.betPlatte .hotCold,.betPlatte .omit{
		height: 24px;
	}
	.betPlatte .hotCold .ivu-tag,.betPlatte .omit .ivu-tag{
		width: 38px;
		height: 22px;
		text-align: center;
		background: none;
		border: none;
	}
	.betPlatte .hotcold-label{
	display: block;
	text-align: center;
	height: 20px;
    line-height: 20px;
    background: #fc0;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
	}

  .betPlatte .btn_box .hk6Btn.red{
    display:flex;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 2px solid;
    font-weight: bold;
    border-radius: 50%;
    border-color: #ff2e44 !important;
    border-style: inset !important;
    color: #000000 ;
    background: #FFFFFF;
	}
	.betPlatte .btn_box .hk6Btn.blue{
    display:flex;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 2px solid;
    font-weight: bold;
    border-radius: 50%;
    border-color: #03a9f4 !important;
    border-style: inset !important;
    color: #000000;
    background: #FFFFFF;
	}
	.betPlatte .ordinaryPanel.hk6 .btn_box{
		margin: 4px 10px !important;
	}
	.betPlatte .btn_box .hk6Btn.green{
    display:flex;
    width: 40px;
    height: 40px;
    text-align: center;
    border: 2px solid;
    font-weight: bold;
    border-radius: 50%;
    border-color: #87de75 !important;
    border-style: inset !important;
    color: #000000;
    background: #FFFFFF;
	}
	.betPlatte .zodiac{
	display: flex;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-radius: 50%;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	}
	.betPlatte .banbo,.betPlatte .seboBtn{
		display: flex;
    width: 50px;
    height: 40px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    border-radius:4px;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
	}
	.betPlatte .zodiac:hover{
	background-color: #fd9306 !important;
    color: #fff !important;
    border: #ccc 2px ;
	}
	.betPlatte .telmBtn {
		width: 75px !important;
	}
	.betPlatte .btn_box.sebo{
		margin-left:2px;
	}
	.betPlatte .btn_box.sebo .ivu-btn{
		width: 36px !important;
		height: 36px !important;
	}

</style>
