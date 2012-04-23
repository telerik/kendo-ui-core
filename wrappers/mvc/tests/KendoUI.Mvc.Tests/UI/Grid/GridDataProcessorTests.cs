namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;    
    using System.Linq;
    using System.Web.Mvc;
    using Infrastructure.Implementation;
    using Moq;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI;
    using Xunit;
    using Mvc.Tests;

#if MVC3
    using System.Dynamic;
#endif

    public class GridDataProcessorTests
    {
        private readonly GridDataProcessor dataProcessor;
        private readonly Mock<IGridBindingContext> context;
        private readonly IDictionary<string, ValueProviderResult> valueProvider;

        private const string field1Name = "Field1";
        private const string field2Name = "Field2";

        public GridDataProcessorTests()
        {
            valueProvider = new Dictionary<string, ValueProviderResult>();

            context = new Mock<IGridBindingContext>();
            context.Setup(c => c.Prefix(GridUrlParameters.OrderBy)).Returns(GridUrlParameters.OrderBy);
            context.Setup(c => c.Prefix(GridUrlParameters.GroupBy)).Returns(GridUrlParameters.GroupBy);
            context.Setup(c => c.Prefix(GridUrlParameters.CurrentPage)).Returns(GridUrlParameters.CurrentPage);
            context.Setup(c => c.Prefix(GridUrlParameters.Filter)).Returns(GridUrlParameters.Filter);
            context.Setup(c => c.Prefix(GridUrlParameters.Aggregates)).Returns(GridUrlParameters.Aggregates);
            context.Setup(c => c.Prefix(GridUrlParameters.PageSize)).Returns(GridUrlParameters.PageSize);
            context.Setup(c => c.GroupDescriptors).Returns(() => new List<GroupDescriptor>());
            context.Setup(c => c.SortDescriptors).Returns(() => new List<SortDescriptor>());
            context.Setup(c => c.FilterDescriptors).Returns(() => new CompositeFilterDescriptor[] { });

            context.SetupGet(c => c.Controller).Returns(new ControllerTestDouble(valueProvider, new ViewDataDictionary()));
            context.Setup(c => c.PageSize).Returns(10);
            dataProcessor = new GridDataProcessor(context.Object);
        }

        [Fact]
        public void Total_returns_zero_if_data_source_is_null()
        {
            Assert.Equal(0, dataProcessor.Total);
        }

        [Fact]
        public void Total_returns_zero_if_data_source_is_empty()
        {
            context.Setup(c => c.DataSource).Returns(new object[] { });

            Assert.Equal(0, dataProcessor.Total);
        }

        [Fact]
        public void PageCount_returns_one_if_data_source_is_null_or_empty()
        {
            Assert.Equal(1, dataProcessor.PageCount);
        }

        [Fact]
        public void PageCount_returns_one_if_page_size_is_zero()
        {
            context.SetupGet(c => c.PageSize).Returns(0);

            Assert.Equal(1, dataProcessor.PageCount);
        }

        [Fact]
        public void Should_return_page_count_when_data_source_items_are_less_than_page_size()
        {
            context.SetupGet(c => c.DataSource).Returns(DataSource(8));

            Assert.Equal(1, dataProcessor.PageCount);
        }

        [Fact]
        public void Should_return_page_count_when_data_source_items_are_more_than_page_size()
        {
            context.SetupGet(c => c.DataSource).Returns(DataSource(11));

            Assert.Equal(2, dataProcessor.PageCount);
        }

        [Fact]
        public void Should_return_page_count_when_data_source_items_are_same_as_page_size()
        {
            context.SetupGet(c => c.DataSource).Returns(DataSource(10));

            Assert.Equal(1, dataProcessor.PageCount);
        }

        [Fact]
        public void Should_sort_if_sort_descriptors_are_specified()
        {
            IList<Customer> dataSource = new[] {
                new Customer {Name = "B"},
                new Customer {Name = "A"}
            };

            valueProvider.Add(GridUrlParameters.OrderBy, "Name-asc");
            context.SetupGet(c => c.DataSource).Returns(dataSource);
            IEnumerable<Customer> processedDataSource = dataProcessor.ProcessedDataSource.Cast<Customer>();

            Assert.Equal("A", processedDataSource.First().Name);
        }        

        [Fact]
        public void Should_filter_if_filter_descriptors_are_specified()
        {
            IList<Customer> dataSource = new[] {
                new Customer {Name = "A"},
                new Customer {Name = "B"}
            };

            valueProvider.Add(GridUrlParameters.Filter, "startswith(Name,'A')");
            context.SetupGet(c => c.DataSource).Returns(dataSource);

            IEnumerable<Customer> processedDataSource = dataProcessor.ProcessedDataSource.Cast<Customer>();
            Assert.Equal(1, processedDataSource.Count());
            Assert.Equal("A", processedDataSource.First().Name);
        }

        [Fact]
        public void Should_bind_if_populated_with_DatTable()
        {
            var dataSource = new DataTable();
            dataSource.Columns.Add("Name", typeof(string));
            dataSource.Rows.Add("A");
            dataSource.Rows.Add("B");

            context.SetupGet(c => c.DataSource).Returns(new GridDataTableWrapper(dataSource));

            IEnumerable<DataRowView> processedDataSource = dataProcessor.ProcessedDataSource.Cast<DataRowView>();
            Assert.Equal(2, processedDataSource.Count());            
        }
       
        [Fact]
        public void Should_not_throw_if_bound_to_empty_DataTable()
        {
            var dataSource = new DataTable();
            dataSource.Columns.Add("Name", typeof(string));            

            context.SetupGet(c => c.DataSource).Returns(new GridDataTableWrapper(dataSource));
            Assert.DoesNotThrow(() => dataProcessor.ProcessedDataSource.Cast<DataRowView>());            
        }

        [Fact]
        public void Should_filter_if_bound_to_a_DataTable() 
        {
            var dataSource = new DataTable();
            dataSource.Columns.Add("Name", typeof(string));
            dataSource.Rows.Add("A");
            dataSource.Rows.Add("B");

            valueProvider.Add(GridUrlParameters.Filter, "startswith(Name,'A')");
            context.SetupGet(c => c.DataSource).Returns(new GridDataTableWrapper(dataSource));

            IEnumerable<DataRowView> processedDataSource = dataProcessor.ProcessedDataSource.Cast<DataRowView>();
            Assert.Equal(1, processedDataSource.Count());
            Assert.Equal("A", processedDataSource.First()["Name"]);
        }

        [Fact]
        public void Should_create_correct_groups_if_grouped_by_one_field_and_bound_to_DataTable()
        {
            dataProcessor.GroupDescriptors.Add(new GroupDescriptor { 
                Member = field1Name
            });
            context.SetupGet(c => c.DataSource).Returns(GetDataTable().WrapAsEnumerable());

            var processedDataSource = dataProcessor.ProcessedDataSource.Cast<IGroup>();
            Assert.Equal(2, processedDataSource.Count());

            var firstGroupItemCount = processedDataSource.First().ItemCount;
            Assert.Equal(1, firstGroupItemCount);

            var secondGroupItemCount = processedDataSource.ElementAt(1).ItemCount;
            Assert.Equal(1, secondGroupItemCount);
        }       

        [Fact]
        public void Should_create_correct_groups_if_grouped_by_two_fields_and_bound_to_DataTable()
        {
            dataProcessor.GroupDescriptors.Add(new GroupDescriptor
            {
                Member = field1Name
            });
            dataProcessor.GroupDescriptors.Add(new GroupDescriptor
            {
                Member = field2Name
            });
            context.SetupGet(c => c.DataSource).Returns(GetDataTable().WrapAsEnumerable());

            var processedDataSource = dataProcessor.ProcessedDataSource.Cast<IGroup>();
            var firstGroupItem = processedDataSource.First();            
            var secondGroupItem = processedDataSource.ElementAt(1);

            Assert.NotEmpty(firstGroupItem.Items.Cast<AggregateFunctionsGroup>());
            Assert.True(firstGroupItem.Items.Cast<AggregateFunctionsGroup>().All(g => g.ItemCount == 1));

            Assert.NotEmpty(secondGroupItem.Items.Cast<AggregateFunctionsGroup>());
            Assert.True(secondGroupItem.Items.Cast<AggregateFunctionsGroup>().All(g => g.ItemCount == 1));
        }

        [Fact]
        public void Should_page_if_current_page_is_specified_and_paging_is_enabled()
        {
            valueProvider.Add(GridUrlParameters.CurrentPage, 2);
            context.SetupGet(c => c.DataSource).Returns(DataSource(20));

            IEnumerable<int> processedDataSource = dataProcessor.ProcessedDataSource.Cast<int>();

            Assert.Equal(10, processedDataSource.Count());
        }

        [Fact]
        public void CurrentPage_should_fallback_to_binding_context()
        {
            context.SetupGet(c => c.CurrentPage).Returns(2);

            Assert.Equal(2, dataProcessor.CurrentPage);
        }        
        
        [Fact]
        public void CurrentPage_should_read_from_value_provider_to_binding_context()
        {
            valueProvider.Add(GridUrlParameters.CurrentPage, 3);
            context.SetupGet(c => c.CurrentPage).Returns(2);

            Assert.Equal(3, dataProcessor.CurrentPage);
        }

        [Fact]
        public void PageSize_should_fallback_to_binding_context()
        {
            context.SetupGet(c => c.PageSize).Returns(2);

            Assert.Equal(2, dataProcessor.PageSize);
        } 

        [Fact]
        public void PageSize_should_read_from_value_provider_to_binding_context()
        {
            valueProvider.Add(GridUrlParameters.PageSize, 3);
            context.SetupGet(c => c.PageSize).Returns(2);

            Assert.Equal(3, dataProcessor.PageSize);
        }

        [Fact]
        public void PageCount_should_use_page_size_form_value_provider()
        {
            valueProvider.Add(GridUrlParameters.PageSize, 3);
            
            context.SetupGet(c => c.DataSource).Returns(DataSource(10));

            dataProcessor.PageCount.ShouldEqual(4);
        }

        [Fact]
        public void Should_not_process_data_source_if_enable_custom_binding_is_true()
        {
            IEnumerable dataSource = DataSource(20);
            context.SetupGet(c => c.EnableCustomBinding).Returns(true);
            context.SetupGet(c => c.DataSource).Returns(dataSource);

            Assert.Same(dataSource, dataProcessor.ProcessedDataSource);
        }       

        [Fact]
        public void Should_set_proccessed_datasource_to_CustomGroupWrapper_inner_enumerable_when_such_is_provided_and_custom_binding_is_true()
        {
            var expectedValue = DataSource(2);
            var customWrapper = new GridCustomGroupingWrapper<int>(expectedValue);
            context.SetupGet(c => c.EnableCustomBinding).Returns(true);
            context.SetupGet(c => c.DataSource).Returns(customWrapper);

            Assert.True(expectedValue.Cast<int>().SequenceEqual(dataProcessor.ProcessedDataSource.Cast<int>()));
        }

        [Fact]
        public void Should_throw_if_datasource_is_CustomGroupWrapper_and_no_custom_binding_is_enabled()
        {
            var customWrapper = new GridCustomGroupingWrapper<int>(DataSource(2));
            context.SetupGet(c => c.EnableCustomBinding).Returns(false);
            context.SetupGet(c => c.DataSource).Returns(customWrapper);

            IEnumerable result;
            Assert.Throws<InvalidOperationException>(() => result = dataProcessor.ProcessedDataSource);
        }

        [Fact]
        public void Should_calculate_aggregates()
        {
            const int expectedCount = 8;
            context.SetupGet(c => c.DataSource).Returns(DataSource(expectedCount));

            var descriptor = new AggregateDescriptor();
            descriptor.Aggregates.Add(new CountFunction { ResultFormatString = field2Name });
            
            context.SetupGet(c => c.Aggregates).Returns(new[]{ descriptor });
            var aggregatesResults = dataProcessor.AggregatesResults;

            aggregatesResults.First().Value.ShouldEqual(expectedCount);
        }

#if MVC3
        [Fact]
        public void Should_filter_a_list_of_anonymous_dynamic_types_on_string_caseinsensitive()
        {
            //IEnumerable<dynamic> enumerable = new[] { new { Foo = "Bar" }, new { Foo = "bar" } };
            dynamic expando1 = new ExpandoObject();
            expando1.Foo = "Bar";

            dynamic expando2 = new ExpandoObject();
            expando2.Foo = "bar";
            IEnumerable<dynamic> enumerable = new[] { expando1, expando2 };

            context.Setup(c => c.DataSource).Returns(enumerable);
            context.SetupGet(c => c.FilterDescriptors).Returns(new List<CompositeFilterDescriptor>
                                                                   {
                                                                       new CompositeFilterDescriptor{
                                                                           FilterDescriptors = new FilterDescriptorCollection {
                                                                               new FilterDescriptor
                                                                                   {
                                                                                       Member = "Foo",
                                                                                       Operator = FilterOperator.IsEqualTo,
                                                                                       Value = "Bar",
                                                                                   }
                                                                           }
                                                                       }});
            var processedData = dataProcessor.ProcessedDataSource.Cast<object>();

            processedData.Count().ShouldEqual(2);
        }
        
#endif
        private static DataTable GetDataTable()
        {
            var dataSource = new DataTable();
            dataSource.Columns.Add(field1Name, typeof(int));
            dataSource.Columns.Add(field2Name, typeof(string));
            dataSource.Rows.Add(1, "A");
            dataSource.Rows.Add(2, "B");
            return dataSource;
        }

        private static IEnumerable DataSource(int howMany)
        {
            for (int i = 0; i < howMany; i++)
            {
                yield return i;
            }
        }
    }
}
