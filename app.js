document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //first div in our grid 
    let appleIndex = 0 //first div in our grid 
    let currentSnake = [2, 1, 0] //the div in our grid being 2 for the 'head', and 0 being the end or 'tail', 1's will be the body.
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //to start, and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2, 1, 0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime);
    }


    //function that deals with all the outcomes of the snake 
    function moveOutcomes() {

        //deals with snake hitting the border and snake hitting self 
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
        ) {
            return clearInterval(interval) //this will clear the interval if any of the above happens 
        }

        const tail = currentSnake.pop() //removes last item of the array and shows it
        squares[tail].classList.remove('snake') //removes class of snake from the tail
        currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of array


        //deas with snake getting apple 
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail) //adds 1 square to the length of the snake when it eats an apple
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentSnake[0]].classList.add('snake')
    }

    //generate a new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake')) //apple does not appear in same square as snake body
        squares[appleIndex].classList.add('apple')
    }


    //assign functions to keycodes
    function control(e) {
        squares[currentIndex].classList.remove('snake') //removes the class of snake from all the squares.

        if (e.keyCode === 39) {
            direction = 1 //if the right arrow key is pressed on the keyboard, the snakes goes right by 1. 
        } else if (e.keyCode === 38) {
            direction = -width; //if the up arrow on the keyboard is pressed, the snake will go back 10 divs, appearing to go up.
        } else if (e.keyCode === 37) {
            direction = -1 //if the left arrow key is pressed, the snake will go left 1 div.
        } else if (e.keyCode === 40) {
            direction = +width //if the down aarow key is pressed, the snake will instantly appear in the div 10 divs from current position.
        }
    }

    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})