---
title: Editing Functionality
page_title: Editing Widgets | Working with Widgets | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn how to configure editing for editable widgets like the Grid, Scheduler, and ListView."
slug: kendoui_editing_gettingstarted
position: 50
---

# Editing Functionality

Some Kendo UI widgets provide the editing feature that is implemented with a specific editor element or a form that is bound to the model by using the [Kendo UI MVVM]({% slug overview_mvvmpattern_kendoui %}) bindings.

The following widgets support editing:
* [Kendo UI Grid]({% slug editing_kendoui_grid_widget %})
* [Kendo UI ListView]({% slug overview_kendoui_listview_widget %}#selection-navigation-and-editing)
* [Kendo UI TreeList]({% slug editing_kendoui_treelist_widget %})
* [Kendo UI Scheduler]({% slug overview_kendoui_scheduler_widget %})
* [Kendo UI Gantt]({% slug overview_kendoui_gantt_widget %})

## Getting Started

The Kendo UI widgets that support editing provide the following common configuration options:
- `editable`&mdash;Controls whether the editing is enabled or not. For instance, the editing functionality in the Kendo UI Grid widget is disabled by default. For detailed information, refer to [the API article on editing of the Grid](/api/javascript/ui/grid/configuration/editable).
- `editable.template`&mdash;Allows you to define a custom editor template.

> Some widgets provide additional `editable` options. For more details, refer to the particular widget API documentation. For example, the Grid widget can disable the `remove` functionality by using the [`editable.destroy`](/api/javascript/ui/grid/configuration/editable.destroy) option.

The Kendo UI widgets that support editing provide the following common events:
- `edit`&mdash;Triggered before the editor form is shown. The UI elements are already bound to the model.
- `save`&mdash;Triggered before the model is saved. The editor form is still open.
- `remove`&mdash;Triggered before the model is removed.

> * Only the Scheduler and the Gantt support the preventing of the [`edit`](/api/javascript/ui/scheduler/events/edit), [`save`](/api/javascript/ui/scheduler/events/save), and [`remove`](/api/javascript/ui/scheduler/events/remove) events.
> * The widgets use only one editor form. It applies the same editor template for the `create` and `update` actions.

To enable the editing functionality of the widget:

1. Configure the [CRUD](/framework/datasource/crud) (Create, Read, Update, Destroy) data operation actions of the DataSource.
2. Define the model fields by using the [`schema.model`](/api/javascript/data/datasource/configuration/schema.model) option.
3. Enable the `editable` option.

For more information on setting up editing in Kendo UI, refer to the [article on editing of the Grid]({% slug editing_kendoui_grid_widget %}). The approaches are largely applicable to the other Kendo UI widgets which support the editing.

## Working with Editor Forms

You can [build editor forms](#building-editor-forms) and [bind specific models to editor forms](#binding-specific-models-to-editor-forms).

### Building Editor Forms

A Kendo UI widget builds an editor form dynamically based on the [`schema.model`](/api/javascript/data/model/methods/define) structure and more specifically the `fields` collection.

> * Define the `id` field of the data items in `schema.model.id`. This ensures the correct adding, editing, and deleting of items.
> * Define the datatype of the fields to take advantage of the built-in editors, filterable UI and correct sorting, filtering and grouping.

The following table lists the available data types.

Data Type | Editor | Parser
:-------: | :--------: | :------------------:
`string`| `<input type="text" class="k-input k-textbox" name="fieldName" data-bind="value:fieldName">` | Internal method. String conversion.
`number`| [`kendo.ui.NumericTextBox`](/controls/editors/numerictextbox/overview) | [`kendo.parseFloat()`](/api/javascript/kendo/methods/parsefloat)
`date` | [`kendo.ui.DatePicker`](/controls/editors/datepicker/overview) | [`kendo.parseDate()`](/api/javascript/kendo/methods/parsedate)
`boolean` | `<input type="checkbox" name="fieldName" data-type="boolean" data-bind="checked:fieldName">`| Internal method. Boolean conversion.
`object` |  `<input type="text" class="k-input k-textbox" name="fieldName" data-bind="value:fieldName">` | Not processed. The value is passed as is.

The following example demonstrates how to declare the fields definitions through the DataSource [`schema.model `](/api/javascript/data/datasource/configuration/schema.model).

        schema: {
            model: {
                 id: "id",
                 fields: {
                    id: {
                        editable: false,
                        // A defaultValue will not be assigned (default value is false).
                        nullable: true
                    },
                    name: {
                        type: "string",
                        validation: { required: true }
                    },
                    price: {
                         // A NumericTextBox editor will be initialized in edit mode.
                         type: "number",
                         // When a new model is created, this default will be used.
                         defaultValue: 42
                    },
                    discontinued:{
                        // A checkbox editor will be initialized in edit mode.
                        type: "boolean"
                    },
                    created: {
                        // A date picker editor will be initialized in edit mode.
                        type: "date"
                    },
                    supplier: {
                        type: "object" ,
                        defaultValue: { companyName: "Progress", companyId: 1 }
                    }
                }
            }
        }

> The Kendo UI Scheduler has [a static model structure](/api/javascript/data/schedulerevent#fields) and it follows only the predefined model fields list. To edit the additional fields, use [a custom editor template]({% slug howto_customize_editand_event_templates_scheduler %}).

The auto-generated editor form is bound to the model through the [Kendo UI MVVM pattern]({% slug overview_mvvmpattern_kendoui %}). The widget also allows you to override this form by using a custom editor template.

Once the form is created, the widget performs the following actions:

1. [Binds](/api/javascript/kendo/methods/bind) the editor fields to the model.
2. Triggers the `edit` event.
3. Shows the editor form.
4. Updates the model based on the changes made in the editors.
5. When the editor form is about to close, the widget triggers the `save` event. At this stage, the changes can be either accepted or declined.

> The editor form is created and bound before the `edit` event is triggered, and is already populated.

### Binding Specific Models to Editor Forms

When the `edit` event is triggered, the widget gets the corresponding model and binds the generated or custom editor form to it through the [Kendo UI MVVM pattern]({% slug overview_mvvmpattern_kendoui %}). The connection between the model fields and the form editors is done by using the [`value` binding]({% slug valuebinding_mvvm_kendoui %}).

This connection respects the following rules:

- On initial load, the editor form is populated using the model values.
- The model is updated when the related `editor` triggers a `change` event. The `value binding` gets its value and populates the model field.
- The form editors are updated when the [`ObservableObject` API](/api/javascript/data/observableobject) is used. Use the [`set` method](/api/javascript/data/observableobject/methods/set) if you want to update the corresponding UI editors. If this API is omitted, the editors do not change.

## Common Scenarios

* [Defining custom editor templates](#defining-custom-editor-templates)
* [Defining default model values](#defining-default-model-values)
* [Referencing specific editor controls](#referencing-specific-editor-controls)
* [Updating models through specific editors](#updating-models-through-specific-editors)
* [Adding editors without using MVVM bindings](#accessing-editors-without-using-mvvm-bindings)
* [Accessing models before editing](#accessing-models-before-editing)
* [Accessing models by UID](#accessing-models-by-uid)
* [Identifying new models](#identifying-new-models)

### Defining Custom Editor Templates

When the default editor form does not cover your business needs, create a custom editor form by using the `editable.template` option that allows you to define a custom editor form.

> Each widget uses only one editor form for the `create` and `update` actions.

The following rules apply to the editor template:
- The template uses the [Kendo UI template syntax]({% slug overview_kendoui_templatescomponent %}).
- The editor is bound to a specific `model` field through the [MVVM `value` binding]({% slug valuebinding_mvvm_kendoui %}).

## Defining Default Model Values

By default, the model fields have predefined values based on the field type. You can also define the field as `nullable`. To define a specific default value, use the `schema.model.fields.defaulValue` option. The `value` binding uses the model value to set the editor value. The value of the editor will be lost in favor of the model value.

    schema: {
        model: {
            id: "ProductID",
            fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { defaultValue: "Product Name 1" }
            }
        }
    }

### Referencing Specific Editor Controls

You can access a specific editor element from the editor form by using the `edit` event of the widget. For a sample demo, refer to [this runnable example]({% slug howto_access_editor_controlsin_edit_events_grid %}).

### Updating Models through Specific Editors

To modify the `model` by updating the relevant editor, trigger the `change` event manually. In this way, you notify the `value` binding of the change and the model is updated accordingly.

> The Kendo UI widgets provide the [`trigger` method](/api/javascript/observable/methods/trigger) which must be used to trigger the `change` event.

### Adding Editors without Using MVVM Bindings

> * To implement custom editing, use a custom editor template.
> * The Kendo UI MVVM bindings cannot be used anymore and the model binding should be handled manually.

To avoid defining a custom editor template for editing a specific model field, add an additional editor after the form is created:

1. Wire the `edit` event of the widget.
1. Add the editor manually in the `edit` event handler.
1. Set editor's value by using the model, available in the arguments of the `edit` event handler.
1. Wire the `change` event of the editor and update the `model` accordingly.

For a sample demo on adding a control to the editor form, refer to [this runnable example]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).

### Accessing Models before Editing

Wire the `edit` event of the widget. You will get the model from the passed arguments.

    function edit(e) {
        var model = e.model;
    }

> The Scheduler passes the `e.event` field instead of the `model` one. The event is an instance of the [`SchedulerEvent`](/api/javascript/data/schedulerevent) class. For more details, see the corresponding `edit` event API documentation of the respective Kendo UI widget.

### Accessing Models by UID

Every model has a unique identifier. It is applied to the HTML element that holds the editor form. You are able to recognize that element by the `data-uid` HTML attribute. Use that `uid` value to get the model from the DataSource of the widget by using [`getByUid` method](/api/javascript/data/datasource/methods/getbyuid).

### Identifying New Models

To differentiate between the `create` and `update` actions, use the [`Model.isNew()` method](/api/javascript/data/model/methods/isnew).

## Troubleshooting

This section provides solutions for common issues you might encounter while configuring the editing functionality.

### Model field values in edit events are not updated

**Description** A common scenario is to modify the model in the `edit` event of the widget which will be prevented if the initial (default) value of the model field is invalid. In this case, the attached UI validation prevents any additional model modifications until the value is updated from the editor form.

**Cause** The following actions that occur during a model update create the issue:
* A model field is updated using the [`set` method](/api/javascript/data/observableobject/methods/set).
* The model gets the new value, compares it to the current one and, if they are different, the new value is ready to be set.
* UI validation is triggered. Note that it uses the editor element value to perform the validation check. However, it is invalid and hence the new value that we try to set is ignored.

**Solution** Define a valid `defaulValue` by using the [`schema.model.fields.defaultValue` option](/api/javascript/data/model/methods/define).

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
