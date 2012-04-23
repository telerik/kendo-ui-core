// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Fluent;
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