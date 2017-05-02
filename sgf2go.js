const fillArray = (arr, id, hash) => {
    hash[id].children.map(item => {
        if (typeof item === "string") {
            arr.push(item);
        } else if (typeof item === "number") {
            let newArr = [];
            arr.push(newArr);
            fillArray(newArr, item, hash);
        }
    });
};

const fillMainStream = (arr, data) => {
    let index = 0;
    data.map(item => {
        if (typeof item === "string") {
            arr.push(item);
        } else if (Array.isArray(item)) {
            if (index === 0) {
                fillMainStream(arr, item);
            }
            ++index;
        }
    });
};

const writeSgfTree = (ret, json) => {
    json.map(item => {
        if (typeof item === "string") {
            ret.a += ';' + item;
        } else if (Array.isArray(item)) {
            ret.a += '(';
            writeSgfTree(ret, item);
            ret.a += ')';
        }
    });
};

class Node {
    constructor(parent) {
        this.parent = parent;
        this.children = [];
    }
}

const sgf2json = (sgf) => {
    let counter = 0;
    let hash = {};
    let current = 0;
    let buf = '';
    let inSqBracket = false;
    hash['0'] = new Node();

    for (let i in sgf) {
        const a = sgf[i];
        if (inSqBracket) {
            if (a === ']' && sgf[i - 1] !== '\\') {
                inSqBracket = false;
            }
            buf += a;
        } else {
            if (a === '(') {
                if (buf.trim().length > 0) {
                    hash[current].children.push(buf.trim());
                    buf = '';
                }
                hash[++counter] = new Node(current);
                hash[current].children.push(counter);
                current = counter;
            } else if (a === ';') {
                if (buf.trim().length > 0) {
                    hash[current].children.push(buf.trim());
                    buf = '';
                }
            } else if (a === ')') {
                if (buf.trim().length > 0) {
                    hash[current].children.push(buf.trim());
                    buf = '';
                }
                current = hash[current].parent;
            } else if (a === '[') {
                inSqBracket = true;
                buf += a;
            } else {
                buf += a;
            }
        }
    }

    // console.log(JSON.stringify(hash, null, 2));

    let root = [];
    fillArray(root, 0, hash);

    return root;
};

const sgf2jsonMain = (sgf) => {
    const parsed = sgf2json(sgf);
    let ret = [];
    fillMainStream(ret, parsed);
    return ret;
};


const json2sgf = (json) => {
    let ret = {a: ''};
    writeSgfTree(ret, json);
    return ret.a;
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    exports.sgf2json = sgf2json;
    exports.sgf2jsonMain = sgf2jsonMain;
    exports.json2sgf = json2sgf;
} else {
    window.sgf2json = sgf2json;
    window.sgf2jsonMain = sgf2jsonMain;
    window.json2sgf = json2sgf;
}