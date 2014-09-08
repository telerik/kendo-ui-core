(function(f, define){
    define([ "./kendo.dom", "./kendo.data" ], f);
})(function(){

var __meta__ = {
    id: "treelist",
    name: "TreeList",
    category: "web",
    description: "",
    depends: [ "dom", "data" ]
};

(function($, undefined) {
    var data = kendo.data;
    var extend = $.extend;
    var HierarchicalDataSource = data.HierarchicalDataSource;

    var TreeListDataSource = HierarchicalDataSource.extend({
        init: function(options) {
            var children = kendo.getter("schema.model.children", true)(options || {});
            if (children) {
                throw new Error("TreeListDataSource can only be bound to homogeneous data.");
            }

            HierarchicalDataSource.fn.init.call(this, options);
        }
    });

    extend(true, kendo.data, {
        TreeListDataSource: TreeListDataSource
    });
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
