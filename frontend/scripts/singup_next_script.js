const hideCompany = (x) =>{
    const id_company = document.getElementById("company");
    const id_jobtitle = document.getElementById("jobtitle");
    const id_college = document.getElementById("college");
    const id_course = document.getElementById("course");

    if(x.checked)
    {
        document.getElementById("company_toggle").style.display = "none";
        document.getElementById("college_toggle").style.display = "flex";

        id_college.setAttribute("required","required");
        id_course.setAttribute("required","required");
        id_company.removeAttribute("required");
        id_jobtitle.removeAttribute("required");
    }
}

const hideCollege = (x) =>{
    const id_company = document.getElementById("company");
    const id_jobtitle = document.getElementById("jobtitle");
    const id_college = document.getElementById("college");
    const id_course = document.getElementById("course");

    if(x.checked)
    {
        document.getElementById("company_toggle").style.display = "flex";
        document.getElementById("college_toggle").style.display = "none";

        id_company.setAttribute("required","required");
        id_jobtitle.setAttribute("required","required");
        id_college.removeAttribute("required");
        id_course.removeAttribute("required");
    }
}

const validateButton = (e) =>{

    e.preventDefault();

    const url_1 = 'http://localhost:8081/login/addUser';
    const url_2 = 'http://localhost:8081/login/addUserDetails';

    const emailid = localStorage.getItem("emailid");
    const password = localStorage.getItem("password");
    console.log(emailid);
    console.log(password);

    let data_1 = {
        "emailid": emailid,
        "password": password,
        "firstname": document.getElementById('first-name').value,
        "lastname": document.getElementById('last-name').value
    }

    const is_student = document.getElementById('radio-yes').checked;
    console.log(is_student);

    let data_2 = {
        "emailid":  emailid,
        "title1":   is_student ? document.getElementById('college').value : document.getElementById('company').value,
        "title2":   is_student ? document.getElementById('course').value : document.getElementById('jobtitle').value,
        "country":  document.getElementById('country').value,
        "isStudent": is_student
    }

    console.log(data_1);

    let header_1 = new Headers();

    header_1.append('Access-Control-Allow-Origin', 'http://localhost:8081');
    header_1.append('Access-Control-Allow-Credentials', 'true');
    header_1.append('Accept','*/*');
    header_1.append('Content-Type','application/json');

    let fetchData_1 = {
        method: 'POST',
        body: JSON.stringify(data_1),
        headers: header_1
    }

    let fetchData_2 = {
        method: 'POST',
        body: JSON.stringify(data_2),
        headers: header_1
    }

    const writeInDb = async () =>{

        await fetch(url_1,fetchData_1)
        .then((resp)=>{
            return resp.text();
        })
        .then((text)=>{
            console.log(text);
        })
        

        fetch(url_2,fetchData_2)
        .then((resp)=>{
            return resp.text();
        })
        .then((text)=>{
            console.log(text);
            window.location.replace('http://127.0.0.1:5500/profile_pic.html');
        })
    }

writeInDb();

return false;

}