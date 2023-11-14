import { createCamera } from '../components/camera'
import { createScene } from '../components/scene'
import { createRenderer } from '../systems/renderer'
import Resizer from '../systems/Resizer'
import { createLights } from '../components/light'
import Loop from '../systems/Loop'

import { createControls } from '../systems/controls'
import { AxesHelper, GridHelper, Vector3 } from 'three'
import { loadBirds } from '../components/birds'

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
    this.focusTargets = []

    // Helpers
    const size = 40
    const divisions = 40

    const axesHelpers = new AxesHelper(15)
    const gridHelper = new GridHelper(size, divisions)

    loop = new Loop(camera, scene, renderer)

    container.append(renderer.domElement)

    const lights = createLights()
    controls = createControls(camera, renderer.domElement)

    // Stop rotation
    loop.updatables.push(controls, camera)

    // controls

    scene.add(...lights, axesHelpers, gridHelper)

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

  async init() {
    const { parrot, flamingo, stork } = await loadBirds()
    parrot.scale.multiplyScalar(1 / 20)
    flamingo.scale.multiplyScalar(1 / 20)
    stork.scale.multiplyScalar(1 / 20)
    scene.add(parrot, flamingo, stork)
    this.focusTargets = [
      { target: parrot.position, placement: [parrot.position.x + 10, parrot.position.y - 1, parrot.position.z + 5] },
      {
        target: flamingo.position,
        placement: [flamingo.position.x - 10, flamingo.position.y, flamingo.position.z + 12],
      },
      {
        target: stork.position,
        placement: [stork.position.x + 15, stork.position.y, stork.position.z + 15],
      },
    ]
    controls.target.copy(stork.position)
  }

  focusNext() {
    const target = this.focusTargets.pop()
    console.log(target)
    this.focusTargets.unshift(target)

    // camera.position.set(...target.placement)

    camera.moveTarget = new Vector3(...target.placement)
    // controls.target.copy(target.target)
    controls.lookTarget = target.target
  }
}

export default World
