namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Resources;

    public class ChartRangeBarSeries<TModel, TValue, TCategory> : ChartBarSeriesBase<TModel, TValue, TCategory>, IChartRangeBarSeries where TModel : class
    {
        public ChartRangeBarSeries(
            Expression<Func<TModel, TValue>> fromExpression,
            Expression<Func<TModel, TValue>> toExpression,
            Expression<Func<TModel, TCategory>> categoryExpression)
            : base(toExpression, null, categoryExpression, null)
        {
            FromField = fromExpression.MemberWithoutInstance();

            ToField = toExpression.MemberWithoutInstance();
        }

        public ChartRangeBarSeries(IEnumerable data)
            : base(data)
        { 
        }

        public ChartRangeBarSeries() : base()
        { 
        }

        public override IChartSerializer CreateSerializer()
        {
            return new ChartRangeBarSeriesSerializer(this);
        }

        public string FromField
        {
            get;
            set;
        }

        public string ToField
        {
            get;
            set;
        }

        public CategoricalErrorBars ErrorBars
        {
            get;
            set;
        }
    }

    public class ChartRangeBarSeries<TModel, TValue> : ChartRangeBarSeries<TModel, TValue, string> where TModel : class
    {
        //public ChartRangeBarSeries(Expression<Func<TModel, TValue>> fromExpression,
        //                           Expression<Func<TModel, TValue>> toExpression, 
        //                           Expression<Func<TModel, string>> colorExpression)
        //    : base(fromExpression, toExpression, null)
        //{
        //}

        public ChartRangeBarSeries(IEnumerable data)
            : base(data)
        {
        }
    }
}
