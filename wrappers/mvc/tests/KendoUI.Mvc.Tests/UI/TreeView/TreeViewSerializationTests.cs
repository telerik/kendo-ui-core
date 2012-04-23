namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class TreeViewSerializationTests
    {
        private readonly TreeView treeview;
        private Mock<TextWriter> textWriter;
        private string output;

        public TreeViewSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            var treeViewId = "myTreeView";
            treeview = TreeViewTestHelper.CreateTreeView(
                new Mock<HtmlTextWriter>(TextWriter.Null).Object,
                null,
                new ClientSideObjectWriter(treeViewId, "tTreeView", textWriter.Object)
            );
            treeview.Name = treeViewId;
        }

        [Fact]
        public void Treeview_serializes_cleanly_when_used_with_default_settings()
        {
            treeview.WriteInitializationScript(textWriter.Object);

            Assert.Equal("jQuery('#myTreeView').tTreeView();", output);
        }
    }
}
