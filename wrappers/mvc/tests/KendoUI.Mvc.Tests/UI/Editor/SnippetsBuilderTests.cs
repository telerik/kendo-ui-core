namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.Collections.Generic;
    using Xunit;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.UI.Fluent;

    public class SnippetsBuilderTests
    {
        private readonly Mock<IVirtualPathProvider> pathProvider;
        private readonly EditorSnippetBuilder builder;
        private readonly IList<DropDownItem> container;
        private const string text = "text";
        private const string value = "value";

        public SnippetsBuilderTests()
        {
            pathProvider = new Mock<IVirtualPathProvider>();

            container = new List<DropDownItem>();

            pathProvider.Setup(p => p.FileExists(It.IsAny<string>())).Returns(true);

            builder = new EditorSnippetBuilder(container, pathProvider.Object);
        }

        [Fact]
        public void Add_should_add_items_in_container()
        {
            builder.Add(text, value);

            Assert.Equal(1, container.Count);
        }

        [Fact]
        public void Add_should_return_builder()
        {
            var returnedBuilder = builder.Add(text, value);

            Assert.IsType(typeof(EditorSnippetBuilder), returnedBuilder);
        }

        [Fact]
        public void AddFromFile_should_make_fileName_relative()
        {
            string expectedValue = "~/Content/value";

            pathProvider.Setup(p => p.ReadAllText(expectedValue)).Verifiable();

            builder.AddFromFile(text, value);

            pathProvider.Verify();
        }

        [Fact]
        public void AddFromFile_with_relative_should_return_fileName()
        {
            string expectedValue = "~/value";

            pathProvider.Setup(p => p.ReadAllText(expectedValue)).Verifiable();

            builder.AddFromFile(text, expectedValue);

            pathProvider.Verify();
        }

        [Fact]
        public void AddFromFile_should_return_builder()
        {
            var returnedBuilder = builder.Add(text, value);

            Assert.IsType(typeof(EditorSnippetBuilder), returnedBuilder);
        }
    }
}