function control() {
  const turn = "0";
  const winners = ["X", "0"];
  const opposite = winners.find((winner) => winner !== turn);
  const table = [
    null, "X", "0",
    "0", "0", "X",
    "X", "X", "0"
  ];

  /*
    [
      0 1 2
      3 4 5
      6 7 8
    ]
  */

  const tie = check_has_tie(winners, table, opposite);

  console.log(tie);

  const results = check_has_winner(winners, table);

  console.log(results);
}

function check_has_tie(winners, table, opposite) {
  if (table.filter((item) => item === null).length === 1) {
    if (
      check_has_winner(
        winners,
        [...table].map((item) => (item === null ? opposite : item))
      ) === null
    ) {
      return true;
    }
  }
  return false;
}

function check_has_winner(winners, table) {
  for (const winner of winners) {
    for (let x = 0; x < 3; x++) {
      // horizontal
      if (
        table[0 + 3 * x] === winner &&
        table[1 + 3 * x] === winner &&
        table[2 + 3 * x] === winner
      ) {
        return {
          winner,
          type: "horizontal",
          columm: x,
        };
      }
      // vertical
      if (
        table[0 + 1 * x] === winner &&
        table[3 + 1 * x] === winner &&
        table[6 + 1 * x] === winner
      ) {
        return {
          winner,
          type: "vertical",
          row: x,
        };
      }
    }
    // diagonal principal
    if (table[0] === winner && table[4] === winner && table[8] === winner) {
      return {
        winner,
        type: "diagonal-principal",
      };
    }
    // diagonal secondary
    if (table[2] === winner && table[4] === winner && table[6] === winner) {
      return {
        winner,
        type: "diagonal-secondary",
      };
    }
  }
  return null;
}

module.exports = { control };
