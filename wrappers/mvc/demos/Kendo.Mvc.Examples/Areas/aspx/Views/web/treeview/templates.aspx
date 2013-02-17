<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="server">

<script id="treeview-template" type="text/kendo-ui-template">
    #: item.text #    
    # if (!item.items) { #
        <a class='delete-link' href='\#'></a>
    # } #
</script>

<%=Html.Kendo().TreeView()
    .Name("treeview")
    .TemplateId("treeview-template")
    .HtmlAttributes(new { @class = "demo-section" })    
    .DataSource(source =>
    {
        source.Read(read => read.Action("Read_TemplateData", "TreeView"));
    })    
%>

<script type="text/javascript">

    $(document).on("click", ".delete-link", function (e) {
        e.preventDefault();

        var treeview = $("#treeview").data("kendoTreeView");
        treeview.remove($(this).closest(".k-item"));
    });
</script>

<style scoped>
    #treeview {
        width: 300px;
        margin: 0 auto;
    }

    #treeview .k-sprite {
        background-image: url("<%=Url.Content("~/Content/web/treeview/coloricons-sprite.png")%>");
    }
    
    .rootfolder { background-position: 0 0; }
    .folder     { background-position: 0 -16px; }
    .pdf        { background-position: 0 -32px; }
    .html       { background-position: 0 -48px; }
    .image      { background-position: 0 -64px; }

    .delete-link {
        width: 12px;
        height: 12px;
        background: transparent url("<%=Url.Content("~/Content/web/treeview/close.png")%>") no-repeat 50% 50%;
        overflow: hidden;
        display: inline-block;
        font-size: 0;
        line-height: 0;
        vertical-align: top;
        margin: 2px 0 0 3px;
        -webkit-border-radius: 5px;
        -mox-border-radius: 5px;
        border-radius: 5px;
    }
</style>

</asp:Content>


