const admin = require("firebase-admin");
const serviceAccount = require('../config/firebaseconfig.json');

class Firebase {

    constructor(table) {
        this.table = table;
        this.firebaseConfig = 
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.DATA_BASE_URL
        });
        this.db = admin.firestore();
        this.tableData = table;
      }
    
    async saveDatabase(data) {
        return this.db.collection(this.tableData).doc(data.id).set(data);
        
    }

    async updateDatabase(data) {
        return this.db.collection(this.tableData).doc(data.id).update(data);
    }

    async recoveryPasswordLink(email) {
        return await this.firebaseConfig.auth().generatePasswordResetLink(email);
    }

    async createUser(data){
        return await this.firebaseConfig.auth().createUser(data);
    }

    async activateUserLink(data){
        return await this.firebaseConfig.auth().generateEmailVerificationLink(data)
    }

    async verifyUser(data){
        return await this.firebaseConfig.auth().getUserByEmail(data);
    }

    async getData(data){
        return await this.db.collection(this.tableData).doc(data.id).get().data()
    }
}

module.exports = {
    Firebase
};
