const sampleInput = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"

const file = Deno.readTextFileSync("input", { encoding: "utf8" });

const solution = () => {
    const lines = file.split("\n")
    const games = lines.map(line => {
        return {
            gameId: (line.match(/[0-9]{1,}/i)as string[])[0],
            picks: line.match(/[0-9]{1,} [a-z]{3,5}/g) as string[]
        }
    });
    const gamesByMaxPicks = games.map(game => {
        return {
            gameId: game.gameId,
            maxPick: game.picks.reduce((acc: { [key: string]: number }, curr: string) => {
                const countAndColour = curr.split(" ");
                if (parseInt(countAndColour[0]) > acc[countAndColour[1]]) acc[countAndColour[1]] = parseInt(countAndColour[0])
                return acc;
            }, {blue: 0, green: 0, red: 0})
        }
    });
    const filtered = gamesByMaxPicks.filter(game => game.maxPick.red <= 12 && game.maxPick.blue <= 14 && game.maxPick.green <= 13);
    const sum = filtered.reduce((acc, curr) => acc+parseInt(curr.gameId), 0);
    return sum;
}

console.log(solution())