<?php
require_once '../lib/Kendo/Autoload.php';
require_once '../include/header.php';
?>

<div id="apiOptions" class="box">
    <div class="box-col">
        <h4>Add Shape</h4>
        <ul class="options">
            <li>
                <label for="newShapeX" style="width: 30px;">X:</label>
                <input data-role="numerictextbox" id="newShapeX" data-bind="value: newShapeX" />
            </li> 
            <li>
                <label for="newShapeY" style="width: 30px;">Y:</label>
                <input data-role="numerictextbox" id="newShapeY" data-bind="value: newShapeY" />
            </li>                                    
            <li>                                       
                <button type="button" data-role="button" data-bind="click: addShape">Add</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Add Connection</h4>
        <ul class="options">
            <li>
                <label for="fromShapeIndex" style="width: 90px;">From Index:</label>
                <input data-role="numerictextbox" id="fromShapeIndex" data-min="0" data-format="n0" data-decimals="0" data-bind="value: fromShapeIndex" />
            </li> 
            <li>
                <label for="toShapeIndex" style="width: 90px;">To Index:</label>
                <input data-role="numerictextbox" id="toShapeIndex" data-min="0" data-format="n0" data-decimals="0" data-bind="value: toShapeIndex" />
            </li>                                    
            <li>                                       
                <button type="button" data-role="button" data-bind="click: addConnection">Add</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Remove:</h4>
        <ul class="options">
            <li>
                <button type="button" data-role="button" data-bind="click: remove">Remove Selected</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Select Shape</h4>
        <ul class="options">
            <li>
                <label for="selectShapeIndex">Select At:</label>
                <input data-role="numerictextbox" id="selectShapeIndex" data-min="0" data-format="n0" data-decimals="0" data-bind="value: selectShapeIndex" />
            </li>                                    
            <li>                                       
                <button type="button" data-role="button" data-bind="click: select">Select</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Zoom/Pan</h4>
        <ul class="options">
            <li>
                <input data-role="slider" id="zoom" data-min="0.1" data-max="2" data-small-step="0.1" data-bind="value: zoom, events: { change: zoomDiagram }" />
            </li>                                    
            <li>
                <label for="panX">Pan X:</label>
                <input data-role="numerictextbox" id="panX" data-bind="value: panX" />
            </li> 
            <li>
                <label for="panY">Pan Y:</label>
                <input data-role="numerictextbox" id="panY" data-bind="value: panY" />
            </li>                                    
            <li>                                       
                <button type="button" data-role="button" data-bind="click: pan">Pan</button>
            </li>
        </ul>
    </div>
</div>

<?php
$diagram = new \Kendo\Dataviz\UI\Diagram('diagram');
echo $diagram->render();
?>

<script>

    $(document).ready(function () {
        var diagram = $("#diagram").data("kendoDiagram");
        var shape1 = diagram.addShape({ x: 100, y: 100 });
        var shape2 = diagram.addShape({ x: 300, y: 100 });
        diagram.connect(shape1, shape2);

        var Point = kendo.dataviz.diagram.Point;

        var viewModel = kendo.observable({
            newShapeX: 0,
            newShapeY: 0,
            fromShapeIndex: 0,
            toShapeIndex: 0,
            selectShapeIndex: 0,
            zoom: 1,
            panX: 0,
            panY: 0,
            addShape: function () {
                diagram.addShape({ x: this.get("newShapeX"), y: this.get("newShapeY") });
            },
            addConnection: function () {
                var shapes = diagram.shapes;
                var total = shapes.length;
                var fromIndex = this.get("fromShapeIndex");
                var toIndex = this.get("toShapeIndex");
                if (fromIndex < total && toIndex < total) {
                    diagram.connect(shapes[fromIndex], shapes[toIndex]);
                }
            },
            remove: function () {
                diagram.remove(diagram.select());
            },
            select: function () {
                diagram.select(diagram.shapes[this.get("selectShapeIndex")]);
            },
            zoomDiagram: function () {
                diagram.zoom(this.get("zoom"));
            },
            pan: function () {
                diagram.pan(new Point(this.get("panX"), this.get("panY")));
            }
        });

        kendo.bind($("#apiOptions"), viewModel);
    });
</script>

<style type="text/css">
    #apiOptions label
    {
        display:inline-block;
    }
</style>

<?php require_once '../include/footer.php'; ?>
