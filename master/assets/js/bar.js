new Chart(document.getElementById("barchart"), {
	type: 'bar',
	data: {
		labels: ['Training RMSE', 'Test RMSE'],
		datasets: [{
			data: [142.49, 143.71],
			label: 'AR',
			backgroundColor: "#8B658B",
			borderWidth: 1,
		}, {
			data: [140.99, 142.66],
			label: 'ARX',
			backgroundColor: "#000080",
			borderWidth: 1,
		}
		, {
			data: [145.91, 145.8],
			label: 'SVR(linear)',
			backgroundColor: "#008000",
			borderWidth: 1,
		}, {
			data: [133.9, 144.42],
			label: 'SVR(poly)',
			backgroundColor: "#e6e2c3",
			borderWidth: 1,
		},{
			data: [132.88, 140.23],
			label: 'SVR(rbf)',
			backgroundColor: "F4606C",
			borderWidth: 1,
		},{
			data: [117.91, 133.96],
			label: 'RF',
			backgroundColor: "#BEE7E9",
			borderWidth: 1,
		},{
			data: [138.49, 140.03],
			label: 'ANN(0)',
			backgroundColor: "#D1BA74",
			borderWidth: 1,
		},{
			data: [131.8, 137.05],
			label: 'ANN(1)',
			backgroundColor: "#ECAD9E",
			borderWidth: 1,
		}]
	},
	options: {
		responsive: true,
		legend: {
			position: 'top',
		},
		scales: {
			yAxes: [{
				ticks:{
					min: 0,
					max: 160,
					// tickInterval:100,
				}
			},]
		}
	}
});


