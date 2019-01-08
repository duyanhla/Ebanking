var axios = require('axios');
const api_path = 'http://localhost:3000'; // api path

// get all card
export function getAllCard() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card/all`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get all card
export function getCard() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card/me`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get open card
export function getOpenCard() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card/me/open`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get card by admin
export function getCardId(cardId) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card?cardId=${cardId}`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
};

// close card by `id`
export function closeCard(cardId) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card/close`,
            data: {cardId: cardId},
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// add card
export function addCard(userName) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card/add`,
            data: {userName: userName},
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// update card
export function updateCard(cardId, money) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/card/update`,
            data: {
                cardId: cardId,
                money: money
            },
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get all user
export function allUser() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/user/all`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// add user
export function addUser(user) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/user`,
            data: user,
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get all contact
export function allContact() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/contact/me`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get all contact
export function addContact(contact) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/contact`,
            data: contact,
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// delete contact
export function deleteContact(contact) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/contact`,
            data: contact,
            method: 'DELETE'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// edit contact
export function editContact(contact) {
    console.log(contact)
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/contact/edit`,
            data: contact,
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

//get user information by cardID
export function getUserbyCard(cardId) {
    return new Promise((resolve,reject)=>{
        axios ({
            url: `${api_path}/user/receiver?cardId=${cardId}`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
        reject(err);
        });
    })
}

// gen otp
export function genOTP(trans) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/transaction`,
            data: trans,
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// verify otp
export function verifyOTP(otp, transId) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/otp`,
            data: {otp: otp, transId: transId},
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    }); 
};

// confirmm transaction
export function confirmTrans(transId, fee, feeReceiver,addContact) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/transaction/confirm`,
            data: {fee: fee, transId: transId, feeReceiver: feeReceiver,addContact: addContact},
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

// get all transaction

export function getTransactionsByCardId(cardId) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/transaction/history?cardId=${cardId}`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

export function allTransactionsByUserId() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/transaction/me`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

export function sendNoti(title, content) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/noti`,
            data: {title: title, content: content},
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

export function getNotifies() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/noti`,
            method: 'GET'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

export function subcribe() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/user/sub`,
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};

export function unsubcribe() {
    return new Promise((resolve, reject) => {
        axios({
            url: `${api_path}/user/unsub`,
            method: 'POST'
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};