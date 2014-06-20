<?php
require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

$toolbar = new \Kendo\UI\ToolBar('toolbar');

$button1 = new \Kendo\UI\ToolBarItem();
$button1->type('button');
$button1->id('button1');
$button1->text('Button 1');
$button1->click('buttonClickHandler');

$button2 = new \Kendo\UI\ToolBarItem();
$button2->type('button');
$button2->id('button2');
$button2->text('Button 2');
$button2->click('buttonClickHandler');

$separator = new \Kendo\UI\ToolBarItem();
$separator->type('separator');

$toggle1 = new \Kendo\UI\ToolBarItem();
$toggle1->type('button');
$toggle1->id('toggle1');
$toggle1->text('Toggle 1');
$toggle1->togglable(true);
$toggle1->toggle('buttonToggleHandler');

$toggle2 = new \Kendo\UI\ToolBarItem();
$toggle2->type('button');
$toggle2->id('toggle2');
$toggle2->text('Toggle 2');
$toggle2->togglable(true);
$toggle2->toggle('buttonToggleHandler');

$splitButton = new \Kendo\UI\ToolBarItem();
$splitButton->type('splitButton');
$splitButton->id('mainButton');
$splitButton->text('Split Button');
$splitButton->click('splitButtonClickHandler');
$splitButton->addMenuButton(
    array("text" => "Action 1", "id" => "action1"),
    array("text" => "Action 2", "id" => "action2"),
    array("text" => "Action 3", "id" => "action3")
);

$buttonGroup = new \Kendo\UI\ToolBarItem();
$buttonGroup->type('buttonGroup');

$buttonGroupItem = new \Kendo\UI\ToolBarItemButton();
$buttonGroupItem->id('radio1');
$buttonGroupItem->text('Radio 1');
$buttonGroupItem->togglable(true);
$buttonGroupItem->toggle('buttonToggleHandler');

$buttonGroup->addButton($buttonGroupItem);

$buttonGroupItem->id('radio2');
$buttonGroupItem->text('Radio 2');
$buttonGroupItem->togglable(true);
$buttonGroupItem->toggle('buttonToggleHandler');

$buttonGroup->addButton($buttonGroupItem);

$buttonGroupItem->id('radio3');
$buttonGroupItem->text('Radio 3');
$buttonGroupItem->togglable(true);
$buttonGroupItem->toggle('buttonToggleHandler');

$buttonGroup->addButton($buttonGroupItem);

$overflowButton = new \Kendo\UI\ToolBarItem();
$overflowButton->type('button');
$overflowButton->id('overflowButton');
$overflowButton->text('Overflow Button');
$overflowButton->overflow("always");

$toolbar->addItem(
    $button1,
    $button2,
    $separator,
    $toggle1,
    $toggle2,
    $separator,
    $splitButton,
    $separator,
    $buttonGroup,
    $overflowButton
);

$toolbar->click('onClick');
$toolbar->toggle('onToggle');
$toolbar->overflowOpen('onOverflowOpen');
$toolbar->overflowClose('onOverflowClose');
$toolbar->open('onOpen');
$toolbar->close('onClose');

?>

<div id="example">

    <?php echo $toolbar->render(); ?>

    <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>

</div>

<script>
    function buttonClickHandler(e) {
        kendoConsole.log(e.target.text() + " 'click' event is fired.");
    }

    function buttonToggleHandler(e) {
        kendoConsole.log(e.target.text() + " 'toggle' event is fired.");
    }

    function splitButtonClickHandler(e) {
        kendoConsole.log("SplitButton event: " + e.id + " is clicked.");
    }

    function onClick(e) {
        kendoConsole.log("ToolBar 'click' event is fired for element with id: " + e.id);
    }

    function onToggle(e) {
        if(e.group == "radio") {
            kendoConsole.log("Toolbar 'toggle' event: " + e.id + " button is selected from group: " + e.group);
        } else {
            kendoConsole.log("ToolBar 'toggle' event: " + e.id + " button is changed");
        }
    }

    function onOverflowOpen(e) {
        kendoConsole.log("Overflow container open");
    }

    function onOverflowClose(e) {
        kendoConsole.log("Overflow container close");
    }

    function onOpen(e) {
        kendoConsole.log("SplitButton popup open");
    }

    function onClose(e) {
        kendoConsole.log("SplitButton popup close");
    }
</script>

<?php require_once '../include/footer.php'; ?>
