import Point from './entities/Point';
import Edge from './entities/Edge';
import Polygon from './entities/Polygon';
const figure = {
    points: [
        new Point(-15, 15, 15),
        new Point(-15, 15, -15),
        new Point(15, 15, 15),
        new Point(15, 15, -15),
        new Point(15, -15, -15),
        new Point(15, -15, 15),
        new Point(-15, -15, -15),
        new Point(-15, -15, 15)
    ],
    edges: [
        new Edge(0, 1),
        new Edge(0, 2),
        new Edge(0, 7),
        new Edge(1, 3),
        new Edge(1, 6),
        new Edge(2, 3),
        new Edge(2, 5),
        new Edge(3, 4),
        new Edge(4, 5),
        new Edge(4, 6),
        new Edge(5, 7),
        new Edge(6, 7)
    ],
    polygons: [
        new Polygon([1, 3, 4, 6],
            "#A9A9A9",//серый
            1),
        new Polygon([2, 3, 4, 5],
            "#A9A9A9",//серый
            2),
        new Polygon([0, 2, 3, 1],
            "#A9A9A9",//серый
            3),
        new Polygon([6, 4, 5, 7],
            "#A9A9A9",//серый
            4),
        new Polygon([0, 1, 6, 7],
            "#A9A9A9",//серый
            5),
        new Polygon([0, 2, 5, 7],
            "#A9A9A9",//серый
            6)
    ]
};
export default figure;