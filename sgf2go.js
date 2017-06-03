class NodeList {
    constructor(parent) {
        this.parent = parent;
        this.children = [];
    }
}

class Node {
    constructor() {
        this.properties = [];
    }
}

const writeSgfTree = (ret, root) => {
    root.map(item => {
        if (Array.isArray(item) && item.length > 0) {
            if (Array.isArray(item[0])) {
                ret.a += '(';
                writeSgfTree(ret, item);
                ret.a += ')';
            } else {
                ret.a += ';';
                item.map(n => {
                    let values = n.value.reduce((acc, v) => {
                        return acc + `[${v}]`;
                    }, '');
                    ret.a += `${n.key}${values}`;
                });
            }
        }
    });
};

const writeJsonTree = (ret, json) => {
    json.map(item => {
        if (item instanceof Node) {
            ret.push(item.properties);
        } else if (item instanceof NodeList) {
            let list = [];
            ret.push(list);
            writeJsonTree(list, item.children);
        }
    });
};

const writeJsonTreeMain = (ret, json) => {
    let index = 0;
    json.map((item) => {
        if (item instanceof Node) {
            ret.push(item.properties);
        } else if (item instanceof NodeList) {
            if (index === 0) {
                writeJsonTreeMain(ret, item.children);
            }
            ++index;
        }
    });
};

const sgf2NodeList = (sgf) => {
    let root = new NodeList();
    let currentPointer = root;
    let buf = '';
    let inSqBracket = false;

    for (let i in sgf) {
        const a = sgf[i];
        if (inSqBracket) {
            if (a === ']' && sgf[i - 1] !== '\\') {
                inSqBracket = false;
                let currentNode = currentPointer.children[currentPointer.children.length - 1];
                if (!(currentNode instanceof Node)) {
                    throw 'currentNode is not instanceof Node';
                } else {
                    currentNode.properties[currentNode.properties.length - 1].value.push(buf);
                }
                buf = '';
            } else {
                buf += a;
            }
        } else {
            if (a === '(') {
                if (buf.length > 0) {
                    currentPointer.children.push(buf);
                    buf = '';
                }
                let newNodeList = new NodeList(currentPointer);
                currentPointer.children.push(newNodeList);
                currentPointer = newNodeList;
            } else if (a === ';') {
                let newNode = new Node();
                currentPointer.children.push(newNode);
            } else if (a === ')') {
                currentPointer = currentPointer.parent;
            } else if (a === '[') {
                inSqBracket = true;
                if (buf.length > 0) {
                    let currentNode = currentPointer.children[currentPointer.children.length - 1];
                    if (!(currentNode instanceof Node)) {
                        throw 'currentNode is not instanceof Node';
                    } else {
                        currentNode.properties.push({key: buf, value: []})
                    }
                    buf = '';
                }
            } else {
                buf += a.trim();
            }
        }
    }
    return root.children;
};

const sgf2json = (sgf) => {
    let ret = [];
    writeJsonTree(ret, sgf2NodeList(sgf));
    return ret;
};

const sgf2jsonMain = (sgf) => {
    let ret = [];
    writeJsonTreeMain(ret, sgf2NodeList(sgf));
    return [ret];
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