<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div id="climateCtrl">
    <%= Html.Kendo().Slider<int>()
            .Name("slider")
            .Min(0)
            .Max(30)
            .SmallStep(1)
            .LargeStep(10)
            .Value(18)
            .ClientEvents(events => events
                .OnSlide("sliderOnSlide")
                .OnChange("sliderOnChange"))
            .HtmlAttributes(new { @class = "temperature" })
      %>

     <%= Html.Kendo().RangeSlider<int>()
             .Name("rangeslider")
             .Min(0)
             .Max(30)
             .SmallStep(1)
             .LargeStep(10)
             .ClientEvents(events => events
                 .OnSlide("rangeSliderOnSlide")
                 .OnChange("rangeSliderOnChange"))
             .HtmlAttributes(new { @class = "humidity" })
     %>
</div>

<script>
    function sliderOnSlide(e) {
        kendoConsole.log("Slide :: new slide value is: " + e.value);
    }

    function sliderOnChange(e) {
        kendoConsole.log("Change :: new value is: " + e.value);
    }

    function rangeSliderOnSlide(e) {
        kendoConsole.log("Slide :: new slide values are: " + e.values.toString().replace(",", " - "));
    }

    function rangeSliderOnChange(e) {
        kendoConsole.log("Change :: new values are: " + e.values.toString().replace(",", " - "));
    }
</script>

<style>
    #climateCtrl {
        width: 245px;
        height: 167px;
        margin: 30px auto;
        padding: 102px 0 0 156px;
        background: url(<%= Url.Content("~/Content/web/slider/climateController.png") %>) transparent no-repeat 0 0;
    }
    .humidity {
        margin: 67px 0 0 15px;
        width: 170px;
    }
</style>

<div class="console"></div>
</asp:Content>