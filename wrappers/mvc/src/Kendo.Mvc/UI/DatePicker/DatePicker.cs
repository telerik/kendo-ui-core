namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    using Kendo.Mvc.UI.Html;

    public class DatePicker : ViewComponentBase, IInputComponent<DateTime>
    {
        static internal DateTime defaultMinDate = new DateTime(1900, 1, 1);
        static internal DateTime defaultMaxDate = new DateTime(2099, 12, 31);

        public DatePicker(ViewContext viewContext, IJavaScriptInitializer initializer, ViewDataDictionary viewData)
            : base(viewContext, initializer, viewData)
        {
            Format = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;
            ParseFormats = new List<string>();

            Min = defaultMinDate;
            Max = defaultMaxDate;

            Animation = new PopupAnimation();
            ClientEvents = new Dictionary<string, object>();
            MonthTemplate = new MonthTemplate();

            Value = null;
            Enabled = true;
        }

        public PopupAnimation Animation
        {
            get;
            private set;
        }

        public IDictionary<string, object> ClientEvents
        {
            get;
            private set;
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

        public List<string> ParseFormats
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

        public DateTime? Value
        {
            get;
            set;
        }

        public DateTime Min
        {
            get;
            set;
        }

        public DateTime Max
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }
        
        public override void WriteInitializationScript(TextWriter writer)
        {
            var options = new Dictionary<string, object>(ClientEvents);

            var animation = Animation.ToJson();

            if (animation.Keys.Any())
            {
                options["animation"] = animation["animation"];
            }

            options["format"] = Format;

            if (ParseFormats.Any())
            {
                options["parseFormats"] = ParseFormats;
            }

            options["min"] = Min;
            options["max"] = Max;
            options["footer"] = Footer;
            options["depth"] = Depth;
            options["start"] = Start;

            var month = MonthTemplate.ToJson();

            if (month.Keys.Any())
            {
                options["month"] = month;
            }

            writer.Write(Initializer.Initialize(Id, "DatePicker", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            Guard.IsNotNull(writer, "writer");

            DatePickerHtmlBuilder renderer = new DatePickerHtmlBuilder(this);

            renderer.Build().WriteTo(writer);
            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (Min > Max)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("MinValue", "MaxValue"));
            }
        }
    }
}