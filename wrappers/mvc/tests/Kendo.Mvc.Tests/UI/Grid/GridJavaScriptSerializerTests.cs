namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System.Collections.Generic;
    using Xunit;

    public class GridJavaScriptSerializerTests
    {
        private Mock<IClientSideObjectWriter> writer = new Mock<IClientSideObjectWriter>();

        public GridJavaScriptSerializerTests()
        {
        }

        [Fact]
        public void Should_serialize_columns()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));

            writer.Setup(w => w.AppendCollection("columns", It.IsAny<IEnumerable<IDictionary<string, object>>>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);

            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_columns_if_empty()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.AppendCollection("columns", It.IsAny<IEnumerable<IDictionary<string, object>>>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);

            serializer.Serialize(writer.Object);

            writer.Verify(w => w.AppendCollection("columns", It.IsAny<IEnumerable<IDictionary<string, object>>>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_editing()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Ajax.Enabled = true;
            grid.Editing.Enabled = true;
            grid.Editing.DisplayDeleteConfirmation = false;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));

            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));

            writer.Setup(w => w.AppendObject("editing", It.IsAny<object>()));
            writer.Setup(w => w.AppendObject("dataKeys", It.IsAny<object>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);

            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_editing_if_not_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.AppendObject("editing", It.IsAny<object>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);

            serializer.Serialize(writer.Object);

            writer.Verify(w => w.AppendObject("editing", It.IsAny<object>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_groups()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;
            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));

            ((IGridBindingContext)grid).GroupDescriptors.Add(new GroupDescriptor
            {
                Member = "Id"
            });

            writer.Setup(w => w.AppendCollection("groups", It.IsAny<IEnumerable<IDictionary<string, object>>>()));
            writer.Setup(w => w.Append("groupBy", It.IsAny<string>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);

            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_groups_if_no_groups_defined()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;
            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));

            writer.Setup(w => w.AppendCollection("groups", It.IsAny<IEnumerable<IDictionary<string, object>>>()));
            writer.Setup(w => w.Append("groupBy", It.IsAny<string>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);

            serializer.Serialize(writer.Object);

            writer.Verify(w => w.AppendCollection("groups", It.IsAny<IEnumerable<IDictionary<string, object>>>()), Times.Never());
            writer.Verify(w => w.Append("groupBy", It.IsAny<string>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_plugins()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;

            writer.Setup(w => w.AppendCollection("plugins", It.IsAny<IEnumerable<string>>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_plugins_if_none_are_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.AppendCollection("plugins", It.IsAny<IEnumerable<string>>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.AppendCollection("plugins", It.IsAny<IEnumerable<string>>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_format_if_filtering_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            grid.Filtering.Enabled = true;

            writer.Setup(w => w.Append("urlFormat", It.IsAny<string>()));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_serialize_or_filtering_option_if_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            grid.Filtering.Enabled = true;
            grid.Filtering.ShowOrOption = true;

            writer.Setup(w => w.Append("showOrOption", true, false));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_or_filtering_option_if_filtering_is_disabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            grid.Filtering.Enabled = false;
            grid.Filtering.ShowOrOption = true;            

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("showOrOption", It.IsAny<bool>(), It.IsAny<bool>()), Times.Never());
        }     

        [Fact]
        public void Should_serialize_format_if_grouping_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            grid.Grouping.Enabled = true;

            writer.Setup(w => w.Append("urlFormat", It.IsAny<string>()));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_format_in_client_binding()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;
            grid.Ajax.Enabled = true;

            writer.Setup(w => w.Append("urlFormat", It.IsAny<string>()));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("urlFormat", It.IsAny<string>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_paging()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Paging.Enabled = true;

            writer.Setup(w => w.Append("total", It.IsAny<int>()));
            writer.Setup(w => w.Append("currentPage", It.IsAny<int>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_paging_if_not_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.Append("currentPage", It.IsAny<int>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("currentPage", It.IsAny<int>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_page_size_0_if_paging_is_not_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.Append("pageSize", 0));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_serialize_sort_order()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Sorting.Enabled = true;
            grid.Sorting.SortMode = GridSortMode.MultipleColumn;
            grid.Sorting.AllowUnsort = false;

            writer.Setup(w => w.Append("sortMode", "multi"));
            writer.Setup(w => w.Append("orderBy", It.IsAny<string>()));
            writer.Setup(w => w.Append("allowUnsort", false));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("sortMode", "multi"));
            writer.Verify(w => w.Append("orderBy", It.IsAny<string>()), Times.Never());
            writer.Verify(w => w.Append("allowUnsort", false));
        }

        [Fact]
        public void Should_not_serialize_sort_order_if_sorting_is_disabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.Append("sortMode", It.IsAny<string>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("sortMode", It.IsAny<string>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_order_by()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Sorting.Enabled = true;
            grid.DataProcessor.SortDescriptors.Add(new SortDescriptor
            {
                Member = "Id"
            });

            writer.Setup(w => w.Append("orderBy", It.IsAny<string>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_serialize_selection()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Selection.Enabled = true;

            writer.Setup(w => w.Append("selectable", true));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_selection_if_not_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.Append("selectable", It.IsAny<bool>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("selectable", It.IsAny<bool>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_ajax()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Ajax.Enabled = true;

            writer.Setup(w => w.AppendObject("ajax", It.IsAny<IDictionary<string, string>>()));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }
        [Fact]
        public void Should_serialize_web_service()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.WebService.Enabled = true;

            writer.Setup(w => w.AppendObject("ws", It.IsAny<IDictionary<string, string>>()));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_ws_if_not_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.AppendObject("ws", It.IsAny<IDictionary<string, string>>()));
            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.AppendObject("ws", It.IsAny<IDictionary<string, string>>()), Times.Never());
        }

        [Fact]
        public void Should_not_serialize_ajax_if_not_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.AppendObject("ajax", It.IsAny<IDictionary<string, string>>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.AppendObject("ajax", It.IsAny<IDictionary<string, string>>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_client_events()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.ClientEvents.OnDataBinding.CodeBlock = grid.ClientEvents.OnDataBound.CodeBlock =
                grid.ClientEvents.OnError.CodeBlock = grid.ClientEvents.OnLoad.CodeBlock =
                grid.ClientEvents.OnRowDataBound.CodeBlock = grid.ClientEvents.OnRowSelect.CodeBlock = () => { };

            writer.Setup(w => w.AppendClientEvent("onLoad", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onDataBinding", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onRowDataBound", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onRowSelect", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onDataBound", It.IsAny<ClientEvent>()));
            writer.Setup(w => w.AppendClientEvent("onError", It.IsAny<ClientEvent>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }

        [Fact]
        public void Should_not_serialize_pageOnScroll_if_paging_disabled() 
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            writer.Setup(w => w.Append("pageOnScroll", It.IsAny<bool>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.Verify(w => w.Append("pageOnScroll", It.IsAny<bool>()), Times.Never());
        }

        [Fact]
        public void Should_serialize_pageOnScroll_if_paging_enabled()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Paging.Enabled = true;

            writer.Setup(w => w.Append("pageOnScroll", It.IsAny<bool>()));

            var serializer = new GridClientObjectSerializer<Customer>(grid);
            serializer.Serialize(writer.Object);

            writer.VerifyAll();
        }
    }
}
