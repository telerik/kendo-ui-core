// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using Infrastructure;
    using Xunit;

    public class GridSortableHeaderCellBuilderTests
    {
        private const string expectedUrl = "url";
        private const string expectedSortedAscText = "sorted asc";
        private const string expectedSortedDescText = "sorted desc";

        [Fact]
        public void Should_add_link()
        {
            var builder = CreateSortableHeaderCellBuilder();

            var cell = builder.CreateCell();

            var link = GetLink(cell);

            link.Children.Count.ShouldEqual(1);
            link.TagName.ShouldEqual("a");
            link.Attribute("class").ShouldEqual("t-link");
            link.Attribute("href").ShouldEqual(expectedUrl);
        }

        [Fact]
        public void Should_exectute_callback()
        {
            var called = false;

            Action<IHtmlNode> callback = node => called = true;

            var builder = CreateSortableHeaderCellBuilder(callback);

            builder.CreateCell();

            called.ShouldBeTrue();
        }

        [Fact]
        public void Should_create_ascending_sort_icon()
        {
            var builder = CreateSortableHeaderCellBuilder(ListSortDirection.Ascending);

            var cell = builder.CreateCell();

            var arrow = GetArrow(cell);

            arrow.Attribute("class").ShouldEqual("t-icon t-arrow-up");
            arrow.InnerHtml.ShouldEqual("(" + expectedSortedAscText + ")");
        }

        [Fact]
        public void Should_create_descending_sort_icon()
        {
            var builder = CreateSortableHeaderCellBuilder(ListSortDirection.Descending);

            var cell = builder.CreateCell();
            var arrow = GetArrow(cell);
            arrow.Attribute("class").ShouldEqual("t-icon t-arrow-down");
            arrow.InnerHtml.ShouldEqual("(" + expectedSortedDescText + ")");
        }

        [Fact]
        public void Should_place_sort_icon_after_text()
        {
            var text = new HtmlElement("b");

            Action<IHtmlNode> appendContent = node => text.AppendTo(node);
            var builder = CreateSortableHeaderCellBuilder(ListSortDirection.Ascending, appendContent);

            var cell = builder.CreateCell();

            var link = GetLink(cell);
            link.Children[0].ShouldBeSameAs(text);
            link.Children[1].TagName.ShouldEqual("span");
        }

        private IHtmlNode GetArrow(IHtmlNode cell)
        {
            return GetLink(cell).Children[0];
        }

        private IHtmlNode GetLink(IHtmlNode cell)
        {
            return cell.Children[0];
        }

        private GridSortableHeaderCellBuilder CreateSortableHeaderCellBuilder()
        {
            return CreateSortableHeaderCellBuilder(ListSortDirection.Ascending);
        }

        private GridSortableHeaderCellBuilder CreateSortableHeaderCellBuilder(ListSortDirection? sortDirection)
        {
            return CreateSortableHeaderCellBuilder(sortDirection, delegate { });
        }

        private GridSortableHeaderCellBuilder CreateSortableHeaderCellBuilder(Action<IHtmlNode> appendContent)
        {
            return CreateSortableHeaderCellBuilder(null, appendContent);
        }
        private GridSortableHeaderCellBuilder CreateSortableHeaderCellBuilder(ListSortDirection? sortDirection, Action<IHtmlNode> appendContent)
        {
            var htmlAttributes = new Dictionary<string, object>();
            return new GridSortableHeaderCellBuilder(htmlAttributes, expectedUrl, sortDirection, expectedSortedAscText, expectedSortedDescText, appendContent);
        }
    }
}