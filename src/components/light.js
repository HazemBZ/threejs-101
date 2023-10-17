import { DirectionalLight } from 'three'

// TODO: Test out the other direct light types: PointLight, SpotLight, and RectAreaLight.

function createLights() {
  const light = new DirectionalLight('white', 8) // Takes color and intensity

  light.position.set(10, 10, 10)
  light.target.position.set(0, 0, 0)

  return light
}

export { createLights }
