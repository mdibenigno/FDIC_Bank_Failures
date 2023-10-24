// Function to parse date strings into Date objects
const parseTime = d3.timeParse("%d-%b-%y");

// Load the data from merged_bank_failures.csv
d3.csv("merged_bank_failures.csv").then(function(data) {
  
  // Preprocess the data
  data.forEach(function(d) {
    d["Closing Date"] = parseTime(d["Closing Date"]);
    d["QBFASSET"] = +d["QBFASSET"];
    d["Closing Year"] = +d["Closing Year"];
  });

  // Line Chart for Number of Failures Over Time
  var svgLine = d3.select("#line-chart").append("svg")
    .attr("width", 500)
    .attr("height", 300);
  
  // Add your specific D3.js code for the line chart here
var line = d3.line()
.x(d => xScale(d.year))
.y(d => yScale(d.numFailures));

svg.append("path")
.datum(data)
.attr("d", line)
.attr("stroke", "blue")
.attr("fill", "none");

  
  // Bar Chart for Magnitude of Failures
  var svgBar = d3.select("#bar-chart").append("svg")
    .attr("width", 500)
    .attr("height", 300);
  
// Assuming you have SVG and data loaded
svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => xScale(d.year))
    .attr("y", d => yScale(d.totalAssets))
    .attr("width", xScale.bandwidth())
    .attr("height", d => height - yScale(d.totalAssets))
    .attr("fill", "green");

  
  // Map for Failures by State (future implementation)
  var svgMap = d3.select("#map").append("svg")
    .attr("width", 500)
    .attr("height", 300);
  
  // Add your D3.js code for the map visualization here
  // Assuming you have SVG, GeoJSON data, and bank data loaded
svg.selectAll("path")
.data(geojson.features)
.enter().append("path")
.attr("d", path)
.attr("fill", d => colorScale(stateData[d.properties.name].numFailures));

});
