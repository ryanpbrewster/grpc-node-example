const grpc = require("grpc");
const proto = grpc.load("hello.proto");

const server = new grpc.Server();
server.addService(proto.hello.HelloWorld.service, {
  capitalize: function(call, cb) {
    console.log(call.request);
    cb(null, { raw: call.request.raw.toUpperCase() });
  }
});
server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
server.start();
