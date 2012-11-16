namespace Kendo.Mvc.UI.Tests.Grid
{
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Data;
    using System.Linq;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using Xunit;

    public class GridDataTableWrapperExtensionsTests
    {
        DataTable dataTable;
        static readonly string Field1Name = "Field1";
        static readonly string Field2Name = "Field2";

        public GridDataTableWrapperExtensionsTests()
        {
            dataTable = new DataTable();
            dataTable.Columns.Add(Field1Name, typeof(int));
            dataTable.Columns.Add(Field2Name);
        }

        [Fact]
        public void Should_serialize_correct_group_header_item_count()
        {
            var groups = GetGroupedData();
            var result = groups.AsQueryable().SerializeToDictionary(dataTable);

            Assert.Equal(2, result.Cast<Dictionary<string, object>>().Count());
        }

        [Fact]
        public void Should_serialize_group_header_item_properties()
        {
            var groups = GetGroupedData();

            var result = groups.AsQueryable().SerializeToDictionary(dataTable);

            var firstHeaderItem = result.Cast<Dictionary<string, object>>().First();

            Assert.Null(firstHeaderItem["AggregateFunctionsProjection"]);
            Assert.NotNull(firstHeaderItem["Aggregates"]);
            Assert.Equal(42, firstHeaderItem["Key"]);
            Assert.False((bool)firstHeaderItem["HasSubgroups"]);
            Assert.NotNull(firstHeaderItem["Items"]);
            Assert.NotNull(firstHeaderItem["Subgroups"]);
        }

        [Fact]
        public void Should_serialize_group_items()
        {
            var groups = GetGroupedData();
            var result = groups.AsQueryable().SerializeToDictionary(dataTable);

            var firstGroupItem = result.Cast<Dictionary<string, object>>().First();
            Assert.NotNull(firstGroupItem["Items"]);

            var items = ((IEnumerable<Dictionary<string, object>>)firstGroupItem["Items"]);
            Assert.Equal(42, items.First()[Field1Name]);
            Assert.Equal("42", items.First()[Field2Name]);
        }

        [Fact]
        public void Should_serialize_empty_list_if_no_group_items()
        {
            var groups =  new[] {
                new AggregateFunctionsGroup
                {
                    Key = 42,
                    HasSubgroups = false,
                    Subgroups = {},
                    ItemCount = 1,
                    AggregateFunctionsProjection = null,
                    Items = Enumerable.Empty<DataRowView>()
                }
            };

            var result = groups.AsQueryable().SerializeToDictionary(dataTable);
            var firstGroupItem = result.Cast<Dictionary<string, object>>().First();

            Assert.False(((IEnumerable<Dictionary<string, object>>)firstGroupItem["Items"]).Any());
        }

        [Fact]
        public void Should_serialize_inner_groups()
        {
            var firstGroup = new Mock<IGroup>();
            firstGroup.SetupGet(g => g.Subgroups)
                        .Returns(
                                new ReadOnlyCollection<IGroup>(new []{
                                    new AggregateFunctionsGroup
                                    {
                                        Key = 42,
                                        HasSubgroups = false,
                                        Subgroups = {},
                                        ItemCount = 1,
                                        AggregateFunctionsProjection = null,
                                        Items = Enumerable.Empty<DataRowView>()
                                    }
                                }));

            var secondGroup = new Mock<IGroup>();
            secondGroup.SetupGet(g => g.Subgroups)
                        .Returns(
                                new ReadOnlyCollection<IGroup>(new[]{
                                    new AggregateFunctionsGroup
                                    {
                                        Key = 42,
                                        HasSubgroups = false,
                                        Subgroups = {},
                                        ItemCount = 1,
                                        AggregateFunctionsProjection = null,
                                        Items = Enumerable.Empty<DataRowView>()
                                    }
                                }));

            var groups = new[] { firstGroup.Object, secondGroup.Object };
            var result = groups.AsQueryable().SerializeToDictionary(dataTable);

            var firstGroupItem = result.Cast<Dictionary<string, object>>().First();
            Assert.True(((IEnumerable<Dictionary<string, object>>)firstGroupItem["Subgroups"]).Any());
            var secondGroupItem = result.Cast<Dictionary<string, object>>().ElementAt(1);
            Assert.True(((IEnumerable<Dictionary<string, object>>)secondGroupItem["Subgroups"]).Any());
        }

        private AggregateFunctionsGroup[] GetGroupedData()
        {
            var groups = new[] {
                new AggregateFunctionsGroup
                {
                    Key = 42,
                    HasSubgroups = false,
                    Subgroups = {},
                    ItemCount = 1,
                    AggregateFunctionsProjection = null,
                    Items = new []{ConstructDataRow(42,"42")}
                },
                new AggregateFunctionsGroup
                {
                    Key = 24,
                    HasSubgroups = false,
                    Subgroups = {},
                    ItemCount = 1,
                    AggregateFunctionsProjection = null,
                    Items = new []{ConstructDataRow(24,"24")}
                }
            };
            return groups;
        }


        private DataRowView ConstructDataRow(int field1Value, string field2Value)
        {
            dataTable.Rows.Add(field1Value, field2Value);
            return dataTable.DefaultView[dataTable.DefaultView.Count - 1];
        }

        [Fact]
        public void Should_serialize_DataRow_fields()
        {
            var dataTable = GetDataTable(1);
            var result = dataTable.WrapAsEnumerable().SerializeToDictionary(dataTable);
            var firstRow = result.Cast<Dictionary<string, object>>().First();

            Assert.Equal("value0", firstRow["Field1"]);
            Assert.Equal(0, firstRow["Field2"]);
        }

        [Fact]
        public void Should_serialize_all_DataTable_rows()
        {
            const int expectedItemsCount = 10;

            var dataTable = GetDataTable(expectedItemsCount);
            var result = dataTable.WrapAsEnumerable().SerializeToDictionary(dataTable);

            var resultCount = result.Cast<Dictionary<string, object>>().Count();
            Assert.Equal(expectedItemsCount, resultCount);
        }

        private static DataTable GetDataTable(int howMany)
        {
            var dataSource = new DataTable();
            dataSource.Columns.Add("Field1");
            dataSource.Columns.Add("Field2", typeof(int));

            for (int i = 0; i < howMany; i++)
            {
                dataSource.Rows.Add("value" + i, i);
            }
            return dataSource;
        }
    }
}
