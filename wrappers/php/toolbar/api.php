<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$toolbar = new \Kendo\UI\ToolBar('toolbar');

$toolbar->addItem(
    array(
        "type" => "buttonGroup",
        "buttons" => array(
            array("id" => "play", "text" => "play", "togglable" => true, "group" => "player"),
            array("id" => "pause", "text" => "pause", "togglable" => true, "group" => "player", "selected" => true),
            array("id" => "stop", "text" => "stop", "togglable" => true, "group" => "player")
        )
    ),
    array("type" => "button", "text" => "repeat", "id" => "repeat", "togglable" => true),
    array(
        "type" => "splitButton",
        "id" => "save",
        "text" => "save",
        "menuButtons" => array(
            array("id" => "favourites", "text" => "add to favourites"),
            array("id" => "later", "text" => "listen later"),
            array("id" => "download", "text" => "download")
        )
    ),
    array("type" => "button", "text" => "delete", "id" => "delete")
);

?>

<div id="example">

    <div class="box">
        <div class="box-col">
            <h4>Get selected action</h4>
            <ul class="options">
                <li>
                    <button class="getSelected k-button">Get selected action</button>
                </li>
                <li>
                    Selected: <span id="selectedFromGroup"></span>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>Enable / Disable</h4>
            <ul class="options">
                <li>
                    <button class="toggleRepeat k-button">Enable/Disable Repeat</button>
                </li>
            </ul>
        </div>
        <div class="box-col">
            <h4>Add / Remove</h4>
            <ul class="options">
                <li>
                    <button class="removeItem k-button">Remove by ID</button>
                    <input type="text" value="#delete" id="forRemoval" class="k-textbox"/> 
                </li>
                <li>
                    <button class="addItem k-button">Add new button</button>
                    <label>Text: <input type="text" value="New Button" id="btnText" class="k-textbox"/></label>
                    <label>ID: <input type="text" value="newButton" id="btnID" class="k-textbox"/></label>
                    <label>Togglable: <input type="checkbox" id="btnTogglable"/></label>
                </li>
                <li>
                    <button class="addSplitButton k-button">Add new SplitButton</button>
                </li> 
                <li>
                    <button class="addButtonGroup k-button">Add new ButtonGroup</button>
                </li>
            </ul>
        </div>
    </div>

    <?php echo $toolbar->render(); ?>

</div>

<script>
    $(document).ready(function() {
        $(".getSelected").click(function() {
            var toolbar = $("#toolbar").data("kendoToolBar"),
                selected;

            selected = toolbar.getSelectedFromGroup("player");
            $("#selectedFromGroup").text(selected.text());
        });

        $(".toggleRepeat").click(function() {
            var toolbar = $("#toolbar").data("kendoToolBar"),
                repeatButton = $("#repeat"),
                isDisabled = repeatButton.hasClass("k-state-disabled");

            toolbar.enable(repeatButton, isDisabled);
        });

        $(".removeItem").click(function() {
            var toolbar = $("#toolbar").data("kendoToolBar"),
                id = $("#forRemoval").val();

            toolbar.remove(id);
        });

        $(".addItem").click(function() {
            var toolbar = $("#toolbar").data("kendoToolBar"),
                text = $("#btnText").val(),
                id = $("#btnID").val(),
                togglable = $("#btnTogglable").prop("checked");

            toolbar.add({ type: "button", text: text, id: id, togglable: togglable });
        });

        $(".addSplitButton").click(function() {
            var toolbar = $("#toolbar").data("kendoToolBar");

            toolbar.add({
                type: "splitButton",
                text: "New SplitButton",
                menuButtons: [
                    { text: "Option 1" },
                    { text: "Option 2" }
                ]
            });
        });

        $(".addButtonGroup").click(function() {
            var toolbar = $("#toolbar").data("kendoToolBar");

            toolbar.add({
                type: "buttonGroup",
                buttons: [
                    { text: "Left" },
                    { text: "Middle" },
                    { text: "Right" }
                ]
            });
        });
    });
</script>

<style>
    #toolbar {
        margin: 0 auto;
    }
    #selectedFromGroup {
        font-weight: bold;
        font-color: #000;
    }
</style>

<?php require_once '../include/footer.php'; ?>
