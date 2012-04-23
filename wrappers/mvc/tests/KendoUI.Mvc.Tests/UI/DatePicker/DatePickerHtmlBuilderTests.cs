namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Globalization;
    using Xunit;
    using Telerik.Web.Mvc.UI.Html;

    public class DatePickerHtmlBuilderTests
    {
        private IDatePickerHtmlBuilder renderer;
        private DatePicker datePicker;
        private DateTime date;

        public DatePickerHtmlBuilderTests()
        {
            date = new DateTime(2009, 12, 3);

            datePicker = DatePickerTestHelper.CreateDatePicker(null, null);
            datePicker.Name = "DatePicker";
            renderer = new DatePickerHtmlBuilder(datePicker);
        }

        [Fact]
        public void DatePickerStart_should_render_Div_tag() 
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(tag.TagName, "div");
        }

        [Fact]
        public void DatePickerStart_should_render_classes()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(UIPrimitives.Widget.ToString() + " " + "t-datepicker", tag.Attribute("class"));
        }

        [Fact]
        public void Input_should_render_input_control()
        {
            IHtmlNode tag = renderer.InputTag();

            Assert.Contains(UIPrimitives.Input, tag.Attribute("class"));
            Assert.Equal("input", tag.TagName);
        }

        [Fact]
        public void Input_should_render_id_and_name()
        {
            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(datePicker.Id, tag.Attribute("id"));
            Assert.Equal(datePicker.Name, tag.Attribute("name"));
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
            datePicker.InputHtmlAttributes.Add("class", "t-test");

            IHtmlNode tag = renderer.InputTag();
            
            Assert.Equal(UIPrimitives.Input + " t-test", tag.Attribute("class"));
        }

        [Fact]
        public void Input_should_render_value_if_ViewData_value_exists() 
        {
            DateTime now = DateTime.Now;
            datePicker.ViewContext.ViewData["DatePicker"] = now.ToShortDateString();

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(Convert.ToDateTime(now.ToShortDateString(), CultureInfo.CurrentCulture).ToShortDateString(),
                tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_not_render_value_if_ViewData_value_is_not_DateTime()
        {
            datePicker.ViewContext.ViewData["DatePicker"] = "not date";

            IHtmlNode tag = renderer.InputTag();

            Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_not_render_value_if_ViewData_value_is_DateTime_MinValue()
        {
            datePicker.ViewContext.ViewData["DatePicker"] = "1/1/0001";

            IHtmlNode tag = renderer.InputTag();

            Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        }

        [Fact]
        public void Input_should_render_selectedDate_if_set() 
        {
            DateTime now = DateTime.Now;
            datePicker.Value = now;

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(now.ToString(datePicker.Format), tag.Attribute("value"));
        }
        
        [Fact]
        public void Input_should_render_viewdata_value_even_when_selectedDate_is_set()
        {
            DateTime now = DateTime.Now;
            datePicker.Value = now;
            datePicker.ViewContext.ViewData["DatePicker"] = now.ToShortDateString();

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(Convert.ToDateTime(now.ToShortDateString(), CultureInfo.CurrentCulture).ToShortDateString(),
                tag.Attribute("value"));
        }

        [Fact]
        public void Input_value_method_should_set_attempedValue_if_GetValue_returns_null()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            datePicker.Name = "DatePicker1";
            datePicker.ViewContext.ViewData.ModelState.Add("DatePicker1", state);
            datePicker.ViewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.InputTag();
           
            tag.Attribute("value").ShouldEqual("s");
        }

        [Fact]
        public void Input_if_GetValue_returns_null_set_DatePicker_Value_to_null()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            datePicker.Name = "DatePicker1";
            datePicker.Value = DateTime.Now;
            datePicker.ViewContext.ViewData.ModelState.Add("DatePicker1", state);
            datePicker.ViewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.InputTag();

            datePicker.Value.ShouldBeNull();
        }

        [Fact]
        public void InputTag_should_render_input_validation_class_if_ModelState_Error()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            datePicker.Name = "DatePicker1";
            datePicker.ViewContext.ViewData.ModelState.Add("DatePicker1", state);
            datePicker.ViewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.InputTag();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }

        [Fact]
        public void Button_should_render_icon_with_default_title_and_class()
        {
            IHtmlNode tag = renderer.ButtonTag().Children[0];

            Assert.Equal("Open the calendar", tag.Attribute("title"));
            Assert.Equal(UIPrimitives.Icon + " t-icon-calendar", tag.Attribute("class"));
       }

        [Fact]
        public void Button_should_render_link_with_class_with_set_title()
        {
            datePicker.ButtonTitle = "test";

            IHtmlNode tag = renderer.ButtonTag();
            
            Assert.Equal("test", tag.Children[0].Attribute("title"));
        }

        [Fact]
        public void DatePicker_should_be_disabled()
        {
            datePicker.Enabled = false;

            IHtmlNode div = renderer.Build();
            IHtmlNode tag = renderer.InputTag();
            
            Assert.Equal("disabled", tag.Attribute("disabled"));
            Assert.Contains("t-state-disabled", div.Attribute("class"));
        }
    }
}