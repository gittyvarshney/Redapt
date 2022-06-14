package com.example.backend;

import com.example.backend.request.ReqUsers;
import com.example.backend.request.loginUser;
import com.example.backend.request.myUser;
import com.example.backend.request.myUserDetails;
import com.example.backend.response.userExistance;
import com.example.backend.response.userInformation;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.nio.file.Path;

@Service
public class myUserService {
    private PreparedStatement   insertStatement, fetchStatement;
    ResultSet   resultSet, resultSet2, findResult;

    public String addNewUser(myUser obj, Connection con) throws SQLException{
        try{
            String q = "INSERT INTO myuser(emailid,password,firstname,lastname) VALUES(?,?,?,?)";
            insertStatement = con.prepareStatement(q);
            insertStatement.setString(1, obj.getEmailid());
            insertStatement.setString(2, obj.getPassword());
            insertStatement.setString(3, obj.getFirstname());
            insertStatement.setString(4, obj.getLastname());
            insertStatement.executeUpdate();

        } catch (Exception e){
            e.printStackTrace();
        }
        return "user added";
    }

    public boolean addUserDetails(myUserDetails obj, Connection con) throws SQLException{
        try{
            String q = "INSERT INTO userdetails(emailid,title1,title2,country) VALUES(?,?,?,?)";
            insertStatement = con.prepareStatement(q);
            insertStatement.setString(1, obj.getEmailid());
            insertStatement.setString(2, obj.getTitle1());
            insertStatement.setString(3, obj.getTitle2());
            insertStatement.setString(4, obj.getCountry());
            insertStatement.executeUpdate();
            System.out.println("query executed");
            if(obj.getIsStudent() == true)
            {
                String ed = "INSERT INTO usereducation(emailid,college,course) VALUES(?,?,?)";
                insertStatement = con.prepareStatement(ed);
                insertStatement.setString(1, obj.getEmailid());
                insertStatement.setString(2, obj.getTitle1());
                insertStatement.setString(3, obj.getTitle2());
                insertStatement.executeUpdate();
                System.out.println("it is a student");
            }
            else
            {
                String ed = "INSERT INTO usercompany(emailid,company,job) VALUES(?,?,?)";
                insertStatement = con.prepareStatement(ed);
                insertStatement.setString(1, obj.getEmailid());
                insertStatement.setString(2, obj.getTitle1());
                insertStatement.setString(3, obj.getTitle2());
                insertStatement.executeUpdate();
                System.out.println("it is a company men");
            }

        } catch (Exception e){
            e.printStackTrace();
        }
        return true;
    }

    public userExistance getUser(String obj, Connection con) throws SQLException{

        userExistance ue = new userExistance();
        try{
            String q = "SELECT * FROM myuser WHERE emailid = ?";
            fetchStatement = con.prepareStatement(q);
            fetchStatement.setString(1, obj);
            findResult = fetchStatement.executeQuery();
            boolean flag = false;
            while(findResult.next())
            {
                flag = true;
                System.out.println("inside other flag");
            }

            if(flag==true)
            {
                System.out.println("inside flag");
                ue.setExist(true);
                ue.setError(false);
                return ue;
            }
            ue.setExist(false);
            ue.setError(false);
            return ue;

        } catch (Exception e){
            e.printStackTrace();
        }
        ue.setError(true);
        return ue;
    }

    public userInformation loginUser(loginUser obj, Connection con) throws SQLException{

        userInformation ue = new userInformation();
        try{
                String q = "SELECT * FROM myuser WHERE emailid = ? AND password = ?";
                fetchStatement = con.prepareStatement(q);
                fetchStatement.setString(1, obj.getEmailid());
                fetchStatement.setString(2, obj.getPassword());
                resultSet = fetchStatement.executeQuery();
                boolean flag = false;
                while(resultSet.next())
                {
                    ue.setEmailid(resultSet.getString(1));
                    ue.setFirstname(resultSet.getString(3));
                    ue.setLastname(resultSet.getString(4));
                    flag = true;
                }

                if(flag==true)
                {
                    String ud =  "SELECT * FROM userdetails WHERE emailid = ?";
                    fetchStatement = con.prepareStatement(ud);
                    fetchStatement.setString(1,obj.getEmailid());
                    resultSet = fetchStatement.executeQuery();
                    while(resultSet.next())
                    {
                        ue.setCountry(resultSet.getString(2));
                        ue.setTitle1(resultSet.getString(3));
                        ue.setTitle2(resultSet.getString(4));
                    }
                    ue.setError(false);
                    return ue;
                }

            }
        catch (Exception e){
                e.printStackTrace();
            }

        ue.setError(true);
        return ue;
    }

    public String uploadImage(MultipartFile obj,String email, Connection con) throws SQLException{


        try{
            String a = "D:/images/";
            byte[] bytes = obj.getBytes();
            Path path = Paths.get("D:\\Internship\\webDevelopment\\webone\\frontend\\.vscode\\images",obj.getOriginalFilename());
            String pre = ".\\.vscode\\images\\";
            String post = obj.getOriginalFilename();
            String fin = pre+post;
            System.out.println("fin: "+fin);
            String b = a + path;
            Files.write(path,bytes);
            System.out.println(path.toString());
            String q = "INSERT INTO profileimages(emailid,profilepic) VALUES(?,?)";
            insertStatement = con.prepareStatement(q);
            insertStatement.setString(1, email);
            insertStatement.setString(2, fin);
            insertStatement.executeUpdate();
            return obj.getOriginalFilename();
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

}
