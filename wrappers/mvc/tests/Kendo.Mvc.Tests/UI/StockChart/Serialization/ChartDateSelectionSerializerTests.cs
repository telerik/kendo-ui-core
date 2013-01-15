namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using System;

    public class ChartDateSelectionSerializerTests
    {
        private readonly ChartDateSelection selection;
        private readonly ChartDateSelectionSerializer serializer;

        public ChartDateSelectionSerializerTests()
        {
            selection = new ChartDateSelection();
            serializer = new ChartDateSelectionSerializer(selection);
        }

        [Fact]
        public void Should_serialize_From()
        {
            selection.From = new DateTime(2012, 1, 1);
            serializer.Serialize()["from"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Should_not_serialize_From_if_not_set()
        {
            serializer.Serialize().ContainsKey("from").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_To()
        {
            selection.To = new DateTime(2012, 1, 1);
            serializer.Serialize()["to"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Should_not_serialize_To_if_not_set()
        {
            serializer.Serialize().ContainsKey("to").ShouldBeFalse();
        }
    }
}