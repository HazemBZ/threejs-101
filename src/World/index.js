import { createCamera } from '../components/camera'
import { createScene } from '../components/scene'
import { createRenderer } from '../systems/renderer'
import { createCube } from '../components/cube'
import Resizer from '../systems/Resizer'
import { createLights } from '../components/light'

// TODO: Recreate this scene: https://discoverthreejs.com/book/first-steps/physically-based-rendering/#lighting-and-depth

// Makes them private
let camera
let scene
let renderer

class World {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    container.append(renderer.domElement)
    const cube = createCube()
    const lights = createLights()

    scene.add(cube, lights)

    const resizer = new Resizer(container, camera, renderer)
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera)
  }
}

export default World
