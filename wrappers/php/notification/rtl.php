<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';
?>

<?php

$position = new \Kendo\UI\NotificationPosition();
$position->top(30);
$position->left(30);

$popupNotification = new \Kendo\UI\Notification('popupNotification');
$popupNotification->position($position);
$popupNotification->button(true);

echo $popupNotification->render();

$staticNotification = new \Kendo\UI\Notification('staticNotification');
$staticNotification->appendTo('#appendto');
$staticNotification->button(true);

echo $staticNotification->render();

?>

<div class="k-rtl">
  <div class="demo-section">
    <div id="appendto" class="k-block"></div>

    <h3>Show notification:</h3>
    <p>
      <button id="showPopupNotification" class="k-button">As a popup at top-left</button>
      <br />
      <button id="showStaticNotification" class="k-button">Static in the left panel</button>
    </p>

    <h3>Hide notification:</h3>
    <p>
      <button id="hideAllNotifications" class="k-button">Hide All Notifications</button>
    </p>
  </div>
</div>

<style>
  .demo-section {
  width: 600px;
  padding: 20px 30px;
  }
  .demo-section:after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  }
  .demo-section p {
  margin: 3px 0 20px;
  line-height: 40px;
  }
  .demo-section .k-button {
  width: 200px;
  }
  #appendto {
  float: left;
  width: 300px;
  height: 170px;
  margin: 1em 0;
  overflow: auto;
  }
</style>

<script>
  $(document).ready(function() {
  var popupNotification = $("#popupNotification").data("kendoNotification");
  var staticNotification = $("#staticNotification").data("kendoNotification");

  $("#showPopupNotification").click(function(){
    var d = new Date();
    popupNotification.show(kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000"), "error");
  });

  $("#showStaticNotification").click(function(){
    var d = new Date();
    staticNotification.show(kendo.toString(d, 'HH:MM:ss.') + kendo.toString(d.getMilliseconds(), "000"), "info");
    var container = $(staticNotification.options.appendTo);
    container.scrollTop(container[0].scrollHeight);
  });

  $("#hideAllNotifications").click(function(){
    popupNotification.hide();
    staticNotification.hide();
  });

  });
</script>

<?php require_once '../include/footer.php'; ?>