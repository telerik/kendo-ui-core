// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
#if MVC2 || MVC3
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;
    using Extensions;

    public class GridEditorForCellBuilder<TModel, TValue> : GridDataCellBuilderBase
             where TModel : class
    {
        public Expression<Func<TModel, TValue>> Expression
        {
            get;
            set;
        }

        public object AdditionalViewData
        {
            get;
            set;
        }

        public ViewContext ViewContext
        {
            get;
            set;
        }

        public string TemplateName
        {
            get;
            set;
        }

        public string Member
        {
            get;
            set;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            var htmlHelper = new HtmlHelper<TModel>(ViewContext, new GridViewDataContainer<TModel>((TModel)dataItem, ViewContext.ViewData));

            AppendEditor(td, htmlHelper);

            AppendValidator(td, htmlHelper);
        }

        private void AppendEditor(IHtmlNode container, HtmlHelper<TModel> htmlHelper)
        {
            if (TemplateName.HasValue())
            {
                AppendEditorTemplate(htmlHelper, container);
            }
            else
            {
                AppendEditorFor(htmlHelper, container);
            }
        }

        private void AppendEditorFor(HtmlHelper<TModel> htmlHelper, IHtmlNode container)
        {
            var editor = htmlHelper.EditorFor(Expression, AdditionalViewData);

            if (editor != null)
            {
                container.Children.Add(new LiteralNode(editor.ToHtmlString()));
            }
        }

        private void AppendEditorTemplate(HtmlHelper<TModel> htmlHelper, IHtmlNode container)
        {
            var editor = htmlHelper.Editor(Member, TemplateName, AdditionalViewData);

            if (editor != null)
            {
                container.Children.Add(new LiteralNode(editor.ToHtmlString()));
            }
        }

        private void AppendValidator(IHtmlNode container, HtmlHelper<TModel> htmlHelper)
        {
            if (TemplateName.HasValue() && (typeof(TModel).IsDataRow() 
#if MVC3
                || typeof(TModel).IsDynamicObject()
#endif
                ))
            {
                AppendValidatorForTemplate(htmlHelper, container);
            }
            else
            {
                AppendValidatorFor(htmlHelper, container);
            }
        }

        private void AppendValidatorForTemplate(HtmlHelper<TModel> htmlHelper, IHtmlNode container)
        {
            var message = htmlHelper.ValidationMessage(Member);

            if (message != null)
            {
                container.Children.Add(new LiteralNode(message.ToHtmlString()));
            }
        }

        private void AppendValidatorFor(HtmlHelper<TModel> htmlHelper, IHtmlNode container)
        {
            var validator = htmlHelper.ValidationMessageFor(Expression);

            if (validator != null)
            {
                container.Children.Add(new LiteralNode(validator.ToHtmlString()));
            }
        }
    }
}
#endif