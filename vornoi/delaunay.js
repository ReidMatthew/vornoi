function circ(v1, v2, v3) {
    // find the midpoint between two points (twice)
    // this line's slopes will always be tangent to the circle at the points perp from the mid
    // the intersection of two lines whos slopes are tangent to the circle will be the centre/ center 
    const mid1 = v1.lerp(v2),
        mid2 = v1.lerp(v3);
    mid1.m = Vector.invertSlope(mid1.slopeWith(v1));
    mid2.m = Vector.invertSlope(mid2.slopeWith(v1));

    const centre = intersect(mid1, mid2); // this is the name for the center point in a circle

    let color = "lime",
        r = centre.distanceTo(v1);
    vectors.forEach((v) => {
        if (centre.distanceTo(v) < r - .01) {
            color = "pink"
        }
    })
    stroke(color);
    noFill();
    // circle(centre.x, centre.y, 2 * r);
    centre.show("noFill", color, 2 * r);

    // // Construction Visualization 
    fill("blue");
    centre.show("black", "white")

    // mid2.show("red", "black");
    // mid1.show("red", "black");

    // stroke("black")
    // line(v1.x, v1.y, v2.x, v2.y);
    // line(v2.x, v2.y, v3.x, v3.y);
    // line(v3.x, v3.y, v1.x, v1.y);

    // stroke("white");
    // line(0, mid1.m * (- mid1.x) + mid1.y, windowWidth, mid1.m * (windowWidth - mid1.x) + mid1.y);
    // line(0, mid2.m * (- mid2.x) + mid2.y, windowWidth, mid2.m * (windowWidth - mid2.x) + mid2.y);
}

function intersect(p1, p2) {
    const x = ((p1.m * p1.x) - (p2.m * p2.x) + p2.y - p1.y) / (p1.m - p2.m);
    return new Vector(x, p1.m * (x - p1.x) + p1.y);
}