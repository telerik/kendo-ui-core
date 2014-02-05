(function() {
    var dataviz = kendo.dataviz,
        ChartContainer = dataviz.ChartContainer,
        Box = dataviz.Box2D,
        pane,
        container;    
    
    function setup(axes, box) {
        pane = {
            axes: axes,
            box: box || Box(1,1,100,100)
        };
        container = new ChartContainer({}, pane);
    }

    function setupAxis(lineBox, vertical) {
        return {
            lineBox: function() {
                return lineBox;
            },
            options: {
                vertical: vertical
            }
        };
    }
        
    (function() {
        module("chart container", {
            setup: function (){
                setup([setupAxis(Box(1,10, 1, 100), true)]);
            }        
        });  
            
        test("shouldClip returns false if the clip option of any of its children is false", function() {
            container.children = [{options: {clip: true}}, {options: {clip: false}}];
            ok(container.shouldClip() === false);    
        });

        test("shouldClip returns true if the clip option of its children is true", function() {
            container.children = [{options: {clip: true}}, {options: {clip: true}}];
            ok(container.shouldClip());    
        });

        test("destroy calls destroy on the children", 1, function() {
            container.children = [{ destroy: function() {
                ok(true);
            }}];
            container.destroy();
        });

        test("destroy calls destroy on the children", 1, function() {
            container.children = [{ destroy: function() {
                ok(true);
            }}];
            container.destroy();
        });
    })();
    
    (function(){
        module("chart container / clip box", {}); 
    
        test("calculates clip box", function() {
            setup([setupAxis(Box(1,10, 1, 100), true), setupAxis(Box(10,1, 100, 1), false)]);
            deepEqual(container._clipBox(), Box(10,10,100,100));
        }); 

        test("gets clip box coordinates from pane if there is no secondary axis", function() {
            setup([setupAxis(Box(1,10, 1, 100), true)], Box(1, 1, 100, 100));
            deepEqual(container._clipBox(), Box(1,10,100,100));
        });
    })();
    
    
    (function() {
        var view;
        
        module("chart container / view elements", {
            setup: function() {
                view = new ViewStub();
                setup([setupAxis(Box(1,10, 1, 100), true)]);
                container.getViewElements(view);
            }
        });

        test("creates clip path", function() {            
            equal(view.log.clipPath.length, 1);
        });
        
        test("does not create clip path if already created", function() {               
            container.getViewElements(view);
            equal(view.log.clipPath.length, 1);
        });
        
        test("creates group with clipPathId", function() {            
            equal(view.log.group.length, 1);
            equal(view.log.group[0].options.clipPathId, container.clipPathId);
        });
                
        test("sets clipBox", function() {                        
            ok(container.clipBox instanceof Box && container.clipBox !== undefined);
        });
        
    })();
    
})();