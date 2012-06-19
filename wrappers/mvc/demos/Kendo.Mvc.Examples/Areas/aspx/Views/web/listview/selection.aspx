<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" 
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<script type="text/x-kendo-tmpl" id="template">
    <div class="product">
        <img src="<%=Url.Content("~/content/web/foods/")%>${ProductID}.jpg" alt="${ProductName} image" />
        <h3>${ProductName}</h3>
    </div>
</script>

<%: Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
    .Name("listView")
    .TagName("div")
    .ClientTemplateId("template")
    .DataSource(dataSource =>
    {
        dataSource.Read(read => read.Action("Products_Read", "ListView"));
        dataSource.PageSize(12);
    })
    .Pageable()
    .Selectable(selectable => selectable.Mode(ListViewSelectionMode.Multiple))
    .Events(events => events.Change("onChange").DataBound("onDataBound"))
%>

<div class="console"></div>
<script>
    function onChange(arg) {
        var selected = $.map(this.select(), function(item) {
            return $(item).text();
        });

        kendoConsole.log("Selected: " + selected.length + " item(s), [" + selected.join(", ") + "]");
    }

    function onDataBound(arg) {
        kendoConsole.log("Grid data bound");
    }
</script>

<style scoped>
    .product
    {
        float: left;
        width: 270px;
        height: 110px;
        margin: 5px;
        padding: 5px;
        -moz-box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
        -webkit-box-shadow: inset 0 0 30px rgba(0,0,0,0.15);
        box-shadow: inner 0 0 30px rgba(0,0,0,0.15);
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
        border-radius: 15px;
        background-image: none;
        cursor: pointer;
    }
    .product img
    {
        float: left;
        width: 110px;
        height: 110px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
    }
    .product h3
    {
        margin: 10px 0 0 0;
        padding: 10px 10px 10px 20px;
        font-size: 1em;
        float: left;
        max-width: 120px;
        text-transform: uppercase;
    }
    .k-state-selected h3
    {
        color: #fff;
        background-color: rgba(0,0,0,0.4);
        -moz-box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        -webkit-box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
        box-shadow: inner 0 0 20px rgba(0,0,0,0.2);
        -moz-border-radius-topright: 5px;
        -moz-border-radius-bottomright: 5px;
        -webkit-border-top-right-radius: 5px;
        -webkit-border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .k-listview:after
    {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .k-listview
    {
        border: 0;
        padding: 0 0 20px 0;
        min-width: 0;
    }
</style>
</asp:Content>
