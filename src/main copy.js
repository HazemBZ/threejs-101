import {
  Color,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';


const container = document.querySelector('#scene-container')
const containerWidth = container.clientWidth
const containerHeight = container.clientHeight

const scene = new Scene()

// The sky is blue
scene.background = new Color('skyblue')

const fov = 35 // Field of view
const aspect = containerWidth / containerHeight
const near = 0.1 // The near clipping plane
const far = 100 // The far clipping plane


const camera = new PerspectiveCamera(fov, aspect, near, far)

camera.position.set(0, 0, 10)

// Add stuff to scene

const geometry = new BoxGeometry(2, 2, 2)

// default basic white material 
const material = new MeshBasicMaterial()

const cube = new Mesh(geometry, material)

scene.add(cube)

// Renderer stuff
const renderer = new WebGLRenderer()

// Same size as container
renderer.setSize(containerWidth,containerHeight)


// fSet the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio)

// Renderer to container  (DOM)
container.append(renderer.domElement)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
// animate();

renderer.render( scene, camera )