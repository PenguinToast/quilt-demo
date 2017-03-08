var defaultCount = 4;

exports.New = function() {
    if (typeof count !== 'number') {
        count = defaultCount
    }

    var inf = createDeployment({
        namespace: "willsheu",
    });

    var machine = new Machine({
        provider: "Amazon",
        size: "m4.xlarge",
        sshKeys: githubKeys("PenguinToast"),
    });

    inf.deploy(machine.asMaster());
    inf.deploy(machine.asWorker().replicate(count));
    return inf
}
