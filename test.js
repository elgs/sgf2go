const sgf2go = require('./sgf2go');

const data = `(;FF[4]GM[1]SZ[19];B[aa];W[bb];B[cc];W[dd];B[ad];W[bd])`;
// const parsed = sgf2go.sgf2json(data);
// console.log(JSON.stringify(parsed));


const data1 = `(;FF[4]GM[1]SZ[19] ;B[aa] ;W[bb] (;B[cc] ;W[dd] ;B[ad] ;W[bd]) (;B[hh] ;W[hg]))`;
// const parsed1 = sgf2go.sgf2json(data1);
// console.log(JSON.stringify(parsed1));

const data3 = `(;FF[4]GM[1]SZ[19];B[aa];W[];B[mm];W[bb](;B[cc];W[dd];B[ad];W[bd])(;B[hh];W[hg]))`;
const parsed3 = sgf2go.sgf2jsonMain(data3);
console.log(JSON.stringify(parsed3));


const json = [
    [
        {"key": "FF", "value": ["4"]},
        {"key": "GM", "value": ["1"]},
        {"key": "SZ", "value": ["19"]}
    ],
    [
        {"key": "B", "value": ["aa"]}
    ],
    [
        {"key": "W", "value": ["bb"]}
    ],
    [
        {"key": "B", "value": ["cc"]}
    ],
    [
        {"key": "W", "value": ["dd"]}
    ],
    [
        {"key": "B", "value": ["ad"]}
    ],
    [
        {"key": "W", "value": ['']}
    ]
];

const generated = sgf2go.json2sgf(json);
console.log(generated);