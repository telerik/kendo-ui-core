namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using Xunit;
    using Telerik.Web.Mvc.UI.Html;

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
        public void InputTag_should_render_selfclosed_Input_tag() 
        {
            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(tag.TagName, "input");
            Assert.Equal(System.Web.Mvc.TagRenderMode.SelfClosing, tag.RenderMode);
        }

        [Fact]
        public void Input_should_render_id_and_name()
        {
            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(timePicker.Id, tag.Attribute("id"));
            Assert.Equal(timePicker.Id, tag.Attribute("name"));
        }

        [Fact]
        public void Input_should_render_type_text_attribute()
        {
            IHtmlNode tag = renderer.InputTag();

            Assert.Equal("text", tag.Attribute("type"));
        }

        [Fact]
        public void Input_should_render_html_attributes()
        {
            timePicker.InputHtmlAttributes.Add("class", "t-test");

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(UIPrimitives.Input + " t-test", tag.Attribute("class"));
        }

        [Fact]
        public void Input_should_render_disabled_input_if_TimePicker_disabled()
        {
            timePicker.Enabled = false;

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal("disabled", tag.Attribute("disabled"));
        }

        [Fact]
        public void Input_should_render_value_if_ViewData_value_exists()
        {
            DateTime now = DateTime.Now;
            timePicker.ViewContext.ViewData["TimePicker"] = now.ToShortTimeString();

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(now.ToString(timePicker.Format), tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_not_render_value_if_ViewData_value_is_not_DateTime()
        {
            timePicker.ViewContext.ViewData["DatePicker"] = "not date";

            IHtmlNode tag = renderer.InputTag();

            Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        }
    
        [Fact]
        public void Input_should_render_selectedDate_if_set()
        {
            DateTime now = DateTime.Now;
            timePicker.Value = now;

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(now.ToString(timePicker.Format), tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_render_viewdata_value_even_when_selectedDate_is_set()
        {
            DateTime now = DateTime.Now;
            timePicker.Value = now;
            timePicker.ViewContext.ViewData["DatePicker"] = now.ToShortTimeString();

            IHtmlNode tag = renderer.InputTag();

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

            IHtmlNode tag = renderer.InputTag();

            tag.Attribute("value").ShouldEqual("s");
        }

        [Fact]
        public void InputTag_should_render_input_validation_class_if_ModelState_Error()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            timePicker.Name = "timePicker1";
            timePicker.ViewContext.ViewData.ModelState.Add("timePicker1", state);
            timePicker.ViewContext.ViewData.ModelState.AddModelError("timePicker1", new Exception());

            IHtmlNode tag = renderer.InputTag();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }

        [Fact]
        public void Button_should_render_span_tag_with_select_class()
        {
            IHtmlNode tag = renderer.ButtonTag();

            Assert.Equal("t-select", tag.Attribute("class"));
            Assert.Equal("span", tag.TagName);
        }

        [Fact]
        public void Button_should_render_tag_with_child_span_node()
        {
            IHtmlNode tag = renderer.ButtonTag();

            Assert.Equal("span", tag.Children[0].TagName);
        }

        [Fact]
        public void Button_should_child_span_node_with_icon_and_icon_time_classes()
        {
            IHtmlNode tag = renderer.ButtonTag();

            Assert.Equal(UIPrimitives.Icon + " t-icon-clock", tag.Children[0].Attribute("class"));
        }

        [Fact]
        public void Button_should_child_span_node_with_title_attribute()
        {
            IHtmlNode tag = renderer.ButtonTag();

            Assert.Equal(timePicker.ButtonTitle, tag.Children[0].Attribute("title"));
        }

        [Fact]
        public void Button_should_child_span_node_with_html_button_title()
        {
            IHtmlNode tag = renderer.ButtonTag();

            Assert.Equal(timePicker.ButtonTitle, tag.Children[0].InnerHtml);
        }

        [Fact]
        public void Build_should_return_div_tag() 
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("div", tag.TagName);
        }

        [Fact]
        public void Build_should_render_tag_with_widget_and_timepicker_classes()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("div", tag.TagName);
            Assert.Equal(UIPrimitives.Widget + " t-timepicker", tag.Attribute("class"));
        }

        [Fact]
        public void Build_should_render_tag_with_HtmlAttributes()
        {
            timePicker.HtmlAttributes.Add("class", "test");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("div", tag.TagName);
            Assert.Equal(UIPrimitives.Widget + " t-timepicker test", tag.Attribute("class"));
        }

        [Fact]
        public void Build_method_should_render_child_div_tag_with_picker_wrap_class() 
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("div", tag.Children[0].TagName);
            Assert.Equal("t-picker-wrap", tag.Children[0].Attribute("class"));
        }

        [Fact]
        public void Build_should_render_input_in_child_div()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("input", tag.Children[0].Children[0].TagName);
        }

        [Fact]
        public void Build_should_render_span_in_child_div()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("span", tag.Children[0].Children[1].TagName);
        }
    }
}