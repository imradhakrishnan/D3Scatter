(function () { 
    if (!mstrmojo.plugins.D3Scatter) {
        mstrmojo.plugins.D3Scatter = {};
    }

    mstrmojo.requiresCls(
        "mstrmojo.CustomVisBase",
        "mstrmojo.models.template.DataInterface",
        "mstrmojo.vi.models.editors.CustomVisEditorModel"
    );

    mstrmojo.plugins.D3Scatter.D3Scatter = mstrmojo.declare(
        mstrmojo.CustomVisBase,
        null,
        {
            scriptClass: "mstrmojo.plugins.D3Scatter.D3Scatter",
            cssClass: "d3scatter",
            errorMessage: "Either there is not enough data to display the visualization or the visualization configuration is incomplete.",
            errorDetails: "This visualization requires one or more attributes and one metric.",
            externalLibraries: [{url:"http://d3js.org/d3.v3.min.js"},{url:"http://dimplejs.org/dist/dimple.v2.2.0.min.js"}],
            useRichTooltip: false,
            reuseDOMNode: false,
            plot:function(){
                var me = this;
                var is10point3 = typeof this.addThresholdMenuItem === 'function'; //true if it's MSTR 10.3 or above
                var isDocument = typeof me.zonesModel === "undefined";  //true if it's a document
                var total_width = parseInt(me.width, 10);
                var total_height = parseInt(me.height, 10);
                var margin = {top: 20, right: 10, bottom: 20, left: 40};
                var legendPos = {x: 240, y: 10, width: (total_width - margin.right - margin.left), height: 20, align: "left"}; //Increase the width to see more elements in legend
                var dataConfig = {hasSelection: true}; //parameter to be passed to dataInterface API while importing data

                var rawDRows = me.dataInterface.getRawData(mstrmojo.models.template.DataInterface.ENUM_RAW_DATA_FORMAT.ROWS);
                var model; //var to store data model created from zonesModel (drop zones)
                if(is10point3 && !isDocument){
                    model = new mstrmojo.models.template.DataInterface(me.model.data);
                }

                var rowTitles = me.dataInterface.getRowTitles();
                var colTitles = me.dataInterface.getColTitles();

                var horMetric =  me.zonesModel.getDropZones().zones[0].items[0].n;
                var verMetric = me.zonesModel.getDropZones().zones[1].items[0].n;
                var groupBy = [];
                me.zonesModel.getDropZones().zones[2].items.forEach(function (item) {
                    groupBy.push(item.n);
                });
                var animateBy = me.zonesModel.getDropZones().zones[3].items[0].n;
                var animateSizeBy = me.zonesModel.getDropZones().zones[4].items[0].n;
                var animateOrderBy = me.zonesModel.getDropZones().zones[5].items[0].n;

                /*
                //Filter values for animateby
                var filterData = [];
                rowTitles.titles[1].es.forEach(function (t) {
                    filterData.push(t.n);
                });
                */
                
                var dataS = [];  //data to be passed to the dimple library
                //to populate dataS var - flattening the data to make it usable with the library
                for (var i = 0; i < rawDRows.length; i++) {
                    var object = rawDRows[i];
                    for (var name in object) {
                        if (typeof object[name] === "object")
                            object[name] = object[name].v;
                    }
                    dataS.push(object);
                }

                debugger;
                var svg = dimple.newSvg(me.domNode, total_width-margin.left-margin.right, total_height-margin.top-margin.bottom);
             //   d3.tsv("C:\\Program Files\\MicroStrategy\\MicroStrategy Desktop\\code\\plugins\\D3Scatter\\javascript\\mojo\\js\\source\\example_data.tsv", function (data) {

                    // Filter for 1 year
                   // dataS = dimple.filterData(dataS, animateBy, filterData);

                    // Create the indicator chart on the right of the main chart
                    var indicator = new dimple.chart(svg, dataS);

                    // Pick blue as the default and orange for the selected month
                    var defaultColor = indicator.defaultColors[0];
                    var indicatorColor = indicator.defaultColors[2];

                    // The frame duration for the animation in milliseconds
                    var frame = 2000;

                    var firstTick = true;

                    // Place the indicator bar chart to the right
                    indicator.setBounds("80%", "10%", "20%", "80%");

                    // Add dates along the y axis
                    var y = indicator.addCategoryAxis("y", animateBy);
                    y.addOrderRule(animateOrderBy, "Desc");

                    // Use sales for bar size and hide the axis
                    var x = indicator.addMeasureAxis("x", animateSizeBy);
                    x.hidden = true;

                    // Add the bars to the indicator and add event handlers
                    var s = indicator.addSeries(null, dimple.plot.bar);
                    s.addEventHandler("click", onClick);
                    // Draw the side chart
                    indicator.draw();

                    // Remove the title from the y axis
                    y.titleShape.remove();

                    // Remove the lines from the y axis
                    y.shapes.selectAll("line,path").remove();

                    // Move the y axis text inside the plot area
                    y.shapes.selectAll("text")
                        .style("text-anchor", "start")
                        .style("font-size", "11px")
                        .attr("transform", "translate(18, 0.5)");

                    // This block simply adds the legend title. I put it into a d3 data
                    // object to split it onto 2 lines.  This technique works with any
                    // number of lines, it isn't dimple specific.
                    svg.selectAll("title_text")
                        .data(["Click bar to select",
                            "and pause. Click again",
                            "to resume animation"])
                        .enter()
                        .append("text")
                        .attr("x", "80%")
                        .attr("y", function (d, i) { return 15 + i * 12; })
                        .style("font-family", "sans-serif")
                        .style("font-size", "10px")
                        .style("color", "Black")
                        .text(function (d) { return d; });

                    // Manually set the bar colors
                    s.shapes
                        .attr("rx", 10)
                        .attr("ry", 10)
                        .style("fill", function (d) { return (d.y === 'Jan-12' ? indicatorColor.fill : defaultColor.fill) })
                        .style("stroke", function (d) { return (d.y === 'Jan-12' ? indicatorColor.stroke : defaultColor.stroke) })
                        .style("opacity", 0.4);

                    // Draw the main chart
                    var bubbles = new dimple.chart(svg, dataS);
                    bubbles.setBounds("6%", "10%", "70%", "80%")
                    bubbles.addMeasureAxis("x", horMetric);
                    bubbles.addMeasureAxis("y", verMetric);
                    bubbles.addSeries(groupBy, dimple.plot.bubble)
                    bubbles.addLegend(60, 10, 410, 60);

                    // Add a storyboard to the main chart and set the tick event
                    var story = bubbles.setStoryboard(animateBy, onTick);
                    // Change the frame duration
                    story.frameDuration = frame;
                    // Order the storyboard by date
                    story.addOrderRule(animateOrderBy);

                    // Draw the bubble chart
                    bubbles.draw();

                    // Orphan the legends as they are consistent but by default they
                    // will refresh on tick
                    bubbles.legends = [];
                    // Remove the storyboard label because the chart will indicate the
                    // current month instead of the label
                    story.storyLabel.remove();

                    // On click of the side chart
                    function onClick(e) {
                        // Pause the animation
                        story.pauseAnimation();
                        // If it is already selected resume the animation
                        // otherwise pause and move to the selected month
                        if (e.yValue === story.getFrameValue()) {
                            story.startAnimation();
                        } else {
                            story.goToFrame(e.yValue);
                            story.pauseAnimation();
                        }
                    }

                    // On tick of the main charts storyboard
                    function onTick(e) {
                        if (!firstTick) {
                            // Color all shapes the same
                            s.shapes
                                .transition()
                                .duration(frame / 2)
                                .style("fill", function (d) { return (d.y === e ? indicatorColor.fill : defaultColor.fill) })
                                .style("stroke", function (d) { return (d.y === e ? indicatorColor.stroke : defaultColor.stroke) });
                        }
                        firstTick = false;
                    }
                //});
}})}());
//@ sourceURL=D3Scatter.js