import { Clock } from 'three'

const clock = new Clock()

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer

    this.updatables = []
  }

  start() {
    // Calling this makes app render at 60 frames per second (if it manages to)
    this.renderer.setAnimationLoop(() => {
      this.tick()

      this.renderer.render(this.scene, this.camera)
    })
  }
  stop() {
    // Stops the animation loop
    this.renderer.setAnimationLoop(null)
  }

  // Updates the aimation
  tick() {
    // How much time has passed since the last time it was called
    const delta = clock.getDelta()

    for (const object of this.updatables) {
      object.tick(delta)
    }
  }
}

export default Loop
