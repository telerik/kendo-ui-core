var kendo = {
    ui: {},
    mobile: { ui: {}},
    dataviz: {ui: {}}
};

# function trim(string) { return string.replace(/^\s+|\s+$/gm, '') } #

# data.forEach(function(theClass) {  #

# /* Class */ #
# if (theClass.isClass) { #
#= theClass.name # = function() { };

#= theClass.name #.prototype = {

# var bind = false, unbind = false; #
# theClass.methods.forEach(function(method) { #
    # var params = method.parameters.map(function(param) { return param.name }).join(","); #
    # if (method.name === "bind") { bind = true }; #
    # if (method.name === "unbind") { unbind = true }; #
    #= method.name#: function(#= params #) {
        /// <summary>
        /// #= trim(method.description).replace(/\n/g, "\n/// ")  #
        /// </summary>
# method.parameters.forEach(function(param) { #
        /// <param name="#= param.name #" type="#=param.type #" #= param.type === "Element" ? 'domElement="true"' : '' #>#= trim(param.description).replace(/\n/g, " ") #</param>
# }) #
# if (method.returns) { #
        /// <returns type="#= method.returns #">#= trim(method.returnsDescription) #</returns>
# } #

        },
# }); #

    # if (!bind) { #
    bind: function(event, callback) {
        /// <summary>
        /// Binds to a widget event.
        /// </summary>
        /// <param name="event" type="String">The event name</param>
        /// <param name="callback" type="Function">The callback to be executed when the event is triggered.</param>
    },
    # } #

    # if (!unbind) { #
    unbind: function(event, callback) {
        /// <summary>
        /// Unbinds a callback from a widget event.
        /// </summary>
        /// <param name="event" type="String">The event name</param>
        /// <param name="callback" type="Function">The callback to be removed.</param>
    }
    # } else { #
        self: null
    # } #

};

$.fn.get#= theClass.plugin.replace("kendo", "Kendo") # = function() {
    /// <summary>
    /// Returns a reference to the #= theClass.name # widget, instantiated on the selector.
    /// </summary>
    /// <returns type="#= theClass.name #">The #= theClass.name # instance (if present).</returns>
};

$.fn.#= theClass.plugin # = function(options) {
    /// <summary>
    /// Instantiates a #= theClass.name # widget based the DOM elements that match the selector.
    # if (theClass.configuration.length) { #
    /// &\#10;Accepts an object with the following configuration options:
    /// &\#10;
    # theClass.configuration.forEach(function(option) { if (option.name.indexOf(".") > -1) { return; } #/// &\#10;#= option.name # — #= option.type.replace(/\*/g, '') #
    ///&\#10;#= trim(option.description).replace(/\n/g, "\n/// &\\#10;").replace(/<(?:.|\n)*?>/gm, '') #
    ///&\#10;
    # }); } #/// </summary>
    /// <param name="options" type="Object">
    /// The widget configuration options
    /// </param>
};

# } else { #
# /* Namespace */ #
#= theClass.name # = {};
# } #

# }); #

// vim:ft=javascript
