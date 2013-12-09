(function(){

asyncTest('executes provided command', 1, function() {
    kendo.queueAnimation(function() {
        start();
        ok(true);
    });
});

asyncTest('keeps commands in order', 2, function() {
    var i = 0;

    kendo.queueAnimation(function() {
        i ++;
        ok(true);
    });

    kendo.queueAnimation(function() {
        start();
        equal(i, 1);
    });
});

}());
