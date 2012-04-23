namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class ChartNumericAxisSerializerTests
    {
        private readonly Mock<IChartNumericAxis> axisMock;
        private readonly ChartNumericAxisSerializer serializer;

        public ChartNumericAxisSerializerTests()
        {
            axisMock = new Mock<IChartNumericAxis>();
            serializer = new ChartNumericAxisSerializer(axisMock.Object);

            axisMock.SetupGet(a => a.MajorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MinorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.Line).Returns(new ChartLine());
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels());
            axisMock.SetupGet(a => a.PlotBands).Returns(new List<ChartPlotBand>());
            axisMock.SetupGet(a => a.Title).Returns(new ChartAxisTitle());
        }

        [Fact]
        public void Should_serialize_Min()
        {
            axisMock.SetupGet(a => a.Min).Returns(10);
            serializer.Serialize()["min"].ShouldEqual(10.0);
        }

        [Fact]
        public void Should_not_serialize_Min_if_not_set()
        {
            axisMock.SetupGet(a => a.Min).Returns((double?)null);
            serializer.Serialize().ContainsKey("min").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Max()
        {
            axisMock.SetupGet(a => a.Max).Returns(10);
            serializer.Serialize()["max"].ShouldEqual(10.0);
        }

        [Fact]
        public void Should_not_serialize_Max_if_not_set()
        {
            axisMock.SetupGet(a => a.Max).Returns((double?)null);
            serializer.Serialize().ContainsKey("max").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_MajorUnit()
        {
            axisMock.SetupGet(a => a.MajorUnit).Returns(10);
            serializer.Serialize()["majorUnit"].ShouldEqual(10.0);
        }

        [Fact]
        public void Should_not_serialize_MajorUnit_if_not_set()
        {
            axisMock.SetupGet(a => a.MajorUnit).Returns((double?)null);
            serializer.Serialize().ContainsKey("majorUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_AxisCrossingValues()
        {
            axisMock.SetupGet(a => a.AxisCrossingValues).Returns(new double [10]);
            serializer.Serialize()["axisCrossingValue"].ShouldEqual(new double[10]);
        }

        [Fact]
        public void Should_not_serialize_AxisCrossingValue_if_not_set()
        {
            axisMock.SetupGet(a => a.AxisCrossingValues).Returns(new double[] {});
            serializer.Serialize().ContainsKey("axisCrossingValues").ShouldBeFalse();
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
    }
}