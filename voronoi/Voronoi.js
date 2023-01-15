class Voronoi {
    /**
     * The Thesian Polygon classes that make up a Voronoi Diagram
     * @param {Vector} centroid The comparison points of areas that define Thesian Polygons
     */
    constructor(centroid) {
        this.c = centroid;
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

    static current(vector) {
        if (voronoi.length === 0)
            return false;
        let inside = voronoi[0],
            dist = windowWidth * windowHeight,
            temp;

        voronoi.forEach((v) => {
            temp = v.c.distanceTo(vector);
            if (temp < dist) {
                dist = temp;
                inside = v;
            }
        })

        return inside;
    }

    static showAll() {
        voronoi.forEach((v) => {
            v.show();
        })
    }
}