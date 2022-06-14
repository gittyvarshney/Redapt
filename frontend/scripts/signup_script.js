const validateButton = (e) =>{

    e.preventDefault();
    const email = document.getElementById('user_email');
    const password = document.getElementById('password');

    //regex is taken form online for testing purpose
    const email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!email_re.test(String(email.value).toLowerCase())){

        document.getElementById('invalid-email').classList.add("paragraph-show");
        document.getElementById('user_email').classList.add("input-border-change");
        return false;
    }
    else{

        document.getElementById('invalid-email').classList.remove("paragraph-show");
        document.getElementById('user_email').classList.remove("input-border-change");
    }
    
    console.log("after else");
    const password_re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //atleast 8 characters one letter one number

    if(!password_re.test(String(password.value).toLowerCase())){
        document.getElementById('invalid-password').classList.add("paragraph-show");
        document.getElementById('password').classList.add("input-border-change");
        return false;
    }
    else{
        document.getElementById('invalid-password').classList.remove("paragraph-show");
        document.getElementById('password').classList.remove("input-border-change");
    }

    const emaill =    document.getElementById('user_email').value;
    const passwordd =    document.getElementById('password').value;

    let fetchData = {
        method: 'GET'
    }
 
    const url = new URL('http://localhost:8081/login/getUserExistance');
    url.searchParams.append('emailid',emaill);


    const getvaliduser = async () =>{

        await fetch(url,fetchData)
        .then((resp)=>{
            return resp.json();
        })
        .then((resp_json)=>{
        if(resp_json.error == false)
            {
                if(resp_json.exist == true )
                {
                    document.getElementById('user-already-exist').classList.add("paragraph-show");
                }
                else
                {
                    document.getElementById('user-already-exist').classList.remove("paragraph-show");
                    localStorage.setItem("emailid",emaill);
                    localStorage.setItem("password",passwordd);
                    window.location.replace('http://127.0.0.1:5500/signup_next.html');
                }
            }
        })
    }


    getvaliduser();


    return false;
}