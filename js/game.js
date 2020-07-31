"use strict"

const WIDTH = 10,
    HEIGHT = 10,
    BOMBS = 20
//document.getElementById("page").innerHTML = "Test"

class Game {
    constructor() {
        const page = document.getElementById("page")
        this.cells = []
        let grid = []
        this.running = true
        for (let i = 0; i < WIDTH * HEIGHT - BOMBS; i++) {
            grid.push("ok")
        }
        for (let i = 0; i < BOMBS; i++) {
            grid.push("bomb")
        }
        for (let i = grid.length - 1; i > 0; i--) {
            let j, h
            j = Math.floor(Math.random() * (i + 1))
            h = grid[i]
            grid[i] = grid[j]
            grid[j] = h
        }
        for (let i = 0; i < WIDTH * HEIGHT; i++) {
            const cell = document.createElement("DIV")
            let bombs
            cell.classList.add(grid[i])
            cell.setAttribute("data-i", i)
            bombs = 0
            if (i % WIDTH > 0) {
                // links
                if (grid[i - 1] === "bomb") { bombs++ }
                // links oben
                if (i > WIDTH && grid[i - WIDTH - 1] === "bomb") { bombs++ }
                // links unten
                if (i <  WIDTH * HEIGHT - WIDTH && grid[i + WiDTH -1] === "bomb") { bombs++ }
            }
            // oben
            if (i > WIDTH -1 && grid[i - WIDTH] === "bomb") { bombs++ }
            // unten
            if (i <  WIDTH * HEIGHT - WIDTH && grid[i + WIDTH] === "bomb") { bombs++ }
            if (i % WIDTH < WIDTH -1) {
                // rechts
                if (grid[i + 1] === "bomb") { bombs++ }
                // rechts oben
                if (i > WIDTH -1 && grid[i - WIDTH + 1] === "bomb") { bombs++ }
                // rechts unten
                if (i <  WIDTH * HEIGHT - WIDTH - 1 && grid[i + WIDTH + 1] === "bomb") { bombs++ }
            }
            cell.setAttribute("data-neighbors", bombs)
            cell.addEventListener("click", e => {
                this.clicked(cell)
            })
            cell.addEventListener("contextmenu", e => {
                e.preventDefault()
                this.toggleFlag(cell)
            })
            this.cells.push(cell)
            page.appendChild(cell)
        }
    }
    clicked(cell) {
        const i = parseInt(cell.getAttribute("data-i"))
        //console.log("run:",this.running,"cell",cell)
        if (!this.running || cell.classList.contains("revealed")) {
            return false
        }
        if (cell.classList.contains("ok")) {
            cell.classList.remove("ok")
            this.reveal(i)
        }
        if (cell.classList.contains("bomb")) {
            cell.classList.add("red")
            cell.innerHTML = "💣"
            alert("Game over")
            this.running = false
        }
    }
    toggleFlag(cell) {
        if (cell.innerHTML === "") {
            cell.innerHTML = "🏴"
        } else {
            cell.innerHTML = ""
        }
    }
    reveal(i) {
        const c = this.cells[i]
        if (c.classList.contains("revealed") || c.classList.contains("bomb")) {
            return false
        }
        c.classList.add("revealed")
        if (!c.classList.contains("bomb")) {
            if (parseInt(c.getAttribute("data-neighbors")) > 0) {
                c.innerHTML = c.getAttribute("data-neighbors")
                return false
            }
        }
        if (i % WIDTH > 0) {
            // links
            this.reveal(i - 1)
            // links oben
            if (i > WIDTH) this.reveal(i - WIDTH - 1)
            // links unten
            if (i < WIDTH * HEIGHT - WIDTH) this.reveal(i + WIDTH - 1)
        }
        // oben
        if (i > WIDTH - 1) this.reveal(i - WIDTH)
        // unten
        if (i < WIDTH * HEIGHT - WIDTH) this.reveal(i + WIDTH)
        if (i % WIDTH < WIDTH - 1) {
            // rechts
            this.reveal(i + 1)
            // rechts oben
            if (i > WIDTH - 1) this.reveal(i - WIDTH + 1)
            // rechts unten
            if (i < WIDTH * HEIGHT - WIDTH - 1) this.reveal(i + WIDTH + 1)
        }
    }
}
