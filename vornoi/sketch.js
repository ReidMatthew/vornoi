var vectors = [],
	delauny = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	randDist(20);
}

function draw() {
	basicDraw();
	showDelauny();
	showVectors(5)
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= HELPERS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= \\
let b = 100
function basicDraw() {
	background(++b % 255);
	stroke("black");
	fill("white");
}

function vectorLoop() {
	if (vectors.length < 3) return;

	let delaunyTemp = [];
	for (let i = 0; i < vectors.length - 2; i++) {
		for (let j = 1; j < vectors.length - 1; j++) {
			for (let k = 2; k < vectors.length; k++) {
				delaunyTemp.push(isDelauny(vectors[i], vectors[j], vectors[k]));
			}
		}
	}

	delauny = delaunyTemp.filter((v) => v != false && !isNaN(v.r));
}

function randDist(g) {
	for (let i = 0; i < g; i++)
		vectors.push(new Vector(windowWidth * Math.random(), windowHeight * Math.random()));

	vectorLoop();
}

function showVectors() {
	vectors.forEach((v) => {
		v.show();
	});
}

function showDelauny() {
	delauny.forEach((v) => {
		v.show("noFill", 0, v.r * 2);
	})
}

function mouseClicked(event) {
	vectors.push(new Vector(mouseX, mouseY));
	vectorLoop();
}
