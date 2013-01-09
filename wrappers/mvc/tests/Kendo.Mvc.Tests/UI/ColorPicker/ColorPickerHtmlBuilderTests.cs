namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Html;
    using Xunit;

    public class ColorPickerHtmlBuilderTests
    {
        private ColorPickerHtmlBuilder renderer;
        private ColorPicker colorpicker;

        public ColorPickerHtmlBuilderTests()
        {
            colorpicker = ColorPickerTestHelper.CreateColorPicker();
            colorpicker.Name = "ColorPicker";

            renderer = new ColorPickerHtmlBuilder(colorpicker);
        }

        [Fact]
        public void Build_renders_input_tag()
        {
            IHtmlNode tag = renderer.Build();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void Build_renders_input_with_type_color()
        {
            IHtmlNode tag = renderer.Build();

            tag.Attribute("type").ShouldEqual("color");
        }

        [Fact]
        public void Build_renders_input_with_no_type_when_opacity_is_set()
        {
            colorpicker.Opacity = true;

            IHtmlNode tag = renderer.Build();

            tag.Attributes().Keys.ShouldNotContain("type");
        }
    }
}