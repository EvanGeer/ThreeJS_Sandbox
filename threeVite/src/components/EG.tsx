import * as THREE from "three";
import { useEffect } from "react";
import SceneInit from "../lib/SceneInit";
import { OBJLoader } from "three/examples/jsm/Addons.js";


export function EG() {

  function loadModel(object: any, scene: SceneInit) {
    object.traverse(function (child: THREE.Mesh) {
      const texture = new THREE.MeshStandardMaterial();
      texture.metalness = 0.7;
      texture.roughness = 0.25;
      // texture.met
      if (child.isMesh) child.material = texture;
    });

    console.log(object.rotation);

    object.rotation.set(-Math.PI / 2, 0,0);
    // object.rotation.set(-Math.PI / 3, 0.02, 0.75);
    console.log(object.rotation);

    object.position.x = 0.6;
    object.position.z = 0.45;
    // object.position.y = -0.25;
    object.scale.setScalar(0.01);
    scene.scene?.add(object);

    scene.render();
  }


  useEffect(() => {
    const test = new SceneInit('egScene');
    test.initialize();
    test.animate();

    const manager = new THREE.LoadingManager();
    const loader = new OBJLoader(manager);
    loader.load(
      "EGLogo.obj",
      (object) => loadModel(object, test),
      // onProgress,
      // onError
    );

    // loadModel(object, test)
    // const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    // test.scene?.add(boxMesh);

  }, []);

  return (
    <div>
      <canvas id="egScene" />
    </div>
  )
}