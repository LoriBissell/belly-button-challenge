const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Update demographic panel with information about the selected subject ID
function updateDemo(subjectID){
      // Get data for subject
  d3.json(url).then(function(data) {
    let metadata = data.metadata;
    let subjectMetadata = metadata.filter(samplearray => samplearray.id == subjectID)[0];
    console.log(subjectMetadata);

    // Update demo panel
    let panel = d3.select("#sample-metadata");
    panel.html("");
    for (const [key, value] of Object.entries(subjectMetadata)) {
      let text = (`${key}: ${value}`);
      panel.append("h6").text(text);    
    }
});
}

// Create the dropdown
d3.json(url).then(function(data) {
    let names = data.names;

    let dropdown_options = d3.select("#selDataset");
    names.forEach(function(id) {
      dropdown_options.append("option").text(id).property("value", id);      
    });
  });
  
// Create horizontal bar chart for top 10 OTUs
function createBarChart(sampleid) {
  d3.json(url).then(function(data) {
    let samples = data.samples;
    let selectedSample = samples.filter(sample => sample.id === sampleid)[0];

    let topTenOTU = selectedSample.otu_ids.slice(0, 10).reverse();
    let topTenValue = selectedSample.sample_values.slice(0, 10).reverse();
    let topTenLabel = selectedSample.otu_labels.slice(0, 10).reverse();

    let trace = {
      x: topTenValue,
      y: topTenOTU.map(otuid => `OTU ${otuid}`),
      text: topTenLabel,
      type: "bar",
      orientation: 'h'
    };

    let chartInfo = [trace];

    let layout = {
      title: `Top 10 OTUs for Sample ${sampleid}`,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU ID" }
    };
    Plotly.newPlot('bar', chartInfo, layout);
  });
}

// Create bubble chart for the OTUs found in the selected subject ID
function createBubbleChart(sampleid) {
  d3.json(url).then(function(data) {
    let samples = data.samples;
    let selectedSample = samples.filter(sample => sample.id === sampleid)[0];

    let trace = {
      x: selectedSample.otu_ids, 
      y: selectedSample.sample_values,
      text: selectedSample.otu_labels,
      mode: 'markers',
      marker: {
        size: selectedSample.sample_values,
        color: selectedSample.otu_ids,
        opacity: 0.6
      }
    };
    let chartInfo = [trace];
    let layout = {
      title: `Bubble Chart for Sample ${sampleid}`,
      xaxis: { title: "OTU ID"},
      yaxis: { title: "Sample Values"}
    };
    Plotly.newPlot('bubble', chartInfo, layout);
  });
}

// Triggered when dropdown selection changes. Updates with new selection. 
function optionChanged(subjectID) {
  updateDemo(subjectID);
  createBarChart(subjectID);
  createBubbleChart(subjectID);
}
