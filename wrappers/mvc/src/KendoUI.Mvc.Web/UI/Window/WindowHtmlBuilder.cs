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
            string cssText = !Window.Visible ? "display:none" : string.Empty;

            var element = new HtmlElement("div")
                   .Attribute("style", cssText)
                   .Attribute("id", Window.Id)
                   .Attributes(Window.HtmlAttributes);

            if (Window.Template.HasValue())
            {
                Window.Template.Apply(element);
            }

            return element;
        }
    }
}
