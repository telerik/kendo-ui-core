<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ContentPlaceHolderID="MainContent" runat="server">

    <div class="demo-section">
        <% Html.Kendo().TabStrip()
              .Name("tabstrip")
              .Animation(false)
              .Items(tabstrip =>
              {
                  tabstrip.Add().Text("Baseball")
                      .ImageUrl(Url.Content("~/Content/shared/icons/sports/baseball.png"))
                      .Content(() => { %>
    Baseball is a bat-and-ball sport played between two teams of nine players each. The aim is to score runs by hitting a thrown ball with a bat and touching a series of four bases arranged at the corners of a ninety-foot diamond. Players on the batting team take turns hitting against the pitcher of the fielding team, which tries to stop them from scoring runs by getting hitters out in any of several ways. A player on the batting team can stop at any of the bases and later advance via a teammate's hit or other means. The teams switch between batting and fielding whenever the fielding team records three outs. One turn at bat for each team constitutes an inning and nine innings make up a professional game. The team with the most runs at the end of the game wins.
                      <% });

                  tabstrip.Add().Text("Golf")
                      .ImageUrl(Url.Content("~/Content/shared/icons/sports/golf.png"))
                      .Content(() => { %>
    Golf is a precision club and ball sport, in which competing players (or golfers) use many types of clubs to hit balls into a series of holes on a golf course using the fewest number of strokes. It is one of the few ball games that does not require a standardized playing area. Instead, the game is played on golf courses, each of which features a unique design, although courses typically consist of either nine or 18 holes. Golf is defined, in the rules of golf, as playing a ball with a club from the teeing ground into the hole by a stroke or successive strokes in accordance with the Rules.
                      <% });

                  tabstrip.Add().Text("Swimming")
                      .ImageUrl(Url.Content("~/Content/shared/icons/sports/swimming.png"))
                      .Content(() => { %>
    Swimming has been recorded since prehistoric times; the earliest recording of swimming dates back to Stone Age paintings from around 7,000 years ago. Written references date from 2000 BC. Some of the earliest references to swimming include the Gilgamesh, the Iliad, the Odyssey, the Bible, Beowulf, and other sagas. In 1578, Nikolaus Wynmann, a German professor of languages, wrote the first swimming book, The Swimmer or A Dialogue on the Art of Swimming (Der Schwimmer oder ein Zwiegespräch über die Schwimmkunst). Competitive swimming in Europe started around 1800, mostly using breaststroke.
                      <% });

                  tabstrip.Add().Text("Snowboarding")
                      .ImageUrl(Url.Content("~/Content/shared/icons/sports/snowboarding.png"))
                      .Content(() => { %>
    Snowboarding is a sport that involves descending a slope that is covered with snow on a snowboard attached to a rider's feet using a special boot set onto a mounted binding. The development of snowboarding was inspired by skateboarding, sledding, surfing and skiing. It was developed in the U.S.A. in the 1960s to 1970s and became a Winter Olympic Sport in 1998.
                      <% });
              })
              .SelectedIndex(0)
              .Render();
        %>

        <%:Html.Kendo().Sortable()
            .For("#tabstrip ul.k-tabstrip-items")
            .Filter("li.k-item")
            .Axis(SortableAxis.X)
            .ContainerSelector("ul.k-tabstrip-items")
            .HintHandler("hint")
            .Events(events => events.Start("onStart").Change("onChange"))
        %>
    </div>

    <script>
        function hint(element) {
            return $("<div id='hint' class='k-widget k-header k-tabstrip'><ul class='k-tabstrip-items k-reset'><li class='k-item k-state-active k-tab-on-top'>" + element.html() + "</li></ul></div>");
        }

        function onStart(e) {
            var tabstrip = $("#tabstrip").data("kendoTabStrip");
            tabstrip.activateTab(e.item);
        }

        function onChange(e) {
            var tabstrip = $("#tabstrip").data("kendoTabStrip"),
                reference = tabstrip.tabGroup.children().eq(e.newIndex);

            if (e.oldIndex < e.newIndex) {
                tabstrip.insertAfter(e.item, reference);
            } else {
                tabstrip.insertBefore(e.item, reference);
            }
        }
    </script>

    <style scoped>
        h3 {
            font-weight: normal;
            padding: 0 0 1em 0;
        }
                
        .demo-section {
            width: 500px;
        }

        .k-tabstrip .k-content {
            padding-top: 10px;
            padding-bottom: 10px;
        }

        #hint {
            border: none;
        }

        #hint .k-tabstrip-items {
            padding: 0;
        }
    </style>

</asp:Content>

<asp:Content ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>