function graph() {
    var trace1 = {
    x: [0].concat(input.people.infected),
    y: () => {
        let i = 0;
        let arr =[]
        for(i = 0;i<=input.people.infected.length;i++) {
            arr[i] = i;
        }
        return arr;
    },
    type: 'scatter'
  };
  
  var data = [trace1];
  
  Plotly.newPlot('myChart', data);
}
