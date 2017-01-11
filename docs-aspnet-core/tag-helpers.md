---
title: Tag Helpers
page_title: Tag Helpers | Telerik UI for ASP.NET Core
description: "Learn the basics when working with Telerik Tag Helpers for ASP.NET Core (aka MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnetmvc-apps/mvc-6/tag-helpers, /mvc-6/tag-helpers
slug: taghelpers_aspnetmvc6_aspnetmvc
position: 5
---

# Tag Helpers

The Kendo UI Tag Helpers let the user configure Kendo UI widgets by using the new Tag Helpers feature in ASP.NET Core.

## Getting Started

### Add Tag Helpers

To configure an ASP.NET Core project that enables you to use the Kendo UI Tag Helpers, you need to add the @addTagHelper directive to your `cshtml` file as demonstrated below.

###### Example

      @addTagHelper "*, Kendo.Mvc"

<!--*-->
You can also add the directive globally in the Views/_ViewImports.cshtml.

<!--_-->
### Configure Tag Helpers

Configuring the Tag Helpers is done through predefined strongly typed attributes, which also provide IntelliSense. Complex and composite properties are not supported, as well as nested configuration tags.

The example below demonstrates how to configure the `NumericTextBox` Tag Helper.

###### Example

      <kendo-numerictextbox name="currency" format="c" min="0"
          enable="true" max="100" value="30">
      </kendo-numerictextbox>

### Handle Events

All widget events are supported in the Tag Helpers. The event can only be set as a string literal, pointing to a JavaScript function handler. The event is set as an attribute, preceded by the `on-` prefix.

The example below demonstrates how to set the `change` event of a NumericTextBox.

###### Example

        <kendo-numerictextbox name="currency" on-change="changeEvent">
        </kendo-numerictextbox>

## NumericTextBox Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI NumericTextBox by using a Tag Helper.

###### Example

        <kendo-numerictextbox name="numeric"></kendo-numerictextbox>

You can also bind the NumericTextBox to a particular model field using the `for` attribute. This is the equivalent of using the `Html.Kendo().NumericTextBoxFor<decimal>()` HtmlHelper.

###### Example

        @model Kendo.Mvc.Examples.Models

        <kendo-numerictextbox for="CustomerID"></kendo-numerictextbox>

### Configuration

The NumericTextBox Tag Helper supports all the configuration options that the HtmlHelper does. They are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().NumericTextBox<decimal>()
            .Name("currency")
            .Format("c")
            .Min(0)
            .Enable(true)
            .Max(100)
            .Value(30)
        )
```
```tab-tagHelper

        <kendo-numerictextbox name="currency" format="c" min="0"
            enable="true" max="100" value="30">
        </kendo-numerictextbox>
```

## Button Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI Button by using a Tag Helper.

###### Example

        <kendo-button name="button1">Click here!</kendo-button>

### Configuration

The Button Tag Helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().Button()
            .Name("imageButton")
            .HtmlAttributes(new { type = "button" })
            .ImageUrl(Url.Content("/shared/icons/sports/snowboarding.png"))
            .Content("Image icon"))
```
```tab-tagHelper

        <kendo-button name="button1" type="button"
            image-url="/shared/icons/sports/snowboarding.png">Image icon</kendo-button>
```

## Dialog Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI Dialog by using a Tag Helper.

###### Example

        <kendo-dialog name="dialog1">Dialog contents</kendo-dialog>

### Configuration

The Dialog Tag Helper configuration options are passed as attributes of the tag. The dialog contents is placed between the opening and closing tag.

###### Example

```tab-cshtml

        @(Html.Kendo().Dialog()
            .Name("dialog")
            .Title("Software Update")
            .Content("Do you agree terms and conditions?")
            .Width(400)
            .Modal(false)
            .Actions(actions =>
                {
                    actions.Add().Text("NO");
                    actions.Add().Text("YES").Primary(true);
                })
            .Events(ev => ev.Close("dialog_close"))
        )
```
```tab-tagHelper

        <kendo:dialog name="dialog" title="Software Update" closable="false" modal="false"
                content="Do you agree terms and conditions?" close="dialog_close">
                <kendo:dialog-actions>
                        <kendo:dialog-action text="NO" />
                        <kendo:dialog-action text="YES" primary="true" />
                </kendo:dialog-actions>
        </kendo:dialog>
```

## Window Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI Window by using a Tag Helper.

###### Example

        <kendo-window name="window1">Window contents</kendo-window>

### Configuration

The Window Tag Helper configuration options are passed as attributes of the tag. The Window contents is placed between the opening and closing tag.

###### Example

```tab-cshtml

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
```
```tab-tagHelper

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
```

## DatePicker Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI DatePicker by using a Tag Helper.

###### Example

        <kendo-datepicker name="datepicker1"></kendo-datepicker>


### Configuration

The DatePicker Tag Helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().DatePicker()
                .Name("monthpicker")
                .Start(CalendarView.Year)
                .Depth(CalendarView.Year)
                .Format("MMMM yyyy")
                .Value(DateTime.Now)
        )
```
```tab-tagHelper

        <kendo-datepicker name="monthpicker" start="CalendarView.Year" depth="CalendarView.Year"
            format="MMMM yyyy" value="DateTime.Now">
        </kendo-datepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property, or a property of the model.

###### Example

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-datepicker name="datepicker" parse-formats="ViewBag.ParseDates"></kendo-datepicker>

## TimePicker Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI TimePicker by using a Tag Helper.

###### Example

        <kendo-timepicker name="timepicker1"></kendo-timepicker>


### Configuration

The TimePicker Tag Helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().TimePicker()
                .Name("end")
                .Value("8:30 AM")
                .Min("8:00 AM")
                .Max("7:30 AM")
        )
```
```tab-tagHelper

        <kendo-timepicker name="end" value="new DateTime(1900, 1, 1, 8, 30, 0)"
            min="new DateTime(1900, 1, 1, 8, 0, 0)" max="new DateTime(1900, 1, 1, 7, 30, 0)">
        </kendo-timepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property, or a property of the model.

###### Example

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-timepicker name="timepicker" parse-formats="ViewBag.ParseDates"></kendo-timepicker>

## DateTimePicker Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI DateTimePicker by using a Tag Helper.

###### Example

        <kendo-datetimepicker name="timepicker1"></kendo-datetimepicker>


### Configuration

The DateTimePicker Tag Helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().DateTimePicker()
                .Name("end")
                .Value(DateTime.Today)
                .Min(DateTime.Today)
                .Events(e => e.Change("endChange"))
        )
```
```tab-tagHelper
        <kendo-datetimepicker name="end" value="DateTime.Today"
            min="DateTime.Today" on-change="endChange">
        </kendo-datetimepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property, or a property of the model.

###### Example

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-datetimepicker name="datetimepicker" parse-formats="ViewBag.ParseDates"></kendo-datetimepicker>


## ResponsivePanel Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI ResponsivePanel by using a Tag Helper.

###### Example

        <kendo-responsivepanel name="slidebar" breakpoint="1000" orientation="left">
            <div id="profile" class="widget">
                <h3>Profile</h3>
                <div>
                    <div class="profile-photo"></div>
                    <h4>Lynda Schleifer</h4>
                    <p>Sales Associate</p>
                </div>
            </div>
            <div id="teammates" class="widget">
                <h3>Teammates</h3>
                <div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                        <h4>Andrew Fuller</h4>
                        <p>Team Lead</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                        <h4>Nancy Leverling</h4>
                        <p>Sales Associate</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                        <h4>Robert King</h4>
                        <p>Business System Analyst</p>
                    </div>
                </div>
            </div>
        </kendo-responsivepanel>


### Configuration

The configuration options of the ResponsivePanel Tag Helper are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().ResponsivePanel()
            .Name("sidebar")
            .Breakpoint(1000)
            .Orientation("left")
            .Content(@<text>
                <div id="profile" class="widget">
                    <h3>Profile</h3>
                    <div>
                        <div class="profile-photo"></div>
                        <h4>Lynda Schleifer</h4>
                        <p>Sales Associate</p>
                    </div>
                </div>
                <div id="teammates" class="widget">
                    <h3>Teammates</h3>
                    <div>
                        <div class="team-mate">
                            <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                            <h4>Andrew Fuller</h4>
                            <p>Team Lead</p>
                        </div>
                        <div class="team-mate">
                            <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                            <h4>Nancy Leverling</h4>
                            <p>Sales Associate</p>
                        </div>
                        <div class="team-mate">
                            <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                            <h4>Robert King</h4>
                            <p>Business System Analyst</p>
                        </div>
                    </div>
                </div>
            </text>)
        )
```
```tab-tagHelper
        <kendo-responsivepanel name="slidebar" breakpoint="1000" orientation="left">
            <div id="profile" class="widget">
                <h3>Profile</h3>
                <div>
                    <div class="profile-photo"></div>
                    <h4>Lynda Schleifer</h4>
                    <p>Sales Associate</p>
                </div>
            </div>
            <div id="teammates" class="widget">
                <h3>Teammates</h3>
                <div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/andrew.jpg")" alt="Andrew Fuller">
                        <h4>Andrew Fuller</h4>
                        <p>Team Lead</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/nancy.jpg")" alt="Nancy Leverling">
                        <h4>Nancy Leverling</h4>
                        <p>Sales Associate</p>
                    </div>
                    <div class="team-mate">
                        <img src="@Url.Content("~/content/web/panelbar/robert.jpg")" alt="Robert King">
                        <h4>Robert King</h4>
                        <p>Business System Analyst</p>
                    </div>
                </div>
            </div>
        </kendo-responsivepanel>
```

## Splitter Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI Splitter by using a Tag Helper.

###### Example

    <kendo-splitter name="vertical" orientation="SplitterOrientation.Vertical">
        <kendo-splitter-pane scrollable="false" collapsible="false">
            <div id="top-pane">
                <kendo-splitter name="horizontal" style="height: 100%; width:100%;" orientation="SplitterOrientation.Horizontal">
                    <kendo-splitter-pane size="220px" collapsible="true">
                        <div id="left-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / left pane</h3>
                                <p>Resizable and collapsible.</p>
                            </div>
                        </div>
                    </kendo-splitter-pane>
                    <kendo-splitter-pane>
                        <div id="center-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / center pane</h3>
                                <p>Resizable only.</p>
                            </div>
                        </div>
                    </kendo-splitter-pane>
                    <kendo-splitter-pane size="220px" collapsible="true">
                        <div id="right-pane">
                            <div class="pane-content">
                                <h3>Inner splitter / right pane</h3>
                                <p>Resizable and collapsible.</p>
                            </div>
                        </div>
                    </kendo-splitter-pane>
                </kendo-splitter>
            </div>
        </kendo-splitter-pane>
        <kendo-splitter-pane size="100px" collapsible="false">
            <div id="middle-pane">
                <div class="pane-content">
                    <h3>Outer splitter / middle pane</h3>
                    <p>Resizable only.</p>
                </div>
            </div>
        </kendo-splitter-pane>
        <kendo-splitter-pane size="100px" collapsible="false" resizable="false">
            <div id="bottom-pane">
                <div class="pane-content">
                    <h3>Outer splitter / bottom pane</h3>
                    <p>Non-resizable and non-collapsible.</p>
                </div>
            </div>
        </kendo-splitter-pane>
    </kendo-splitter>


One important thing to note is that the splitter pane tags do not render div elements automatically. Therefore, the container elements should be defined explicitly and all the pane content should be placed inside these parent wrappers, as demonstrated in the example above. You can check the result of this declarative definition in the [Splitter Tag Helper](http://demos.telerik.com/aspnet-core/splitter/tag-helper) live sample.


### Configuration

The Splitter Tag Helper supports all the configuration options that the HtmlHelper does. They are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().Splitter()
            .Name("splitter1")
            .Orientation(SplitterOrientation.Vertical)
            .Panes(p =>
            {
                p.Add()
                .HtmlAttributes(new { id = "top-pane" })
                .Collapsed(false)
                .CollapsedSize("240px")
                .Collapsible(true)
                .LoadContentFrom("optionalUrl")
                .MaxSize("240px")
                .MinSize("240px")
                .Resizable(true)
                .Scrollable(true)
                .Size("240px")
                .Content(@<div class="pane-content">
                    Top Pane Content
                </div>);
            })
        )
```
```tab-tagHelper

        <kendo-splitter name="splitter1" orientation="SplitterOrientation.Vertical">
            <kendo-splitter-pane collapsed="false" collapsed-size="240px" collapsible="true"
                                 content-url="optionalUrl" max-size="240px" min-size="240px"
                                 resizable="true" scrollable="true" size="240px">
                <div id="top-pane">
                    <div class="pane-content">
                        Top Pane Content
                    </div>
                </div>
            </kendo-splitter-pane>
        </kendo-splitter>
```
## Upload Tag Helper

### Overview

The example below demonstrates how to define a Kendo UI Upload by using a Tag Helper.

###### Example

        <kendo-upload drop-zone="drop-zone1" name="test">
            <kendo-upload-async-settings auto-upload="true" />
            <kendo-upload-validation-settings allowed-extensions="@Model.Extensions" />
            <kendo-upload-files>
                <kendo-upload-file name="dummy" size="1024"/>
            </kendo-upload-files>
        </kendo-upload>


### Configuration

The Upload Tag Helper configuration options are passed as attributes of the tag or attributes of the nested composite and collection properties.

###### Example

```tab-cshtml

        @(Html.Kendo().Upload()
            .Name("upload1")
            .DropZone("drop-zone1")
            .Validation(v => v.AllowedExtensions(Model.Extensions))
            .Files(f => f.Add().Name("dummy").Size(1024))
    )
```
```tab-tagHelper
        <kendo-upload drop-zone="drop-zone1" name="test">
            <kendo-upload-async-settings auto-upload="true" />
            <kendo-upload-validation-settings allowed-extensions="@Model.Extensions" />
            <kendo-upload-files>
                <kendo-upload-file name="dummy" size="1024"/>
            </kendo-upload-files>
        </kendo-upload>
```


## See Also

Other articles on Telerik UI for ASP.NET MVC in ASP.NET Core applications:

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
