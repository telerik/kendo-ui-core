// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions.Tests
{
    using System.Collections.Generic;

    using Xunit;

    public class CollectionExtensionsTests
    {
        [Fact]
        public void AddRange_should_add_specified_items()
        {
            IList<int> collection = new List<int> { 1, 2, 3 };

            collection.AddRange(new[] { 4, 5 });

            Assert.Contains(4, collection);
            Assert.Contains(5, collection);
        }
    }
}