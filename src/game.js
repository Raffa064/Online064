function createGameState(width, height) {
    const gameState = {
        width: width,
        height: height,
        players: [],
        fruits: [],
        bestPlayer: null,
        updateBestPlayer: function(player) {
            if (this.bestPlayer === null || player.score > this.bestPlayer.score) {
                console.log('Updated best player: ' + player.nick)
                
                this.bestPlayer = {
                    nick: player.nick,
                    score: player.score,
                    color: player.color
                }
            }
        },
        spawnPlayer: function(socketId, nick) {
            const player = {
                id: socketId,
                nick: nick,
                color: 'hsl(' + parseInt(Math.random() * 360) + ', 82%, 34%, 1)',
                score: 0,
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height)
            }
            
            this.players.push(player)
            return player
        },
        removePlayer: function(player) {
            this.players = this.players.filter(other => other.id !== player.id)
        },
        checkFruitsCollision: function(player, onCollect) {
            //Detect and process fruit collection
            this.fruits.forEach(fruit => {
                if (player.x == fruit.x && player.y == fruit.y) {
                    player.score += 1
                    this.removeFruit(fruit)
                    onCollect()
                }
            })
        },
        spawnFruit: function() {
            const fruit = {
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height)
            }
            this.fruits.push(fruit)

            return fruit
        },
        removeFruit: function(fruit) {
            this.fruits = this.fruits.filter(f => f !== fruit)
        },
        publicState: function() {
            //Returns a public version of the gameState (without functions)
            return {
                width: this.width,
                height: this.height,
                players: this.players,
                fruits: this.fruits,
                bestPlayer: this.bestPlayer
            }
        }
    }

    return gameState
}

module.exports = {
    createGameState
}