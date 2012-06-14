namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.IO;
    using System.Linq.Expressions;
    using System.Web.UI;
    using Moq;
    using UI.Tests;
    using UI;
    using Xunit;

    public class ListViewBuilderTests
    {
        private readonly ListView<Customer> listView;
        private readonly ListViewBuilder<Customer> builder;

        public ListViewBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            listView = ListViewTestHelper.CreateListView<Customer>(writer.Object);
            builder = new ListViewBuilder<Customer>(listView);
        }

        [Fact]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<Customer> customers = new[] { new Customer() };
            builder.BindTo(customers);

            Assert.Same(customers, listView.DataSource.Data);
        }

        [Fact]
        public void BindTo_sets_the_data_source_if_non_generic_enumerable_is_assigned()
        {
            var data = new object[0];
            builder.BindTo(data);

            Assert.Same(data, listView.DataSource.Data);
        }

        [Fact]
        public void ClientTemplateId_sets_ListView_client_tempalate_id()
        {           
            builder.ClientTemplateId("foo");

            Assert.Equal("foo", listView.ClientTemplateId);
        }

        [Fact]
        public void Pageable_enables_ListView_pager()
        {
            builder.Pageable();

            Assert.True(listView.Paging.Enabled);
        }  
    }
}