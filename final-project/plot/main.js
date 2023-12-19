document.addEventListener('DOMContentLoaded', async function () {
    const dataURL = "http://localhost:3000/datas";
    const response = await fetch(dataURL);
    const data = await response.json();

    // Find the student with the largest ID
    const maxIdStudent = data.reduce((maxIdStudent, currentStudent) => {
        return currentStudent.id > maxIdStudent.id ? currentStudent : maxIdStudent;
    });

    // Extract the attributes excluding "id" and "year"
    const labels = Object.keys(maxIdStudent).filter(attribute => attribute !== "id" && attribute !== "year");

    // Extract data for the student with the largest ID (Radar Chart)
    const radarChartData = {
        type: 'scatterpolar',
        name: `Student ${maxIdStudent.id}`,
        r: labels.map(label => maxIdStudent[label]),
        theta: labels,
        fill: 'toself'
    };

    // Layout for the radar chart
    const radarLayout = {
        title: 'Radar Chart',
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 15]
            }
        },
        showlegend: true,
        paper_bgcolor: '#FFE4E1'
    };

    // Plot the radar chart
    Plotly.newPlot('radarChart', [radarChartData], radarLayout);

    // Extract data for the student with the largest ID (Line Chart - Example)
    const lineChartData = {
        x: labels,
        y: labels.map(label => maxIdStudent[label]), // Use the actual data values
        type: 'line',
        name: `Student ${maxIdStudent.id}`,
    };

    // Layout for the line chart
    const lineLayout = {
        title: 'Line Chart',
        showlegend: true,
        yaxis: {
            range: [0, 15] // Set y-axis range for the line chart
        },
        paper_bgcolor: '#FFE4E1'
        
    };

    // Plot the line chart
    Plotly.newPlot('lineChart', [lineChartData], lineLayout);


    
});


document.addEventListener('DOMContentLoaded', async function () {
    // Fetch data from the specified URL
    const dataURL = "http://localhost:3000/datas";
    const response = await fetch(dataURL);
    const data = await response.json();

    // Find the student with the largest ID
    const maxIdStudent = data.reduce((maxIdStudent, currentStudent) => {
        return currentStudent.id > maxIdStudent.id ? currentStudent : maxIdStudent;
    });

    console.log(maxIdStudent);
    let data1 = {
        "112": {'chinese': {'頂標': 13, '前標': 12, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 13, '前標': 11, '均標': 8, '後標': 5, '底標': 4}, 'matha': {'頂標': 11, '前標': 9, '均標': 7, '後標': 5, '底標': 4}, 'mathb': {'頂標': 12, '前標': 10, '均標': 7, '後標': 4, '底標': 3}, 'social': {'頂標': 12, '前標': 11, '均標': 9, '後標': 8, '底標': 6}, 'science': {'頂標': 13, '前標': 11, '均標': 9, '後標': 6, '底標': 5}},
        "111": {'chinese': {'頂標': 13, '前標': 12, '均標': 10, '後標': 9, '底標': 7}, 'english': {'頂標': 13, '前標': 12, '均標': 8, '後標': 5, '底標': 4}, 'matha': {'頂標': 10, '前標': 8, '均標': 6, '後標': 4, '底標': 3}, 'mathb': {'頂標': 13, '前標': 11, '均標': 8, '後標': 4, '底標': 3}, 'social': {'頂標': 13, '前標': 12, '均標': 11, '後標': 9, '底標': 7}, 'science': {'頂標': 14, '前標': 12, '均標': 10, '後標': 7, '底標': 5}},
        "110": {'chinese': {'頂標': 13, '前標': 12, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 13, '前標': 12, '均標': 8, '後標': 5, '底標': 4}, 'matha': {'頂標': 11, '前標': 9, '均標': 6, '後標': 4, '底標': 3}, 'mathb': {'頂標': 0, '前標': 0, '均標': 0, '後標': 0, '底標': 0}, 'social': {'頂標': 13, '前標': 12, '均標': 10, '後標': 8, '底標': 7}, 'science': {'頂標': 13, '前標': 12, '均標': 8, '後標': 6, '底標': 5}},
        "109": {'chinese': {'頂標': 13, '前標': 13, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 14, '前標': 12, '均標': 9, '後標': 6, '底標': 4}, 'matha': {'頂標': 14, '前標': 13, '均標': 9, '後標': 5, '底標': 4}, 'mathb': {'頂標': 0, '前標': 0, '均標': 0, '後標': 0, '底標': 0}, 'social': {'頂標': 13, '前標': 12, '均標': 10, '後標': 8, '底標': 7}, 'science': {'頂標': 13, '前標': 11, '均標': 8, '後標': 6, '底標': 5}},
        "108": {'chinese': {'頂標': 13, '前標': 13, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 14, '前標': 13, '均標': 10, '後標': 5, '底標': 4}, 'matha': {'頂標': 14, '前標': 12, '均標': 9 , '後標': 5, '底標': 4}, 'mathb': {'頂標': 0, '前標': 0, '均標': 0, '後標': 0, '底標': 0}, 'social': {'頂標': 13, '前標': 12, '均標':  10, '後標': 9, '底標': 7}, 'science': {'頂標': 13, '前標': 11, '均標': 8, '後標': 6, '底標': 5}},
      };

      console.log(data1);
    // Use the year from the largest ID to get the corresponding array from data1
    const year = maxIdStudent.year;
    console.log(year);
    const yearData = data1[108];
    console.log(yearData);

    // Extract the attributes excluding "id"
    const subjects = Object.keys(yearData);
    const scores_top = subjects.map(subject => yearData[subject]['頂標']);
    const scores_front = subjects.map(subject => yearData[subject]['前標']);
    const scores_avg = subjects.map(subject => yearData[subject]['均標']);
    const scores_back = subjects.map(subject => yearData[subject]['後標']);
    const scores_bottom = subjects.map(subject => yearData[subject]['底標']);

    // Radar chart data
    const radarChartData = [
        {
            type: 'scatterpolar',
            r: scores_top,
            theta: subjects,
            fill: 'toself',
            name: '頂標 Scores'
        },
        {
            type: 'scatterpolar',
            r: scores_front,
            theta: subjects,
            fill: 'toself',
            name: '前標 Scores'
        },
        {
            type: 'scatterpolar',
            r: scores_avg,
            theta: subjects,
            fill: 'toself',
            name: '均標 Scores'
        },
        {
            type: 'scatterpolar',
            r: scores_back,
            theta: subjects,
            fill: 'toself',
            name: '後標 Scores'
        },
        {
            type: 'scatterpolar',
            r: scores_bottom,
            theta: subjects,
            fill: 'toself',
            name: '底標 Scores'
        }
    ];

    // Layout for the radar chart
    const radarLayout = {
        title: `All Scores in Year ${year}`,
        polar: {
            radialaxis: {
                visible: true,
                range: [0, Math.max(...scores_top, ...scores_front, ...scores_avg, ...scores_back, ...scores_bottom) + 2]  // Set the range based on the scores
            }
        },
        showlegend: true,
        paper_bgcolor: '#FFE4E1'
    };

    // Plot the radar chart
    Plotly.newPlot('radarChart2', radarChartData, radarLayout);
});


let data = {
    "112": {'chinese': {'頂標': 13, '前標': 12, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 13, '前標': 11, '均標': 8, '後標': 5, '底標': 4}, 'matha': {'頂標': 11, '前標': 9, '均標': 7, '後標': 5, '底標': 4}, 'mathb': {'頂標': 12, '前標': 10, '均標': 7, '後標': 4, '底標': 3}, 'social': {'頂標': 12, '前標': 11, '均標': 9, '後標': 8, '底標': 6}, 'science': {'頂標': 13, '前標': 11, '均標': 9, '後標': 6, '底標': 5}},
    "111": {'chinese': {'頂標': 13, '前標': 12, '均標': 10, '後標': 9, '底標': 7}, 'english': {'頂標': 13, '前標': 12, '均標': 8, '後標': 5, '底標': 4}, 'matha': {'頂標': 10, '前標': 8, '均標': 6, '後標': 4, '底標': 3}, 'mathb': {'頂標': 13, '前標': 11, '均標': 8, '後標': 4, '底標': 3}, 'social': {'頂標': 13, '前標': 12, '均標': 11, '後標': 9, '底標': 7}, 'science': {'頂標': 14, '前標': 12, '均標': 10, '後標': 7, '底標': 5}},
    "110": {'chinese': {'頂標': 13, '前標': 12, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 13, '前標': 12, '均標': 8, '後標': 5, '底標': 4}, 'matha': {'頂標': 11, '前標': 9, '均標': 6, '後標': 4, '底標': 3}, 'mathb': {'頂標': 0, '前標': 0, '均標': 0, '後標': 0, '底標': 0}, 'social': {'頂標': 13, '前標': 12, '均標': 10, '後標': 8, '底標': 7}, 'science': {'頂標': 13, '前標': 12, '均標': 8, '後標': 6, '底標': 5}},
    "109": {'chinese': {'頂標': 13, '前標': 13, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 14, '前標': 12, '均標': 9, '後標': 6, '底標': 4}, 'matha': {'頂標': 14, '前標': 13, '均標': 9, '後標': 5, '底標': 4}, 'mathb': {'頂標': 0, '前標': 0, '均標': 0, '後標': 0, '底標': 0}, 'social': {'頂標': 13, '前標': 12, '均標': 10, '後標': 8, '底標': 7}, 'science': {'頂標': 13, '前標': 11, '均標': 8, '後標': 6, '底標': 5}},
    "108": {'chinese': {'頂標': 13, '前標': 13, '均標': 11, '後標': 9, '底標': 8}, 'english': {'頂標': 14, '前標': 13, '均標': 10, '後標': 5, '底標': 4}, 'matha': {'頂標': 14, '前標': 12, '均標': 9 , '後標': 5, '底標': 4}, 'mathb': {'頂標': 0, '前標': 0, '均標': 0, '後標': 0, '底標': 0}, 'social': {'頂標': 13, '前標': 12, '均標':  10, '後標': 9, '底標': 7}, 'science': {'頂標': 13, '前標': 11, '均標': 8, '後標': 6, '底標': 5}},
  };


  // Extract years and scores for Chinese
    const years = Object.keys(data);
    const chineseScores = years.map(year => data[year]['chinese']['頂標']);
    const englishScores = years.map(year => data[year]['english']['頂標']);
    const mathaScores = years.map(year => data[year]['matha']['頂標']);
    const mathbScores = years.map(year => data[year]['mathb']['頂標']);
    const socialScores = years.map(year => data[year]['social']['頂標']);
    const scienceScores = years.map(year => data[year]['science']['頂標']);


  // Line chart data
  const chineseChartData = {
      x: years,
      y: chineseScores,
      type: 'line',
      mode: 'lines+markers',
      marker: {
          size: 10
      },
      name: 'Chinese Scores'
  };
  const englishChartData = {
    x: years,
    y: englishScores,
    type: 'line',
    mode: 'lines+markers',
    marker: {
        size: 10
    },
    name: 'English Scores'
};

const mathaChartData = {
    x: years,
    y: mathaScores,
    type: 'line',
    mode: 'lines+markers',
    marker: {
        size: 10
    },
    name: 'Math A Scores'
};

const mathbChartData = {
    x: years,
    y: mathbScores,
    type: 'line',
    mode: 'lines+markers',
    marker: {
        size: 10
    },
    name: 'Math B Scores'
};

const socialChartData = {
    x: years,
    y: socialScores,
    type: 'line',
    mode: 'lines+markers',
    marker: {
        size: 10
    },
    name: 'Social Scores'
};

const scienceChartData = {
    x: years,
    y: scienceScores,
    type: 'line',
    mode: 'lines+markers',
    marker: {
        size: 10
    },
    name: 'Science Scores'
};

  // Layout for the line chart
  const lineLayout = {
      title: 'Scores Over Years',
      xaxis: {
          title: 'Year'
      },
      yaxis: {
          title: 'Score'
      },
      showlegend: true,
      paper_bgcolor: '#FFE4E1'
  };

  // Plot the line chart

Plotly.newPlot('lineChart2', [chineseChartData, englishChartData, mathaChartData, mathbChartData, socialChartData, scienceChartData], lineLayout);


        // const subjects = Object.keys(data['112']);
        // const scores112_top = subjects.map(subject => data['112'][subject]['頂標']);
        // const scores112_front = subjects.map(subject => data['112'][subject]['前標']);
        // const scores112_avg = subjects.map(subject => data['112'][subject]['均標']);
        // const scores112_back = subjects.map(subject => data['112'][subject]['後標']);
        // const scores112_bottom = subjects.map(subject => data['112'][subject]['底標']);
        
        // // Radar chart data
        // const radarChartData = [
        //     {
        //         type: 'scatterpolar',
        //         r: scores112_top,
        //         theta: subjects,
        //         fill: 'toself',
        //         name: '頂標 Scores in 112'
        //     },
        //     {
        //         type: 'scatterpolar',
        //         r: scores112_front,
        //         theta: subjects,
        //         fill: 'toself',
        //         name: '前標 Scores in 112'
        //     },
        //     {
        //         type: 'scatterpolar',
        //         r: scores112_avg,
        //         theta: subjects,
        //         fill: 'toself',
        //         name: '均標 Scores in 112'
        //     },
        //     {
        //         type: 'scatterpolar',
        //         r: scores112_back,
        //         theta: subjects,
        //         fill: 'toself',
        //         name: '後標 Scores in 112'
        //     },
        //     {
        //         type: 'scatterpolar',
        //         r: scores112_bottom,
        //         theta: subjects,
        //         fill: 'toself',
        //         name: '底標 Scores in 112'
        //     }
        // ];
        
        // // Layout for the radar chart
        // const radarLayout = {
        //     title: 'All Scores',
        //     polar: {
        //         radialaxis: {
        //             visible: true,
        //             range: [0, Math.max(...scores112_top, ...scores112_front, ...scores112_avg, ...scores112_back, ...scores112_bottom) + 2]  // Set the range based on the scores
        //         }
        //     },
        //     showlegend: true,
        //     paper_bgcolor: '#FFE4E1'
        // };
        
        // // Plot the radar chart
        // Plotly.newPlot('radarChart2', radarChartData, radarLayout);
        