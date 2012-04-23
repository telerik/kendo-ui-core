// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using Infrastructure;
    using Infrastructure.Implementation;
    using Xunit;

    public class GridFooterCellBuilderTests
    {
        private readonly GridFooterCellBuilder builder;

        public GridFooterCellBuilderTests()
        {
            builder = new GridFooterCellBuilder(new Dictionary<string, object>(), new HtmlTemplate<GridAggregateResult>());
        }

        [Fact]
        public void Should_return_not_null_html_node()
        {
            builder.CreateCell().ShouldNotBeNull();
        }

        [Fact]
        public void Should_return_html_node_with_tag_name()
        {
            builder.CreateCell().TagName.ShouldEqual("td");
        }

        [Fact]
        public void Should_render_nbsp_if_no_footer_template()
        {
            builder.CreateCell().InnerHtml.ShouldEqual("&nbsp;");
        }

        [Fact]
        public void Should_apply_header_html_attributes()
        {
            const string key = "foo";
            const string value = "bar";

            var footerAttributes = new Dictionary<string, object> {{key, value}};

            var cell = new GridFooterCellBuilder(footerAttributes, new HtmlTemplate<GridAggregateResult>()).CreateCell();

            cell.Attribute(key).ShouldEqual(value);
        }

        [Fact]
        public void Should_render_column_footer_template_if_declared()
        {
            const string expectedContent = "template content";

            var template = new HtmlTemplate<GridAggregateResult>
                               {
                                   Html = expectedContent
                               };

            var cell = new GridFooterCellBuilder(new Dictionary<string, object>(), template).CreateCell();
            
            cell.InnerHtml.ShouldEqual(expectedContent);
        }

        [Fact]
        public void Should_pass_aggregate_result_to_template_if_exists()
        {
            var expectedResult = new GridAggregateResult(new AggregateResult[0]);

            GridAggregateResult result = null;
            var template = new HtmlTemplate<GridAggregateResult>
            {
                InlineTemplate = arg => result = arg
            };

            var cellBuilder = new GridFooterCellBuilder(new Dictionary<string, object>(), template)
            {
                AggregateResults = expectedResult
            };

            cellBuilder.CreateCell().ToString();

            result.ShouldBeSameAs(expectedResult);
        }
    }
}