var vectors = [],
	delauny = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	Delauny.psudoBorderSetup();
	randDist(50);
	console.log(delauny)
}

let b = 100
function draw() {
	background(b % 255);
	showDelauny();
	showVectors(5)
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= HELPERS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= \\


function randDist(g) {
	for (let i = 0; i < g; i++)
		vectors.push(new Vector(windowWidth * Math.random(), windowHeight * Math.random()));
	Delauny.process();
}

function showVectors() {
	vectors.forEach((v) => {
		v.show();
	});
}

function showDelauny() {
	delauny.forEach((v) => {
		v.show();
	})
}

function mouseClicked(event) {
	vectors.push(new Vector(mouseX, mouseY));
	Delauny.process();
}
