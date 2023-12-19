d3.csv("https://raw.githubusercontent.com/qwuzer/qwuzer.github.io/main/states_all.csv").then(
    res => {
        console.log(res);
        drawLineChart(res);
        drawPieChart(res);
        drawBarChart(res);   
    }
);

function drawLineChart(res) {
    let years = res.map(entry => entry.YEAR);
    let totalRevenues = res.map(entry => entry.TOTAL_REVENUE);

    let totalRevenue = Array(33).fill(0);

    for (let i = 0; i < years.length; i++) {
        if (!isNaN(totalRevenues[i]) && !isNaN(years[i])) {
            let yearValue = parseInt(years[i]);
            if (yearValue >= 1986 && yearValue <= 2019) {
                let index = yearValue - 1986;
                totalRevenue[index] += parseInt(totalRevenues[i]);
            }
        }
    }

    console.log(totalRevenue);
    let myGraph = document.getElementById('LineChart');

    let data = [{
        type: 'scatter',
        mode: 'lines+markers',
        x: Array.from({ length: 33 }, (_, i) => i + 1986),
        y: totalRevenue,
        name: 'Total Revenue',
        line: {
            color: 'black'  
        }
    }];

    let layout = {
        title: 'Total Revenue Over Years (1986-2019)',
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Total Revenue'
        }
    };

    Plotly.newPlot(myGraph, data, layout);
}

function drawBarChart(res) {
    let myGraph = document.getElementById('BarChart');

    let states = res.map(entry => entry.STATE);
    let enrollment = res.map(entry => entry.ENROLL);

    let data = [{
        type: 'bar',
        x: states,
        y: enrollment,
        text: enrollment,
        textposition: 'auto',
        marker: {
            color: 'blue'
        }
    }];

    let layout = {
        title: 'Enrollment by State',
        xaxis: {
            title: 'State'
        },
        yaxis: {
            title: 'Enrollment'
        }
    };

    Plotly.newPlot(myGraph, data, layout);
}

function drawPieChart(res) {
    let myGraph = document.getElementById('PieChart');

    let federalRevenue = res.map(entry => entry.FEDERAL_REVENUE);
    let stateRevenue = res.map(entry => entry.STATE_REVENUE);
    let localRevenue = res.map(entry => entry.LOCAL_REVENUE);

    let TotalFederalRevenue = 0;
    let TotalStateRevenue = 0;
    let TotalLocalRevenue = 0;
    console.log(parseInt(federalRevenue[0])+ parseInt(federalRevenue[1]));
    console.log(federalRevenue.length);

    for (let i = 0; i < federalRevenue.length; i++) {
        const federal = parseInt(federalRevenue[i]);
        const state = parseInt(stateRevenue[i]);
        const local = parseInt(localRevenue[i]);
    
        if (!isNaN(federal)) {
            TotalFederalRevenue += federal;
        }
    
        if (!isNaN(state)) {
            TotalStateRevenue += state;
        }
    
        if (!isNaN(local)) {
            TotalLocalRevenue += local;
        }
    }

    console.log(TotalFederalRevenue);
    let data = [{
        type: 'pie',
        labels: ['Federal Revenue', 'State Revenue', 'Local Revenue'],
        values: [TotalFederalRevenue, TotalStateRevenue, TotalLocalRevenue],
        textinfo: 'percent+label',
        insidetextorientation: 'radial'
    }];

    let layout = {
        title: 'Revenue Distribution',
    };

    Plotly.newPlot(myGraph, data, layout);
}
