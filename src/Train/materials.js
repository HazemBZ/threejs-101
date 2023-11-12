import { MeshStandardMaterial } from 'three'

function createMaterials() {
  const body = new MeshStandardMaterial({
    color: 'firebrick',
    flatShading: true,
  })

  const detail = new MeshStandardMaterial({
    color: 'darkslategrey',
    flatShading: true,
  })

  return { body, detail }
}

export { createMaterials }
