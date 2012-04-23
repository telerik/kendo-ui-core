// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System;
    using UI.Tests;
    using Xunit;

    public class GridDetailRowBuilderTests
    {
        private readonly GridDetailRowBuilder builder;

        public GridDetailRowBuilderTests()
        {
            builder = new GridDetailRowBuilder();
        }

        [Fact]
        public void Should_create_tr()
        {
            builder.CreateRow().TagName.ShouldEqual("tr");
        }

        [Fact]
        public void Should_set_details_class()
        {
            builder.CreateRow().Attribute("class").ShouldContain("t-detail-row");
        }

        [Fact]
        public void Should_set_alternate_class_if_master_is_alternate()
        {
            builder.IsMasterAlternate = true;
            builder.CreateRow().Attribute("class").ShouldContain(UIPrimitives.Alt);
        }

        [Fact]
        public void Should_create_cell()
        {
            var tr = builder.CreateRow();
            var cell = tr.Children[0];
            cell.TagName.ShouldEqual("td");
            cell.Attribute("class").ShouldContain("t-detail-cell");
        }

        [Fact]
        public void Should_apply_colspan()
        {
            builder.Colspan = 3;

            var tr = builder.CreateRow();
            var cell = tr.Children[0];
            cell.Attribute("colspan").ShouldEqual(builder.Colspan.ToString());
        }

        [Fact]
        public void Should_set_template_to_null_when_template_is_not_specified()
        {
            var tr = builder.CreateRow();
            var cell = tr.Children[0];
            cell.Template().ShouldBeNull();
        }

        [Fact]
        public void Should_pass_data_item()
        {
            object dataItem = new Customer();
            object result = null;
            Action<object, IHtmlNode> templateEvaluator = (data, node) => { result = data; };

            builder.DataItem = dataItem;
            builder.Template = templateEvaluator;

            builder.CreateRow();
            result.ShouldEqual(dataItem);
        }

        [Fact]
        public void Should_apply_html_attributes()
        {
            const string attributeName = "foo";
            const string value = "bar";

            builder.HtmlAttributes.Add(attributeName, value);

            builder.CreateRow().Attribute(attributeName).ShouldEqual(value);
        }

        [Fact]
        public void Should_prefer_html_to_template()
        {
            builder.Template = (o, node) => { };
            builder.Html = "foo";

            var tr = builder.CreateRow();
            var cell = tr.Children[0];

            cell.Template().ShouldBeNull();
            cell.InnerHtml.ShouldEqual("foo");
        }

        [Fact]
        public void Should_hide_the_row_if_not_expanded()
        {
            var tr = builder.CreateRow();
            tr.Attribute("style").ShouldContain("display:none");
        }

        [Fact]
        public void Should_show_the_row_if_expanded()
        {
            builder.Expanded = true;

            builder.CreateRow().Attributes().ContainsKey("style").ShouldBeFalse();
        }
        
    }
}