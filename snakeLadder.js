"use strict";
function quickestPath(board) {
    const maxPosition = 100;
    const paths = [];
    const queue = [[1, []]]; // [position, path]
    const maxRolls = 5;
    while (queue.length > 0) {
        const [currentPos, currentPath] = queue.shift();
        // Check if the current path length equals maxRolls and if the current position is 100
        if (currentPath.length === maxRolls && currentPos === maxPosition) {
            paths.push(currentPath); // Store the valid path
        }
        // If the path length is equal or exceeds maxRolls or the position exceeds 100, skip further exploration
        if (currentPath.length >= maxRolls || currentPos >= maxPosition) {
            continue;
        }
        // Iterate through all possible dice rolls (1 to 6)
        for (let dice = 1; dice <= 6; dice++) {
            const newPosition = currentPos + dice;
            const newPath = [...currentPath, dice]; // Create a new path by appending the dice roll
            // Check if the new position is on a ladder or snake
            for (const [start, end] of board.ladders) {
                if (start === newPosition) {
                    queue.push([end, newPath]);
                    break;
                }
            }
            for (const [start, end] of board.snakes) {
                if (start === newPosition) {
                    queue.push([end, newPath]);
                    break;
                }
            }
            // If the new position is within the game board, add it to the queue for further exploration
            if (newPosition <= maxPosition) {
                queue.push([newPosition, newPath]);
            }
        }
    }
    return paths; // Return all valid paths found
}
// Example usage to find all paths with 5 rolls
const paths = quickestPath({
    ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
    snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
});
console.log(paths);
