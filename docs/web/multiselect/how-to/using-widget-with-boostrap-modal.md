---
title: Using widget with Boostrap modal window
page_title: Using widget with Boostrap modal window
description: Using widget with Boostrap modal window
---

# Using widget with Boostrap modal window

The example below demonstrates how to use the Kendo UI Multiselect widget with Boostrap modal window and bind values.

#### Example:

```html
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <div id="game-container">
      GameList
      <div id="game-list" 
           data-role="listview" 
           data-template="gameTemplate"
           data-bind="source: games">
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
          </div>
          <div class="modal-body">

            <div 
                 id="people-multiselect" 
                 data-role="multiselect"
                 data-filter="startswith"
                 data-placeholder="Select People..."
                 data-text-field="name"
                 data-value-field="id"
                 data-bind="source: players, value: game.players, events: { close: close }">
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>

    <script type="text/x-kendo-tmpl" id="gameTemplate">
      <button class='btn btn-default' data-bind='click: selectGame'>        
          Show #=name#
      </button>
    </script>

    <script type="text/javascript">
      $(function () {
        var viewModel = kendo.observable({
          selectGame: showGameDetails,
          games: new kendo.data.DataSource({
            data: [
              { name: "BlackJack", id: 1, players: new kendo.data.ObservableArray([]) },
              { name: "Rummy", id: 2, players: new kendo.data.ObservableArray([]) },
              { name: "Poker", id: 3, players: new kendo.data.ObservableArray([]) },
            ]
              }),
              });

              var viewModelDetails = kendo.observable({
              game: {},
              players: new kendo.data.DataSource({
              data: [
              { name: "Jane Doe", id: 1 },
              { name: "Jack Doe", id: 2 },
              { name: "Steve Doe", id: 3 },
              { name: "Brian Doe", id: 4 },
              { name: "Clair Doe", id: 5 },
              { name: "Francis Doe", id: 6 },
              { name: "Friar Doe", id: 7 }
            ]
          }),
          close: function(e) {
            e.sender.dataSource.filter({});
          }
        });

        bindView();

        function showGameDetails(e) {
          viewModelDetails.set("game", e.data);
          kendo.bind($("#myModal"), viewModelDetails);
          $("#myModal").modal("show");
        }

        function bindView() {
          kendo.bind($("#game-container"), viewModel);
        }            
      });
    </script>
```
