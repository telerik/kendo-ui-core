$("table").kendo("grid", { 
    data: [] 
    }, function() { 
        alert("grid initialized"); 
    }
);

$.fn.kendo = function(name, options, callback) {
    var that = this;

    kendo.loader[name](function() {
    $(that).each(function() {
        $(this)["kendo"+name](options);
        callback();
});
    });
}



kendo.loader.grid();

$(document).ready(function() {
    $("table").kendoGrid( { data: [] } );
});
