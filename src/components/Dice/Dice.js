import React, { useEffect} from 'react';
import Point from './entities/Point';
import Canvas from './Canvas';
import Canvas3D from './Canvas3D';
import Figure from './Figure';
import './Dice.css';


function Dice({buttonOnClick, numbers}){
        const WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, 400),
            DISPLAY: new Point(0, 0, 300)
        };
    
        let dx = 0;
        let dy = 0;
        let gradus = Math.PI / 180;
    
        let canMove = false;
        let canvas, graph3D;
        let len=numbers.length;

    useEffect(()=>{
        canvas = new Canvas({
            WIN: WIN,
            id: "canvas3D",
            width: 400,
            height: 400
        });
        graph3D = new Canvas3D({
            WIN: WIN
        });
        run();
        if(buttonOnClick)
            changeDice(numbers[len-1], numbers[len-2]);
    });
    

    function down(event) {
        canMove = true;
        dx = event.screenX;
        dy = event.screenY;
    }

    function up() {
        canMove = false;
    }

    function move(event) {
        if (canMove) {
            const matrixX = graph3D.matrixOx((dx - event.screenX) * gradus / 2);
            const matrixY = graph3D.matrixOy((dy - event.screenY) * gradus / 2);
            Figure.points.forEach(point => {
                graph3D.transform(matrixY, point);
                graph3D.transform(matrixX, point);
            });
            dx = event.screenX;
            dy = event.screenY;
            run();
        }
    }

    function center(point1, point2) {
        let point = {x: 0, y: 0, z:0};
        point.x = (point1.x+point2.x)/2;
        point.y = (point1.y+point2.y)/2;
        point.z = (point1.z+point2.z)/2;
        return point;
    }

    function twoPoints(point1, point2) {
        let point3 = center(point1, point2);
        let a = [center(point1, point3), center(point3, point2)];
        return a;
    }

    function drawPointsDice(points){
        points.forEach(point =>    
            canvas.point(
                graph3D.xs(point),
                graph3D.ys(point),
                'black',
                10
            )
        );
    }

    function changeDice(num, lastNum){
        Figure.points = [
            new Point(-15, 15, 15),
            new Point(-15, 15, -15),
            new Point(15, 15, 15),
            new Point(15, 15, -15),
            new Point(15, -15, -15),
            new Point(15, -15, 15),
            new Point(-15, -15, -15),
            new Point(-15, -15, 15)
        ];
        if(!lastNum){
            Figure.polygons[5].points = Figure.polygons[num-1].points;
            Figure.polygons[5].distance = Figure.polygons[num-1].distance;
        }
        else {
            Figure.polygons[lastNum-1].points = Figure.polygons[num-1].points;
            Figure.polygons[lastNum-1].distance = Figure.polygons[num-1].distance;
        }
        
        Figure.polygons[num-1].points = [0, 2, 5, 7];
        Figure.polygons[num-1].distance = 390;
        run();
        
    }
    

    function run() {
        canvas.clear();
        //отрисовка граней куба
        const polygons = [];
        graph3D.calcDistance(Figure, WIN.CAMERA, 'distance');
        Figure.polygons.forEach(polygon => {
            polygons.push(polygon);
        });
        graph3D.sortByArtistAlgoritm(polygons);
        polygons.forEach(polygon => {
            //рисовка видимых полигонов
            if (polygon.distance < 400.12498047485116) {
                const points = polygon.points.map(point => {
                    return {
                        x: graph3D.xs(Figure.points[point]),
                        y: graph3D.ys(Figure.points[point])
                    };
                });
                let { r, g, b } = polygon.color;
                canvas.polygon(points, polygon.rgbToHex(r, g, b));
                //рисовка точек на кубе
                switch (polygon.gamePoints) {
                    case 1:
                        drawPointsDice(
                            [center(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])]
                            );
                        break;
                    case 2:
                        drawPointsDice(
                            twoPoints(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])
                            );
                        break;
                    case 3:
                        drawPointsDice(
                            [center(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])]
                            );
                        drawPointsDice(
                            twoPoints(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])
                            );
                        break;
                    case 4:
                        drawPointsDice(
                            twoPoints(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])
                            );
                        drawPointsDice(
                            twoPoints(
                                Figure.points[polygon.points[1]], 
                                Figure.points[polygon.points[3]])
                            );
                        break;
                    case 5:
                        drawPointsDice(
                            [center(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])]
                            );
                        drawPointsDice(
                            twoPoints(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]])
                            );
                        drawPointsDice(
                            twoPoints(
                                Figure.points[polygon.points[1]], 
                                Figure.points[polygon.points[3]])
                            );
                        break;
                    case 6:
                        let a=twoPoints(
                                Figure.points[polygon.points[0]], 
                                Figure.points[polygon.points[2]]);
                        let b=twoPoints(
                                Figure.points[polygon.points[1]], 
                                Figure.points[polygon.points[3]]);
                        drawPointsDice(a);
                        drawPointsDice(b);
                        drawPointsDice(
                            [center(a[1], b[1]), center(a[0], b[0])]
                            );
                        break;
                    default:
                        break;
                  }
            }
        });
    }
 
        return (
        <div className='graph3D'>
            <canvas
                className="canvas"
                id="canvas3D"
                onMouseMove={(event) => move(event)}
                onMouseUp={() => up()}
                onMouseDown={(event) => down(event)}
            >
            </canvas>
        </div>
    );

}
export default Dice;