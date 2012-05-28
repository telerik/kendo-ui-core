<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().TimePicker()
      .Name("timepicker")
%>

<script>
    $(document).ready(function() {
        $("#timepicker").closest(".k-widget")
                        .attr("id", "timepicker_wrapper");

        var timepicker = $("#timepicker").data("kendoTimePicker");

        var setValue = function () {
            timepicker.value($("#value").val());
        };

        $("#enable").click(function() {
            timepicker.enable();
        });

        $("#disable").click(function() {
            timepicker.enable(false);
        });

        $("#open").click(function() {
            timepicker.open();
        });

        $("#close").click(function() {
            timepicker.close();
        });

        $("#value").kendoTimePicker({
            change: setValue
        });

        $("#set").click(setValue);

        $("#get").click(function() {
            alert(timepicker.value());
        });
    });
</script>
<div class="configuration k-widget k-header" style="width: 220px">
    <span class="configHead">API Functions</span>
    <ul class="options">
        <li>
            <button id="get" class="k-button">Get value</button>
        </li>
        <li>
            <input id="value" value="10:30 AM" style="float:none" />
            <button id="set" class="k-button">Set value</button>
        </li>
        <li>
            <button id="enable" class="k-button">Enable</button> or <button id="disable" class="k-button">Disable</button>
        </li>
        <li>
            <button id="open" class="k-button">Open</button> or <button id="close" class="k-button">Close</button> the calendar
        </li>
    </ul>
</div>
</asp:Content>