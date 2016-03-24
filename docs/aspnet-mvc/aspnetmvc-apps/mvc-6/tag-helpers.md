---
title: Tag Helpers
page_title: Tag Helpers | Telerik UI for ASP.NET MVC 6
description: "Learn the basics when working with Telerik Tag Helpers for ASP.NET MVC 6."
previous_url: /aspnet-mvc/mvc-6/tag-helpers
slug: taghelpers_aspnetmvc6_aspnetmvc
position: 4
---

# Overview of Kendo Tag Helpers

Kendo Tag Helpers lets the users configure kendo widgets using the new Tag Helpers feature in MVC 6.

## Adding Tag Helpers to a view

To configure an ASP.NET MVC6 project that enables you to use Kendo Tag Helpers, you need to add the @addTagHelper directive to your cshtml file:

            @addTagHelper "*, Kendo.Mvc"
            
You can also add the directive globally in the Views/_ViewImports.cshtml.

## Configuration

Configuring the Tag Helpers is done through predefined strongly typed attributes, which also provide intellisense.
Complex and composite properties are not supported, as well as nested configuration tags.

###### Example: configuring NumericTextBox Tag Helper

        <kendo-numerictextbox name="currency" format="c" min="0"
            enable="true" max="100" value="30">
        </kendo-numerictextbox>

## Events

All widget events are supported in the Tag Helpers. The event can only be set as a string literal, pointing to a javascript function handler.
The event is set as an attribute, preceded by the 'on-' prefix.

 ###### Example: setting the change event of a NumericTextBox

        <kendo-numerictextbox name="currency" on-change="changeEvent">
        </kendo-numerictextbox>

## NumericTextBox Tag Helper

### Overview

Here is an example of how you can define a kendo NumericTextBox using a Tag Helper

###### Example

        <kendo-numerictextbox name="numeric"></kendo-numerictextbox>
        
You can also bind the numerictextbox to a particular model field using the 'for' attribute, which is the equivalen of using the 'Html.Kendo().NumericTextBoxFor<decimal>()' Html Helper

###### Example

        @model Kendo.Mvc.Examples.Models

        <kendo-numerictextbox for="CustomerID"></kendo-numerictextbox>

### Configuration

The NumericTextBox Tag Helper supports all the configuration options that the Html Helper does. They are passed as attributes of the tag

###### cshtml

        @(Html.Kendo().NumericTextBox<decimal>()
            .Name("currency")
            .Format("c")
            .Min(0)
            .Enable(true)
            .Max(100)
            .Value(30)
        )

###### tag helper

        <kendo-numerictextbox name="currency" format="c" min="0"
            enable="true" max="100" value="30">
        </kendo-numerictextbox>

## Button Tag Helper

### Overview

Here is an example of how you can define a kendo Button using a Tag Helper

###### Example

        <kendo-button name="button1">Click here!</kendo-button>


### Configuration

The Button Tag Helper configuration options are passed as attributes of the tag.

###### cshtml

        @(Html.Kendo().Button()
            .Name("imageButton")
            .HtmlAttributes(new { type = "button" })
            .ImageUrl(Url.Content("/shared/icons/sports/snowboarding.png"))
            .Content("Image icon"))

###### tag helper

        <kendo-button name="button1" type="button"
            image-url="/shared/icons/sports/snowboarding.png">Image icon</kendo-button>

## Window Tag Helper

### Overview

Here is an example of how you can define a kendo Window using a Tag Helper

###### Example

        <kendo-window name="window1">Window contents</kendo-window>
        
### Configuration

The Window Tag Helper configuration options are passed as attributes of the tag. The window contents are simply placed between the opening and closing tag.

###### cshtml

        @(Html.Kendo().Window()
            .Name("window")
            .Title("About Alvar Aalto")
            .Content(@<text>
                <div class="armchair">
                    <img src="@Url.Content("~/shared/web/window/armchair-402.png")"
                            alt="Artek Alvar Aalto - Armchair 402" />
                    Artek Alvar Aalto - Armchair 402
                </div>

                <p>
                    Alvar Aalto is one of the greatest names in modern architecture and design.
                    Glassblowers at the iittala factory still meticulously handcraft the legendary
                    vases that are variations on one theme, fluid organic shapes that let the end user
                    ecide the use. Interpretations of the shape in new colors and materials add to the
                    growing Alvar Aalto Collection that remains true to his original design.
                </p>
            </text>)
            .Draggable()
            .Width(600)
            .Events(ev => ev.Close("onClose"))
        )

###### tag helper

        <kendo-window name="window" title="About Alvar Aalto" draggable="true"
            width="400" on-close="onClose">
            <div class="armchair">
                <img src="@Url.Content("~/shared/web/window/armchair-402.png")"
                    alt="Artek Alvar Aalto - Armchair 402" />
                Artek Alvar Aalto - Armchair 402
            </div>

            <p>
                Alvar Aalto is one of the greatest names in modern architecture and design.
                Glassblowers at the iittala factory still meticulously handcraft the legendary
                vases that are variations on one theme, fluid organic shapes that let the end user
                ecide the use. Interpretations of the shape in new colors and materials add to the
                growing Alvar Aalto Collection that remains true to his original design.
            </p>
        </kendo-window>

## DatePicker Tag Helper

### Overview

Here is an example of how you can define a kendo DatePicker using a Tag Helper

###### Example

        <kendo-datepicker name="datepicker1"></kendo-datepicker>


### Configuration

The DatePicker Tag Helper configuration options are passed as attributes of the tag.

###### cshtml

        @(Html.Kendo().DatePicker()
                .Name("monthpicker")
                .Start(CalendarView.Year)
                .Depth(CalendarView.Year)
                .Format("MMMM yyyy")
                .Value(DateTime.Now)
        )

###### tag helper

        <kendo-datepicker name="monthpicker" start="CalendarView.Year" depth="CalendarView.Year"
            format="MMMM yyyy" value="DateTime.Now">
        </kendo-datepicker>

The ParseFormats option is of type string[] and can be assigned either by a ViewBag property, or a property of the model

###### example

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-datepicker name="datepicker" parse-formats="ViewBag.ParseDates"></kendo-datepicker>

## TimePicker Tag Helper

### Overview

Here is an example of how you can define a kendo TimePicker using a Tag Helper

###### Example

        <kendo-timepicker name="timepicker1"></kendo-timepicker>


### Configuration

The TimePicker Tag Helper configuration options are passed as attributes of the tag.

###### cshtml

        @(Html.Kendo().TimePicker()
                .Name("end")
                .Value("8:30 AM")
                .Min("8:00 AM")
                .Max("7:30 AM")
        )

###### tag helper

        <kendo-timepicker name="end" value="new DateTime(1900, 1, 1, 8, 30, 0)"
            min="new DateTime(1900, 1, 1, 8, 0, 0)" max="new DateTime(1900, 1, 1, 7, 30, 0)">
        </kendo-timepicker>

The ParseFormats option is of type string[] and can be assigned either by a ViewBag property, or a property of the model

###### example

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-timepicker name="timepicker" parse-formats="ViewBag.ParseDates"></kendo-timepicker>

## DateTimePicker Tag Helper

### Overview

Here is an example of how you can define a kendo DateTimePicker using a Tag Helper

###### Example

        <kendo-datetimepicker name="timepicker1"></kendo-datetimepicker>


### Configuration

The DateTimePicker Tag Helper configuration options are passed as attributes of the tag.

###### cshtml

        @(Html.Kendo().DateTimePicker()
                .Name("end")
                .Value(DateTime.Today)
                .Min(DateTime.Today)
                .Events(e => e.Change("endChange"))
        )

###### tag helper

        <kendo-datetimepicker name="end" value="DateTime.Today"
            min="DateTime.Today" on-change="endChange">
        </kendo-datetimepicker>

The ParseFormats option is of type string[] and can be assigned either by a ViewBag property, or a property of the model

###### example

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-datetimepicker name="datetimepicker" parse-formats="ViewBag.ParseDates"></kendo-datetimepicker>


## See Also

Other articles on Telerik UI for ASP.NET MVC in ASP.NET MVC 6 applications:

* [Overview of Telerik UI for ASP.NET MVC 6 - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in MVC 6 Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET MVC 6]({% slug knownissues_aspnetmvc6_aspnetmvc %})
