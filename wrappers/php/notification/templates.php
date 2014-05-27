<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';
?>

<?php

$position = new \Kendo\UI\NotificationPosition();
$position->pinned(true);
$position->top(30);
$position->right(30);

$infoTemplate = new \Kendo\UI\NotificationTemplate();
$infoTemplate->type('info');
$infoTemplate->templateId('emailTemplate');

$errorTemplate = new \Kendo\UI\NotificationTemplate();
$errorTemplate->type('error');
$errorTemplate->templateId('errorTemplate');

$uploadSuccess = new \Kendo\UI\NotificationTemplate();
$uploadSuccess->type('upload-success');
$uploadSuccess->templateId('successTemplate');

$notification = new \Kendo\UI\Notification('notification');
$notification->position($position);
$notification->autoHideAfter(0);
$notification->stacking("down");
$notification->addTemplate($infoTemplate);
$notification->addTemplate($errorTemplate);
$notification->addTemplate($uploadSuccess);

echo $notification->render();

?>

<span id="notification" style="display:none;"></span>

<div class="demo-section">

  <h3>Show notification:</h3>
  <p>
    <button id="showEmailNotification" class="k-button">Email Notification</button>
    <br />
    <button id="showErrorNotification" class="k-button">Error Notification</button>
    <br />
    <button id="showSuccessNotification" class="k-button">Upload Success Notification</button>
  </p>
  <h3>Hide notification:</h3>
  <p>
    <button id="hideAllNotifications" class="k-button">Hide All Notifications</button>
  </p>

</div>

<script id="emailTemplate" type="text/x-kendo-template">
  <div class="new-mail">
    <img src="../content/web/notification/envelope.png" />
    <h3>#= title #</h3>
    <p>#= message #</p>
  </div>
</script>

<script id="errorTemplate" type="text/x-kendo-template">
  <div class="wrong-pass">
    <img src="../content/web/notification/error-icon.png" />
    <h3>#= title #</h3>
    <p>#= message #</p>
  </div>
</script>

<script id="successTemplate" type="text/x-kendo-template">
  <div class="upload-success">
    <img src="../content/web/notification/success-icon.png" />
    <h3>#= message #</h3>
  </div>
</script>

<script>
  $(document).ready(function() {

  var notification = $("#notification").data("kendoNotification");

  $("#showEmailNotification").click(function(){
    notification.show({
      title: "New E-mail",
      message: "You have 1 new mail message!"
    }, "info");
  });

  $("#showErrorNotification").click(function(){
    notification.show({
      title: "Wrong Password",
      message: "Please enter your password again."
    }, "error");
  });

  $("#showSuccessNotification").click(function(){
    notification.show({
      message: "Upload Successful"
    }, "upload-success");
  });

  $("#hideAllNotifications").click(function(){
    notification.hide();
  });

  });
</script>

<style>
  .demo-section {
    width: 200px;
    padding: 20px 30px;
  }
  .demo-section p {
    margin: 3px 0 20px;
    line-height: 40px;
  }
  .demo-section .k-button {
    width: 200px;
  }

  .k-notification {
    border: 0;
  }

  /* Info template */
  .k-notification-info.k-group {
    background: rgba(0%,0%,0%,.7);
    color: #fff;
  }
  .new-mail {
    width: 300px;
    height: 100px;
  }
  .new-mail h3 {
    font-size: 1em;
    padding: 32px 10px 5px;
  }
  .new-mail img {
    float: left;
    margin: 30px 15px 30px 30px;
  }

  /* Error template */
  .k-notification-error.k-group {
    background: rgba(100%,0%,0%,.7);
    color: #ffffff;
  }
  .wrong-pass {
    width: 300px;
    height: 100px;
  }
  .wrong-pass h3 {
    font-size: 1em;
    padding: 32px 10px 5px;
  }
  .wrong-pass img {
    float: left;
    margin: 30px 15px 30px 30px;
  }

  /* Success template */
  .k-notification-upload-success.k-group {
    background: rgba(0%,60%,0%,.7);
    color: #fff;
  }
  .upload-success {
    width: 240px;
    height: 100px;
    padding: 0 30px;
    line-height: 100px;
  }
  .upload-success h3 {
    font-size: 1.7em;
    font-weight: normal;
    display: inline-block;
    vertical-align: middle;
  }
  .upload-success img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }
</style>

<?php require_once '../include/footer.php'; ?>