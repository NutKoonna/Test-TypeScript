interface Board {
    ladders: [number, number][];
    snakes: [number, number][];
}

function quickestPath(board: Board): number[] {
    const maxPosition: number = 100;
    const visited: Set<number> = new Set();
    const queue: [number, number[]][] = [[1, []]]; // [position, path]

    while (queue.length > 0) {
        const [currentPos, currentPath] = queue.shift()!;

        if (currentPos === maxPosition) {
            return currentPath;
        }

        if (!visited.has(currentPos)) {
            visited.add(currentPos);
    
            for (let dice = 1; dice <= 6; dice++) {
                const newPosition: number = currentPos + dice;
                const newPath: number[] = [...currentPath, dice];
                let isOnLadderOrSnake: boolean = false;

                // Check if newPosition is on a ladder or snake
                for (const [start, end] of board.ladders) {
                    if (start === newPosition) {
                        queue.push([end, newPath]);
                        isOnLadderOrSnake = true;
                        break;
                    }
                }

                for (const [start, end] of board.snakes) {
                    if (start === newPosition) {
                        queue.push([end, newPath]);
                        isOnLadderOrSnake = true;
                        break;
                    }
                }

                if (!isOnLadderOrSnake) {
                    // If newPosition is greater than 100, go back
                    if (newPosition > maxPosition) {
                        const correctedPosition: number = (2 * maxPosition) - newPosition;
                        queue.push([correctedPosition, newPath]);
                    } else {
                        queue.push([newPosition, newPath]);
                    }
                }
            }
        }
    }
    return [];
}

const result: number[] = quickestPath({
    ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
    snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
});

console.log(result); 
