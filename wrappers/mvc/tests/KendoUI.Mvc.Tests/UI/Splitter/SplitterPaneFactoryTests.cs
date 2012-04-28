namespace KendoUI.Mvc.UI.Tests
{
    using KendoUI.Mvc.UI.Fluent;
    using Xunit;

    public class SplitterPaneFactoryTests
    {
        private readonly Splitter splitter;
        private readonly SplitterPaneFactory factory;

        public SplitterPaneFactoryTests()
        {
            splitter = SplitterTestHelper.CreateSplitter();
            factory = new SplitterPaneFactory(splitter, splitter.ViewContext);
        }

        [Fact]
        public void Add_adds_pane_to_splitter()
        {
            factory.Add();

            Assert.Equal(1, splitter.Panes.Count);
        }

        [Fact]
        public void Add_returns_SplitterPaneBuilder()
        {
            Assert.IsType<SplitterPaneBuilder>(factory.Add());
        }
    }
}