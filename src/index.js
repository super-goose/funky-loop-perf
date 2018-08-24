import priceHistory from './dummy-data';
import doThisStuff from './manipulate';
import timer from './timer';
import chart from './chart-drawer';

const THIS_MANY_TIMES = 1000;
const NUMBER_OF_TESTS = 10;

function doMe() {
    const results = [];
    
    for (let i = 0; i < NUMBER_OF_TESTS; i++) {
        let result = timer.clockThese(THIS_MANY_TIMES, [
            () => {
                let mapOperation = doThisStuff();
                let mapHtml = priceHistory.reverse().map((p, i) => {
                    i = (priceHistory.length - 1) - i;
                    return mapOperation(p, i);
                }).reverse().join('');
            },
            () => {
                let forOperation = doThisStuff();
                let forHtml = ''
                for (let i = priceHistory.length - 1; i >= 0; i--) {
                    forHtml = forOperation(priceHistory[i], i);
                }
            },
        ]);
    
        results.push({map: result[0], for: result[1]});
        console.log(`reverse.map.reverse.join: ${result[0]}`);
        console.log(`         simple for loop: ${result[1]}`);
        console.log(`-`);
    }
    
    chart(results)
}

doMe();

document.getElementById('redoChart').addEventListener('click', doMe);


