<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

$textButton = new \Kendo\UI\Button('textButton');
$textButton->attr('type', 'button')
           ->content('Text button')
           ->click('onClick');

echo $textButton->render();

echo " ";

$refreshButton = new \Kendo\UI\Button('refreshButton');
$refreshButton->tag('span')
              ->icon('refresh')
              ->content('Refresh button')
              ->click('onClick');

echo $refreshButton->render();

echo " ";

$disabledButton = new \Kendo\UI\Button('disabledButton');
$disabledButton->tag('a')
               ->enable(false)
               ->content('Disabled button')
               ->click('onClick');

echo $disabledButton->render();

?>

<p>(The disabled button will not fire click events)</p>

<div class="configuration k-widget k-header">
  <span class="configHead">Events log</span>
  <div class="console"></div>
</div>

<script>
  function onClick(e) {
    kendoConsole.log("event :: click (" + $(e.event.target).closest(".k-button").attr("id") + ")");
  }
</script>

<?php require_once '../include/footer.php'; ?>