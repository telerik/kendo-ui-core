namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Moq;
    using Xunit;

    public class EditorInsertImageToolTests
    {
        [Fact]
        public void Should_seriallize_select_url()
        {
            var imageTool = new EditorFileBrowserSettings(new Mock<IScriptableComponent>().Object)
            {
                                    Select =
                                        {
                                            ActionName = "Bar",
                                            ControllerName = "Baz"
                                        }
                                };

            var objectWriter = new Mock<IClientSideObjectWriter>();
            imageTool.SerializeTo("foo", objectWriter.Object, new Mock<IEditorUrlBuilder>().Object);

            objectWriter.Verify(w => w.AppendObject("foo", It.IsAny<Dictionary<string, string>>()), Times.Once());
        }
    }
}