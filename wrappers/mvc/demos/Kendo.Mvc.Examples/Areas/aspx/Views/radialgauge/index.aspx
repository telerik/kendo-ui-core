<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="gauge-container">
    <%= Html.Kendo().RadialGauge<int>()
            .Name("radialgauge")
            .Pointer(pointer => pointer.Value(0))
            .Scale(scale => scale
                .MinorUnit(5)
                .StartAngle(-30)
                .EndAngle(210)
                .Max(180)
            )
    %>

    <%= Html.Kendo().Slider<int>()
            .Name("slider")
            .Max(180)
            .ShowButtons(false)
            .ClientEvents(events => events.OnChange("onChange"))
    %>
</div>
<script type="text/javascript">
    function onChange(e) {
        $("#radialGauge").data("kendoRadialGauge").value(e.value);
    }
</script>

<style>
    #gauge-container {
        background: transparent url(<%= Url.Content("~/Content/dataviz/gauge/gauge-container-partial.png") %>) no-repeat 50% 50%;
        width: 386px;
        height: 386px;
        text-align: center;
        margin: 0 auto 30px auto;
    }

    #radialgauge {
        width: 350px;
        height: 300px;
        margin: 0 auto;
    }

    #gauge-container .k-slider {
        margin-top: -11px;
        width: 140px;
    }
</style>
</asp:Content>