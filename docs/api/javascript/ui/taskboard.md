---
title: TaskBoard
page_title: Configuration, methods and events of Kendo UI TaskBoard
description: Configuration options, methods and events for the Kendo UI TaskBoard widget. 
res_type: api
component: taskboard
---

# kendo.ui.TaskBoard

Represents the Kendo UI TaskBoard. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### autoBind `Boolean` *(default: true)*

Controls whether to bind the TaskBoard to the data source on initialization. 

#### Example

    <button id="btn">Load</button>
    <div id="taskBoard"></div>

    <script>
        var taskboard = $("#taskBoard").kendoTaskBoard({
            autoBind: false,
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        $("#btn").kendoButton({
            click: function () {
            taskboard.load();
            }
        });
    </script>


### cardMenu `Array | Object` 

Defines the list of buttons rendered in the card.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ],
        cardMenu: [ "editCard" ]
    });
    </script>

### cardMenu.name `String` 

The name of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        } 
    });

    </script>

### cardMenu.text `String` 

The text of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        } 
    });

    </script>

### cardMenu.icon `String` 

The icon of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        } 
    });

    </script>

### cardMenu.spriteCssClass `String` 

The class name of the icon element.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue", spriteCssClass: "custom-icon-class" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        } 
    });

    </script>

### cardMenu.command `String` 

The command of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
        { text: "Backlog", status: "backlog" },
        { text: "Doing", status: "doing" },
        { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        } 
    });

    </script>

### cardMenu.options `String` 

The command options of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ],
        cardMenu: [ { name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" } ]
    });

    kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
            var taskboard = this.taskboard;
            var options = this.options;
            var card = options.card;
            var cardElm = options.cardElement;
            var column = options.column;
            var columnElm = options.columnElement;

            cardElm.css("border", "solid red 3px");
            columnElm.css("border", "solid red 3px");
            alert(kendo.format("{0} Card executed Custom command in column with status {1} with value {2}", card.get("title"), column.get("status"), options.value));
        } 
    });

    </script>

### columns `Object|Array|kendo.data.DataSource` 

Sets the [DataSource](/api/javascript/data/datasource) for the Columns of the TaskBoard. Can be bound to a remote service or local data.

#### Example

    <div id="taskBoard"></div>

    <script>
    $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
            { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
            { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
            { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
            { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
            { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
            { text: "Backlog", status: "backlog" },
            { text: "Doing", status: "doing" },
            { text: "Done", status: "done" }
        ]
    });
    </script>

#### Example - remote binding

    <div id="taskBoard"></div>

    <script>
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

    $("#taskBoard").kendoTaskBoard({
      columnSettings: {
        dataTextField: "Text",
        dataStatusField: "Status",
        dataOrderField: "Order"
      },
      columns: {
        transport: {
          read: {
            url: crudServiceBaseUrl + "/taskboard/columns"
          },
          create: {
            url: crudServiceBaseUrl + "/taskboard/columns_create",
            method: "POST"
          },
          update: {
            url: crudServiceBaseUrl + "/taskboard/columns_update",
            method: "POST"
          },
          destroy: {
            url: crudServiceBaseUrl + "/taskboard/columns_destroy",
            method: "POST"
          }
        },
        schema: {
          model: {
            id: "ID",
            fields: {
              "ID": { type: "number" },
              "Text": { type: "string" },
              "Status": { type: "string", defaultValue: "todo" },
              "Order": { type: "number" }
            }
          }
        }
      },
      dataSource: [
        { id: 1, title: "Campaigns", order: 1, description: "Create a new landing page for campaign", status: "todo", color: "orange" },
        { id: 2, title: "Newsletters", order: 2, description: "Send newsletter", status: "inProgress", color: "orange" },
        { id: 3, title: "Ads Analytics", order: 3, description: "Review ads performance", status: "done", color: "orange" }
      ]
    });
    </script>

### columnSettings `Object` 

Defines the settings for the columns.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          width: 200
        }
      });
    </script>

### columnSettings.buttons `Array` 

Defines the list of buttons rendered in the column.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: ["addCard"]
        }
      });
    </script>

### columnSettings.buttons.name `String` 

The name of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        } 
      });
    </script>

### columnSettings.buttons.text `String` 

The text of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        } 
      });
    </script>

### columnSettings.buttons.icon `String` 

The icon of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        } 
      });
    </script>

### columnSettings.buttons.spriteCssClass `String` 

The class name of the icon element.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue", spriteCssClass: "custom-class" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        } 
      });
    </script>

### columnSettings.buttons.command `String` 

The command of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        } 
      });
    </script>

### columnSettings.buttons.options `String` 

The command options of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          buttons: [{ name: "CustomButton", text: "My Custom Tool", icon: "gear", command: "MyCustomCommand", options: "myvalue" }]
        }
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var column = options.column;
          var columnElm = options.columnElement;

          columnElm.css("border", "solid red 3px");
          alert(kendo.format("Custom command executed for column with status {0} and value {1}", column.get("status"), options.value));
        } 
      });
    </script>

### columnSettings.dataStatusField `String` *(default: "status")*

The field of the data item that provides the status of the column. Mapped with the status of the cards.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { Text: "Doing", Status: "doing", Order: 1 },
          { Text: "Backlog", Status: "backlog", Order: 0},
          { Text: "Done", Status: "done", Order: 2 }
        ],
        columnSettings: {
          dataStatusField: "Status",
          dataTextField: "Text",
          dataOrderField: "Order"
        }
      });
    </script>

### columnSettings.dataTextField `String` *(default: "text")*

The text field of the column.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { Text: "Doing", Status: "doing", Order: 1 },
          { Text: "Backlog", Status: "backlog", Order: 0},
          { Text: "Done", Status: "done", Order: 2 }
        ],
        columnSettings: {
          dataStatusField: "Status",
          dataTextField: "Text",
          dataOrderField: "Order"
        }
      });
    </script>

### columnSettings.dataOrderField `String`

The field used to order columns (number based). Automatically adds sorting to the columns DataSource instance. 

If not set, columns will be rendered in the order they are fetched. And ordering will not be applied to the DataSource and respectively, not synced with the remote data source.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { Text: "Doing", Status: "doing", Order: 1 },
          { Text: "Backlog", Status: "backlog", Order: 0},
          { Text: "Done", Status: "done", Order: 2 }
        ],
        columnSettings: {
          dataStatusField: "Status",
          dataTextField: "Text",
          dataOrderField: "Order"
        }
      });
    </script>

### columnSettings.width `String|Number` 

Configures the width of the columns

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          width: 200
        }
      });
    </script>

### columnSettings.template `String|Function` 

Controls the rendering of the column header. In the template context the `buttons` field provides the HTML for the buttons of the column. 

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ],
        columnSettings: {
          template: '<div class="k-taskboard-column-header-actions" style="background-color: lightgray">#=buttons#</div>' + 
                    '<span class="k-spacer"></span>' + 
                    '<div class="k-taskboard-column-header-text k-text-ellipsis">#:text#(#:status#)</div>'
        }
      });
    </script>

### dataOrderField `String`

The field used to order cards (number based). If not set, cards will be rendered in the order they are fetched. And ordering will not be applied to the DataSource and respectively, not synced with the remote data source.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataCategoryField `String` *(default: "category")*

The category field of the card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataDescriptionField `String` *(default: "description")*

The description field of the card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataSource `Object|Array|kendo.data.DataSource` 

Sets the [DataSource](/api/javascript/data/datasource) for the Cards of the TaskBoard. Can be bound to a remote service or local data.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

#### Example - remote binding

    <div id="taskBoard"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

      $("#taskBoard").kendoTaskBoard({
        dataDescriptionField: "Description",
        dataTitleField: "Title",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: {
            transport: {
                read: {
                    url: crudServiceBaseUrl + "/taskboard"
                },
                create: {
                    url: crudServiceBaseUrl + "/taskboard/create",
                    method: "POST"
                },
                update: {
                    url: crudServiceBaseUrl + "/taskboard/update",
                    method: "POST"
                },
                destroy: {
                    url: crudServiceBaseUrl + "/taskboard/destroy",
                    method: "POST"
                }
            },
            schema: {
                model: {
                    id: "ID",
                    fields: {
                        "ID": { type: "number" },
                        "Category": { type: "string" },
                        "Description": { type: "string" },
                        "Title": { type: "string" },
                        "Status": { type: "string" },
                        "Order": { type: "number" }
                    }
                }
            }
        },
        columns: [
          { text: "Pending", status: "todo" },
          { text: "Under Review", status: "inProgress" },
          { text: "Scheduled", status: "done" }
        ]
      });
    </script>

### dataStatusField `String` *(default: "status")*

The field of the data item that provides the status of the card. Mapped with the status of the columns.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### dataTitleField `String` *(default: "title")*

The title field of the card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataTitleField: "Title",
        dataCategoryField: "Category",
        dataDescriptionField: "Description",
        dataStatusField: "Status",
        dataOrderField: "Order",
        dataSource: [
          { id: 1, title: "Task 1", Description: "Description 1", Status: "backlog", Category: "red", Order: 0 },
          { id: 2, title: "Task 11", Description: "Description 11", Status: "backlog", Category: "red", Order: 1 },
          { id: 3, title: "Task 2", Description: "Description 2", Status: "doing", Category: "green", Order: 2 },
          { id: 4, title: "Task 22", Description: "Description 22", Status: "doing", Category: "green", Order: 3 },
          { id: 5, title: "Task 3", Description: "Description 3", Status: "done", Category: "blue", Order: 4 }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### editable `Boolean|Object` *(default: true)*

Toggles the editing in the TaskBoard. Both for columns and cards.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: false,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### editable.buttons `Array` 

Defines a list of buttons rendering in the footer pane

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: ["saveChanges"]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### editable.buttons.name `String` 

The name of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.buttons.text `String` 

The text of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.buttons.icon `String` 

The icon of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.buttons.spriteCssClass `String` 

The class name of the icon element.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.buttons.command `String` 

The command of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.buttons.options `String` 

The command options of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.buttons.primary `Boolean` 

Toggles whether the color of the button to be primary or not.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        editable: {
          buttons: [
            "saveChanges", 
            { name: "resetCard", text: "Default", command: "MyCustomCommand", options: "{ \"title\": \"Card Title\", \"description\": \"Put some description\" }", primary: false }]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          card.set("title", defaults.title);
          card.set("description", defaults.description);
        } 
      });
    </script>

### editable.form `Object` 

The Kendo Form configuration for Card editing.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ],
        resources: [{
          field: "category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        editable: { 
          form: {
            buttonsTemplate: "",
            items: [{
              field: "title",
              label: "Title:"
            }, {
              field: "description",
              label: "Description:"
            }, {
              field: "category",
              label: "Category:",
              editor: "DropDownList",
              editorOptions: {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: [
                  { value: "urgent", text: "Urgent", color: "orange" },
                  { value: "highpriority", text: "High Priority", color: "blue" },
                  { value: "lowpriority", text: "Low Priority", color: "green" }
                ]
              }
            }]
          }
        },
      });
    </script>

### editable.headerTemplate `String|Function` 

Controls the rendering of the header 

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ],
        editable: {
          headerTemplate: "<div class='k-taskboard-pane-header-text'>Editing <strong>#:title#</strong></div>"
        }
      });
    </script>

### height `String|Number` *(default: "800px")*

Configures the height of the TaskBoard wrapper.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        height: 750,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### previewPane `Boolean|Object` *(default: true)*

Toggles the previewPane in the TaskBoard.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: false,
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### previewPane.buttons `Array` 

Defines a list of buttons rendering in the footer pane.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.name `String` 

The name of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.text `String` 

The text of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.icon `String` 

The icon of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.spriteCssClass `String` 

The class name of the icon element.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false, spriteCssClass: "custom-class" }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.command `String` 

The command of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.options `String` 

The command options of the button.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.buttons.primary `Boolean` 

Toggles whether the color of the button to be primary or not.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          buttons: [
            "edit", 
            "delete",
            { name: "showDetails", text: "Details", command: "MyCustomCommand", primary: false }
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["MyCustomCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          var defaults = JSON.parse(options.value);
          var card = options.card;
          var cardElm = options.cardElement;
          var column = options.column;
          var columnElm = options.columnElement;
          
          kendo.alert(kendo.format('<p>Title: {0}</p>' + 
                                    '<p>Description: {1}</p>' +
                                    '<p>Status: {2}</p>' +
                                    '<p>Category: {3}</p>' +
                                    '<p>Order: {4}</p>', 
                                    card.title, card.description, 
                                    card.status, card.category, card.order));
        } 
      });
    </script>

### previewPane.template `String|Function`

The template rendering of the preview pane.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          template: "<p>#:description#</p><p>Category: #:category#</p>"
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### previewPane.headerTemplate `String|Function` 

The template rendering of the header for the preview pane.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        previewPane: {
          headerTemplate: "<div class='k-taskboard-pane-header-text'>Viewing <strong>#:title#</strong></div>"
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### reorderable `Boolean` *(default: true)*

Toggles the reordering of cards in the TaskBoard.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        reorderable: false,
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources `Array`

The configuration of the TaskBoard resource(s). A TaskBoard resource is optional metadata that can be associated
with a TaskBoard event.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataColorField `String` *(default: "color")*

The field of the resource data item which contains the resource color.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataSource `Object|Array|kendo.data.DataSource`

The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

#### Example - remote data binding

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataSource: {
            transport: {
              read: "url/to/endpoint"
            }
          }
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataTextField `String` *(default: "text")*

The field of the resource data item which represents the resource text.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.dataValueField `String` *(default: "value")*

The field of the resource data item which represents the resource value. The resource value is used to link a TaskBoard event with a resource.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.field `String`

The field of the TaskBoard event which contains the resource id.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "category",
          dataColorField: "Color",
          dataTextField: "Text",
          dataValueField: "Value",
          dataSource: [
            { Value: "urgent", Text: "Urgent", Color: "orange" },
            { Value: "highpriority", Text: "High Priority", Color: "blue" },
            { Value: "lowpriority", Text: "Low Priority", Color: "green" }
          ]
        }],
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.multiple `Boolean` *(default: false)*

If set to `true` the TaskBoard event can be assigned multiple instances of the resource. The TaskBoard event field specified via the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option will contain an array of resources.
By default only one resource instance can be assigned to an event.

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
          <div class="template-container">
              <div class="template-header">
                  <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
              </div>
              <p>#:description#</p>
              <p>Tags: # for (var i = 0; i < resources.tags.length; i++) { #
                <span style="color: #:resources.tags[i].color#">#:resources.tags[i].text#</span>
              # } # </p>
          </div>
      </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "tags",
          multiple: true,
          dataSource: [
            { value: "bug", text: "Bug", color: "gray" },
            { value: "feature", text: "Feature", color: "orange" },
            { value: "client-side", text: "Client-side", color: "blue" },
            { value: "server-side", text: "Server-side", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", tags: [ "bug", "client-side" ] },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", tags: [ "feature", "client-side" ] },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", tags: [ "feature", "server-side" ] },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", tags: [ "chore", "client-side" ] },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", tags: [ "chore", "server-side" ] }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.name `String`

The name of the resource used to distinguish resource. If not set the value of the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option is used.

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
          <div class="template-container">
              <div class="template-header">
                  <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
              </div>
              <p>#: description#</p>
              <p>#:resources.priority.name#: <span style="color:#:resources.priority.color#">#:resources.priority.text#<span></p>
          </div>
      </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "priority",
          title: "Category",
          name: "Category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", priority: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", priority: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", priority: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", priority: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", priority: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.title `String`

The user friendly title of the resource displayed in the TaskBoard edit form. If not set the value of the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option is used.

#### Example

    <div id="taskBoard"></div>

    <script id="card-template" type="text/x-kendo-template">
          <div class="template-container">
              <div class="template-header">
                  <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
              </div>
              <p>#: description#</p>
              <p>#:resources.priority.title#: <span style="color:#:resources.priority.color#">#:resources.priority.text#<span></p>
          </div>
      </script>

    <script>
      $("#taskBoard").kendoTaskBoard({
        resources: [{
          field: "priority",
          title: "Category",
          name: "Category",
          dataSource: [
            { value: "urgent", text: "Urgent", color: "orange" },
            { value: "highpriority", text: "High Priority", color: "blue" },
            { value: "lowpriority", text: "Low Priority", color: "green" }
          ]
        }],
        template: $("#card-template").html(),
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", priority: "urgent" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", priority: "urgent" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", priority: "highpriority" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", priority: "lowpriority" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", priority: "lowpriority" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### resources.valuePrimitive `Boolean` *(default: true)*

Set to `false` if the TaskBoard event field specified via the [field](/api/javascript/ui/TaskBoard#configuration-resources.field) option contains a resource data item.
By default the TaskBoard expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via `dataValueField`).

#### Example

  <div id="taskBoard"></div>

  <script id="card-template" type="text/x-kendo-template">
      <div class="template-container">
          <div class="template-header">
              <p><a class="k-card-title k-link" href="" data-command="SelectCardCommand">#: title #</a></p>
          </div>
          <p>#: description#</p>
          <p>#:resources.priority.title#: <span style="color:#:resources.priority.color#">#:resources.priority.text#<span></p>
      </div>
  </script>

  <script>
    $("#taskBoard").kendoTaskBoard({
      resources: [{
        field: "priority",
        valuePrimitive: false,
        dataValueField: "type",
        title: "Priority",
        dataSource: [
          { type: "urgent", text: "Urgent", color: "orange" },
          { type: "highpriority", text: "High Priority", color: "blue" },
          { type: "lowpriority", text: "Low Priority", color: "green" }
        ]
      }],
      template: $("#card-template").html(),
      dataCategoryField: "category",
      dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", priority: { type: "urgent" } },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", priority: { type: "urgent" }  },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", priority: { type: "highpriority" }  },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", priority: { type: "lowpriority" } },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", priority: { type: "lowpriority" } }
      ],
      columns: [
        { text: "Doing", status: "doing" },
        { text: "Backlog", status: "backlog" },
        { text: "Done", status: "done" }
      ]
    });
  </script>

### selectable `Boolean` *(default: true)*

Toggles the selection of the TaskBoard.

#### Example

  <div id="taskBoard"></div>

  <script>
    $("#taskBoard").kendoTaskBoard({
      selectable: false,
      dataOrderField: "order",
      dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
      ],
      columns: [
        { text: "Doing", status: "doing" },
        { text: "Backlog", status: "backlog" },
        { text: "Done", status: "done" }
      ]
    });
  </script>

### template `String|Function` 

Controls the rendering of the card.

#### Example

  <div id="taskBoard"></div>

  <script id="card-template" type="text/x-kendo-template">
      <div class="my-card-template-container">
         <div class="#:styles.header# #:styles.hbox#">
           <a class="#:styles.title# #:styles.link#" href="\\#" data-command="SelectCardCommand">#:title#</a>
           <span class="#:styles.spacer#"></span>
           #=cardMenuButton#
          </div>
          <div class="#:styles.body#"><p>#:description#</p></div>
      </div>
  </script>

  <script>
    $("#taskBoard").kendoTaskBoard({
      template: $("#card-template").html(),
      dataOrderField: "order",
      dataSource: [
        { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
        { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
        { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
        { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
        { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
      ],
      columns: [
        { text: "Doing", status: "doing" },
        { text: "Backlog", status: "backlog" },
        { text: "Done", status: "done" }
      ]
    });
  </script>

### toolbar `Boolean|Object` *(default: true)*

Configures the Tools of the TaskBoard

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        toolbar: [
          { type: "button", text: "Add Card", name: "addCard", text: "Add New Card", command: "CustomAddCardCommand", icon: "plus", showText: true },
          "spacer",
          "search"
        ],
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["CustomAddCardCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          
          taskboard.addCard({ status: "doing", title: "Add Title", description: "Add Description", category: "green" });
          taskboard.dataSource.sync();
        } 
      });
    </script>

### toolbar.items `Array`

Configures the items collection of the toolbar.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        toolbar: {
          items: [
            { type: "button", text: "Add Card", name: "addCard", text: "Add New Card", command: "CustomAddCardCommand", icon: "plus", showText: true },
            "spacer",
            "search"
          ]
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });

      kendo.ui.taskboard.commands["CustomAddCardCommand"] = kendo.ui.taskboard.Command.extend({
        exec: function () {
          var taskboard = this.taskboard;
          var options = this.options;
          
          taskboard.addCard({ status: "doing", title: "Add Title", description: "Add Description", category: "green" });
          taskboard.dataSource.sync();
        } 
      });
    </script>

### toolbar.items.type `String`
Specifies the type of the button.

### toolbar.items.overflow `String`
Specifies the overflow of the button.

### toolbar.items.click `Function`
Specifies the click handler of the button.

### toolbar.items.command `String`
Specifies the command of the button.

### toolbar.items.options `String`
Specifies the command options of the button.

### toolbar.items.name `String`
Specifies the name of the button.

### toolbar.items.togglable `Boolean` *(default: false)*
Specifies if the button is togglable, e.g. has a selected and unselected state.

### toolbar.items.text `String`
Sets the text of the button.

### toolbar.items.template `String|Function`
Specifies what element will be added in the ToolBar wrapper. Items with template does not have a type.

### toolbar.items.showText `String` *(default: "both")*
Specifies where the text will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.primary `Boolean` *(default: false)*
Specifies whether the button is primary. Primary buttons receive different styling.

### toolbar.items.attributes `Object`
Specifies the HTML attributes of a ToolBar button.

### toolbar.items.enable `Boolean` *(default: true)*
Specifies whether the control is initially enabled or disabled. Default value is "true".

### toolbar.items.hidden `Boolean` *(default: false)*
Determines if a button is visible or hidden. By default buttons are visible.

### toolbar.items.spriteCssClass `String`
Defines a CSS class (or multiple classes separated by spaces) which will be used for button icon.

### toolbar.items.imageUrl `String`
If set, the ToolBar will render an image with the specified URL in the button.

### toolbar.items.showIcon `String` *(default: "both")*
Specifies where the button icon will be displayed. Possible values are: "toolbar", "overflow" or "both" (default).

### toolbar.items.icon `String`
Sets icon for the item. The icon should be one of the existing in the Kendo UI theme sprite.

### toolbar.items.id `String`
Specifies the ID of the button.

### width `String|Number` *(default: "100%")*

Configures the width of the TaskBoard wrapper.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        width: "700px",
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### messages `Object`

Provides configuration options for the messages present in the TaskBoard widget.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        toolbar: [
          "addColumn",
          "myCustomButton", // Custom button
          "spacer",
          "search"
        ],
        messages: {
          myCustomButton: "Custom Button Text", // Text for custom buttons - mapped with their name field
          edit: "Edit",
          createNewCard: "Create new card",
          create: "Create",
          search: "Search",
          previewCard: "Preview card",
          addCard: "Add card",
          editCard: "Edit card",
          deleteCard: "Delete Card",
          addColumn: "Add column",
          editColumn: "Edit column",
          deleteColumn: "Delete column",
          close: "Close",
          cancel: "Cancel",
          "delete": "Delete",
          saveChanges: "Save changes",
          title: "Title:",
          description: "Description:",
          newColumn: "New column",
          deleteColumnConfirm: "Are you sure you want to delete this column?",
          deleteCardConfirm: "Are you sure you want to delete this card?
        },
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      });
    </script>

### messages.edit `String` *(default: "Edit")*

Specifies text to be rendered for the "Edit" message.

### messages.createNewCard `String` *(default: "Create new card")*

Specifies text to be rendered for the "Create new card" message.

### messages.create `String` *(default: "Create")*

Specifies text to be rendered for the "Create" message.

### messages.search `String` *(default: "Search")*

Specifies text to be rendered for the "Search" message.

### messages.previewCard `String` *(default: "Preview card")*

Specifies text to be rendered for the "Preview card" message.

### messages.addCard `String` *(default: "Add card")*

Specifies text to be rendered for the "Add card" message.

### messages.editCard `String` *(default: "Edit card")*

Specifies text to be rendered for the "Edit card" message.

### messages.deleteCard `String` *(default: "Delete Card")*

Specifies text to be rendered for the "Delete Card" message.

### messages.addColumn `String` *(default: "Add column")*

Specifies text to be rendered for the "Add column" message.

### messages.editColumn `String` *(default: "Edit column")*

Specifies text to be rendered for the "Edit column" message.

### messages.deleteColumn `String` *(default: "Delete column")*

Specifies text to be rendered for the "Delete column" message.

### messages.close `String` *(default: "Close")*

Specifies text to be rendered for the "Close" message.

### messages.cancel `String` *(default: "Cancel")*

Specifies text to be rendered for the "Cancel" message.

### messages.delete `String` *(default: "Delete")*

Specifies text to be rendered for the "Delete" message.

### messages.saveChanges `String` *(default: "Save changes")*

Specifies text to be rendered for the "Save changes" message.

### messages.title `String` *(default: "Title:")*

Specifies text to be rendered for the "Title:" message.

### messages.description `String` *(default: "Description:")*

Specifies text to be rendered for the "Description:" message.

### messages.newColumn `String` *(default: "New column")*

Specifies text to be rendered for the "New column" message.

### messages.deleteColumnConfirm `String` *(default: "Are you sure you want to delete this column?")*

Specifies text to be rendered for the "Are you sure you want to delete this column?" message.

### messages.deleteCardConfirm `String` *(default: "Are you sure you want to delete this card?")*

Specifies text to be rendered for the "Are you sure you want to delete this card?" message.

## Methods

### addCard 

Adds a card and opens edit pane with the data passed.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addCard({ status: "doing", category: "red" });
    </script>

#### Parameters

##### data `Object`

Predefine data object for the card.


### addColumn

Adds a column and toggles edit mode.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addColumn({ text: "New column", status: "new" });
    </script>

#### Example - using index

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addColumn(1, { text: "New column", status: "new" });
      taskBoard.saveColumn();
    </script>

#### Parameters

##### index `Number`

Optional index parameter to define the index of the column.

##### data `Object`

Predefine data object for the column.

### columns  

Returns all the column elements.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.columns().eq(0).css("border", "4px solid gray");
    </script>

#### Returns

`jQuery`

### columnByStatus  

Returns the column element that is associated to the status.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.columnByStatus("doing").css("border", "4px solid gray");
    </script>

#### Parameters

##### status `String`

The status of the column.

#### Returns

`jQuery`


### deleteCard 

Deletes a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.deleteCard(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to delete.


### deleteColumn 

Deletes a column.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.deleteColumn(taskBoard.columns().eq(0));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to delete.


### editCard 

Opens edit pane for card.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.editCard(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to edit.

### editColumn

Toggles edit mode for column.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.editColumn(taskBoard.columns().eq(0));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to edit.


### enable

Toggles the disabled state of a specific card.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.enable(taskBoard.items().eq(0), false);
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element.

##### state `Boolean`

If false the card will appear disabled.

### enableByColumn

Toggles the disabled state of all cards in the specified column.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.enableByColumn(taskBoard.columns().eq(0), false);
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element.

##### state `Boolean`

If false the card will appear disabled.

### executeCommand

Executes a command. 

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.executeCommand({command: "OpenPaneCommand", options: { value: "Create" }});
    </script>
    
#### Parameters

##### options `Object`

The options required for the command.

### readOnly

Toggles the readonly state of a specific card.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.readOnly(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element.

##### state `Boolean`

If true the card will appear readonly.

### readOnlyByColumn

Toggles the readonly state of all cards in the specified column.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.readOnlyByColumn(taskBoard.columns().eq(0));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element.

##### state `Boolean`

If true the card will appear readonly.


### items  

Returns the card elements in the TaskBoard.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      var cardElm = taskBoard.items().eq(0);
      var dataItem = taskBoard.dataItem(cardElm);
      alert(dataItem.get("title"));
    </script>

#### Returns

`jQuery`

### itemsByStatus  

Returns the card elements in the TaskBoard filtered by column status.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      var cardElm = taskBoard.itemsByStatus("backlog").eq(0);
      var dataItem = taskBoard.dataItem(cardElm);
      alert(dataItem.get("title"));
    </script>

#### Parameters

##### status `String`

The jQuery object with the card element to select.

#### Returns

`jQuery`

### itemsByColumn  

Returns the card elements in the TaskBoard filtered by column elemennt.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Doing", status: "doing" },
          { text: "Backlog", status: "backlog" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      var cardElm = taskBoard.itemsByColumn(taskBoard.columns().eq(2)).eq(0);
      var dataItem = taskBoard.dataItem(cardElm);
      alert(dataItem.get("title"));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to select.

#### Returns

`jQuery`

### load 

Loads all DataSource instances (columns, dataSource and resources) configured in the correct order.

#### Example

    <button id="btn">Load</button>
    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
            autoBind: false,
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        $("#btn").kendoButton({
            click: function () {
              taskBoard.load();
            }
        });
    </script>

### previewCard  

Opens the preview pane for the card element.

#### Example

    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        taskBoard.previewCard(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

### registerShortcut  

Registers a new shortcut for the TaskBoard.

#### Example

    <div id="taskBoard"></div>

    <script>
        var taskBoard = $("#taskBoard").kendoTaskBoard({
            dataOrderField: "order",
            dataSource: [
                { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
                { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
                { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
                { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
                { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
            ],
            columns: [
                { text: "Backlog", status: "backlog" },
                { text: "Doing", status: "doing" },
                { text: "Done", status: "done" }
            ],
        }).data("kendoTaskBoard");

        // Focus the last card in TaskBoard
        taskBoard.registerShortcut("*", {
            keyCode: "q",
            ctrlKey: true
        }, {
            handler: function () {
                taskBoard.items().last().focus();
            }
        });

        // Create custom shortcut to open Preview pane on a card
        taskBoard.registerShortcut(".k-taskboard-card", {
            keyCode: "d",
            altKey: true
        }, {
            command: "OpenPaneCommand",
            options: { value: "Preview" },
            handler: function (ev) {
              ev.preventDefault();
            }
        });
    </script>

#### Parameters

##### selector `String`

The jQuery selector to match the element(s) on which the shortcut to be affected. 

##### shortcut `Object`

The shortcut definition.

##### options `Object`

The options of the shortcut execution

##### options.command `String`

The command to be executed

##### options.options `String`

Command-specific options

##### options.handler `Function`

A function callback.

### dataItem  

Returns the data item bound to the specific card element.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      var cardElm = taskBoard.items().eq(0);
      var dataItem = taskBoard.dataItem(cardElm);
      alert(dataItem.get("title"));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

#### Returns

`kendo.data.ObservableObject`

### columnDataItem  

Returns the data item bound to the specific column element.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      var columnElm = taskBoard.columns().eq(0);
      var dataItem = taskBoard.columnDataItem(columnElm);
      alert(dataItem.get("text"));
    </script>

#### Parameters

##### columnElm `jQuery`

The jQuery object with the column element to select.

#### Returns

`kendo.data.ObservableObject`

### saveCard 

Saves the edited card and closes editing.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addCard({order: 6, status: "backlog", title: "Add title", description: "Add description", category: "green"});
      taskBoard.saveCard();
    </script>


### saveColumn

Saves the edited column and closes editing.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.addColumn({ text: "New column", status: "new" });
      taskBoard.saveColumn();
    </script>

### select

Returns the selected card or selects a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.select(taskBoard.items().eq(0));
    </script>

#### Parameters

##### cardElm `jQuery`

The jQuery object with the card element to select.

#### Returns

`jQuery`

### setDataSource

Changes the DataSource of the TaskBoard

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.setDataSource([
          { id: 1, order: 1, title: "New Task 1", description: "New Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "New Task 2", description: "New Description 2", status: "doing", category: "green" },
      ]);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource|Array|Object`

The data source to which the widget should be bound.


### setColumnsDataSource

Changes the DataSource of the TaskBoard's columns.

#### Example

    <div id="taskBoard"></div>

    <script>
      var taskBoard = $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ]
      }).data("kendoTaskBoard");

      taskBoard.setColumnsDataSource([
          { text: "Todo", status: "backlog" },
          { text: "In progress", status: "doing" },
          { text: "Completed", status: "done" }
      ]);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource|Array|Object`

The data source to which the columns should be bound.

##### columnsDataSource `kendo.data.DataSource|Array|Object`

The data source to which the columns should be bound.

## Events

### columnsDataBinding 

Fired before the TaskBoard binds the columns' data source.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnsDataBinding: function () {
          alert("columnsDataBinding fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The widget will not bind its data and the `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

### columnsDataBound  

Fired when the TaskBoard's columns are bound to their data source.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        columnsDataBound: function () {
          alert("columnsDataBound fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

### select   

Fired when the user selects a card in the TaskBoard.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        select: function (ev) {
            var taskBoard = ev.sender;
            var cardElm = ev.card;
            var dataItem = taskBoard.dataItem(cardElm);

            alert(dataItem.get("title") + " selected!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `jQuery`

The selected card element wrapped in jQuery object.

##### e.preventDefault `Function`

If invoked prevents the selection. 

### dataBinding 

Fired before the TaskBoard binds to its data source.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        dataBinding: function () {
          alert("dataBinding fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The widget will not bind its data and the `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.

### dataBound  

Fired when the TaskBoard is bound to data from its data source.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        dataBound: function () {
          alert("dataBound fired!")
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

### deleteCard

Fired when the user deletes a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        deleteCard: function (ev) {
          alert(ev.card.get("title") + " deleted!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be deleted.

##### e.preventDefault `Function`

If invoked prevents the deletion. 

### deleteColumn

Fired when the user deletes a column.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        deleteColumn: function (ev) {
          alert(ev.column.get("text") + " deleted!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be deleted.

##### e.preventDefault `Function`

If invoked prevents the deletion. 

### editCard

Fired when the user edits or creates a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        editCard: function (ev) {
          alert(ev.card.get("title") + " editing!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be edited.

##### e.preventDefault `Function`

If invoked prevents the edit action. 

### editColumn

Fired when the user edits or creates a column.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        editColumn: function (ev) {
          alert(ev.column.get("text") + " deleted!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be edited.

##### e.preventDefault `Function`

If invoked prevents the edit action.

### execute

Fires when a command is executed.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        execute: function (ev) {
          // Prevent Select command
          if(ev.command === "SelectCardCommand") {
            ev.preventDefault();
          } else {
            // Notify all others
            alert(ev.command + " executed!");
          } 
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.command `String`

The command name to be executed.

##### e.options `Object`

The options to be passed in the command. Possible fields included are card and column data items, card and column elements and string value passed to the command.  

##### e.preventDefault `Function`

If invoked prevents the command execution.

### move  

Fired when the user moves a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        move: function (ev) {
          console.log(ev.card.get("title") + " will move to " + ev.column.get("text"));
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved. 

##### e.item `jQuery`

The element that is dragged.

##### e.target `jQuery`

The target element under cursor against which placeholder is positioned.

##### e.list `kendo.ui.Sortable`

The Sortable widget instance which the item belongs to (useful in case there are connected Sortable widgets).

##### e.draggableEvent `Object`

The original draggable's drag event data.

### moveEnd

Fired when the user dropped a card in a column.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        moveEnd: function (ev) {
          if(ev.action === "receive") {
            console.log(ev.card.get("title") + " moved to " + ev.column.get("text"));
          }
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved. 

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.preventDefault `Function`

If invoked prevents the sort action. The element will be reverted at its original position. The hint and placeholder will be destroyed.

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position of the item in the Sortable collection. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item will be placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

### moveStart

Fired when the user started moving a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        moveStart: function (ev) {
          console.log(ev.card.get("title") + " moving from " + ev.column.get("text"));
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved. 

##### e.draggableEvent `Object`

The original draggable's dragstart event data.

##### e.item `jQuery`

The element that will be dragged.

##### e.preventDefault `Function`

If invoked prevents the drag start action. The element will remain at its original position. The hint and placeholder will not be initialized.

### change 

Fired when the user changed the card order or status by dragging.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        change: function (ev) {
          if(ev.action === "receive") {
            console.log(ev.card.get("title") + " changed to " + ev.column.get("text"));
          }
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The card data item being moved.

##### e.cardElement `jQuery`

The card element being moved wrapped in a jQuery object.

##### e.column `kendo.data.Model`

The column data item from where the card is moved.

##### e.columnElement `jQuery`

The column element (wrapped in a jQuery object) from where the card is moved.

##### e.action `String`

Possible values are: "sort" - indicates that item's position was changed inside the same Sortable container; "remove" - indicates that the item was removed from current Sortable widget; "receive" - indicates that the item was received by a connected Sortable widget instance;

##### e.item `jQuery`

The element that is dragged.

##### e.oldIndex `Number`

The original position where the item was located at. In case the item is received from connected Sortable the value will be -1

##### e.newIndex `Number`

The position where item is placed. In case the item is removed from connected Sortable the value will be -1

##### e.draggableEvent `Object`

The original draggable's drag event data.

### saveCard  

Fired when the user saves a card.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        saveCard: function (ev) {
          alert(ev.card.get("title") + " saved!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.card `kendo.data.Model`

The data item of the card to be saved.

##### e.preventDefault `Function`

If invoked prevents the save action. 

### saveColumn

Fired when the user saves a column.

#### Example

    <div id="taskBoard"></div>

    <script>
      $("#taskBoard").kendoTaskBoard({
        dataOrderField: "order",
        dataSource: [
          { id: 1, order: 1, title: "Task 1", description: "Description 1", status: "backlog", category: "red" },
          { id: 2, order: 2, title: "Task 11", description: "Description 11", status: "backlog", category: "red" },
          { id: 3, order: 3, title: "Task 2", description: "Description 2", status: "doing", category: "green" },
          { id: 4, order: 4, title: "Task 22", description: "Description 22", status: "doing", category: "green" },
          { id: 5, order: 5, title: "Task 3", description: "Description 3", status: "done", category: "blue" }
        ],
        columns: [
          { text: "Backlog", status: "backlog" },
          { text: "Doing", status: "doing" },
          { text: "Done", status: "done" }
        ],
        saveColumn: function (ev) {
          alert(ev.column.get("text") + " saved!");
        }
      });
    </script>

#### Event Data

##### e.sender `kendo.ui.TaskBoard`

The widget instance which fired the event.

##### e.column `kendo.data.Model`

The data item of the column to be saved.

##### e.preventDefault `Function`

If invoked prevents the save action.




