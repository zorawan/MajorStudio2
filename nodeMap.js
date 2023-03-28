// fetch("survey.json")
// 	.then((response) => response.json())
// 	.then((data) => {
// 		// Step 2: Do something with the parsed data
// 		data.map(function (d, i) {
// 			return { id: i, name: d.icon_edit };
// 		});
// 		console.log(data); // This will log the parsed JSON data
// 	})
// 	.catch((error) => console.error(error));

// d3
// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 40 },
	width = 400 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
	.select("#node")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("survey.json").then(function (data) {
	// Define an object to hold the results
	var results = {};

	// Get an array of all the keys in the JSON
	var keys = Object.keys(data[0]);

	// Loop through each key and extract its values
	keys.forEach(function (key) {
		// Create a variable name based on the key (replace any spaces with underscores and convert to lowercase)
		var varName = key.replace(/ /g, "_").toLowerCase();
		// Extract the values for the key
		results[varName] = data.map(function (d) {
			return d[key].toLowerCase();
		});
	});
	console.log(results);

	// Initialize the links
	var link = svg
		.selectAll("line")
		.data(data.links)
		.enter()
		.append("line")
		.style("stroke", "#aaa");

	// Initialize the nodes
	var node = svg
		.selectAll("circle")
		.data(data.icon_accessibility)
		.enter()
		.append("circle")
		.attr("r", 20)
		.style("fill", "#69b3a2");

	// Let's list the force we wanna apply on the network
	var simulation = d3
		.forceSimulation(data.icon_accessibility) // Force algorithm is applied to data.nodes
		.force(
			"link",
			d3
				.forceLink() // This force provides links between nodes
				.id(function (d) {
					return d.id;
				}) // This provide  the id of a node
				.links(data.links) // and this the list of links
		)
		.force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
		.force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
		.on("end", ticked);

	// This function is run at each iteration of the force algorithm, updating the nodes position.
	function ticked() {
		link
			.attr("x1", function (d) {
				return d.source.x;
			})
			.attr("y1", function (d) {
				return d.source.y;
			})
			.attr("x2", function (d) {
				return d.target.x;
			})
			.attr("y2", function (d) {
				return d.target.y;
			});

		node
			.attr("cx", function (d) {
				return d.x + 6;
			})
			.attr("cy", function (d) {
				return d.y - 6;
			});
	}
});

d3.json("survey2.json").then(function (data2) {
	// Define an object to hold the results
	var results = {};

	// Get an array of all the keys in the JSON
	var keys = Object.keys(data2[0]);

	// Loop through each key and extract its values
	keys.forEach(function (key) {
		// Create a variable name based on the key (replace any spaces with underscores and convert to lowercase)
		var varName = key.replace(/ /g, "_").toLowerCase();
		// Extract the values for the key
		results[varName] = data2.map(function (d) {
			return d[key].toLowerCase();
		});
	});
	console.log(results);

	// Initialize the links
	var link = svg
		.selectAll("line")
		.data(data2.links)
		.enter()
		.append("line")
		.style("stroke", "#aaa");

	// Initialize the nodes
	var node = svg
		.selectAll("circle")
		.data(data.icon_accessibility)
		.enter()
		.append("circle")
		.attr("r", 20)
		.style("fill", "#69b3a2");

	// Let's list the force we wanna apply on the network
	var simulation = d3
		.forceSimulation(data.icon_accessibility) // Force algorithm is applied to data.nodes
		.force(
			"link",
			d3
				.forceLink() // This force provides links between nodes
				.id(function (d) {
					return d.id;
				}) // This provide  the id of a node
				.links(data.links) // and this the list of links
		)
		.force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
		.force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
		.on("end", ticked);

	// This function is run at each iteration of the force algorithm, updating the nodes position.
	function ticked() {
		link
			.attr("x1", function (d) {
				return d.source.x;
			})
			.attr("y1", function (d) {
				return d.source.y;
			})
			.attr("x2", function (d) {
				return d.target.x;
			})
			.attr("y2", function (d) {
				return d.target.y;
			});

		node
			.attr("cx", function (d) {
				return d.x + 6;
			})
			.attr("cy", function (d) {
				return d.y - 6;
			});
	}
});
