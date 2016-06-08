---
title: Editing Functionality
page_title: Editing Functionality | Kendo UI Getting Started
description: "Configure the editing functionality in Kendo UI widgets such as the Grid, Scheduler, and ListView."
slug: kendoui_editing_gettingstarted
position: 5
---

# Editing Functionality

The editing functionality in some Kendo UI widgets is implemented with a specific editor element/form that is bound to the model using the [Kendo UI MVVM]({% slug overview_mvvmpattern_kendoui %}) bindings.

These Kendo UI widgets are:

* [Grid]({% slug overview_kendoui_grid_widget %})
* [ListView]({% slug overview_kendoui_listview_widget %})
* [TreeList]({% slug overview_kendoui_treelist_widget %})
* [Scheduler]({% slug overview_kendoui_scheduler_widget %})
* [Gantt]({% slug overview_kendoui_gantt_widget %})

## Getting Started

### Options

The Kendo UI widgets which support editing have the following configuration options:

- `editable`&mdash;This option controls whether the editing is enabled or not. For instance, the editing functionality in the Kendo UI Grid widget is disabled by default. For detailed information, refer to [the API article on editing of the Grid](/api/javascript/ui/grid#configuration-editable).
- `editable.template`&mdash;Allows you to define a custom editor template.

> **Important**
>
> Some widgets provide additional `editable` options. For more details, see the particular widget API documentation. For example, the Grid widget can disable the `remove` functionality by using the [`editable.destroy`](/api/javascript/ui/grid#configuration-editable.destroy) option.

### Events

The Kendo UI widgets which support editing have the following common events:

- `edit`&mdash;This event is triggered before the editor form is shown. The UI elements are already bound to the model.
- `save`&mdash;Triggered before the model is saved. The editor form is still open.
- `remove`&mdash;Triggered before the model is removed.

> **Important**
> * Only the Scheduler widget supports prevention of the [`edit`](/api/javascript/ui/scheduler#events-edit), [`save`](/api/javascript/ui/scheduler#events-edit), and [`remove`](/api/javascript/ui/scheduler#events-edit) events.
> * The widget uses only one editor form. It applies the same editor template for the `create` and `update` actions.

### Setup

To enable the editing functionality of the widget, perform the following steps:

1. Configure the [CRUD](/framework/datasource/crud) (Create, Read, Update, Destroy) data operation actions of the DataSource.
2. Define the model fields by using the [`schema.model`](/api/javascript/data/datasource#configuration-schema.model) option.
3. Enable the `editable` option.

For more information on how to set up the editing functionality in Kendo UI widgets, refer to the [article on editing of the Grid]({% slug editing_kendoui_grid_widget %}). The approaches are largely applicable, with minor differences, to the other Kendo UI widgets which support the editing functionality.

## Basic Concepts

### How Widgets Edit Model Instances

A Kendo UI widget builds an editor form dynamically based on the [`schema.model`](/api/javascript/data/model#methods-Model.define) structure and more specifically the `fields` collection, as demonstrated in the example below.

###### Example

    schema: {
        model: {
            id: "ProductID",
            fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { validation: { required: true } },
                UnitPrice: { type: "number", validation: { required: true, min: 1} },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number", validation: { min: 0, required: true } }
            }
        }
    }

> **Important**
>
> The Kendo UI Scheduler has [a static model structure](/api/javascript/data/schedulerevent#fields) and it follows only the predefined model fields list. If you want to edit additional fields, use [a custom editor template]({% slug howto_customize_editand_event_templates_scheduler %}).

The auto-generated editor form is bound to the model through the [Kendo UI MVVM pattern]({% slug overview_mvvmpattern_kendoui %}). The widget also allows you to override this form by using a custom editor template.

Once the form is created, the widget performs the following actions:

1. It [binds](/api/javascript/kendo#methods-bind) the editor fields to the model.
2. Triggers the `edit` event.
3. Shows the editor form.
4. Updates the model based on the changes made in the editors.
5. When the editor form is about to close, the widget triggers the `save` event. At this stage, the changes can be either accepted or declined.

> **Important**
>
> The editor form is created and bound before the `edit` event is triggered, and is already populated.

### How Specific Models Are Bound to Editor Forms

When the `edit` event is triggered, the widget gets the corresponding model and binds the generated or custom editor form to it through the [Kendo UI MVVM pattern]({% slug overview_mvvmpattern_kendoui %}). The connection between the model fields and the form editors is done by using the [`value` binding]({% slug valuebinding_mvvm_kendoui %}).

This connection abides to the following rules:

- On initial load, the editor form is populated using the model values.
- The model is updated when the related `editor` triggers a `change` event. The `value binding` gets its value and populates the model field.
- The form editors are updated when the [`ObservableObject` API](/api/javascript/data/observableobject) is used. Use the [`set` method](/api/javascript/data/observableobject#methods-set) if you want to update the corresponding UI editors. If this API is omitted, the editors do not change.

## Common Scenarios

### Define Custom Editor Templates

When the default editor form does not cover your business needs, create a custom editor form. As mentioned in the [section on getting started](#getting-started) section, the Kendo UI widgets provide an `editable.template` option that allows you to define a custom editor form.

The following rules apply to the editor template:

- The template uses the [Kendo UI template syntax]({% slug overview_kendoui_templatescomponent %}).
- The editor is bound to a specific `model` field through the [MVVM `value` binding]({% slug valuebinding_mvvm_kendoui %}).

> **Important**
>
> The widget uses only one editor form for the `create` and `update` actions.

### Define Model Default Values

By default, the model fields have predefined values based on the field type. Note that you are also able to define the field as `nullable`.

If you want to define a specific default value, use the `schema.model.fields.defaulValue` option. The `value binding` uses the model value to set the editor value.

###### Example

    schema: {
        model: {
            id: "ProductID",
            fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { defaultValue: "Product Name 1" }
            }
        }
    }

> **Important**
>
> The value of the editor will be lost in favor of the model value.

### Get References to Specific Editor Controls

You are able to access a particular editor element from the editor form by using the `edit` event of the widget.

For a sample demo which demonstrates how to accomplish this task, refer to [this runnable example]({% slug howto_access_editor_controlsin_edit_events_grid %}).

### Update Models by Using Specific Editors

If you want to modify the `model` by updating the relevant editor, trigger the `change` event manually. Thus you notify the `value binding` of the change and the model is updated accordingly.

> **Important**
>
> The Kendo UI widgets have their own [`trigger` method](/api/javascript/observable#methods-trigger), which must be used to trigger the `change` event.

### Add Additional Editors without Using Kendo UI MVVM Bindings

> **Important**
>
> To accomplish custom editing, it is recommended use a custom editor template.

If you want to avoid defining a custom editor template for editing a specific model field, add an additional editor after the form is created.

To do this, follow the steps below:

**Step 1** Wire the `edit` event of the widget.

**Step 2** Add the editor manually in the `edit` event handler.

**Step 3** Set editor's value by using the model, available in the arguments of the `edit` event handler.

**Step 4** Wire the `change` event of the editor and update the `model` accordingly.

> **Important**
>
> The Kendo UI MVVM bindings cannot be used anymore and the model binding should be handled manually.

For a sample demo that demonstrates how to add a control to the editor form, refer to [this runnable example]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).

### Access Models before Editing

Wire the `edit` event of the widget. You will get the model from the passed arguments.

###### Example

    function edit(e) {
        var model = e.model;
    }

> **Important**
>
> The Scheduler passes the `e.event` field instead of the `model` one. The event is an instance of the [`SchedulerEvent`](/api/javascript/data/schedulerevent) class. For more details, see the corresponding `edit` event API documentation of the respective Kendo UI widget.

### Access Models by UID

Every model has a unique identifier. It is applied to the HTML element that holds the editor form. You are able to recognize that element by the `data-uid` HTML attribute. Use that `uid` value to get the model from the DataSource of the widget by using [`getByUid` method](/api/javascript/data/datasource#methods-getByUid).

### Find Out Whether Models Are New

If you need to differentiate between `create` and `update` actions, use the [`Model.isNew()` method](/api/javascript/data/model#methods-isNew).

## Troubleshooting

### Model Field Values in Edit Events Are Not Updated

A common scenario is to modify the model in the `edit` event of the widget. This would be prevented, if the initial (default) value of the model field is invalid. In this case, the attached UI Validation kicks in and prevents any additional model modifications until the value is updated from the editor form.

Here are the actions that are taken during a model update and which create the issue:

1. A model field is updated using the [`set` method](/api/javascript/data/observableobject#methods-set).
2. The model gets the new value, compares it to the current one and, if they are different, the new value is ready to be set.
3. UI validation is triggered. Note that it uses the editor element value to perform the validation check. However, it is invalid and hence the new value that we try to set is ignored.

**Solution**

Define a valid `defaulValue` by using the [`schema.model.fields.defaultValue` option](/api/javascript/data/model#methods-Model.define).

## See Also

Other articles on Kendo UI widget basics:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
