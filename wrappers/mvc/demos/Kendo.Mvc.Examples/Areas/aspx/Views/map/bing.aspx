<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<div class="map-wrapper" style="margin: auto;">
    <%: Html.Kendo().Map()
            .Name("map")
            .Center(51.505, -0.09)
            .Zoom(3)
            .Layers(layers =>
            {
                layers.Add()
                      .Type(MapLayerType.Bing)
                      .ImagerySet(MapLayersImagerySet.AerialWithLabels)
                      
                      // IMPORTANT: This key is locked to demos.telerik.com/kendo-ui
                      // Please replace with your own Bing Key
                      .Key("AjQF548guEF8MWgEspVokNny7l_GULKsZ81tR-LvPK96Bm3REkCjNHs2aC_b7nvF");
            })
    %>
</div>
</asp:Content>