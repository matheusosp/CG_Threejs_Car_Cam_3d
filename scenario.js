class Scenario {

    constructor() {
        this.render = new THREE.WebGLRenderer({
            antialias: true
        });
        this.render.setSize(window.innerWidth, window.innerHeight);
        this.render.setClearColor(0x101010);

        this.render.shadowMap.enabled = true;
        this.render.shadowMap.type = THREE.BasicShadowMap;

        this.canvas = this.render.domElement;

        this.curva = undefined;
    }

    configLighting() {
        var light = new THREE.SpotLight(0xffffff, 0.7);
        light.castShadow = true;
        light.target.position.set(carro.position.x, carro.position.y, 0);
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 10;
        light.target = carro;
        light.angle = 0.1;
        return light;
    }

    configBackgroundImage(imgPath) {
        let loader = new THREE.TextureLoader();
        let floorTexture = loader.load( imgPath );
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 

        let floorGeometry = new THREE.PlaneGeometry(4.25, 2.1);
        let floorMaterial = new THREE.MeshBasicMaterial({
          map: floorTexture,
          side: THREE.DoubleSide,
        });
        let floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = Math.PI ;
        return floor;
    }

    configCurve() {
        return new THREE.SplineCurve([
            new THREE.Vector3(-1.4, 0.78, 0),
            new THREE.Vector3(-0.8, 0.9, 0),
            new THREE.Vector3(-0.4, 0.75, 0),
            new THREE.Vector3(-0.2, 0.95, 0),
            new THREE.Vector3(0.2, 0.75, 0),
            new THREE.Vector3(0.6, 0.95, 0),
            new THREE.Vector3(1, 0.75, 0),
            new THREE.Vector3(1.3, 0.95, 0),
            new THREE.Vector3(1.5, 0.5, 0),
            new THREE.Vector3(1.75, 0.25, 0),
            new THREE.Vector3(1.5, 0, 0),
            new THREE.Vector3(1.75, -0.25, 0),
            new THREE.Vector3(1.5, -0.55, 0),
            new THREE.Vector3(1.75, -0.9, 0),
            new THREE.Vector3(1.3, -0.75, 0),
            new THREE.Vector3(1, -0.9, 0),
            new THREE.Vector3(-0.1, -0.9, 0),
            new THREE.Vector3(-0.8, -0.87, 0),
            new THREE.Vector3(-1.4, -0.7, 0),
            new THREE.Vector3(-1.8, 0, 0),
            new THREE.Vector3(-1.8, 0.6, 0)
        ]);
    }

    buildPoint(x, y, z) {
        let materialPonto = new THREE.PointsMaterial({
            size: 10,
            sizeAttenuation: false
        });
        let pointGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x, y, z)]);
        return new THREE.Points(pointGeometry, materialPonto);
    }

    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }
        
}