<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Map()
        .Name("map")
        .Center(30.268107, -97.744821)
        .Zoom(3)
        .Layers(layers =>
        {
            layers.Add()
                .Type(MapLayerType.Tile)
                .UrlTemplateId("http://tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png")
                .Subdomains(new string[] { "a", "b", "c" })
                .Attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                                "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>");
        })
        .Markers(markers =>
        {
            markers.Add()
                .Location(30.268107, -97.744821)
                .Shape(MapMarkersShape.PinTarget)
                .Tooltip(tooltip => tooltip.Content("Austin, TX"));
        })
%>
</asp:Content>