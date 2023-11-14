import World from './World'

async function main() {
  const container = document.querySelector('#scene-container')

  const world = new World(container)

  // world.render()

  await world.init()

  document.querySelector('#next').addEventListener('click', () => world.focusNext())

  world.start()
}

main().catch(err => {
  console.error(err)
})
