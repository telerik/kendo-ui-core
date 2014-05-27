<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">
<% Html.Kendo().Window()
    .Name("window")
    .Title("About Josef Hoffmann")
    .Actions(actions => actions
        .Custom("custom")
        .Minimize()
        .Maximize()
        .Close()
    )
    .Content(() => 
    {
      %>
        <div class="armchair">
            <img src="<%= Url.Content("~/Content/web/window/kubus-armchair.png") %>"
                    alt="Josef Hoffmann - Kubus Armchair" />
            Josef Hoffmann - Kubus Armchair
        </div>

        <p>
            Josef Hoffmann studied architecture at the Academy of Fine Arts in Vienna,
            Austria, under Art Nouveau architect Otto Wagner, whose theories of functional,
            modern architecture profoundly influenced his works, and in 1896 he joined his office.
        </p>

        <p>
            In 1898, he established his own practice in Vienna. In 1897, inspired by Mackintosh
            and the Glasgow School, he was one of the founding members with Gustav Klimt, of an
            association of revolutionary artists and architects, the Vienna Secession.
        </p>

        <p>
            In 1903, he founded with architects Koloman Moser and Joseph Maria Olbrich, the Wiener
            Werkst�tte for decorative arts.
        </p>

        <p>
            They aspired to the renaissance of the arts and crafts and to bring more abstract and
            purer forms to the designs of buildings and furniture, glass and metalwork, following
            the concept of total work of art. Hoffman's works combined functionality and simplicity
            of craft production with refined and innovative ornamental details and geometric
            elements. He is an important precursor of the Modern Movement and Art Deco.
        </p>

        <p>
            Source:
            <a href="http://www.senses-artnouveau.com/biography.php?artist=hof" title="About Josef Hoffmann">http://www.senses-artnouveau.com/</a>
        </p>
        <%
    })
    .Draggable()
    .Resizable()
    .Width(500)
    .Render();
%>

<span id="undo" class="k-button">Click here to open the window</span>

<script>
    $(function () {
        var dialog = $("#window");

        $("#undo").bind("click", function () {
            dialog.data("kendoWindow").open();
        });

        dialog.data("kendoWindow").wrapper.find(".k-i-custom").click(function (e) {
            alert("Custom action button clicked");
            e.preventDefault();
        });
    });
</script>

<style scoped>
    #example {
        min-height:500px;
    }
        
    #undo {
        position: absolute;
    }
        
    .armchair {
        float: left;
        margin: 20px 30px;
        text-align: center;
    }
        
    .armchair img {
        display: block;
        margin-bottom: 10px;
    }
</style>
</asp:Content>
