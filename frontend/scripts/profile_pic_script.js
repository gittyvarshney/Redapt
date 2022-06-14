const skip = document.getElementById('skip');

const button_for_upload = (e) =>{
    document.getElementById('imageUpload').click();
    e.preventDefault();
}

const show_filename = (e) =>{
    e.preventDefault();
    const file_name = document.getElementById('imageUpload').files[0];
    console.log(document.getElementById('imageUpload').files[0]);
    document.getElementById('image_change').src = window.URL.createObjectURL(document.getElementById('imageUpload').files[0])

    return false;
}

const new_req = async (url,request) =>{  

    await fetch(url,request)
            .then((resp)=>{
                return resp.text();
            })
            .then((rep)=>{
               console.log(rep);
               localStorage.setItem("is_loggedin",true);
               window.location.replace('http://127.0.0.1:5500/navbar.html');
            })
        }


const store_in_database = (e) =>{
    e.preventDefault();
    const url = 'http://localhost:8081/login/UploadImage'; //backend url calling
    const file_name = document.getElementById('imageUpload').files[0];
    const data = new FormData();
    data.append('Image',file_name);
    data.append('email',localStorage.getItem('emailid'));

    let request = {
                    method: 'POST',
                    body: data
                }
    
    console.log('image uploaded');
        
     new_req(url,request);

    return false;
}

skip.addEventListener('click',(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const url = 'http://localhost:8081/profile/ImageEntry'; //backend url calling
    const data = new FormData();
    data.append('email',localStorage.getItem('emailid'));
    console.log("inside skip");
    let request = {
        method: 'POST',
        body: data
    }
    console.log('blank image uploaded');
    new_req(url,request);

    return false;
})