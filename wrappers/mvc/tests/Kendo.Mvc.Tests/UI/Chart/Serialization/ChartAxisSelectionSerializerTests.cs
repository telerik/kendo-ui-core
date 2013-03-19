namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;
    using System;

    public class ChartAxisSelectionSerializerTests
    {
        private readonly ChartAxisSelection selection;

        public ChartAxisSelectionSerializerTests()
        {
            selection = new ChartAxisSelection();
        }

        [Fact]
        public void Serializes_from_date()
        {
            selection.From = new DateTime(2012, 1, 1);
            GetJson()["from"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Serializes_from_index()
        {
            selection.From = 1;
            GetJson()["from"].ShouldEqual(1);
        }

        [Fact]
        public void Does_not_serialize_default_from()
        {
            GetJson().ContainsKey("from").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_to_date()
        {
            selection.To = new DateTime(2012, 1, 1);
            GetJson()["to"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Serializes_to_index()
        {
            selection.To = 1;
            GetJson()["to"].ShouldEqual(1);
        }

        [Fact]
        public void Does_not_serialize_default_to()
        {
            GetJson().ContainsKey("to").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_mousewheel_when_set()
        {
            selection.Mousewheel = new ChartSelectionMousewheel { Reverse = true };
            GetJson().ContainsKey("mousewheel").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_mousewheel()
        {
            GetJson().ContainsKey("mousewheel").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return selection.CreateSerializer().Serialize();
        }
    }
}