class Voronoi {
    /**
     * The Thesian Polygon classes that make up a Voronoi Diagram
     * @param {Vector} centroid The comparison points of areas that define Thesian Polygons
     * @param {[Delaunay]} delaunay The array of Delaunay Classes that help describe the Thesian Polygon
     */
    constructor(centroid, delaunay) {
        this.c = centroid;
        this.d = delaunay;
        // this.sortVerticies();
        this.color = this.c.color;
        this.id = this.c.id;
    }

    show() {
        // fill(this.centroid.color);
        // beginShape();
        // this.verticies.forEach((v) => vertex(v.x, v.y));
        // endShape(CLOSE);

        this.c.show();
    }

    sortVerticies() {
        this.verticies = this.d.neighboors.map((d) => d.centre);

        this.verticies.sort((a, b) => (Math.atan2(a.x - this.centroid.x, a.y - this.centroid.y)
            - Math.atan2(b.x - this.centroid.x, b.y - this.centroid.y)));
    }

    static addVoronoi() {
        switch (arguments.length) {
            case 0:
                voronoi.push(new Voronoi(new Vector(windowWidth * Math.random(), windowHeight * Math.random())));
                break;
            case 1:
                if (!arguments[0] instanceof Vector)
                    return;
                voronoi.push(new Voronoi(arguments[0]));
                break;
            case 2:
                voronoi.push(new Voronoi(new Vector(arguments[0], arguments[1])));
                break;

            default:
                return;
        }
        Delaunay.process();
    }

    static showAll() {
        voronoi.forEach((v) => {
            v.show();
        })
    }
}