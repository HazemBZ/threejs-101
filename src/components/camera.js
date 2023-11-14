import { PerspectiveCamera } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(
    35, // fov
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    400 // far clipping plane
  )

  camera.position.set(20, 10, 25)
  // camera.position.set(-5, 10, -5) // This updated should be set before controls creation

  camera.moveTarget = camera.position
  camera.tick = delta => {
    // camera.rotation.z += degToRad(90) * delta
    if (!camera.position.equals(camera.moveTarget)) {
      camera.position.x += (camera.moveTarget.x - camera.position.x) * delta * 1.5
      camera.position.y += (camera.moveTarget.y - camera.position.y) * delta * 1.5
      camera.position.z += (camera.moveTarget.z - camera.position.z) * delta * 1.5
    }
  }
  return camera
}

export { createCamera }
