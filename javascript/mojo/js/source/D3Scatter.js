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

            







}})}());
//@ sourceURL=D3Scatter.js