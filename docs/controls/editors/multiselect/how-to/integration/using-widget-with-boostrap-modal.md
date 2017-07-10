---
title: Use MultiSelects with Bootstrap Modal Windows
page_title: Use MultiSelects with Bootstrap Modal Windows | Kendo UI MultiSelect
description: "Learn how to use the Kendo UI MultiSelect widget with a Bootstrap modal window."
previous_url: /controls/editors/multiselect/how-to/using-widget-with-boostrap-modal
slug: howto_use_multiselect_with_bootstrap_modal_window_multiselect
---

# Use MultiSelects with Bootstrap Modal Windows

The following example demonstrates how to use the Kendo UI MultiSelect widget with a Bootstrap modal window and bind values.

###### Example

```html
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" />
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

            <select
                 id="people-multiselect"
                 data-role="multiselect"
                 data-filter="startswith"
                 data-placeholder="Select People..."
                 data-text-field="name"
                 data-value-field="id"
                 data-bind="source: players, value: game.players, events: { close: close }">
            </select>

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

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_bindobjectstongmodel_multiselect %}).
