# Running the sample
 - `npm install`
 - In one terminal: `node server.js`
 - In a second terminal: `node client.js`

Expectation: fast, 10 iterations in < 1s
Reality: expontential backoff

# Observation
The server is set up to run on `127.0.0.1:50051` and the client is set to
`localhost:50051`. Changing these to match (in either direction) resolves the
issue.
