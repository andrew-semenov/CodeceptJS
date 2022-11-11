* [Important!](Important!)
* [Run tests locally](#Run-tests-locally)
* [Run tests on Docker](#Run-tests-inside-the-docker-container)
* [Check results of tests execution](Check-results-of-tests-execution)

# Important!
First of all you need tu run the Allure reporter
```
docker-compose up -d
```

--- 
## Run tests locally
Install project dependencies
```
npm install
```

Run all tests
```
npm run codeceptjsjs
```

Run a test
```
npm run codeceptjsjs tests/testing_challenges_test.js
```

---
## Run tests inside the docker container

Build a docker image
```
docker build -t tests .
```

Run tests inside a container 
```
docker run --net=host tests
```

## Check results of tests execution
In a browser, open the next URL
```
http://localhost:5252/
```