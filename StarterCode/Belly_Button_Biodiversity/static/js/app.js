function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
      d3.json(`/metadata/${sample}`).then(info => {
        var index = d3.select('#sample-metadata')
    // Use `.html("") to clear any existing metadata
        index.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
        Object.entries(info).forEach(function ([key, value]){
          var dataField = index.append("p");
          dataField.html(`${key}: ${value}`);
        });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
      }
    )};


function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then(info => {
    var otu_ids = info.otu_ids;
    var values = info.sample_values;
    // @TODO: Build a Bubble Chart using the sample data
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var trace1 = {
        labels: otu_ids.slice(0,10),
        values: values.slice(0,10),
        type: 'pie'
                };
      var data = [trace1];
      var layout = {
        title: "'Pie' Chart",
                    };
    Plotly.newPlot("pie", data, layout);
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
