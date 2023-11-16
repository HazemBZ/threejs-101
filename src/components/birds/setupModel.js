import { AnimationClip, AnimationMixer, KeyframeTrack, NumberKeyframeTrack } from 'three'

function setupModel(data) {
  const model = data.scene.children[0]
  // const animation = data.animations[0]
  // const track = animation.tracks[0]

  // const morphKF = new NumberKeyframeTrack(track.name, track.times, track.values)
  // const flyClip = new AnimationClip('fly', -1, [morphKF])
  const flyClip = data.animations[0]

  const mixer = new AnimationMixer(model)
  const flyAction = mixer.clipAction(flyClip)

  flyAction.play()

  model.tick = delta => {
    mixer.update(delta)
  }
  return model
}

export { setupModel }
