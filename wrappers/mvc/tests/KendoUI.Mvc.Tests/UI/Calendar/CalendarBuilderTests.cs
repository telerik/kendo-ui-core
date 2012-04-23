namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using Xunit;    

    public class CalendarBuilderTests
    {
        private readonly Calendar calendar;
        private readonly CalendarBuilder builder;

        public CalendarBuilderTests()
        {
            calendar = CalendarTestHelper.CreateCalendar(null);
            builder = new CalendarBuilder(calendar);
        }

        [Fact]
        public void Value_should_set_selected_date_of_the_calendar() 
        {
            builder.Value(DateTime.Today);

            Assert.Equal(DateTime.Today, calendar.Value);
        }

        [Fact]
        public void Value_should_return_builder()
        {
            var returnedBuilder = builder.Value(DateTime.Today);

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void Value_with_string_should_set_MaxDate_of_the_calendar()
        {
            var date = new DateTime(2000, 10, 10);
            builder.Value(date.ToShortDateString());

            Assert.Equal(date, calendar.Value);
        }

        [Fact]
        public void Value_with_string_should_throw_exception_if_incorrect_string_is_passed()
        {
            Assert.Throws(typeof(ArgumentException), () => builder.Value("incorrect"));
        }

        [Fact]
        public void Value_with_string_should_return_builder()
        {
            var returnedBuilder = builder.Value(DateTime.Now.ToShortDateString());

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void MinDate_should_set_min_date_range_of_the_calendar()
        {
            builder.MinDate(DateTime.Today);

            Assert.Equal(DateTime.Today, calendar.MinDate);
        }

        [Fact]
        public void MinDate_should_return_builder()
        {
            var returnedBuilder = builder.MinDate(DateTime.Today);

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void MinDate_with_string_should_set_MaxDate_of_the_calendar()
        {
            var date = new DateTime(2000, 10, 10);
            builder.MinDate(date.ToShortDateString());

            Assert.Equal(date, calendar.MinDate);
        }

        [Fact]
        public void MinDate_with_string_should_throw_exception_if_incorrect_string_is_passed()
        {
            Assert.Throws(typeof(ArgumentException), () => builder.MinDate("incorrect"));
        }

        [Fact]
        public void MinDate_with_string_should_return_builder()
        {
            var returnedBuilder = builder.MinDate(DateTime.Now.ToShortDateString());

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void MaxDate_should_set_max_date_range_of_the_calendar()
        {
            builder.MaxDate(DateTime.Today);

            Assert.Equal(DateTime.Today, calendar.MaxDate);
        }

        [Fact]
        public void MaxDate_should_return_builder()
        {
            var returnedBuilder = builder.MaxDate(DateTime.Today);

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void MaxDate_with_string_should_set_MaxDate_of_the_calendar()
        {
            var date = new DateTime(2000, 10, 10);
            builder.MaxDate(date.ToShortDateString());

            Assert.Equal(date, calendar.MaxDate);
        }

        [Fact]
        public void MaxDate_with_string_should_throw_exception_if_incorrect_string_is_passed()
        {
            Assert.Throws(typeof(ArgumentException), () => builder.MaxDate("incorrect"));
        }

        [Fact]
        public void MaxDate_with_string_should_return_builder()
        {
            var returnedBuilder = builder.MaxDate(DateTime.Now.ToShortDateString());

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void ClientEvents_should_set_events_of_the_calendar()
        {
            Action<CalendarClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            builder.ClientEvents(clientEventsAction);

            Assert.NotNull(calendar.ClientEvents.OnLoad.HandlerName);
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            Action<CalendarClientEventsBuilder> clientEventsAction = eventBuilder => { eventBuilder.OnLoad("Load"); };

            var returnedBuilder = builder.ClientEvents(clientEventsAction);

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }

        [Fact]
        public void Selection_should_set_select_settings_of_the_calendar()
        {
            List<DateTime> dates = new List<DateTime>{DateTime.Today};
            Action<CalendarSelectionSettingsBuilder> SelectionAction = settings => { settings.Dates(dates); };

            builder.Selection(SelectionAction);

            Assert.NotNull(calendar.SelectionSettings.Dates);
        }

        [Fact]
        public void Selection_should_return_builder()
        {
            Action<CalendarSelectionSettingsBuilder> SelectionAction = settings => { };

            var returnedBuilder = builder.Selection(SelectionAction);

            Assert.IsType(typeof(CalendarBuilder), returnedBuilder);
        }
    }
}
