<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Map()
    .Name("map")
    .Center(30.268107, -97.744821)
    .Zoom(15)
    .Layers(layers =>
    {
        layers.Add()
            .Type(MapLayerType.Tile)
            .UrlTemplateId("http://tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png")
            .Subdomains("a", "b", "c")
            .Attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                         "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>");

        layers.Add()
            .Type(MapLayerType.Marker)
            .DataSource(dataSource => dataSource
                  .Read(read => read.Action("_StoreLocations", "Map"))
            )
            .LocationField("LatLng")
            .TitleField("Title");
    })
%>
</asp:Content>