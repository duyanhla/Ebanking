var axios = require('axios');
const api_path = 'http://localhost:3000'; // api path

// get card
export function getCard() {
    // if (!supports.checkExpireToken()) {
    //     console.log('renew');
    //     store.dispatch('renew_token');
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             url: '${api_path}/card/me',
    //             method: 'GET'
    //         }).then(res => {
    //             resolve(res);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // } else {
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
    // }
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