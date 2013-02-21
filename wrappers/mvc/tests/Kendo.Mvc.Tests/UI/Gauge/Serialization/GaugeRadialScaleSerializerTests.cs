namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class GaugeRadialScaleSerializerTests
    {
        private readonly Mock<IRadialScale> scaleMock;
        private readonly GaugeRadialScaleSerializer serializer;

        public GaugeRadialScaleSerializerTests()
        {
            scaleMock = new Mock<IRadialScale>();
            serializer = new GaugeRadialScaleSerializer(scaleMock.Object);

            scaleMock.SetupGet(a => a.Labels).Returns(new GaugeRadialScaleLabels());
            scaleMock.SetupGet(a => a.Ranges).Returns(new List<GaugeScaleRanges>());
            scaleMock.SetupGet(a => a.MajorTicks).Returns(new GaugeScaleTicks());
            scaleMock.SetupGet(a => a.MinorTicks).Returns(new GaugeScaleTicks());
            scaleMock.SetupGet(a => a.Line).Returns(new ChartLine());
        }

        [Fact]
        public void Should_serialize_labels()
        {
            scaleMock.SetupGet(a => a.Labels).Returns(new GaugeRadialScaleLabels { Color = "red" });
            serializer.Serialize().ContainsKey("labels").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_StartAngle()
        {
            scaleMock.SetupGet(a => a.StartAngle).Returns(1.1);
            serializer.Serialize()["startAngle"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_StartAngle()
        {
            scaleMock.SetupGet(a => a.StartAngle).Returns((double?)null);
            serializer.Serialize().ContainsKey("startAngle").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_EndAngle()
        {
            scaleMock.SetupGet(a => a.EndAngle).Returns(1.1);
            serializer.Serialize()["endAngle"].ShouldEqual(1.1);
        }

        [Fact]
        public void Should_not_serialize_default_EndAngle()
        {
            scaleMock.SetupGet(a => a.EndAngle).Returns((double?)null);
            serializer.Serialize().ContainsKey("endAngle").ShouldBeFalse();
        }
    }
}