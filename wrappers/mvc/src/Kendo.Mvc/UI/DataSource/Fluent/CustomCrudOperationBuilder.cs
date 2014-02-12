namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    public class CustomCrudOperationBuilder : CrudOperationBuilderBase<CustomCrudOperationBuilder>, IHideObjectMembers
    {
        public CustomCrudOperationBuilder(CrudOperation operation, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(operation, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Sets the contentType option of the operation.
        /// </summary>
        /// <param name="type">contentType</param>        
        public CustomCrudOperationBuilder ContentType(string type)
        {
            operation.ContentType = type;

            return this;
        }

        /// <summary>
        /// Sets the cache option of the operation. If set to false, it will force requested pages not to be cached by the browser.
        /// </summary>
        /// <param name="isEnabled">Enable or disable the operation cache</param>
        public CustomCrudOperationBuilder Cache(bool isEnabled)
        {
            operation.Cache = isEnabled;

            return this;
        }

        /// <summary>
        /// Sets the dataType option of the operation.
        /// </summary>
        /// <param name="type">DataType of the operation</param>
        public CustomCrudOperationBuilder DataType(string type)
        {
            operation.DataType = type.ToLowerInvariant();

            return this;
        }
    }
}
