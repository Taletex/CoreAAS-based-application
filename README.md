# CoreAAS-based-application
Definition of the digital twin of a smart factory by Asset Administration Shell and an application using it.


## Table of Contents
- [References](#References)
- [Screenshots](#screenshots)
- [Requirements](#Requirements)
- [Dependencies](#Dependencies)
- [Running for test](#Running-for-test)
- [Future developments](#Future-developments)


## References
References available (italian only) at:
- docs/UML



## Screenshots
- **Web Application**
![screenshot](screenshots/webapp1.png)



## Requirements
The application has the following requirements (needed to run the project)
Note: this app was successfully tested on Windows 10. The following links refer to Windows 10. If using a different Operative System, it is necessary to search and download the proper software. 
- **OPC UA CoreAAS based Server**:
  1. NodeJS (https://nodejs.org/it/)
  2. Typescript. Open a terminal and write:
		```
		npm install -g typescript
		```
  3. OPC UA CoreAAS Server. Open a terminal and write (from the root folder of the project):
		```
		cd aas_server
		npm install node-opcua-coreaas --save
		```
- **Web Application**:
  1. Nodejs.
  2. Http server. Open a terminal and write:
		```
		npm install -g http-server@0.9.0
		```



## Dependencies
The application has the following dependencies (libraries and packages)
- **OPC UA CoreAAS based Server**:
  1. node-opcua-coreaas https://github.com/OPCUAUniCT/node-opcua-coreaas.
- **Web Application**:
  1. AngularJS 1.6.9 https://angularjs.org/.
  2. Bootstrap 4.0.0 https://getbootstrap.com/docs/4.0/getting-started/download/.
  3. FontAwesome 5.6.1 https://fontawesome.com/.



## Running for test
After having installed all the requirements it is possible to clone this project and run it by following the next steps. 

#### 1 - Clone the project from master branch
Open a terminal and write:
```
git clone https://github.com/Taletex/CoreAAS-based-application
```

#### 2 - Build and run the OPC UA CoreAAS based Server
Open a terminal and write (from the root folder of the project):
```
cd aas_server
npm run uaIndustryServer
```

#### 3 - Run the Web Application
Open a terminal and write (from the root folder of the project):
```
cd aas_webapp
http-server -o
```
A new browser tab at the address where the web application is running will open.



## Future developments
- TODO
