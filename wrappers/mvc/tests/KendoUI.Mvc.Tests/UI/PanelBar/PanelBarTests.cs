
namespace Telerik.Web.Mvc.UI.UnitTest.PanelBar
{
    using System.IO;
    using System.Web.UI;

    using Moq;
    using Xunit;
    using PanelBar = Telerik.Web.Mvc.UI.PanelBar;

    public class PanelBarTests
    {
        private readonly PanelBar panelBar;

        public PanelBarTests()
        {
            //consider if we need this tests. !!!!
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            panelBar = PanelBarTestHelper.CretePanelBar(writer.Object, null);
        }

        [Fact]
        public void New_object_should_set_UrlGenerator()
        {
            Assert.NotNull(panelBar.Generator);
        }

        [Fact]
        public void New_object_should_set_slideInAnimationDuration()
        {
            Assert.NotEqual(0, panelBar.SlideInAnimationDuration);
        }

        [Fact]
        public void New_object_should_set_SlideOutAnimationDuration()
        {

            Assert.NotEqual(0, panelBar.SlideOutAnimationDuration);

        }

        [Fact]
        public void New_object_should_set_INavigationItemAuthorization()
        {
            Assert.NotNull(panelBar.Authorization);
        }

        [Fact]
        public void New_object_should_set_Items()
        {
            Assert.NotNull(panelBar.Items);
        }


    }
}
