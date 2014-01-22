namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;

    public class SchedulerAjaxDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly SchedulerAjaxDataSourceBuilder<Customer> builder;

        public SchedulerAjaxDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new SchedulerAjaxDataSourceBuilder<Customer>(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Webapi_should_return_webapi_datasource_builder()
        {
            builder.WebApi().ShouldBeType(typeof(SchedulerWebApiDataSourceBuilder<Customer>));
        }

        [Fact]
        public void Webapi_should_set_datasource_type()
        {
            builder.WebApi();
            dataSource.Type.ShouldEqual(DataSourceType.WebApi);
        }

        [Fact]
        public void Filter_should_return_webapi_datasource_builder()
        {
            builder.Filter(f => f.Add(m => m.Name).Contains("SomeVal")).ShouldBeType(typeof(SchedulerAjaxDataSourceBuilder<Customer>));
        }


        [Fact]
        public void Sort_should_throw_error()
        {
            Exception ex = Record.Exception(new Assert.ThrowsDelegate(() => { builder.Sort(s => s.Add(m => m.Name)); }));

            Assert.IsType(typeof(MethodAccessException), ex);
        }

        [Fact]
        public void Group_should_throw_error()
        {
            Exception ex = Record.Exception(new Assert.ThrowsDelegate(() => { builder.Group(s => s.Add(m => m.Name)); }));

            Assert.IsType(typeof(MethodAccessException), ex);
        }

        [Fact]
        public void Aggregates_should_throw_error()
        {
            Exception ex = Record.Exception(new Assert.ThrowsDelegate(() => { builder.Aggregates(s => s.Add(m => m.Name)); }));

            Assert.IsType(typeof(MethodAccessException), ex);
        }
    }
}
