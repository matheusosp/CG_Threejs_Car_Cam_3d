class Car {
    contructor() {
    }

    build() {
        let cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        let cubeGeometry = new THREE.BoxGeometry(0.1, 0.2, 0.2);

        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        return cube;
    }

    movement() {
        posicao += 0.001;

        if (posicao > 1.0) {
            posicao = 0.001;
        }

        var ponto = caminho.getPointAt(posicao);
        carro.position.x = ponto.x;
        carro.position.y = ponto.y;

        var angulo = this.getAngulo(posicao);
        carro.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angulo);
    }

    getAngulo(posicao) {
        var tangente = caminho.getTangent(posicao).normalize();
        angulo = -Math.atan(tangente.x / tangente.y);

        return angulo;
    }

}
