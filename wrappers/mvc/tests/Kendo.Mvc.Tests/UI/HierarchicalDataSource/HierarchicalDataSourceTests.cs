namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI;

    public class HierarchicalDataSourceTests
    {
        private readonly HierarchicalDataSource dataSource;        

        public HierarchicalDataSourceTests()
        {
            dataSource = new HierarchicalDataSource();           
        }
        [Fact]
        public void ToJson_transport_is_serialized()
        {
            dataSource.Transport.Read.Url = "url";
            dataSource.ToJson().ContainsKey("transport").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_events_are_not_serialized_if_not_set()
        {
            dataSource.ToJson().ContainsKey("change").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_events_are_serialized_if_set()
        {
            dataSource.Events["change"] = "change";
            dataSource.ToJson().ContainsKey("change").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_schema_is_serialized()
        {
            dataSource.ToJson().ContainsKey("schema").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_model_is_not_serialized_if_not_set()
        {
            var schema = dataSource.ToJson()["schema"] as IDictionary<string, object>;            
            schema.ContainsKey("model").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_model_is_serialized_if_set()
        {
            dataSource.Model.IdMember = "ID";
            var schema = dataSource.ToJson()["schema"] as IDictionary<string, object>;
            schema.ContainsKey("model").ShouldBeTrue();
        }

        [Fact]
        public void ToJson_serverFiltering_is_not_serialized_if_not_set()
        {
            dataSource.ToJson().ContainsKey("serverFiltering").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_serverFiltering_is_serialized_if_set()
        {
            dataSource.ServerFiltering = true;
            dataSource.ToJson().ContainsKey("serverFiltering").ShouldBeTrue();
        }
       
    }
}
