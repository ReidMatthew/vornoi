var vectors = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	randDist(4);
}

function draw() {
	basicDraw();
	showVectors(5)
	circ(vectors[0], vectors[1], vectors[2])
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= HELPERS =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= \\

function basicDraw() {
	background(100);
	stroke("black");
	fill("white");
}

function randDist(g) {
	for (let i = 0; i < g; i++)
		vectors.push(new Vector(windowWidth * Math.random(), windowHeight * Math.random()));
}

function showVectors() {
	vectors.forEach((v) => {
		v.show()
	});
}

function mouseClicked(event) {
	vectors.push(new Vector(mouseX, mouseY))
}
