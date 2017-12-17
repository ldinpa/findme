const MongoClient = require('mongodb').MongoClient;
var db;

let connectToMongoDB = () => {

    return new Promise((resolve, reject) => {

        let mongoUrl = "mongodb://ldinpa:(*JULU2julu*)@ds035270.mlab.com:35270/ersama_db";
        MongoClient.connect(mongoUrl, function (err, dbInstance) {
            if (err) {
                console.log(err);
                return reject({ Error: "MongoDB" });
            } else {
                console.log("Connected! YAY");
                db = dbInstance;
                return resolve(db);
            }
        })

    });

}


let login = (username, password) => {

    return new Promise((resolve, reject) => {

        let collection = db.collection('users');
        let query = { $and: [{ username: username }, { password: password }] };
        collection.find(query).toArray((err, result) => {
            if (err) return reject({ message: "DB get Failed" });

            if (result.length < 1)
                return reject();


            return resolve(result);
        })

    })

}

let getLike = (collName, likeString) => {

    let query;
    if (collName == "Name")
        query = { 'Name': { $regex: likeString, $options: "i" } };

    if (collName == "Village")
        query = { 'Village': { $regex: likeString, $options: "i" } };

    return new Promise((resolve, reject) => {

        let collection = db.collection('public_rec');
        collection.find(query).toArray((err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })

    })
}


module.exports = {
    connectToMongoDB: connectToMongoDB,
    getLike: getLike,
    login: login


}
