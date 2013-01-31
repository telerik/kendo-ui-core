<?php

require_once '../../include/header.php';
require_once '../../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
    <span class="configHead">Animation Settings</span>
    <ul class="options">
        <li>
            <input id="toggle" name="animation" type="radio" /> <label for="toggle">toggle animation</label>
        </li>
        <li>
            <input id="expand" name="animation" type="radio" checked="checked" /> <label for="expand">expand animation</label>
        </li>
        <li>
            <input id="opacity" type="checkbox" checked="checked" /> <label for="opacity">animate opacity</label>
        </li>
    </ul>
</div>

<div class="history">
<?php
    $panelbar = new \Kendo\UI\PanelBar('panelbar');

    $today = new \Kendo\UI\PanelBarItem("Today");
    $today->expanded(true)
            ->addItem(
                array("text" => "Jane King"),
                array("text" => "Bob Fuller"),
                array("text" => "Lynda Kallahan"),
                array("text" => "Matt Sutnar")
            );

    $yesterday = new \Kendo\UI\PanelBarItem("Today");
    $yesterday
            ->addItem(
                array("text" => "Stewart "),
                array("text" => "Jane King"),
                array("text" => "Steven"),
                array("text" => "Ken Stone")
            );

    $wednesday = new \Kendo\UI\PanelBarItem("Wednesday, February 01, 2012");
    $wednesday->addItem(
            array("text" => "Jane King"),
            array("text" => "Lynda Kallahan"),
            array("text" => "Todd "),
            array("text" => "Bob Fuller")
        );

    $tuesday = new \Kendo\UI\PanelBarItem("Tuesday, January 31, 2012");
    $tuesday->addItem(
            array("text" => "Emily Davolio"),
            array("text" => "Matt Sutnar"),
            array("text" => "Bob Fuller"),
            array("text" => "Jenn Heinlein")
        );

    $monday = new \Kendo\UI\PanelBarItem("Monday, January 30, 2012");
    $monday->addItem(
            array("text" => "Matt Sutnar"),
            array("text" => "Joshua"),
            array("text" => "Michael"),
            array("text" => "Jenn Heinlein")
        );

    $panelbar->dataSource(array($today, $yesterday, $wednesday, $tuesday, $monday));

    echo $panelbar->render();
?>
    <div class="bottom"></div>
</div>
<script>
    $(document).ready(function() {
        var original = $("#panelbar").clone(true);
        original.find(".k-state-active").removeClass("k-state-active");

        $(".configuration input").change( function() {
            var panelBar = $("#panelbar"),
                clone = original.clone(true);

            panelBar.data("kendoPanelBar").collapse($("#panelbar .k-link"));

            panelBar.replaceWith(clone);

            initPanelBar();
        });

        var initPanelBar = function () {
            $("#panelbar").kendoPanelBar({ animation: { expand: { effects: getEffects()}} });
        };

        var getEffects = function () {
            return (($("#expand")[0].checked ? "expand:vertical " : "") +
                    ($("#opacity")[0].checked ? "fadeIn" : "")) || false;
        };
    });
</script>

<style scoped>
    .history {
        width: 252px;
        margin: 20px auto;
        padding: 36px 0 0 0;
        background: url('../../content/web/panelbar/history.png') transparent no-repeat 0 0;
    }
    .bottom {
        width: 252px;
        height: 9px;
        background: url('../../content/web/panelbar/history.png') transparent no-repeat 0 -35px;
    }
</style>

<?php require_once '../../include/footer.php'; ?>
