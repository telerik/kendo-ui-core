<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section" style="float: left">
    <label for="colorpicker">ColorPicker:</label>
    <%= Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Value("#0000ff")
          .ToolIcon("k-foreColor")
    %>
</div>

<div class="configuration k-widget k-header" style="width: 220px">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li><button id="get" class="k-button">Get value</button></li>
        <li>
            <input id="value" value="#ff0000" style="float: none; width: 6em" />
            <button id="set" class="k-button">Set value</button>
        </li>
        <li>
            <button id="enable" class="k-button">Enable</button> or
            <button id="disable" class="k-button">Disable</button>
        </li>
        <li>
            <button id="open" class="k-button">Open</button> or
            <button id="close" class="k-button">Close</button> the color picker
        </li>
    </ul>
</div>

<script>
    $(document).ready(function() {
        var colorpicker = $("#colorpicker").data("kendoColorPicker");

        $("#enable").click(function(){
            colorpicker.enable();
        });

        $("#disable").click(function(){
            colorpicker.enable(false);
        });

        $("#get").click(function(){
            alert( colorpicker.value() );
        });

        $("#set").click(function(){
            var color = $("#value").val();
            try {
                color = kendo.parseColor(color);
                colorpicker.value(color);
            } catch(ex) {
                alert('Cannot parse color: "' + color + '"');
            }
        });

        $("#open").click(function(){
            colorpicker.open();
        });

        $("#close").click(function(){
            colorpicker.close();
        });
    });
</script>

<style scoped>
    .demo-section {
        padding: 30px;
    }

    .demo-section label {
        padding-right: 5px;
    }

</style>
</asp:Content>