namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Xunit;
    using Kendo.Mvc.UI.Html;

    public class TimePickerHtmlBuilderTests
    {
        private TimePickerHtmlBuilder renderer;
        private TimePicker timePicker;
        private TimeSpan time;

        public TimePickerHtmlBuilderTests()
        {
            time = new TimeSpan(5,27,22);

            timePicker = TimePickerTestHelper.CreateTimePicker();
            timePicker.Name = "TimePicker";
            renderer = new TimePickerHtmlBuilder(timePicker);
        }

        [Fact]
        public void Build_should_render_selfclosed_Input_tag() 
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(tag.TagName, "input");
            Assert.Equal(System.Web.Mvc.TagRenderMode.SelfClosing, tag.RenderMode);
        }

        [Fact]
        public void Input_should_render_id_and_name()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(timePicker.Id, tag.Attribute("id"));
            Assert.Equal(timePicker.Id, tag.Attribute("name"));
        }

        [Fact]
        public void Input_should_render_type_text_attribute()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("time", tag.Attribute("type"));
        }

        [Fact]
        public void Input_should_render_disabled_input_if_TimePicker_disabled()
        {
            timePicker.Enabled = false;

            IHtmlNode tag = renderer.Build();

            Assert.Equal("disabled", tag.Attribute("disabled"));
        }

        [Fact]
        public void Input_should_render_value_if_ViewData_value_exists()
        {
            DateTime now = DateTime.Now;
            timePicker.ViewContext.ViewData["TimePicker"] = now.ToShortTimeString();

            IHtmlNode tag = renderer.Build();

            Assert.Equal(now.ToString(timePicker.Format), tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_not_render_value_if_ViewData_value_is_not_DateTime()
        {
            timePicker.ViewContext.ViewData["DatePicker"] = "not date";

            IHtmlNode tag = renderer.Build();

            Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        }
    
        [Fact]
        public void Input_should_render_selectedDate_if_set()
        {
            DateTime now = DateTime.Now;
            timePicker.Value = now;

            IHtmlNode tag = renderer.Build();

            Assert.Equal(now.ToString(timePicker.Format), tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_render_viewdata_value_even_when_selectedDate_is_set()
        {
            DateTime now = DateTime.Now;
            timePicker.Value = now;
            timePicker.ViewContext.ViewData["DatePicker"] = now.ToShortTimeString();

            IHtmlNode tag = renderer.Build();

            Assert.Equal(now.ToString(timePicker.Format), tag.Attribute("value"));
        }

        [Fact]
        public void Input_value_method_should_set_attempedValue_if_GetValue_returns_null()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            timePicker.Name = "DatePicker1";
            timePicker.ViewContext.ViewData.ModelState.Add("DatePicker1", state);
            timePicker.ViewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.Build();

            tag.Attribute("value").ShouldEqual("s");
        }

        [Fact]
        public void Build_should_render_input_validation_class_if_ModelState_Error()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            timePicker.Name = "timePicker1";
            timePicker.ViewContext.ViewData.ModelState.Add("timePicker1", state);
            timePicker.ViewContext.ViewData.ModelState.AddModelError("timePicker1", new Exception());

            IHtmlNode tag = renderer.Build();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }
    }
}