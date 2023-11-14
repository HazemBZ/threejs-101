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

    // Helpers
    const size = 40
    const divisions = 40

    const axesHelpers = new AxesHelper(15)
    const gridHelper = new GridHelper(size, divisions)

    const train = new Train()
    let trains = [train]

    const step = 1 / 10

    for (let i = 0; i < 1; i += step) {
      const trainCopy = train.clone()

      const x = Math.cos(2 * Math.PI * i)
      const z = Math.sin(2 * Math.PI * i)
      console.log(x)
      // trainCopy.rotation.x = x
      console.log('---', i, '---')
      console.log('bef:', trainCopy.rotation.y)
      // trainCopy.rotation.y = -degToRad(360 * i) // look back
      // trainCopy.rotation.y = -degToRad(360 * i + 180) // away
      trainCopy.rotation.y = -degToRad(360 * i + 90) // perfect circle
      console.log('aft:', trainCopy.rotation.y)
      console.log('trainCopy.rotation.y ', trainCopy.rotation.y)
      // trainCopy.rotation.y =
      trainCopy.position.x = x * 10
      trainCopy.position.z = z * 10
      // trainCopy.add()
      trains.push(trainCopy)
    }
    const trainsGroup = new Group()
    trainsGroup.add(...trains)

    trainsGroup.tick = delta => {
      trainsGroup.rotation.y += (delta * Math.PI) / 4
    }

    loop = new Loop(camera, scene, renderer)

    container.append(renderer.domElement)

    const lights = createLights()
    controls = createControls(camera, renderer.domElement)

    // Stop rotation
    loop.updatables.push(controls, trainsGroup, ...trains)

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
    controls.target.copy(stork.position)
  }

}

export default World
