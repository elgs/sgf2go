const sgf2go = require('./sgf2go');

const data = `(;FF[4]GM[1]SZ[19];B[aa];W[bb](;B[cc];W[dd];B[ad];W[bd])(;B[hh];W[hg]))`;
// const parsed = sgf2go.sgf2json(data);
// console.log(JSON.stringify(parsed));


const data1 = `(;FF[4]GM[1]SZ[19] ;B[aa] ;W[bb] (;B[cc] ;W[dd] ;B[ad] ;W[bd]) (;B[hh] ;W[hg]))`;
// const parsed1 = sgf2go.sgf2json(data1);
// console.log(JSON.stringify(parsed1));

const data3 = `(;SZ[19]EV[2000Î§¼×ÁªÈüµÚ20ÂÖ]DT[2000-11-16]KM[7.5]US[ÆåÊ¥µÀ³¡]SO[http://weiqi.tom.com]PC[]C[http://weiqi.tom.com
ÆåÊ¥µÀ³¡-->¾«²ÊÊ±¾Ö]BR[]WR[]PB[³£ê»]PW[ÍõÒ¢]RE[B+R]
;B[pd];W[dc];B[dq];W[pp];B[ce];W[dn];B[co];W[do];B[cn];W[dp];B[cp];W[eq];B[dm];W[cq];B[dr];W[bq];B[cr];W[cm];B[cl];W[br];B[er];W[bm];B[bn];W[fq];B[bp];W[bl];B[fo];W[ap];B[ao];W[fr];B[bs];W[ck];B[dl];W[en];B[dk];W[cj];B[dj];W[ci];B[ed];W[ec];B[fd];W[gc];B[di];W[cg];B[dh];W[ch];B[ef];W[fn];B[be];W[bf];B[fc];W[fb];B[eb];W[hb];B[fa];W[gb];B[db];W[kc];B[mc];W[qj];B[go];W[gn];B[ho];W[iq];B[jp];W[ip];B[io];W[jo];B[jn];W[ko];B[kn];W[ln];B[lo];W[kp];B[im];W[lm];B[pq];W[oq];B[or];W[op];B[nr];W[qq];B[pr];W[qr];B[kq];W[lp];B[jq];W[jr];B[kr];W[ir];B[mq];W[mp];B[np];W[no];B[lq];W[nq];B[ms];W[fp];B[gl];W[gs];B[aq];W[js];B[cf];W[cc];B[bg];W[bc];B[bh];W[qc];B[pc];W[qd];B[qe];W[re];B[rf];W[qf];B[pe];W[rd];B[rg];W[pf];B[of];W[pg];B[qi];W[ri];B[qh];W[og];B[pj];W[qk];B[pb];W[oi];B[pi];W[qb];B[pk];W[ql];B[pl];W[sb];B[mk];W[nf];B[ld];W[lk];B[mj];W[lf];B[lj];W[kk];B[kd];W[ik];B[mg];W[mf];B[jj];W[jf];B[jh];W[jk];B[hl];W[ih];B[jg];W[jd];B[qm];W[rm];B[qn];W[rn];B[qo];W[ro];B[qp];W[rp];B[on];W[nn];B[ig];W[ke];B[kb];W[jb];B[lc];W[jc];B[oe];W[mh];B[la];W[ml];B[nl];W[nm];B[rh];W[rj];B[lh];W[lg];B[mi];W[nh];B[ii];W[hj];B[gi];W[gj];B[fi];W[if];B[hf];W[he];B[gf];W[nk];B[nj];W[ol];B[oj];W[ge];B[fe];W[kh];B[li];W[pa];B[oa];W[qa];B[nb];W[il];B[hm];W[fj];B[fl];W[ps];B[os];W[qs];B[ij];W[hk];B[kg];W[es];B[ad];W[ac];B[cb];W[bb];B[ba];W[aa];B[ab];W[km];B[dd];W[aa];B[gd];W[hd];B[ab];W[ds];B[ar];W[aa];B[rb];W[ra];B[ab];W[kj];B[ki];W[aa];B[hq];W[hp];B[gp];W[gq];B[ab];W[hi];B[hh];W[aa];B[hr];W[hs];B[ab]
)
`;

// const parsed3 = sgf2go.sgf2jsonMain(data3);
// console.log(JSON.stringify(parsed3));


const json =[
    [
        [
            {"key":"FF","value":["4"]},
            {"key":"GM","value":["1"]},
            {"key":"SZ","value":["19"]}
        ],
        [
            {"key":"B","value":["aa"]}
        ],
        [
            {"key":"W","value":["bb"]}
        ],
        [
            [
                {"key":"B","value":["cc"]}
            ],
            [
                {"key":"W","value":["dd"]}
            ],
            [
                {"key":"B","value":["ad"]}
            ],
            [
                {"key":"W","value":["bd"]}
            ]
        ],
        [
            [
                {"key":"B","value":["hh"]}
            ],
            [
                {"key":"W","value":["hg"]}
            ]
        ]
    ]
];

const generated = sgf2go.json2sgf(json);
console.log(generated);