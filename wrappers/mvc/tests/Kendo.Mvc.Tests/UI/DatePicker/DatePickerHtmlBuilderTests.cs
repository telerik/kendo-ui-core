namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Html;
    using System;
    using System.Globalization;
    using Xunit;

    public class DatePickerHtmlBuilderTests
    {
        private DatePickerHtmlBuilderBase renderer;
        private DatePicker datePicker;

        public DatePickerHtmlBuilderTests()
        {
            datePicker = DatePickerTestHelper.CreateDatePicker(null);
            datePicker.Name = "DatePicker";

            datePicker.Format = CultureInfo.CurrentCulture.DateTimeFormat.ShortDatePattern;

            renderer = new DatePickerHtmlBuilderBase(datePicker, "date");
        }

        [Fact]
        public void Build_render_input_tag()
        {
            IHtmlNode tag = renderer.Build();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void Build_render_input_with_type_date()
        {
            IHtmlNode tag = renderer.Build();

            tag.Attribute("type").ShouldEqual("date");
        }

        [Fact]
        public void Build_render_input_with_id_and_name()
        {
            datePicker.Name = "datepicker?";

            IHtmlNode tag = renderer.Build();

            tag.Attribute("id").ShouldEqual("datepicker_");
            tag.Attribute("name").ShouldEqual("datepicker?");
        }

        [Fact]
        public void Build_renders_disabled_input()
        {
            datePicker.Enabled = false;

            IHtmlNode tag = renderer.Build();

            tag.Attribute("disabled").ShouldEqual("disabled");
        }

        [Fact]
        public void Build_renders_value_if_ViewData_value_exists()
        {
            DateTime now = DateTime.Now;
            datePicker.ViewData["DatePicker"] = now.ToShortDateString();

            IHtmlNode tag = renderer.Build();

            var result = Convert.ToDateTime(now.ToShortDateString(), CultureInfo.CurrentCulture).ToShortDateString();

            tag.Attribute("value").ShouldEqual(result);
        }

        [Fact]
        public void Build_does_not_render_value_if_ViewData_value_is_not_DateTime()
        {
            datePicker.ViewContext.ViewData["DatePicker"] = "not date";

            IHtmlNode tag = renderer.Build();

            Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        }

        [Fact]
        public void Build_does_not_render_value_if_ViewData_value_is_DateTime_MinValue()
        {
            datePicker.ViewContext.ViewData["DatePicker"] = "1/1/0001";

            IHtmlNode tag = renderer.Build();

            Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        }

        [Fact]
        public void Build_renders_selectedDate_if_set()
        {
            DateTime now = DateTime.Now;
            datePicker.Value = now;

            IHtmlNode tag = renderer.Build();

            tag.Attribute("value").ShouldEqual(now.ToString(datePicker.Format));
        }

        [Fact]
        public void Build_renders_viewdata_value_even_when_selectedDate_is_set()
        {
            DateTime now = DateTime.Now;
            datePicker.Value = now;
            datePicker.ViewContext.ViewData["DatePicker"] = now.ToShortDateString();

            IHtmlNode tag = renderer.Build();
            
            var result = Convert.ToDateTime(now.ToShortDateString(), CultureInfo.CurrentCulture).ToShortDateString();

            tag.Attribute("value").ShouldEqual(result);
        }

        [Fact]
        public void Input_value_method_should_set_attempedValue_if_GetValue_returns_null()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            datePicker.Name = "DatePicker1";
            datePicker.ViewData.ModelState.Add("DatePicker1", state);
            datePicker.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.Build();

            tag.Attribute("value").ShouldEqual("s");
        }

        [Fact]
        public void Build_renders_what_GetValue_returns()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            datePicker.Name = "DatePicker1";
            datePicker.Value = DateTime.Now;
            datePicker.ViewData.ModelState.Add("DatePicker1", state);
            datePicker.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.Build();

            datePicker.Value.ShouldBeNull();
        }

        [Fact]
        public void Build_renders_input_validation_class_if_ModelState_Error()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            datePicker.Name = "DatePicker1";
            datePicker.ViewData.ModelState.Add("DatePicker1", state);
            datePicker.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.Build();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }
    }
}