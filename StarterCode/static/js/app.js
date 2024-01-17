// READ IN DATA
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
d3.json(url).then(data=>console.log(data));


// INITALIZE FUNCTION
function init() {
    let dropdownMenu = d3.select('#selDataset');
    d3.json(url).then((data)=>{
        let names = data.names;
        names.forEach(id=>{
            dropdownMenu.append('option')
            .text(id).property('value', id);
        });
        let selection = names[0];
        console.log(selection);
        barChart(selection);
        bubbleChart(selection);
        metadataPanel(selection);
        //gaugeChart(selection);
    });
};


//BAR CHART
function barChart(sample) {
    d3.json(url).then((data)=>{
        let selection = data.samples.filter(match=>match.id === sample)[0];
        let trace = {
            x: selection.sample_values.slice(0,10),
            y: selection.otu_ids.slice(0, 10).map(id => `OTU ${id}`),

            text: selection.otu_labels.slice(0,10),
            type: 'bar',
            orientation: 'h'
        };
        Plotly.newPlot('bar', [trace]);
    })
};


//BUBBLE CHART
function bubbleChart(sample) {
    d3.json(url).then((data)=>{
        let selection = data.samples.filter(match=>match.id === sample)[0];
        let trace = {
            x: selection.otu_ids,
            y: selection.sample_values,
            text: selection.otu_labels,
            mode: 'markers',
            marker: {
                size: selection.sample_values,
                color: selection.otu_ids,
                colorscale: 'Phase'
            }
        };
        let layout = {
            height: 800,
            width: 1200,
            xaxis: {title: {text: 'OTU IDs'}}
        };
        Plotly.newPlot('bubble', [trace], layout);
    })
};


//METADATA PANEL
function metadataPanel(sample) {
    d3.json(url).then((data)=>{
        let selection = data.metadata.filter(match=>match.id === parseInt(sample))[0];
        console.log(selection);
        let panelSelect = d3.select('#sample-metadata');
        panelSelect.html('');
        Object.entries(selection).forEach(([key, value])=>{
            panelSelect.append('p').text(`${key}: ${value}`)
        });
    })
};


//DROPDOWN MENU
function optionChanged(sample) {
    console.log(sample);
    barChart(sample);
    bubbleChart(sample);
    metadataPanel(sample);
    gaugeChart(sample);
};

init();    
