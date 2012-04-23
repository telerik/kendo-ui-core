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
    using Telerik.Web.Mvc.Extensions;
    
    public class GridDisplayForCellBuilder<TModel, TValue> : GridDataCellBuilderBase
             where TModel : class
    {
        public Expression<Func<TModel, TValue>> Expression
        {
            get;
            set;
        }

        public ViewContext ViewContext
        {
            get;
            set;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            var htmlHelper = new HtmlHelper<TModel>(ViewContext, new GridViewDataContainer<TModel>((TModel)dataItem, ViewContext.ViewData));

            var content = htmlHelper.DisplayFor(Expression).ToHtmlString();

            content = content.HasValue() ? content : "&nbsp;";

            td.Html(content);
        }
    }
}
#endif