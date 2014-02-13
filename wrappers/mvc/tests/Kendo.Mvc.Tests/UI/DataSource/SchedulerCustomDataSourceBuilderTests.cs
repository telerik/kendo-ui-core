namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Tests;
    using System;
    using Xunit;

    public class SchedulerCustomDataSourceBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly SchedulerCustomDataSourceBuilder<Customer> builder;

        public SchedulerCustomDataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new SchedulerCustomDataSourceBuilder<Customer>(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Filter_should_return_webapi_datasource_builder()
        {
            builder.Filter(f => f.Add(m => m.Name).Contains("SomeVal")).ShouldBeType(typeof(SchedulerCustomDataSourceBuilder<Customer>));
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
            Exception ex = Record.Exception(new Assert.ThrowsDelegate(() => { builder.Group(g => g.Add(m => m.Name)); }));

            Assert.IsType(typeof(MethodAccessException), ex);
        }

        [Fact]
        public void Aggregates_should_throw_error()
        {
            Exception ex = Record.Exception(new Assert.ThrowsDelegate(() => { builder.Aggregates(a => a.Add(m => m.Name)); }));

            Assert.IsType(typeof(MethodAccessException), ex);
        }
    }
}
