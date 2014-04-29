<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master"
Inherits="System.Web.Mvc.ViewPage<IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="demo-section">
    <a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-add"></span>Add new record</a>
</div>

<script type="text/x-kendo-tmpl" id="template">
    <div class="product-view k-widget">
        <div class="edit-buttons">
            <a class="k-button k-button-icontext k-edit-button" href="\\#"><span class="k-icon k-edit"></span></a>
            <a class="k-button k-button-icontext k-delete-button" href="\\#"><span class="k-icon k-delete"></span></a>
        </div>
        <dl>
            <dt>Product Name</dt>
            <dd>#:ProductName#</dd>
            <dt>Unit Price</dt>
            <dd>#:kendo.toString(UnitPrice, "c")#</dd>
            <dt>Units In Stock</dt>
            <dd>#:UnitsInStock#</dd>
            <dt>Discontinued</dt>
            <dd>#:Discontinued#</dd>
        </dl>
    </div>
</script>

<div class="demo-section">
<%: Html.Kendo().ListView<Kendo.Mvc.Examples.Models.ProductViewModel>(Model)
    .Name("listView")
    .TagName("div")
    .ClientTemplateId("template")
    .DataSource(dataSource => dataSource
        .Model(model => model.Id("ProductID"))
        .PageSize(4)
        .Create(create => create.Action("Editing_Create", "ListView"))
        .Read(read => read.Action("Editing_Read", "ListView"))
        .Update(update => update.Action("Editing_Update", "ListView"))
        .Destroy(destroy => destroy.Action("Editing_Destroy", "ListView"))
    )
    .Navigatable()
    .Selectable()
    .Pageable()
    .Editable()
%>
</div>

<script>
    $(function() {
        var listView = $("#listView").data("kendoListView");

        $(".k-add-button").click(function(e) {
            listView.add();
            e.preventDefault();
        });
    });

    $(document.body).keydown(function (e) {
        if (e.altKey && e.keyCode == 87) {
            $("#listView").focus();
        }
    });
</script>

<ul class="keyboard-legend" style="padding-top: 25px">
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Alt</span>
            +
            <span class="key-button">W</span>
        </span>
        <span class="button-descr">
            Focus the ListView
        </span>
    </li>
</ul>

<h4>Supported keys and user actions</h4>
<ul class="keyboard-legend">
    <li>
        <span class="button-preview">
            <span class="key-button">Right</span>
        </span>
        <span class="button-descr">
            Goes to the next item (same as Down)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Left</span>
        </span>
        <span class="button-descr">
            Goes to the previous item (same as Up)
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Home</span>
        </span>
        <span class="button-descr">
            Goes to the first item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">End</span>
        </span>
        <span class="button-descr">
            Goes to the last item
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Enter</span>
        </span>
        <span class="button-descr">
            Enter Edit mode or Apply changes
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Esc</span>
        </span>
        <span class="button-descr">
            Exit Edit mode and Cancel changes
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            Tabs away from the ListView on the next focusable page element
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button leftAlign">Shift</span>
            +
            <span class="key-button">Tab</span>
        </span>
        <span class="button-descr">
            Tabs away from the ListView on the previous focusable page element
        </span>
    </li>
    <li>
        <span class="button-preview">
            <span class="key-button">Space</span>
        </span>
        <span class="button-descr">
            Select item
        </span>
    </li>
</ul>

<style scoped>
    .demo-section {
        width: 605px;
    }
    .product-view
    {
        float: left;
        position: relative;
        width: 301px;
        margin: -1px -1px 0 0;
    }

    .product-view dl
    {
        margin: 10px 0;
        padding: 0;
        min-width: 0;
    }
    .product-view dt, dd
    {
        float: left;
        margin: 0;
        padding: 3px;
        height: 26px;
        width: 160px;
        line-height: 26px;
        overflow: hidden;
    }
    .product-view dt
    {
        clear: left;
        padding: 3px 5px 3px 0;
        text-align: right;
        opacity: 0.6;
        width: 100px;
    }
    .k-listview
    {
        border: 0;
        padding: 0;
        min-width: 605px;
        min-height: 298px;
    }
    .k-listview:after, .product-view dl:after
    {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    .edit-buttons
    {
        position: absolute;
        top: 0;
        right: 0;
        width: 26px;
        height: 146px;
        padding: 2px 2px 0 3px;
        background-color: rgba(0,0,0,0.1);
    }
    .edit-buttons .k-button
    {
        width: 26px;
        margin-bottom: 1px;
    }
    .k-pager-wrap
    {
        border-top: 0;
    }
    span.k-invalid-msg
    {
        position: absolute;
        margin-left: 6px;
    }
</style>

</asp:Content>
