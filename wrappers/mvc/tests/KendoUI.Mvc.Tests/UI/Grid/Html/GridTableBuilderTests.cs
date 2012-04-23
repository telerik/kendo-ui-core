// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Web.Mvc;
    using System.Linq;
    using Xunit;

    public class GridTableBuilderTests
    {
        [Fact]
        public void Should_create_table()
        {
            var builder = new GridTableBuilder(new GridColData[0]);

            builder.CreateTable().TagName.ShouldEqual("table");
        }

        [Fact]
        public void Should_not_create_col_for_hidden_column()
        {
            var colData = new[] {new GridColData {Hidden = true}};
            var builder = new GridTableBuilder(colData);

            var table = builder.CreateTable();
            var colGroup = table.Children[0];
            var col = colGroup.Children;

            col.ShouldBeEmpty();
        }

        [Fact]
        public void Should_create_col_for_every_col_data()
        {
            const int colElementsCount = 10;
            var colData = Enumerable.Repeat(new GridColData(), colElementsCount);

            var builder = new GridTableBuilder(colData);

            var table = builder.CreateTable();
            var colGroup = table.Children[0];

            colGroup.Children.Count.ShouldEqual(colElementsCount);
        }

        [Fact]
        public void Should_set_width_to_col_if_not_hidden()
        {
            const string width = "42";

            var colData = new[] { new GridColData { Width = width} };
            var builder = new GridTableBuilder(colData);

            var table = builder.CreateTable();
            var colGroup = table.Children[0];
            var col = colGroup.Children[0];

            col.Attribute("style").ShouldContain("width:" + width);
        }

        [Fact]
        public void Should_set_selfclosing_to_col()
        {
            var colData = new[] { new GridColData() };
            var builder = new GridTableBuilder(colData);

            var table = builder.CreateTable();
            var colGroup = table.Children[0];
            var col = colGroup.Children[0];

            col.RenderMode.ShouldEqual(TagRenderMode.SelfClosing);
        }
    }
}