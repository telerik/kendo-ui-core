namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class GaugeRadialScaleSerializerTests
    {
        private readonly Mock<IRadialScale<double>> scaleMock;
        private readonly GaugeRadialScaleSerializer<double> serializer;

        public GaugeRadialScaleSerializerTests()
        {
            scaleMock = new Mock<IRadialScale<double>>();
            serializer = new GaugeRadialScaleSerializer<double>(scaleMock.Object);

            scaleMock.SetupGet(a => a.Labels).Returns(new GaugeScaleLabels());
            scaleMock.SetupGet(a => a.Ranges).Returns(new List<GaugeScaleRanges>());
            scaleMock.SetupGet(a => a.MajorTicks).Returns(new GaugeScaleTicks());
            scaleMock.SetupGet(a => a.MinorTicks).Returns(new GaugeScaleTicks());
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