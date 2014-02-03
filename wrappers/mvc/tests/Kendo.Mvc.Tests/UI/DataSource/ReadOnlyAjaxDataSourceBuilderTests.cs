namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;

    public class ReadOnlyAjaxDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly ReadOnlyAjaxDataSourceBuilder<Customer> builder;

        public ReadOnlyAjaxDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new ReadOnlyAjaxDataSourceBuilder<Customer>(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Webapi_should_return_readonly_webapi_datasource_builder()
        {
            builder.WebApi().ShouldBeType(typeof(ReadOnlyWebApiDataSourceBuilder<Customer>));
        }
    }
}
