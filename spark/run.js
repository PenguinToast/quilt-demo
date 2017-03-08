var Inf = require("github.com/PenguinToast/quilt-demo/inf");
var Spark = require("github.com/PenguinToast/quilt-demo/spark");

var nSparkWorkers = 3;

inf = Inf.New(nSparkWorkers + 1);
Spark.New(inf, nSparkWorkers);
