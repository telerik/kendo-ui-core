namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System.Collections;
    using Xunit;
    using System.Collections.Generic;

    public class ChartCategoryAxisSerializerTests
    {
        private readonly Mock<IChartCategoryAxis> axisMock;
        private readonly ChartCategoryAxisSerializer serializer;

        public ChartCategoryAxisSerializerTests()
        {
            axisMock = new Mock<IChartCategoryAxis>();
            serializer = new ChartCategoryAxisSerializer(axisMock.Object);

            axisMock.SetupGet(a => a.MajorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MinorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MajorTicks).Returns(new ChartAxisTicks());
            axisMock.SetupGet(a => a.MinorTicks).Returns(new ChartAxisTicks());
            axisMock.SetupGet(a => a.Line).Returns(new ChartLine());
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels());
            axisMock.SetupGet(a => a.PlotBands).Returns(new List<ChartPlotBand>());
            axisMock.SetupGet(a => a.Title).Returns(new ChartAxisTitle());
        }

        [Fact]
        public void Should_serialize_categories()
        {
            axisMock.SetupGet(a => a.Categories).Returns(new string[] { "A", "B" });
            (serializer.Serialize()["categories"] is IEnumerable).ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_field()
        {
            axisMock.SetupGet(a => a.Member).Returns("RepName");
            axisMock.SetupGet(a => a.Categories).Returns((IEnumerable)null);
            serializer.Serialize()["field"].ShouldEqual("RepName");
        }

        [Fact]
        public void Should_not_serialize_field_if_not_set()
        {
            axisMock.SetupGet(a => a.Member).Returns((string)null);
            axisMock.SetupGet(a => a.Categories).Returns((IEnumerable)null);
            serializer.Serialize().ContainsKey("field").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_field_if_has_categories()
        {
            axisMock.SetupGet(a => a.Member).Returns("RepName");
            axisMock.SetupGet(a => a.Categories).Returns(new string[] { "A", "B" });
            serializer.Serialize().ContainsKey("field").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_majorGridLines_if_not_set()
        {
            serializer.Serialize().ContainsKey("majorGridLines").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_majorGridLines_if_set()
        {
            axisMock.SetupGet(a => a.MajorGridLines).Returns(
                new ChartLine(1, "white", ChartDashType.Dot, true)
            );

            serializer.Serialize().ContainsKey("majorGridLines").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_minorGridLines_if_not_set()
        {
            serializer.Serialize().ContainsKey("minorGridLines").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_minorGridLines_if_set()
        {
            axisMock.SetupGet(a => a.MinorGridLines).Returns(
                new ChartLine(1, "white", ChartDashType.Dot, true)
            );

            serializer.Serialize().ContainsKey("minorGridLines").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_labels_if_not_set()
        {
            serializer.Serialize().ContainsKey("labels").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_labels_if_set()
        {
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels() { Color = "Red" });

            serializer.Serialize().ContainsKey("labels").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_visible_if_set()
        {
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels() { Visible = false });

            serializer.Serialize().ContainsKey("visible").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_PlotBands_if_not_set()
        {
            serializer.Serialize().ContainsKey("plotBands").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_PlotBands_if_set()
        {
            var data = new List<ChartPlotBand>();
            data.Add(new ChartPlotBand() { Color = "red" });
            axisMock.SetupGet(a => a.PlotBands).Returns(data);

            serializer.Serialize().ContainsKey("plotBands").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_Title_if_not_set()
        {
            serializer.Serialize().ContainsKey("title").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Title_if_set()
        {
            axisMock.SetupGet(a => a.Title).Returns(new ChartAxisTitle() { Color = "Red" });

            serializer.Serialize().ContainsKey("title").ShouldBeTrue();
        }
    }
}