(function(f, define){
    define([ "./kendo.data"], f);
})(function(){

var __meta__ = {
	id: "ganttchart",
    name: "GanttChart",
    category: "web",
    description: "The Gantt-chart component.",
    depends: [ "data" ]   
};

(function($, undefined) {

	var kendo = window.kendo;
    var Widget = kendo.ui.Widget;

	var GanttChart = Widget.extend({
		init: function(element, options) {
            Widget.fn.init.call(this, element, options);
			
			kendo.notify(this);
		},
		
		events: [ ],

        options: {
			name: "GanttChart"
        }
	});
	
	kendo.ui.plugin(GanttChart);	
	
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });