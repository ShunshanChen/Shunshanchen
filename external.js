var jsonData = d3.json("anscombe.json")
    Promise.all([
    jsonData
    ]).then(function(data) {
    function barChart(inputDataset) {
        var svg = d3.select("body")
           .append("svg")
           .attr("width", 400)
           .attr("height", 400);

        var xScale = d3.scaleLinear()
           .domain([0, 10])
           .range([0, 310]);

        var yScale = d3.scaleLinear()
           .domain([0, 20])
           .range([0, 400]);

        svg.selectAll("rect")
           .data(inputDataset)
           .enter()
           .append("rect")
           .attr("x", function(d) { return xScale(d.x); })
           .attr("y", function(d) { return yScale(d.y); })
           .attr("width", 20)
           .attr("height", function(d) { return 1000 - yScale(d.y); })
           .attr("fill", "pink");
    }

    barChart(data[0]["set1"]); 
});