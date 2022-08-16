var request = require("request");
var url = require("url");
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Node_learning:node123@cluster0.7tx6o.mongodb.net/?retryWrites=true&w=majority";

var dbo;
MongoClient.connect(uri, (err, db) => {
  if (!err) {
    console.log("DB connected");
    dbo = db.db("Linkedin");
  } else {
    console.log("db connection fail");
  }
});

const authcode = async (req, res) => {
  const authData = {
    code: req.body.code,
  };

  await dbo.collection("linkedin").insertOne(authData, (err, data) => {
    if (!err) {
      res.json({
        status: 200,
        msg: "authData added",
        data: req.body,
      });

      dbo
        .collection("linkedin")
        .findOne({ _id: data.insertedId }, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            const authCode = data.code;
            console.log(authCode);
            request.post(
              {
                url: "https://www.linkedin.com/oauth/v2/accessToken",
                form: {
                  grant_type: "authorization_code",
                  code: authCode,
                  redirect_uri:
                    "https://26e0-2402-3a80-8aa-7b07-54be-fdfe-a50e-d7bc.in.ngrok.io",
                  client_id: "77qftgrc4v5tjo",
                  client_secret: "DHTyHXPDeBUbxwhX",
                },
              },
              (err, res, data) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(JSON.parse(data).access_token);
                  const token = JSON.parse(data).access_token;
                  request.get(
                    {
                      url: "https://api.linkedin.com/v2/me",
                      headers: { Authorization: "Bearer " + token },
                    },
                    (err, res, data) => {
                      if (err) {
                        console.log(err);
                      } else {
                        console.log(JSON.parse(data));
                        User_id = JSON.parse(data).id;
                        FirstName = JSON.parse(data).localizedFirstName;
                        LastName = JSON.parse(data).localizedLastName;
                        console.log(User_id);
                        console.log(FirstName);
                        console.log(LastName);
                      }
                    }
                  );
                }
              }
            );
          }
        });
    } else {
      console.log(err);
      res.json({ status: 401, msg: "err", data: err });
    }
  });
};

// const handler = (event, context, callback) => {
//   const done = (err, res) =>
//     callback(null, {
//       statusCode: err ? " 400" : " 302",
//       body: err ? err.message : JSON.stringify(res),
//       headers: {
//         // " Location": "https://api-university.com/newsletter/thankyou/",
//         "Content-Type": " text/html",
//         "Access-Control-Allow-Methods":
//           " DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT",
//         // "Access-Control-Allow-Headers":
//         //   "Content-Type, X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
//         "Access-Control-Allow-Origin": "*",
//       },
//     });
//   if (event) {
//     switch (event.httpMethod) {
//       case "GET":
//         if (
//           event &&
//           event.queryStringParameters &&
//           event.queryStringParameters.code &&
//           event.queryStringParameters.state
//         ) {
//           var state = decodeURIComponent(event.queryStringParameters.state);
//           var code = decodeURIComponent(event.queryStringParameters.code);
//           console.log(state);
//           main(code, state, done);
//         } else {
//           console.log(
//             "ERROR: Malformed query parameters. Expected code and state."
//           );
//           done(
//             new Error(
//               "<h1>Something went wrong. Please go back and use the email signup instead. </h1>"
//             )
//           );
//           break;
//         }
//     }
//   }
// };

module.exports = { authcode };
