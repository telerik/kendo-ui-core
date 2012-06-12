var kendo = {
    ui: {},
    mobile: { ui: {}},
    dataviz: {ui: {}}
};

# function trim(string) { return string.replace(/^\s+|\s+$/gm, '') } #

# data.forEach(function(theClass) {  #

# /* Class */ #
# if (theClass.methods.length) { #
#= theClass.name # = function() { };

#= theClass.name #.prototype = {

# theClass.methods.forEach(function(method) { #
    # var params = method.parameters.map(function(param) { return param.name }).join(","); #
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

    bind: function(event, callback) {
        /// <summary>
        /// Binds to a widget event.
        /// </summary>
        /// <param name="event" type="String">The event name</param>
        /// <param name="callback" type="Function">The callback to be executed when the event is triggered.</param>
    },

    unbind: function(event, callback) {
        /// <summary>
        /// Unbinds a callback from a widget event.
        /// </summary>
        /// <param name="event" type="String">The event name</param>
        /// <param name="callback" type="Function">The callback to be removed.</param>
    }
}

# } else { #
# /* Namespace */ #
#= theClass.name # = {};
# } #

# }); #

// vim:ft=javascript
