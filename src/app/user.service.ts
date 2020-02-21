import {  Injectable  } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from'firebase/app'

interface User{
    name:string
    email:string,
    uid:string,
    type:string,
    board:string,
    classs:string
    teacher:string
    subjects:[]
}

@Injectable()
export class userService{
    private user:User

    constructor(private afauth:AngularFireAuth){}
   
    setUser(user:User){
        this.user=user
    }
    getsubjects(){
        return this.user.subjects;
    }
    getTeacher(){
        return this.user.teacher
    }
    getName(){
        return this.user.name
    }
    getEmail(){
        return this.user.email
    }
    getUID(){
        return this.user.uid
    }
    gettype(){
        return this.user.type
    }
    getclass(){
        return this.user.classs
    }
    getboard(){
        return this.user.board
    }
    reAuth(username:string,password:string){
       return this.afauth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(username,password))
    }

    updatePassword(newpassword){
           return this.afauth.auth.currentUser.updatePassword(newpassword) 
    }
    updateEmail(email){
        return this.afauth.auth.currentUser.updateEmail(email) 
    }
    // async  isAuthenticate(){
    //         if(this.user) return true;

    //         const user= await this.afauth.authState.pipe(first()).toPromise();

    //         if(user){
    //             this.setUser({
    //                 username:user.email,
    //                 uid: user.uid,
    //                 type:user.type,
    //                 board:user.board,
    //                 class:user.class
    //             })
    //         }
    //         return false;
    // }
}