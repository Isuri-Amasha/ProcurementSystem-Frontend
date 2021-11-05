class AthenticationService {
    
    successfulLogin(userId, userName, userRole, password){
        sessionStorage.setItem('authenticatedUserId', userId);
        sessionStorage.setItem('authenticatedUserName', userName);
        sessionStorage.setItem('authenticatedUserRole', userRole);
    }

    logout(){
        sessionStorage.removeItem('authenticatedUserId');
        sessionStorage.removeItem('authenticatedUserName');
        sessionStorage.removeItem('authenticatedUserRole');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUserId');
        if (user === null) return false;
        return true;
    }

    loggedUserId(){
        let id = sessionStorage.getItem('authenticatedUserId');
        if (id === null) return '';
        return id;
    }

    loggedUserName(){
        let userName = sessionStorage.getItem('authenticatedUserName');
        if (userName === null) return '';
        return userName;
    }

    loggedUserRole() {
        let userRole = sessionStorage.getItem('authenticatedUserRole');
        if(userRole != null) return userRole;
        return null;
    }

}
 
export default new AthenticationService();