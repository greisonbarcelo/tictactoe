let items = [
    ["x",null,null],
    [null,"x",null],
    [null,null,"x"]
];

console.log(items);
console.table(items);

console.log(items[2][2]);

if (items[0][0] === "x" 
    && items[1][1] === "x"
    && items[2][2] === "x"
) {
    console.log("x wins!");
}