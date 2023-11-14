import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { setupModel } from './setupModel'

async function loadBirds() {
  const loader = new GLTFLoader()

  // !!! Don't do this!
  // const parrotData = await loader.loadAsync('/assets/models/Parrot.glb');
  // const flamingoData = await loader.loadAsync('/assets/models/Flamingo.glb');
  // const storkData = await loader.loadAsync('/assets/models/Stork.glb');

  // const parrot = setupModel(parrotData);
  // const flamingo = setupModel(flamingoData);
  // const stork = setupModel(storkData);

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('/assets/models/Parrot.glb'),
    loader.loadAsync('/assets/models/Flamingo.glb'),
    loader.loadAsync('/assets/models/Stork.glb'),
  ])
  console.log(parrotData)

  const parrot = setupModel(parrotData)
  const flamingo = setupModel(flamingoData)
  const stork = setupModel(storkData)

  parrot.position.y = 10
  flamingo.position.y = 8
  stork.position.y = 2

  return { parrot, flamingo, stork }
}

export { loadBirds }
