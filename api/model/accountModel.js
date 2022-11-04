const sql = require("../db.js");

// constructor
const Account = function(account) {
    this.name = account.name;
    this.lastname = account.lastname;
    this.email = account.email;
    this.password = account.password;
    this.role = account.role;
    this.phone = account.phone;
    this.city = account.city;
    this.wishpost = account.wishpost;
    this.companies = account.companies || null;

};

Account.getAccounts =  result => {
    let query = "SELECT * FROM account;";
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
Account.getAccountbyID = (id, result) => {
    sql.query(`SELECT * FROM account WHERE id = ${id}`, (err, res) => {
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
        result({ kind: "not_found" }, null);
    });
};

Account.getAccountbyemail = (email, result) => {
    sql.query(`SELECT * FROM account WHERE email = '${email}'`, (err, res) => {
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
        result({ kind: "not_found" }, null);
    });
};

Account.create = (account, result) => {
    sql.query("INSERT INTO account SET ?", account, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created tutorial: ", { id: res.insertId, ...account });
        result(null, { id: res.insertId, ...account });
    });
};

Account.checkPassword = (email, password, result) => {
    console.log("data send "+email+ " pwd "+password);
    sql.query(`SELECT * FROM account WHERE email = '${email}' AND password = '${password}'`, (err, res) => {
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
        result({ kind: "not_found" }, null);
    });
};

Account.updateValue = (id, adcontrol, result) => {
    sql.query(
        "UPDATE account SET name = ?, lastname = ?, email = ?, phone = ?, city = ?, wishpost = ? WHERE id = ?",
        [ adcontrol.name, adcontrol.lastname, adcontrol.email, adcontrol.phone, adcontrol.city, adcontrol.wishpost, id],
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
            console.log("updated tutorial: ", { id: id, ...adcontrol });
            result(null, { id: id, ...adcontrol });
        }
    );
};

Account.setCompanie = (id,  adcontrol, result) => {
    sql.query(
        "UPDATE account SET companies = ?, role = ? WHERE id = ?",
        [ adcontrol.companies, adcontrol.role , id],
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
            console.log("updated tutorial: ", { id: id, ...adcontrol });
            result(null, { id: id, ...adcontrol });
        }
    );
};

Account.remove = (id, result) => {
    sql.query("DELETE FROM account WHERE id = ?", id, (err, res) => {
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

Account.removeAll = result => {
    sql.query("DELETE FROM account", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = Account;