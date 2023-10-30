import {
  BoxGeometry,
  CircleGeometry,
  ConeGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  TextureLoader,
} from 'three'

function createMaterial() {
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load('/assets/textures/grass.png')
  texture.center.set(1, 1)

  const spec = {
    color: 'chocolate',
    map: texture, // color map
    // bumpMap: texture,
    // roughnessMap: texture,
    // alphaMap: texture,
    // transparent: true,
  }

  const material = new MeshStandardMaterial(spec) // Affected ny lighting
  console.info(texture)
  return material
}

// TODO: MeshBasicMaterial and MeshStandardMaterial are not the only materials available. There are a total of eighteen materials in the three.js core, and any material with the word “mesh” in its name will work with our cube mesh. Test some of these out

function createCube() {
  const geometry = new BoxGeometry(2, 2, 2)
  //   const material = new MeshBasicMaterial()

  const material = createMaterial()

  const cube = new Mesh(geometry, material)

  cube.rotation.set(-0.5, -0.1, 0.8)
  const radiansPerSecond = MathUtils.degToRad(60)
  cube.direction = 1
  cube.rotDirection = 1

  // Monkey patching
  cube.tick = delta => {
    const radiansPerFrame = radiansPerSecond * delta

    cube.rotation.x += radiansPerFrame * cube.rotDirection // 1 rad === 0.5 deg --> 60×0.5=30 deg/sec
    // cube.rotation.y += radiansPerFrame
    // cube.rotation.z += radiansPerFrame

    cube.position.x += 1 * delta * cube.direction

    console.log(document.body.clientHeight)

    console.log(cube.rotation.x)
    if (MathUtils.degToRad(180) < cube.rotation.x) cube.rotDirection = -1
    if (MathUtils.degToRad(0) > cube.rotation.x) cube.rotDirection = 1

    if (cube.position.x >= 5) cube.direction = -1
    if (cube.position.x <= -5) cube.direction = 1
  }

  return cube
}

export { createCube }
