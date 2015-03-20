---
title: Overview
page_title: User guide for Kendo UI MaskedTextBox widget | Kendo UI documentation
description: How to configure a simple Kendo UI MaskedTextBox widget, add MaskedTextBox, handle events to control widget's behavior.
---

# MaskedTextBox

The MaskedTextBox HtmlHelper extension is a server-side wrapper for the [Kendo UI MaskedTextBox](/api/web/maskedtextbox) widget.

## Getting Started

### Configure Kendo MaskedTextBox

Here is how to configure a simple Kendo MaskedTextBox:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

2.  Create a new action method which renders the view:

        public ActionResult Index()
        {
            return View();
        }
3.  Add a maskedtextbox:
    - WebForms

            <%: Html.Kendo().MaskedTextBox()
                    .Name("maskedtextbox") //The name of the maskedtextbox is mandatory. It specifies the "id" attribute of the widget.
                    .Mask("(000) 000-0000") //Set mask value of the maskedtextbox
                    .Value("(123) 345-6789") //Set value of the maskedtextbox
            %>
    - Razor

            @(Html.Kendo().MaskedTextBox()
                  .Name("maskedtextbox") //The name of the maskedtextbox is mandatory. It specifies the "id" attribute of the widget.
                  .Mask("(000) 000-0000") //Set mask value of the maskedtextbox
                  .Value("(123) 345-6789") //Set value of the maskedtextbox
            )

### Define widget's mask value

The MaskedTextBox has [a list of predefined mask rules](/web/maskedtextbox/overview#predefined-mask-rules),
which can be used to compose the widget's mask.

#### WebForms - set a `zip code` mask

    <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox")
            .Mask("00000-9999") //Set zip code
    %>

#### Razor - set a `zip code` mask

    @(Html.Kendo().MaskedTextBox()
          .Name("maskedtextbox")
          .Mask("00000-9999") //Set zip code
    )

> If no mask is defined widget will allow any input.

### Define a custom mask rule

The MaskedTextBox gives the ability to define custom mask rules if no of the predefined ones is sufficient.
To add a custom rule use the **Rules** method:

#### WebForms - define a custom rule for "-" and "+" symbols

    <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox")
            .Rules(rules => {
                rules.Add('~', "/[+-]/");
            })
            .Mask("~0000") //Set a mask with custom rule
    %>

#### Razor - define a custom rule for "-" and "+" symbols

    @(Html.Kendo().MaskedTextBox()
          .Name("maskedtextbox")
          .Rules(rules => {
              rules.Add('~', "/[+-]/");
          })
          .Mask("~0000") //Set a mask with custom rule
    )

> Widgets supports [JavaScript Reguler Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
defined as a string or JavaScript function.

## Accessing an Existing MaskedTextBox

You can reference an existing MaskedTextBox instance via [jQuery.data()](http://api.jquery.com/jQuery.data/).
Once a reference has been established, you can use the [API](/api/web/maskedtextbox#methods) to control its behavior.


### Accessing an existing MaskedTextBox instance

    //Put this after your Kendo MaskedTextBox for ASP.NET MVC declaration
    <script>
    $(function() {
        // Notice that the Name() of the maskedtextbox is used to get its client-side instance
        var maskedtextbox = $("#maskedtextbox").data("kendoMaskedTextBox");
    });
    </script>


## Handling Kendo UI MaskedTextBox events

You can subscribe to all [events](/api/web/maskedtextbox#events) exposed by Kendo UI MaskedTextBox:

### WebForms - subscribe by handler name

    <%: Html.Kendo().MaskedTextBox()
            .Name("maskedtextbox")
            .Events(e => e
                .Change("maskedtextbox_change")
            )
    %>
    <script>
    function maskedtextbox_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by handler name

    @(Html.Kendo().MaskedTextBox()
          .Name("maskedtextbox")
          .Events(e => e
              .Change("maskedtextbox_change")
          )
    )
    <script>
    function maskedtextbox_change() {
        //Handle the change event
    }
    </script>


### Razor - subscribe by template delegate

    @(Html.Kendo().MaskedTextBox()
          .Name("maskedtextbox")
          .Events(e => e
              .Change(@<text>
                function() {
                    //Handle the change event inline
                }
              </text>)
          )
    )

