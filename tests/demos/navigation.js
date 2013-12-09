(function() {
    module("demos navigation");

    function isValidJSON(file) {
        asyncTest(file + " is valid json", 1, function() {
            $.ajax({
                url: file,
                dataType: "text",
                success: function(content) {
                    try {
                        var result = JSON.parse(content);
                        ok(true);
                    } catch(ex) {
                        ok(false, "'" + file + "' contains invalid JSON");
                    }
                },

                complete: function() {
                    start();
                }
            });
        });
    }

    test('demos navigation', 0, function() {
        console.warn('SKIP: entire tests/demos/application.js - relies on global styles');
    });
    return;

    isValidJSON("/base/demos/mvc/App_Data/web.nav.json");
    isValidJSON("/base/demos/mvc/App_Data/dataviz.nav.json");
    isValidJSON("/base/demos/mvc/App_Data/mobile.nav.json");
})();
