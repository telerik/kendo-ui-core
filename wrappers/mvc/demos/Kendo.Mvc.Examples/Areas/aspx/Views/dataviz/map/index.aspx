<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/DataViz.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%: Html.Kendo().Map()
      .Name("map")
      .Center(51.505, -0.09)
      .Zoom(4)
      .Layers(layers => 
       {
           layers.Add()
              .Type(MapLayerType.Tile)
              .UrlTemplateId("http://tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png")
              .Attribution("&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors");
       })
%>
</asp:Content>