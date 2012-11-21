namespace Kendo.Mvc.UI.Tests
{
    using System.Linq;
    using Moq;
    using Xunit;
    using System.Collections.Generic;
    using System;

    public class ChartDateAxisSerializerTests
    {
        private readonly Mock<IChartDateAxis> axisMock;
        private readonly ChartDateAxisSerializer serializer;

        public ChartDateAxisSerializerTests()
        {
            axisMock = new Mock<IChartDateAxis>();
            serializer = new ChartDateAxisSerializer(axisMock.Object);

            axisMock.SetupGet(a => a.MajorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MinorGridLines).Returns(new ChartLine());
            axisMock.SetupGet(a => a.MajorTicks).Returns(new ChartAxisTicks());
            axisMock.SetupGet(a => a.MinorTicks).Returns(new ChartAxisTicks());
            axisMock.SetupGet(a => a.Line).Returns(new ChartLine());
            axisMock.SetupGet(a => a.Labels).Returns(new ChartAxisLabels());
            axisMock.SetupGet(a => a.PlotBands).Returns(new List<ChartPlotBand<DateTime>>());
            axisMock.SetupGet(a => a.Title).Returns(new ChartAxisTitle());
        }

        [Fact]
        public void Should_serialize_Min()
        {
            axisMock.SetupGet(a => a.Min).Returns(new DateTime(2012, 1, 1));
            serializer.Serialize()["min"].ShouldEqual(new DateTime(2012, 1, 1));
        }

        [Fact]
        public void Should_not_serialize_Min_if_not_set()
        {
            axisMock.SetupGet(a => a.Min).Returns((DateTime?)null);
            serializer.Serialize().ContainsKey("min").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Max()
        {
            axisMock.SetupGet(a => a.Max).Returns(new DateTime(2012, 1, 1));
            serializer.Serialize()["max"].ShouldEqual(new DateTime(2012, 1, 1));
        }

        [Fact]
        public void Should_not_serialize_Max_if_not_set()
        {
            axisMock.SetupGet(a => a.Max).Returns((DateTime?)null);
            serializer.Serialize().ContainsKey("max").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_BaseUnit()
        {
            axisMock.SetupGet(a => a.BaseUnit).Returns(ChartAxisBaseUnit.Fit);
            serializer.Serialize()["baseUnit"].ShouldEqual("fit");
        }

        [Fact]
        public void Should_not_serialize_BaseUnit_if_not_set()
        {
            axisMock.SetupGet(a => a.BaseUnit).Returns((ChartAxisBaseUnit?)null);
            serializer.Serialize().ContainsKey("baseUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_AxisCrossingValues()
        {
            axisMock.SetupGet(a => a.AxisCrossingValues).Returns(new DateTime[]{ new DateTime(2012, 1, 1) });
            serializer.Serialize()["axisCrossingValue"].ShouldEqual(new string[] { "2012/01/01 00:00:00" });
        }

        [Fact]
        public void Should_not_serialize_AxisCrossingValue_if_not_set()
        {
            axisMock.SetupGet(a => a.AxisCrossingValues).Returns(new DateTime[] { });
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
            var data = new List<ChartPlotBand<DateTime>>();
            data.Add(new ChartPlotBand<DateTime>() { Color = "red" });
            axisMock.SetupGet(a => a.PlotBands).Returns(data);

            serializer.Serialize().ContainsKey("plotBands").ShouldBeTrue();
        }
    }
}