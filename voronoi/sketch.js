var delaunay = [],
	voronoi = [],
	id = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	Delaunay.psudoBorderSetup();
	randDist(20);
}

let b = 100
function draw() {
	background(b % 255);
	Delaunay.showAll();
	Voronoi.showAll();
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= HELPERS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= \\


function randDist(n) {
	for (let i = 0; i < n; i++)
		Voronoi.addVoronoi();
	Delaunay.process();
}

function mouseClicked(event) {
	let a = pointClick()
	if (a) return;

	Voronoi.addVoronoi(mouseX, mouseY);

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
	});

	voronoi.forEach((v) => {
		if (v.c.distanceTo(new Vector(mouseX, mouseY)) < v.c.r) {
			console.log(v);
			selected = true;
		}
	});
	return selected
}
