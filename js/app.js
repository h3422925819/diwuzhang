// 第5章数据可视化 - 完整功能版本
class DataVisualizationApp {
    constructor() {
        this.charts = {};
        this.currentTheme = 'sales';
        this.currentLayout = '2x2';
        this.chartTypes = {};
        this.init();
    }

    async init() {
        // 初始化数据
        this.initData();
        
        // 加载用户偏好
        this.loadUserPreferences();
        
        // 初始化界面
        this.initUI();
        
        // 绑定事件
        this.bindEvents();
        
        // 初始化第一个主题的图表
        await this.renderCharts(this.currentTheme);
        
        console.log('🚀 第5章数据可视化平台初始化完成');
    }

    // 初始化数据 - 使用内嵌数据确保一致性
    initData() {
        // 销售分析数据
        this.salesData = {
            monthly: [
                { month: '1月', sales: 4200, target: 4000, growth: 5.2, profit: 1260 },
                { month: '2月', sales: 4800, target: 4200, growth: 14.3, profit: 1440 },
                { month: '3月', sales: 5200, target: 4500, growth: 8.3, profit: 1560 },
                { month: '4月', sales: 5800, target: 4800, growth: 11.5, profit: 1740 },
                { month: '5月', sales: 6200, target: 5200, growth: 6.9, profit: 1860 },
                { month: '6月', sales: 6800, target: 5800, growth: 9.7, profit: 2040 },
                { month: '7月', sales: 7200, target: 6200, growth: 5.9, profit: 2160 },
                { month: '8月', sales: 7500, target: 6500, growth: 4.2, profit: 2250 }
            ],
            products: [
                { name: '产品A', value: 2800, percentage: 22.4, growth: 8.5 },
                { name: '产品B', value: 3200, percentage: 25.6, growth: 12.3 },
                { name: '产品C', value: 2100, percentage: 16.8, growth: -3.2 },
                { name: '产品D', value: 1900, percentage: 15.2, growth: 6.7 },
                { name: '产品E', value: 2500, percentage: 20.0, growth: 9.8 }
            ],
            targets: [
                { quarter: 'Q1', actual: 14200, target: 12700, completion: 112.6, bonus: 4200 },
                { quarter: 'Q2', actual: 18800, target: 15800, completion: 119.0, bonus: 5800 },
                { quarter: 'Q3', actual: 21500, target: 18500, completion: 116.2, bonus: 6500 },
                { quarter: 'Q4', actual: 24500, target: 21000, completion: 116.7, bonus: 7500 }
            ],
            channels: [
                { name: '线上直销', value: 35, growth: 12.5, customers: 1200, avgOrder: 350 },
                { name: '线下门店', value: 28, growth: 8.3, customers: 800, avgOrder: 420 },
                { name: '分销商', value: 22, growth: 15.2, customers: 450, avgOrder: 580 },
                { name: '企业客户', value: 15, growth: 6.8, customers: 120, avgOrder: 1200 }
            ]
        };

        // 区域分析数据
        this.regionalData = {
            distribution: [
                { region: '华北', sales: 8500, percentage: 25.6, growth: 8.2, cities: ['北京', '天津', '石家庄'] },
                { region: '华东', sales: 12000, percentage: 36.1, growth: 12.5, cities: ['上海', '杭州', '南京', '苏州'] },
                { region: '华南', sales: 7200, percentage: 21.7, growth: 6.8, cities: ['广州', '深圳', '厦门'] },
                { region: '西部', sales: 5500, percentage: 16.6, growth: 15.3, cities: ['成都', '重庆', '西安'] }
            ],
            growth: [
                { month: '1月', north: 3200, east: 4800, south: 2800, west: 2100 },
                { month: '2月', north: 3400, east: 5200, south: 3000, west: 2200 },
                { month: '3月', north: 3600, east: 5600, south: 3200, west: 2400 },
                { month: '4月', north: 3800, east: 6000, south: 3400, west: 2600 },
                { month: '5月', north: 4000, east: 6400, south: 3600, west: 2800 },
                { month: '6月', north: 4200, east: 6800, south: 3800, west: 3000 }
            ],
            marketShare: [
                { region: '华北', ourShare: 28.5, competitor1: 32.2, competitor2: 18.6, competitor3: 20.7 },
                { region: '华东', ourShare: 35.2, competitor1: 28.8, competitor2: 22.1, competitor3: 13.9 },
                { region: '华南', ourShare: 31.6, competitor1: 30.5, competitor2: 19.8, competitor3: 18.1 },
                { region: '西部', ourShare: 26.3, competitor1: 34.1, competitor2: 20.5, competitor3: 19.1 }
            ],
            comparison: [
                { indicator: '销售额', north: 8500, east: 12000, south: 7200, west: 5500 },
                { indicator: '客户数', north: 320, east: 480, south: 280, west: 220 },
                { indicator: '订单数', north: 1280, east: 1920, south: 1120, west: 880 },
                { indicator: '满意度', north: 4.2, east: 4.5, south: 4.1, west: 3.9 }
            ]
        };
    }

    // 初始化界面
    initUI() {
        // 设置当前主题
        document.getElementById('themeSelect').value = this.currentTheme;
        document.getElementById('layoutSelect').value = this.currentLayout;
        
        // 更新布局
        this.updateLayout(this.currentLayout);
    }

    // 绑定事件
    bindEvents() {
        // 主题切换
        document.getElementById('themeSelect').addEventListener('change', (e) => {
            this.switchTheme(e.target.value);
        });

        // 布局切换
        document.getElementById('layoutSelect').addEventListener('change', (e) => {
            this.updateLayout(e.target.value);
        });

        // 保存偏好
        document.getElementById('savePrefs').addEventListener('click', () => {
            this.saveUserPreferences();
        });

        // 重置偏好
        document.getElementById('resetPrefs').addEventListener('click', () => {
            this.resetPreferences();
        });

        // 图表类型选择器事件委托
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('chart-type-selector')) {
                const chartId = e.target.getAttribute('data-chart');
                const chartType = e.target.value;
                this.updateChartType(chartId, chartType);
            }
        });

        // 窗口大小改变时重新渲染图表
        window.addEventListener('resize', this.debounce(() => {
            this.resizeAllCharts();
        }, 300));
    }

    // 切换主题
    async switchTheme(theme) {
        this.currentTheme = theme;
        
        // 更新UI显示
        document.querySelectorAll('.theme-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(theme).classList.add('active');
        
        // 销毁旧图表
        this.disposeCharts();
        
        // 渲染新图表
        await this.renderCharts(theme);
        
        this.showNotification(`已切换到${theme === 'sales' ? '销售分析' : '区域分析'}`, 'success');
    }

    // 更新布局
    updateLayout(layout) {
        this.currentLayout = layout;
        const grid = document.querySelector('.charts-grid');
        
        // 移除所有布局类
        grid.className = 'charts-grid';
        
        // 添加新布局类
        switch (layout) {
            case '1x1':
                grid.classList.add('layout-1x1');
                break;
            case '1x2':
                grid.classList.add('layout-1x2');
                break;
            case '2x2':
                grid.classList.add('layout-2x2');
                break;
            case 'auto':
                grid.classList.add('layout-auto');
                break;
        }
        
        // 延迟调整图表大小
        setTimeout(() => {
            this.resizeAllCharts();
        }, 100);
    }

    // 渲染图表
    async renderCharts(theme) {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
        
        if (theme === 'sales') {
            await this.renderSalesCharts(delay);
        } else if (theme === 'regional') {
            await this.renderRegionalCharts(delay);
        }
    }

    // 渲染销售分析图表
    async renderSalesCharts(delay) {
        await delay(100);
        this.renderSalesTrend();
        await delay(100);
        this.renderSalesProducts();
        await delay(100);
        this.renderSalesTarget();
        await delay(100);
        this.renderSalesChannel();
    }

    // 渲染区域分析图表
    async renderRegionalCharts(delay) {
        await delay(100);
        this.renderRegionalSales();
        await delay(100);
        this.renderRegionalGrowth();
        await delay(100);
        this.renderMarketShare();
        await delay(100);
        this.renderRegionalCompare();
    }

    // 销售趋势图表
    renderSalesTrend(type = 'line') {
        const dom = document.getElementById('sales-trend');
        if (!dom) return;
        
        if (this.charts['sales-trend']) {
            this.charts['sales-trend'].dispose();
        }
        
        this.charts['sales-trend'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'bar':
                option = {
                    title: { text: '月度销售额', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.monthly.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '销售额',
                        type: 'bar',
                        data: this.salesData.monthly.map(item => item.sales),
                        itemStyle: { color: '#5470c6' }
                    }]
                };
                break;
            case 'area':
                option = {
                    title: { text: '月度销售额', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.monthly.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '销售额',
                        type: 'line',
                        data: this.salesData.monthly.map(item => item.sales),
                        areaStyle: { opacity: 0.3 },
                        itemStyle: { color: '#5470c6' }
                    }]
                };
                break;
            case 'scatter':
                option = {
                    title: { text: '销售vs利润散点图', left: 'center' },
                    tooltip: { trigger: 'item' },
                    xAxis: { type: 'value', name: '销售额' },
                    yAxis: { type: 'value', name: '利润' },
                    series: [{
                        type: 'scatter',
                        data: this.salesData.monthly.map(item => [item.sales, item.profit]),
                        itemStyle: { color: '#5470c6' }
                    }]
                };
                break;
            case 'mixed':
                option = {
                    title: { text: '销售趋势混合图', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.monthly.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: '销售额',
                            type: 'bar',
                            data: this.salesData.monthly.map(item => item.sales)
                        },
                        {
                            name: '目标',
                            type: 'line',
                            data: this.salesData.monthly.map(item => item.target)
                        }
                    ]
                };
                break;
            case 'kline':
                option = {
                    title: { text: '销售K线图', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.monthly.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'candlestick',
                        data: this.salesData.monthly.map(item => [
                            item.sales * 0.9,
                            item.sales * 1.1,
                            item.sales * 0.95,
                            item.sales * 1.05
                        ])
                    }]
                };
                break;
            case 'heatmap':
                option = {
                    title: { text: '销售热力图', left: 'center' },
                    tooltip: { position: 'top' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.monthly.map(item => item.month)
                    },
                    yAxis: { type: 'category', data: ['销售额', '增长率'] },
                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '15%'
                    },
                    series: [{
                        name: '销售热力图',
                        type: 'heatmap',
                        data: this.salesData.monthly.map((item, i) => [
                            i, 0, item.sales / 100
                        ]),
                        label: { show: true }
                    }]
                };
                break;
            default: // line
                option = {
                    title: { text: '月度销售趋势', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.monthly.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '销售额',
                        type: 'line',
                        data: this.salesData.monthly.map(item => item.sales),
                        smooth: true,
                        itemStyle: { color: '#5470c6' }
                    }]
                };
        }
        
        this.charts['sales-trend'].setOption(option);
    }

    // 产品销售分布图表
    renderSalesProducts(type = 'pie') {
        const dom = document.getElementById('sales-products');
        if (!dom) return;
        
        if (this.charts['sales-products']) {
            this.charts['sales-products'].dispose();
        }
        
        this.charts['sales-products'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'bar':
                option = {
                    title: { text: '产品销售分布', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.products.map(item => item.name)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '销售额',
                        type: 'bar',
                        data: this.salesData.products.map(item => item.value),
                        itemStyle: { color: '#91cc75' }
                    }]
                };
                break;
            case 'doughnut':
                option = {
                    title: { text: '产品销售分布', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '销售额',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
                break;
            case 'funnel':
                option = {
                    title: { text: '产品销售漏斗', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '销售额',
                        type: 'funnel',
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
                break;
            case 'rose':
                option = {
                    title: { text: '产品销售玫瑰图', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '销售额',
                        type: 'pie',
                        radius: ['20%', '70%'],
                        roseType: 'area',
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
                break;
            case 'tree':
                option = {
                    title: { text: '产品销售树图', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        type: 'treemap',
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
                break;
            case 'sunburst':
                option = {
                    title: { text: '产品销售旭日图', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        type: 'sunburst',
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
                break;
            case 'nightingale':
                option = {
                    title: { text: '产品销售南丁格尔图', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        type: 'pie',
                        radius: '60%',
                        roseType: 'radius',
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
                break;
            default: // pie
                option = {
                    title: { text: '产品销售分布', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '销售额',
                        type: 'pie',
                        radius: '60%',
                        data: this.salesData.products.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
        }
        
        this.charts['sales-products'].setOption(option);
    }

    // 销售目标达成图表
    renderSalesTarget(type = 'bar') {
        const dom = document.getElementById('sales-target');
        if (!dom) return;
        
        if (this.charts['sales-target']) {
            this.charts['sales-target'].dispose();
        }
        
        this.charts['sales-target'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'gauge':
                const completion = this.salesData.targets[this.salesData.targets.length - 1].completion;
                option = {
                    title: { text: '目标完成率', left: 'center' },
                    series: [{
                        type: 'gauge',
                        data: [{ value: completion, name: '完成率' }],
                        detail: { formatter: '{value}%' }
                    }]
                };
                break;
            case 'progress':
                option = {
                    title: { text: '季度目标进度', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.targets.map(item => item.quarter)
                    },
                    yAxis: { type: 'value', max: 150 },
                    series: [{
                        type: 'bar',
                        data: this.salesData.targets.map(item => item.completion),
                        itemStyle: { color: '#fac858' }
                    }]
                };
                break;
            case 'liquid':
                option = {
                    title: { text: '完成率水球图', left: 'center' },
                    series: [{
                        type: 'liquidFill',
                        data: [this.salesData.targets[this.salesData.targets.length - 1].completion / 100]
                    }]
                };
                break;
            case 'radar':
                option = {
                    title: { text: '目标达成雷达图', left: 'center' },
                    radar: {
                        indicator: this.salesData.targets.map(item => ({
                            name: item.quarter,
                            max: 120
                        }))
                    },
                    series: [{
                        type: 'radar',
                        data: [{
                            value: this.salesData.targets.map(item => item.completion),
                            name: '完成率'
                        }]
                    }]
                };
                break;
            case 'bullet':
                option = {
                    title: { text: '目标达成子弹图', left: 'center' },
                    xAxis: { type: 'category', data: this.salesData.targets.map(item => item.quarter) },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'bar',
                        data: this.salesData.targets.map(item => item.completion)
                    }]
                };
                break;
            case 'thermometer':
                option = {
                    title: { text: '目标完成温度计', left: 'center' },
                    xAxis: { type: 'category', data: ['完成率'] },
                    yAxis: { type: 'value', max: 150 },
                    series: [{
                        type: 'bar',
                        data: [this.salesData.targets[this.salesData.targets.length - 1].completion],
                        itemStyle: { color: '#ee6666' }
                    }]
                };
                break;
            default: // bar
                option = {
                    title: { text: '目标达成对比', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: this.salesData.targets.map(item => item.quarter) },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: '实际',
                            type: 'bar',
                            data: this.salesData.targets.map(item => item.actual),
                            itemStyle: { color: '#5470c6' }
                        },
                        {
                            name: '目标',
                            type: 'bar',
                            data: this.salesData.targets.map(item => item.target),
                            itemStyle: { color: '#91cc75' }
                        }
                    ]
                };
        }
        
        this.charts['sales-target'].setOption(option);
    }

    // 销售渠道分析图表
    renderSalesChannel(type = 'pie') {
        const dom = document.getElementById('sales-channel');
        if (!dom) return;
        
        if (this.charts['sales-channel']) {
            this.charts['sales-channel'].dispose();
        }
        
        this.charts['sales-channel'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'bar':
                option = {
                    title: { text: '销售渠道占比', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.salesData.channels.map(item => item.name)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '占比',
                        type: 'bar',
                        data: this.salesData.channels.map(item => item.value),
                        itemStyle: { color: '#ee6666' }
                    }]
                };
                break;
            case 'radar':
                option = {
                    title: { text: '渠道表现雷达图', left: 'center' },
                    radar: {
                        indicator: [
                            { name: '销售占比', max: 40 },
                            { name: '增长率', max: 20 }
                        ]
                    },
                    series: [{
                        type: 'radar',
                        data: [{
                            value: this.salesData.channels.map(item => [item.value, item.growth]),
                            name: '渠道表现'
                        }]
                    }]
                };
                break;
            case 'sankey':
                option = {
                    title: { text: '渠道流向桑基图', left: 'center' },
                    series: [{
                        type: 'sankey',
                        data: this.salesData.channels.map(item => ({ name: item.name })),
                        links: this.salesData.channels.map(item => ({
                            source: item.name,
                            target: '总销售',
                            value: item.value
                        }))
                    }]
                };
                break;
            case 'graph':
                option = {
                    title: { text: '渠道关系图', left: 'center' },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        data: this.salesData.channels.map(item => ({
                            name: item.name,
                            symbolSize: item.value * 2
                        })),
                        force: { repulsion: 100 }
                    }]
                };
                break;
            case 'parallel':
                option = {
                    title: { text: '渠道平行坐标', left: 'center' },
                    parallelAxis: [
                        { dim: 0, name: '占比' },
                        { dim: 1, name: '增长率' }
                    ],
                    series: [{
                        type: 'parallel',
                        data: this.salesData.channels.map(item => [item.value, item.growth])
                    }]
                };
                break;
            case 'boxplot':
                option = {
                    title: { text: '渠道数据分布', left: 'center' },
                    tooltip: { trigger: 'item' },
                    yAxis: { type: 'category', data: this.salesData.channels.map(item => item.name) },
                    xAxis: { type: 'value' },
                    series: [{
                        type: 'boxplot',
                        data: this.salesData.channels.map(item => [
                            item.value - 5,
                            item.value - 2,
                            item.value,
                            item.value + 2,
                            item.value + 5
                        ])
                    }]
                };
                break;
            case 'circular':
                option = {
                    title: { text: '渠道圆形布局', left: 'center' },
                    series: [{
                        type: 'graph',
                        layout: 'circular',
                        circular: { rotateLabel: true },
                        data: this.salesData.channels.map(item => ({
                            name: item.name,
                            value: item.value
                        }))
                    }]
                };
                break;
            default: // pie
                option = {
                    title: { text: '销售渠道分布', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '占比',
                        type: 'pie',
                        radius: '60%',
                        data: this.salesData.channels.map(item => ({
                            value: item.value,
                            name: item.name
                        }))
                    }]
                };
        }
        
        this.charts['sales-channel'].setOption(option);
    }

    // 区域销售分布图表
    renderRegionalSales(type = 'bar') {
        const dom = document.getElementById('regional-sales');
        if (!dom) return;
        
        if (this.charts['regional-sales']) {
            this.charts['regional-sales'].dispose();
        }
        
        this.charts['regional-sales'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'map':
                option = {
                    title: { text: '区域销售地图', left: 'center' },
                    geo: { map: 'china' },
                    series: [{
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: this.regionalData.distribution.map((item, i) => ({
                            name: item.region,
                            value: [100 + i * 30, 30 + i * 10, item.sales]
                        }))
                    }]
                };
                break;
            case 'tree':
                option = {
                    title: { text: '区域销售树图', left: 'center' },
                    series: [{
                        type: 'treemap',
                        data: this.regionalData.distribution.map(item => ({
                            value: item.sales,
                            name: item.region
                        }))
                    }]
                };
                break;
            case 'pie':
                option = {
                    title: { text: '区域销售分布', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '销售额',
                        type: 'pie',
                        radius: '60%',
                        data: this.regionalData.distribution.map(item => ({
                            value: item.sales,
                            name: item.region
                        }))
                    }]
                };
                break;
            case 'scatter3d':
                option = {
                    title: { text: '区域3D散点图', left: 'center' },
                    xAxis3D: { type: 'category' },
                    yAxis3D: { type: 'category' },
                    zAxis3D: { type: 'value' },
                    series: [{
                        type: 'scatter3D',
                        data: this.regionalData.distribution.map((item, i) => [i, i, item.sales])
                    }]
                };
                break;
            case 'surface3d':
                option = {
                    title: { text: '区域3D曲面图', left: 'center' },
                    xAxis3D: { type: 'category' },
                    yAxis3D: { type: 'category' },
                    zAxis3D: { type: 'value' },
                    series: [{
                        type: 'surface',
                        data: this.regionalData.distribution.map((item, i) => [i, i, item.sales])
                    }]
                };
                break;
            case 'globe3d':
                option = {
                    title: { text: '全球销售分布', left: 'center' },
                    globe: {},
                    series: [{
                        type: 'scatter3D',
                        coordinateSystem: 'globe',
                        data: this.regionalData.distribution.map((item, i) => [
                            Math.random() * 360 - 180,
                            Math.random() * 180 - 90,
                            item.sales / 100
                        ])
                    }]
                };
                break;
            case 'geo':
                option = {
                    title: { text: '地理坐标分布', left: 'center' },
                    geo: { map: 'china' },
                    series: [{
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: this.regionalData.distribution.map((item, i) => ({
                            name: item.region,
                            value: [100 + i * 30, 30 + i * 10]
                        }))
                    }]
                };
                break;
            default: // bar
                option = {
                    title: { text: '区域销售分布', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.distribution.map(item => item.region)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '销售额',
                        type: 'bar',
                        data: this.regionalData.distribution.map(item => item.sales),
                        itemStyle: { color: '#73c0de' }
                    }]
                };
        }
        
        this.charts['regional-sales'].setOption(option);
    }

    // 区域增长趋势图表
    renderRegionalGrowth(type = 'line') {
        const dom = document.getElementById('regional-growth');
        if (!dom) return;
        
        if (this.charts['regional-growth']) {
            this.charts['regional-growth'].dispose();
        }
        
        this.charts['regional-growth'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'area':
                option = {
                    title: { text: '区域增长趋势', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.growth.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        name: '华北',
                        type: 'line',
                        data: this.regionalData.growth.map(item => item.north),
                        areaStyle: {}
                    }]
                };
                break;
            case 'bar':
                option = {
                    title: { text: '区域月度销售', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.growth.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: '华北',
                            type: 'bar',
                            data: this.regionalData.growth.map(item => item.north)
                        },
                        {
                            name: '华东',
                            type: 'bar',
                            data: this.regionalData.growth.map(item => item.east)
                        }
                    ]
                };
                break;
            case 'stack':
                option = {
                    title: { text: '区域堆叠图', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.growth.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: '华北',
                            type: 'bar',
                            stack: 'total',
                            data: this.regionalData.growth.map(item => item.north)
                        },
                        {
                            name: '华东',
                            type: 'bar',
                            stack: 'total',
                            data: this.regionalData.growth.map(item => item.east)
                        }
                    ]
                };
                break;
            case 'stream':
                option = {
                    title: { text: '区域河流图', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.growth.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'lines',
                        data: this.regionalData.growth.map(item => ({
                            coords: [[0, item.north], [1, item.east]]
                        }))
                    }]
                };
                break;
            case 'pair':
                option = {
                    title: { text: '区域配对图', left: 'center' },
                    xAxis: { type: 'category', data: this.regionalData.growth.map(item => item.month) },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            type: 'scatter',
                            data: this.regionalData.growth.map(item => [item.north, item.east])
                        }
                    ]
                };
                break;
            case 'themeRiver':
                option = {
                    title: { text: '主题河流图', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    singleAxis: {
                        top: 50,
                        bottom: 50
                    },
                    series: [{
                        type: 'themeRiver',
                        data: this.regionalData.growth.flatMap((item, i) => [
                            [i, '华北', item.north],
                            [i, '华东', item.east]
                        ])
                    }]
                };
                break;
            case 'custom':
                option = {
                    title: { text: '自定义组合', left: 'center' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.growth.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            type: 'bar',
                            data: this.regionalData.growth.map(item => item.north)
                        },
                        {
                            type: 'line',
                            data: this.regionalData.growth.map(item => item.east)
                        }
                    ]
                };
                break;
            default: // line
                option = {
                    title: { text: '区域增长趋势', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.growth.map(item => item.month)
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: '华北',
                            type: 'line',
                            data: this.regionalData.growth.map(item => item.north)
                        },
                        {
                            name: '华东',
                            type: 'line',
                            data: this.regionalData.growth.map(item => item.east)
                        },
                        {
                            name: '华南',
                            type: 'line',
                            data: this.regionalData.growth.map(item => item.south)
                        },
                        {
                            name: '西部',
                            type: 'line',
                            data: this.regionalData.growth.map(item => item.west)
                        }
                    ]
                };
        }
        
        this.charts['regional-growth'].setOption(option);
    }

    // 市场份额分析图表
    renderMarketShare(type = 'funnel') {
        const dom = document.getElementById('market-share');
        if (!dom) return;
        
        if (this.charts['market-share']) {
            this.charts['market-share'].dispose();
        }
        
        this.charts['market-share'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'pie':
                const region = this.regionalData.marketShare[0];
                option = {
                    title: { text: `${region.region}市场份额`, left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '市场份额',
                        type: 'pie',
                        radius: '60%',
                        data: [
                            { value: region.ourShare, name: '我方' },
                            { value: region.competitor1, name: '竞品1' },
                            { value: region.competitor2, name: '竞品2' },
                            { value: region.competitor3, name: '竞品3' }
                        ]
                    }]
                };
                break;
            case 'bar':
                option = {
                    title: { text: '各地区市场份额对比', left: 'center' },
                    tooltip: { trigger: 'axis' },
                    xAxis: {
                        type: 'category',
                        data: this.regionalData.marketShare.map(item => item.region)
                    },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            name: '我方',
                            type: 'bar',
                            data: this.regionalData.marketShare.map(item => item.ourShare)
                        },
                        {
                            name: '竞品1',
                            type: 'bar',
                            data: this.regionalData.marketShare.map(item => item.competitor1)
                        }
                    ]
                };
                break;
            case 'radar':
                option = {
                    title: { text: '市场份额雷达图', left: 'center' },
                    radar: {
                        indicator: [
                            { name: '华北', max: 40 },
                            { name: '华东', max: 40 },
                            { name: '华南', max: 40 },
                            { name: '西部', max: 40 }
                        ]
                    },
                    series: [
                        {
                            name: '我方',
                            type: 'radar',
                            data: [{
                                value: this.regionalData.marketShare.map(item => item.ourShare),
                                name: '我方份额'
                            }]
                        }
                    ]
                };
                break;
            case 'scatter':
                option = {
                    title: { text: '市场份额散点图', left: 'center' },
                    xAxis: { type: 'value', name: '我方份额' },
                    yAxis: { type: 'value', name: '竞品份额' },
                    series: [{
                        type: 'scatter',
                        data: this.regionalData.marketShare.map(item => [
                            item.ourShare,
                            item.competitor1
                        ])
                    }]
                };
                break;
            case 'bubble':
                option = {
                    title: { text: '市场份额气泡图', left: 'center' },
                    xAxis: { type: 'value', name: '我方份额' },
                    yAxis: { type: 'value', name: '竞品份额' },
                    series: [{
                        type: 'scatter',
                        symbolSize: 30,
                        data: this.regionalData.marketShare.map(item => ({
                            value: [item.ourShare, item.competitor1, item.competitor2]
                        }))
                    }]
                };
                break;
            case 'wordcloud':
                option = {
                    title: { text: '市场份额词云', left: 'center' },
                    series: [{
                        type: 'wordCloud',
                        data: [
                            { name: '我方', value: 30 },
                            { name: '竞品1', value: 25 },
                            { name: '竞品2', value: 20 },
                            { name: '竞品3', value: 15 }
                        ]
                    }]
                };
                break;
            case 'pictorial':
                option = {
                    title: { text: '市场份额象形图', left: 'center' },
                    xAxis: { type: 'category', data: ['份额'] },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'pictorialBar',
                        symbol: 'circle',
                        data: [35]
                    }]
                };
                break;
            default: // funnel
                option = {
                    title: { text: '市场份额漏斗', left: 'center' },
                    tooltip: { trigger: 'item' },
                    series: [{
                        name: '市场份额',
                        type: 'funnel',
                        data: [
                            { value: 40, name: '总市场' },
                            { value: 30, name: '我方' },
                            { value: 25, name: '竞品1' },
                            { value: 20, name: '竞品2' }
                        ]
                    }]
                };
        }
        
        this.charts['market-share'].setOption(option);
    }

    // 区域对比分析图表
    renderRegionalCompare(type = 'radar') {
        const dom = document.getElementById('regional-compare');
        if (!dom) return;
        
        if (this.charts['regional-compare']) {
            this.charts['regional-compare'].dispose();
        }
        
        this.charts['regional-compare'] = echarts.init(dom);
        
        let option;
        switch (type) {
            case 'parallel':
                option = {
                    title: { text: '区域平行坐标', left: 'center' },
                    parallelAxis: [
                        { dim: 0, name: '销售额' },
                        { dim: 1, name: '客户数' },
                        { dim: 2, name: '订单数' },
                        { dim: 3, name: '满意度' }
                    ],
                    series: [{
                        type: 'parallel',
                        data: this.regionalData.comparison.map(item => [
                            item.north, item.customers, item.orders, item.satisfaction * 1000
                        ])
                    }]
                };
                break;
            case 'scatter3d':
                option = {
                    title: { text: '区域3D散点图', left: 'center' },
                    xAxis3D: { type: 'value' },
                    yAxis3D: { type: 'value' },
                    zAxis3D: { type: 'value' },
                    series: [{
                        type: 'scatter3D',
                        data: this.regionalData.comparison.map((item, i) => [
                            item.north, item.customers, item.orders
                        ])
                    }]
                };
                break;
            case 'surface':
                option = {
                    title: { text: '区域3D曲面', left: 'center' },
                    xAxis3D: { type: 'category' },
                    yAxis3D: { type: 'category' },
                    zAxis3D: { type: 'value' },
                    series: [{
                        type: 'surface',
                        data: this.regionalData.comparison.map((item, i) => [i, i, item.north])
                    }]
                };
                break;
            case 'heatmap':
                option = {
                    title: { text: '区域热力图', left: 'center' },
                    tooltip: { position: 'top' },
                    xAxis: {
                        type: 'category',
                        data: ['销售额', '客户数', '订单数', '满意度']
                    },
                    yAxis: {
                        type: 'category',
                        data: ['华北', '华东', '华南', '西部']
                    },
                    visualMap: {
                        min: 0,
                        max: 100,
                        calculable: true,
                        orient: 'horizontal',
                        left: 'center',
                        bottom: '15%'
                    },
                    series: [{
                        type: 'heatmap',
                        data: []
                    }]
                };
                break;
            case 'correlation':
                option = {
                    title: { text: '区域相关性图', left: 'center' },
                    xAxis: { type: 'value' },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'scatter',
                        data: this.regionalData.comparison.map(item => [
                            item.north, item.customers
                        ])
                    }]
                };
                break;
            case 'network':
                option = {
                    title: { text: '区域网络图', left: 'center' },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        data: this.regionalData.comparison.map(item => ({
                            name: item.indicator,
                            symbolSize: 20
                        })),
                        force: { repulsion: 100 }
                    }]
                };
                break;
            case 'chord':
                option = {
                    title: { text: '区域弦图', left: 'center' },
                    series: [{
                        type: 'chord',
                        data: this.regionalData.comparison.map(item => ({
                            name: item.indicator
                        })),
                        links: []
                    }]
                };
                break;
            default: // radar
                option = {
                    title: { text: '区域综合对比', left: 'center' },
                    radar: {
                        indicator: [
                            { name: '销售额', max: 15000 },
                            { name: '客户数', max: 600 },
                            { name: '订单数', max: 2500 },
                            { name: '满意度', max: 5 }
                        ]
                    },
                    series: [
                        {
                            name: '华北',
                            type: 'radar',
                            data: [{
                                value: this.regionalData.comparison.map(item => item.north),
                                name: '华北'
                            }]
                        },
                        {
                            name: '华东',
                            type: 'radar',
                            data: [{
                                value: this.regionalData.comparison.map(item => item.east),
                                name: '华东'
                            }]
                        }
                    ]
                };
        }
        
        this.charts['regional-compare'].setOption(option);
    }

    // 更新图表类型
    updateChartType(chartId, chartType) {
        this.chartTypes[chartId] = chartType;
        
        // 根据图表ID调用相应的渲染方法
        const methodName = this.getRenderMethodName(chartId);
        if (methodName && typeof this[methodName] === 'function') {
            this[methodName](chartType);
            this.showNotification(`图表类型已切换为: ${this.getChartTypeName(chartType)}`, 'success');
        }
    }

    // 获取渲染方法名
    getRenderMethodName(chartId) {
        const methodMap = {
            'sales-trend': 'renderSalesTrend',
            'sales-products': 'renderSalesProducts',
            'sales-target': 'renderSalesTarget',
            'sales-channel': 'renderSalesChannel',
            'regional-sales': 'renderRegionalSales',
            'regional-growth': 'renderRegionalGrowth',
            'market-share': 'renderMarketShare',
            'regional-compare': 'renderRegionalCompare'
        };
        return methodMap[chartId];
    }

    // 获取图表类型名称
    getChartTypeName(type) {
        const typeNames = {
            'line': '折线图',
            'bar': '柱状图',
            'area': '面积图',
            'scatter': '散点图',
            'mixed': '混合图',
            'kline': 'K线图',
            'heatmap': '热力图',
            'pie': '饼图',
            'doughnut': '环形图',
            'funnel': '漏斗图',
            'rose': '玫瑰图',
            'tree': '树图',
            'sunburst': '旭日图',
            'nightingale': '南丁格尔图',
            'gauge': '仪表盘',
            'progress': '进度条图',
            'liquid': '水球图',
            'radar': '雷达图',
            'bullet': '子弹图',
            'thermometer': '温度计图',
            'sankey': '桑基图',
            'graph': '关系图',
            'parallel': '平行坐标',
            'boxplot': '箱线图',
            'circular': '圆形布局',
            'map': '地图',
            'scatter3d': '3D散点图',
            'surface3d': '3D曲面图',
            'globe3d': '3D地球',
            'geo': '地理坐标',
            'stack': '堆叠图',
            'stream': '河流图',
            'pair': '配对图',
            'themeRiver': '主题河流图',
            'custom': '自定义组合',
            'bubble': '气泡图',
            'wordcloud': '词云图',
            'pictorial': '象形图',
            'correlation': '相关性图',
            'network': '网络图',
            'chord': '弦图',
            'surface': '3D曲面'
        };
        return typeNames[type] || type;
    }

    // 销毁所有图表
    disposeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.dispose === 'function') {
                chart.dispose();
            }
        });
        this.charts = {};
    }

    // 调整所有图表大小
    resizeAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.resize === 'function') {
                chart.resize();
            }
        });
    }

    // 保存用户偏好
    saveUserPreferences() {
        const preferences = {
            theme: this.currentTheme,
            layout: this.currentLayout,
            chartTypes: this.chartTypes
        };
        localStorage.setItem('visualization-prefs', JSON.stringify(preferences));
        this.showNotification('偏好设置已保存', 'success');
    }

    // 加载用户偏好
    loadUserPreferences() {
        const saved = localStorage.getItem('visualization-prefs');
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                this.currentTheme = preferences.theme || 'sales';
                this.currentLayout = preferences.layout || '2x2';
                this.chartTypes = preferences.chartTypes || {};
                
                // 恢复图表类型选择器的状态
                Object.entries(this.chartTypes).forEach(([chartId, type]) => {
                    const selector = document.querySelector(`[data-chart="${chartId}"]`);
                    if (selector) {
                        selector.value = type;
                    }
                });
            } catch (e) {
                console.warn('加载用户偏好失败:', e);
            }
        }
    }

    // 重置偏好
    resetPreferences() {
        localStorage.removeItem('visualization-prefs');
        this.currentTheme = 'sales';
        this.currentLayout = '2x2';
        this.chartTypes = {};
        
        document.getElementById('themeSelect').value = this.currentTheme;
        document.getElementById('layoutSelect').value = this.currentLayout;
        
        // 重置所有图表类型选择器
        document.querySelectorAll('.chart-type-selector').forEach(selector => {
            selector.selectedIndex = 0;
        });
        
        this.switchTheme(this.currentTheme);
        this.showNotification('偏好设置已重置', 'info');
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const container = document.getElementById('notification-container');
        container.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DataVisualizationApp();
});