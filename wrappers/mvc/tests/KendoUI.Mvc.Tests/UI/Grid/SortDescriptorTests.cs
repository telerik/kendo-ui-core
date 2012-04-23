// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System.ComponentModel;
    using Xunit;

    public class SortDescriptorTests
    {
        private readonly SortDescriptor descriptor;

        public SortDescriptorTests()
        {
            descriptor = new SortDescriptor();
        }

        [Fact]
        public void Should_serialize_member_and_ascending_direction()
        {
            descriptor.Member = "foo";
            descriptor.SortDirection = ListSortDirection.Ascending;

            descriptor.Serialize().ShouldEqual("foo-asc");
        }        
        
        [Fact]
        public void Should_serialize_member_and_descending_direction()
        {
            descriptor.Member = "foo";
            descriptor.SortDirection = ListSortDirection.Descending;

            descriptor.Serialize().ShouldEqual("foo-desc");
        }

        [Fact]
        public void Should_deserialize_from_string_and_initialize_member_and_ascending_sort_direction()
        {
            descriptor.Deserialize("foo-asc");

            descriptor.Member.ShouldEqual("foo");
            descriptor.SortDirection.ShouldEqual(ListSortDirection.Ascending);
        }        
        
        [Fact]
        public void Should_deserialize_from_string_and_initialize_member_and_descending_sort_direction()
        {
            descriptor.Deserialize("foo-desc");

            descriptor.Member.ShouldEqual("foo");
            descriptor.SortDirection.ShouldEqual(ListSortDirection.Descending);
        }

        [Fact]
        public void Should_parse_one_component_as_descending_sort_direction()
        {
            descriptor.Deserialize("desc");

            descriptor.Member.ShouldBeNull();
            descriptor.SortDirection.ShouldEqual(ListSortDirection.Descending);
        }
        
        [Fact]
        public void Should_parse_one_component_as_ascending_sort_direction()
        {
            descriptor.Deserialize("asc");

            descriptor.Member.ShouldBeNull();
            descriptor.SortDirection.ShouldEqual(ListSortDirection.Ascending);
        }
    }
}
