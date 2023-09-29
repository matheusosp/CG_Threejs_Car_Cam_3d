"use strict";

var cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cam.position.set(0, 0, 1.8);

var scenario = new Scenario();
var render = scenario.getRender();
var canvas = scenario.getCanvas();
var scene = new THREE.Scene();

document.body.appendChild(canvas);

scene.background = new THREE.Color( 0xAACCFF );

var fundo = scenario.configBackgroundImage('background.png');
scene.add(fundo);

var curva = scenario.configCurve();

for (let p of curva.points) {
    var ponto = scenario.configPoint(p.x, p.y, p.z);
    scene.add(ponto);
}
let lineGeometry = new THREE.BufferGeometry().setFromPoints(curva.getPoints(300));
let lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var linha = new THREE.Line(lineGeometry, lineMaterial);
scene.add(linha)

let controlsCam = new THREE.OrbitControls(cam, canvas)

var path = new THREE.Path(curva.getPoints(300));
var car = new Car();
var carro = car.configCar();
scene.add(carro);

var posicao = 0;
var angulo = 0;
var light = new THREE.SpotLight(0xffffff, 0.7);
light.position.set(0.6, 0, 6);
scene.add(light);

function desenhar() {
    car.movement();
    
    render.render(scene, cam);
    
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);
