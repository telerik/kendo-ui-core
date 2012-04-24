namespace KendoUI.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Web.Mvc;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Resources;
    using KendoUI.Mvc.UI;

    public class DateTimePicker : DatePickerBase
    {
        private readonly IList<IEffect> defaultEffects = new List<IEffect> { new SlideAnimation() };
        static internal DateTime defaultMinDate = new DateTime(1899, 12, 31);
        static internal DateTime defaultMaxDate = new DateTime(2100, 1, 1);

        public DateTimePicker(ViewContext viewContext, IClientSideObjectWriterFactory clientSideObjectWriterFactory)
            : base(viewContext, clientSideObjectWriterFactory)
        {
            ScriptFileNames.AddRange(new[] { "telerik.common.js", "telerik.datetimepicker.js", "telerik.datepicker.js", "telerik.calendar.js", "telerik.timepicker.js" });

            defaultEffects.Each(el => Effects.Container.Add(el));

            DateTimeFormatInfo dateTimeFormats = CultureInfo.CurrentCulture.DateTimeFormat;
            Format = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.ShortTimePattern;
            
            DropDownHtmlAttributes = new Dictionary<string, object>();

            MinValue = defaultMinDate;
            MaxValue = defaultMaxDate;

            StartTime = DateTime.Today;
            EndTime = DateTime.Today;

            Dates = new List<DateTime>();

            Interval = 30;

            CalendarButtonTitle = "Open the calendar";
            TimeButtonTitle = "Open the time view";
        }
        
        public IDictionary<string, object> DropDownHtmlAttributes { get; private set; }

        public DateTime StartTime { get; set; }

        public DateTime EndTime { get; set; }

        public int Interval { get; set; }

        public string CalendarButtonTitle { get; set; }
        
        public string TimeButtonTitle { get; set; }

        public List<DateTime> Dates { get; set; }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            IClientSideObjectWriter objectWriter = ClientSideObjectWriterFactory.Create(Id, "tDateTimePicker", writer);

            objectWriter.Start();
            
            if (!defaultEffects.SequenceEqual(Effects.Container))
            {
                objectWriter.Serialize("effects", Effects);
            }

            ClientEvents.SerializeTo(objectWriter);

            objectWriter.Append("format", this.Format);
            objectWriter.Append("todayFormat", TodayFormat);
            objectWriter.Append("minValue", this.MinValue);
            objectWriter.Append("maxValue", this.MaxValue);
            objectWriter.Append("startTimeValue", this.StartTime);
            objectWriter.Append("endTimeValue", this.EndTime);
            objectWriter.Append("interval", this.Interval);
            objectWriter.Append("selectedValue", this.Value);
            objectWriter.Append("enabled", this.Enabled, true);
            objectWriter.Append("dates", this.Dates);

            if (DropDownHtmlAttributes.Any())
            {
                objectWriter.Append("dropDownAttr", DropDownHtmlAttributes.ToAttributeString());
            }

            objectWriter.Complete();

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
#if MVC2 || MVC3
            Name = Name ?? ViewContext.ViewData.TemplateInfo.GetFullHtmlFieldName(string.Empty);
#endif
            DateTimePickerHtmlBuilder renderer = new DateTimePickerHtmlBuilder(this);

            renderer.Build().WriteTo(writer);

            base.WriteHtml(writer);
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (MinValue > MaxValue)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("MinValue", "MaxValue"));
            }
        }
    }
}
