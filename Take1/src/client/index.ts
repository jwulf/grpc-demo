const PROTO_PATH = 'proto/users.proto'

import grpc = require('grpc')
import protoLoader = require('@grpc/proto-loader')
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
var user_proto = grpc.loadPackageDefinition(packageDefinition).users;

function main() {
    var client = new user_proto.UsersService('localhost:50050',
        grpc.credentials.createInsecure());
    var user_id;
    if (process.argv.length >= 3) {
        user_id = process.argv[2];
    } else {
        user_id = 1;
    }
    client.Get({ user_id }, function (err, response) {
        if (err) {
            console.error('Error: ' + err)
        } else {
            console.log('\n === User: ===\n', response.user)
        }
    });
    client.List({}, (err, res) => {
        console.log('\n === All Users: ===\n', res.user)
    } )
}

main();