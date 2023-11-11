import { PerspectiveCamera } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100 // far clipping plane
  )

  // camera.position.set(0, 0, 10)
  camera.position.set(-5, -10, -5) // This updated should be set before controls creation

  camera.tick = delta => {
    // camera.rotation.z += degToRad(90) * delta
  }
  return camera
}

export { createCamera }
