<%@ Page Title="" Language="C#" MasterPageFile="~/Areas/aspx/Views/Shared/Web.Master" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<asp:Content ID="Content1" ContentPlaceHolderID="HeadContent" runat="server">
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
<div class="demo-section">
                
    <h3>TabStrip with images</h3>
    <% Html.Kendo().TabStrip()
          .Name("tabstrip-images")
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
</div>

<div class="demo-section">
                
    <h3>TabStrip with sprites</h3>

    <% Html.Kendo().TabStrip()
          .Name("tabstrip-sprites")
          .Items(tabstrip =>
          {
              tabstrip.Add().Text("Brazil")
                  .SpriteCssClasses("brazilFlag")
                  .Content(() => { %>
Brazil, officially the Federative Republic of Brazil, is the largest country in South America. It is the world's fifth largest country, both by geographical area and by population with over 192 million people. It is the only Portuguese-speaking country in the Americas and the largest lusophone country in the world.
                  <% });

              tabstrip.Add().Text("India")
                  .SpriteCssClasses("indiaFlag")
                  .Content(() => { %>
India, officially the Republic of India, is a country in South Asia. It is the seventh-largest country by geographical area, the second-most populous country with over 1.2 billion people, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the south-west, and the Bay of Bengal on the south-east, it shares land borders with Pakistan to the west; China, Nepal, and Bhutan to the north-east; and Burma and Bangladesh to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; in addition, India's Andaman and Nicobar Islands share a maritime border with Thailand and Indonesia.
                  <% });

              tabstrip.Add().Text("Netherlands")
                  .SpriteCssClasses("netherlandsFlag")
                  .Content(() => { %>
The Netherlands is a constituent country of the Kingdom of the Netherlands, located mainly in North-West Europe and with several islands in the Caribbean. Mainland Netherlands borders the North Sea to the north and west, Belgium to the south, and Germany to the east, and shares maritime borders with Belgium, Germany and the United Kingdom. It is a parliamentary democracy organised as a unitary state. The country capital is Amsterdam and the seat of government is The Hague. The Netherlands in its entirety is often referred to as Holland, although North and South Holland are actually only two of its twelve provinces.
                  <% });
          })
          .SelectedIndex(0)
          .Render();
    %>
</div>

<style scoped>
    h3 {
        font-weight: normal;
        padding: 0 0 1em 0;
    }
                
    .demo-section {
        width: 500px;
    }
                
    #tabstrip-sprites .k-sprite {
        background-image: url("<%= Url.Content("~/Content/shared/flags.png") %>");
    }

    .brazilFlag { background-position: 0 0; }
    .indiaFlag { background-position: 0 -32px; }
    .netherlandsFlag { background-position: 0 -64px; }

    .k-tabstrip .k-content {
        padding-top: 10px;
        padding-bottom: 10px;
    }
</style>
</asp:Content>