module.exports = function solveSudoku(matrix)
{
var arr = [];
var cs=0;
function Sudoku (mat) {
var sudok = [];
var st = 0;
start(mat);
solve();

function start(mat) {
st = 0;
var suggest = [1, 2, 3, 4, 5, 6, 7, 8, 9];
for ( var i=0; i<9; i++) {
sudok[i] = [];
for ( var j=0; j<9; j++ ) {
if ( mat[i][j] ) {
sudok[i][j] = [mat[i][j], '', []];
}
else {
sudok[i][j] = [0, '0', suggest];
}
}
}
};

function solveSingle(i, j) {
sudok[i][j][2] = mass(sudok[i][j][2], rowContent(i));
sudok[i][j][2] = mass(sudok[i][j][2], colContent(j));
sudok[i][j][2] = mass(sudok[i][j][2], Countent(i, j));
if ( 1 == sudok[i][j][2].length ) {
Sl(i, j, sudok[i][j][2][0]);
return 1;
}
return 0;
};

function solve() {
var count = 0;
do {
count = update();
st++;
if ( 81 < st ) {
break;
}
} while (count);

if ( !issudok() && !isFailed() ) {
backtracking();
}
};
function update() {
var count = 0;
var buf = mass(sudok[1][3][2], rowContent(1));
buf = mass(buf, colContent(3));
buf = mass(buf, Countent(1, 3));
for ( var i=0; i<9; i++) {
for ( var j=0; j<9; j++) {
if ( '0' != sudok[i][j][1] ) {
continue;
}
count += solveSingle(i, j);
count += solveHiddenSingle(i, j);
}
}
return count;
};

function Sl(i, j, solve) {
sudok[i][j][0] = solve;
sudok[i][j][1] = '';
};
function rowContent(i) {
var content = [];
for ( var j=0; j<9; j++ ) {
if ( '0' != sudok[i][j][1] ) {
content[content.length] = sudok[i][j][0];
}
}
return content;
};

function solveHiddenSingle(i, j) {
var n = lessRowSuggest(i, j);
var count = 0;
if ( 1 == n.length ) {
Sl(i, j, n[0]);
count++;
}
var n = lessColSuggest(i, j);
if ( 1 == n.length ) {
Sl(i, j, n[0]);
count++;
}
var n = lessSectSuggest(i, j);
if ( 1 == n.length ) {
Sl(i, j, n[0]);
count++;
}
return count;
};

function Sl(i, j, solve) {
sudok[i][j][0] = solve;
sudok[i][j][1] = '';
};
function rowContent(i) {
var content = [];
for ( var j=0; j<9; j++ ) {
if ( '0' != sudok[i][j][1] ) {
content[content.length] = sudok[i][j][0];
}
}
return content;
};

function colContent(j) {
var content = [];
for ( var i=0; i<9; i++ ) {
if ( '0' != sudok[i][j][1] ) {
content[content.length] = sudok[i][j][0];
}
}
return content;
};

function lessSectSuggest(i, j) {
var n = sudok[i][j][2];
var offset = sectOffset(i, j);
for ( var k=0; k<3; k++ ) {
for ( var l=0; l<3; l++ ) {
if (  '0' != sudok[offset.i+k][offset.j+l][1] ) {
continue;
}
n = mass(n, sudok[offset.i+k][offset.j+l][2]);
}
}
return n;
};

function Countent(i, j) {
var content = [];
var offset = sectOffset(i, j);
for ( var k=0; k<3; k++ ) {
for ( var l=0; l<3; l++ ) {
if ( '0' != sudok[offset.i+k][offset.j+l][1] ) {
content[content.length] = sudok[offset.i+k][offset.j+l][0];
}
}
}
return content;
};

function lessRowSuggest(i, j) {
var n = sudok[i][j][2];
for ( var k=0; k<9; k++ ) {
if ( k == j || '0' != sudok[i][k][1] ) {
continue;
}
n = mass(n, sudok[i][k][2]);
}
return n;
};

function lessColSuggest(i, j) {
var n = sudok[i][j][2];
for ( var k=0; k<9; k++ ) {
if ( k == i || '0' != sudok[k][j][1] ) {
continue;
}
n = mass(n, sudok[k][j][2]);
}
return n;
};

function mass (ar1, ar2) {
var arr_diff = [];
for ( var i=0; i<ar1.length; i++ ) {
var is_found = false;
for ( var j=0; j<ar2.length; j++ ) {
if ( ar1[i] == ar2[j] ) {
is_found = true;

}
}
if ( !is_found ) {
arr_diff[arr_diff.length] = ar1[i];
}
}
return arr_diff;
};

function issudok() {
var is_sudok = true;
for ( var i=0; i<9; i++) {
for ( var j=0; j<9; j++ ) {
if ( '0' == sudok[i][j][1] ) {
is_sudok = false;
}
}
}
return is_sudok;
};

function arrayUnique(ar){
var sorter = {};
for(var i=0,j=ar.length;i<j;i++){
sorter[ar[i]] = ar[i];
}
ar = [];
for(var i=0; i<ar.length;i++){
ar.push(i);
}
return ar;
};

function sectOffset(i, j) {
return {
j: Math.floor(j/3)*3,
i:Math.floor(i/3)*3
};
};

this.issudok = function() {
return issudok();
};
function isFailed() {
var is_failed = false;
for ( var i=0; i<9; i++) {
for ( var j=0; j<9; j++ ) {
if ( '0' == sudok[i][j][1] && !sudok[i][j][2].length ) {
is_failed = true;
}
}
}
};

function backtracking() {
b++;
var mat = [[], [], [], [], [], [], [], [], []];
var i_min=-1, j_min=-1, suggests_cnt=0;
for ( var i=0; i<9; i++ ) {
mat[i].length = 9;
for ( var j=0; j<9; j++ ) {
mat[i][j] = sudok[i][j][0];
if ( '0' == sudok[i][j][1] && ( !suggests_cnt) ) {
suggests_cnt = sudok[i][j][2].length;
i_min = i;
j_min = j;
}
}
}

for ( var k=0; k<suggests_cnt; k++ ) {
mat[i_min][j_min] = sudok[i_min][j_min][2][k];
Sudoku(mat);
if ( issudok() ) {

out_val = issudok();

for ( var i=0; i<9; i++ ) {
for ( var j=0; j<9; j++ ) {
if ( '0' == sudok[i][j][1] ) {
Sl(i, j, out_val[i][j][0])
}
}
}
return;
}
}
};

ss=[];
for ( var i=0; i<9; i++) {
ss[i] = [];}
for ( var i=0; i<9; i++) {
for ( var j=0; j<9; j++ ) {
ss[i][j]= sudok[i][j][0];
arr[cs]=ss;
cs++;
}

}
return(arr);
};
var b = 0;

var mass=Sudoku(matrix);
return(mass[0]);

}

