class Voronoi {
    constructor(delaunay) {
        this.d = delaunay;
        this.centroid = this.d.centre;
        this.sortVerticies();
        this.color = this.d.centre.color;
    }

    show() {
        fill(this.centroid.color);
        beginShape();
        this.verticies.forEach((v) => vertex(v.x, v.y));
        endShape(CLOSE);
    }

    sortVerticies() {
        this.verticies = this.d.neighboors.map((d) => d.centre);

        this.verticies.sort((a, b) => (Math.atan2(a.x - this.centroid.x, a.y - this.centroid.y)
            - Math.atan2(b.x - this.centroid.x, b.y - this.centroid.y)));
    }

    static showAll() {
        voronoi.forEach((v) => {
            v.show();
            v.sortVerticies()
        })
    }
}