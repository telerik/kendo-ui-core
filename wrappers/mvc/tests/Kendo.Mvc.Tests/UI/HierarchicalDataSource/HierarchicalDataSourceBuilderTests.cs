namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;

    public class HierarchicalDataSourceBuilderTests
    {
        private readonly HierarchicalDataSource dataSource;
        private readonly HierarchicalDataSourceBuilder builder;        

        public HierarchicalDataSourceBuilderTests()
        {
            dataSource = new HierarchicalDataSource();
            builder = new HierarchicalDataSourceBuilder(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Read_should_return_builder()
        {
            builder.Read(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_should_configure_read_options()
        {
            builder.Read(read => read.Url("url"));
            dataSource.Transport.Read.Url.ShouldEqual("url");
        }

        [Fact]
        public void Read_action_controller_values_should_return_builder()
        {
            builder.Read("action", "controller", new { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_action_controller_values_should_configure_read_options()
        {
            var routeValues = new { foo = 1 };
            builder.Read("action", "controller", routeValues);
            dataSource.Transport.Read.ActionName.ShouldEqual("action");
            dataSource.Transport.Read.ControllerName.ShouldEqual("controller");
            dataSource.Transport.Read.RouteValues["foo"].ShouldEqual(1);
        }

        [Fact]
        public void Read_action_controller_should_return_builder()
        {
            builder.Read("action", "controller").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_action_controller_should_configure_read_options()
        {
            builder.Read("action", "controller");
            dataSource.Transport.Read.ActionName.ShouldEqual("action");
            dataSource.Transport.Read.ControllerName.ShouldEqual("controller");
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
        public void ServerFiltering_should_return_builder()
        {
            builder.ServerFiltering().ShouldBeSameAs(builder);
        }

        [Fact]
        public void ServerFiltering_should_set_ServerFiltering_to_true()
        {
            builder.ServerFiltering();
            dataSource.ServerFiltering.ShouldBeTrue();
        }

        [Fact]
        public void ServerFiltering_with_value_should_return_builder()
        {
            builder.ServerFiltering(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void ServerFiltering_with_value_should_set_ServerFiltering()
        {
            builder.ServerFiltering(true);
            dataSource.ServerFiltering.ShouldBeTrue();
        }

        [Fact]
        public void Model_should_return_builder()
        {
            builder.Model(m => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Model_should_configure_model_options()
        {
            builder.Model(model => model.Id("ID"));
            dataSource.Model.IdMember.ShouldEqual("ID");
        }
    }
}
