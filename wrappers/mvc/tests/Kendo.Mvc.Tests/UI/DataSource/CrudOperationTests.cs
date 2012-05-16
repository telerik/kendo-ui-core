namespace Kendo.Mvc.Tests
{
    using Kendo.Mvc.UI;
    using Xunit;
    using Moq;
    using System.Web.Mvc;

    public class CrudOperationTests
    {
        [Fact]
        public void ToJson_serialize_url()
        {
            const string expected = "bar/foo?baz=baz";         
            var operation = new CrudOperation();

            operation.Url = expected;

            var result = operation.ToJson();

            result["url"].ShouldEqual(expected);
        }

        [Fact]
        public void ToJson_does_not_serialize_url_if_not_set()
        {            
            var operation = new CrudOperation();        

            var result = operation.ToJson();

            result.ContainsKey("url").ShouldBeFalse();
        }
    }
}
