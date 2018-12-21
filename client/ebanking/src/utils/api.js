var axios = require('axios');

// get card
export function getCard() {
    // if (!supports.checkExpireToken()) {
    //     console.log('renew');
    //     store.dispatch('renew_token');
    //     return new Promise((resolve, reject) => {
    //         axios({
    //             url: "http://localhost:3000/card/me",
    //             method: "GET"
    //         }).then(res => {
    //             resolve(res);
    //         }).catch(err => {
    //             reject(err);
    //         });
    //     });
    // } else {
        return new Promise((resolve, reject) => {
            axios({
                url: "http://localhost:3000/card/me",
                method: "GET"
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
            url: `http://localhost:3000/card/close`,
            data: {cardId: cardId},
            method: "POST"
        }).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });  
};