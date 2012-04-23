namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;
    using System;


    public class InputHtmlBuilderTests
    {
        private ITextBoxBaseHtmlBuilder renderer;
        private TextBoxBase<int> input;
        private string objectName;

        public InputHtmlBuilderTests()
        {
            input = TextBoxBaseTestHelper.CreateInput<int>(null, null);
            renderer = new TextBoxBaseHtmlBuilder<int>(input);
            objectName = "t-integerinput";
            input.Name = "IntegerInput";
        }

        [Fact]
        public void Build_should_render_div_tag() 
        {
            IHtmlNode tag = renderer.Build(objectName);

            Assert.Equal(tag.TagName, "div");
        }

        [Fact]
        public void Build_should_render_classes()
        {
            IHtmlNode tag = renderer.Build(objectName);

            Assert.Equal(UIPrimitives.Widget.ToString() + " " + objectName, tag.Attribute("class"));
        }

        [Fact]
        public void Build_should_render_html_attributes()
        {
            input.HtmlAttributes.Add("title", "genericInput");

            IHtmlNode tag = renderer.Build(objectName);

            Assert.Equal("genericInput", tag.Attribute("title"));
        }

        [Fact]
        public void InputTag_should_render_input_control()
        {
            IHtmlNode tag = renderer.InputTag();

            Assert.Contains(UIPrimitives.Input, tag.Attribute("class"));
            Assert.Equal("input", tag.TagName);
        }

        [Fact]
        public void InputTag_should_render_name()
        {
            input.Name = "IntegerInput";

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(input.Name, tag.Attribute("name"));
            Assert.Equal(input.Id, tag.Attribute("id"));
        }

        [Fact]
        public void InputTag_should_render_type_text_attribute()
        {
            input.Name = "IntegerInput";

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal("text", tag.Attribute("type"));
        }

        [Fact]
        public void Input_should_render_html_attributes()
        {
            input.InputHtmlAttributes.Add("class", "t-test");

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(UIPrimitives.Input + " t-test", tag.Attribute("class"));
        }

        [Fact]
        public void InputTag_should_render_value_if_ViewData_value_exists()
        {
            input.Name = "IntegerInput";
            const int value = 10;
            input.ViewContext.ViewData["IntegerInput"] = value.ToString();

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(value.ToString(), tag.Attribute("value"));
        }

        [Fact]
        public void InputTag_should_render_selected_value_if_set()
        {
            const int value = 10;
            input.Value = value;

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(value.ToString(), tag.Attribute("value"));
        }

        [Fact]
        public void InputTag_should_render_value_even_viewdata_is_available()
        {
            const string inputName = "IntegerInput";
            const int value = 10;

            input.Name = inputName;
            input.Value = value;
            input.ViewContext.ViewData[inputName] = 19;

            IHtmlNode tag = renderer.InputTag();

            Assert.Equal(value.ToString(), tag.Attribute("value"));
        }

        [Fact]
        public void Input_value_method_should_set_attempedValue_if_GetValue_returns_null()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            input.Name = "DatePicker1";
            input.ViewContext.ViewData.ModelState.Add("DatePicker1", state);
            input.ViewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.InputTag();

            tag.Attribute("value").ShouldEqual("s");
        }

        [Fact]
        public void Input_value_method_should_render_ModelStateValue_even_Model_value_is_set()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("30", "30", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            input.Value = 10;
            input.Name = "DatePicker1";            
            input.ViewContext.ViewData.ModelState.Add("DatePicker1", state);
            input.ViewContext.ViewData.ModelState.AddModelError("DatePicker1", new Exception());

            IHtmlNode tag = renderer.InputTag();

            tag.Attribute("value").ShouldEqual("30");
        }

        [Fact]
        public void InputTag_should_render_input_validation_class_if_ModelState_Error()
        {
            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            input.Name = "input1";
            input.ViewContext.ViewData.ModelState.Add("input1", state);
            input.ViewContext.ViewData.ModelState.AddModelError("input1", new Exception());

            IHtmlNode tag = renderer.InputTag();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }

        [Fact]
        public void Up_Button_should_render_link_with_classes()
        {
            IHtmlNode tag = renderer.UpButtonTag();

            Assert.Equal("#", tag.Attribute("href"));
            Assert.Equal(UIPrimitives.Link + " " + UIPrimitives.Icon + " t-arrow-up", tag.Attribute("class"));
            Assert.Equal("a", tag.TagName);
        }

        [Fact]
        public void Up_Button_should_render_link_with_class_with_set_title()
        {
            input.ButtonTitleUp = "test";

            IHtmlNode tag = renderer.UpButtonTag();

            Assert.Equal("test", tag.Attribute("title"));
        }

        [Fact]
        public void Down_Button_should_render_link_with_classes()
        {
            IHtmlNode tag = renderer.DownButtonTag();

            Assert.Equal("#", tag.Attribute("href"));
            Assert.Equal(UIPrimitives.Link + " " + UIPrimitives.Icon + " t-arrow-down", tag.Attribute("class"));
            Assert.Equal("a", tag.TagName);
        }

        [Fact]
        public void Down_Button_should_render_link_with_class_with_set_title()
        {
            input.ButtonTitleDown = "test";

            IHtmlNode tag = renderer.DownButtonTag();

            Assert.Equal("test", tag.Attribute("title"));
        }

        [Fact]
        public void TextBox_should_should_be_disabled()
        {
            input.Enabled = false;

            IHtmlNode div = renderer.Build(objectName);
            IHtmlNode tag = renderer.InputTag();

            Assert.Equal("disabled", tag.Attribute("disabled"));
            Assert.Contains("t-state-disabled", div.Attribute("class"));
        }
    }
}