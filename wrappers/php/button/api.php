<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>

<div class="configuration k-widget k-header">
  <span class="configHead">Button API Functions</span>
  <ul class="options">
    <li>
      <button class="k-button" id="enableButton" type="button">Enable</button> or <button class="k-button" id="disableButton" type="button">Disable</button>
    </li>
  </ul>
</div>

<br />
<br />

<?php

$iconTextButton = new \Kendo\UI\Button('iconTextButton');
$iconTextButton->attr('type', 'button')
               ->icon('ungroup')
               ->content('Kendo UI Button');

echo $iconTextButton->render();

?>

<script>

  $(document).ready(function () {
    var buttonObject = $("#iconTextButton").data("kendoButton");

    $("#enableButton").click(function () {
      buttonObject.enable(true);
    });

    $("#disableButton").click(function () {
      buttonObject.enable(false);
    });
  });

</script>

<?php require_once '../include/footer.php'; ?>