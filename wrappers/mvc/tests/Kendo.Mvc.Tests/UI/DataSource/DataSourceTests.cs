namespace Kendo.Mvc.Tests
{
    using Xunit;
    using Kendo.Mvc.UI;
    using System.Linq;
    using System.Collections.Generic;

    public class DataSourceTests
    {
        private DataSource dataSource;

        public DataSourceTests()
        {
            dataSource = new DataSource();            
        }

        [Fact]
        public void ToJson_serverPaging_is_serialized_if_set()
        {
            dataSource.ServerPaging = true;

            var result = dataSource.ToJson();
            ((bool)result["serverPaging"]).ShouldBeTrue();
        }

        [Fact]
        public void ToJson_serverPaging_is_not_serialized_if_not_set()
        {
            dataSource.ServerPaging = false;

            var result = dataSource.ToJson();
            result.ContainsKey("serverPaging").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_serverSorting_is_serialized_if_set()
        {
            dataSource.ServerSorting = true;

            var result = dataSource.ToJson();
            ((bool)result["serverSorting"]).ShouldBeTrue();
        }

        [Fact]
        public void ToJson_serverSorting_is_not_serialized_if_not_set()
        {
            dataSource.ServerSorting = false;

            var result = dataSource.ToJson();
            result.ContainsKey("serverSorting").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_serverFiltering_is_serialized_if_set()
        {
            dataSource.ServerFiltering = true;

            var result = dataSource.ToJson();
            ((bool)result["serverFiltering"]).ShouldBeTrue();
        }

        [Fact]
        public void ToJson_serverFiltering_is_not_serialized_if_not_set()
        {
            dataSource.ServerFiltering = false;

            var result = dataSource.ToJson();
            result.ContainsKey("serverFiltering").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_serverGrouping_is_serialized_if_set()
        {
            dataSource.ServerGrouping = true;

            var result = dataSource.ToJson();
            ((bool)result["serverGrouping"]).ShouldBeTrue();
        }

        [Fact]
        public void ToJson_serverGrouping_is_not_serialized_if_not_set()
        {
            dataSource.ServerGrouping = false;
            var result = dataSource.ToJson();
            result.ContainsKey("serverGrouping").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_serverAggregates_is_serialized_if_set()
        {
            dataSource.ServerAggregates = true;

            var result = dataSource.ToJson();
            ((bool)result["serverAggregates"]).ShouldBeTrue();
        }

        [Fact]
        public void ToJson_serverAggregates_is_not_serialized_if_not_set()
        {
            dataSource.ServerAggregates = false;
            var result = dataSource.ToJson();
            result.ContainsKey("serverAggregates").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_pageSize_is_serialized()
        {
            dataSource.PageSize = 42;
            var result = dataSource.ToJson();
            result["pageSize"].ShouldEqual(42);
        }

        [Fact]
        public void ToJson_pageSize_is_not_serialized_if_not_set()
        {            
            var result = dataSource.ToJson();
            result.ContainsKey("pageSize").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_sort_expressions_are_serialized()
        {
            dataSource.OrderBy.Add(new SortDescriptor {
                Member = "Foo",
                SortDirection = System.ComponentModel.ListSortDirection.Descending
            });

            var result = dataSource.ToJson();
            var sort = (IEnumerable<IDictionary<string, object>>)result["sort"];

            sort.Count().ShouldEqual(1);
            sort.ElementAt(0)["field"].ShouldEqual("Foo");
            sort.ElementAt(0)["dir"].ShouldEqual("desc");
        }

        [Fact]
        public void ToJson_multiple_sort_expressions_are_serialized()
        {
            dataSource.OrderBy.Add(new SortDescriptor
            {
                Member = "Foo",
                SortDirection = System.ComponentModel.ListSortDirection.Descending
            });

            dataSource.OrderBy.Add(new SortDescriptor
            {
                Member = "Bar"                
            });

            var result = dataSource.ToJson();
            var sort = (IEnumerable<IDictionary<string, object>>)result["sort"];

            sort.Count().ShouldEqual(2);
            sort.ElementAt(0)["field"].ShouldEqual("Foo");
            sort.ElementAt(0)["dir"].ShouldEqual("desc");

            sort.ElementAt(1)["field"].ShouldEqual("Bar");
            sort.ElementAt(1)["dir"].ShouldEqual("asc");
        }

        [Fact]
        public void ToJson_sort_expressions_are_not_serialized_if_not_set()
        {
            dataSource.ServerSorting = false;

            var result = dataSource.ToJson();

            result.ContainsKey("sort").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_group_expressions_are_serialized()
        {
            dataSource.Groups.Add(new GroupDescriptor
            {
                Member = "Foo",
                SortDirection = System.ComponentModel.ListSortDirection.Descending
            });

            var result = dataSource.ToJson();
            var group = (IEnumerable<IDictionary<string, object>>)result["group"];

            group.Count().ShouldEqual(1);
            group.ElementAt(0)["field"].ShouldEqual("Foo");
            group.ElementAt(0)["dir"].ShouldEqual("desc");
        }

        [Fact]
        public void ToJson_group_expressions_are_not_serialized_if_not_set()
        {
            var result = dataSource.ToJson();

            result.ContainsKey("groups").ShouldBeFalse();
        }

        [Fact]
        public void ToJson_multiple_group_expressions_are_serialized()
        {
            dataSource.Groups.Add(new GroupDescriptor
            {
                Member = "Foo",
                SortDirection = System.ComponentModel.ListSortDirection.Descending
            });

            dataSource.Groups.Add(new GroupDescriptor
            {
                Member = "Bar"
            });

            var result = dataSource.ToJson();
            var groups = (IEnumerable<IDictionary<string, object>>)result["group"];

            groups.Count().ShouldEqual(2);
            groups.ElementAt(0)["field"].ShouldEqual("Foo");
            groups.ElementAt(0)["dir"].ShouldEqual("desc");

            groups.ElementAt(1)["field"].ShouldEqual("Bar");
            groups.ElementAt(1)["dir"].ShouldEqual("asc");
        }

        [Fact]
        public void ToJson_serialize_transport_prefix_as_empty_string()
        {
            var result = dataSource.ToJson();
            var transport = ((IDictionary<string, object>)result["transport"]);

            transport.ContainsKey("prefix").ShouldBeTrue();
            transport["prefix"].ShouldEqual(string.Empty);
        }

        [Fact]
        public void ToJson_serialize_transport_prefix_when_set()
        {
            dataSource.Transport.Prefix = "foo";

            var result = dataSource.ToJson();
            var transport = ((IDictionary<string, object>)result["transport"]);

            transport.ContainsKey("prefix").ShouldBeTrue();
            transport["prefix"].ShouldEqual("foo");
        }

        /*
                [Fact]
                public void ToJson_group_aggregates_are_serialized()
                {
                    var descriptor = new GroupDescriptor
                    {
                        Member = "Foo",
                        SortDirection = System.ComponentModel.ListSortDirection.Descending
                    };

                    dataSource.Groups.Add(descriptor);            

                    var result = dataSource.ToJson();
                    var group = (IEnumerable<IDictionary<string, object>>)result["group"];

                    group.Count().ShouldEqual(1);
                    group.ElementAt(0)["field"].ShouldEqual("Foo");
                    group.ElementAt(0)["dir"].ShouldEqual("desc");
                }
                */
    }
 
}