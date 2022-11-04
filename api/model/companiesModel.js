const sql = require("../db.js");

// constructor
const Companie = function(companie) {
    this.name = companie.name;
    this.description = companie.description;
};

Companie.getCompanies =  result => {
    let query = "SELECT * FROM companies;";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Companie : ", res);
        result(null, res);
    });
};

Companie.getAllPeople =  (id,result) => {
    let query = `SELECT * FROM account where companies = ${id} ORDER BY role DESC`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Companie : ", res);
        result(null, res);
    });
};
Companie.getAllAdv =  (id,result) => {
    let query = `SELECT * FROM advertisements where companiesid = ${id}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Companie : ", res);
        result(null, res);
    });
};

Companie.getCompanie = (id, result) => {
    sql.query(`SELECT * FROM companies WHERE  id = ${id}`, (err, res) => {
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

Companie.create = (companie, result) => {
    sql.query("INSERT INTO companies SET ?", companie, (err, res) => {
        console.log(err);
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created companies: ", { id: res.insertId, ...companie });
        result(null, { id: res.insertId, ...companie });
    });
};


Companie.updateById = (id, companie, result) => {
    sql.query(
        "UPDATE companies SET name = ?, description = ? WHERE id = ?",
        [companie.title, companie.description, id],
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
            console.log("updated tutorial: ", { id: id, ...companie });
            result(null, { id: id, ...companie });
        }
    );
};

Companie.remove = (id, result) => {
    sql.query("DELETE FROM companies WHERE id = ?", id, (err, res) => {
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

Companie.removeAll = result => {
    sql.query("DELETE FROM companies", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = Companie;