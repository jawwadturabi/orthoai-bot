const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const Axios = require("axios")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('index.html'))

app.get("/", (req, res) => {
    Axios({
        method: 'post', url: 'https://3ykodeo02k.execute-api.us-west-2.amazonaws.com/dev/graphql', data:
            [
                {
                    "operationName": "registerMember",
                    "variables": {
                        "member": {
                            "displayName": "muhammadowais",
                            "email": "muhammad189@ranadev.io",
                            "password": "123456789",
                            "tenantId": 1007
                        }
                    },
                    "query": "mutation registerMember($member: RegisterInput!) {\n  register(input: $member) {\n    token\n    member {\n      contacts {\n        emails {\n          email\n          __typename\n        }\n        __typename\n      }\n      id\n      __typename\n    }\n    __typename\n  }\n}\n"
                }
            ]
    })
        .then((response) => {

            console.log("res is : ", response)
            res.send(response.body)
        })
        .catch(e => { res.send(e.stack); console.log("err is : ", e.stack) })
    // res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.Port || 3002, () => {
    console.log("server running")
})