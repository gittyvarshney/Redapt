package com.example.backend;

import com.example.backend.request.loginUser;
import com.example.backend.request.myUser;
import com.example.backend.request.ReqUsers;
import com.example.backend.request.myUserDetails;
import com.example.backend.response.userExistance;
import com.example.backend.response.userInformation;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RequestMapping("/login")
@RestController
public class myUserController {
    @Autowired
    myUserService myuserservice, getuserservice;

    java.sql.Connection con =   com.example.backend.DbConnection.connection();

    @CrossOrigin
    @PostMapping("/addUser")
    public String add(@Valid @RequestBody myUser usr)
    {
        try{
            return myuserservice.addNewUser(usr,con);
        }
        catch(Exception e)
        {
            e.getCause();
        }
        return "not added";
    }

    @CrossOrigin
    @PostMapping("/addUserDetails")
    public String adduserdetails(@Valid @RequestBody myUserDetails usr)
    {
        try{
            myuserservice.addUserDetails(usr,con);
            return "user details added";
        }
        catch(Exception e)
        {
            e.getCause();
        }
        return "not added";
    }

    @CrossOrigin
    @GetMapping("/getUserExistance")
    public userExistance getUser(@Valid @RequestParam String emailid)
    {
        userExistance ue = new userExistance();
       try{
           System.out.println("inside try");
          return getuserservice.getUser(emailid,con);
       }
       catch(Exception e)
       {
           e.getCause();
       }
       ue.setError(true);
        return ue;
    }

    @CrossOrigin
    @PostMapping("/LoginUser")
    public userInformation LoginUser(@Valid @RequestBody loginUser usr)
    {
        userInformation ue = new userInformation();
        try{
            return getuserservice.loginUser(usr,con);
        }
        catch(Exception e)
        {
            e.getCause();
        }
        ue.setError(true);
        return ue;
    }

    @CrossOrigin
    @PostMapping("/UploadImage")
    public String uploadImage(@RequestParam("Image") MultipartFile file,@RequestParam("email") String email)
    {
        System.out.println("tag2");
        userInformation ue = new userInformation();
        try{
            return getuserservice.uploadImage(file,email,con);
        }
        catch(Exception e)
        {
            e.getCause();

        }
        return "error occured";
    }

}
