namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Web;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Resources;
    
    public class Calendar : ViewComponentBase
    {
        private readonly ICalendarHtmlBuilderFactory rendererFactory;

        private string urlFormat;

        public Calendar(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator, ICalendarHtmlBuilderFactory rendererFactory)
            : base(viewContext, initializer)
        {
            UrlGenerator = urlGenerator;

            SelectionSettings = new CalendarSelectionSettings { Dates = new List<DateTime>() };

            MinDate = new DateTime(1899, 12, 31);
            MaxDate = new DateTime(2100, 1, 1);
            Value = null;

            this.rendererFactory = rendererFactory;
        }

        public IUrlGenerator UrlGenerator
        {
            get;
            private set;
        }

        public DateTime? Value
        { 
            get; 
            set; 
        }

        public DateTime MinDate
        {
            get;
            set;
        }

        public DateTime MaxDate
        {
            get;
            set;
        }

        public string TodayFormat
        {
            get;
            set;
        }

        public CalendarSelectionSettings SelectionSettings
        {
            get;
            set;
        }

        public override void WriteInitializationScript(System.IO.TextWriter writer)
        {
            var options = new Dictionary<string, object>(Events);

            options["value"] = Value;
            options["min"] = MinDate;
            options["max"] = MaxDate;
            options["dates"] = SelectionSettings.Dates;

            //TODO: urlFormat??
            //objectWriter.Append("urlFormat", urlFormat);
            //objectWriter.Append("todayFormat", TodayFormat);

            writer.Write(Initializer.Initialize(Id, "Calendar", options));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(System.Web.UI.HtmlTextWriter writer)
        {
            ICalendarHtmlBuilder renderer = rendererFactory.Create(this);

            urlFormat = SelectionSettings.GenerateUrl(ViewContext, UrlGenerator);
            if (urlFormat.HasValue()) 
            {
                urlFormat = HttpUtility.UrlDecode(urlFormat).ToLowerInvariant();
            }

            IHtmlNode rootTag = renderer.Build();

            IHtmlNode contentTag = renderer.ContentTag();
            contentTag.Children.Add(BuildWeekHeader(renderer));
            contentTag.Children.Add(BuildMonthView(renderer));

            rootTag.Children.Add(contentTag);

            rootTag.WriteTo(writer);

            base.WriteHtml(writer);
        }

        private static IHtmlNode BuildWeekHeader(ICalendarHtmlBuilder renderer) 
        {
            IHtmlNode headerTag = renderer.HeaderTag();
            IHtmlNode row = renderer.RowTag();

            DateTimeFormatInfo dateTimeFormat = CultureInfo.CurrentCulture.DateTimeFormat;
            string[] dayNames = dateTimeFormat.DayNames;
            string[] abbreviatedDayNames = dateTimeFormat.AbbreviatedDayNames;
            string[] shortestDayNames = dateTimeFormat.ShortestDayNames;
            int firstDayIndex = (int)dateTimeFormat.FirstDayOfWeek;

            var modifiedDayNames = dayNames.Skip(firstDayIndex).Take(dayNames.Length)
                                           .Concat(dayNames.Take(firstDayIndex)).ToList();
            var modifiedAbbreviatedDayNames = abbreviatedDayNames.Skip(firstDayIndex).Take(abbreviatedDayNames.Length)
                                                                 .Concat(abbreviatedDayNames.Take(firstDayIndex)).ToList();
            var modifiedShortestDayNames = shortestDayNames.Skip(firstDayIndex).Take(shortestDayNames.Length)
                                                           .Concat(shortestDayNames.Take(firstDayIndex)).ToList();

            for (int i = 0; i < modifiedDayNames.Count; i++)
            {
                row.Children.Add(renderer.HeaderCellTag(modifiedDayNames[i], modifiedAbbreviatedDayNames[i], modifiedShortestDayNames[i]));
            }

            headerTag.Children.Add(row);

            return headerTag;
        }

        private DateTime GetStartOfWeek(DateTime selectedDate, DayOfWeek weekStart)
        {
            int selectedDay = (int)selectedDate.DayOfWeek;

            int daysToSubtract = 0;
            while (selectedDay != (int)weekStart)
            {
                if (selectedDay == 0)
                    selectedDay = 6;
                else
                    selectedDay--;

                daysToSubtract++;
            }

            DateTime result = selectedDate.Subtract(TimeSpan.FromDays(daysToSubtract));
            return new DateTime(result.Ticks, selectedDate.Kind);
        }

        private DateTime GetLastDayOfMonth(DateTime date)
        {
            DateTime result = new DateTime(date.Year, date.Month, DateTime.DaysInMonth(date.Year, date.Month));
            return new DateTime(result.Ticks, date.Kind);
        }

        private IHtmlNode BuildMonthView(ICalendarHtmlBuilder renderer) 
        {
            NormalizeSelectDates();

            IHtmlNode monthTag = renderer.MonthTag();

            DateTime focusedDate = this.DetermineFocusedDate();
            DateTime prevMonth = GetLastDayOfMonth(focusedDate).AddMonths(-1);
            DateTime startDate = GetStartOfWeek(prevMonth, CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek);

            for (int weekRow = 0; weekRow < 6; weekRow++)
            {
                IHtmlNode rowTag = renderer.RowTag();

                for (int day = 0; day < 7; day++) 
                {
                    renderer.CellTag(startDate, Value, urlFormat, startDate.Month != focusedDate.Month).AppendTo(rowTag);
                    startDate = startDate.AddDays(1);
                }
                monthTag.Children.Add(rowTag);
            }
            return monthTag;
        }

        private void NormalizeSelectDates()
        {
            this.SelectionSettings.Dates = this.SelectionSettings.Dates.Select(date => new DateTime(date.Year, date.Month, date.Day)).ToList();
        }

        public override void VerifySettings()
        {
            base.VerifySettings();

            if (MinDate > MaxDate)
            {
                throw new ArgumentException(TextResource.MinPropertyMustBeLessThenMaxProperty.FormatWith("MinDate", "MaxDate"));
            }
        }
    }
}
