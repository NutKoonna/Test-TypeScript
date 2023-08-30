
interface Board {
    ladders: [number, number][];
    snakes: [number, number][];
}

function quickestPath(board: Board): number[][] {
    const maxPosition: number = 100;
    const paths: number[][] = [];
    const queue: [number, number[]][] = [[1, []]];
    const maxRolls: number = 5;
    // จำนวนครั้งที่น้อยที่สุดในการโยนลูกเต๋าเพื่อที่จะไปถึง 100 คือ 5 ครั้ง ดังนั้นจึงเก็บเฉพาะ path ที่ทอยเต๋า 5 ครั้งแล้วถึง 100 เท่านั้น
    // ไม่สนใจกรณีทอยลูกเต๋าเกิน 100 แล้วต้องเดินกลับ เพราะว่าต้องทอยเต๋ามากกว่า 5 ครั้ง 

    while (queue.length > 0) {
        const [currentPos, currentPath] = queue.shift()!;

        if (currentPath.length === maxRolls && currentPos === maxPosition) {
            paths.push(currentPath); 
        }

        if (currentPath.length >= maxRolls || currentPos >= maxPosition) {
            continue;
        }

        for (let dice = 1; dice <= 6; dice++) {
            const newPosition: number = currentPos + dice;
            const newPath: number[] = [...currentPath, dice]; 

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

            if (newPosition <= maxPosition) {
                queue.push([newPosition, newPath]);
            }
        }
    }

    return paths;
}

const paths: number[][] = quickestPath({
    ladders: [[3, 39], [14, 35], [31, 70], [44, 65], [47, 86], [63, 83], [71, 93]],
    snakes: [[21, 4], [30, 8], [55, 38], [79, 42], [87, 54], [91, 48], [96, 66]]
});

// paths ที่ได้จะเป็นคำตอบทั้งหมดของการโยนเต๋าน้อยครั้งที่สุุดที่เป็นไปได้
console.log(paths); 
