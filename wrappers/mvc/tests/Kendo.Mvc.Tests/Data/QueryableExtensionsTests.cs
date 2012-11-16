namespace Kendo.Mvc.Tests.Data
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Infrastructure.Implementation;
    using UI.Tests;
    using Xunit;

    public class QueryableExtensionsTests
    {
        class Person
        {
            public string Name
            {
                get;
                set;
            }
            public int ID
            {
                get;
                set;
            }
        }

        [Fact]
        public void Filter_string_equals_caseinsensitive()
        {
            IEnumerable<Person> people = new[] { new Person { Name = "A" }, new Person { Name = "B" } };

            var quearyablePeople = people.AsQueryable();

            var filteredPeople = quearyablePeople.Where(new[] { new FilterDescriptor
            {
                Member = "Name",
                Operator = FilterOperator.IsEqualTo,
                Value = "a"
            }}).Cast<Person>();

            Assert.Same(people.ElementAt(0), filteredPeople.FirstOrDefault());
        }

        [Fact]
        public void Filter_string_not_equal_caseinsensitive()
        {
            IEnumerable<Person> people = new[] { new Person { Name = "A" }, new Person { Name = "B" } };

            var quearyablePeople = people.AsQueryable();

            var filteredPeople = quearyablePeople.Where(new[] { new FilterDescriptor
            {
                Member = "Name",
                Operator = FilterOperator.IsNotEqualTo,
                Value = "a"
            }}).Cast<Person>();

            Assert.Same(people.ElementAt(1), filteredPeople.FirstOrDefault());
        }

        [Fact]
        public void Filter_does_not_contain()
        {
            IEnumerable<Person> people = new[] { new Person { Name = "A" }, new Person { Name = "B" } };

            var quearyablePeople = people.AsQueryable();

            var filteredPeople = quearyablePeople.Where(new[] { new FilterDescriptor
            {
                Member = "Name",
                Operator = FilterOperator.DoesNotContain,
                Value = "a"
            }}).Cast<Person>();

            Assert.Same(people.ElementAt(1), filteredPeople.FirstOrDefault());
        }

        [Fact]
        public void Sort_should_sort_the_data()
        {
            IEnumerable<Person> people = new[] { new Person { Name = "A" }, new Person { Name = "B" } };

            var quearyablePeople = people.AsQueryable();

            var sortedPeople = quearyablePeople.Sort(new[] {
                new SortDescriptor {
                    Member = "Name",
                    SortDirection = ListSortDirection.Descending
                }
            }).Cast<Person>();

            Assert.Equal("B", sortedPeople.First().Name);
        }

        [Fact]
        public void Sort_without_member()
        {
            var strings = new[] { "One", "Two" };
            var queryableStrings = strings.AsQueryable();

            var sortedStrings = queryableStrings.Sort(new[] {
                new SortDescriptor {
                    SortDirection = ListSortDirection.Descending
                }
            }).Cast<string>();

            Assert.Equal("Two", sortedStrings.First());
        }

        [Fact]
        public void Page_should_page_the_data()
        {
            var people = CreateTestData();
            var secondPageOfPeople = people.Page(1, 5).Cast<Person>();

            Assert.Equal(5, secondPageOfPeople.First().ID);
        }

        [Fact]
        public void Filter_with_composite_descriptor_should_filter_the_data()
        {
            var people = CreateTestData();
            var filteredPeople = people.Where(new[] {
                new CompositeFilterDescriptor {
                    FilterDescriptors = new FilterDescriptorCollection {
                           new FilterDescriptor("ID", FilterOperator.IsGreaterThanOrEqualTo, 0),
                           new FilterDescriptor("ID", FilterOperator.IsLessThanOrEqualTo, 2),
                    },
                    LogicalOperator = FilterCompositionLogicalOperator.And
                }
            }).Cast<Person>();

            Assert.Equal(3, filteredPeople.Count());
            Assert.Equal(0, filteredPeople.First().ID);
            Assert.Equal(2, filteredPeople.Last().ID);
        }

        [Fact]
        public void Filter_with_expression_should_filter_the_data()
        {
            var people = CreateTestData();
            Expression<Func<Person, bool>> expression = (Person p) => p.ID >= 0 && p.ID <= 2;
            IQueryable<Person> filteredPeople = people.Where(expression).Cast<Person>();

            Assert.Equal(0, filteredPeople.First().ID);
            Assert.Equal(2, filteredPeople.Last().ID);
        }

        [Fact]
        public void Group_with_group_descriptor_groups_the_data()
        {
            var people = CreateTestData();
            var grouppedPeople = people.GroupBy(new[]{new GroupDescriptor{
                        Member = "ID"
                    }
                })
                .Cast<IGroup>();

            var firstGroup = grouppedPeople.First();
            var itemsInFirstGroup = firstGroup.Items.Cast<Person>();
            Assert.Equal(0, firstGroup.Key);
            Assert.Equal(1, itemsInFirstGroup.Count());
            Assert.Equal(0, itemsInFirstGroup.First().ID);
        }

        [Fact]
        public void Empty_group()
        {
            IQueryable people = CreateTestData();
            IQueryable<Person> grouppedPeople = people.GroupBy(new GroupDescriptor[]{})
                .Cast<Person>();
            Assert.Equal(grouppedPeople.Count(), CreateTestData().Count());
        }

        [Fact]
        public void Should_calculate_aggreagte_for_group()
        {
            IEnumerable<Person> people = new[]
                                             {new Person {Name = "A"}, new Person {Name = "A"}, new Person {Name = "B"}};
            IQueryable queryablePeople = people.AsQueryable();

            var groupDescriptor = new GroupDescriptor {Member = "Name", MemberType = typeof (string)};
            groupDescriptor.AggregateFunctions.Add(new CountFunction());
            var groupDescriptors = new[] {groupDescriptor};

            var result = queryablePeople.GroupBy(queryablePeople, groupDescriptors);
            var groups = result.Cast<AggregateFunctionsGroup>();

            groups.Count().ShouldEqual(2);

            groups.ElementAt(0).GetAggregateResults(groupDescriptor.AggregateFunctions).First().Value.ShouldEqual(2);
            groups.ElementAt(1).GetAggregateResults(groupDescriptor.AggregateFunctions).First().Value.ShouldEqual(1);
        }

        [Fact]
        public void Should_calculate_group_aggregate_if_paged()
        {
            IEnumerable<Person> people = new[]{ new Person { Name = "A" }, new Person { Name = "A" },new Person { Name = "B" }};

            var queryablePeople = people.AsQueryable();

            var groupDescriptor = new GroupDescriptor { Member = "Name", MemberType = typeof(string) };
            groupDescriptor.AggregateFunctions.Add(new CountFunction());
            var groupDescriptors = new[] { groupDescriptor };

            var notPagedData = queryablePeople;

            var result = queryablePeople.Page(0, 1).GroupBy(notPagedData, groupDescriptors);
            var groups = result.Cast<AggregateFunctionsGroup>();

            groups.Count().ShouldEqual(1);

            groups.ElementAt(0).GetAggregateResults(groupDescriptor.AggregateFunctions).First().Value.ShouldEqual(2);
        }

        [Fact]
        public void Should_calculate_group_aggregate_on_multiple_groups()
        {
            IEnumerable<Person> people = new[] { new Person { ID = 0, Name = "A" }, new Person { ID = 1, Name = "A" }, new Person { ID = 2, Name = "B" } };
            var queryablePeople = people.AsQueryable();

            var outterGroup = new GroupDescriptor { Member = "Name", MemberType = typeof(string) };
            outterGroup.AggregateFunctions.Add(new CountFunction());

            var innerGroup = new GroupDescriptor { Member = "ID", MemberType = typeof(string) };
            innerGroup.AggregateFunctions.Add(new CountFunction());

            var groupDescriptors = new[] { outterGroup, innerGroup };


            var result = queryablePeople.GroupBy(queryablePeople, groupDescriptors);
            var groups = result.Cast<AggregateFunctionsGroup>();

            groups.Count().ShouldEqual(2);

            var firstGroupHeader = FindGroupHeader(groups, 0);
            var secondGroupHeader = FindGroupHeader(groups, 1);

            firstGroupHeader.GetAggregateResults(outterGroup.AggregateFunctions).First().Value.ShouldEqual(2);
            secondGroupHeader.GetAggregateResults(outterGroup.AggregateFunctions).First().Value.ShouldEqual(1);

            var firstInnerGroupHeader = FindGroupHeader(firstGroupHeader.Items, 0);
            firstInnerGroupHeader.GetAggregateResults(innerGroup.AggregateFunctions).First().Value.ShouldEqual(1);

            var secondInnerGroupHeader = FindGroupHeader(firstGroupHeader.Items, 1);
            secondInnerGroupHeader.GetAggregateResults(innerGroup.AggregateFunctions).First().Value.ShouldEqual(1);
        }

        private AggregateFunctionsGroup FindGroupHeader(IEnumerable items, int index)
        {
            return items.Cast<AggregateFunctionsGroup>().ElementAt(index);
        }

        [Fact]
        public void Should_filter_a_list_of_dynamic_types()
        {
            dynamic expando = new System.Dynamic.ExpandoObject();
            expando.Foo = "Bar";
            var enumerable =
                new System.Dynamic.IDynamicMetaObjectProvider[] { expando };

            var data = enumerable.AsQueryable()
                                       .Where(new[] { new FilterDescriptor
                                                        {
                                                            Member = "Foo",
                                                            Operator = FilterOperator.IsEqualTo,
                                                            Value = "Bar"
                                                        }
                                                    }
                                             );

            Assert.NotNull(data.ElementAt(0));
        }

        [Fact]
        public void Should_filter_a_list_of_dynamic_types_on_complex_property()
        {
            dynamic expando = new System.Dynamic.ExpandoObject();
            expando.Foo = new Customer { Name = "Name1"};
            IEnumerable<object> enumerable = new[] { expando };

            var data = enumerable.AsQueryable().Where(new[] { new FilterDescriptor
            {
                Member = "Foo.Name",
                Operator = FilterOperator.IsEqualTo,
                Value = "Name1",
            }});

            Assert.NotNull(data.ElementAt(0));
        }

        [Fact]
        public void Should_execute_the_selector_over_all_items()
        {
            var people = CreateTestData() as IQueryable<Person>;

            var result = people.ToDataSourceResult(new UI.DataSourceRequest(), (person) => new Person { Name = person.ID.ToString() });

            result.Data.Cast<Person>().ElementAt(0).Name.ShouldEqual(people.First().ID.ToString());
        }

        [Fact]
        public void Should_change_the_type_of_the_collection()
        {
            var people = CreateTestData() as IQueryable<Person>;

            var result = people.ToDataSourceResult(new UI.DataSourceRequest(), (person) => new PersonViewModel { Name = person.ID.ToString() });

            result.Data.Cast<PersonViewModel>();
        }

        [Fact]
        public void Should_execute_the_selector_over_group_items()
        {
            var people = CreateTestData() as IQueryable<Person>;

            var result = people.ToDataSourceResult(new UI.DataSourceRequest() { Page = 1, PageSize = 1, Groups = new [] { new GroupDescriptor { Member = "Name" } }  },
                (person) => new Person { Name = person.ID.ToString() });

            result.Data.Cast<AggregateFunctionsGroup>().First().Items.Cast<Person>().First().Name.ShouldEqual(people.First().ID.ToString());
        }

        [Fact]
        public void Should_execute_the_selector_over_nested_group_items()
        {
            var people = CreateTestData() as IQueryable<Person>;

            var result = people.ToDataSourceResult(new UI.DataSourceRequest() { Page = 1, PageSize = 1, Groups = new[] { new GroupDescriptor { Member = "Name" }, new GroupDescriptor { Member = "ID" } } },
                (person) => new Person { Name = person.ID.ToString() });

            result.Data.Cast<AggregateFunctionsGroup>().First().Items.Cast<AggregateFunctionsGroup>()
                       .First().Items.Cast<Person>().First().Name.ShouldEqual(people.First().ID.ToString());
        }

        private class PersonViewModel
        {
            public int ID { get; set; }
            public string Name { get; set; }
        }

        private IQueryable CreateTestData()
        {
            IList<Person> people = new List<Person>();

            for (int i = 0; i < 10; i++)
            {
                people.Add(new Person { ID = i, Name = "Person#" + i });
            }

            return people.AsQueryable();
        }
    }
}
