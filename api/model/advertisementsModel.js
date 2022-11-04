const sql = require("../db.js");

// constructor
const Advertisements = function(advertisements) {
    this.title = advertisements.title;
    this.description = advertisements.description;
    this.companiesid = advertisements.companiesid;
    this.type = advertisements.type;
    this.localisation = advertisements.localisation;
    this.wage = advertisements.wage;
    this.domain = advertisements.domain;
    this.timerange = advertisements.timerange;
};

Advertisements.getAdvertisements =  result => {
    let query = "SELECT advertisements.id,title,companiesid,advertisements.description,type,localisation,wage,domain,timerange,companies.name, companies.compagnieimg FROM advertisements INNER JOIN companies WHERE  companiesid = companies.id;";
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

Advertisements.getApplysOfCompany = (id, result) => {
    sql.query(`SELECT advertisements.id, title, companiesid, advertisements.description, account.name, lastname FROM advertisements INNER JOIN account WHERE advertisements.companiesid = account.companies AND account.id = ${id}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err,null);
            return;
        }
        if (res.length) {
            console.log("found tutorial: ", res[0]);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    })
}
Advertisements.getAdvertisement = (id, result) => {
    sql.query(`SELECT  advertisements.id,title,companiesid,advertisements.description,type,localisation,wage,domain,timerange,companies.name, companies.compagnieimg FROM advertisements INNER JOIN companies WHERE  companiesid = companies.id AND advertisements.id = ${id}`, (err, res) => {
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

Advertisements.create = (advertisement, result) => {
    sql.query("INSERT INTO advertisements SET ?", advertisement, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created tutorial: ", { id: res.insertId, ...advertisement });
        result(null, { id: res.insertId, ...advertisement });
    });
};


Advertisements.updateById = (id, advertisement, result) => {
    sql.query(
        "UPDATE advertisements SET title = ?, companiesid = ?, description = ?, advertisements.type = ?, localisation = ?, wage = ?, advertisements.domain = ?, timerange = ? WHERE id = ?",
        [advertisement.title, advertisement.companiesid,advertisement.description, advertisement.type, advertisement.localisation, advertisement.wage, advertisement.domain, advertisement.timerange, id],
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



Advertisements.updateByAdmin = (id, advertisement, result) => {
    sql.query(
        "UPDATE advertisements SET title = ?, description = ?, advertisements.type = ?, localisation = ?, wage = ?, advertisements.domain = ?, timerange = ? WHERE id = ?",
        [advertisement.title, advertisement.description, advertisement.type, advertisement.localisation, advertisement.wage, advertisement.domain, advertisement.timerange, id],
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

Advertisements.remove = (id, result) => {
    sql.query("DELETE FROM advertisements WHERE id = ?", id, (err, res) => {
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

Advertisements.removeAll = result => {
    sql.query("DELETE FROM advertisements", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} tutorials`);
        result(null, res);
    });
};

module.exports = Advertisements;