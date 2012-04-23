// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
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
