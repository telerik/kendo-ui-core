namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using Kendo.Mvc.UI.Html;

    public class SliderHtmlBuilderTests
    {
        private readonly Slider<double> slider;
        private readonly SliderHtmlBuilder<double> builder;

        public SliderHtmlBuilderTests()
        {
            slider = SliderTestHelper.CreateSlider<double>(null, null);

            builder = new SliderHtmlBuilder<double>(slider);
        }

        [Fact]
        public void Should_output_input()
        {
            IHtmlNode tag = builder.Build();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void Should_output_slider_css_classes()
        {
            slider.HtmlAttributes.Add("class", "myClass");

            IHtmlNode tag = builder.Build();

            tag.Attribute("class").ShouldContain("myClass");
        }

        [Fact]
        public void Should_output_MinValue_attribute()
        {
            slider.Min = 0;

            IHtmlNode tag = builder.Build();

            slider.Min.ShouldEqual(int.Parse(tag.Attribute("min")));
        }

        [Fact]
        public void Should_output_MaxValue_attribute()
        {
            slider.Max = 10;

            IHtmlNode tag = builder.Build();

            slider.Max.ShouldEqual(int.Parse(tag.Attribute("max")));
        }

        [Fact]
        public void Should_output_value_attribute()
        {
            slider.Value = 2;

            IHtmlNode tag = builder.Build();

            slider.Value.ShouldEqual(int.Parse(tag.Attribute("value")));
        }

        [Fact]
        public void Should_output_html_attributes()
        {
            slider.HtmlAttributes.Add("height", "100px");

            IHtmlNode tag = builder.Build();

            tag.Attribute("height").ShouldEqual("100px");
        }

        [Fact]
        public void Should_output_input_with_name()
        {
            slider.Name = "test";

            IHtmlNode tag = builder.Build();
            tag.Attribute("name").ShouldEqual(slider.Name);
        }
    }
}