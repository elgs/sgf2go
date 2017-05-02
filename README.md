sgf2go
============
An [SGF File Format FF[4]](http://www.red-bean.com/sgf/) compliant SGF file parser and generator.

## Installation

`npm install sgf2go`

## Introduction

I used to use a regular expression to extract what I needed from an `sgf` file, specifically this one: 
```regexp
/;[BW]\[\w{2}]|A[BWE](\[(\w|:)+]|\s)+|PL\[[BW]]/gi
``` 
until I found myself naïve when dealing with an `sgf` file with 
variations. most of, if not all, the time, I don't care about the variations. However, my regular expression could not
differentiate which node belongs to the main stream, and which belongs to a variation. This library serves the purpose
of solving this problem..

Essentially, an `sgf` file contains lists of lists of nodes. A list is enclosed in a pair of curly brackets, while a
node starts with a semi-colon `;`.

With `sgf2go`, an `sgf` file with no variations: will be converted to the following `json` format:

`sgf`:
```sgf
(;FF[4]GM[1]SZ[19];B[aa];W[bb];B[cc];W[dd];B[ad];W[bd])
```
`json`:
```json
[
  [
    "FF[4]GM[1]SZ[19]",
    "B[aa]",
    "W[bb]",
    "B[cc]",
    "W[dd]",
    "B[ad]",
    "W[bd]"
  ]
]
```

One with variation will yield the following result:

`sgf`:
```sgf
(;FF[4]GM[1]SZ[19];B[aa];W[bb](;B[cc];W[dd];B[ad];W[bd])
(;B[hh];W[hg]))
```
`json`:
```json
[
  [
    "FF[4]GM[1]SZ[19]",
    "B[aa]",
    "W[bb]",
    [
      "B[cc]",
      "W[dd]",
      "B[ad]",
      "W[bd]"
    ],
    [
      "B[hh]",
      "W[hg]"
    ]
  ]
]
```

 
`sgf2go` makes the `sgf` files easier to work with by transforming a `sgf` format file into `json`.

## Usage

### With Nodejs
```javascript
const sgf2go = require('sgf2go');
```

### With browser
```html
<script src="path/to/sgf2go.js" />
```

### Parse an `sgf` file into `json`:
```javascript
const sgf = `(;FF[4]GM[1]SZ[19];B[aa];W[bb](;B[cc];W[dd];B[ad];W[bd])(;B[hh];W[hg]))`;
const parsed = sgf2go.sgf2json(sgf);
// in browser, const parsed = sgf2json(sgf);
console.log(parsed);
```

The output will be:
```javascript
[ 
  [ 
    'FF[4]GM[1]SZ[19]',
    'B[aa]',
    'W[bb]',
    ['B[cc]', 'W[dd]', 'B[ad]', 'W[bd]'],
    ['B[hh]', 'W[hg]'] 
  ] 
]
```

### Parse an `sgf` file into `json`, but only get the main stream, ignoring any variations:
```javascript
const sgf = `(;FF[4]GM[1]SZ[19];B[aa];W[bb](;B[cc];W[dd];B[ad];W[bd])(;B[hh];W[hg]))`;
const parsed = sgf2go.sgf2jsonMain(sgf);
// in browser, const parsed = sgf2jsonMain(sgf);
console.log(parsed);
```

The output will be:
```javascript
[ 
  'FF[4]GM[1]SZ[19]',
  'B[aa]',
  'W[bb]',
  'B[cc]',
  'W[dd]',
  'B[ad]',
  'W[bd]' 
]
```

## Generate `sgf` from `json`:
```javascript
const json = [
    [
        'FF[4]GM[1]SZ[19]',
        'B[aa]',
        'W[bb]',
        ['B[cc]', 'W[dd]', 'B[ad]', 'W[bd]'],
        ['B[hh]', 'W[hg]']
    ]
];
const generated = json2sgf(json);
console.log(generated);
```

The output will be:
```sgf
(;FF[4]GM[1]SZ[19];B[aa];W[bb](;B[cc];W[dd];B[ad];W[bd])(;B[hh];W[hg]))
```

Hope it helps.