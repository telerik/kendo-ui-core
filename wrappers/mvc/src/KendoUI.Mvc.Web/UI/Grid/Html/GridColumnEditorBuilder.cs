#if MVC2 || MVC3
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;

    class GridColumnEditorBuilder<TModel> where TModel : class
    {
        private readonly HtmlHelper<TModel> htmlHelper;

        public GridColumnEditorBuilder(HtmlHelper<TModel> htmlHelper)
        {
            this.htmlHelper = htmlHelper;
        }

        public string GetEditor<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            var validation = htmlHelper.ValidationMessageFor(expression);
            return htmlHelper.EditorFor(expression).ToHtmlString() + validation ?? string.Empty;
        }

        public string GetEditor(string memberName, string templateName)
        {
            var validation = htmlHelper.ValidationMessage(memberName);
            return htmlHelper.Editor(memberName, templateName).ToHtmlString() + validation ?? string.Empty;
        } 

        public string GetEditorForModel()
        {
            return htmlHelper.EditorForModel().ToHtmlString();
        }

        public string GetEditorForModel(string templateName)
        {
            return htmlHelper.EditorForModel(templateName).ToHtmlString();
        }
    }
}
#endif