//改变数据为可用格式(三级导航)
function remodelerData(data){
//	console.log(data)
	let gameNames = []
	data.standGameList.forEach((item1,index1)=>{
		let i = -1 ;
		let leftNames = []
		let gameName = item1.gameName
		gameNames[index1] = {}
		gameNames[index1]["gameName"]=gameName
		gameNames[index1]["list"]=[]
		
		item1.gameSons.forEach((item2,index2)=>{
			let leftName = item2.leftName
			if(leftNames.indexOf(leftName)==-1){
				i++ ;
				leftNames.push(leftName)
				gameNames[index1]["list"][i] = {}
				gameNames[index1]["list"][i]['leftName'] = leftName
				gameNames[index1]["list"][i]['games'] = []
				
				
			}
			gameNames[index1]["list"][i]['games'].push(item2)
		})
	})
	return gameNames
}
//数组去重
function unique(arr) {
				var result = [],
					hash = {};
				for(var i = 0, elem;
					(elem = arr[i]) != null; i++) {
					if(!hash[elem]) {
						result.push(elem);
						hash[elem] = true;
					}
				}
				return result;
			}
//快捷选号
function quickBtnSelect(data){
	let betDataList = data.betDataList,value = data.value,row = data.row;
	let middleNumber = betDataList.max / 2;
				switch(value) {
					case 'all': //全选
						for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
							betDataList.numbers[row]["cols"][k]["data_selected"] = true;
						}
						break;
					case 'big': //大
						for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
							if(parseInt(betDataList.numbers[row].cols[k].label) > middleNumber) {
								betDataList.numbers[row]["cols"][k]["data_selected"] = true;
							} else {
								betDataList.numbers[row]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'small': //小
						for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
							if(parseInt(betDataList.numbers[row].cols[k].label) <= middleNumber) {
								betDataList.numbers[row]["cols"][k]["data_selected"] = true;
							} else {
								betDataList.numbers[row]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'odd': //单
						for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
							if(parseInt(betDataList.numbers[row].cols[k].label) % 2 === 1) {

								betDataList.numbers[row]["cols"][k]["data_selected"] = true;

							} else {
								betDataList.numbers[row]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'even': //双
						for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
							if(parseInt(betDataList.numbers[row].cols[k].label) % 2 === 0) {
								betDataList.numbers[row]["cols"][k]["data_selected"] = true;
							} else {
								betDataList.numbers[row]["cols"][k]["data_selected"] = false;
							}
						}
						break;
					case 'clear': //清
						for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
							betDataList.numbers[row]["cols"][k]["data_selected"] = false;
						}
						break;
				}
				return betDataList
}
//各玩法提交方式
function presentation(_a,_b,_c){
	let subGameId = _c,oldNumbers = _a,betDataList = _b;
	let newNumbers = [];
	
	 oldNumbers.forEach((item,index)=>{
		  	item.length === 0?item = "?":item = item.join("");
		  	newNumbers.push(item)
		  })
	 newNumbers = newNumbers.join(",")
	 return newNumbers
}
//初始化投注面板
function initBetPlatte(_a){
	let betDataList = _a
	betDataList.numbers.forEach((items)=>{
		items.cols.forEach((item)=>{
			item.data_selected = false;
		})
	})
	return betDataList
}
export default{
	remodelerData,
	quickBtnSelect,
	presentation,
	initBetPlatte
}