namespace KendoUI.Mvc.Infrastructure.Tests
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