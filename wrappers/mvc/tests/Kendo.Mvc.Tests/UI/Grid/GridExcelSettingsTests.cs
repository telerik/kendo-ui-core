namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class GridExcelSettingsTests
    {
        private readonly GridExcelSettings excel;

        public GridExcelSettingsTests()
        {
            excel = new GridExcelSettings();
        }

        [Fact]
        public void Serializes_forceProxy()
        {
            excel.ForceProxy = true;
            excel.ToJson()["forceProxy"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_forceProxy()
        {
            excel.ToJson().ContainsKey("forceProxy").ShouldBeFalse();
        }
    }
}