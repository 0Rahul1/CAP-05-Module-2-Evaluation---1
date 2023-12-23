

// Do not forget to export the server.
// e.g => module.exports = server;
const http = require("http")

const server = http.createServer((req, res)=>{

if(req.url=="/"){

res.end("Welcome to the Home Page") }else if(req.url == "/comments"){

res.end("this is comment section")

}else if(req.url == "/user"){

res.end("this is users data")

}

})

server. Listen(8080, ()=>{

console.Log("server is running on port sese")
})
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');
const dns = require('dns');
const yodasay = require('yodasay');

const server = {};

// ... (previous route handlers)

module.exports = server;
server.homeRoute = (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Welcome to the Home Page</h1>');
  };
  server.gencountRoute = (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        res.end(err.toString());
      } else {
        const jsonData = JSON.parse(data);
        const maleCount = jsonData.filter(person => person.gender === 'Male').length;
        const femaleCount = jsonData.filter(person => person.gender === 'Female').length;
  
        const timestamp = new Date().toString();
        const logMessage = `The initial Male count is ${maleCount} and Female count is ${femaleCount} at ${timestamp}\n`;
  
        fs.appendFile('logs.txt', logMessage, (err) => {
          if (err) {
            res.end(err.toString());
          } else {
            res.end('The count has been updated in the logs file');
          }
        });
      }
    });
    server.addnewRoute = (req, res) => {
        const id = crypto.randomBytes(8).toString('hex');
        const firstName = os.userInfo().username;
        const lastName = os.userInfo().username;
        const email = 'example@example.com';
        const gender = 'Male'; // You can choose 'Female' as well
      
        fs.readFile('data.json', 'utf8', (err, data) => {
          if (err) {
            res.end(err.toString());
          } else {
            const jsonData = JSON.parse(data);
            const newUser = { id, first_name: firstName, last_name: lastName, email, gender };
            jsonData.push(newUser);
      
            fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
              if (err) {
                res.end(err.toString());
              } else {
                res.end('The data has been updated, go and check the data file');
              }
            });
          }
        });
      };
      server.peopleRoute = (req, res) => {
        try {
          const jsonData = fs.readFileSync('data.json', 'utf8');
          const peopleData = JSON.parse(jsonData);
      
          const peopleString = peopleData.map(person => {
            return `First Name: ${person.first_name} Last Name: ${person.last_name} Gender: ${person.gender} Email: ${person.email}`;
          }).join('\n');
      
          fs.writeFileSync('people.txt', peopleString);
          res.end('The file has been created and data has been entered');
        } catch (err) {
          res.end(err.toString());
        }
      };
      server.addressRoute = (req, res) => {
        dns.resolve4('masaischool.com', (err, addresses) => {
          if (err) {
            res.end(err.toString());
          } else {
            const ipAddress = addresses[0];
            const family = 'IPv4';
            const logMessage = `URL: masaischool.com IP Address: ${ipAddress} and Family is ${family}\n`;
      
            fs.appendFile('logs.txt', logMessage, (err) => {
              if (err) {
                res.end(err.toString());
              } else {
                res.end('Logs File has been updated');
              }
            });
          }
        });
      };
      server.yodaRoute = (req, res) => {
        try {
          const peopleData = fs.readFileSync('people.txt', 'utf8');
          const yodaResponse = yodasay.say({ text: peopleData });
      
          fs.appendFile('logs.txt', yodaResponse + '\n', (err) => {
            if (err) {
              res.end(err.toString());
            } else {
              res.end(yodaResponse);
            }
          });
        } catch (err) {
          res.end(err.toString());
        }
      };
      
      module.exports = server;