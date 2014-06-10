namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Moq;
    using System.IO;
    using System.Web.UI;
    using Xunit;

    public class PivotGridBuilderTests
    {
        private readonly PivotGrid pivotGrid;
        private readonly PivotGridBuilder builder;

        public PivotGridBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            pivotGrid = PivotGridTestHelper.CreatePivotGrid(writer.Object);
            builder = new PivotGridBuilder(pivotGrid);
        }

        [Fact]
        public void AutoBind_sets_the_corresponding_property()
        {
            builder.AutoBind(false);
            Assert.False(pivotGrid.AutoBind);
        }
    }
}
