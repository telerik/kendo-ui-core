namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Html;
    using Xunit;

    public class DropDownListHtmlBuilderTests
    {

        private DropDownList dropDownList;
        private DropDownListHtmlBuilderBase renderer;

        public DropDownListHtmlBuilderTests()
        {
            dropDownList = DropDownListTestHelper.CreateDropDownList();
            renderer = new DropDownListHtmlBuilderBase(dropDownList);
            dropDownList.Name = "DropDownList1";
        }

        [Fact]
        public void Build_should_output_start_tag()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("input", tag.TagName);
        }

        [Fact]
        public void Build_should_render_html_attributes()
        {
            dropDownList.HtmlAttributes.Add("title", "genericInput");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("genericInput", tag.Attribute("title"));
        }

        [Fact]
        public void Build_should_call_Build_and_append_to_wrapper()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("input", tag.TagName);
        }

        [Fact]
        public void InputTag_should_render_input_validation_error_class_if_ModelState_Error()
        {
            dropDownList.ViewContext.UnobtrusiveJavaScriptEnabled = true;

            System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
            System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
            state.Value = result;

            dropDownList.Name = "dropDownList1";
            dropDownList.ViewData.ModelState.Add("dropDownList1", state);
            dropDownList.ViewData.ModelState.AddModelError("dropDownList1", "error");

            IHtmlNode tag = renderer.Build();

            tag.Attribute("class").ShouldContain("input-validation-error");
        }

        [Fact]
        public void Build_should_render_input() 
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("input", tag.TagName);
        }

        [Fact]
        public void Build_should_output_input_type_text_()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("text", tag.Attribute("type"));
        }
        
        [Fact]
        public void Build_should_output_input_with_name()
        {
            dropDownList.Name = "test";

            IHtmlNode tag = renderer.Build();

            Assert.Equal(dropDownList.Id, tag.Attribute("id"));
            Assert.Equal(dropDownList.Name, tag.Attribute("name"));
        }

        [Fact]
        public void Build_should_output_html_attributes()
        {
            dropDownList.HtmlAttributes.Add("height", "100px");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("100px", tag.Attribute("height"));
        }

        [Fact]
        public void Build_should_set_id_from_inputHtmlAttr()
        {
            dropDownList.HtmlAttributes.Add("id", "test");

            IHtmlNode tag = renderer.Build();

            tag.Attribute("id").ShouldEqual("test");
        }

        [Fact]
        public void Build_should_set_auto_name_if_not_set()
        {
            dropDownList.Name = "test";

            IHtmlNode tag = renderer.Build();

            tag.Attribute("name").ShouldEqual(dropDownList.Name);
        }
    }
}