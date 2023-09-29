"use strict";

var cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
cam.position.set(0, 0, 1.8);

var scenario = new Scenario();
var render = scenario.getRender();
var canvas = scenario.getCanvas();
var cena = new THREE.Scene();

document.body.appendChild(canvas);
cena.background = new THREE.Color( 0xAACCFF );

var fundo = scenario.configBackgroundImage('background.png', 4.25, 2.1, 0);
cena.add(fundo);

var curva = scenario.configCurve();
var caminho = new THREE.Path(curva.getPoints(300));

for (let p of curva.points) {
    var ponto = scenario.buildPoint(p.x, p.y, p.z);
    cena.add(ponto);
}
let lineGeometry = new THREE.BufferGeometry().setFromPoints(curva.getPoints(300));
let lineMaterial = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
var linha = new THREE.Line(lineGeometry, lineMaterial);
cena.add(linha)

let _ = new THREE.OrbitControls(cam, canvas)

var car = new Car();
var carro = car.build();
cena.add(carro);

var posicao = 0;
var angulo = 0;

var light = scenario.configLighting();
light.position.set(0.5, 0, 5);
cena.add(light);


function desenhar() {
    car.movement();
    
    render.render(cena, cam);
    
    requestAnimationFrame(desenhar);
}
requestAnimationFrame(desenhar);
