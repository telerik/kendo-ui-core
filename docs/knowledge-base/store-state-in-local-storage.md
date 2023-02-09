---
title: Store Widgets' State in Local Storage Using Generic Functions
page_title: Store Widgets' State in Local Storage Using Generic Functions
description: "Learn how to save and restore Knedo UI widgets' state, value and options using local storage."
slug: howto_store_state_in_local_storage
tags: local, storage, localstorage, widgets, kendo, options, value, state, save
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

The solution shows how to save and restore Kendo UI widgets' state, value and options using generic method and utilizing the local storage of the browser.

Code is provided by [OF360](https://of360.fr).

## Solution

The functionality relies on the following concepts:
* The [`edit`](/api/javascript/ui/grid/events/edit) event handler of the Grid provides a reference to the DOM element of the edit container.
* The Kendo UI widgets have a `data-role` HTML attribute rendered for the DOM element. This attribute holds the widget object.

For brevity, the following demo does not include the configuration for the Data Source transport. However, for the [CRUD operations]({% slug cruddataoperations_kendoui_datasourcecomponent %}) to work properly, they require a transport configuration.

````js
'use strict';

jQuery.fn.kendoGridStoreUserOptions = function (name, options) {

    if (typeof (name) === 'object' && options === undefined) {
        options = name;
        name = null;
    }

    name = name || document.location.hash;
    let grid = this.data('kendoGrid');
    if (!grid) return;

    options = options || {};

    adaptTemplates();
    load();

    grid.bind('dataBound', save);
    grid.bind('columnResize', save);
    grid.bind('columnShow', save);
    grid.bind('columnHide', save);
    grid.bind('columnReorder', save);
    grid.bind('columnLock', save);
    grid.bind('columnUnloc', save);

    return this;

    //---

    function adaptTemplates() {
        // Adaptation des templates définis sous forme de fonctions
        for (let gridColumn of grid.columns) {
            if (gridColumn
                && typeof gridColumn.template === 'function'
                && gridColumn.template.name !== 'anonymous') {
                try {
                    gridColumn.template = gridColumn.template();
                }
                catch (templateException) {
                    gridColumn.template = templateException.toString();
                }
            }
        }
    }

    function load() {
        if (!localStorage[name]) return;
        try {
            let storage = JSON.parse(localStorage[name]);
            if (!storage) return;
           
            if (storage.gridOptions) {               
                for (let index in grid.columns) {
                    if (storage.gridOptions.columns[index].field !== grid.columns[index].field) continue;
                    storage.gridOptions.columns[index].template = grid.columns[index].template;
                }
                grid.setOptions(storage.gridOptions);
            }

            if (storage.searchValue) {
                var input = $(".k-grid-search input")[0];
                input.value = storage.searchValue;
            }   
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }

    function save() {
        try {
            let gridOptions = grid.getOptions();
            delete gridOptions.toolbar;
            gridOptions.columns.forEach(c => delete c.template);
            let storage = {
                gridOptions: gridOptions,                
                searchValue: $(".k-grid-search input").val()
            };
            localStorage[name] = JSON.stringify(storage);
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }
}


//Dropdown Widget
jQuery.fn.kendoDropDownListStoreUserOptions = function (name, options) {

    let self = this;

    if (typeof (name) === 'object' && options === undefined) {
        options = name;
        name = null;
    }

    name = document.location.hash + '-' + (name || this.attr('id'));
    options = options || {};

    var dropdownlist = $(self).data("kendoDropDownList");

 
    load();
    self.on('change', save);

    return self;

    //---

    function load() {
        if (!localStorage[name]) return;
        try {
            let storage = localStorage[name];
            dropdownlist.value(storage);
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }

    function save() {
        try {
            let storage = dropdownlist.value();
            localStorage[name] = storage;
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }
}

//Combobox Widget
jQuery.fn.kendoComboboxStoreUserOptions = function (name, options) {
    
    let self = this;

    if (typeof (name) === 'object' && options === undefined) {
        options = name;
        name = null;
    }

    name = document.location.hash + '-' + (name || this.attr('id'));
    options = options || {};

    var combobox = $(self).data("kendoComboBox");


    load();
    self.on('change', save);

    return self;

    //---

    function load() {
        if (!localStorage[name]) return;
        try {
            let storage = localStorage[name];
            combobox.value(storage);
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }

    function save() {
        try {
            let storage = combobox.value();
            localStorage[name] = storage;
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }
}

//Multiselect Widget
jQuery.fn.kendoMultiSelectStoreUserOptions = function (name, options) {
  
    let self = this;

    if (typeof (name) === 'object' && options === undefined) {
        options = name;
        name = null;
    }

    name = document.location.hash + '-' + (name || this.attr('id'));
    options = options || {};

    var kendoMultiSelect = $(self).data("kendoMultiSelect");


    load();
    self.on('change', save);

    return self;

    //---

    function load() {
        if (!localStorage[name]) return;
        try {
            let storage = localStorage[name];
            kendoMultiSelect.value(storage);
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }

    function save() {
        try {
            let storage = kendoMultiSelect.value();
            localStorage[name] = storage;
        }
        catch (e) {
            console.error(e);
            // On ne fait rien, c'est une sécurité en cas de changement
            // de format, si les données en storage ne sont plus compatibles.
        }
    }
}
````

#### Example:

````
$("#dropdownlistDay").kendoDropDownList({
                    dataTextField: "text",
                    dataValueField: "value",
                    dataSource: datadropdownDay,
                    change: CombodateFilter
                }).kendoDropDownListStoreUserOptions(); 
````

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
