import grpc from 'grpc'
import protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('proto/users.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const proto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
import { UsersServiceProvider } from './db'

server.addService(proto.users.UsersService.service, {
    List(call, callback) {
        UsersServiceProvider.list(callback);
    },

    Get(call, callback) {
        UsersServiceProvider.get(call.request.user_id, callback)
    },

    Insert(call, callback) {
        console.log(`Received request to insert ${call.request.user_id}`)
        callback(null)
    },

    Remove(call, callback) {
        console.log(`Received request to remove ${call.request.user_id}`)
        callback(null)
    },
});


server.bind('0.0.0.0:50050', grpc.ServerCredentials.createInsecure());

server.start();
console.log('grpc server running on port:', '0.0.0.0:50050');