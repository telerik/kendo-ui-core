---
title: Editing fundamentals
page_title: Kendo UI editing fundamentals
description: "Kendo UI editing fundamentals"
slug: kendoui_editing_gettingstarted
position: 5
---

# Kendo UI Editing fundamentals

The editing functionality in the Kendo UI widgets, like [Grid](/controls/data-management/grid/overview), [Scheduler](/controls/scheduling/scheduler/overview), [ListView](/controls/data-management/listview/overview), [TreeList](/controls/data-management/treelist/overview) and etc, is implemented with a specific editor element/form that is bound to the model using the [Kendo MVVM](/framework/mvvm/overview) bindings.

## Common configuration options and events

Widgets that support editing has the following configuration options:

- `editable`: controls whether the editing is *enabled*. For instance, editing in the *grid* is disabled by default ([more details](/api/javascript/ui/grid#configuration-editable))
- `editable.template`: the option allows to define a custom editor template

Widgets that support editing has the following common events:

- `edit` event: triggered before the editor form or the specific is shown. The UI elements are already bound to the model. **The event is preventable**
- `save` event: triggered before the model is saved. **The event is preventable**
- `remove` event: triggered before the model is removed. **The event is preventable**

> Note that **widget can use only one editor form**. It will use the same editor template for the `create` and `update` actions.

## Set up editing

The following steps should be preformed to enable editing in the widget:

- Configure the datasource's CRUD actions
- Define the model fields using [schema.model](/api/javascript/data/datasource#configuration-schema.model) option
- Enable `editable` option

[The Grid **editing** help topic has a detailed information about those steps](/controls/data-management/grid/editing). They are applicable to other widgets with minor differences.

## How the widget edits the model instance

The widget builds an editor form dynamically based on the [schema.model](/api/javascript/data/model#methods-Model.define) structure and more specifically the `fields` collection:

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

> Note that Scheduler has [a static model structure](/api/javascript/data/schedulerevent#fields) and it does follow only the predefined model fields list. If you would like to edit additional fields, then you will need to use [a custom editor template](/controls/scheduling/scheduler/how-to/custom-edit-and-event-templates)

The auto-generated editor form is bound to the model using [Kendo MVVM](/framework/mvvm/overview). The widget also allows to override this form using a custom editor template.

Once the form is created, the widget performs the following actions:

- [Binds](/api/javascript/kendo#methods-bind) the editor field/s to the model
- Triggers the `edit` event
- Shows the editor form
- Updates the model based on the changes made in the editor/s
- When editor form is closed, the widget triggers the `save` event. At that stage, the changes can be either *accepted* or *declined*

> Note that the editor form is created and bound before the `edit` event is triggered. The editor form will be already populated

## How a specific model is bound to the editor form

On *edit* the widget gets the corresponding **model** and binds the generated or custom editor form to it using [Kendo MVVM](/framework/mvvm/overview) framework. The connection between the model fields and form editors is done using the *[value](/framework/mvvm/bindings/value) binding*. It connection abides to the following rules:

- On initial load, the editor form is populated using the model values
- The **model** is updated when the related `editor` triggers a `change` event. The `value binding` gets its value and populates the model field
- The **form editors** are updated when the [ObservableObject API](/api/javascript/data/observableobject) is used. Use the[set method](/api/javascript/data/observableobject#methods-set), when you want to update the corresponding UI editors. If the API usage is omitted, the editors will be left unchanged

## Frequently asked questions / How-Tos

### Define a custom editor template

When the default editor form does not cover your business needs, then you will need to create a custom editor form.
As it was mentioned in the [common options](#common-configuration-options-and-events) section, the Kendo UI widgets provides an `editable.template` option that allows you to define a custom editor form. The following rules apply to the editor template:

- The template uses [Kendo Template](/framework/templates/overview) syntax
- Editor is bound to a specific `model` field using [MVVM value binding](/framework/mvvm/bindings/value)

> Note that the widget uses only one editor from for `create` and `update` actions

### Define a model default value

The model fields by default have a predefined values based on the type. Note that you can define the field as `nullable`.

If you would like to define a specific default value, then you will need to use the `schema.model.fields.defaulValue` option. The `value binding` will use the model value to set the *editor* value.

    schema: {
        model: {
            id: "ProductID",
            fields: {
                ProductID: { editable: false, nullable: true },
                ProductName: { defaultValue: "Product Name 1" }
            }
        }
    }

> Note that the value of the editor will be lost in favor of the model value.

### Get a reference to a specific editor control

You can access a particular editor element from the editor form using widget's `edit` event. Check this sample demo that demonstrates how to accomplish this task:

- [Access an editor control in the edit event](/controls/data-management/grid/how-to/Editing/access-editor-control)

### Update the model using a specific editor

If you would like to modify the `model` updating the relevant editor, then you will need to trigger `change` event manually. Thus you will notify the `value binding` for the change and the model will be updated accordingly. Note that Kendo widgets have their own [trigger](/api/javascript/observable#methods-trigger) method, which **should** be used to trigger the `change` event.

### Add an additional editor without using the Kendo MVVM bindings

>Note that the preferable way to accomplish custom editing is using a custom editor template

If you would like to avoid defining a custom editor template for editing a specific model fields, then you can add an additional editor after the form is created. For this approach, you will need to:

- Wire the `edit` event of the widget
- Add the editor manually in the `edit` event handler
- Set editor's value using the model available in the arguments of the `edit` event handler
- Wire the `change` event of the editor and update the `model` accordingly

> Note that MVVM bindings cannot be used any more and the model binding should be handled manually.

Here is a simple demo that demonstrates this approach:

- [Add a control to the editor form](/controls/scheduling/scheduler/how-to/add-control-to-customeditor)

### Access the model before editing

Wire the `edit` event of the widget. You will get it from the passed arguments:

    function edit(e) {
        var model = e.model;
    }

> Refer to the corresponding `edit` event documentation of the widget for more details

### Access the model by UID

Every model has an unique identifier. It is applied to the HTML element that holds the editor form. You will recognize that element as it has `data-uid` HTML attribute. You can use that `uid` value to get the model from the widget's datasource using [getByUid](/api/javascript/data/datasource#methods-getByUid) method.

### Find when the model is new

If you need to differentiate between `create` and `update` actions, then you will need to use the [Model.isNew()](/api/javascript/data/model#methods-isNew) method.

## Troubleshooting

### Cannot update the model field value in `edit` event

One common scenario is to modify the model in the `edit` event of the widget. This would be prevented, if the initial (default) value of the model field is invalid. In this case, the attached UI Validation will kick-in and will prevent any additional model modifications until the value is updated from the editor form.

Here are the actions done during a model update:

- a model field is updated using the [set]() method
- Model gets the new value, compares it with the current one and if there are different the new value is ready to be set
- UI validation is triggered. **It will use the editor element value** to perform the validation check. It, however, is invalid and hence **the new value that we try to set is ignored**

#### Solution

Define a valid `defaulValue`. This should be done with the [schema.model.fields.defaultValue](/api/javascript/data/model#methods-Model.define) option.
