import {
  BoxGeometry,
  CircleGeometry,
  ConeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
} from 'three'

// TODO: MeshBasicMaterial and MeshStandardMaterial are not the only materials available. There are a total of eighteen materials in the three.js core, and any material with the word “mesh” in its name will work with our cube mesh. Test some of these out

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2)
  //   const material = new MeshBasicMaterial()
  const spec = {
    color: 'chocolate',
  }
  const material = new MeshStandardMaterial(spec) // Affected ny lighting

  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)

  return cube
}

export { createCube }
;('')
