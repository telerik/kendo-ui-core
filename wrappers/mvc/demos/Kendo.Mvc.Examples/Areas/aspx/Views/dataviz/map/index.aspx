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
              .UrlTemplateId("http://tile.openstreetmap.org/#= zoom #/#= x #/#= y #.png");
       })
%>
</asp:Content>