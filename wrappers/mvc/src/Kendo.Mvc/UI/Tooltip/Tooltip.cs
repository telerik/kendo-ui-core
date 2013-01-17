namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.IO;
    using System.Text.RegularExpressions;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using System;
    using System.Text; 

    public class Tooltip : WidgetBase
    {
        public Tooltip(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {        
        }

        public string Filter { get; set; }
        public string Container { get; set; }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            if (Filter.HasValue())
            {
                options["filter"] = SanitizeSelector(Filter);
            }            
                        
            writer.Write(Initializer.InitializeFor(SanitizeSelector(Container), "Tooltip", options));

            base.WriteInitializationScript(writer);
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
                
        public override void VerifySettings()
        {
            if (string.IsNullOrEmpty(Container))
            {
                throw new InvalidOperationException(Resources.Exceptions.TooltipContainerShouldBeSet);
            }

            this.ThrowIfClassIsPresent("k-" + GetType().GetTypeName().ToLowerInvariant() + "-rtl", Exceptions.Rtl);
        }        
    }
}