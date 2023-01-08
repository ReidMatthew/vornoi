function isDelauny(v1, v2, v3) {
    // find the midpoint between two points (twice)
    // this line's slopes will always be tangent to the circle at the points perp from the mid
    // the intersection of two lines whos slopes are tangent to the circle will be the centre/ center 
    const mid1 = v1.lerp(v2),
        mid2 = v1.lerp(v3);
    mid1.m = Vector.invertSlope(mid1.slopeWith(v1));
    mid2.m = Vector.invertSlope(mid2.slopeWith(v1));

    const centre = intersect(mid1, mid2); // this is the name for the center point in a circle
    centre.r = centre.distanceTo(v1);

    let color = "lime";
    vectors.forEach((v) => {
        if (centre.distanceTo(v) < centre.r - .01)
            color = "pink";
    })
    if (color === "lime")
        centre.show("noFill", color, 2 * centre.r);

    // // Construction Visualization 
    // centre.show("black", "white")

    // stroke("black")
    // line(v1.x, v1.y, v2.x, v2.y);
    // line(v2.x, v2.y, v3.x, v3.y);
    // line(v3.x, v3.y, v1.x, v1.y);

    // stroke("white");
    // line(0, mid1.m * (- mid1.x) + mid1.y, windowWidth, mid1.m * (windowWidth - mid1.x) + mid1.y);
    // line(0, mid2.m * (- mid2.x) + mid2.y, windowWidth, mid2.m * (windowWidth - mid2.x) + mid2.y);

    return color === "lime" ? centre : false;
}

function intersect(v1, v2) {
    const x = ((v1.m * v1.x) - (v2.m * v2.x) + v2.y - v1.y) / (v1.m - v2.m);
    return new Vector(x, v1.m * (x - v1.x) + v1.y);
}