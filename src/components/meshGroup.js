import { Group, MathUtils, Mesh, MeshStandardMaterial, SphereGeometry } from 'three'

function animateGroup(group) {
  const radiansPerSecond = MathUtils.degToRad(30)
  const direction = 1

  group.tick = delta => {
    const radiansPerFrame = radiansPerSecond * delta
    group.rotation.z += radiansPerFrame * direction
  }
}

function createMeshGroup() {
  const group = new Group()
  const geometry = new SphereGeometry(
    0.25, // readius
    19, // widthSegments
    19 // heightSegments
  )

  const material = new MeshStandardMaterial({
    color: 'indigo',
  })

  const protoSphere = new Mesh(geometry, material)

  group.add(protoSphere)
  const step = 1 / 200
  const MULTIPLIER = 2 // 2 --> sphere, 1 --> half --> -1 -->  half inverse direction

  for (let i = 0; i < 1; i += step) {
    const sphereClone = protoSphere.clone()

    //
    const x = Math.cos(Math.PI * MULTIPLIER * i)
    const y = Math.sin(Math.PI * MULTIPLIER * i)
    const z = -i * 4

    sphereClone.position.set(x, y, z)

    sphereClone.scale.multiplyScalar(0.05 + i)
    group.add(sphereClone)
  }

  // group.scale.multiplyScalar(0.5)

  animateGroup(group)

  return group
}

export { createMeshGroup }
