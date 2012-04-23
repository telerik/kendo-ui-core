// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Fluent;
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