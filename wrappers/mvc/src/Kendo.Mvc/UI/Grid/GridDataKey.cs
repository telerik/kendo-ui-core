namespace Kendo.Mvc.UI
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
        public string HiddenFieldHtml(HtmlHelper<TModel> htmlHelper)
        {
            return htmlHelper.HiddenFor(Expression, new { id = "" }).ToString();
        }
    }
}
