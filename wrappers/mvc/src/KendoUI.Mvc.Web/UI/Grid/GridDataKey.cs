// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Linq.Expressions;
    using System.Web.Mvc;
    using System.Web.Mvc.Html;

    using Extensions;

    public class GridDataKey<TModel, TValue> : IGridDataKey<TModel>
        where TModel : class
    {
        public GridDataKey(Expression<Func<TModel, TValue>> expression)
        {
            RouteKey = "id";

            Expression = expression;
            Name = expression.MemberWithoutInstance();
            Value = expression.Compile();
        }

        public string Name
        {
            get;
            private set;
        }

        public string RouteKey
        {
            get;
            set;
        }

        public Func<TModel, TValue> Value
        {
            get;
            private set;
        }

        public Expression<Func<TModel, TValue>> Expression
        {
            get;
            private set;
        }
        
        public object GetValue(object dataItem)
        {
            return Value((TModel)dataItem);
        }
#if MVC2 || MVC3
        public string HiddenFieldHtml(HtmlHelper<TModel> htmlHelper)
        {
            return htmlHelper.HiddenFor(Expression, new { id = "" }).ToString();
        }
#endif
    }
}
