<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

$window = new \Kendo\UI\Window('window');

$window->title('Rams\'s Ten Principles of Good Design')
       ->width('615px')
       ->close('onClose')
       ->content(array(
           "url" => "../../content/web/window/ajax/ajaxContent.html"
        ));

    echo $window->render();
?>

<span id="undo" style="display:none" class="k-button">Click here to open the window.</span>

<script>
    function onClose() {
        $("#undo").show();
    }

    $(function() {
        $("#undo").click(function() {
            $("#window").data("kendoWindow").open();
            $("#undo").hide();
        });

        $("#window").data("kendoWindow").wrapper.find(".k-i-custom").click(function(e){
            alert("Custom action button clicked");
            e.preventDefault();
        });
    });
</script>

<style scoped>
    #example {
        min-height: 840px;
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
<?php require_once '../../include/footer.php'; ?>
