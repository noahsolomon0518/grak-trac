

async function loginValidation(){
    if(localoginValidation()==true){
        if(await dbLoginValidation()==true){
            console.log('validated')
            login()
        }else{
            console.log('Bad username or password')
        }
    }else{
        console.log(localoginValidation())
    }
}



function localoginValidation(){
    let username = document.getElementById('username-form').value
    let password = document.getElementById('password-form').value
    if(username == '' || password==''){
        return 'One or more fields left empty'
    }else{
        return true
    }

}


function dbLoginValidation(){
    return new Promise(resolve => {
        let username = document.getElementById('username-form').value
        let password = document.getElementById('password-form').value
        axios.post('/account/login-validation',{username:username, password:password}).then((res)=>{
            resolve(res.data)
        })
    })
}


function login(){
    window.location.href = '/my-page'
}