import { WebGL1Renderer } from 'three'

function createRenderer() {
  // const renderer = new WebGL1Renderer({ antialias: true })
  const renderer = new WebGL1Renderer()

  renderer.physicallyCorrectLights = true

  return renderer
}

export { createRenderer }

// Later, we’ll tune some settings on the renderer to improve the quality of our renderings, but for now, a basic renderer with default settings is just fine.
