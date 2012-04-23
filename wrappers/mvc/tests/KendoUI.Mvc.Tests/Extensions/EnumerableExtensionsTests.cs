// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions.Tests
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using Xunit;

    public class EnumerableExtensionsTests
    {
        [Fact]
        public void Each_should_call_the_provided_action()
        {
            IEnumerable<int> list = new[] { 4 };
            bool isCalled = false;

            list.Each(i => isCalled = true);

            Assert.True(isCalled);
        }

        [Fact]
        public void AsGenericEnumerable_returns_generic_for_normal_enumerable()
        {
            IEnumerable data = new ArrayList { 1 };

            Assert.IsAssignableFrom(typeof(IEnumerable<int>), data.AsGenericEnumerable());
        }

        [Fact]
        public void ElementAt_returns_the_element_at_the_specified_index()
        {
            IEnumerable data = new[] { 1 };

            Assert.Equal(1, data.ElementAt(0));
        }

        private class SimpleEnumerable : IEnumerable
        {
            public IEnumerator GetEnumerator()
            {
                for (int i = 0; i < 3; i++)
                {
                    yield return i;
                }
            }
        }

        [Fact]
        public void ElementAt_returns_the_element_if_the_enumerable_does_not_support_IList()
        {
            Assert.Equal(2, new SimpleEnumerable().ElementAt(2));
        }

        [Fact]
        public void ElementAt_returns_null_if_the_index_does_not_exist_in_simple_enumerable()
        {
            Assert.Null(new SimpleEnumerable().ElementAt(3));
        }

        [Fact]
        public void ElementAt_throws_on_negative_index()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => new SimpleEnumerable().ElementAt(-1));
        }

        [Fact]
        public void IndexOf_should_return_the_index_of_element()
        {
            IEnumerable data = new[] { 1 };

            Assert.Equal(0, data.IndexOf(1));
        }

        [Fact]
        public void IndexOf_should_return_minus_one_if_the_item_is_not_found()
        {
            IEnumerable data = new[] { 1 };

            Assert.Equal(-1, data.IndexOf(0));
        }

        [Fact]
        public void ToReadOnlyCollection_should_return_read_only_enumerable()
        {
            IEnumerable<int> data = new[] { 1 };

            Assert.IsAssignableFrom(typeof(ReadOnlyCollection<int>), data.ToReadOnlyCollection());
        }

        [Fact]
        public void ToReadOnlyCollection_should_return_read_only_enumerable_when_null_is_passed()
        {
            IEnumerable<int> data = null;

            Assert.IsAssignableFrom(typeof(ReadOnlyCollection<int>), data.ToReadOnlyCollection());
        }

        [Fact]
        public void ToReadOnlyCollection_should_return_the_same_collection_if_read_only_collection_is_passed()
        {
            IEnumerable<int> data = new ReadOnlyCollection<int>(new int[] { });

            Assert.IsAssignableFrom(typeof(ReadOnlyCollection<int>), data.ToReadOnlyCollection());
        }

        private class Test
        {
            public IList<Test> Children { get; set; }
        }

        [Fact]
        public void SelectRecursive_returns_enumerable_with_all_items_from_homogenous_enimerable_hierarchy()
        {
            IEnumerable<Test> data = new List<Test> {
                new Test {
                    Children = new List<Test> { new Test() {Children = new List<Test>()}}
                },
                new Test {
                    Children = new List<Test>()
                }
            };

            Assert.Equal(3, data.SelectRecursive(parent => parent.Children).Count());
        }

        [Fact]
        public void SelectRecursive_returns_enumerable_with_all_items_when_the_child_selector_returns_null()
        {
            IEnumerable<Test> data = new List<Test> {
                new Test {
                    Children = new List<Test> { new Test()}
                },
                new Test()
            };

            Assert.Equal(3, data.SelectRecursive(parent => parent.Children).Count());
        }
    }
}