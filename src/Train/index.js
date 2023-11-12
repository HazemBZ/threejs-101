import { Group, MathUtils, Mesh } from 'three'
import { createMeshes } from './meshes'

const wheelSpeed = MathUtils.degToRad(90)

class Train extends Group {
  constructor() {
    super()

    this.meshes = createMeshes()

    this.add(...Object.values(this.meshes))
    this.startingPosition = this.position
  }

  time = 0

  tick(delta) {
    // Object.entries(this.meshes).forEach(([key, val]) => {
    //   console.log(key)
    //   if (key.toLowerCase().includes('wheel')) {
    //     val.rotation.y += wheelSpeed * delta
    //   }
    // })
    this.time += delta
    this.meshes.bigWheel.rotation.y += wheelSpeed * delta
    this.meshes.smallWheelRear.rotation.y += wheelSpeed * delta
    this.meshes.smallWheelCenter.rotation.y += wheelSpeed * delta
    this.meshes.smallWheelFront.rotation.y += wheelSpeed * delta

    const x = Math.cos(2 * Math.PI * delta)
    const z = Math.sin(2 * Math.PI * delta)
    // this.rotation.y += (Math.PI / 4) * delta
    this.position.x += this.startingPosition.x * delta * Math.cos(this.time)
    this.position.z += this.startingPosition.z * delta * Math.cos(this.time)

    // this.position.x = this.startingPosition
    console.log(Math.cos((Math.PI / 2) * delta))
  }
}

export default Train
