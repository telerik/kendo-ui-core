namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartSpacingSerializerTests
    {
        private readonly ChartSpacing margin;

        public ChartSpacingSerializerTests()
        {
            margin = new ChartSpacing();
        }

        [Fact]
        public void Serializes_Top()
        {
            margin.Top = 10;
            GetJson()["top"].ShouldEqual(10);
        }

        [Fact]
        public void Serializes_right()
        {
            margin.Right = 10;
            GetJson()["right"].ShouldEqual(10);
        }

        [Fact]
        public void Serializes_bottom()
        {
            margin.Bottom = 10;
            GetJson()["bottom"].ShouldEqual(10);
        }

        [Fact]
        public void Serializes_left()
        {
            margin.Left = 10;
            GetJson()["left"].ShouldEqual(10);
        }

        private IDictionary<string, object> GetJson()
        {
            return margin.CreateSerializer().Serialize();
        }
    }
}