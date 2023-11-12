import { PerspectiveCamera } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    300 // far clipping plane
  )

  camera.position.set(20, 10, 25)
  8 // camera.position.set(-5, 10, -5) // This updated should be set before controls creation

  camera.tick = delta => {
    // camera.rotation.z += degToRad(90) * delta
  }
  return camera
}

export { createCamera }
