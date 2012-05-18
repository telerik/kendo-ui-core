using Xunit;
using System;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class TimePickerBuilderTests
    {
        private readonly TimePicker timepicker;
        private readonly TimePickerBuilder builder;

        public TimePickerBuilderTests()
        {
            timepicker = TimePickerTestHelper.CreateTimePicker();
            builder = new TimePickerBuilder(timepicker);
        }
        
        [Fact]
        public void Format_should_set_Format_property_of_the_picker()
        {
            const string dateFormat = @"hh\:mm\:ss";

            builder.Format(dateFormat);

            Assert.Equal(dateFormat, timepicker.Format);
        }

        [Fact]
        public void Format_should_return_builder()
        {
            const string format = @"hh\:mm\:ss";
            var returnedBuilder = builder.Format(format);

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void Value_method_with_TimeSpan_param_should_set_Value_property() 
        {
            TimeSpan time = new TimeSpan(10, 10, 10);

            builder.Value(time);
            Assert.Equal(new DateTime(time.Ticks), timepicker.Value);
        }

        [Fact]
        public void Value_with_TimeSpan_param_should_return_builder()
        {
            var returnedBuilder = builder.Value(new TimeSpan(10, 10, 10));

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void Value_method_with_DateTime_param_should_set_Value_property()
        {
            DateTime dateTime = DateTime.Now;
            
            builder.Value(dateTime);
            Assert.Equal(dateTime, timepicker.Value);
        }

        [Fact]
        public void Value_with_DateTime_param_should_return_builder()
        {
            var returnedBuilder = builder.Value(DateTime.Now);

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void Value_method_with_string_param_should_set_Value_property()
        {
            DateTime time = DateTime.Parse("10:15");

            builder.Value("10:15");
            Assert.Equal(new DateTime(time.Ticks), timepicker.Value);
        }

        [Fact]
        public void Value_with_string_param_should_return_builder()
        {
            var returnedBuilder = builder.Value("");

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void MinTime_method_with_string_param_should_set_MinTime_property()
        {
            TimeSpan time = TimeSpan.Parse("07:00");

            builder.Min("07:00");
            Assert.Equal(new DateTime(time.Ticks), timepicker.Min);
        }

        [Fact]
        public void MinTime_method_with_string_param_should_throw_exception_if_string_is_not_correct()
        {
            Assert.Throws(typeof(ArgumentException), () => {
                              builder.Min("");
                          });
        }

        [Fact]
        public void MinTime_with_string_param_should_return_builder()
        {
            var returnedBuilder = builder.Min("10:10");

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void MinTime_method_with_TimeSpan_param_should_set_MinTime_property()
        {
            TimeSpan time = new TimeSpan(10, 10, 10);

            builder.Min(time);
            Assert.Equal(new DateTime(time.Ticks), timepicker.Min);
        }
        
        [Fact]
        public void MinTime_method_with_DateTime_param_should_set_MinTime_property()
        {
            DateTime dateTime = DateTime.Now;

            builder.Min(dateTime);
            Assert.Equal(dateTime, timepicker.Min);
        }

        [Fact]
        public void MaxTime_method_with_string_param_should_set_MaxTime_property()
        {
            TimeSpan time = TimeSpan.Parse("23:00");

            builder.Max("23:00");
            Assert.Equal(new DateTime(time.Ticks), timepicker.Max);
        }

        [Fact]
        public void MaxTime_method_with_string_param_should_throw_exception_if_string_is_not_correct()
        {
            Assert.Throws(typeof(ArgumentException), () => {
                              builder.Max("");
                          });
        }

        [Fact]
        public void MaxTime_with_string_param_should_return_builder()
        {
            var returnedBuilder = builder.Max("10:10");

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void MaxTime_method_with_TimeSpan_param_should_set_MaxTime_property()
        {
            TimeSpan time = new TimeSpan(10, 10, 10);

            builder.Max(time);
            Assert.Equal(new DateTime(time.Ticks), timepicker.Max);
        }

        [Fact]
        public void MaxTime_method_with_DateTime_param_should_set_MaxTime_property()
        {
            DateTime dateTime = DateTime.Now;

            builder.Max(dateTime);
            Assert.Equal(dateTime, timepicker.Max);
        }

        [Fact]
        public void Interval_method_should_set_Interval_property() 
        {
            int interval = 10;

            builder.Interval(interval);

            Assert.Equal(interval, timepicker.Interval);
        }

        [Fact]
        public void Interval_method_should_return_builder()
        {
            var returnedBuilder = builder.Interval(10);

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }

        [Fact]
        public void Enable_method_should_set_Enabled_property()
        {
            builder.Enable(false);

            Assert.Equal(false, timepicker.Enabled);
        }

        [Fact]
        public void Enable_method_should_return_builder()
        {
            var returnedBuilder = builder.Enable(true);

            Assert.IsType(typeof(TimePickerBuilder), returnedBuilder);
        }
    }
}