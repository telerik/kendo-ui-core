namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class GaugeScaleSerializerBaseTests
    {
        private readonly Mock<IGaugeScale> scaleMock;
        private readonly GaugeScaleSerializerBase serializer;

        public GaugeScaleSerializerBaseTests()
        {
            scaleMock = new Mock<IGaugeScale>();
            scaleMock.SetupGet(scale => scale.MinorTicks).Returns(new GaugeScaleTicks());
            scaleMock.SetupGet(scale => scale.MajorTicks).Returns(new GaugeScaleTicks());
            scaleMock.SetupGet(a => a.Ranges).Returns(new List<GaugeScaleRanges>());
            serializer = new GaugeScaleSerializerBase(scaleMock.Object);
            scaleMock.SetupGet(a => a.Line).Returns(new ChartLine());
        }

        [Fact]
        public void Should_serialize_MajorUnit()
        {
            scaleMock.SetupGet(a => a.MajorUnit).Returns(1.1);
            serializer.Serialize()["majorUnit"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_MajorUnit()
        {
            scaleMock.SetupGet(a => a.MajorUnit).Returns((double?)null);
            serializer.Serialize().ContainsKey("majorUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_MinorUnit()
        {
            scaleMock.SetupGet(a => a.MinorUnit).Returns(1.1);
            serializer.Serialize()["minorUnit"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_MinorUnit()
        {
            scaleMock.SetupGet(a => a.MinorUnit).Returns((double?)null);
            serializer.Serialize().ContainsKey("minorUnit").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Min()
        {
            scaleMock.SetupGet(a => a.Min).Returns(1.1);
            serializer.Serialize()["min"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_Min()
        {
            scaleMock.SetupGet(a => a.Min).Returns((double?)null);
            serializer.Serialize().ContainsKey("min").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Max()
        {
            scaleMock.SetupGet(a => a.Max).Returns(1.1);
            serializer.Serialize()["max"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_Max()
        {
            scaleMock.SetupGet(a => a.Max).Returns((double?)null);
            serializer.Serialize().ContainsKey("max").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_minorTicks()
        {
            scaleMock.SetupGet(a => a.MinorTicks).Returns(new GaugeScaleTicks { Color = "red" });
            serializer.Serialize().ContainsKey("minorTicks").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_minorTicks()
        {
            serializer.Serialize().ContainsKey("minorTicks").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_majorTicks()
        {
            scaleMock.SetupGet(a => a.MajorTicks).Returns(new GaugeScaleTicks { Color = "red" });
            serializer.Serialize().ContainsKey("majorTicks").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_majorTicks()
        {
            serializer.Serialize().ContainsKey("majorTicks").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_ranges()
        {
            var data = new List<GaugeScaleRanges>();
            data.Add(new GaugeScaleRanges() { Color = "red" });
            scaleMock.SetupGet(a => a.Ranges).Returns(data);

            serializer.Serialize().ContainsKey("ranges").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_ranges()
        {
            serializer.Serialize().ContainsKey("ranges").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_default_labels()
        {
            serializer.Serialize().ContainsKey("labels").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Reverse()
        {
            scaleMock.SetupGet(a => a.Reverse).Returns(true);
            serializer.Serialize()["reverse"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_default_Reverse()
        {
            scaleMock.SetupGet(a => a.Reverse).Returns((bool?)null);
            serializer.Serialize().ContainsKey("reverse").ShouldBeFalse();
        }
    }
}