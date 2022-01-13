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
		// arx_predict = data["prediction"][0]["y1"].slice(time,time+1)
		// rf_predict = data["prediction"][1]["y1"].slice(time,time+1)
		// ann1_predict = data["prediction"][2]["y1"].slice(time,time+1)
		var arx_predict = new Array()
		var rf_predict = new Array()
		var ann1_predict = new Array()
		for (var i=1;i<13;i++)
		{ 
			arx_predict.push(data["prediction"][0]["y"+i.toString()].slice(time,time+1));
			rf_predict.push(data["prediction"][1]["y"+i.toString()].slice(time,time+1));
			ann1_predict.push(data["prediction"][2]["y"+i.toString()].slice(time,time+1));	
		}
		// ar_predict = data["prediction"][0]["data"].slice(time,time+1)+data["prediction"][0]["data"].slice(time,time+1)+data["prediction"][0]["data"].slice(time,time+1)+data["prediction"][0]["data"].slice(time,time+1);
		linechart.data.datasets[1].data = arx_predict;
		// rf_predict = data["prediction"][1]["data"].slice(time,time+period);
		linechart.data.datasets[2].data = rf_predict;
		// ann_predict = data["prediction"][0]["data"].slice(time+period,time+2*period);
		linechart.data.datasets[3].data = ann1_predict;
		var date = new Array()
		
		for (var i=1;i<13;i++)
		{ 
			date.push(data["Hour"][time+i-1]+' (' +i+' hr later)')
		}
		
		linechart.options.scales.xAxes[0].scaleLabel.labelString = data["Month"][time]+"."+data["Day"][time]
		linechart.data.labels=date
		// console.log(date)
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
		labels: ['y1','y2','y3','y4','y5','y6','y7','y8','y9','y10', 'y11','y12'
		// ,'y13','y14','y15','y16','y17','y18','y19','y20','y21','y22','y23',
		// 'y24', 'y25','y26','y27','y28','y29','y30','y31','y32','y33','y34','y35','y36','y37','y38','y39','y40','y41','y42','y43','y44','y45','y46','y47',
		// 'y48','y49','y50','y51','y52','y53','y54','y55','y56','y57','y58','y59','y60','y61','y62','y63','y64','y65','y66','y67','y68','y69','y70','71'
	],
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
		}, {
			label: 'RF prediction',
			fill: false,
			backgroundColor: window.chartColors.navy,
			borderColor: window.chartColors.navy,
			data: [10,40,20,35,25,50,10,70,40,20,35,25,50,10,70,10,40,20,35,25,50,10,70,10],
		},{
			label: 'ANN(1) prediction',
			backgroundColor: "rgb(00, 125, 00)",
			borderColor: "rgb(00, 125, 00)",
			data: [20,10,15,15,20,10,30,5,20,10,15,5,20,10,70,10,40,20,35,25,50,10,70,10],
			// data: setTimeout(ar_predict, 1000),
			fill: false,
		}]
	},
	options: {
		responsive: true,
		// title: {
		// 	display: true,
		// 	text: 'Chart.js Line Chart'
		// },
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		// hover: {
		// 	mode: 'nearest',
		// 	intersect: true,
		// },
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



