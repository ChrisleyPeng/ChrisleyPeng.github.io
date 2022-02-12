var time=31;
var period=12;
setInterval(function() {
	if(time<10363-period)
	{
		loaddata(time);
		time++;
	}
	else{
		time=0;
	}
  }, 2000)



function loaddata(time){
    fetch("https://raw.githubusercontent.com/CL-SU/CL-SU.github.io/master/data.json")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
		var arx_predict = new Array()
		for (var i=1;i<13;i++)
		{ 
			arx_predict.push(data["prediction"][0]["y"+i.toString()].slice(time,time+1));
		}
		linechart.data.datasets[1].data = arx_predict;
		var date = new Array()
		
		for (var i=1;i<13;i++)
		{ 
			date.push(data["Hour"][time+i-1]+' (' +i+' hr later)')
		}
		
		linechart.options.scales.xAxes[0].scaleLabel.labelString = data["Month"][time]+"."+data["Day"][time]
		linechart.data.labels=date
		linechart.data.datasets[0].data = data["y"].slice(time,time+period)
		linechart.update();
    })
    .catch((err) => {
        console.log(err)
    })
}



var linechart = new Chart(document.getElementById("linechart"), 
{
	type: 'line',
	data: {
		labels: ['y1','y2','y3','y4','y5','y6','y7','y8','y9','y10', 'y11','y12'],
		datasets: [{
			label: 'Real-time data',
			backgroundColor: "rgb(255, 159, 64)",
			borderColor: "rgb(255, 159, 64)",
			data: [1,2,3,2,5,1,7,1,4,2,3,2,5,1,7,1,4,2,3,2,5,10,0,1],
			fill: false,
		}, {
			label: 'ARX prediction',
			backgroundColor: window.chartColors.purple,
			borderColor: window.chartColors.purple,
			data: [40,20,35,25,50,10,70,10,40,20,35,25,50,10,70,10,40,20,35,25,50,10,70,10],
			fill: false,
		}]
	},
	options: {
		responsive: true,
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Hour',
					
				}
			}],
			yAxes: [{
				ticks:{
					min: -200,
					max: 1200,
					// tickInterval:100,
				},
				
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Solar Radiation',
				
				
				}
			}]
		}
	}
});
