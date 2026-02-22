---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik UI TabStrip HtmlHelper for {{ site.framework }}."
components: ["tabstrip"]
slug: tabstrip_appearance
position: 2
---

# Appearance


The TabStrip provides predefined appearance options such as different sizes, alignment positions and scroll buttons settings.

For a complete example, refer to the [Appearance Demo of the TabStrip](https://demos.telerik.com/{{ site.platform }}/tabstrip/appearance).

## Options

The TabStrip HtmlHelper and its `Scrollable` configuration provide the following methods for styling:

- [`Size()`](#size)—configures the overall size of the component.
- [`TabAlignment()`](#tabalignment)—Specifies the alignment of the component tabs. The option is not applicable for a scrollable TabStrip. 
- [`ScrollButtons()`](#scrollbuttons)—Sets the scroll buttons visibility.
- [`ScrollButtonsPosition()`](#scrollbuttonsposition)—Sets the position of the scroll buttons.

### Size

To control the size of the tabs, configure the `Size` option with any of the following values:

- `Small`
- `Medium` - the default size
- `Large`
- `None`

```HtmlHelper
    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Size(ComponentSize.Small)
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Baseball")
                  .Content(@<text>
Baseball is a bat-and-ball sport played between two teams of nine players each. 
                  </text>);

              tabstrip.Add().Text("Golf")
                  .Content(@<text>
Golf is a precision club and ball sport.
                  </text>);

              tabstrip.Add().Text("Swimming")
                  .Content(@<text>
Swimming has been recorded since prehistoric times.
                  </text>);
          })
          .SelectedIndex(0)
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip" size="ComponentSize.Small">
        <items>
            <tabstrip-item selected="true" text="Baseball" image-url="@Url.Content("~/shared/icons/sports/baseball.png")">
                <content>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Golf" image-url="@Url.Content("~/shared/icons/sports/golf.png")">
                <content>
                    <p>Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus.</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

### TabAlignment

The `TabAlignment()` setting specifies the alignment of the component tabs. The default alignment is `Start`. The available options are:

- `Start` — Tab alignment is set to `start`.
- `End` — Tab alignment is set to `end`.
- `Center` — Tab alignment is set to `center`.
- `Stretched` — Tab alignment will be set to `stretched`.
- `Justify` — Tab alignment will be set to `justify`.

```HtmlHelper
    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .TabAlignment(TabStripTabAlignment.Start)
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Baseball")
                  .Content(@<text>
Baseball is a bat-and-ball sport played between two teams of nine players each. 
                  </text>);

              tabstrip.Add().Text("Golf")
                  .Content(@<text>
Golf is a precision club and ball sport.
                  </text>);

              tabstrip.Add().Text("Swimming")
                  .Content(@<text>
Swimming has been recorded since prehistoric times.
                  </text>);
          })
          .SelectedIndex(0)
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip" tab-alignment="TabStripTabAlignment.Start">
        <items>
            <tabstrip-item selected="true" text="Baseball" image-url="@Url.Content("~/shared/icons/sports/baseball.png")">
                <content>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Golf" image-url="@Url.Content("~/shared/icons/sports/golf.png")">
                <content>
                    <p>Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus.</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

### ScrollButtons

The `ScrollButtons()` setting defines the visibility of scroll buttons. The available options are:

- `Auto` — Displays scroll buttons only when the TabStrip enters the scrollable mode. This is the default value.
- `Hidden` — Hides the scroll buttons at all times. 
- `Visible` — Always shows the scroll buttons.

```HtmlHelper
    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Scrollable(s=>s
              .ScrollButtons(ScrollButtonsType.Auto)
              .ScrollButtonsPosition(ScrollButtonsPositionType.Start))
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Baseball")
                  .Content(@<text>
Baseball is a bat-and-ball sport played between two teams of nine players each. 
                  </text>);

              tabstrip.Add().Text("Golf")
                  .Content(@<text>
Golf is a precision club and ball sport.
                  </text>);

              tabstrip.Add().Text("Swimming")
                  .Content(@<text>
Swimming has been recorded since prehistoric times.
                  </text>);
          })
          .SelectedIndex(0)
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <scrollable scroll-buttons="ScrollButtonsType.Auto" scroll-buttons-position="ScrollButtonsPositionType.Start" />
        <items>
            <tabstrip-item selected="true" text="Baseball" image-url="@Url.Content("~/shared/icons/sports/baseball.png")">
                <content>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Golf" image-url="@Url.Content("~/shared/icons/sports/golf.png")">
                <content>
                    <p>Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus.</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

### ScrollButtonsPosition

The `ScrollButtonsPosition()` setting defines the placement of scroll buttons. The available options are:

- `Split` — The scroll buttons are displayed at both ends of the TabStrip. 
- `Start` — The scroll buttons are displayed at the start of the TabStrip. 
- `End` — The scroll buttons are displayed at the end of the tabs.

```HtmlHelper
    @(Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Scrollable(s=>s
              .ScrollButtons(ScrollButtonsType.Auto)
              .ScrollButtonsPosition(ScrollButtonsPositionType.Start))
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Baseball")
                  .Content(@<text>
Baseball is a bat-and-ball sport played between two teams of nine players each. 
                  </text>);

              tabstrip.Add().Text("Golf")
                  .Content(@<text>
Golf is a precision club and ball sport.
                  </text>);

              tabstrip.Add().Text("Swimming")
                  .Content(@<text>
Swimming has been recorded since prehistoric times.
                  </text>);
          })
          .SelectedIndex(0)
    )
```
{% if site.core %}
```TagHelper
    <kendo-tabstrip name="tabstrip">
        <scrollable scroll-buttons="ScrollButtonsType.Auto" scroll-buttons-position="ScrollButtonsPositionType.Start" />
        <items>
            <tabstrip-item selected="true" text="Baseball" image-url="@Url.Content("~/shared/icons/sports/baseball.png")">
                <content>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </content>
            </tabstrip-item>
            <tabstrip-item text="Golf" image-url="@Url.Content("~/shared/icons/sports/golf.png")">
                <content>
                    <p>Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus.</p>
                </content>
            </tabstrip-item>
        </items>
    </kendo-tabstrip>
```
{% endif %}

## See Also

* [Appearance of the TabStrip for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/appearance)
* [Server-Side API of the TabStrip HtmlHelper](/api/tabstrip)
{% if site.core %}
* [Server-Side API of the TabStrip TagHelper](/api/taghelpers/tabstrip)
{% endif %}
* [Client-Side API of the TabStrip](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)


