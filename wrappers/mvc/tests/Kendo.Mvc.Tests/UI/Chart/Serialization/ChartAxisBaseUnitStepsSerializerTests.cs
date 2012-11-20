namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartAxisBaseUnitStepsSerializerTests
    {
        private readonly ChartAxisBaseUnitSteps baseUnitSteps;

        public ChartAxisBaseUnitStepsSerializerTests()
        {
            baseUnitSteps = new ChartAxisBaseUnitSteps();
        }

        [Fact]
        public void Serializes_minutes()
        {
            baseUnitSteps.Minutes = new int[] { 1, 2 };
            GetJson()["minutes"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Does_not_serialize_default_minutes()
        {
            GetJson().ContainsKey("minutes").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_hours()
        {
            baseUnitSteps.Hours = new int[] { 1, 2 };
            GetJson()["hours"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Does_not_serialize_default_hours()
        {
            GetJson().ContainsKey("hours").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_days()
        {
            baseUnitSteps.Days = new int[] { 1, 2 };
            GetJson()["days"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Does_not_serialize_default_days()
        {
            GetJson().ContainsKey("days").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_weeks()
        {
            baseUnitSteps.Weeks = new int[] { 1, 2 };
            GetJson()["weeks"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Does_not_serialize_default_weeks()
        {
            GetJson().ContainsKey("weeks").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_months()
        {
            baseUnitSteps.Months = new int[] { 1, 2 };
            GetJson()["months"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Does_not_serialize_default_months()
        {
            GetJson().ContainsKey("months").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_years()
        {
            baseUnitSteps.Years = new int[] { 1, 2 };
            GetJson()["years"].ShouldEqual(new int[] { 1, 2 });
        }

        [Fact]
        public void Does_not_serialize_default_years()
        {
            GetJson().ContainsKey("years").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return baseUnitSteps.CreateSerializer().Serialize();
        }
    }
}