import World from "./World";

function main() {

const container = document.querySelector("#scene-container")

const world = new World(container)


world.render()

}

main()