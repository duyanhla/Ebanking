import jwtDecode from 'jwt-decode';

// check token expire
export function checkExpireToken(){
    const decodedToken = jwtDecode(localStorage.getItem('token'));
    let lifetime = decodedToken.exp - decodedToken.iat;
    if (decodedToken) {
        const currentTime = new Date().getTime() / 1000;
        if (currentTime < decodedToken.exp) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// format card number
export function format(number){
    return number.match(new RegExp('.{1,4}', 'g')).join(' ');
}