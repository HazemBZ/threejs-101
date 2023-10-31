import { createCamera } from '../components/camera'
import { createScene } from '../components/scene'
import { createRenderer } from '../systems/renderer'
import { createCube } from '../components/cube'
import Resizer from '../systems/Resizer'
import { createLights } from '../components/light'
import Loop from '../systems/Loop'

import { createControls } from '../systems/controls'

// TODO: Recreate this scene: https://discoverthreejs.com/book/first-steps/physically-based-rendering/#lighting-and-depth

// Makes them private
let camera
let scene
let renderer
let loop

class World {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()

    loop = new Loop(camera, scene, renderer)

    container.append(renderer.domElement)

    const cube = createCube()
    const lights = createLights()

    // Stop rotation
    // loop.updatables.push(cube)

    scene.add(cube, lights)

    const controls = createControls(camera, renderer.domElement)
    controls.target.copy(cube.position)
    controls.enableDamping = true // make the controls feel more realistic (intertia)
    controls.dumpingFactor = 10

    loop.updatables.push(controls)

    const resizer = new Resizer(container, camera, renderer)

    // No longer needed ->  aniamation loop is redrawing
    resizer.onResize = () => {
      this.render()
    }

    document.querySelector('#start').addEventListener('click', () => {
      this.start()
    })

    document.querySelector('#stop').addEventListener('click', () => {
      this.stop()
    })
  }

  render() {
    // draw a single frame
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export default World
