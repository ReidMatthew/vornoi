class Delaunay {
    constructor(centre, triVectors) {
        this.centre = centre; // this is the name for the center point in a circle
        this.centre.r = centre.r * 2;
        this.vectors = triVectors;
        this.neighboors;
    }

    show() {
        this.centre.show("noFill");

        this.showConnections();
    }

    showConnections() {
        stroke("red")
        this.neighboors.forEach((d) => {
            line(this.centre.x, this.centre.y, d.centre.x, d.centre.y);
        })
    }

    adjecent() {
        this.neighboors = [];
        delauny.forEach((d) => {
            let matches = 0;
            this.vectors.forEach((v) => {
                if (d.vectors.includes(v))
                    matches++;
            });

            if (matches === 2)
                this.neighboors.push(d);
        });
    }

    static check(v1, v2, v3) {
        const mid1 = v1.lerp(v2),
            mid2 = v1.lerp(v3);
        mid1.m = Vector.invertSlope(mid1.slopeWith(v1));
        mid2.m = Vector.invertSlope(mid2.slopeWith(v1));

        const centre = intersect(mid1, mid2);
        centre.r = centre.distanceTo(v1);

        let valid = true;
        vectors.forEach((v) => {
            if (centre.distanceTo(v) < centre.r - .01)
                valid = false;
        });

        if (valid === true && centre.x)
            return new Delaunay(centre, [v1, v2, v3]);

        return false;
    }

    // by adding four points in each offscreen corner, this "simulates" the offscreen tangent calculations
    static psudoBorderSetup() {
        vectors.push(new Vector(windowWidth * 2, windowHeight * 2));
        vectors.push(new Vector(windowWidth * 2, windowHeight * -1));
        vectors.push(new Vector(windowWidth * -1, windowHeight * 2));
        vectors.push(new Vector(windowWidth * -1, windowHeight * -1));
    }

    // run the checks and comparisons between all Delaunays
    static process() {
        if (vectors.length < 3) return;

        let delaunyTemp = [];
        for (let i = 0; i < vectors.length - 2; i++)
            for (let j = 1; j < vectors.length - 1; j++)
                for (let k = 2; k < vectors.length; k++)
                    delaunyTemp.push(Delaunay.check(vectors[i], vectors[j], vectors[k]));

        delauny = delaunyTemp.filter((d) => d !== false);

        delauny.forEach((d) => d.adjecent());
    }

    static showAll() {

    }
}

function intersect(v1, v2) {
    const x = ((v1.m * v1.x) - (v2.m * v2.x) + v2.y - v1.y) / (v1.m - v2.m);
    return new Vector(x, v1.m * (x - v1.x) + v1.y);
}