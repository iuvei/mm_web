//interface IchartSizeConfigItemProps {
//  numberValues: string[] // 每个位置的开奖号码有哪些值
//  periodNoRadio: number // 期号长度
//  resultPositions: string[] // 开奖号码对应的位置，同时也是开奖号码的长度，如时时彩对应万千百十个
//  resultRadio: number // 开奖结果长度
//}

const ftcChartSizeConfig = {
    numberValues: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    periodNoRadio: 7,
    resultPositions: ['百位', '十位', '个位'],
    resultRadio: 3,
}

const shsslChartSizeConfig = {
    numberValues: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    periodNoRadio: 7,
    resultPositions: ['百位', '十位', '个位'],
    resultRadio: 3,
}

const sscChartSizeConfig = {
    numberValues: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    periodNoRadio: 8,
    resultPositions: ['万位', '千位', '百位', '十位', '个位'],
    resultRadio: 6,
}

const elevenChartSizeConfig = {
    numberValues: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'],
    periodNoRadio: 8,
    resultPositions: ['万位', '千位', '百位', '十位', '个位'],
    resultRadio: 8,
}

const k3ChartSizeConfig = {
    numberValues: ['1', '2', '3', '4', '5', '6'],
    periodNoRadio: 8,
    resultPositions: ['百位', '十位', '个位'],
    resultRadio: 6,
}

const bjpk10ChartSizeConfig = {
    numberValues: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    periodNoRadio: 6,
    resultPositions: ["冠", "亚", "季", "四", "五", "六", "七", "八", "九", "十"],
    resultRadio: 18,
}

const mlaftChartSizeConfig= {
    numberValues: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
    periodNoRadio: 6,
    resultPositions: ["冠", "亚", "季", "四", "五", "六", "七", "八", "九", "十"],
    resultRadio: 18,
}

 const chartSizeConfig = {
    'm5ffc': sscChartSizeConfig,
    'm53fc': sscChartSizeConfig,
    'm55fc': sscChartSizeConfig,
    'cqssc': sscChartSizeConfig,
    'tjssc': sscChartSizeConfig,
    'xjssc': sscChartSizeConfig,
    'txffc': sscChartSizeConfig,
    'gd11x5': elevenChartSizeConfig,
    'jxssc': sscChartSizeConfig,
    'sd11x5': elevenChartSizeConfig,
    'm511x5': elevenChartSizeConfig,
    'sh11x5': elevenChartSizeConfig,
    'jx11x5': elevenChartSizeConfig,
    'ahk3': k3ChartSizeConfig,
    'm5k3': k3ChartSizeConfig,
    'jsk3': k3ChartSizeConfig,
    'gxk3': k3ChartSizeConfig,
    'bjpk10': bjpk10ChartSizeConfig,
    'mlaft': mlaftChartSizeConfig,
    'fc3d': ftcChartSizeConfig,
    'pl3': ftcChartSizeConfig,
    'shssl': shsslChartSizeConfig,
}

//export interface IchartColorConfigProps {
//  borderColor: string // 表格线的颜色
//  colBgs: string[] // 号码区域的列颜色，根据位置间隔开
//  headerBg: string // 表头的背景色
//  headerColor: string // 表头的字体颜色
//  lineBgs: string[] // 开奖号码的折线颜色，为两种颜色交替
//  omitColor: string // 遗漏数字的颜色
//  periodNoColor: string // 期号的颜色
//  resultColor: string // 开奖号码的颜色
//  rowBgs: string[] // 行的背景色
//  selectedRowColor: string // 表格线的颜色
//}

 const chartColorConfig = [
    {
        borderColor: '#ccc',
        colBgs: ['rgba(252,190,109,0.5)', 'transparent'],
        headerBg: '#e74c3c',
        headerColor: '#fff',
        lineBgs: ['#e74c3c', '#108ee9'],
        omitColor: '#333',
        periodNoColor: '#212121',
        resultColor: '#e74c3c',
        rowBgs: ['#f1f1f1', '#e0e0e0'],
        selectedRowColor: '#b9f6ca',
    }
]
export default {
	chartSizeConfig,
	chartColorConfig
}