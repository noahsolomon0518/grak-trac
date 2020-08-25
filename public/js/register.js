
async function registerValidation(){
    if(localRegisterValidation()==true){
        if(await dbRegisterValidation()==true){
            console.log('Registered sucessfully')
            login()
        }else{
            console.log('Username already taken')
        }
    }else{
        console.log(localRegisterValidation())
    }
}



function localRegisterValidation(){
    let username = document.getElementById('username-form').value
    let password = document.getElementById('password-form').value
    let repeatPassword = document.getElementById('repeat-password-form').value

    if(username == '' || password==''){
        return 'One or more fields left empty'
    }else if(password!=repeatPassword){
        return 'Passwords do not match'
    }else{
        return true
    }

}


function dbRegisterValidation(){
    return new Promise(resolve => {
        let username = document.getElementById('username-form').value
        let password = document.getElementById('password-form').value
        axios.post('/dbquery/registration-validation',{username:username, password:password}).then((res)=>{
            resolve(res.data)
        })
    })
}


function login(){
    console.log('login!')
}