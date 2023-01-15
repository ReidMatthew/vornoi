class Voronoi {
    /**
     * The Thesian Polygon classes that make up a Voronoi Diagram
     * @param {Vector} centroid The comparison points of areas that define Thesian Polygons
     * @param {[Delaunay]} delaunay The array of Delaunay Classes that help describe the Thesian Polygon
     */
    constructor(centroid, delaunay) {
        this.c = centroid;
        this.d = delaunay;
        this.vertex = [];
        this.color = this.c.color;
        this.id = this.c.id;
    }

    show() {
        fill(this.c.color);
        beginShape();
        this.vertex.forEach((v) => vertex(v.x, v.y));
        endShape(CLOSE);

        this.c.show();
    }

    sortVerticies() {
        // this.verticies = this.d.neighboors.map((d) => d.centre);
        let ids = this.vertex.map((v) => v.id);
        this.vertex = this.vertex.filter((v, i) => ids.indexOf(v.id) === i);

        this.vertex.sort((a, b) => (Math.atan2(a.x - this.c.x, a.y - this.c.y)
            - Math.atan2(b.x - this.c.x, b.y - this.c.y)));
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

    static process() {
        voronoi.forEach((v) => {
            v.sortVerticies();
        })
    }

    static showAll() {
        voronoi.forEach((v) => {
            v.show();
        })
    }
}