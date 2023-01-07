const g = 4

function setup() {
	createCanvas(windowWidth, windowHeight);
	randDist(g);
}

var bois = [];
var a = 100;
function draw() {
	background(a)
	show(5)
	if (bois.length < 3) return;
	circ(bois[0], bois[1], bois[2])
}

function randDist(g) {
	for (let i = 0; i < g; i++) {
		bois.push({
			x: windowWidth * Math.random(),
			y: windowHeight * Math.random()
		})

	}
}

function show(r) {
	fill("white");
	bois.forEach((v) => {
		circle(v.x, v.y, r)
	});
}

function circ(p1, p2, p3) {
	line(p1.x, p1.y, p2.x, p2.y);
	line(p2.x, p2.y, p3.x, p3.y);
	line(p3.x, p3.y, p1.x, p1.y);

	const mid1 = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2, m: invSlope(p1, p2) },
		mid2 = { x: (p1.x + p3.x) / 2, y: (p1.y + p3.y) / 2, m: invSlope(p1, p3) };

	fill("red");
	circle(mid1.x, mid1.y, 5);
	circle(mid2.x, mid2.y, 5);

	let i = intersect(mid1, mid2);
	fill("blue");
	circle(i.x, i.y, 10);
	noFill()

	let color = "lime",
		r = distan(i, p1);
	bois.forEach((v) => {
		if (distan(i, v) < r - .01) {
			color = "pink"
		}
	})
	stroke(color)
	circle(i.x, i.y, 2 * r)

	stroke("white")
	line(0, mid1.m * (- mid1.x) + mid1.y, windowWidth, mid1.m * (windowWidth - mid1.x) + mid1.y)
	line(0, mid2.m * (- mid2.x) + mid2.y, windowWidth, mid2.m * (windowWidth - mid2.x) + mid2.y)

	stroke("black")
}

function intersect(p1, p2) {
	const x = ((p1.m * p1.x) - (p2.m * p2.x) + p2.y - p1.y) / (p1.m - p2.m),
		y = (p1.m * (x - p1.x)) + p1.y;

	return { x, y }
}

function invSlope(p1, p2) {
	let rise = p2.y - p1.y,
		run = p2.x - p1.x;

	return -run / rise;
}

function distan(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

function mouseClicked(event) {
	bois.push({ x: mouseX, y: mouseY })
}
