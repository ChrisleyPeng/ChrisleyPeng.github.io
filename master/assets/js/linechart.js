var time=0;
var period=24;
setInterval(function() {
	if(time<14473-period)
	{
		loaddata(time);
		time++;
	}
	else{
		time=0;
	}
  }, 2000)



function loaddata(time){
    fetch("https://raw.githubusercontent.com/ChrisleyPeng/ChrisleyPeng.github.io/main/master/data.json")
    .then((response) => {
        return response.json()
    })
    .then((data) => {
		linechart.data.datasets[1].data = data["prediction"].slice(time,time+period)
		linechart.options.scales.xAxes[0].scaleLabel.labelString = data["Month"][time]+"/"+data["Day"][time]
	    	var date = new Array()
	    	for (var i=time;i<time+period;i++)
		{
			if (data["Minute"][i] == 0)
			{
				date.push(data["Hour"][i]+':'+data["Minute"][i]+"0")
			}else
			{
				date.push(data["Hour"][i]+':'+data["Minute"][i])
			}
		}
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
		labels: ['y1','y2','y3','y4','y5','y6','y7','y8','y9','y10', 'y11','y12','y13','y14','y15','y16','y17','y18','y19','y20','y21','y22', 'y23','y24'],
		datasets: [{
			label: 'Groundtruth',
			backgroundColor: "rgb(255, 159, 64)",
			borderColor: "rgb(255, 159, 64)",
			data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
			fill: false,
		}, {
			label: 'Prediction',
			backgroundColor: window.chartColors.purple,
			borderColor: window.chartColors.purple,
			data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
					labelString: 'Minute',
					
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
					labelString: 'Solar Radiation (W/m2)',
				
				
				}
			}]
		}
	}
});
