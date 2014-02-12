namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI;
    using Xunit;

    public class CrudOperationTests
    {
        private CrudOperation crudOperation;
        private string url;

        public CrudOperationTests()
        {
            crudOperation = new CrudOperation();
            url = "/Home";
        }

        [Fact]
        public void Cache_option_is_correctly_serialized()
        {
            crudOperation.Url = url;
            crudOperation.Cache = false;

            var result = crudOperation.ToJson();

            result["cache"].ShouldEqual(false);
        }

        [Fact]
        public void Cache_option_is_not_serialized_when_not_set()
        {
            crudOperation.Url = url;

            var result = crudOperation.ToJson();

            result.ContainsKey("cache").ShouldBeFalse();
        }

        [Fact]
        public void ContentType_option_is_correctly_serialized()
        {
            crudOperation.Url = url;
            var contentType = "comeContentType";
            crudOperation.ContentType = contentType;

            var result = crudOperation.ToJson();

            result["contentType"].ShouldEqual(contentType);
        }

        [Fact]
        public void ContentType_option_is_not_serialized_when_not_set()
        {
            crudOperation.Url = url;

            var result = crudOperation.ToJson();

            result.ContainsKey("contentType").ShouldBeFalse();
        }


    }
}
