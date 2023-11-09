import { createCamera } from '../components/camera'
import { createScene } from '../components/scene'
import { createRenderer } from '../systems/renderer'
import { createCube } from '../components/cube'
import Resizer from '../systems/Resizer'
import { createLights } from '../components/light'
import Loop from '../systems/Loop'

import { createControls } from '../systems/controls'
import { AmbientLight, HemisphereLight } from 'three'

// TODO: Recreate this scene: https://discoverthreejs.com/book/first-steps/physically-based-rendering/#lighting-and-depth

// Makes them private
let camera
let scene
let renderer
let loop
let controls

class World {
  constructor(container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()

    loop = new Loop(camera, scene, renderer)

    container.append(renderer.domElement)

    const cube = createCube(this.render)
    const lights = createLights()

    controls = createControls(camera, renderer.domElement)
    camera.position.set(1, 0, -10) // This updated should be set before controls creation

    // Stop rotation
    loop.updatables.push(controls)

    scene.add(cube, ...lights)

    controls.addEventListener('change', () => {
      this.render()
    })

    // camera.position.set(0, 0, 0) //
    controls.target.copy(cube.position)
    controls.enableDamping = true // make the controls feel more realistic (intertia)
    controls.dumpingFactor = 10

    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    controls.listenToKeyEvents(window)

    // Deprecated
    // loop.updatables.push(controls)

    // camera.rotation.set(-10, -2, -2) // always ppoints to target (so only seems not working)
    // camera.position.set(-1, 0, -10)

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
