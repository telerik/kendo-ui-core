namespace Kendo.Mvc.UI
{
    using System.Web.Mvc;
    using System.Web.UI;
    using Extensions;
    using Infrastructure;

    public class NavigationItemImageRenderer<T> where T : NavigationItem<T>
    {
        public NavigationItemImageRenderer(HtmlTextWriter writer, ViewContext viewContext)
        {
            
            Writer = writer;
            ViewContext = viewContext;
        }

        protected HtmlTextWriter Writer
        {
            get;
            private set;
        }

        protected ViewContext ViewContext
        {
            get;
            private set;
        }

        public void WriteImage(T item)
        {

            if (!string.IsNullOrEmpty(item.ImageUrl))
            {
                Writer.AddAttribute(HtmlTextWriterAttribute.Src, item.GetImageUrl(ViewContext), true);
                item.ImageHtmlAttributes.Merge("alt", string.Empty, false);
                item.ImageHtmlAttributes.Merge("class", UIPrimitives.Image, false);
                Writer.AddAttributes(item.ImageHtmlAttributes);
                Writer.RenderBeginTag(HtmlTextWriterTag.Img);
                Writer.RenderEndTag();
            }
        }

        public void WriteSprite(T item)
        {

            if (!string.IsNullOrEmpty(item.SpriteCssClasses))
            {
                Writer.AddAttribute(HtmlTextWriterAttribute.Class, 
                                    "{0} {1}".FormatWith(UIPrimitives.Sprite, item.SpriteCssClasses),
                                    false);

                Writer.RenderBeginTag(HtmlTextWriterTag.Span);
                Writer.RenderEndTag();
            }
        }
    }
}