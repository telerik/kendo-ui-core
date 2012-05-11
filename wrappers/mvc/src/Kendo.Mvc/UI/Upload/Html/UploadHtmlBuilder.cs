using System.Web.Mvc;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Html
{
    /// <summary>
    /// An HTML Builder for the Upload component
    /// </summary>
    public class UploadHtmlBuilder : HtmlBuilderBase
    {
        private readonly Upload upload;

        /// <summary>
        /// Initializes a new instance of the <see cref="UploadHtmlBuilder" /> class.
        /// </summary>
        /// <param name="component">The Upload component.</param>
        public UploadHtmlBuilder(Upload component)
        {
            upload = component;
        }

        public IHtmlNode CreateUpload()
        {
            var element = new HtmlElement("input", TagRenderMode.SelfClosing);
            var attributes = new Dictionary<string, object>
            {   { "type", "file" },
                { "name", upload.Name },
                { "id", upload.Id }
            };

            foreach (var attr in upload.HtmlAttributes)
            {
                attributes[attr.Key] = attr.Value;
            }

            element.Attributes(attributes);

            return element;
        }

        /// <summary>
        /// Builds the Upload component markup.
        /// </summary>
        /// <returns></returns>
        protected override IHtmlNode BuildCore()
        {
            return CreateUpload();
        }
    }
}
