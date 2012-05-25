namespace Kendo.Mvc.UI
{
    using System.Text.RegularExpressions;

    public class WindowHtmlBuilder
    {
        public WindowHtmlBuilder(Window window)
        {
            Window = window;
        }

        private Regex RemoteUrlRegex = new Regex(@"^([a-z]+:)?\/\/", RegexOptions.IgnoreCase);

        public Window Window 
        { 
            get;
            private set;
        }

        public IHtmlNode WindowTag()
        {
            var element = new HtmlElement("div")
                   .Attribute("id", Window.Id)
                   .Attributes(Window.HtmlAttributes)
                   .ToggleCss("display", "none", !Window.Visible);

            if (Window.Template.HasValue())
            {
                Window.Template.Apply(element);
            }

            return element;
        }
    }
}
