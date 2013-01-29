<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<h2>Simple (palette-based) picker</h2>

<%= Html.Kendo().ColorPicker()
    .Name("basic")
    .Palette(ColorPickerPalette.WebSafe)
    .Value("#cc2222")
    .HtmlAttributes(new { accessKey = "s" })
%>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
        +
        <span class="key-button">s</span>
        </span>
        <span class="button-descr">Focuses the simple selector</span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">enter, down</span>
        </span>
        <span class="button-descr">(when popup is closed) opens the popup</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">left arrow</span>
        </span>
        <span class="button-descr">selects previous color</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">right arrow</span>
        </span>
        <span class="button-descr">selects next color</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">up/down</span>
        </span>
        <span class="button-descr">move one row up/down</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">enter</span>
        </span>
        <span class="button-descr">select current color</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">escape</span>
        </span>
        <span class="button-descr">cancel the selection</span>
    </li>
</ul>

<h2>HSV picker</h2>

<%= Html.Kendo().ColorPicker()
    .Name("hsv")
    .Value("#22cc22")
    .Opacity(true)
    .HtmlAttributes(new { accessKey = "h" })
%>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
        +
        <span class="key-button">h</span>
        </span>
        <span class="button-descr">Focuses the HSV selector</span>
    </li>
</ul>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">enter, down</span>
        </span>
        <span class="button-descr">(when popup is closed) opens the popup</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">arrows</span>
        </span>
        <span class="button-descr">update saturation/value in the big rectangle</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">ctrl + left/right</span>
        </span>
        <span class="button-descr">update hue slider</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">ctrl + up/down</span>
        </span>
        <span class="button-descr">update opacity slider (when opacity present)</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">shift</span>
        </span>
        <span class="button-descr">hold shift for fine-tuning</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">enter</span>
        </span>
        <span class="button-descr">select current color</span>
    </li>
    <li>
        <span class="button-preview">
        <span class="key-button leftAlign wider">escape</span>
        </span>
        <span class="button-descr">cancel the selection</span>
    </li>
</ul>
</asp:Content>