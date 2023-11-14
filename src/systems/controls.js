import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true // make the controls feel more realistic (intertia)
  controls.dumpingFactor = 10

  // controls.autoRotate = true
  // controls.autoRotateSpeed = 1

  controls.lookTarget = camera.position

  controls.tick = delta => {
    if (!controls.target.equals(controls.lookTarget)) {
      controls.target.x += (controls.lookTarget.x - controls.target.x) * delta * 1.5
      controls.target.y += (controls.lookTarget.y - controls.target.y) * delta * 1.5
      controls.target.z += (controls.lookTarget.z - controls.target.z) * delta * 1.5
    }
    controls.update()
  }

  return controls
}

export { createControls }
