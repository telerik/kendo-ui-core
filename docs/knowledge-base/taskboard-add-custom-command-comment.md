---
title: How To Add a Custom Command to Display Comments in TaskBoard
description: "Learn how to add custom commands and display comments in each card Kendo UI TaskBoard."
type: how-to
page_title: Add Command to Display Comments - Kendo UI TaskBoard for jQuery
slug: taskboard_add_custom_command_comment
tags: taskboard, card, custom, command
res_type: kb
component: taskboard
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TaskBoard for jQuery</td>
 </tr>
</table>

## Description

How can I add a custom command that will enable the user to add comments in the TaskBoard Cards?

## Solution

1. In the [`cardMenu`](/api/javascript/ui/taskboard/configuration/cardmenu) define a button for the custom command.
1. Add comments list as a resource.
1. Extend the TaskBoard commands and implement adding of new items to the commands resources.

```dojo
    <div id="taskBoard"></div>

    <script>
      var commentsDS = new kendo.data.DataSource({
        data: [{ id: 1, text: "My Comment", author: "Greg" }]
      });

      var UNIQUE_ID = 1;


      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red", comments: [ 1 ] },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red", comments: [ ] },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green", comments: [ ] },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green", comments: [ ] },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue", comments: [ ] }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "Add Comment", icon: "comment", command: "AddCommentCommand" } ],
        previewPane: {
          template: "<p>#:description#</p>" +
          "#if(resources.comments) {#" +
          "<p>#:resources.comments[0].title#:</p>" +
          "# for (var i = 0; i < resources.comments.length; i++) { " +
          "var comment = resources.comments[i];" +
          "var item = commentsDS.get(comment.value);" +
          "var author = item.author;#" +
          "<hr/><p><strong>#:author#:</strong> <span>#:comment.text#</span></p>" +
          "# } }# </p>"
        },
        resources: [{
          field: "comments",
          multiple: true,
          dataValueField: "id",
          dataTextField: "text",
          title: "Comments",
          dataSource: commentsDS
        }],
      });

      kendo.ui.taskboard.commands["AddCommentCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          var author, comment;

          var promptForComment = function () {
            kendo.prompt("Enter your comment", "My Comment")
              .done(function(data){
              comment = data;
              var newComment = commentsDS.add({ id: UNIQUE_ID, text: comment, author: author });
              UNIQUE_ID += 1;
              card.comments.push(newComment.id);
              taskboard.previewCard(cardElm);
            });
          };


          var promptForName = function () {
            kendo.prompt("Enter your name", "Greg")
              .done(function(data){
              author = data;
              promptForComment();
            });
          };

          promptForName();       

        } 
      });
    </script>
```

## See Also

* [TaskBoard API Reference](/api/javascript/ui/taskboard)
