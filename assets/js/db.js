var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024)

function createTable() {
    db.transaction(function (tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS PLAYERS (id , player TEXT, result INTEGER, start_time, end_time)')
    })
}

function encrypt(value) {
    var result = "";
    for (i = 0; i < value.length; i++) {
        if (i < value.length - 1) {
            result += value.charCodeAt(i) + 10;
            result += "-";
        } else {
            result += value.charCodeAt(i) + 10;
        }
    }
    return result;
}

const shuffle = (ar) => {
    return ar.sort((a, b) => 0.5 - Math.random());
}

function decrypt(value) {
    var result = "";
    var array = value.split("-");

    for (i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i] - 10);
    }
    return result;
}

createTable()

const add = {
    user: {
        name: NewUserName,
        result: newUserResult,
    }
}

const get = {
    get_all: getAll
}

function NewUserName(id, name) {
    db.transaction(function (tx) {
        tx.executeSql(`INSERT INTO PLAYERS (id,player, start_time) VALUES('${id}', '${name}', '${new Date()}')`)
    })
}

function newUserResult(player, result) {
    db.transaction(function (tx) {
        tx.executeSql(`INSERT INTO PLAYERS (player, result, end_time) VALUES ('${player}', ${result}, '${new Date()}')`)
    })
}

function getAll() {
    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM PLAYERS`, [], function (tx, results) {
            console.log(results);
            res = results;
        })
    });
}