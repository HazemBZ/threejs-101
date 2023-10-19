function setSize(container, camera, renderer) {
  // Set the camera's aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight

  // update the camera's frustum
  camera.updateProjectionMatrix()

  // update the size of the renderer AND the canvas
  renderer.setSize(container.clientWidth, container.clientHeight)
  // renderer.setSize(254, 254)

  // set the pixel ratio (for mobile devices)
  // renderer.setPixelRatio(window.devicePixelRatio) // laptomium: 1.25
  renderer.setPixelRatio(2)
}

class Resizer {
  constructor(container, camera, renderer) {
    setSize(container, camera, renderer)

    window.addEventListener('resize', () => {
      setSize(container, camera, renderer)
      this.onResize()
    })
  }

  onResize() {}
}

export default Resizer

/* 
  devicePixelRatio values other than 1 render the scene at a higher or 
  low resolution and then scale it to fit in the canvas. A DPR of 2 will 
  
  render the scene at double resolution and scale down, while a DPR of 0.5 
  will render at half resolution and scale up. 
*/
