package com.example.backend;

import com.example.backend.response.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.stream.Stream;

@Service
public class myProfileService {
    private PreparedStatement   insertStatement, fetchStatement, updateStatement;
    ResultSet   resultSet, resultSet2, findResult;

    public String doImageEntry(String email, Connection con) throws SQLException {
        try{
            String q = "INSERT INTO profileimages(emailid) VALUES(?)";
            insertStatement = con.prepareStatement(q);
            insertStatement.setString(1, email);
            insertStatement.executeUpdate();
            return "success";
        } catch (Exception e){
            e.printStackTrace();
            return "error";
        }
    }

    public reqProfileImages getUserImages(String emailid, Connection con) throws SQLException{
        reqProfileImages im = new reqProfileImages();
        String q = "SELECT * FROM profileimages WHERE emailid = ?";
        fetchStatement = con.prepareStatement(q);
        fetchStatement.setString(1,emailid);
        resultSet = fetchStatement.executeQuery();
        while(resultSet.next())
        {
            im.setProfileImage(resultSet.getString(2));
            im.setBackgroundImage(resultSet.getString(3));
        }
        im.setError(false);
        return im;
    }

    public String uploadImage(MultipartFile file, String email, String upload, Connection con) throws SQLException{
        try{
            byte[] bytes = file.getBytes();
            Path path = Paths.get("D:\\Internship\\webDevelopment\\webone\\frontend\\.vscode\\images",file.getOriginalFilename());
            String pre = ".\\.vscode\\images\\";
            String post = file.getOriginalFilename();
            String fin = pre+post;
            Files.write(path,bytes);
            if(upload.equals("background"))
            {
                String q = "UPDATE profileimages SET profilebackground = ? WHERE emailid = ?";
                updateStatement = con.prepareStatement(q);
                updateStatement.setString(1, fin);
                updateStatement.setString(2, email);
                updateStatement.executeUpdate();
                System.out.println("backround image uploaded");
                return "Background Image Uploaded";
            }
            else
            {
                String q = "UPDATE profileimages SET profilepic = ? WHERE emailid = ?";
                updateStatement = con.prepareStatement(q);
                updateStatement.setString(1, fin);
                updateStatement.setString(2, email);
                updateStatement.executeUpdate();
                System.out.println("profile pic uploaded");
                return "profilepic Uploaded";
            }
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return "error";
        }
    }

    public userInformation getUserInfo(String emailid, Connection con) throws SQLException{
        userInformation in = new userInformation();
        try {
            System.out.println("running");
            String q = "SELECT * FROM userdetails INNER JOIN myuser ON userdetails.emailid = ? AND myuser.emailid = ?";
            fetchStatement = con.prepareStatement(q);
            fetchStatement.setString(1, emailid);
            fetchStatement.setString(2, emailid);
            resultSet = fetchStatement.executeQuery();
            while (resultSet.next()) {
                in.setCountry(resultSet.getString(2));
                in.setTitle1(resultSet.getString(3));
                in.setTitle2(resultSet.getString(4));
                in.setFirstname(resultSet.getString(7));
                in.setLastname(resultSet.getString(8));
            }
            System.out.println(in.getCountry());
            System.out.println(in.getTitle1());
            System.out.println("running");
            in.setError(false);
            return in;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return in;
        }
    }

    public userCompanyList getUserCompany(String emailid, Connection con) throws SQLException{
        userCompanyList userlist = new userCompanyList();
        List<userCompany> li = new ArrayList<>();
        try {
            System.out.println("running");
            String q = "SELECT * FROM usercompany WHERE emailid = ?";
            fetchStatement = con.prepareStatement(q);
            fetchStatement.setString(1, emailid);
            resultSet = fetchStatement.executeQuery();
            while (resultSet.next()) {
                userCompany in = new userCompany();
                in.setCompany(resultSet.getString(2));
                System.out.println(resultSet.getString(2));
                System.out.println(in.getCompany());
                in.setJob(resultSet.getString(3));
                in.setDate(resultSet.getDate(4));
                li.add(in);
            }
            userlist.setUsrlist(li);
            userlist.setError(false);
            return userlist;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            userlist.setError(true);
            return userlist;
        }
    }
}
