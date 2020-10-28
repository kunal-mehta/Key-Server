# Key-Server
A Node.js + Sqlite Example for creating a Key Assigning, Releasing logic


npm install
npm start to start the server using serverless capacbilities. It will list down all the endpoints too.

                                                                                    
   │   POST   | http://localhost:3000/dev/v1/key                                      │
   │   GET    | http://localhost:3000/dev/v1/key                                      │
   │   PATCH  | http://localhost:3000/dev/v1/key/{keyId}/unblock                      │
   │   DELETE | http://localhost:3000/dev/v1/key/{keyId}                              │
   │   PATCH  | http://localhost:3000/dev/v1/key/{keyId}/alive                        |

Scheduler at purgeSLAPassedKeys: keyserver-dev-purgeSLAPassedKeys will keep running every 60 secs to identify which keys are not used for more than 5 mins and will mark them deleted/purged.

npm test to unit test and check the code coverage


-------------------------|---------|----------|---------|---------|-------------------
File                     | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------------|---------|----------|---------|---------|-------------------
All files                |     100 |      100 |     100 |     100 |                   
 app/controller          |     100 |      100 |     100 |     100 |                   
  key.js                 |     100 |      100 |     100 |     100 |                   
 app/handlers            |     100 |      100 |     100 |     100 |                   
  main.js                |     100 |      100 |     100 |     100 |                   
 test                    |     100 |      100 |     100 |     100 |                   
  controller.key.test.js |     100 |      100 |     100 |     100 |                   
  handler.main.test.js   |     100 |      100 |     100 |     100 |                   
-------------------------|---------|----------|---------|---------|-------------------