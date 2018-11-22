const grpc = require("grpc");
const proto = grpc.load("hello.proto");

// grpc.setLogVerbosity(grpc.logVerbosity.DEBUG);

async function main() {
  for (let i=0; i < 10; i++) {
    console.time(i);
    const client = new proto.hello.HelloWorld("localhost:50051", grpc.credentials.createInsecure());
    let result = await new Promise(resolve => {
      client.capitalize({ raw: `foo bar baz #${i}` }, (err, resp) => resolve(err || resp));
    });
    console.log(result);
    console.timeEnd(i);
  }
}

main().catch(err => {
  console.error(err);
});
