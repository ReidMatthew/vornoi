var vectors = [],
	delaunay = [],
	vornoi = [],
	id = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	Delaunay.psudoBorderSetup();
	randDist(20);
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
		vectors.push(new Vector(Math.floor(windowWidth * Math.random()), Math.floor(windowHeight * Math.random())));
	Delaunay.process();
}

function showVectors() {
	vectors.forEach((v) => {
		v.show();
	});
}

function showDelauny() {
	delaunay.forEach((v) => {
		v.show();
	})
}

function mouseClicked(event) {
	let a = pointClick()
	if (a) return;

	vectors.push(new Vector(mouseX, mouseY));
	Delaunay.process();

	console.log(delaunay)
}

function pointClick() {
	let selected = false;
	delaunay.forEach((d) => {
		if (d.centre.distanceTo(new Vector(mouseX, mouseY)) < 5) {
			console.log(d);
			selected = true;
		}
	});

	vectors.forEach((v) => {
		if (v.distanceTo(new Vector(mouseX, mouseY)) < v.r) {
			console.log(v);
			selected = true;
		}
	})
	return selected
}
