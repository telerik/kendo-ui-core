<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div id="forecast">
    <% Html.Kendo().TabStrip()
          .Name("tabstrip")
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Paris")
                  .Selected(true)
                  .Content(() => 
                  { %>
                    <div class="weather">
                        <h2>17<span>&ordm;C</span></h2>
                        <p>Rainy weather in Paris.</p>
                    </div>
                    <span class="rainy">&nbsp;</span>
                  <% });

              tabstrip.Add().Text("New York")
                  .Content(() => { %>
                    <div class="weather">
                        <h2>29<span>&ordm;C</span></h2>
                        <p>Sunny weather in New York.</p>
                    </div>
                    <span class="sunny">&nbsp;</span>
                  <% });

              tabstrip.Add().Text("Moscow")
                  .Content(() => { %>
                    <div class="weather">
                        <h2>16<span>&ordm;C</span></h2>
                        <p>Cloudy weather in Moscow.</p>
                    </div>
                    <span class="cloudy">&nbsp;</span>
                  <% });

              tabstrip.Add().Text("Sydney")
                  .Content(() => { %>
                    <div class="weather">
                        <h2>17<span>&ordm;C</span></h2>
                        <p>Rainy weather in Sidney.</p>
                    </div>
                    <span class="rainy">&nbsp;</span>
                  <% });
          })
          .Render();
    %>
</div>

<style scoped>
    #forecast {
        width: 360px;
        height: 337px;
        margin: 30px auto;
        padding: 80px 15px 0 15px;
        background: url('<%= Url.Content("~/Content/web/tabstrip/forecast.png") %>') transparent no-repeat 0 0;
    }

    .sunny, .cloudy, .rainy {
        display: inline-block;
        margin: 20px 0 20px 10px;
        width: 128px;
        height: 128px;
        background: url('<%= Url.Content("~/Content/web/tabstrip/weather.png") %>') transparent no-repeat 0 0;
    }

    .cloudy{
        background-position: -128px 0;
    }

    .rainy{
        background-position: -256px 0;
    }

    .weather {
        width: 160px;
        padding: 40px 0 0 0;
        float: right;
    }

    #forecast h2 {
        font-weight: lighter;
        font-size: 5em;
        padding: 0;
        margin: 0;
    }

    #forecast h2 span {
        background: none;
        padding-left: 5px;
        font-size: .5em;
        vertical-align: top;
    }

    #forecast p {
        margin: 0;
        padding: 0;
    }
</style>
</asp:Content>