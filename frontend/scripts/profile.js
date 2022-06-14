var bg_image = document.getElementById("background-image");
var profile_image = document.getElementById("profile-image");
var background_edit = document.getElementById('edit-bg');
var background_show = document.getElementById('backgroundUpload');
var profile_show = document.getElementById('profilepicUpload');
var work_exp = document.getElementById('organization-description');

/*loading images when page mounts*/
var load_images = () => {
   
    var url_1 = new URL('http://localhost:8081/profile/getUserImages');
    url_1.searchParams.append('emailid',localStorage.getItem('emailid'));
    var req_1 = {
        method: 'GET'
    }

    fetch(url_1,req_1)
    .then((resp)=>{
        return resp.json();
    })
    .then((obj)=>{
        console.log(obj);
        if(obj.backgroundImage != null)
        {
            document.getElementById('background-image').src = obj.backgroundImage;
        }
        if(obj.profileImage != null)
        {
            document.getElementById('profile-image').src = obj.profileImage;
        }
    }
    )
}
load_images();

var create_company_lists = (val) =>{
    const new_list = document.createElement("li");
    console.log(val.job);
    const div_1 = document.createElement("div");
    div_1.classList.add("edit-profile-details");

    const div_1_img = document.createElement("img");
    div_1_img.setAttribute('src','./images/pencil.svg');
    div_1_img.setAttribute('alt','edit');

    div_1.appendChild(div_1_img);

    const img_1 = document.createElement("img");
    img_1.setAttribute('src','./images/kuliza_logo.png');
    img_1.setAttribute('alt','kulizaLogo');

    const div_2 = document.createElement("div");
    div_2.classList.add("profile-info");

    const h2 = document.createElement("h2");
    h2.innerHTML = val.company;

    const h3 = document.createElement("h3");
    h3.innerHTML = val.job;

    const p = document.createElement("p");

    const span = document.createElement("span");
    span.innerHTML = "S.Y. -"; //to be inserted

    p.appendChild(span);

    div_2.innerHTML += h2.outerHTML + h3.outerHTML + p.outerHTML;
    new_list.innerHTML += div_1.outerHTML + img_1.outerHTML + div_2.outerHTML;
    work_exp.appendChild(new_list);
}

var load_organization = () => {
   
    var url_3 = new URL('http://localhost:8081/profile/getusercompany');
    url_3.searchParams.append('emailid',localStorage.getItem('emailid'));
    var req_3 = {
        method: 'GET'
    }

    fetch(url_3,req_3)
    .then((resp)=>{
        return resp.json();
    })
    .then((obj)=>{
        console.log(obj);
        console.log(obj.usrlist[0].company);
        console.log(obj.usrlist);
        obj.usrlist.forEach(create_company_lists);
    }
    )
}

load_organization();

var load_names = () => {
    var url_2 = new URL('http://localhost:8081/profile/getInfo');
    url_2.searchParams.append('emailid',localStorage.getItem('emailid'));
   
    var req_2 = {
        method: 'GET'
    }

    fetch(url_2,req_2)
    .then((resp)=>{
        return resp.json();
    })
    .then((obj)=>{
        document.getElementById('first-name').innerHTML = obj.firstname;
        document.getElementById('last-name').innerHTML = obj.lastname;
        document.getElementById('title-1').innerHTML = obj.title1;
        document.getElementById('title-2').innerHTML = obj.title2;
    }
    )

}

load_names();

var upload_to_database = (which_to_upload) =>{
    var url_2 = 'http://localhost:8081/profile/UploadImage'; //backend url calling
    var file_name = background_show.files[0];
    if(which_to_upload !== "background")
    {
        file_name = profile_show.files[0];
    }

    var data = new FormData();
    data.append('Image',file_name);
    data.append('email',localStorage.getItem('emailid'));
    data.append('upload',which_to_upload);

    var req_2 = {
                    method: 'PUT',
                    body: data
                }
    
    fetch(url_2,req_2)
    .then((resp)=>{
        return resp.text();
    })
    .then((obj)=>{
        console.log(obj);
    }
    )
    
    console.log('image uploaded');
}
/*editing the background*/
background_edit.addEventListener('click',(e)=>{
    document.getElementById('backgroundUpload').click();
    e.stopPropagation();
})

background_show.addEventListener('change',(e)=>{
    bg_image.src = window.URL.createObjectURL(background_show.files[0]);
    upload_to_database("background");
    e.stopPropagation();
})
/*editing the profile image*/
profile_image.addEventListener('click',(e)=>{
    profile_show.click();
    e.stopPropagation();
})

profile_show.addEventListener('change',(e)=>{
    profile_image.src = window.URL.createObjectURL(profile_show.files[0]);
    upload_to_database("profile");
    e.stopPropagation();
})



/** */

