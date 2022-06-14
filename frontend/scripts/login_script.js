const validateButton = (e) =>{

    e.preventDefault();
    const email = document.getElementById('user_email');
    const password = document.getElementById('password');

    //regex is taken form online for testing purpose
    const email_re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!email_re.test(String(email.value).toLowerCase())){

        document.getElementById('invalid-email').classList.add("paragraph-show");
        document.getElementById('email_border').classList.add("input-border-change");
        document.getElementById('label-user_email').classList.add("label-change");
        return false;
    }
    else{

        document.getElementById('invalid-email').classList.remove("paragraph-show");
        document.getElementById('email_border').classList.remove("input-border-change");
        document.getElementById('label-user_email').classList.remove("label-change");
    }
    
    console.log("after else");
    const password_re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //atleast 8 characters one letter one number

    if(!password_re.test(String(password.value).toLowerCase())){
        document.getElementById('invalid-password').classList.add("paragraph-show");
        document.getElementById('password_border').classList.add("input-border-change");
        document.getElementById('label-password').classList.add("label-change");
        return false;
    }
    else{
        document.getElementById('invalid-password').classList.remove("paragraph-show");
        document.getElementById('password_border').classList.remove("input-border-change");
        document.getElementById('label-password').classList.remove("label-change");
    }

    const url = 'http://localhost:8081/login/LoginUser';
    const emaill =    document.getElementById('user_email').value;
    const passwordd = document.getElementById('password').value;
    console.log(emaill);
    console.log(passwordd);

    let data = {
        "emailid":emaill,
        "password":passwordd
    }
    console.log(data);

    let header = new Headers();

    header.append('Access-Control-Allow-Origin', 'http://localhost:8081');
    header.append('Access-Control-Allow-Credentials', 'true');
    header.append('Accept','*/*');
    header.append('Content-Type','application/json');

    let fetchData = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: header
    }

    const userStatus = async () =>{

    await fetch(url,fetchData)
    .then((resp)=>{
        return resp.json();
        // return resp;
    })
    .then((resp_json)=>{
      console.log("the data is", resp_json);
      if(resp_json.error == true)
      {
        document.getElementById('invalid-credentials').classList.add("credentials");
      }
      else
      {
        localStorage.setItem("emailid",emaill);
        localStorage.setItem("password",passwordd);
        localStorage.setItem("is_loggedin",true);
        window.location.replace('http://127.0.0.1:5500/navbar.html');
      }
    })
}

userStatus();

// console.log("after userStatus");

return false;

}