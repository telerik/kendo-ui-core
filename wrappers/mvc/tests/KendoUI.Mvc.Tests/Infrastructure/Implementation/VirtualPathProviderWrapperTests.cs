// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System.Web;

    using Xunit;

    public class VirtualPathProviderWrapperTests
    {
        private readonly VirtualPathProviderWrapper provider;

        public VirtualPathProviderWrapperTests()
        {
            provider = new VirtualPathProviderWrapper();
        }

        [Fact]
        public void GetDirectory_should_return_the_directory_part_from_the_provided_path()
        {
            string directory = provider.GetDirectory("~/Content/site,css");

            Assert.Equal("~/Content/", directory);
        }

        [Fact]
        public void GetFile_should_return_the_file_part_from_the_provided_path()
        {
            Assert.Throws<HttpException>(() => provider.GetFile("~/Content/site,css"));
        }

        [Fact]
        public void CombinePaths_should_return_combined_path()
        {
            string path = provider.CombinePaths("~/Content/", "site.css");

            Assert.Equal("~/Content/site.css", path);
        }
    }
}