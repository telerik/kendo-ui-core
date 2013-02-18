namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;

    public class DatePicker : DatePickerBase
    {
        static internal DateTime defaultMinDate = new DateTime(1900, 1, 1);
        static internal DateTime defaultMaxDate = new DateTime(2099, 12, 31);

        public DatePicker(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Min = defaultMinDate;
            Max = defaultMaxDate;
            MonthTemplate = new MonthTemplate();
        }

        public MonthTemplate MonthTemplate
        {
            get;
            private set;
        }

        public string Footer
        {
            get;
            set;
        }

        public string FooterId
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
       
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            var idPrefix = "#";
            if (IsInClientTemplate)
            {
                idPrefix = "\\" + idPrefix;
            }

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options["animation"] = animation["animation"];
            }

            if (Culture.HasValue())
            {
                options["culture"] = Culture;
            }

            options["format"] = Format;

            if (ParseFormats.Any())
            {
                options["parseFormats"] = ParseFormats;
            }

            options["min"] = Min;
            options["max"] = Max;

            if (FooterId.HasValue())
            {
                options["footer"] = new ClientHandlerDescriptor { HandlerName = string.Format("$('{0}{1}').html()", idPrefix, FooterId) };
            }
            else if (Footer.HasValue())
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

            MonthTemplate.IdPrefix = idPrefix;

            var month = MonthTemplate.ToJson();

            if (month.Keys.Any())
            {
                options["month"] = month;
            }

            if (Dates.Any())
            {
                options["dates"] = Dates;
            }

            writer.Write(Initializer.Initialize(Selector, "DatePicker", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            if (string.IsNullOrEmpty(Format))
            {
                Format = CultureInfo.DateTimeFormat.ShortDatePattern;
            }

            DatePickerHtmlBuilderBase renderer = new DatePickerHtmlBuilderBase(this, "date");

            renderer.Build().WriteTo(writer);
            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Min > Max)
            {
                throw new ArgumentException(Exceptions.MinPropertyMustBeLessThenMaxProperty.FormatWith("Min", "Max"));
            }
        }
    }
}