const express = require('express');
const body = require('body-parser');

const app = express();
app.use(body.urlencoded({ extended: true }));
app.use(express.static("public"))

app.listen(3000, function () { console.log("Connection Successfully Establiched") });

app.get("/", function (req, res) { res.sendFile(__dirname + "/index.html") })

app.post("/", function (req, res) {
    var user = req.body.dfa;
    user = user.toLowerCase();
    let dfa = 0; // start state
    var length = user.length;

    //definition for start state
    function q0(c) {
        if (c == 'a') {
            dfa = 1;
        }
        else if (c == "b") {
            dfa = 3;
        }
        else {
            dfa = -1;
        }
    }

    //definition for state -1 
    function q1(c) {
        if (c == "a") dfa = 1;
        else if (c == "b") {
            dfa = 2;
        }
        else {
            dfa = -1;
        }
    }

    //definition for state -2
    function q2(c) {
        if (c == "a") { dfa = -1 }
        else if (c == "b") { dfa = 2 }
        else {
            dfa = -1;
        }
    }

    //definition for state -3(TRAP)
    // function q3(c) {
    //     dfa = -1;
    // }
    let array = [];
    let ans = "";
    //logic starts here
    if (length < 2) {
        res.sendFile(__dirname + "/result-no.html");
    }
    else {
        // console.log(user);
        for (var i = 0; i < length; i++) {
            // TESTING PURPOSE -- > console.log(user[i]);
            // I am the world's Dumbest Person Ever....yeas again I proved it
            //sed...life..omg again..sike
            if (dfa == 0) { q0(user.substring(i, i + 1)); array.push("Q0"); }
            else if (dfa == 1) { q1(user.substring(i, i + 1)); array.push("Q1"); }
            else if (dfa == 2) { q2(user.substring(i, i + 1)); array.push("Q2"); }
            else break;
            // TESTING PURPOSE -- > console.log(dfa);
        }
        if (dfa == 2) {
            res.sendFile(__dirname + "/result-yes.html");
        }
        else {
            res.sendFile(__dirname + "/result-no.html");
        }
    }
})

