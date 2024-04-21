var set1 = [{x:'<1700',y:22},{x:'1700-1750',y:8},{x:'1750-1800',y:29},{x:'1800-1850',y:165},{x:'1850-1900',y:504},{x:'1900-1950',y:957},{x:'1950-2000',y:24019},{x:'2000-',y:19720}]
var set2 = [{x:'H?',y:16281},{x:'L6',y:8285},{x:'H5',y:7142},{x:'L5',y:4796},{x:'H6',y:4528},{x:'H4',y:4211},{x:'LL5',y:2766},{x:'LL6',y:2042},{x:'L4',y:1253},{x:'H4/5',y:428}]


function barChart(data, columnInUse, fillColor) {
    var margin = {top: 20, right: 300, bottom: 200, left: 90},
        width = window.innerWidth * 0.8 - margin.left - margin.right,
        height = window.innerHeight * 0.8 - margin.top - margin.bottom;

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

   
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[columnInUse])])
        .range([0, width*1.2]);

    
    var yScale = d3.scaleBand()
        .domain(data.map(d => d.x))
        .range([0, height])
        .padding(0.4);

    
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("fill", "white");

    
    svg.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("fill", "white");

    var tooltipLayer = svg.append("g")
        .attr("class", "tooltip-layer");

    svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", d => yScale(d.x))
        .attr("height", yScale.bandwidth())
        .attr("x", 0)
        .attr("width", d => xScale(d[columnInUse]))
        .attr("fill", fillColor)
        .on("mouseover", function(e, d) {
            d3.select(this).attr("fill", "white");
            var yPosition = parseFloat(d3.select(this).attr("y")) + yScale.bandwidth() / 2;
            var xPosition = xScale(d[columnInUse]) + 5; 

            tooltipLayer.append("text")
                .text(d[columnInUse])
                .attr("class", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "start")
                .attr("font-size", "12px")
                .attr("fill", "white");
        })
        .on("mouseout", function(e) {
            d3.select(this).attr("fill", fillColor);
            d3.selectAll(".tooltip").remove();
        });

   

}
barChart(set1, "y", "purple");






