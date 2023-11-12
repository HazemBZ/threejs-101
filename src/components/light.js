import { AmbientLight, DirectionalLight, HemisphereLight } from 'three'

// TODO: Test out the other direct light types: PointLight, SpotLight, and RectAreaLight.

function createLights() {
  const mainLight = new DirectionalLight('white', 8) // Takes color and intensity
  const ambientLight = new AmbientLight('white', 2)
  const hem = new HemisphereLight('white', 'darkslategrey', 2) // Combats surface light flatness

  mainLight.position.set(0, 10, 0)
  // light.target.position.set(0, 0, 0)

  hem.position.set(-10, 0, 0)

  return [mainLight, ambientLight, hem]
}

export { createLights }
