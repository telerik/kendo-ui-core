// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    
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
            return new HtmlElement("div")
                   .Attribute("style", !Window.Visible ? "display:none" : string.Empty)
                   .Attribute("id", Window.Id)
                   .Attributes(Window.HtmlAttributes)
                   .PrependClass(UIPrimitives.Widget, "t-window");
        }

        public IHtmlNode HeaderTag()
        {
            IHtmlNode header = new HtmlElement("div")
                  .AddClass("t-window-titlebar", UIPrimitives.Header);

            new LiteralNode("&nbsp;").AppendTo(header);

            return header;
        }

        public IHtmlNode IconTag()
        {
            return new HtmlElement("img", TagRenderMode.SelfClosing)
                    .Attribute("alt", Window.IconAlternativeText.HasValue() ? Window.IconAlternativeText : "icon", false)
                    .AddClass(UIPrimitives.Image)
                    .Attribute("src", Window.IconUrl);
        }

        public IHtmlNode TitleTag() 
        {
            IHtmlNode title = new HtmlElement("span")
                   .AddClass("t-window-title");

            if (Window.IconUrl.HasValue())
                IconTag().AppendTo(title);

            new TextNode(Window.Title.HasValue() ? Window.Title : Window.Name).AppendTo(title);

            return title;
        }

        public IHtmlNode ButtonContainerTag()
        {
            return new HtmlElement("div").AddClass("t-window-actions t-header");
        }

        public IHtmlNode ButtonTag(IWindowButton button)
        {
            IHtmlNode linkTag = new HtmlElement("a")
                                .AddClass(UIPrimitives.Link)
                                .Attribute("href", button.Url);

            linkTag.Children.Add(new HtmlElement("span")
                            .AddClass(UIPrimitives.Icon, button.CssClass)
                            .Html(button.Name));


            return linkTag;
        }

        public IHtmlNode ContentTag()
        {
            var content = new HtmlElement("div")
                               .AddClass("t-window-content", UIPrimitives.Content)
                               .Css("overflow", Window.Scrollable ? "auto" : "hidden")
                               .Attributes(Window.ContentHtmlAttributes);

            if (Window.Width != 0)
            {
                content.Css("width", Window.Width + "px");
            }

            if (Window.Height != 0)
            {
                content.Css("height", Window.Height + "px");
            }

            if (Window.ContentUrl.HasValue() && RemoteUrlRegex.IsMatch(Window.ContentUrl))
            {
                new HtmlElement("iframe")
                    .Attributes(new {
                        src = Window.ContentUrl,
                        title = Window.Title,
                        style = "border: 0; width: 100%; height: 100%;",
                        frameborder = "0"
                    })
                    .Html("This page requires frames in order to show content")
                    .AppendTo(content);
            } 
            else if (Window.Template.HasValue())
            {
                Window.Template.Apply(content);
            }
            
            return content;
        }

    }
}
