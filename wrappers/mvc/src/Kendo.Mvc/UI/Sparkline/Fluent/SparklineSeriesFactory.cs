namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

    /// <summary>
    /// Creates series for the <see cref="Sparkline{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the chart is bound to</typeparam>
    public class SparklineSeriesFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SparklineSeriesFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SparklineSeriesFactory(ISeriesContainer container)
        {
            Container = container;
        }

        /// <summary>
        /// The parent Sparkline
        /// </summary>
        public ISeriesContainer Container
        {
            get;
            private set;
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var barSeries = new ChartBarSeries<TModel, TValue, TCategory>(valueExpression, colorExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(barSeries);

            return new ChartBarSeriesBuilder<TModel>(barSeries);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar<TValue>(Expression<Func<TModel, TValue>> valueExpression, Expression<Func<TModel, string>> colorExpression = null)
        {
            return Bar<TValue, string>(valueExpression, colorExpression, null, null);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar(string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return Bar(null, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value member.
        /// </param>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar(Type memberType, string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var seriesType = typeof(ChartBarSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartBarSeries)BuildSeries(seriesType, valueExpr, colorExpr, categoryExpr, noteTextExpr);

            series.Member = valueMemberName;
            series.ColorMember = colorMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartBarSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines bar series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar(IEnumerable data)
        {
            ChartBarSeries<TModel, object> barSeries = new ChartBarSeries<TModel, object>(data);

            Container.Series.Add(barSeries);

            return new ChartBarSeriesBuilder<TModel>(barSeries);
        }

        /// <summary>
        /// Defines bound column series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Bar(valueExpression, colorExpression, categoryExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound column series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column<TValue>(Expression<Func<TModel, TValue>> valueExpression, Expression<Func<TModel, string>> colorExpression = null)
        {
            return Column<TValue, string>(valueExpression, colorExpression, null, null);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column(string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return Column(null, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value member.
        /// </param>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column(Type memberType, string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var builder = Bar(memberType, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bar series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column(IEnumerable data)
        {
            ChartBarSeries<TModel, object> barSeries = new ChartBarSeries<TModel, object>(data);
            barSeries.Orientation = ChartSeriesOrientation.Vertical;

            Container.Series.Add(barSeries);

            return new ChartBarSeriesBuilder<TModel>(barSeries);
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> noteTextExpression)
        {
            var lineSeries = new ChartLineSeries<TModel, TValue, TCategory>(expression, categoryExpression, noteTextExpression);

            Container.Series.Add(lineSeries);

            return new ChartLineSeriesBuilder<TModel>(lineSeries);
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the series value from the chart model
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return Line<TValue, string>(expression, null, null);
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line(string memberName, string categoryMemberName = null)
        {
            return Line(null, memberName, categoryMemberName);
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value member.
        /// </param>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line(Type memberType, string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var seriesType = typeof(ChartLineSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var series = (IChartLineSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = memberName;

            if (!series.Name.HasValue())
            {
                series.Name = memberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartLineSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line(IEnumerable data)
        {
            ChartLineSeries<TModel, object> lineSeries = new ChartLineSeries<TModel, object>(data);

            Container.Series.Add(lineSeries);

            return new ChartLineSeriesBuilder<TModel>(lineSeries);
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return Area<TValue, string>(expression, null, null);
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> noteTextExpression)
        {
            ChartAreaSeries<TModel, TValue, TCategory> areaSeries = new ChartAreaSeries<TModel, TValue, TCategory>(expression, categoryExpression, noteTextExpression);

            Container.Series.Add(areaSeries);

            return new ChartAreaSeriesBuilder<TModel>(areaSeries);
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area(string memberName, string categoryMemberName = null)
        {
            return Area(null, memberName, categoryMemberName);
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value member.
        /// </param>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area(Type memberType, string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var seriesType = typeof(ChartAreaSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var series = (IChartAreaSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = memberName;

            if (!series.Name.HasValue())
            {
                series.Name = memberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartAreaSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area(IEnumerable data)
        {
            ChartAreaSeries<TModel, object> areaSeries = new ChartAreaSeries<TModel, object>(data);

            Container.Series.Add(areaSeries);

            return new ChartAreaSeriesBuilder<TModel>(areaSeries);
        }

        /// <summary>
        /// Defines bound pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie<TValue>(
            Expression<Func<TModel, TValue>> expressionValue,
            Expression<Func<TModel, string>> expressionCategory,
            Expression<Func<TModel, string>> expressionColor = null,
            Expression<Func<TModel, bool>> expressionExplode = null,
            Expression<Func<TModel, bool>> expressionVisibleInLegend = null
            )
        {
            ChartPieSeries<TModel, TValue> pieSeries = new ChartPieSeries<TModel, TValue>(expressionValue, expressionCategory, expressionColor, expressionExplode, expressionVisibleInLegend);

            Container.Series.Add(pieSeries);

            return new ChartPieSeriesBuilder<TModel>(pieSeries);
        }

        /// <summary>
        /// Defines bound pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie(
            string valueMemberName,
            string categoryMemberName,
            string colorMemberName = null,
            string explodeMemberName = null,
            string visibleInLegendMemberName = null
            )
        {
            return Pie(null, valueMemberName, categoryMemberName, colorMemberName, explodeMemberName, visibleInLegendMemberName);
        }

        /// <summary>
        /// Defines bound pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie(
            Type memberType,
            string valueMemberName,
            string categoryMemberName,
            string colorMemberName = null,
            string explodeMemberName = null,
            string visibleInLegendMemberName = null
            )
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = BuildMemberExpression(typeof(string), categoryMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var explodeExpr = explodeMemberName.HasValue() ? BuildMemberExpression(typeof(bool), explodeMemberName) : null;
            var visibleInlegendExpr = visibleInLegendMemberName.HasValue() ? BuildMemberExpression(typeof(bool), visibleInLegendMemberName) : null;

            var seriesType = typeof(ChartPieSeries<,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type);
            var series = (IChartPieSeries)BuildSeries(seriesType, valueExpr, categoryExpr, colorExpr, explodeExpr, visibleInlegendExpr);

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            if (!series.Member.HasValue())
            {
                series.Member = valueMemberName.AsTitle();
            }

            if (!series.CategoryMember.HasValue())
            {
                series.CategoryMember = categoryMemberName.AsTitle();
            }

            if (!series.ColorMember.HasValue())
            {
                series.ColorMember = colorMemberName.AsTitle();
            }

            if (!series.ExplodeMember.HasValue())
            {
                series.ExplodeMember = explodeMemberName.AsTitle();
            }

            if (!series.VisibleInLegendMember.HasValue())
            {
                series.VisibleInLegendMember = visibleInLegendMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartPieSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines pie series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartPieSeriesBuilder<TModel> Pie(IEnumerable data)
        {
            ChartPieSeries<TModel, object> pieSeries = new ChartPieSeries<TModel, object>(data);

            Container.Series.Add(pieSeries);

            return new ChartPieSeriesBuilder<TModel>(pieSeries);
        }

        /// <summary>
        /// Defines bound bullet series.
        /// </summary>
        /// <param name="currentExpression">
        /// The expression used to extract the point current value from the chart model
        /// </param>
        /// <param name="targetExpression">
        /// The expression used to extract the point target value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> Bullet<TValue, TCategory>(
            Expression<Func<TModel, TValue>> currentExpression,
            Expression<Func<TModel, TValue>> targetExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var bulletSeries = new ChartBulletSeries<TModel, TValue, TCategory>(currentExpression, targetExpression, colorExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(bulletSeries);

            return new ChartBulletSeriesBuilder<TModel>(bulletSeries);
        }

        /// <summary>
        /// Defines bound bullet series.
        /// </summary>
        /// <param name="currentExpression">
        /// The expression used to extract the point current value from the chart model
        /// </param>
        /// <param name="targetExpression">
        /// The expression used to extract the point target value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> Bullet<TValue>(
            Expression<Func<TModel, TValue>> currentExpression,
            Expression<Func<TModel, TValue>> targetExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            return Bullet<TValue, string>(currentExpression, targetExpression, colorExpression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="currentMemberName">
        /// The name of the current value member.
        /// </param>
        /// <param name="targetMemberName">
        /// The name of the target value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="noteTextExpression">
        /// The name of the note text member.
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> Bullet(
            string currentMemberName,
            string targetMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            return Bullet(null, currentMemberName, targetMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound bullet series.
        /// </summary>
        /// <param name="currentMemberType">
        /// The type of the current value member.
        /// </param>
        /// <param name="targetMemberName">
        /// The name of the target value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="noteTextExpression">
        /// The name of the note text member.
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> Bullet(
            Type memberType,
            string currentMemberName,
            string targetMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var currentExpr = BuildMemberExpression(memberType, currentMemberName);
            var targetExpr = BuildMemberExpression(memberType, targetMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var expressionCategory = categoryMemberName.HasValue() ? BuildMemberExpression(memberType, categoryMemberName) : null;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var seriesType = typeof(ChartBulletSeries<,,>).MakeGenericType(typeof(TModel), typeof(string), currentExpr.Body.Type);
            var series = (IChartBulletSeries)BuildSeries(seriesType, currentExpr, targetExpr, colorExpr, expressionCategory, noteTextExpr);

            series.CurrentMember = currentMemberName;
            series.TargetMember = targetMemberName;
            series.ColorMember = colorMemberName;
            series.CategoryMember = categoryMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = currentMemberName.AsTitle() + targetMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartBulletSeriesBuilder<TModel>(series);
        }

        private LambdaExpression BuildMemberExpression(Type memberType, string memberName)
        {
            const bool liftMemberAccess = false;
            var expression = ExpressionBuilder.Lambda<TModel>(memberType, memberName, liftMemberAccess);

            if (typeof(TModel).IsDynamicObject() && memberType != null && expression.Body.Type.GetNonNullableType() != memberType.GetNonNullableType())
            {
                expression = Expression.Lambda(Expression.Convert(expression.Body, memberType), expression.Parameters);
            }

            return expression;
        }

        private object BuildSeries(Type seriesType, params LambdaExpression[] expressions)
        {
            var ctorTypeArgs = new List<Type>();
            ctorTypeArgs.Add(Container.GetType());
            ctorTypeArgs.AddRange(from e in expressions select e != null ? e.GetType() : typeof(object));

            var constructor = seriesType.GetConstructor(ctorTypeArgs.ToArray()) ?? seriesType.GetConstructors()[0];

            var ctorArgs = new List<object>();
            ctorArgs.AddRange(expressions);

            return constructor.Invoke(ctorArgs.ToArray());
        }
    }
}
