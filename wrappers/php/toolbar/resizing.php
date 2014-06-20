<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$toolbar = new \Kendo\UI\ToolBar('toolbar');

$toolbar->addItem(
    array("template" => "<img src='../content/web/toolbar/user.png' class='user-image' />", "overflow" => "never"),
    array("type" => "button", "text" => "Send", "primary" => true, "overflow" => "never"),
    array("type" => "button", "text" => "Discard", "overflow" => "never"),
    array("type" => "separator"),
    array(
        "type" => "splitButton",
        "imageUrl" => "../content/web/toolbar/save.png",
        "text" => "Save",
        "menuButtons" => array(
            array("imageUrl" => "../content/web/toolbar/save.png", "text" => "Save as"),
            array("imageUrl" => "../content/web/toolbar/upload.png", "text" => "Upload to drive")
        )
    ),
    array(
        "type" => "splitButton",
        "imageUrl" => "../content/web/toolbar/reply.png",
        "text" => "Reply",
        "menuButtons" => array(
            array("imageUrl" => "../content/web/toolbar/save.png", "text" => "Reply All"),
            array("imageUrl" => "../content/web/toolbar/upload.png", "text" => "Forward"),
            array("imageUrl" => "../content/web/toolbar/upload.png", "text" => "Reply & Delete")
        )
    ),
    array("type" => "separator"),
    array("template" => "<span><label>Contacts:</label><input id='contacts' style='width: 150px;' /></span>", "overflow" => "never"),
    array("template" => "<div><label>Labels:</label><input id='labels' style='width: 150px;' /></div>", "overflowTemplate" => "<span></span>"),
    array("type" => "separator"),
    array(
        "type" => "buttonGroup",
        "buttons" => array(
            array("imageUrl" => "../content/web/toolbar/done.png", "text" => "Done", "togglable" => true, "group" => "category"),
            array("imageUrl" => "../content/web/toolbar/todo.png", "text" => "To Do", "togglable" => true, "group" => "category"),
            array("imageUrl" => "../content/web/toolbar/important.png", "text" => "Important", "togglable" => true, "group" => "category")
        )
    )
);

?>

<script>
    $(document).ready(function() {

    });
</script>

<div id="example">
    <div class="box">
        <h4>Info</h4>
        <p>Resize the window and watch how ToolBar's items show or hide according to the available space.</p>
        <p>More information regarding the resizable functionality can be found in the <a href="">Getting Started topic</a>.</p>
        <span id="undo" style="display:none" class="k-button">Click here to open the window.</span>
    </div>
    <div id="window">
        <?php echo $toolbar->render(); ?>
        <div id="content">
            <div class="demo-section k-header">
                <ul>
                    <li><label>To:</label> <input type="text" class="k-textbox" id="to"/></li>
                    <li><label>Title:</label> <input type="text" class="k-textbox" id="title"/></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        $("#window").kendoWindow({
            resizable: true,
            width: 820,
            height: 250,
            minWidth: 410,
            maxWidth: 1200,
            title: "Message",
            close: function() {
                $("#undo").show();
            }
        });

        $("#undo").bind("click", function() {
            $("#window").data("kendoWindow").open();
            $("#undo").hide();
        });

        $("#contacts").kendoDropDownList({
            optionLabel: "Ann Devon",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Ana Trujillo", value: 1 },
                { text: "Antonio Moreno", value: 2 },
                { text: "Christina Berglund", value: 3 },
                { text: "Felipe Izquierdo", value: 4 }
            ]
        });

        $("#labels").kendoDropDownList({
            optionLabel: "Forums",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Follow up", value: 1 },
                { text: "Misc", value: 2 },
                { text: "Priority", value: 3 },
                { text: "Deleted Messages", value: 4 }
            ]
        });

        $("#masked").kendoNumericTextBox();

        $("#toolbar").data("kendoToolBar").resize();
    });
</script>

<style>
    div.k-window-content {
        padding: 0;
    }

    #toolbar {
        border-width: 0 0 1px;
    }
    .user-image {
        margin: 0 .5em;
    }
    #example {
        height: 500px;
    }
    #example .box p {
        padding-bottom: 5px;
    }
    #content .demo-section {
        margin: 0;
        padding: 10px;
        border-width: 0 0 1px 0;
    }
    #content .demo-section label {
        display: inline-block;
        width: 40px;
        text-align: right;
        line-height: 2.5em;
        vertical-align: middle;
    }
    #content .demo-section input {
        width: 80%;
    }
</style>

<?php require_once '../include/footer.php'; ?>
