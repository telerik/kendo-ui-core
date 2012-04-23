// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI.Tests;
    using Xunit;

    public class GridDataKeyComparerTests
    {
        private GridDataKeyComparer comparer;
        private readonly IEnumerable<Func<object, object>> dataKeys;
        private readonly Customer customer;

        public GridDataKeyComparerTests()
        {
            customer = new Customer
            {
                Id = 1,
                Name = "foo"
            };

            dataKeys = new Func<object, object>[] 
            { 
                (o) => ((Customer)o).Id,
                (o) => ((Customer)o).Name,
            };
        }

        [Fact]
        public void Should_return_true_if_all_keys_match()
        {
            comparer = new GridDataKeyComparer(dataKeys, new [] {"1" , "foo"});
            
            comparer.KeysEqualTo(customer).ShouldBeTrue();
        }        
        
        [Fact]
        public void Should_return_false_if_keys_dont_match()
        {
            comparer = new GridDataKeyComparer(dataKeys, new [] { "1", "bar" });
            
            comparer.KeysEqualTo(customer).ShouldBeFalse();
        }
        
        [Fact]
        public void Should_return_false_if_keys_are_less_than_values()
        {
            comparer = new GridDataKeyComparer(new Func<object, object>[] { (o) => ((Customer)o).Id }, new [] { "1", "foo" });

            comparer.KeysEqualTo(customer).ShouldBeFalse();
        }
        
        [Fact]
        public void Should_return_false_if_values_are_less_than_keys()
        {
            comparer = new GridDataKeyComparer(dataKeys, new[] { "1" });
            
            comparer.KeysEqualTo(customer).ShouldBeFalse();
        }        
        
        [Fact]
        public void Should_return_false_if_dataItem_is_null()
        {
            comparer = new GridDataKeyComparer(dataKeys, new [] { "1" });

            comparer.KeysEqualTo(null).ShouldBeFalse();
        }        
        
        [Fact]
        public void Should_return_false_if_dataKey_returns_null()
        {
            comparer = new GridDataKeyComparer(new Func<object, object>[] 
            { 
                (o) => null,
            }, new[] { "1" });

            comparer.KeysEqualTo(customer).ShouldBeFalse();
        }
    }

}
