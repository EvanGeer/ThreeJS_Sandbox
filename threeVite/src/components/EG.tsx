import { useEffect, useMemo, useRef, useState } from "react";
import { useLoader, Canvas, useFrame } from "@react-three/fiber";
import { Euler, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { Modal } from "react-bootstrap";

function Scene({
  objFile,
  rotation,
}: {
  objFile: string;
  rotation: [number, number, number];
}) {
  const [scale, setScale] = useState(1);
  const [hovered, setHover] = useState(false);
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    setRotated(false);
  }, [rotation]);

  const obj = useMemo(() => getEgLogo(), []);
  obj.scale.set(scale * 0.1, scale * 0.1, scale * 0.1);

  function getEgLogo() {
    const obj = useLoader(OBJLoader, objFile);
    obj.rotation.set(rotation[0], rotation[1], rotation[2]);
    // if (!rotated) obj.rotateX(rotation);
    // setRotated(true);

    return obj;
  }

  useEffect(() => {
    obj.traverse(function (child: Mesh) {
      const texture = new MeshStandardMaterial();
      texture.metalness = 0.7;
      texture.roughness = 0.25;
      // texture.color.set("#00FF00");
      texture.opacity = 0;
      // texture.wireframe = true;
      texture.color.set(hovered ? "orange" : undefined);
      // texture.met
      if (child.isMesh) {
        child.material = texture;
      }
    });
  }, [hovered]);

  return (
    <mesh
      onClick={() => setScale(scale === 1 ? 2 : 1)}
      onPointerOver={() => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <primitive object={obj} />
      {/* <meshStandardMaterial color={"red"} /> */}
    </mesh>
  );
}

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(
    (state, delta) =>
      meshRef.current?.rotation?.x && (meshRef.current.rotation.x += delta)
  );
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <cylinderGeometry />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
function Timeline(props: any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(
    (state, delta) =>
      meshRef.current?.rotation?.x && (meshRef.current.rotation.x += delta)
  );
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={[0.01, 10, 0.01]}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      rotation={[0, 0, Math.PI / 2]}
    >
      <cylinderGeometry />
      <meshStandardMaterial color={hovered ? "orange" : "gray"} />
    </mesh>
  );
}

export const EG = () => {
  // const [cameraPos, setCameraPos] = useState(new Vector3(-5, 5, 7));
  // console.log("rendering", cameraPos);

  return (
    <>
      <Modal show={false}>
        <Modal.Title>TEST</Modal.Title>
      </Modal>
      <div
        style={{
          overflow: "none",
          width: "100vw",
          height: "100vh",
          margin: "auto",
        }}
        className="bg-dark"
      >
        <Canvas
          // onCreated={(state) => {
          //   state.camera.position.set(-7, 11, 10);
          //   // state.camera.lookAt(0,-10,-100);
          // }}
        >
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <PerspectiveCamera position={[-7, 11, 10]} makeDefault />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <Center>
            <Scene objFile="../EGLogo.obj" rotation={[-Math.PI / 2, 0, 0]} />
            <Scene
              objFile="../ProjectPiping.obj"
              rotation={[-Math.PI / 2, 0, 0]}
            />
          </Center>
          {/* <Timeline position={[0, -1, 3]} /> */}
          <OrbitControls onEnd={(e) => console.log(e)} />
        </Canvas>
      </div>
    </>
  );
};
