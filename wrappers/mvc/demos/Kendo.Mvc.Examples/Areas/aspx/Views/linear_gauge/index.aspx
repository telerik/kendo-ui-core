<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
    <style>
        #gauge-container {
            text-align: center;
            margin: 0 auto;
            background: transparent url(<%= Url.Content("~/Content/dataviz/gauge/linear-gauge-container.png") %>) no-repeat 50% 50%;
            padding: 18px;
            width: 300px;
            height: 300px;
        }

        #gauge {
            height: 300px;
            display: inline-block;
            *display: inline;
            zoom: 1;
        }
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div id="gauge-container">
    <%= Html.Kendo().LinearGauge()
            .Name("gauge")
            .Pointer(pointer => pointer.Value(28))
            .Scale(scale => scale
                .MajorUnit(20)
                .MinorUnit(2)
                .Min(-40)
                .Max(60)
                .Ranges(ranges => {
                        ranges.Add().From(-40).To(-20).Color("#2798df");
                        ranges.Add().From(30).To(45).Color("#ffc700");
                        ranges.Add().From(45).To(60).Color("#c20000");
                    }
                )
            )
    %>
</div>
</asp:Content>