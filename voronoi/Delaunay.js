class Delaunay {
    /**
     * The valid vector trios that define Thesian Polygons
     * @param {Vector} centre The center point of the Delauny Triangulation
     * @param {[Vector]} triVectors The three Vectors that make up the circle definition
     */
    constructor(centre, triVectors) {
        this.centre = centre; // this is the name for the center point in a circle
        this.centre.r = centre.r * 2;
        this.vectors = Vector.sort(triVectors);
        this.neighboors = [];
        this.id = this.centre.id;
    }

    show(edge, triangle, circle) {
        if (circle)
            this.centre.show("noFill");

        if (edge)
            this.showEdge();

        if (triangle)
            this.triangle()
    }

    showEdge() {
        stroke("red")
        this.neighboors.forEach((d) => {
            line(this.centre.x, this.centre.y, d.centre.x, d.centre.y);
        })
    }

    showTriangle() {
        stroke("blue");
        line(this.vectors[0].x, this.vectors[0].y, this.vectors[1].x, this.vectors[1].y);
        line(this.vectors[1].x, this.vectors[1].y, this.vectors[2].x, this.vectors[2].y);
        line(this.vectors[2].x, this.vectors[2].y, this.vectors[0].x, this.vectors[0].y);
    }

    adjecent() {
        delaunay.forEach((d) => {
            let matches = 0;
            this.vectors.forEach((v) => {
                if (d.vectors.includes(v))
                    matches++;
            });

            if (matches == 2)
                this.neighboors.push(d);
        });
    }

    compareWith(d) {
        return Delaunay.compare(this, d);
    }

    /**
     * Checks the validity of a perspective Delaunay Triangulation
     * @param {Voronoi} v1 
     * @param {Voronoi} v2 
     * @param {Voronoi} v3 
     */
    static check(v1, v2, v3) {
        const mid1 = v1.c.lerp(v2.c),
            mid2 = v1.c.lerp(v3.c);

        mid1.m = Vector.invertSlope(mid1.slopeWith(v1.c));
        mid2.m = Vector.invertSlope(mid2.slopeWith(v1.c));
        if (mid1.m === "Infinity" || mid1.m === "-Infinity" || mid2.m === "Infinity" || mid2.m === "Infinity")
            return;

        const centre = intersect(mid1, mid2);
        if (!centre)
            return;

        centre.r = centre.distanceTo(v1.c);

        let valid = true;
        voronoi.forEach((v) => {
            if (centre.distanceTo(v.c) < centre.r - Vector.tolerance)
                valid = false;
        });

        if (valid) {
            if (!centre.x)
                console.log("bbb")
            v1.vertex.push(centre);
            v2.vertex.push(centre);
            v3.vertex.push(centre);
            return new Delaunay(centre, [v1.c, v2.c, v3.c]);
        }

        return false;
    }

    // by adding four points in each offscreen corner, this "simulates" the offscreen tangent calculations
    static psudoBorderSetup() {
        Voronoi.addVoronoi(new Vector(windowWidth * 2, windowHeight * 2));
        Voronoi.addVoronoi(new Vector(windowWidth * 2, windowHeight * -1));
        Voronoi.addVoronoi(new Vector(windowWidth * -1, windowHeight * 2));
        Voronoi.addVoronoi(new Vector(windowWidth * -1, windowHeight * -1));
    }

    static compare(d1, d2) {
        return d1.id === d2.id;
    }

    // run the checks and comparisons between all Delaunays
    static process() {
        if (voronoi.length < 3) return;

        let test,
            ids = [];
        delaunay = [];
        for (let i = 0; i < voronoi.length - 2; i++)
            for (let j = 1; j < voronoi.length - 1; j++)
                for (let k = 2; k < voronoi.length; k++) {
                    test = Delaunay.check(voronoi[i], voronoi[j], voronoi[k]);
                    if (test) {
                        if (!ids.includes(test.id)) {
                            delaunay.push(test);
                            ids.push(test.id)
                        }
                    }
                }

        delaunay.forEach((d) => d.adjecent());

        Voronoi.process();
    }

    static showAll(edge = false, triangle = false, circle = false) {
        delaunay.forEach((v) => {
            v.show(edge, triangle, circle);
        })
    }
}

function intersect(v1, v2) {
    const x = ((v1.m * v1.x) - (v2.m * v2.x) + v2.y - v1.y) / (v1.m - v2.m),
        y = v1.m * (x - v1.x) + v1.y,
        v = new Vector(x, y);

    return v.x ? v : false;
}