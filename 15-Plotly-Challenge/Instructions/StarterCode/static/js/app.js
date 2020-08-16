filepath = "samples.json"

function Dropdown() {
    d3.json(filepath).then(function(data) {
        console.log(data);
        var selElement = d3.select("#selDataset")


        data.names.forEach(element => {
            selElement.append("option")
                .text(element)
                .property("value", element)
        });
    });
}

function hBarChart(sample) {
    d3.json(filepath).then(function(data) {
        var filteredData = data.samples.filter(record => record.id == sample)[0];
        console.log(filteredData);
        var sample_values = filteredData.sample_values
        var otu_ids = filteredData.otu_ids

        var sliced_values = sample_values.slice(0, 10)
        var sliced_ids = otu_ids.slice(0, 10)

        var new_ids = sliced_ids.map(x => `OTU ${x}`)

        var trace1 = {
            x: sliced_values.reverse(),
            y: new_ids.reverse(),
            orientation: 'h',
            type: "bar"
        };
        var data = [trace1];

        var layout = {
            title: "Operational Taxonomic Units by Sample",
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bar", data, layout);
    });
}

function demoTable(sample) {
    d3.json(filepath).then(function(data) {
        var filteredData = data.metadata.filter(record => record.id == sample)[0];
        var selElement = d3.select("#sample-metadata")
        var id = data.metadata[0];
        console.log(filteredData)

        selElement.html("");

        Object.entries(filteredData).forEach(([key, value]) => {
            selElement.append("p")
                .text(`${key.toUpperCase()}: ${value}`)
        })
    });
}

function bubbleChart(sample) {
    d3.json(filepath).then(function(data) {
        var filteredData = data.samples.filter(record => record.id == sample)[0];
        console.log(filteredData);
        var sample_values = filteredData.sample_values
        var otu_ids = filteredData.otu_ids

        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: filteredData.otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "YlOrRd"
            }
        };

        var data = [trace1];

        var layout = {
            title: 'Amount of Bacteria by Sample',
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            showlegend: false
        };

        Plotly.newPlot("bubble", data, layout)
    });
}

// This is the area for code that runs when dropdown changes
function optionChanged(sample) {
    hBarChart(sample);
    demoTable(sample);
    bubbleChart(sample);
}

// this is the area for code that runs by default
Dropdown();
hBarChart(940);
demoTable(940);
bubbleChart(940);






















// if commenting out d3 - to jquery

// $(document).ready(function() {
//     getData();
// });

// function getData() {
//     $.ajax({
//         type: 'GET',
//         url: "samples.json",
//         contentType: 'application/json;charset=UTF-8',
//         success: function(data) {
//             console.log(data);
//         }
//     });
// }