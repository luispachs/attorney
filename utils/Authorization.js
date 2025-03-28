export class  Authorizarion {
    set token(validToken){
        sessionStorage.setItem('ATTORNEYS_TOKEN',validToken);
    }

    get token(){
        return sessionStorage.getItem('ATTORNEYS_TOKEN');
    }
}