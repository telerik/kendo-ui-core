namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System.IO;
    using System.Linq;
    using Moq;
    using Telerik.Web.Mvc.Infrastructure;
    using UI;
    using Xunit;

    public class GridRenderingTests
    {
        private readonly Grid<Customer> grid;
        private readonly Mock<IGridHtmlBuilder<Customer>> builder;
        private readonly Mock<IClientSideObjectWriter> objectWriter;
        private readonly Customer customer;

        public GridRenderingTests()
        {
            var virtualPathProvider = new Mock<IVirtualPathProvider>();
            virtualPathProvider.Setup(vpp => vpp.FileExists(It.IsAny<string>())).Returns(false);

            var serviceLocator = new Mock<IServiceLocator>();
            serviceLocator.Setup(sl => sl.Resolve<IVirtualPathProvider>()).Returns(virtualPathProvider.Object);

            ServiceLocator.SetCurrent(() => serviceLocator.Object);

            builder = new Mock<IGridHtmlBuilder<Customer>>();

            builder.Setup(r => r.GridTag()).Returns(() => new HtmlTag("div"));
            builder.Setup(r => r.TableTag()).Returns(() => new HtmlTag("table"));
            builder.Setup(r => r.BodyTag(It.IsAny<IHtmlNode>())).Returns(() => new HtmlTag("tbody"));
            builder.Setup(r => r.HeadTag(It.IsAny<IHtmlNode>())).Returns(() => new HtmlTag("thead"));
            builder.Setup(r => r.HeadCellTag(It.IsAny<GridColumnBase<Customer>>())).Returns(() => new HtmlTag("th"));
            builder.Setup(r => r.FootCellTag()).Returns(() => new HtmlTag("td"));
            builder.Setup(r => r.FootTag(It.IsAny<IHtmlNode>())).Returns(() => new HtmlTag("tfoot"));
            builder.Setup(r => r.RowTag()).Returns(() => new HtmlTag("tr"));
            builder.Setup(r => r.LoadingIndicatorTag()).Returns(() => new HtmlTag("div"));
            builder.Setup(r => r.PagerStatusTag()).Returns(() => new HtmlTag("div"));
            builder.Setup(r => r.PagerTag()).Returns(() => new HtmlTag("div"));
            builder.Setup(r => r.RowTag(It.IsAny<GridRow<Customer>>())).Returns(() => new HtmlTag("td"));
            builder.Setup(r => r.CellTag(It.IsAny<GridCell<Customer>>())).Returns(() => new HtmlTag("td"));
            
            objectWriter = new Mock<IClientSideObjectWriter>();
            grid = GridTestHelper.CreateGrid(null, builder.Object, objectWriter.Object);

            customer = new Customer { Id = 1, Name = "John Doe" };
            grid.DataSource = new[] { customer };

            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));
            grid.Columns.Add(new GridBoundColumn<Customer, string>(grid, c => c.Name));
        }

        [Fact]
        public void Render_should_output_as_many_rows_as_items_in_datasource()
        {
            builder.Setup(r => r.RowTag(It.IsAny<GridRow<Customer>>())).Returns(() => new HtmlTag("tr"));

            grid.Render();

            builder.Verify(r => r.RowTag(It.IsAny<GridRow<Customer>>()), Times.Exactly(grid.DataSource.Count()));
        }

        [Fact]
        public void Render_calls_pager()
        {
            builder.Setup(r => r.PagerTag()).Returns(() => new HtmlTag("div"));
            grid.Paging.Enabled = true;

            grid.Render();

            builder.Verify(r => r.PagerTag());
        }

        [Fact]
        public void Render_calls_page_twice_if_pager_position_set_to_both()
        {
            builder.Setup(r => r.PagerTag()).Returns(() => new HtmlTag("div"));
            grid.Paging.Enabled = true;
            grid.Paging.Position = GridPagerPosition.Both;

            grid.Render();

            builder.Verify(r => r.PagerTag(), Times.Exactly(2));
        }

        [Fact]
        public void Should_start_grid()
        {
            builder.Setup(r => r.GridTag()).Returns(new HtmlTag("div"));

            grid.Render();

            builder.Verify(r => r.GridTag());
        }

        [Fact]
        public void Render_calls_start_end_table()
        {
            builder.Setup(r => r.TableTag()).Returns(() => new HtmlTag("table"));

            grid.Render();

            builder.Verify(r => r.TableTag());
        }

        [Fact]
        public void Render_calls_start_end_tablehead()
        {
            builder.Setup(r => r.HeadTag(It.IsAny<IHtmlNode>())).Returns(() => new HtmlTag("thead"));

            grid.Render();

            builder.Verify(r => r.HeadTag(It.IsAny<IHtmlNode>()));
        }

        [Fact]
        public void Render_calls_start_end_tablefooter()
        {
            builder.Setup(r => r.FootTag(It.IsAny<IHtmlNode>())).Returns(() => new HtmlTag("tfoot"));

            grid.Paging.Enabled = true;
            grid.Render();

            builder.Verify(r => r.FootTag(It.IsAny<IHtmlNode>()));
        }

        [Fact]
        public void Footer_not_rendered()
        {
            builder.Setup(r => r.FootTag(It.IsAny<IHtmlNode>()));
            grid.Footer = false;
            
            grid.Render();

            builder.Verify(r => r.FootTag(It.IsAny<IHtmlNode>()), Times.Never());
        }

        [Fact]
        public void Render_calls_body_start_end()
        {
            builder.Setup(r => r.BodyTag(It.IsAny<IHtmlNode>())).Returns(() => new HtmlTag("tbody"));

            grid.Render();

            builder.Verify(r => r.BodyTag(It.IsAny<IHtmlNode>()));
        }

        [Fact]
        public void Render_calls_cell_start_end_contents()
        {
            builder.Setup(r => r.CellTag(It.IsAny<GridCell<Customer>>())).Returns(() => new HtmlTag("td"));

            grid.Render();

            builder.Verify(r => r.CellTag(It.IsAny<GridCell<Customer>>()));
		}

		[Fact]
		public void Render_calls_loadingindicator_if_pager_is_enabled()
		{
			grid.Paging.Enabled = true;

            builder.Setup(r => r.LoadingIndicatorTag()).Returns(() => new HtmlTag("div"));

			grid.Render();

            builder.Verify(r => r.LoadingIndicatorTag());
		}

        [Fact]
        public void Write_initialization_script_outputs_grid_component()
        {
            objectWriter.Setup(s => s.Start()).Verifiable();
            objectWriter.Setup(s => s.Complete()).Verifiable();

            grid.WriteInitializationScript(new Mock<TextWriter>().Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void Write_initialization_script_outputs_paging_info()
        {
            grid.Paging.Enabled = true;

            objectWriter.Setup(w => w.Append("pageSize", 10, 10)).Verifiable();
            
            grid.WriteInitializationScript(new Mock<TextWriter>().Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void Write_initialization_script_does_not_output_paging_info_if_pager_is_disabled()
        {
            grid.Paging.Enabled = false;

            objectWriter.Setup(w => w.Append("pageSize", It.IsAny<int>(), It.IsAny<int>()));

            grid.WriteInitializationScript(new Mock<TextWriter>().Object);

            objectWriter.Verify(w => w.Append("pageSize", It.IsAny<int>(), It.IsAny<int>()), Times.Never());

        }

        [Fact]
        public void Write_initialization_script_does_not_output_query_string_parameter_names_if_prefixing_is_disabled()
        {
            grid.PrefixUrlParameters = false;

            objectWriter.Setup(w => w.AppendObject("queryString", It.IsAny<object>()));

            grid.WriteInitializationScript(new Mock<TextWriter>().Object);

            objectWriter.Verify(w => w.AppendObject("queryString", It.IsAny<object>()), Times.Never());
        }
    
    }
}