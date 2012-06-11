var kendo = {
    ui: {},
    mobile: { ui: {}},
    dataviz: {ui: {}}
};

# function trim(string) { return string.replace(/^\s+|\s+$/gm, '') } #

# data.forEach(function(theClass) {  #

#= theClass.name # = function() { };

#= theClass.name #.prototype = {
# theClass.methods.forEach(function(method) { #
    # var params = method.parameters.map(function(param) { return param.name }).join(","); #
    #= method.name#: function(#= params #) {
    /// <summary>
    /// #= trim(method.description).replace(/\n/g, "\n/// ")  #
    /// </summary>
# method.parameters.forEach(function(param) { #
    /// <param name="#= param.name #" type="#=param.type #">#= trim(param.description).replace(/\n/g, " ") #</param>
# }) #
# if (method.returns) { #
    /// <returns type="#= method.returns #">#= trim(method.returnsDescription) #</returns>
# } #

        },
# }); #
}
# }); #

// vim:ft=javascript
