namespace KendoUI.Mvc.UI
{
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using KendoUI.Mvc.Extensions;
    
    public class WindowHtmlBuilder : IWindowHtmlBuilder
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
                   .ToggleCss("display", "none", !Window.Visible)
                   .ToggleCss("width", Window.Width + "px", Window.Width != 0)
                   .ToggleCss("height", Window.Height + "px", Window.Height != 0);

            if (Window.Template.HasValue())
            {
                Window.Template.Apply(element);
            }

            return element;
        }
    }
}
