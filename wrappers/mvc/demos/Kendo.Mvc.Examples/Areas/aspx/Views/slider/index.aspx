<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div id="wrapper">
    <%= Html.Kendo().Slider()
            .Name("slider")
            .IncreaseButtonTitle("Right")
            .DecreaseButtonTitle("Left")
            .Min(-10)
            .Max(10)
            .SmallStep(2)
            .LargeStep(5)
            .Value(0)
            .HtmlAttributes(new { @class = "balSlider" })
    %>
    <div id="equalizer">
        <%= Html.Kendo().Slider()
                .Name("eqSlider1")
                .Orientation(SliderOrientation.Vertical)
                .Min(-20)
                .Max(20)
                .SmallStep(1)
                .LargeStep(20)
                .ShowButtons(false)
                .Value(10)
                .HtmlAttributes(new { @class = "eqSlider" })
        %>

        <%= Html.Kendo().Slider()
                .Name("eqSlider2")
                .Orientation(SliderOrientation.Vertical)
                .Min(-20)
                .Max(20)
                .SmallStep(1)
                .LargeStep(20)
                .ShowButtons(false)
                .Value(5)
                .HtmlAttributes(new { @class = "eqSlider" })
        %>

        <%= Html.Kendo().Slider()
                .Name("eqSlider3")
                .Orientation(SliderOrientation.Vertical)
                .Min(-20)
                .Max(20)
                .SmallStep(1)
                .LargeStep(20)
                .ShowButtons(false)
                .Value(0)
                .HtmlAttributes(new { @class = "eqSlider" })
        %>

        <%= Html.Kendo().Slider()
                .Name("eqSlider4")
                .Orientation(SliderOrientation.Vertical)
                .Min(-20)
                .Max(20)
                .SmallStep(1)
                .LargeStep(20)
                .ShowButtons(false)
                .Value(10)
                .HtmlAttributes(new { @class = "eqSlider" })
        %>

        <%= Html.Kendo().Slider()
                .Name("eqSlider5")
                .Orientation(SliderOrientation.Vertical)
                .Min(-20)
                .Max(20)
                .SmallStep(1)
                .LargeStep(20)
                .ShowButtons(false)
                .Value(15)
                .HtmlAttributes(new { @class = "eqSlider" })
        %>
    </div>
</div>

<style>
    #wrapper {
        width: 300px;
        height: 255px;
        padding: 45px 0 0 0;
        margin: 0 auto;
        background: url(<%= Url.Content("~/Content/web/slider/eqBack.png") %>) no-repeat 0 0;
        text-align: center;
    }
    #equalizer {
        margin-top: 75px;
        padding-right: 15px;
    }
    .balSlider {
        width: 240px;
    }
    .balSlider .k-slider-selection {
        display: none;
    }
    .eqSlider {
        display: inline-block;
        zoom: 1;
        margin: 0 12px;
        height: 122px;
    }
                
    *+html .eqSlider {display:inline;}
                
</style>
</asp:Content>