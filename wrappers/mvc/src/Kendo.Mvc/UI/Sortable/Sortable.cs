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
    using System.Text.RegularExpressions; 

    public class Sortable : WidgetBase
    {
        public Sortable(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {
        }

        public string Filter { get; set; }

        private string container;

        public string Container 
        {
            get
            {
                return container;
            }
            set
            {
                Name = container = value;
            }
        }

        private string Encode(string value)
        {
            value = Regex.Replace(value, "(%20)*%23%3D(%20)*", "#=", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%23(%20)*", "#", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%24%7B(%20)*", "${", RegexOptions.IgnoreCase);
            value = Regex.Replace(value, "(%20)*%7D(%20)*", "}", RegexOptions.IgnoreCase);

            return value;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = ToJson();
            writer.Write(Initializer.InitializeFor(SanitizeSelector(Container), "Sortable", options));

            base.WriteInitializationScript(writer);
        }

        public virtual IDictionary<string, object> ToJson()
        {
            var options = new Dictionary<string, object>(Events);

            if (Filter.HasValue())
            {
                options["filter"] = SanitizeSelector(Filter);
            }

            return options;
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