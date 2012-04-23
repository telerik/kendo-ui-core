// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;
    using Telerik.Web.Mvc.UI.Html;
    using System.Web.Routing;

    public class SliderHtmlBuilderTests
    {

        private SliderRenderingData renderingData;
        private SliderHtmlBuilder builder;

        public SliderHtmlBuilderTests()
        {
            renderingData = new SliderRenderingData {
                HtmlAttributes = new RouteValueDictionary(),
                Enabled = true
            };

            builder = new SliderHtmlBuilder(renderingData);
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
            renderingData.HtmlAttributes.Add("class", "myClass");

            IHtmlNode tag = builder.Build();

            tag.Attribute("class").ShouldContain("myClass");
        }

        [Fact]
        public void Should_output_MinValue_attribute()
        {
            renderingData.MinValue = 0;

            IHtmlNode tag = builder.Build();

            renderingData.MinValue.ShouldEqual(int.Parse(tag.Attribute("min")));
        }

        [Fact]
        public void Should_output_MaxValue_attribute()
        {
            renderingData.MaxValue = 10;

            IHtmlNode tag = builder.Build();

            renderingData.MaxValue.ShouldEqual(int.Parse(tag.Attribute("max")));
        }

        [Fact]
        public void Should_output_value_attribute()
        {
            renderingData.Value = "2";

            IHtmlNode tag = builder.Build();

            renderingData.Value.ShouldEqual(tag.Attribute("value"));
        }

        [Fact]
        public void Should_output_id_attribute()
        {
            renderingData.Id = "Slider";

            IHtmlNode tag = builder.Build();

            tag.Attribute("id").ShouldEqual(renderingData.Id);
        }

        [Fact]
        public void Should_output_html_attributes()
        {
            renderingData.HtmlAttributes.Add("height", "100px");

            IHtmlNode tag = builder.Build();

            tag.Attribute("height").ShouldEqual("100px");
        }

        [Fact]
        public void Should_output_input_with_name()
        {
            renderingData.Name = "test";

            IHtmlNode tag = builder.Build();
            tag.Attribute("name").ShouldEqual(renderingData.Name);
        }

        [Fact]
        public void Should_output_disabled_input()
        {
            renderingData.Enabled = false;

            IHtmlNode div = builder.Build();

            div.Attribute("class").ShouldContain("t-state-disabled");
        }
    }
}