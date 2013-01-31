<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

    $window = new \Kendo\UI\Window('window');

    $window->title('Rams\'s Ten Principles of Good Design')
           ->width('630px')
           ->height('315px')
           ->actions(array("Refresh", "Close"))
           ->content(array( "url" => "../../content/web/window/ajax/ajaxContent1.html"))
           ->open("onOpen")
           ->close("onClose")
           ->activate("onActivate")
           ->deactivate("onDeactivate")
           ->refresh("onRefresh")
           ->resize("onResize")
           ->dragstart("onDragStart")
           ->dragend("onDragEnd");

    echo $window->render();
?>


<span id="undo" style="display:none" class="k-group">Click here to open the window.</span>

<script>
    function onOpen(e) {
        kendoConsole.log("event :: open");
    }

    function onClose(e) {
        $("#undo").show();
        kendoConsole.log("event :: close");
    }

    function onActivate(e) {
        kendoConsole.log("event :: activate");
    }

    function onDeactivate(e) {
        kendoConsole.log("event :: deactivate");
    }

    function onRefresh(e) {
        kendoConsole.log("event :: refresh");
    }

    function onResize(e) {
        kendoConsole.log("event :: resize");
    }

    function onDragStart(e) {
        kendoConsole.log("event :: dragstart");
    }

    function onDragEnd(e) {
        kendoConsole.log("event :: dragend");
    }

    $("#undo")
        .bind("click", function() {
            $("#window").data("kendoWindow").open();
            $("#undo").hide();
        });
</script>

<style scoped>
    .console {
        margin-top: 400px;
    }

    #undo {
        text-align: center;
        position: absolute;
        white-space: nowrap;
        border-width: 1px;
        border-style: solid;
        padding: 2em;
        cursor: pointer;
    }
</style>

<br/>
<div class="console"></div>

<?php require_once '../../include/footer.php'; ?>
