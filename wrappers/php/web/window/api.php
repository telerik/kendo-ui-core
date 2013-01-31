<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header" style="z-index:10000">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
             <button id="open" class="k-button">Open</button> / <button id="close" class="k-button">Close</button>
        </li>
        <li>
            <button id="refresh" class="k-button">Refresh</button>
        </li>
    </ul>
</div>

<?php
    $window = new \Kendo\UI\Window('window');

    $window->title('Rams\'s Ten Principles of Good Design')
           ->width('505px')
           ->height('315px')
           ->actions(array("Refresh", "Maximize", "Close"))
           ->content(array( "url" => "../../content/web/window/ajax/ajaxContent1.html"));

    echo $window->render();
?>

<script>
    $(document).ready(function() {
        var window = $("#window");

        $("#open").click( function (e) {
            window.data("kendoWindow").open();
        });

        $("#close").click( function (e) {
            window.data("kendoWindow").close();
        });

        $("#refresh").click( function (e) {
            window.data("kendoWindow").refresh();
        });
    });
</script>

<style scoped>
    #example {
        min-height: 400px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
