namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System.Web; 

    public class Tooltip : WidgetBase
    {
        public Tooltip(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {
            Callout = true;
            AutoHide = true;
            ContentHandler = new ClientHandlerDescriptor();
            Animation = new PopupAnimation();
        }

        public string Filter { get; set; }
        public string Container { get; set; }
        public TooltipPosition Position { get; set; }
        public int? ShowAfter { get; set; }
        public bool Callout { get; set; }
        public bool AutoHide { get; set; }
        public TooltipShowOnEvent ShowOn { get; set; }
        public string ContentUrl { get; set; }
        public string Content { get; set; }
        public ClientHandlerDescriptor ContentHandler { get; set; }
        public PopupAnimation Animation { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Filter.HasValue())
            {
                options["filter"] = SanitizeSelector(Filter);
            }

            if (Position != TooltipPosition.Bottom)
            {
                options["position"] = Enum.GetName(typeof(TooltipPosition), Position).ToLowerInvariant(); 
            }

            if (ShowAfter.HasValue)
            {
                options["showAfter"] = ShowAfter.Value;
            }

            if (!Callout)
            {
                options["callout"] = false;
            }

            if (!AutoHide)
            {
                options["autoHide"] = false;
            }

            if (ShowOn != TooltipShowOnEvent.MouseEnter)
            {
                options["showOn"] = Enum.GetName(typeof(TooltipShowOnEvent), ShowOn).ToLowerInvariant();
            }

            var animation = Animation.ToJson();

            if (animation.Any())
            {
                if (animation["animation"] is bool)
                {
                    options["animation"] = false;
                }
                else
                {
                    options["animation"] = animation["animation"];
                }
            }

            if (Width != 0)
            {
                options.Add("width", Width);
            }
            if (Height != 0)
            {
                options.Add("height", Height);
            }

            SerializeContent(options);

            writer.Write(Initializer.InitializeFor(SanitizeSelector(Container), "Tooltip", options));

            base.WriteInitializationScript(writer);
        }

        private void SerializeContent(Dictionary<string, object> options)
        {
            if (ContentUrl.HasValue())
            {
                options["content"] = new Dictionary<string, object>() {
                    { "url", ContentUrl }
                };
            }
            else if (ContentHandler.HasValue())
            {
                options["content"] = ContentHandler;
            }
            else if (Content.HasValue())
            {
                options["content"] = HttpUtility.UrlDecode(Content);
            }
        }                
        
        public override void VerifySettings()
        {
            if (string.IsNullOrEmpty(Container))
            {
                throw new InvalidOperationException(Resources.Exceptions.TooltipContainerShouldBeSet);
            }

            this.ThrowIfClassIsPresent("k-" + GetType().GetTypeName().ToLowerInvariant() + "-rtl", Exceptions.Rtl);
        }

        private string SanitizeSelector(string selector)
        {
            if (string.IsNullOrWhiteSpace(selector))
            {
                return string.Empty;
            }

            if (!IsInClientTemplate)
            {
                return selector;
            }

            StringBuilder builder = new StringBuilder(selector.Length);
            int startSharpIndex = selector.IndexOf("#=");
            int endSharpIndex = selector.LastIndexOf("#");

            if (endSharpIndex > startSharpIndex && startSharpIndex > -1)
            {
                builder.Append(selector.Substring(0, startSharpIndex).Replace("#", "\\#"));
                builder.Append(selector.Substring(startSharpIndex, endSharpIndex - startSharpIndex + 1));
                builder.Append(selector.Substring(endSharpIndex + 1).Replace("#", "\\#"));
            }
            else
            {
                builder.Append(selector.Replace("#", "\\#"));
            }

            return builder.ToString();
        }
        
    }
}