class Canvas3D {
    constructor({ WIN }) {
        this.WIN = WIN;
    }

    xs(point) {
        return point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }
    ys(point) {
        return point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }

    multMatrix(T, m) {
        const c = [[0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let s = 0;
                for (let k = 0; k < 4; k++) {
                    s += T[i][k] * m[k][j];
                }
                c[i][j] = s;
            }
        }
        return c;
    }

    one() {
        return [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
    }

    matrixZoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]]
    }

    matrixMove(dx, dy, dz) {
        return [
            [1, 0, 0, dx],
            [0, 1, 0, dy],
            [0, 0, 1, dz],
            [0, 0, 0, 1]]
    }

    matrixOx(alpha) {
        return [
            [Math.cos(alpha), 0, -Math.sin(alpha), 0],
            [0, 1, 0, 0],
            [Math.sin(alpha), 0, Math.cos(alpha), 0],
            [0, 0, 0, 1]]
    }

    matrixOy(alpha) {
        return [
            [1, 0, 0, 0],
            [0, Math.cos(alpha), Math.sin(alpha), 0],
            [0, -Math.sin(alpha), Math.cos(alpha), 0],
            [0, 0, 0, 1]]
    }

    matrixOz(alpha) {
        return [
            [Math.cos(alpha), Math.sin(alpha), 0, 0],
            [-Math.sin(alpha), Math.cos(alpha), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]]
    }

    calcDistance(figure, endPoint, name) {
        figure.polygons.forEach(
            (polygon, index) => {
                let x = 0, y = 0, z = 0;
                const points = polygon.points;
                for (let i = 0; i < points.length; i++) {
                    x += figure.points[points[i]].x;
                    y += figure.points[points[i]].y;
                    z += figure.points[points[i]].z;
                }
                x /= points.length;
                y /= points.length;
                z /= points.length;
                polygon.center.x=x;
                polygon.center.y=y;
                polygon.center.z=z;
                figure.polygons[index][name] = Math.sqrt(
                    Math.pow(endPoint.x - x, 2) +
                    Math.pow(endPoint.y - y, 2) +
                    Math.pow(endPoint.z - z, 2));
            });
    }

    sortByArtistAlgoritm(polygons) {
        polygons.sort((a, b) => b.distance - a.distance);
    }

    calcIllumination(distance, lumen) {
        const result = (distance) ? lumen / Math.pow(distance, 3) : 1;
        return (result > 1) ? 1 : result;
    }

    transform(Matrix, point) {
        let array = [0, 0, 0, 0];
        let m = [point.x, point.y, point.z, 1]
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                array[i] += Matrix[i][j] * m[j];
            }
        }
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }

    moveTo(point, endPoint) {
        return [
            [1, 0, 0, point.x - endPoint.x],
            [0, 1, 0, point.y - endPoint.y],
            [0, 0, 1, point.z - endPoint.z],
            [0, 0, 0, 1],
        ]
    }

    calcVector(m1, m2) {
        let m = { x: 0, y: 0, z: 0 }
        m.x = m2.x - m1.x;
        m.y = m2.y - m1.y;
        m.z = m2.z - m1.z;
        return m;
    }

    vectorProd(a, b) {
        const c = { x: 0, y: 0, z: 0 };
        c.x = a.y * b.z - a.z * b.y;
        c.y = a.z * b.x - a.x * b.z;
        c.z = a.x * b.y - a.y * b.x;
        return c;
    }

    calcVectorModule(a) {
        return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    }
}
export default Canvas3D;