const sql = require("../db.js");

// constructor
const Adcontrol = function(advertisements) {
    this.email = advertisements.email;
    this.accountid = advertisements.accountid;
    this.adid = advertisements.adid;
    this.name = advertisements.name;
    this.lastname = advertisements.lastname;
    this.content = advertisements.content;
    this.status = advertisements.status;

};

Adcontrol.getApplys =  result => {
    let query = "SELECT email, accountid, adid, name, lastname, content FROM adcontrol;";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("advertisement : ", res);
        result(null, res);
    });
};
Adcontrol.getApplysOfCompany = (id, result) =>{
    sql.query(`SELECT * from adcontrol WHERE adid = ${id} `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("found tutorial: ", res);
        result(null, res);



    });
}
Adcontrol.getApply = (id, result) => {
    sql.query(`SELECT email, accountid, adid, name, lastname, content FROM adcontrol WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Adcontrol.create = (adcontrol, result) => {
    sql.query("INSERT INTO adcontrol SET ?", adcontrol, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created tutorial: ", { id: res.insertId, ...adcontrol });
        result(null, { id: res.insertId, ...adcontrol });
    });
};


Adcontrol.updateStatus = (id, adcontrol, result) => {
    sql.query(
        "UPDATE adcontrol SET status = ? WHERE id = ?",
        [ adcontrol.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("updated tutorial: ", { id: id, ...advertisement });
            result(null, { id: id, ...advertisement });
        }
    );
};

Adcontrol.remove = (id, result) => {
    sql.query("DELETE FROM adcontrol WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            // not found Tutorial with the id
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("deleted tutorial with id: ", id);
        result(null, res);
    });
};

Adcontrol.removeAll = result => {
    sql.query("DELETE FROM adcontrol", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = Adcontrol;