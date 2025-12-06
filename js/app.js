// 全局变量
let chartInstances = [];
let currentLayout = '2x2';
let currentChartType = 'line';
let currentColorScheme = 'default';
let currentDataSet = 'factory';
let currentAnimation = 'none';

// 配色方案定义
const colorSchemes = {
    default: ['#667eea', '#764ba2', '#f093fb', '#c471f5', '#fa709a', '#fee140', '#30cfd0', '#330867'],
    ocean: ['#2E3192', '#1BFFFF', '#00D4FF', '#0099CC', '#00557F', '#003D5C', '#002635', '#001219'],
    sunset: ['#FF6B6B', '#FFA07A', '#FFD700', '#FF8C00', '#FF6347', '#FF4500', '#DC143C', '#8B0000'],
    forest: ['#228B22', '#32CD32', '#00FF00', '#7CFC00', '#ADFF2F', '#9ACD32', '#6B8E23', '#556B2F'],
    rainbow: ['#FF1493', '#FF69B4', '#FFB6C1', '#FFA500', '#FFD700', '#ADFF2F', '#00CED1', '#9370DB'],
    monochrome: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7', '#ECF0F1', '#D5DBDB', '#ABB2B9']
};

// 数据集定义
const dataSets = {
    factory: {
        name: '工厂产品分析',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        productA: [20, 28, 23, 16, 29, 36, 39, 33, 31, 19, 21, 25],
        productB: [17, 22, 39, 26, 35, 23, 25, 27, 29, 38, 28, 20]
    },
    climate: {
        name: '气象数据分析',
        months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        temperature: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 33.4, 23.0, 16.5, 12.0, 6.2],
        precipitation: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        evaporation: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    },
    social: {
        name: '社交媒体数据',
        platforms: ['微信', '微博', '抖音', '小红书', 'B站', '知乎'],
        users: [1200, 850, 1500, 620, 980, 450],
        engagement: [85, 72, 90, 68, 75, 55],
        growth: [12, 8, 25, 15, 18, 6]
    },
    economic: {
        name: '经济指标数据',
        quarters: ['Q1', 'Q2', 'Q3', 'Q4'],
        gdp: [6.8, 7.2, 7.5, 8.1],
        inflation: [2.1, 2.3, 1.8, 1.6],
        unemployment: [4.2, 3.8, 3.5, 3.2]
    }
};

// 布局预设定义
const layoutPresets = {
    grid2x2: {
        layout: '2x2',
        charts: [
            { type: 'line', data: 'productA', title: '产品A销售额' },
            { type: 'line', data: 'productB', title: '产品B销售额' },
            { type: 'pie', data: 'productA', title: '产品A占比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ]
    },
    grid2x3: {
        layout: '2x3',
        charts: [
            { type: 'line', data: 'productA', title: '产品A销售额' },
            { type: 'line', data: 'productB', title: '产品B销售额' },
            { type: 'bar', data: 'productA', title: '产品A柱状图' },
            { type: 'bar', data: 'productB', title: '产品B柱状图' },
            { type: 'pie', data: 'productA', title: '产品A占比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ]
    },
    complex: {
        layout: 'irregular',
        charts: [
            { type: 'line', data: 'productA', title: '产品A销售趋势', rowspan: 2, colspan: 2 },
            { type: 'bar', data: 'productB', title: '产品B月度对比' },
            { type: 'pie', data: 'productA', title: '产品A季度占比' },
            { type: 'pie', data: 'productB', title: '产品B季度占比' },
            { type: 'area', data: 'productA', title: '产品A面积图' }
        ]
    },
    irregular: {
        layout: 'irregular',
        charts: [
            { type: 'scatter', data: 'temperature', title: '温度与降水量', rowspan: 2 },
            { type: 'bar', data: 'precipitation', title: '降水量对比' },
            { type: 'line', data: 'evaporation', title: '蒸发量趋势' },
            { type: 'radar', data: 'platforms', title: '平台综合分析', colspan: 2 }
        ]
    }
};

// 初始化函数
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    updateSubplots();
});

// 初始化事件监听器
function initializeEventListeners() {
    document.getElementById('updateCharts').addEventListener('click', updateSubplots);
    document.getElementById('subplotLayout').addEventListener('change', handleLayoutChange);
    document.getElementById('chartType').addEventListener('change', handleChartTypeChange);
    document.getElementById('colorScheme').addEventListener('change', handleColorSchemeChange);
    document.getElementById('dataSet').addEventListener('change', handleDataSetChange);
    document.getElementById('animation').addEventListener('change', handleAnimationChange);
}

// 处理布局变化
function handleLayoutChange(e) {
    currentLayout = e.target.value;
    updateSubplots();
}

// 处理图表类型变化
function handleChartTypeChange(e) {
    currentChartType = e.target.value;
    updateSubplots();
}

// 处理配色方案变化
function handleColorSchemeChange(e) {
    currentColorScheme = e.target.value;
    updateSubplots();
}

// 处理数据集变化
function handleDataSetChange(e) {
    currentDataSet = e.target.value;
    updateSubplots();
}

// 处理动画变化
function handleAnimationChange(e) {
    currentAnimation = e.target.value;
    updateSubplots();
}

// 更新子图
function updateSubplots() {
    const container = document.getElementById('subplotsGrid');
    container.innerHTML = '';
    chartInstances = [];

    const layout = currentLayout;
    const gridClass = `grid-${layout}`;
    container.className = `subplots-grid ${gridClass}`;

    let charts = [];
    
    // 根据布局和数据集生成图表配置
    if (layout === '2x2') {
        charts = [
            { type: currentChartType, data: 'productA', title: '产品A销售额' },
            { type: currentChartType, data: 'productB', title: '产品B销售额' },
            { type: 'pie', data: 'productA', title: '产品A占比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ];
    } else if (layout === '2x3') {
        charts = [
            { type: currentChartType, data: 'productA', title: '产品A销售额' },
            { type: currentChartType, data: 'productB', title: '产品B销售额' },
            { type: 'bar', data: 'productA', title: '产品A柱状图' },
            { type: 'bar', data: 'productB', title: '产品B柱状图' },
            { type: 'pie', data: 'productA', title: '产品A占比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ];
    } else if (layout === '3x2') {
        charts = [
            { type: currentChartType, data: 'productA', title: '产品A分析1' },
            { type: currentChartType, data: 'productB', title: '产品B分析1' },
            { type: 'bar', data: 'productA', title: '产品A分析2' },
            { type: 'bar', data: 'productB', title: '产品B分析2' },
            { type: 'pie', data: 'productA', title: '产品A占比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ];
    } else if (layout === '3x3') {
        charts = [
            { type: currentChartType, data: 'productA', title: '图表1' },
            { type: currentChartType, data: 'productB', title: '图表2' },
            { type: 'bar', data: 'productA', title: '图表3' },
            { type: 'bar', data: 'productB', title: '图表4' },
            { type: 'pie', data: 'productA', title: '图表5' },
            { type: 'pie', data: 'productB', title: '图表6' },
            { type: 'line', data: 'productA', title: '图表7' },
            { type: 'line', data: 'productB', title: '图表8' },
            { type: 'area', data: 'productA', title: '图表9' }
        ];
    } else if (layout === '1x4') {
        charts = [
            { type: currentChartType, data: 'productA', title: '产品A销售额' },
            { type: currentChartType, data: 'productB', title: '产品B销售额' },
            { type: 'bar', data: 'productA', title: '产品A对比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ];
    } else if (layout === '4x1') {
        charts = [
            { type: currentChartType, data: 'productA', title: '产品A趋势' },
            { type: currentChartType, data: 'productB', title: '产品B趋势' },
            { type: 'bar', data: 'productA', title: '产品A对比' },
            { type: 'pie', data: 'productB', title: '产品B占比' }
        ];
    } else if (layout === 'irregular') {
        if (currentDataSet === 'climate') {
            charts = [
                { type: 'bar', data: 'temperature', title: '气温与降水量', colspan: 2 },
                { type: 'line', data: 'evaporation', title: '蒸发量趋势' },
                { type: 'area', data: 'precipitation', title: '降水量面积图', colspan: 2 }
            ];
        } else {
            charts = [
                { type: currentChartType, data: 'productA', title: '主图', colspan: 2, rowspan: 2 },
                { type: 'bar', data: 'productB', title: '子图1' },
                { type: 'pie', data: 'productA', title: '子图2' },
                { type: 'pie', data: 'productB', title: '子图3' }
            ];
        }
    }

    // 创建子图容器
    charts.forEach((chartConfig, index) => {
        const subplotDiv = document.createElement('div');
        subplotDiv.className = 'subplot-container';
        
        // 设置grid位置
        if (layout === 'irregular') {
            if (index === 0) {
                subplotDiv.style.gridColumn = '1 / span 2';
                subplotDiv.style.gridRow = '1 / span 2';
            } else if (index === 1) {
                subplotDiv.style.gridColumn = '3';
                subplotDiv.style.gridRow = '1';
            } else if (index === 2) {
                subplotDiv.style.gridColumn = '1';
                subplotDiv.style.gridRow = '2';
            } else if (index === 3) {
                subplotDiv.style.gridColumn = '2';
                subplotDiv.style.gridRow = '2';
            }
        }
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'subplot-title';
        titleDiv.textContent = chartConfig.title;
        
        const chartDiv = document.createElement('div');
        chartDiv.className = 'subplot-chart';
        chartDiv.id = `chart-${index}`;
        
        subplotDiv.appendChild(titleDiv);
        subplotDiv.appendChild(chartDiv);
        container.appendChild(subplotDiv);
        
        // 初始化ECharts实例
        setTimeout(() => {
            const chart = echarts.init(chartDiv);
            chartInstances.push(chart);
            
            const options = getChartOptions(chartConfig.type, chartConfig.data, chartConfig.title);
            chart.setOption(options);
            
            // 响应式处理
            chart.resize();
        }, 100);
    });

    // 响应式处理
    setTimeout(() => {
        window.addEventListener('resize', () => {
            chartInstances.forEach(chart => {
                if (chart && chart.resize) {
                    chart.resize();
                }
            });
        });
    }, 200);
}

// 获取图表选项
function getChartOptions(type, dataKey, title) {
    const colors = colorSchemes[currentColorScheme];
    let data = [];
    let options = {};

    if (currentDataSet === 'factory') {
        const factoryData = dataSets.factory;
        if (dataKey === 'productA') {
            data = factoryData.months.map((month, index) => ({
                name: month,
                value: factoryData.productA[index]
            }));
        } else if (dataKey === 'productB') {
            data = factoryData.months.map((month, index) => ({
                name: month,
                value: factoryData.productB[index]
            }));
        }
    } else if (currentDataSet === 'climate') {
        const climateData = dataSets.climate;
        if (dataKey === 'temperature') {
            data = climateData.months.map((month, index) => ({
                name: month,
                value: climateData.temperature[index]
            }));
        } else if (dataKey === 'precipitation') {
            data = climateData.months.map((month, index) => ({
                name: month,
                value: climateData.precipitation[index]
            }));
        } else if (dataKey === 'evaporation') {
            data = climateData.months.map((month, index) => ({
                name: month,
                value: climateData.evaporation[index]
            }));
        }
    }

    const animationDuration = currentAnimation === 'none' ? 0 : 1000;
    const animationEasing = getAnimationEasing(currentAnimation);

    switch (type) {
        case 'line':
            options = {
                title: {
                    text: title,
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors[0]
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors[0],
                    borderWidth: 1,
                    textStyle: { color: '#333' }
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.name),
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                series: [{
                    data: data.map(item => item.value),
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: colors[0]
                    },
                    lineStyle: {
                        color: colors[0],
                        width: 2
                    },
                    animationDuration,
                    animationEasing
                }]
            };
            break;
            
        case 'bar':
            options = {
                title: {
                    text: title,
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors[0]
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors[0],
                    borderWidth: 1,
                    textStyle: { color: '#333' }
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.name),
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                series: [{
                    data: data.map(item => item.value),
                    type: 'bar',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: colors[0] },
                            { offset: 1, color: colors[1] }
                        ])
                    },
                    animationDuration,
                    animationEasing
                }]
            };
            break;
            
        case 'pie':
            options = {
                title: {
                    text: title,
                    left: 'center',
                    top: '10px',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors[0]
                    }
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors[0],
                    borderWidth: 1,
                    textStyle: { color: '#333' },
                    formatter: '{b}: {c} ({d}%)'
                },
                series: [{
                    type: 'pie',
                    radius: ['30%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'outside',
                        fontSize: 10,
                        formatter: '{b}: {d}%'
                    },
                    labelLine: {
                        show: true,
                        length: 15,
                        length2: 10
                    },
                    data: data.map((item, index) => ({
                        name: item.name,
                        value: item.value,
                        itemStyle: {
                            color: colors[index % colors.length]
                        }
                    })),
                    animationDuration,
                    animationEasing
                }]
            };
            break;
            
        case 'scatter':
            options = {
                title: {
                    text: title,
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors[0]
                    }
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors[0],
                    borderWidth: 1,
                    textStyle: { color: '#333' }
                },
                xAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                series: [{
                    type: 'scatter',
                    data: data.map((item, index) => [index + 1, item.value]),
                    symbolSize: 8,
                    itemStyle: {
                        color: colors[0],
                        borderColor: colors[1],
                        borderWidth: 2
                    },
                    animationDuration,
                    animationEasing
                }]
            };
            break;
            
        case 'area':
            options = {
                title: {
                    text: title,
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors[0]
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors[0],
                    borderWidth: 1,
                    textStyle: { color: '#333' }
                },
                xAxis: {
                    type: 'category',
                    data: data.map(item => item.name),
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                series: [{
                    data: data.map(item => item.value),
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: colors[0] + '40' },
                            { offset: 1, color: colors[1] + '20' }
                        ])
                    },
                    itemStyle: {
                        color: colors[0]
                    },
                    lineStyle: {
                        color: colors[0],
                        width: 2
                    },
                    animationDuration,
                    animationEasing
                }]
            };
            break;
            
        case 'radar':
            options = {
                title: {
                    text: title,
                    left: 'center',
                    textStyle: {
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: colors[0]
                    }
                },
                tooltip: {
                    trigger: 'item',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: colors[0],
                    borderWidth: 1,
                    textStyle: { color: '#333' }
                },
                radar: {
                    indicator: data.map((item, index) => ({
                        name: item.name,
                        max: Math.max(...data.map(d => d.value)) * 1.2
                    })),
                    axisLabel: {
                        fontSize: 10,
                        color: '#666'
                    }
                },
                series: [{
                    type: 'radar',
                    data: [{
                        value: data.map(item => item.value),
                        name: title,
                        itemStyle: {
                            color: colors[0],
                            borderColor: colors[1],
                            borderWidth: 2
                        },
                        areaStyle: {
                            color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, 1, [
                                { offset: 0, color: colors[0] + '40' },
                                { offset: 1, color: colors[1] + '20' }
                            ])
                        }
                    }],
                    animationDuration,
                    animationEasing
                }]
            };
            break;
            
        default:
            options = {
                title: {
                    text: title
                },
                series: [{
                    type: 'line',
                    data: data.map(item => item.value)
                }]
            };
    }

    return options;
}

// 获取动画效果
function getAnimationEasing(animation) {
    switch(animation) {
        case 'bounce': return 'elasticOut';
        case 'fade': return 'cubicInOut';
        case 'slide': return 'quartInOut';
        default: return 'linear';
    }
}

// 应用预设
function applyPreset(presetName) {
    const preset = layoutPresets[presetName];
    if (!preset) {
        showMessage('预设不存在', 'error');
        return;
    }

    // 更新控件状态
    document.getElementById('subplotLayout').value = preset.layout;
    currentLayout = preset.layout;

    // 更新子图
    updateSubplots();
    showMessage(`已应用${presetName}预设`, 'success');
}

// 重置所有
function resetAll() {
    document.getElementById('subplotLayout').value = '2x2';
    document.getElementById('chartType').value = 'line';
    document.getElementById('colorScheme').value = 'default';
    document.getElementById('dataSet').value = 'factory';
    document.getElementById('animation').value = 'none';

    currentLayout = '2x2';
    currentChartType = 'line';
    currentColorScheme = 'default';
    currentDataSet = 'factory';
    currentAnimation = 'none';

    updateSubplots();
    showMessage('已重置所有设置', 'success');
}

// 导出所有图表
function exportAll() {
    chartInstances.forEach((chart, index) => {
        try {
            const url = chart.getDataURL({
                type: 'png',
                pixelRatio: 2,
                backgroundColor: '#fff'
            });

            const link = document.createElement('a');
            link.href = url;
            link.download = `subplot_${index + 1}_${new Date().getTime()}.png`;
            link.click();
        } catch (error) {
            showMessage(`导出子图${index + 1}失败: ${error.message}`, 'error');
        }
    });

    showMessage('图表导出已开始', 'success');
}

// 全屏显示
function toggleFullscreen() {
    const gridElement = document.getElementById('subplotsGrid');
    if (!document.fullscreenElement) {
        gridElement.requestFullscreen().then(() => {
            setTimeout(() => {
                chartInstances.forEach(chart => {
                    if (chart && chart.resize) {
                        chart.resize();
                    }
                });
            }, 100);
        });
    } else {
        document.exitFullscreen();
    }
}

// 刷新数据
function refreshData() {
    updateSubplots();
    showMessage('数据已刷新', 'success');
}

// 显示消息
function showMessage(text, type = 'info') {
    // 移除现有消息
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // 创建新消息
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);

    // 3秒后自动移除
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 3000);
}

// 导出全局函数供HTML调用
window.applyPreset = applyPreset;
window.resetAll = resetAll;
window.exportAll = exportAll;
window.toggleFullscreen = toggleFullscreen;
window.refreshData = refreshData;