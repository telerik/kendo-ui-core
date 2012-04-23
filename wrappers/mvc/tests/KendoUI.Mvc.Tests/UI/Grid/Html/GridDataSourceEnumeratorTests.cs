// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI.Html.Tests
{
    using Moq;
    using System.Linq;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using KendoUI.Mvc.UI.Tests;
    using Xunit;

    public class GridDataSourceEnumeratorTests
    {
        private GridDataSourceEnumerator enumerator;
        private readonly Mock<IGridItemCreator> factory;
        
        public GridDataSourceEnumeratorTests()
        {
            factory = new Mock<IGridItemCreator>();
            
            factory.Setup(f => f.CreateItem(It.IsAny<IGroup>())).Returns((IGroup g) => new GridItem
            {
                Type = GridItemType.GroupRow,
                DataItem = g
            });

            factory.Setup(f => f.CreateItem(It.IsAny<Customer>())).Returns((Customer c) => new GridItem
            {
                Type = GridItemType.DataRow,
                DataItem = c
            });
        }

        [Fact]
        public void Should_return_data_rows()
        {
            var data = new[] { "foo" };
            var item = new GridItem
            {
                Type = GridItemType.DataRow,
                DataItem = data[0]
            };

            factory.Setup(f => f.CreateItem(data[0])).Returns(() => item);
            enumerator = new GridDataSourceEnumerator(data, factory.Object, default(GridInsertRowPosition));

            var first = enumerator.First();
            first.ShouldBeSameAs(item);
        }
        
        [Fact]
        public void Should_return_group_rows()
        {
            var dataSource = ArrangeGroupedDataSource();

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var first = enumerator.First();

            first.Type.ShouldEqual(GridItemType.GroupRow);
            var group = first.DataItem as IGroup;
            group.Key.ShouldEqual(Gender.Female); 
        }
        
        [Fact]
        public void Should_return_data_items_in_groups()
        {
            var dataSource = ArrangeGroupedDataSource();

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));
            var all = enumerator.ToArray();
            var second = all[1];

            second.Type.ShouldEqual(GridItemType.DataRow);
            
            var customer = second.DataItem as Customer;
            var gender = customer.Gender;
            gender.ShouldEqual(Gender.Female);
        }
        
        [Fact]
        public void Should_return_group_after_data_items()
        {
            var dataSource = ArrangeGroupedDataSource();

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));
            
            var all = enumerator.ToArray();
            var third = all[2];

            third.Type.ShouldEqual(GridItemType.GroupRow);

            var group = third.DataItem as IGroup;
            group.Key.ShouldEqual(Gender.Male);
        }

        [Fact]
        public void Should_set_group_level()
        {
            var dataSource = ArrangeGroupedDataSource();

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var all = enumerator.ToArray();
            var firstGroupItem = all[0];
            var secondGroupItem = all[2];

            firstGroupItem.GroupLevel.ShouldEqual(0);
            firstGroupItem.GroupLevel.ShouldEqual(secondGroupItem.GroupLevel);
        }

        [Fact]
        public void Should_set_group_level_for_nested_groups()
        {
            var dataSource = ArrangeCustomers().GroupBy(new[] 
            {
                new GroupDescriptor
                {
                    Member = "Gender"
                },
                new GroupDescriptor
                {
                    Member = "IsActive"
                }
            });

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var all = enumerator.ToArray();
            var firstNestedGroupItem = all[1];
            var secondNestedGroupItem = all[4];

            firstNestedGroupItem.GroupLevel.ShouldEqual(1);
            firstNestedGroupItem.GroupLevel.ShouldEqual(secondNestedGroupItem.GroupLevel);
        }

        [Fact]
        public void Should_return_nested_group()
        {
            var dataSource = ArrangeCustomers().GroupBy(new[] 
            {
                new GroupDescriptor
                {
                    Member = "Gender"
                },
                new GroupDescriptor
                {
                    Member = "IsActive"
                }
            });
            
            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));
            
            var all = enumerator.ToArray();
            var second = all[1];

            second.Type.ShouldEqual(GridItemType.GroupRow);

            var group = second.DataItem as IGroup;
            group.Key.ShouldEqual(true);
        }
        
        [Fact]
        public void Should_return_data_items_after_nested_group()
        {
            var customers = ArrangeCustomers();
  
            var dataSource = customers.GroupBy(new[] 
            {
                new GroupDescriptor
                {
                    Member = "Gender"
                },
                new GroupDescriptor
                {
                    Member = "IsActive"
                }
            });

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));
            
            var all = enumerator.ToArray();
            var third = all[2];

            third.Type.ShouldEqual(GridItemType.DataRow);

            var customer = third.DataItem as Customer;
            customer.ShouldBeSameAs(customers.First());
        }
        
        [Fact]
        public void Should_return_empty_row_if_data_source_is_null()
        {
            enumerator = new GridDataSourceEnumerator(null, factory.Object, default(GridInsertRowPosition));

            var first = enumerator.First();
            first.Type.ShouldEqual(GridItemType.EmptyRow);
            first.DataItem.ShouldBeNull();
        }
        
        [Fact]
        public void Should_return_empty_row_if_data_source_is_emmpty()
        {
            enumerator = new GridDataSourceEnumerator(new object[0], factory.Object, default(GridInsertRowPosition));

            var first = enumerator.First();
            first.Type.ShouldEqual(GridItemType.EmptyRow);
            first.DataItem.ShouldBeNull();
        }

        [Fact]
        public void Should_return_detail_row()
        {
            var dataSource = new[] { "foo" };

            factory.Setup(c => c.CreateItem(dataSource[0])).Returns((string c) => new GridItem
            {
                Type = GridItemType.DataRow,
                State = GridItemStates.Master,
                DataItem = c
            });

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var all = enumerator.ToArray();

            var second = all[1];

            second.Type.ShouldEqual(GridItemType.DetailRow);
            second.DataItem.ShouldBeSameAs(dataSource[0]);

            all.Length.ShouldEqual(2);
        }

        [Fact]
        public void Should_return_detail_row_after_group()
        {
            var dataSource = ArrangeGroupedDataSource();

            factory.Setup(c => c.CreateItem(It.IsAny<Customer>())).Returns((Customer c) => new GridItem
            {
                Type = GridItemType.DataRow,
                State = GridItemStates.Master,
                DataItem = c
            });

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var all = enumerator.ToArray();

            all[2].Type.ShouldEqual(GridItemType.DetailRow);
        }

        [Fact]
        public void Should_set_group_level_of_detail_row_if_grouped()
        {
            var dataSource = ArrangeGroupedDataSource();

            factory.Setup(c => c.CreateItem(It.IsAny<Customer>())).Returns((Customer c) => new GridItem
            {
                Type = GridItemType.DataRow,
                State = GridItemStates.Master,
                DataItem = c
            });

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var all = enumerator.ToArray();

            all[2].GroupLevel.ShouldEqual(1);
        }

        [Fact]
        public void Should_set_odd_item_as_alternating()
        {
            var dataSource = ArrangeCustomers();
            factory.Setup(c => c.CreateItem(It.IsAny<Customer>())).Returns((Customer c) => new GridItem
            {
                Type = GridItemType.DataRow,
                State = GridItemStates.Default,
                DataItem = c
            });

            enumerator = new GridDataSourceEnumerator(dataSource, factory.Object, default(GridInsertRowPosition));

            var all = enumerator.ToArray();

            (all[0].State & GridItemStates.Alternating).ShouldNotEqual(GridItemStates.Alternating);
            (all[1].State & GridItemStates.Alternating).ShouldEqual(GridItemStates.Alternating);
        }

        private IQueryable ArrangeGroupedDataSource()
        {
            var dataSource = ArrangeCustomers().GroupBy(new[] 
            {
                new GroupDescriptor
                {
                    Member = "Gender"
                }
            });

            return dataSource;
        }
        
        private IQueryable<Customer> ArrangeCustomers()
        {
            var data = new[] 
            { 
                new Customer
                {
                    Gender = Gender.Female,
                    IsActive = true,
                    Name = "Foo"
                },
                new Customer
                {
                    Gender = Gender.Male,
                    IsActive = false,
                    Name = "Bar"
                }
            };
            
            return data.AsQueryable();
        }
    }
}