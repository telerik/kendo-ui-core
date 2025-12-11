---
title: Custom AI Column in Kendo UI for jQuery Grid
description: "Learn how to integrate the InlineAIPrompt component in the Kendo UI for jQuery Grid to interact with your data using natural language prompts."
components: ["grid"]
slug: custom_ai_column_kendoui_grid
position: 2
---


# Kendo UI for jQuery Grid: Custom AI Column

The Kendo UI for jQuery Grid can be enhanced with a custom AI-powered column that provides personalized insights, summaries, and explanations for individual rows. By integrating the InlineAIPrompt component into a custom column, users can interact with AI directly from each row, asking questions and receiving contextual responses.

> The example in this article uses a Telerik-hosted AI service for demonstration purposes only. For production applications, implement your own AI service tailored to your domain, data, and business requirements.


## 1. Set Up the Grid 

Start by defining your Grid and its columns, including a column for AI assistance and a column to display the AI-generated info.

```html
<div id="grid"></div>
<script src="../content/shared/js/healthcare.js"></script>
<script>
$(document).ready(function() {
  $("#grid").kendoGrid({
    dataSource: {
      // ...dataSource configuration...
    },
    height: 550,
    pageable: true,
    // ...existing code...
    columns: [
      {
        title: "AI",
        width: 60,
        template: function(dataItem) {
          return '<button class="ai-tool"></button>';
        }
      },
      {
        field: "aiAssistedInfo",
        title: "AI Assisted Info",
        template: function(dataItem) {
          return dataItem.aiAssistedInfo || '<em>No AI assistance yet</em>';
        }
      },
      // ...other columns...
    ]
  });
});
</script>
```

## 2. Add the AI Button and InlineAIPrompt to Each Row

Use a custom template for the AI column to render a button. When the button is clicked, initialize and display an InlineAIPrompt for that row.

```javascript
// ...existing code...
dataBound: function(e) {
  $('.ai-tool').kendoButton({
    icon: "sparkles",
    fillMode: 'flat',
    rounded: 'medium',
    click: function(e) {
      if($('#inline').data('kendoInlineAIPrompt')) {
        $('#inline').data('kendoInlineAIPrompt').destroy();
        $('#inline').remove();
      }
      var row = e.sender.element.closest("tr");
      $(this.element).closest('.k-table-td').append('<div id="inline"></div>');
      var dataItem = $("#grid").data("kendoGrid").dataItem(row);
      var inline = $('#inline').kendoInlineAIPrompt({
        systemPrompt: (context, prompt) => `${prompt}: ${JSON.stringify(dataItem)}`,
        placeholder: "Type your prompt here...",
        commands: [
          // ...add commands...
        ],
        // ...other configurations...
        service: {
          url: "https://demos.telerik.com/service/v2/ai/completion",
        },
      }).data("kendoInlineAIPrompt");
      inline.open();
      $('.k-child-animation-container.k-popup').data('kendoPopup').position();
    }
  });
}
```

## 3. Handle AI Output Actions

Configure output actions so users can copy, insert, or discard the AI-generated content. 

In the example, `Insert` is a custom action. When the `Insert` action is triggered, you can update the corresponding row's "AI Assisted Info" field and refresh the Grid.

```
    outputAction: function(e) {
      if (e.action === "insert") {
        var grid = $("#grid").data("kendoGrid");
        var currentRow = e.sender.element.closest('tr');
        $('#inline').data('kendoInlineAIPrompt').destroy();
        $('#inline').remove();
        var dataItem = grid.dataItem(currentRow);
        dataItem.set("aiAssistedInfo", e.content);
        grid.refresh();
      }
    },
```

## 4. Customize the InlineAIPrompt

You can further customize the InlineAIPrompt with additional commands, output actions, popup settings, and speech-to-text support as needed for your scenario.

```
    popup: {
      width: "462px",
      placeholder: "Ask for AI assistance about this record",
      position: "bottom right"
    },
    speechToText: true,
    readonly: false,
```

For a complete runnable example, see [jQuery Grid AI Assistant - Custom Column](https://docs.telerik.com/kendo-ui/grid/ai-custom-column).

## Suggested Links

* [InlineAIPrompt Overview](/api/javascript/ui/inlineaiprompt)
* [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
* [jQuery Grid AI Assistant - Custom Column](https://docs.telerik.com/kendo-ui/grid/ai-custom-column)
