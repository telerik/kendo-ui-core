<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
    <h3>T-shirt Size</h3>
   <%= Html.Kendo().MultiSelect()
          .Name("size")
          .Placeholder("Select size...")
          .HtmlAttributes(new { accesskey = "w" })
          .BindTo(new List<string>() {
              "X-Small",
              "Small",
              "Medium",
              "Large",
              "X-Large",
              "2X-Large"
          })
    %>
</div>

<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign wider"><a target="_blank" href="http://en.wikipedia.org/wiki/Access_key">Access key</a></span>
            +
            <span class="key-button">w</span>
        </span>
        <span class="button-descr">
            focuses the widget
        </span>
    </li>
</ul>

<h4>
    Closed popup:
</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wide leftAlign">left arrow</span>
        </span>
        <span class="button-descr">
            highlights previous selected item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">right arrow</span>
        </span>
        <span class="button-descr">
            highlights next selected item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            highlights first selected item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            highlights last selected item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">delete</span>
        </span>
        <span class="button-descr">
            deletes highlighted item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">backspace</span>
        </span>
        <span class="button-descr">
            deletes previous selected item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            opens the popup
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">esc</span>
        </span>
        <span class="button-descr">
            clears highlighted item
        </span>
    </li>
</ul>

<h4>
    Opened popup:
</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button wide leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            highlights previous item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider leftAlign">down arrow</span>
        </span>
        <span class="button-descr">
            highlights next item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">home</span>
        </span>
        <span class="button-descr">
            highlights first item in the popup
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">end</span>
        </span>
        <span class="button-descr">
            highlights last item in the popup
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wider rightAlign">enter</span>
        </span>
        <span class="button-descr">
            selects highlighted item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">esc</span>
        </span>
        <span class="button-descr">
            closes the popup
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button wide leftAlign">up arrow</span>
        </span>
        <span class="button-descr">
            closes the popup if the first item is highlighted
        </span>
    </li>
</ul>

<style scoped>
    div.demo-section
    {
        width: 204px;
        margin: 0px auto 25px auto;
    }
</style>
</asp:Content>
