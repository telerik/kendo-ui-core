namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;
    using Telerik.Web.Mvc.Infrastructure;
    using System.Globalization;

    public class AutoCompleteHtmlBuilderTests
    {

        private AutoComplete AutoComplete;
        private AutoCompleteHtmlBuilder renderer;

        public AutoCompleteHtmlBuilderTests()
        {
            AutoComplete = AutoCompleteTestHelper.CreateAutocomplete();
            renderer = new AutoCompleteHtmlBuilder(AutoComplete);

            AutoComplete.Name = "Test";
        }

        [Fact]
        public void Build_should_output_input_tag()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("input", tag.TagName);
        }

        [Fact]
        public void Build_should_output_type_text_attribute()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("text", tag.Attribute("type"));
        }

        [Fact]
        public void Build_should_output_input_with_id_attribute_same_as_component_id()
        {
            AutoComplete.Name = "test.test";

            IHtmlNode tag = renderer.Build();

            Assert.Equal(AutoComplete.Id, tag.Attribute("id"));
        }

        [Fact]
        public void Build_should_output_input_with_name_attribute_same_as_component_name()
        {
            AutoComplete.Name = "test.test";

            IHtmlNode tag = renderer.Build();

            Assert.Equal(AutoComplete.Name, tag.Attribute("name"));
        }
        
        [Fact]
        public void Build_should_output_input_with_class_attribute()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(UIPrimitives.Widget + " t-autocomplete " + UIPrimitives.Input, tag.Attribute("class"));
        }

        [Fact]
        public void Build_should_output_html_attributes()
        {
            AutoComplete.HtmlAttributes.Add("style", "width: 100px;");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("width: 100px;", tag.Attribute("style"));
        }

        [Fact]
        public void Build_should_output_disable_attributes()
        {
            AutoComplete.Enabled = false;

            IHtmlNode tag = renderer.Build();

            Assert.Equal("disabled", tag.Attribute("disabled"));
        }

        [Fact]
        public void AutoComplete_should_be_disabled()
        {
            AutoComplete.Enabled = false;

            IHtmlNode tag = renderer.Build();

            Assert.Equal("disabled", tag.Attribute("disabled"));
        }

        [Fact]
        public void Render_method_should_set_selectedIndex_depending_on_returned_value_from_ValueProvider()
        {
            AutoComplete.Name = "AutoComplete1";
            AutoComplete.Items.Add("Item1");
            AutoComplete.Items.Add("Item2");
            AutoComplete.Items.Add("Item3");

            AutoComplete.ViewContext.ViewData.Add("AutoComplete1", "Item3");
            
            var tag = renderer.Build();

            Assert.Equal("Item3", tag.Attribute("value"));
        }

        [Fact]
        public void Input_if_GetValue_returns_null_set_DatePicker_Value_to_null()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            AutoComplete.Name = "AutoComplete1";
            AutoComplete.Value = "test";
            AutoComplete.ViewContext.ViewData.ModelState.Add("AutoComplete1", state);
            AutoComplete.ViewContext.ViewData.ModelState.AddModelError("AutoComplete1", "error");

            IHtmlNode tag = renderer.Build();
            tag.Attribute("value").ShouldEqual("s");
        }

        [Fact]
        public void InputTag_should_render_input_validation_class_if_ModelState_Error()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            AutoComplete.Name = "AutoComplete1";
            AutoComplete.ViewContext.ViewData.ModelState.Add("AutoComplete1", state);
            AutoComplete.ViewContext.ViewData.ModelState.AddModelError("AutoComplete1", "error");

            IHtmlNode tag = renderer.Build();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }

        [Fact]
        public void AutoComplete_should_set_value_from_extenssion_for()
        {
            AutoComplete.Value = "value";

            IHtmlNode tag = renderer.Build();

            Assert.Equal("value", tag.Attribute("value"));
        }
    }
}