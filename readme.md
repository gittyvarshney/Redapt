# Redapt
## Simulating social Media with PureJS
### This project utilizes Java Springboot and Pure javascript (ES6)

![Redapt](https://github.com/gittyvarshney/Redapt/blob/main/redapt_bg.png?raw=true)

## Frontend:
FrontEnd is based on Pure JS (ES6), No Helper library is used and all logic is implemented just by using the core concepts </br> 
It consist's of 8 files which you can assess in frontend directory

![FE Files](https://github.com/gittyvarshney/Redapt/blob/main/redapt_fe_1.png?raw=true)

### Design:

![FE Design](https://github.com/gittyvarshney/Redapt/blob/main/redapt_fe_2.png?raw=true)

## Backend:
The Baackend is implemented in Java 8 using the spring boot library in order to communicate with the database and manage the corresponding API’s

![BE Files](https://github.com/gittyvarshney/Redapt/blob/main/redapt_be_1.png?raw=true)

### Database:
PSQL Database is used in storing the information in accordance with the technology used there, it is consists of five schemas with their primary and foreign keys

![Database](https://github.com/gittyvarshney/Redapt/blob/main/redapt_be_2.png?raw=true)




###



# Setting up the Backend
- First Start the Intellij IDE 
- Then Click on the File Menu > New Project > Spring Initializer 
- Set The Project SDK: to Corretto-1.8 (if not on dropdown download the SDK) 
- Then Click on the next button <br/>
## Spring Initializr Project Settings
(Note: if spring initializer is not showing in intellij you can initalize it 
with this link [Spring Initializer](https://start.spring.io/) & extract it where you want)

|Label|Value|
| ----|----|
|Group:| com.example| 
|Artificat:| demo (or what you want to name your repo)| 
|Type:| Maven| 
|Language:| Java| 
|Pakaging:| Jar| 
|Java version:| 8| 
|Version:| 0.0.1-SNAPSHOT or 2.4.4| 
|Name:| demo |
|Description:| anything you want |
|Package:| com.example.demo |

### Dependecies:
for now just click on next (We install dependencies manually from pom.xml file) 
On the next window just click on next or specify the Project location 

## Pom .xml
- After Finishing the project setup go to pom.xml 
- change the `<parent>` > `<version>` to 2.4.3 
- copy the `<dependencies>` from the pom.xml file in the repository 
- then reload the changes as it appy the dependencies to the project 

## Backend Repository
Copy the whole backend repository files to your `src`>`main`>`java`>`com`>`example`>`backend` or 
whatever name of your artifact <br/>
- also change the path where the image stores in `MyuserService` > Line No. 158

## Setup application.properties
go to `main`>`resources`>`application.properties` and copy the following:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/project_two
spring.datasource.username=pranjul
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.error.include-message=always
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true
server.port=8081
```

## Database Setup
- open the postgres and enter the following commands one by one:- 
~~~mysql
CREATE DATABASE project_two;
CRATE USER pranjul WITH PASSWORD 'password';
\c project_two;
GRANT ALL PRIVILEGES ON DATABASE project_two to pranjul;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO pranjul;
~~~
- Now we create the table schemas in database 
  so go into the database project_two (Note: if not on project_two type `\c project_two;`)
- Type these CREATE TABLE commands one by one:-
~~~mysql
CREATE TABLE myuser(emailid varchar(255),password varchar(255),firstname varchar(255),lastname varchar(255), PRIMARY KEY (emailid));
~~~
~~~mysql
CREATE TABLE profileimages(emailid varchar(255),profilepic varchar(255),profilebackground varchar(255), PRIMARY KEY (emailid), FOREIGN KEY (emailid) REFERENCES myuser(emailid));
~~~
~~~mysql
CREATE TABLE usercompany(emailid varchar(255),company varchar(255),job varchar(255),startdate DATE, FOREIGN KEY (emailid) REFERENCES myuser(emailid));
~~~
~~~mysql
CREATE TABLE userdetails(emailid varchar(255),country varchar(255),title1 varchar(255),title2 varchar(255), PRIMARY KEY (emailid), FOREIGN KEY (emailid) REFERENCES myuser(emailid));
~~~
~~~mysql
CREATE TABLE usereducation(emailid varchar(255),college varchar(255),course varchar(255),startyear DATE, endyear DATE, FOREIGN KEY (emailid) REFERENCES myuser(emailid));
~~~

# Setting Up Frontend
- fork or copy the `frontend` repository to your system
- Make sure the `images`, `script` and `styles` folder are inside your frontend
- Open vscode and install Live server extension
- Got to `File`>`Open Folder` and Select the frontend folder
- Right click on the index.html and select Open with Live Server









