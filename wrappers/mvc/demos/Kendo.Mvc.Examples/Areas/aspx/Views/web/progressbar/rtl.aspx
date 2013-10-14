<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

<div class="k-rtl">
    <div class="demo-section">    
        <%= Html.Kendo().ProgressBar()
                .Name("progressBar")
                .Type(ProgressBarType.Percent)
                .Animation(a => a.Duration(2000))
        %>
        <button id="startProgress" class="k-button">Start</button>
    </div>
</div>

<script>
    $("#startProgress").click(function () {
        var pb = $("#progressBar").data("kendoProgressBar");
        pb.value(100);
    });
</script>

</asp:Content>