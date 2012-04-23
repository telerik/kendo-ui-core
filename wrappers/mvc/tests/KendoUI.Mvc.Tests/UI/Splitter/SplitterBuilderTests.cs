

namespace KendoUI.Mvc.UI.Tests
{
    using KendoUI.Mvc.UI.Fluent;
    using Xunit;

    public class SplitterBuilderTests
    {
        private readonly Splitter splitter;
        private readonly SplitterBuilder builder;

        public SplitterBuilderTests()
        {
            splitter = SplitterTestHelper.CreateSplitter();
            builder = new SplitterBuilder(splitter);
        }

        [Fact]
        public void Orientation_sets_component_orientation()
        {
            builder.Orientation(SplitterOrientation.Vertical);

            Assert.Equal(splitter.Orientation, SplitterOrientation.Vertical);
        }

        [Fact]
        public void Orientation_should_return_builder()
        {
            Assert.IsType<SplitterBuilder>(builder.Orientation(SplitterOrientation.Horizontal));
        }
    }
}