// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Tests
{
    using Xunit;

    public class PathHelperTests
    {
        [Fact]
        public void Should_be_able_to_combine_path()
        {
            string path = PathHelper.CombinePath("~/scripts/", "/script.js");

            Assert.Equal("~/scripts/script.js", path);
        }
    }
}