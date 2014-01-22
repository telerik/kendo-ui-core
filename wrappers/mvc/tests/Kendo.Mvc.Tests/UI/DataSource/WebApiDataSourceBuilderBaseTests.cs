namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;

    public class WebApiDataSourceBuilderBaseTests
    {
        private readonly DataSource dataSource;
        private readonly WebApiDataSourceBuilderBaseTestDouble<Customer> builder;

        public WebApiDataSourceBuilderBaseTests()
        {
            dataSource = new DataSource();
            builder = new WebApiDataSourceBuilderBaseTestDouble<Customer>(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }


        [Fact]
        public void Events_should_return_builder()
        {
            builder.Events(e => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Events_should_configure_the_events()
        {
            builder.Events(e => e.Change("change"));
            dataSource.Events.ContainsKey("change").ShouldBeTrue();
        }

        [Fact]
        public void Read_should_return_builder()
        {
            builder.Read(e => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_should_configure_read_options()
        {
            builder.Read(read => read.Url("url"));
            dataSource.Transport.Read.Url.ShouldEqual("url");
        }

        [Fact]
        public void Read_string_overload_should_configure_read_options()
        {
            builder.Read("url");
            dataSource.Transport.Read.Url.ShouldEqual("url");
        }

        [Fact]
        public void Model_should_return_builder()
        {
            builder.Model(m => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void ServerOperation_should_return_builder()
        {
            builder.ServerOperation(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void ServerOperation_should_set_ServerPaging()
        {
            builder.ServerOperation(true);
            dataSource.ServerPaging.ShouldBeTrue();
        }

        [Fact]
        public void ServerOperation_should_set_ServerFiltering()
        {
            builder.ServerOperation(true);
            dataSource.ServerFiltering.ShouldBeTrue();
        }

        [Fact]
        public void ServerOperation_should_set_ServerAggregates()
        {
            builder.ServerOperation(true);
            dataSource.ServerAggregates.ShouldBeTrue();
        }

        [Fact]
        public void ServerOperation_should_set_ServerSorting()
        {
            builder.ServerOperation(true);
            dataSource.ServerSorting.ShouldBeTrue();
        }

        [Fact]
        public void ServerOperation_should_set_ServerGrouping()
        {
            builder.ServerOperation(true);
            dataSource.ServerGrouping.ShouldBeTrue();
        }

        [Fact]
        public void PageSize_should_return_builder()
        {
            builder.PageSize(5).ShouldBeSameAs(builder);
        }

        [Fact]
        public void PageSize_should_set_pagesize()
        {
            builder.PageSize(5);
            dataSource.PageSize.ShouldEqual(5);
        }

        [Fact]
        public void Total_should_return_builder()
        {
            builder.Total(5).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Total_should_set_pagesize()
        {
            builder.Total(5);
            dataSource.Total.ShouldEqual(5);
        }
    }
}
