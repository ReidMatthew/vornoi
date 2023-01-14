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
}

function mouseClicked(event) {
	let a = pointClick()
	if (a) return;

	Voronoi.addVoronoi(mouseX, mouseY);
}

function pointClick() {
	let selected = false;
	delaunay.forEach((d) => {
		if (d.centre.distanceTo(new Vector(mouseX, mouseY)) < 5) {
			console.log(d);
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
