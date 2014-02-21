(function() {
    var dataviz = kendo.dataviz,
        LogarithmicAxis = dataviz.LogarithmicAxis,
        deepExtend = dataviz.deepExtend,
        defined = dataviz.defined,
        view,
        axis,
        chartBox = dataviz.Box2D(0, 0, 800, 600)
        TOLERANCE = 0.1;
        
    function createAxis(min, max, options) {
        axis = new LogarithmicAxis(min, max, options);
    }
    
    (function() {
        module("axis options", {});    
        
        test("throws error for non-positive crossing value", function() {
            try {
                createAxis(0.1, 1, {
                    axisCrossingValue: 0
                });
            } catch(e) {
                ok(true);
            }            
        });
        
        test("throws error for non-positive min options value", function() {
            try {
                createAxis(0.1, 1, {
                    min: 0
                });
            } catch(e) {
                ok(true);
            }            
        });
        
        test("throws error for non-positive max options value", function() {
            try {
                createAxis(0.1, 1, {
                    max: 0
                });
            } catch(e) {
                ok(true);
            }            
        });
        
        test("does not change minorUnit passed from the options", function() {
            createAxis(0.1, 100, {
                minorUnit: 2
            });
            equal(axis.options.minorUnit, 2);
        });
        
        test("sets minorUnit to majorUnit minus 1 by default", function() {
            createAxis(0.1, 100, {});
            equal(axis.options.minorUnit, 9);
        });    
        
        module("axis options / auto min", {});  
        
        test("does not change minimum value passed from the options", function() {
            createAxis(0.1, 100, {
                min: 10
            });
            equal(axis.options.min, 10);
        });

        test("sets min to 1 if series min is non-positive", function() {
            createAxis(0, 100, {});
            equal(axis.options.min, 1);
        });

        test("sets min to the lower whole power if narrowRange is false", function() {
            createAxis(0.9, 100, {
                narrowRange: false
            });
            equal(axis.options.min, 0.1);
        });        
        
        test("uses series min if narrowRange is true", function() {
            createAxis(0.9, 100, {
                narrowRange: true
            });
            equal(axis.options.min, 0.9);
        });
        
        module("axis options / auto max", {}); 
        
        test("does not change maximum value passed from the options", function() {
            createAxis(0.1, 100, {
                max: 10
            });
            equal(axis.options.max, 10);
        });

        test("sets max to the majorUnit if series max is non-positive", function() {
            createAxis(0, 0, {
                majorUnit: 2
            });
            equal(axis.options.max, 2);
        });

        test("adds 0.2 to the power if series max base power remainder is gt 0 and lt than 0.3", function() {
            createAxis(0.9, 18, {});
            close(axis.options.max, 28.5, TOLERANCE);
        }); 

        test("adds 0.2 to the power if series max base power remainder is gt 0.9", function() {
            createAxis(0.9, 80, {});
            close(axis.options.max, 126.8, TOLERANCE);
        });     
        
        test("sets max to the higher whole power if series max base power remainder is between 0.3 and 0.9", function() {
            createAxis(0.9, 70, {});
            equal(axis.options.max, 100);
        });    
    })();
    
    (function() {
        module("axis slot", {
            setup: function() {
                createAxis(1, 100, {});
                axis.reflow(chartBox);            
            }
        });        
        
        // test("returns undefined if first value is non-positive", function() {
            // var slot = axis.getSlot(1);
            // ok(!defined(slot));
        // });        
        
        module("axis slot / non-positive", {
            setup: function() {
                createAxis(1, 100, {});
                axis.reflow(chartBox);
            }        
        });
        
        test("returns undefined if first value is non-positive", function() {
            var slot = axis.getSlot(0, 1);
            ok(!defined(slot));
        });
        
        test("returns undefined if second value is non-positive", function() {
            var slot = axis.getSlot(1, 0);
            ok(!defined(slot));
        });
        
    })();
    
})();