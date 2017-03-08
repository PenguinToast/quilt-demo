var HaProxy = require("github.com/quilt/haproxy/haproxy").Haproxy;
var Mongo = require("github.com/quilt/mongo/mongo");
var Node = require("github.com/quilt/node/node");
var Inf = require("github.com/PenguinToast/quilt-demo/inf");

var count = 4;
var mongo = new Mongo(count);
var app = new Node({
  nWorker: count,
  image: "quilt/mean-service",
  env: {
    PORT: "80",
    MONGO_URI: mongo.uri("mean-example")
  }
});
var haproxy = new HaProxy(count, app.services());

mongo.connect(mongo.port(), app);
app.connect(mongo.port(), mongo);
haproxy.public();

var inf = Inf.New(4);
inf.deploy(app);
inf.deploy(mongo);
inf.deploy(haproxy);
