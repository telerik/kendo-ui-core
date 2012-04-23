// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
#if MVC2 || MVC3
namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Moq;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class GridInlineEditRowHtmlBuilderTests
    {
        private readonly Mock<IGridTableBuilder> tableBuilder;
        private readonly Mock<IGridFormBuilder> formBuilder;
        private readonly Mock<IGridDataCellBuilder> dataCellBuilder;
        private GridInLineEditRowBuilder builder;

        public GridInlineEditRowHtmlBuilderTests()
        {
            tableBuilder = new Mock<IGridTableBuilder>();
            tableBuilder.Setup(t => t.CreateTable()).Returns(new HtmlElement("table"));
            
            formBuilder = new Mock<IGridFormBuilder>();
            formBuilder.Setup(t => t.CreateForm()).Returns(new HtmlElement("form"));
            
            dataCellBuilder = new Mock<IGridDataCellBuilder>();
            dataCellBuilder.Setup(t => t.CreateCell(It.IsAny<object>())).Returns(new HtmlElement("td"));
            
            builder = new GridInLineEditRowBuilder(tableBuilder.Object, formBuilder.Object, 0, null, new[] { dataCellBuilder.Object });
        }

        [Fact]
        public void Should_create_td_with_colspan()
        {
            var colspan = 1;

            builder = new GridInLineEditRowBuilder(tableBuilder.Object, formBuilder.Object, colspan, null, new[] { dataCellBuilder.Object });

            var tr = builder.CreateRow();

            var td = tr.Children[0];

            td.Attribute("colspan").ShouldEqual(colspan.ToString());
        }

        [Fact]
        public void Should_set_td_class()
        {
            var tr = builder.CreateRow();

            var td = tr.Children[0];
            td.Attribute("class").ShouldEqual(UIPrimitives.Grid.EditingContainer);
        }

        [Fact]
        public void Should_create_form_inside_td()
        {
            var form = new HtmlElement("form");

            formBuilder.Setup(f => f.CreateForm()).Returns(form);
            
            var tr = builder.CreateRow();

            var td = tr.Children[0];

            td.Children[0].ShouldBeSameAs(form);
        }

        [Fact]
        public void Should_create_table_inside_form()
        {
            var table = new HtmlElement("form");

            tableBuilder.Setup(f => f.CreateTable()).Returns(table);
            
            var td = builder.CreateRow().Children[0];
            
            var form = td.Children[0];
            form.Children[0].ShouldBeSameAs(table);
        }

        [Fact]
        public void Should_create_tr_inside_table()
        {
            var table = builder.CreateRow().Children[0].Children[0].Children[0];

            var tr = table.Children[0];

            tr.TagName.ShouldEqual("tr");
        }

        [Fact]
        public void Should_create_cells_inside_row()
        {
            var td = new HtmlElement("td");
            
            dataCellBuilder.Setup(d => d.CreateCell(It.IsAny<object>())).Returns(td);

            var table = builder.CreateRow().Children[0].Children[0].Children[0];

            var tr = table.Children[0];

            tr.Children[0].ShouldBeSameAs(td);
        }
    }
}
#endif