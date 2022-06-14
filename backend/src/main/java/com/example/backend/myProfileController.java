package com.example.backend;

import com.example.backend.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;
import javax.validation.Valid;

@RequestMapping("/profile")
@RestController
public class myProfileController {
    @Autowired
    myProfileService myuserservice, getuserservice;

    java.sql.Connection con =   com.example.backend.DbConnection.connection();

    @CrossOrigin
    @PostMapping("/ImageEntry")
    public String uploadImage(@RequestParam("email") String email)
    {
        System.out.println("tag2");
        try{
            return getuserservice.doImageEntry(email,con);
        }
        catch(Exception e)
        {
            e.getCause();
        }
        return "error occured";
    }

    @CrossOrigin
    @GetMapping("/getUserImages")
    public reqProfileImages getUser(@Valid @RequestParam String emailid)
    {
        reqProfileImages im = new reqProfileImages();
        try{
            System.out.println("inside try");
            return getuserservice.getUserImages(emailid,con);
        }
        catch(Exception e) {
            im.setError(true);
            e.getCause();
            return im;
        }
    }

    @CrossOrigin
    @PutMapping("/UploadImage")
    public String uploadImage(@RequestParam("Image") MultipartFile file,@RequestParam("email") String email,@RequestParam("upload") String upload)
    {
        System.out.println("tag2");
        userInformation ue = new userInformation();
        try{
            return getuserservice.uploadImage(file,email,upload,con);
        }
        catch(Exception e) {
            e.getCause();
            return "error occured";
        }
    }

    @CrossOrigin
    @GetMapping("/getInfo")
    public userInformation getInfo(@Valid @RequestParam String emailid)
    {
        userInformation in = new userInformation();
        try{
            System.out.println("inside try");
            return getuserservice.getUserInfo(emailid,con);
        }
        catch(Exception e) {
            in.setError(true);
            e.getCause();
            return in;
        }
    }

    @CrossOrigin
    @GetMapping("/getusercompany")
    public userCompanyList getUserCompany(@Valid @RequestParam String emailid)
    {
        userCompanyList userlist = new userCompanyList();
        try{
            System.out.println("inside try");
            return getuserservice.getUserCompany(emailid,con);
        }
        catch(Exception e) {
            userlist.setError(true);
            e.getCause();
            return userlist;
        }
    }

}
