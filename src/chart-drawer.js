
let div = document.getElementById('chart-container');
div.innerHTML = '';
let canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;
div.appendChild(canvas);

let ctx = canvas.getContext('2d');

const STEP_SIZE = 3;

function parseTime(str) {
    return Number(str.match(/iterations in (\d+) ms/)[1]);
}

function ordinal(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
}

export default function (rawData) {
    let dataMap = rawData.map(d => parseTime(d.map));
    let dataFor = rawData.map(d => parseTime(d.for));

    let MAX = Math.max(
        dataMap.reduce((a, b) => Math.max(a, b), 0),
        dataFor.reduce((a, b) => Math.max(a, b), 0)
    ) + 5;

    let MIN = Math.min(
        dataMap.reduce((a, b) => Math.min(a, b), Infinity),
        dataFor.reduce((a, b) => Math.min(a, b), Infinity)
    ) - 5;

    MAX -= (MAX % STEP_SIZE);
    MIN += (STEP_SIZE - (MIN % STEP_SIZE));

    let labels = [];
    for (let i = 1, l = rawData.length; i <= l; i++) {
        labels.push(ordinal(i));
    }
    
    
    
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'reverse.map.reverse.join',
                    borderColor: '#18b3ff',
                    data: dataMap,
                    fill: false,
                },{
                    label: 'for',
                    borderColor: '#fe6000',
                    data: dataFor,
                    fill: false,
                }
            ]
        },
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    // position: 'bottom',
                    ticks: {
                        // max: rawData.length,
                        // min: 0,
                        beginAtZero: true,
                        stepSize: 1,
                    },
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        min: MIN,
                        max: MAX,
                        stepSize: STEP_SIZE,
                    },
                }]
            },
            elements: {
                line: {
                    tension: .2, // disables bezier curves
                }
            }
        }
    });
}




// var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255,99,132,1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero:true
//                 }
//             }]
//         }
//     }
// });