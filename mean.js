var HaProxy = require("github.com/NetSys/quilt/specs/haproxy/haproxy").Haproxy;
var Mongo = require("github.com/NetSys/quilt/specs/mongo/mongo");
var Node = require("github.com/NetSys/quilt/specs/node/node");
var Inf = require("github.com/ejj/quilt-demo/inf");

var mongo = new Mongo(3);
var app = new Node({
  nWorker: 3,
  image: "quilt/mean-service",
  env: {
    PORT: "80",
    MONGO_URI: mongo.uri("mean-example")
  }
});
var haproxy = new HaProxy(3, app.services());

mongo.connect(mongo.port(), app);
app.connect(mongo.port(), mongo);
haproxy.public();

var inf = Inf.New(4);
inf.deploy(app);
inf.deploy(mongo);
inf.deploy(haproxy);
