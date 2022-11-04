const sql = require("../db.js");

exports.getValue = (colname, value, req, res) => {

    sql.query("SELECT EXISTS(SELECT * FROM account WHERE ? = ?);",
        [colname, value],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("advertisement : ", res);
        result(null, res);
    });
};
