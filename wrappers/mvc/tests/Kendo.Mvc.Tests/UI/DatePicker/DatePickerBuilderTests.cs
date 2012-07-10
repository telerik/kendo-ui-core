namespace Kendo.Mvc.UI.Tests
{

    using System;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class DatePickerBuilderTests
    {
        private readonly DatePicker datePicker;
        private readonly DatePickerBuilder builder;

        public DatePickerBuilderTests()
        {
            datePicker = DatePickerTestHelper.CreateDatePicker(null);
            builder = new DatePickerBuilder(datePicker);
        }

        [Fact]
        public void Animation_with_false_argument_disables_animation()
        {
            builder.Animation(false);

            datePicker.Animation.Enabled.ShouldEqual(false);
        }

        [Fact]
        public void Animation_sets_animation_effects_of_the_datepicker()
        {
            builder.Animation(b => b.Open(o => o.Duration(200).Expand()));

            datePicker.Animation.Open.Duration.ShouldEqual(200);
            datePicker.Animation.Open.Container[0].ShouldEqual("expand");
        }

        [Fact]
        public void Animation_returns_builder()
        {
            builder.Animation(false).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void ClientEvents_sets_events_of_the_datepicker()
        {
            builder.Events(b => b.Change("change"));

            var @event = datePicker.Events["change"] as ClientHandlerDescriptor;

            Assert.NotNull(@event);

            @event.HandlerName.ShouldEqual("change");
        }

        [Fact]
        public void ClientEvents_returns_builder()
        {
            builder.Events(b => b.Change("change")).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Enable_method_sets_enabled_property()
        {
            builder.Enable(false);

            datePicker.Enabled.ShouldEqual(false);
        }

        [Fact]
        public void Enable_method_returns_DatePickerBuilder()
        {
            builder.Enable(true).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Format_method_sets_Format_property()
        {
            var format = "dd/MM/yyyy";
            
            builder.Format(format);

            datePicker.Format.ShouldEqual(format);
        }

        [Fact]
        public void Format_method_returns_DatePickerBuilder()
        {
            builder.Format("dd").ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Footer_method_sets_footer_template()
        {
            var template = "#= test #";

            builder.Footer(template);

            datePicker.Footer.ShouldEqual(template);
        }

        [Fact]
        public void Footer_method_returns_DatePickerBuilder()
        {
            builder.Footer("").ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Depth_method_sets_depth_property()
        {
            builder.Depth(CalendarView.Year);

            datePicker.Depth.ShouldEqual("year");
        }

        [Fact]
        public void Depth_method_returns_DatePickerBuilder()
        {
            builder.Depth(CalendarView.Decade).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Start_method_sets_start_property()
        {
            builder.Start(CalendarView.Year);

            datePicker.Start.ShouldEqual("year");
        }

        [Fact]
        public void Start_method_returns_DatePickerBuilder()
        {
            builder.Start(CalendarView.Decade).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void MonthTemplate_sets_month_content_template()
        {
            builder.MonthTemplate("#= test #");

            datePicker.MonthTemplate.Content.ShouldEqual("#= test #");
        }

        [Fact]
        public void MonthTemplate_sets_month_template_using_builder()
        {
            builder.MonthTemplate(month => month.Empty("empty").Content("content"));

            datePicker.MonthTemplate.Empty.ShouldEqual("empty");
            datePicker.MonthTemplate.Content.ShouldEqual("content");
        }

        [Fact]
        public void ParseFormats_method_sets_ParseFormats_list()
        {
            builder.ParseFormats(new string[] { "mm/dd/yyy" });
            builder.ParseFormats(new string[] { "mm/DD/yyyy" });

            datePicker.ParseFormats.Count.ShouldEqual(1);
        }

        [Fact]
        public void ParseFormats_method_returns_DatePickerBuilder()
        {
            builder.ParseFormats(new string[] {}).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Value_method_sets_value_property()
        {
            var date = DateTime.Today;

            builder.Value(date);

            datePicker.Value.ShouldEqual(date);
        }

        [Fact]
        public void Value_method_parses_string_argument()
        {
            builder.Value("10/10/2000");

            datePicker.Value.Value.Year.ShouldEqual(2000);
        }
        
        [Fact]
        public void Value_method_returns_DatePickerBuilder()
        {
            builder.Value("").ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Min_method_sets_min_property()
        {
            var date = new DateTime();

            builder.Min(date);

            datePicker.Min.ShouldEqual(date);
        }

        [Fact]
        public void Min_method_parses_string_argument()
        {
            builder.Min("10/10/2000");

            datePicker.Min.Year.ShouldEqual(2000);
        }

        [Fact]
        public void Min_method_returns_DatePickerBuilder()
        {
            builder.Min(DateTime.Today).ShouldBeType<DatePickerBuilder>();
        }

        [Fact]
        public void Max_method_sets_max_property()
        {
            var date = new DateTime();

            builder.Max(date);

            datePicker.Max.ShouldEqual(date);
        }

        [Fact]
        public void Max_method_parses_string_argument()
        {
            builder.Max("10/10/2000");

            datePicker.Max.Year.ShouldEqual(2000);
        }

        [Fact]
        public void Max_method_returns_DatePickerBuilder()
        {
            builder.Max(DateTime.Today).ShouldBeType<DatePickerBuilder>();
        }
    }
}