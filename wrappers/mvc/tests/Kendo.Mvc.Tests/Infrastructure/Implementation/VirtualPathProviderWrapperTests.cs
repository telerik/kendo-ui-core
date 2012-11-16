namespace Kendo.Mvc.Infrastructure.Implementation.Tests
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
            string directory = provider.GetDirectory("~/Content/site.css");

            Assert.Equal("~/Content/", directory);
        }

        [Fact]
        public void CombinePaths_should_return_combined_path()
        {
            string path = provider.CombinePaths("~/Content/", "site.css");

            Assert.Equal("~/Content/site.css", path);
        }
    }
}
