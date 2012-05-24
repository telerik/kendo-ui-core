namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;

    using System.IO;
    using System.Web.UI;
using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    public class DropDownListHtmlBuilderTests
    {

        private DropDownList dropDownList;
        private DropDownListHtmlBuilder renderer;

        public DropDownListHtmlBuilderTests()
        {
            dropDownList = DropDownListTestHelper.CreateDropDownList();
            renderer = new DropDownListHtmlBuilder(dropDownList);
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

        //[Fact]
        //public void InputTag_should_render_input_validation_error_class_if_ModelState_Error()
        //{
        //    dropDownList.ViewContext.UnobtrusiveJavaScriptEnabled = true;

        //    System.Web.Mvc.ValueProviderResult result = new System.Web.Mvc.ValueProviderResult("s", "s", System.Threading.Thread.CurrentThread.CurrentCulture);
        //    System.Web.Mvc.ModelState state = new System.Web.Mvc.ModelState();
        //    state.Value = result;

        //    dropDownList.Name = "dropDownList1";
        //    dropDownList.ViewData.ModelState.Add("dropDownList1", state);
        //    dropDownList.ViewData.ModelState.AddModelError("dropDownList1", "error");

        //    IHtmlNode tag = renderer.Build();

        //    tag.Attribute("class").ShouldContain("input-validation-error");
        //}

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
        public void Build_should_output_input_which_is_hidden_with_style()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("display:none", tag.Attribute("style"));
        }

        [Fact]
        public void Build_should_output_input_with_name()
        {
            dropDownList.Name = "test";

            IHtmlNode tag = renderer.Build();

            Assert.Equal(dropDownList.Id, tag.Attribute("id"));
            Assert.Equal(dropDownList.Name, tag.Attribute("name"));
        }

        //[Fact]
        //public void Build_should_not_add_attr_value_if_no_items() 
        //{
        //    dropDownList.Items.Clear();

        //    IHtmlNode tag = renderer.Build();
        //    Assert.Throws(typeof(System.Collections.Generic.KeyNotFoundException), () => tag.Attribute("value"));
        //}

        //[Fact]
        //public void Build_should_not_add_attr_value_with_selected_item_value()
        //{
        //    dropDownList.Items.Add(new DropDownItem { Text = "Item1", Value = "1" });
        //    dropDownList.Items.Add(new DropDownItem { Text = "Item2", Value = "2" });
        //    dropDownList.SelectedIndex = 0;

        //    IHtmlNode tag = renderer.Build();
        //    Assert.Equal("1", tag.Attribute("value"));
        //}


        //[Fact]
        //public void Build_should_add_attr_value_with_selected_item_text_if_value_is_not_set()
        //{
        //    dropDownList.Items.Add(new DropDownItem { Text = "Item1", Value = "1" });
        //    dropDownList.Items.Add(new DropDownItem { Text = "Item2" });

        //    dropDownList.SelectedIndex = 1;

        //    IHtmlNode tag = renderer.Build();

        //    Assert.Equal("Item2", tag.Attribute("value"));
        //}
        
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