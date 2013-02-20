<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section">
    <ul id="products" class="dairy-photos">
        <li><a href="#" data-id="11">
            <img src="<%:Url.Content("~/content/web/foods/11.jpg")%>" /></a> </li>
        <li><a href="#" data-id="12">
            <img src="<%:Url.Content("~/content/web/foods/12.jpg")%>" /></a> </li>
        <li><a href="#" data-id="31">
            <img src="<%:Url.Content("~/content/web/foods/31.jpg")%>" /></a> </li>
        <li><a href="#" data-id="32">
            <img src="<%:Url.Content("~/content/web/foods/32.jpg")%>" /></a> </li>
        <li><a href="#" data-id="33">
            <img src="<%:Url.Content("~/content/web/foods/33.jpg")%>" /></a> </li>
        <li><a href="#" data-id="59">
            <img src="<%:Url.Content("~/content/web/foods/59.jpg")%>" /></a> </li>
        <li><a href="#" data-id="60">
            <img src="<%:Url.Content("~/content/web/foods/60.jpg")%>" /></a> </li>
        <li><a href="#" data-id="69">
            <img src="<%:Url.Content("~/content/web/foods/69.jpg")%>" /></a> </li>
        <li><a href="#" data-id="72">
            <img src="<%:Url.Content("~/content/web/foods/72.jpg")%>" /></a> </li>
    </ul>
    <div class="dairy-description">
        <h2>
            Dairy Products</h2>
        <p>
            Queso Cabrales, Queso Manchego La Pastora, Gorgonzola Telino, Mascarpone Fabioli,
            Geitost, Raclette Courdavault, Camembert Pierrott, Gudbrandsdalsost, Flotemysost,
            Mozzarella di Giovanni</p>
        <p>
            Hover an image for details.</p>
    </div>
</div>
<%:Html.Kendo().Tooltip()
    .For("#products")
    .Filter("a")
    .LoadContentFrom("Details", "Tooltip")
    .Position(TooltipPosition.Top)
    .Width(220)
    .Height(280)
    .Events(events => events.RequestStart("requestStart"))
%>
<script type="text/javascript">
    function requestStart(e) {
        e.options.data = {
            id: e.target.data("id")
        }
    }
</script>
<style scoped="scoped">
    .demo-section
    {
        height: 460px;
    }
    .dairy-photos
    {
        float: left;
        list-style-type: none;
        margin: 60px 0 0 60px;
        padding: 0;
        width: 430px;
        line-height: 0;
    }
    .dairy-photos li
    {
        display: inline-block;
        margin: 0;
        padding: 0;
        width: 110px;
        height: 110px;
        position: relative;
    }
    .dairy-photos li:hover
    {
        -moz-box-shadow: 0 0 10px rgba(0,0,0,0.8);
        -webkit-box-shadow: 0 0 10px rgba(0,0,0,0.8);
        box-shadow: 0 0 10px rgba(0,0,0,0.8);
        z-index: 1;
    }
    .dairy-photos li, .dairy-photos li:hover
    {
        transition: all .2s;
        -moz-transition: all .2s;
        -webkit-transition: all .2s;
    }
    .dairy-photos a
    {
        display: inline-block;
    }
    .dairy-description
    {
        float: right;
        width: 250px;
        margin: 80px 60px 0 0;
    }
    .dairy-description h2
    {
        font-size: 2.7em;
        font-weight: normal;
    }
    .dairy-description p
    {
        line-height: 2em;
    }
    .dairy-details
    {
        padding: 10px 0 0 0;
    }
    .dairy-details h3
    {
        font-weight: normal;
        font-size: 1.5em;
        margin-top: 10px;
    }
</style>

</asp:Content>