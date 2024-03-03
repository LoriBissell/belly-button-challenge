updateChart(samples[0]);

d3.select("#selDataset").on("change", function() {
  const selectedSample = this.value;
  const selectedSampleData = samples.find(sample => sample.id === selectedSample);
  updateChart(selectedSampleData);
});

function updateChart(selectedSampleData) {
  const top10OTUs = selectedSampleData.otu_ids.slice(0, 10).reverse();
  const top10Values = selectedSampleData.sample_values.slice(0, 10).reverse();
  const top10Labels = selectedSampleData.otu_labels.slice(0, 10).reverse();

  const trace1 = {
      x: top10Values,
      y: top10OTUs.map(otu => `OTU ${otu}`),
      text: top10Labels,
      type: "bar",
      orientation: "h"
  };

  const data = [trace1];

  const layout = {
      title: "Top 10 OTUs",
     xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
  };

  Plotly.newPlot("bar", data, layout);
}]);