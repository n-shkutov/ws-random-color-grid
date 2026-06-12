export const getGridSize = (amount: number) => {
    let rows = Math.floor(Math.sqrt(amount));
    while (amount % rows !== 0) rows--;
    return { cols: amount / rows, rows };
};
