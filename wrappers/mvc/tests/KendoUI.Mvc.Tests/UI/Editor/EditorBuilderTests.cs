namespace Telerik.Web.Mvc.UI.Tests
{
    using Telerik.Web.Mvc.UI.Fluent;

    public class EditorBuilderTests
    {
        private readonly Editor editor;
        private readonly EditorBuilder builder;

        public EditorBuilderTests()
        {
            editor = EditorTestHelper.CreateEditor();
            builder = new EditorBuilder(editor);
        }

        //[Fact]
        //public void Effects_creates_fx_factory()
        //{
        //    var fxFacCreated = false;

        //    builder.Effects(fx =>
        //    {
        //        fxFacCreated = fx != null;
        //    });

        //    Assert.True(fxFacCreated);
        //}
    }
}