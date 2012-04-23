

namespace KendoUI.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class GridFormBuilderTests
    {
        private readonly GridFormBuilder builder;
        private readonly IDictionary<string, object> htmlAttributes;

        public GridFormBuilderTests()
        {
            htmlAttributes = new Dictionary<string, object>();
            builder = new GridFormBuilder(htmlAttributes);
        }

        [Fact]
        public void Should_return_form()
        {
            var form = builder.CreateForm();

            form.TagName.ShouldEqual("form");
        }
        
        [Fact]
        public void Should_set_method_to_post()
        {
            var form = builder.CreateForm();

            form.Attribute("method").ShouldEqual("post");
        }
        
        [Fact]
        public void Should_apply_html_attributes()
        {
            htmlAttributes["foo"] = "bar";

            var form = builder.CreateForm();

            form.Attribute("foo").ShouldEqual("bar");
        }
    }
}
