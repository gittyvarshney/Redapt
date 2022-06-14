package com.example.backend;

import java.sql.Connection;
import java.sql.DriverManager;

public class DbConnection {
    private static Connection connection=null;

    public static Connection connection(){
        try{
            Class.forName("org.postgresql.Driver");
            System.out.println("Class open successfully");
            connection = DriverManager.getConnection("jdbc:postgresql://localhost:5432/project_two", "pranjul","password");
            System.out.println("Database open successfully");
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
        }
        return connection;
    }

    public Connection closeConnection(){
        try{
            connection.close();
        }
        catch(Exception e)
        {
            System.out.println("Database open successfully");

        }
        return connection;
    }
}
