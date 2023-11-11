import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true // make the controls feel more realistic (intertia)
  controls.dumpingFactor = 10

  // controls.autoRotate = true
  // controls.autoRotateSpeed = 1
  controls.tick = () => controls.update()

  return controls
}

export { createControls }
