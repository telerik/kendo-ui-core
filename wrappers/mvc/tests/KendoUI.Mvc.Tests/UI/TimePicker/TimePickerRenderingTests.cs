namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using Moq;
    using Xunit;


    public class TimePickerRenderingTests
    {
        private readonly TimePicker timePicker;
        
        public TimePickerRenderingTests()
        {
            timePicker = TimePickerTestHelper.CreateTimePicker();
            timePicker.Name = "TimePicker";
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_not_in_range_minTicks_are_less_then_maxTicks() 
        {
            timePicker.MinValue = new DateTime(2000, 10, 10, 10, 0, 0);
            timePicker.MaxValue = new DateTime(2000, 10, 10, 20, 0, 0);
            timePicker.Value = new DateTime(2000, 10, 10, 22, 0, 0);

            Assert.DoesNotThrow(() => timePicker.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_not_in_range_maxTicks_are_less_then_minTicks() 
        {
            timePicker.MinValue = new DateTime(2000, 10, 10, 20, 0, 0);
            timePicker.MaxValue = new DateTime(2000, 10, 10, 10, 0, 0);
            timePicker.Value = new DateTime(2000, 10, 10, 15, 0, 0);

            Assert.DoesNotThrow(() => timePicker.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_null()
        {
            timePicker.MinValue = new DateTime(2000, 10, 10, 20, 0, 0);
            timePicker.MaxValue = new DateTime(2000, 10, 10, 10, 0, 0);
            timePicker.Value = null;

            Assert.DoesNotThrow(() => timePicker.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_in_range()
        {
            timePicker.MinValue = new DateTime(2000, 10, 10, 20, 0, 0);
            timePicker.MaxValue = new DateTime(2000, 10, 10, 10, 0, 0);
            timePicker.Value = new DateTime(2000, 10, 10, 22, 0, 0);

            Assert.DoesNotThrow(() => timePicker.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_10_AM()
        {
            timePicker.Value = new DateTime(new TimeSpan(10, 30, 0).Ticks);

            Assert.DoesNotThrow(() => timePicker.Render());
        }

        [Fact]
        public void ObjectWriter_should_append_Enable_property()
        {
            timePicker.Enabled = false;

            TimePickerTestHelper.clientSideObjectWriter.Setup(w => w.Append("enabled", timePicker.Enabled, true)).Verifiable();

            timePicker.WriteInitializationScript(new StringWriter());

            TimePickerTestHelper.clientSideObjectWriter.Verify(w => w.Append("enabled", timePicker.Enabled, true));
        }
    }
}
