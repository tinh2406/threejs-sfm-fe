//@ts-ignore
import * as THREE from "../../three.module.js";
//@ts-ignore
import { PLYLoader } from "../../PLYLoader.js";
import { memo, useEffect, useRef, useState } from "react";
//@ts-ignore
import { OrbitControls } from "../../OrbitControls.js";

interface CanvasProps {
  url?: string;
}
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  1,
  3000
);
camera.position.set(10, 0.1, 10);
let cameraTarget = new THREE.Vector3();

new OrbitControls(camera, renderer.domElement);

const loader = new PLYLoader();

const material = new THREE.PointsMaterial({
  size: 0.1,
  vertexColors: true,
});

const Canvas = ({ url }: CanvasProps) => {
  const refContainer = useRef<HTMLDivElement>(null);

  const [_object, setObject] = useState<any[]>();

  useEffect(() => {
    // resize
    refContainer.current?.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate();

    function animate() {
      requestAnimationFrame(animate);

      camera.lookAt(cameraTarget);
      renderer.render(scene, camera);
    }
  }, []);

  useEffect(() => {
    loader.load(url, function (geometry: any) {
      geometry.computeVertexNormals();

      const object = new THREE.Points(geometry, material);

      setObject((prev) => {
        scene.remove(prev);
        scene.add(object);
        return object;
      });
    });
  }, [url]);

  return <div id="container" ref={refContainer}></div>;
};
export default memo(Canvas);
