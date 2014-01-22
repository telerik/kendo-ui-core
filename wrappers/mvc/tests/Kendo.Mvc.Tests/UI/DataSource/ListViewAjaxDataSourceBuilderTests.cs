namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;

    public class ListViewAjaxDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly ListViewAjaxDataSourceBuilder<Customer> builder;

        public ListViewAjaxDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new ListViewAjaxDataSourceBuilder<Customer>(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Webapi_should_return_webapi_datasource_builder()
        {
            builder.WebApi().ShouldBeType(typeof(WebApiDataSourceBuilder<Customer>));
        }

        [Fact]
        public void Webapi_should_set_datasource_type()
        {
            builder.WebApi();
            dataSource.Type.ShouldEqual(DataSourceType.WebApi);
        }
    }
}
