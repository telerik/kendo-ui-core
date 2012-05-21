namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Xunit;
    using System.Collections.Generic;

    public class GaugeLinearScaleSerializerTests
    {
        private readonly Mock<ILinearScale> scaleMock;
        private readonly GaugeLinearScaleSerializer serializer;

        public GaugeLinearScaleSerializerTests()
        {
            scaleMock = new Mock<ILinearScale>();
            serializer = new GaugeLinearScaleSerializer(scaleMock.Object);

            scaleMock.SetupGet(a => a.Labels).Returns(new GaugeScaleLabels());
            scaleMock.SetupGet(a => a.Ranges).Returns(new List<GaugeScaleRanges>());
            scaleMock.SetupGet(a => a.MajorTicks).Returns(new GaugeScaleTicks());
            scaleMock.SetupGet(a => a.MinorTicks).Returns(new GaugeScaleTicks());
        }

        [Fact]
        public void Should_serialize_Mirror()
        {
            scaleMock.SetupGet(a => a.Mirror).Returns(true);
            serializer.Serialize()["mirror"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_default_Mirror()
        {
            scaleMock.SetupGet(a => a.Mirror).Returns((bool?)null);
            serializer.Serialize().ContainsKey("mirror").ShouldBeFalse();
        }
    }
}