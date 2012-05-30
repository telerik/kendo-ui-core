namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI;
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Query.Dynamic;
    using System.Web.UI.WebControls;
    
    public class Calendar : ViewComponentBase
    {
        public Calendar(ViewContext viewContext, IJavaScriptInitializer initializer)
            : base(viewContext, initializer)
        {
            MonthTemplate = new MonthTemplate();
        }

        public MonthTemplate MonthTemplate
        {
            get;
            private set;
        }

        public string Format
        {
            get;
            set;
        }

        public string Footer
        {
            get;
            set;
        }

        public string Start
        {
            get;
            set;
        }

        public string Depth
        {
            get;
            set;
        }

        public DateTime? Min
        {
            get;
            set;
        }

        public DateTime? Max
        {
            get;
            set;
        }

        public DateTime? Value
        {
            get;
            set;
        }
        
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            //TODO: urlFormat??
            //objectWriter.Append("urlFormat", urlFormat);

            if (Value.HasValue)
            {
                options["value"] = Value;
            }

            if (Min.HasValue)
            {
                options["min"] = Min;
            }

            if (Max.HasValue)
            {
                options["max"] = Max;
            }

            if (Format.HasValue())
            {
                options["format"] = Format;
            }

            if (Footer.HasValue())
            {
                options["footer"] = Footer;
            }

            if (Depth.HasValue())
            {
                options["depth"] = Depth;
            }

            if (Start.HasValue())
            {
                options["start"] = Start;
            }

            var month = MonthTemplate.ToJson();

            if (month.Keys.Any())
            {
                options["month"] = month;
            }

            writer.Write(Initializer.Initialize(Id, "Calendar", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            CalendarHtmlBuilder builder = new CalendarHtmlBuilder(this);

            builder.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Min > Max)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }
        }
    }
}
