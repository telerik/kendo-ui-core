---
title: Customize the Predefined Dialogs
page_title: Customize the Predefined Dialogs | Kendo UI Dialog
description: "Learn how to Customize the Predefined Dialogs."
slug: overview_customizepredefineddialogs_widget
---

# Customize the Predefined Dialogs

The most easiest way to open a Kendo Alert, Confirm and Prompt dialogs is to use the dedicated methods for that through the exposed kendo API: [Predefined Dialogs]({%slug overview_kendoui_dialog_widget%}#predefined-dialogs).

This, however, enables you to change only the message without having control over the dialog itself (for example, the title). The code below illustrates a way to implement your own methods that open customized instances of the alert, prompt and confirm dialogs through [kendo.ui.Alert](/api/javascript/ui/alert), [kendo.ui.Prompt](/api/javascript/ui/prompt) and [kendo.ui.Confirm](/api/javascript/ui/confirm) widgets.

###### Example

````html
<button id="alertBtn" class="k-button">myalert</button>
<button id="confirmBtn" class="k-button">myconfirm</button>
<button id="promptBtn" class="k-button">myprompt</button>
  
<script>
  $("#alertBtn").on("click", function () {
    window.myalert("This is a Kendo UI Alert message!");
  });

  $("#confirmBtn").on("click", function () {
    window.myconfirm("Are you sure that you want to proceed?").then(function () {
      window.myalert("Operation done!");
    }, function () {
      window.myalert("You chose to Cancel action.");
    });
  });

  $("#promptBtn").on("click", function () {
    window.myprompt("Please, enter a arbitrary value:", "any value").then(function (data) {
      window.myalert(kendo.format("The value that you entered is '{0}'", data));
    }, function () {
      window.myalert("Cancel entering value.");
    })
  });
  
  
  
  function myalert(content){
    $("<div></div>").kendoAlert({
      title: "My Title",
      content: content
    }).data("kendoAlert").open();
  }
  
  function myconfirm(content){
    return $("<div></div>").kendoConfirm({
      title: "My Title",
      content: content
    }).data("kendoConfirm").open().result;
  }
  
  function myprompt(content, defaultValue){
    return $("<div></div>").kendoPrompt({
      title: "My Title",
      value: defaultValue,
      content: content
    }).data("kendoPrompt").open().result;
  }
</script>
````

## See Also

Other articles on the Kendo UI Dialog:

* [Overview]({%slug overview_kendoui_dialog_widget%})
* [Dialog JavaScript API Reference](/api/javascript/ui/dialog)