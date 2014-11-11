namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class PDFSettingsTests
    {
        private readonly PDFSettings pdf;

        public PDFSettingsTests()
        {
            pdf = new PDFSettings();
        }

        [Fact]
        public void Serializes_forceProxy()
        {
            pdf.ForceProxy = true;
            pdf.ToJson()["forceProxy"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_forceProxy()
        {
            pdf.ToJson().ContainsKey("forceProxy").ShouldBeFalse();
        }
    }
}