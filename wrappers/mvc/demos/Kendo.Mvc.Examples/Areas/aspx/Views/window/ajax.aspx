<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<%= Html.Kendo().Window()
    .Name("window")
    .Title("Rams's Ten Principles of Good Design")
    .Content("loading user info...")
    .LoadContentFrom("AjaxContent", "Window")
    .Draggable()
    .Resizable()
%>

<span id="undo" class="k-button">Click here to open the window.</span>
    
<script>
    $(document).ready(function() {
        $("#undo")
            .bind("click", function() {
                $("#window").data("kendoWindow").open();
            });
    });
</script>

<style scoped>
    #example {
        min-height: 340px;
    }
                
    #undo {
        position: absolute;
    }
</style>
</asp:Content>