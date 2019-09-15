window.onload=function(){
let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}]

//根据select选项获取数据
function getdata() {
    let regions=document.querySelector("#region-radio-wrapper").querySelectorAll("input");
    let products=document.querySelector("#product-radio-wrapper").querySelectorAll("input");
    //遍历checkbox组，找出被选中的值
    let region=[];
    let product=[];
    for(let i=1;i<regions.length;i++){
        if(regions[i].checked==true){
            region.push(regions[i].value);
        }
    }
    for(let i=1;i<products.length;i++){
        if(products[i].checked==true){
            product.push(products[i].value);
        }
    }
    //遍历数组查找
    let data=[];
    for(let a=0;a<region.length;a++){
        for(let b=0;b<product.length;b++){
            for(let i=0;i<sourceData.length;i++){
                if(sourceData[i].region==region[a]&&sourceData[i].product==product[b]){
                    data.push(sourceData[i]);
                }
            }
        }
    }
    //返回数据
    return data;
}

//渲染新的表格
function tableshow(data) {
    //如果渲染之前表格里有内容则清除
    if(document.querySelector("#table-wrapper").querySelector("table")!==null){
        let child=document.querySelector("table");
        child.parentNode.removeChild(child);
    }
    //输出表头：商品、地区、1月、2月、…… 12月
    let table=document.createElement("table");
    let title=document.createElement("tr");
    title.innerHTML="<th>商品</th><th>地区</th>";
    for(let i=1;i<=12;i++){
        title.innerHTML+="<th>"+i+"月</th>";
    }
    table.appendChild(title);

    //遍历数据 
    for(let i=0;i<data.length;i++){
        //输出每一行的表格HTML内容
        let tr=document.createElement("tr");
        tr.innerHTML="<td>"+data[i].product+"</td><td>"+data[i].region+"</td>";
        for(let j=0;j<12;j++){
            tr.innerHTML+="<td>"+(data[i].sale)[j]+"</td>";
        }
        table.appendChild(tr);
    }
    //把生成的HTML内容赋给table-wrapper
    document.querySelector("#table-wrapper").appendChild(table);
}

//生成一组CheckBox( CheckBox容器, CheckBox选项的参数对象或者数组 )
function addcheckbox(div,obj){
    //生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
    let all=document.createElement("input");
    all.type="checkbox";
    all.value="all";
    let text1=document.createTextNode("全选");
    div.appendChild(all);
    div.appendChild(text1);
    //遍历参数对象 
    for(let i=0;i<obj.length;i++){
        //生成各个子选项checkbox的html，给一个自定义属性表示为子选项
        let son=document.createElement("input");
        let text=document.createTextNode(obj[i].text);
        son.type="checkbox";
        son.value=obj[i].text;
        div.appendChild(son);
        div.appendChild(text);
    }

    //给容器做一个事件委托 
    div.onclick= function(e) {
        drawBar(getdata());
        drawlinechart(getdata());
        tableshow(getdata());
        let checkboxs=div.querySelectorAll("input");
        if(e.target.type=="checkbox"){
            let attribute=e.target.value;
            if(attribute=="all"){
                //做全选对应的逻辑
                if(e.target.checked==true){
                    for(let i=0;i<checkboxs.length;i++){
                        checkboxs[i].checked=true;
                    }
                }
                else{
                    for(let i=0;i<checkboxs.length;i++){
                        checkboxs[i].checked=false;
                    }
                }
                
            }
            else{
                let num=0;
                //做子选项对应的逻辑
                for(let i=1;i<checkboxs.length;i++){
                    if(checkboxs[i].checked==true){
                        num++;
                    }
                }
                //如果是选中某个复选框
                if(e.target.checked==true){
                    //点击之后，是不是满足了全选状态，并对应修改全选CheckBox的状态
                    if(num==checkboxs.length-1){
                        checkboxs[0].checked=true;
                    }
                }
                //如果是取消点击某个复选框
                else{
                    //在点击之前它是不是唯一一个被勾选的？如果是的话，阻止这次点击默认事件
                    if(num==0){
                        e.target.checked=true;
                    }
                    //如果点击之前为全选状态，则取消全选按钮
                    if(num==checkboxs.length-2){
                        checkboxs[0].checked=false;
                    }
                }
            }
        }
    }
}

// 对象或数组自己根据喜好实现均可
addcheckbox(document.querySelector("#region-radio-wrapper"), [{
    value: 1,
    text: "华东"
}, {
    value: 2,
    text: "华南"
},{
    value:3,
    text:"华北"
}]);

addcheckbox(document.querySelector("#product-radio-wrapper"), [{
    value:1,
    text: "手机"
}, {
    value:2,
    text: "笔记本"
},{
    value:3,
    text:"智能音箱"
}]);


function drawBar(data) {
    var barGraph = document.querySelector("#bar");
    var graphWidth = 700;
    var graphHeight = 300;
    const graphPadding = 25;
    //轴的宽高
    const axisWidth = graphWidth - graphPadding;
    const axisHeigt = graphHeight - graphPadding;
    //柱的间隔
    const barGap = 12;
    //单个数据柱子的宽
    const barWidth = ((axisWidth - graphPadding - barGap * 13) / 12) / data.length;
    //每根柱子的颜色
    const barColor = ["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"];
    //轴的颜色
    const axisColor = "#000";
    //最大值
    var dataMax = 0;
    //柱状图数据sale
    var newData = [];

    //设置html的svg的宽度和高度
    barGraph.setAttribute("width", graphWidth);
    barGraph.setAttribute("height", graphHeight);
    //找到最大值
    for (let i = 0; i < data.length; i++) {
        if (typeof data[0] != "number") {
            let temp = Math.max(...data[i].sale);//es6扩展运算符 将数组转为序列。
            if (temp > dataMax) {
                dataMax = temp;
            }
            newData.push(data[i].sale);
        } else {
            dataMax = Math.max(...data[i]);
            newData.push(data[i]);
        }
    }
    //数据和像素的折算
    var rate = dataMax / (axisHeigt - graphPadding);
    //绘制坐标轴
    let barHtml = [];
    //先纵轴再横轴注意SVG画线模板间隔
    barHtml.push("<line x1=" + graphPadding + " y1=0" + " x2=" + graphPadding + " y2=" + axisHeigt + " stroke=" + axisColor + " stroke-width='2'/>");
    barHtml.push("<line x1=" + graphPadding + " y1=" + axisHeigt + " x2=" + axisWidth + " y2=" + axisHeigt + " stroke=" + axisColor + " stroke-width='2'/>");
    //绘制柱状图(需要X,Y,宽度,高度)(高度=数值/rate)
    for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < newData[i].length; j++) {
            let num = parseInt(newData[i][j]);
            let barBlock = data.length * barWidth;

            let x = graphPadding + (j + 1) * barGap + i * barWidth + j * barBlock;
            barHtml.push("<rect width=" + barWidth + " height=" + (num / rate) + " x=" + x + " y=" + (axisHeigt - num / rate) + " fill=" + barColor[i] + " />");
        }
    }
    barGraph.innerHTML = barHtml.join(""); //join("")拼成字符串无间隔 join()默认为逗号
}

function drawlinechart(data){
    var chart=document.querySelector("#chart");
    chart.setAttribute("width",1000);//清除原先的内容
    var ctx=chart.getContext("2d");
    //定义好折线图绘制区域的高度，宽度，轴的高度，宽度
    var chartwidth=700;
    var chartheight=300;
    //绘制起始点
    startX=0;
    startY=700;
    //每条折线的颜色
    let lineColor=["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"];
     //轴的颜色
    const axisColor = "#000";   
    //定义好每两个数据点之间的横向间隔距离
    const gap=chartwidth/12;
    
    var dataMax=0;
    var newData=[];//折线图数据
    //拿到折线图中的最大值Max
    //根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
    for (let i = 0; i < data.length; i++) {
        if (typeof data[0] != "number") {
            let temp = Math.max(...data[i].sale);//es6扩展运算符 将数组转为序列。
            if (temp > dataMax) {
                dataMax = temp;
            }
            newData.push(data[i].sale);
        } else {
            dataMax = Math.max(...data[i]);
            newData.push(data[i]);
        }
    }
    //数据和像素的折算
    var rate = dataMax / chartheight;
    
    //绘制横轴及纵轴
    ctx.beginPath();
	ctx.moveTo(startX,0);
	ctx.lineTo(startX,startY);
	ctx.moveTo(startX,startY);
	ctx.lineTo(chartwidth,startY);
    ctx.closePath();
    ctx.strokeStyle=axisColor;
    ctx.stroke();
    
    for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < newData[i].length; j++) {
            //计算将要绘制数据点的坐标
            let x=(j+1)*gap;
            let y=chartheight-newData[i][j]/rate;
            //设置线条颜色颜色
            ctx.strokeStyle=lineColor[j];
            //绘制数据点
            //ctx.arc(x,y,2,0,2*Math.PI);
            //如果不是第一个点
            if(j>0){
                //绘制这个数据点和上一个数据点的连线
                ctx.lineTo(x,y);
            }
            //记录下当前数据点的数据用于下一个点时绘制连线
            ctx.moveTo(x,y);
            ctx.stroke();
        }
    }
}

}
    