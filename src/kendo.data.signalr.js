kendo_module({
    id: "data.signalr",
    name: "SignalR",
    category: "framework",
    depends: [ "core" ],
    hidden: true
});

(function() {
    var operations = { create: "Create", update: "Update", destroy: "Destroy" };

    kendo.data.transports.signalr = kendo.data.RemoteTransport.extend({
        init: function (options) {
            options = options || {};

            var promise = options.promise;

            if (!promise) {
                throw new Error('The "promise" option must be set.');
            }

            if (typeof promise.done != "function" || typeof promise.fail != "function") {
                throw new Error('The "promise" option must be a Promise.');
            }

            this.promise = promise;

            var hub = options.hub;

            if (!hub) {
                throw new Error('The "hub" option must be set.');
            }

            if (typeof hub.on != "function" || typeof hub.invoke != "function") {
                throw new Error('The "hub" option is not a valid SignalR hub proxy.');
            }

            this.hub = hub;

            kendo.data.RemoteTransport.fn.init.call(this, options);
        },
        push: function(options) {
            var client = this.options.client || {};

            function push(operation) {
                return function(result) {
                    options["push" + operation](result);
                };
            }

            for (var operation in operations) {
                if (client[operation]) {
                    this.hub.on(client[operation], push(operations[operation]));
                }
            }
        }
    });
})();
