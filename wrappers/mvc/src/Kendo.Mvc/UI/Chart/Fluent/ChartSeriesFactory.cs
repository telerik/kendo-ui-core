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
    /// Creates series for the <see cref="Chart{TModel}" />.
    /// </summary>
    /// <typeparam name="TModel">The type of the data item to which the chart is bound to</typeparam>
    public class ChartSeriesFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="ChartSeriesFactory{TModel}"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public ChartSeriesFactory(ISeriesContainer container)
        {
            Container = container;
        }

        /// <summary>
        /// The parent Chart
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
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
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
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar<TValue, TCategory, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var barSeries = new ChartBarSeries<TModel, TValue, TCategory, TErrorLowValue, TErrorHighValue>(
                valueExpression, categoryExpression, errorLowExpression, errorHighExpression, colorExpression, noteTextExpression);

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
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar<TValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var barSeries = new ChartBarSeries<TModel, TValue, string>(valueExpression, colorExpression, null, noteTextExpression);

            Container.Series.Add(barSeries);

            return new ChartBarSeriesBuilder<TModel>(barSeries);
        }

        /// <summary>
        /// Defines bound bar series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar<TValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var barSeries = new ChartBarSeries<TModel, TValue, string, TErrorLowValue, TErrorHighValue>(
                valueExpression, null, errorLowExpression, errorHighExpression, colorExpression, noteTextExpression);

            Container.Series.Add(barSeries);

            return new ChartBarSeriesBuilder<TModel>(barSeries);
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
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar(
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null,
            string errorLowMemberName = null, 
            string errorHighMemberName = null)
        {
            return Bar(null, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName, errorLowMemberName, errorHighMemberName);
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
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar(
            Type memberType,
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null,
            string errorLowMemberName = null, 
            string errorHighMemberName = null)
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
            series.CategoryMember = categoryMemberName;
            series.ErrorLowMember = errorLowMemberName;
            series.ErrorHighMember = errorHighMemberName; 

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
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column<TValue, TCategory, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Bar(valueExpression, categoryExpression, errorLowExpression, errorHighExpression, colorExpression, noteTextExpression);
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
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column<TValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Bar(valueExpression, colorExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound column series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column<TValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Bar(valueExpression, errorLowExpression, errorHighExpression, colorExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }       

        /// <summary>
        /// Defines bound column series.
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
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column(
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null,
            string errorLowMemberName = null,
            string errorHighMemberName = null)
        {
            return Column(null, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName,
                errorLowMemberName, errorHighMemberName);
        }

        /// <summary>
        /// Defines bound column series.
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
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column(
            Type memberType,
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null,
            string errorLowMemberName = null,
            string errorHighMemberName = null)
        {
            var builder = Bar(memberType, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName,
                errorLowMemberName, errorHighMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines column series bound to inline data.
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
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var lineSeries = new ChartLineSeries<TModel, TValue, TCategory>(expression, categoryExpression, noteTextExpression);

            Container.Series.Add(lineSeries);

            return new ChartLineSeriesBuilder<TModel>(lineSeries);
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
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line<TValue, TCategory, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var lineSeries = new ChartLineSeries<TModel, TValue, TCategory, TErrorLowValue, TErrorHighValue>(
                expression, categoryExpression, errorLowExpression, errorHighExpression, noteTextExpression);

            Container.Series.Add(lineSeries);

            return new ChartLineSeriesBuilder<TModel>(lineSeries);
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var lineSeries = new ChartLineSeries<TModel, TValue, string>(expression, null, noteTextExpression);

            Container.Series.Add(lineSeries);

            return new ChartLineSeriesBuilder<TModel>(lineSeries);
        }

        /// <summary>
        /// Defines bound line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line<TValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,            
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var lineSeries = new ChartLineSeries<TModel, TValue, string, TErrorLowValue, TErrorHighValue>(
                expression, null, errorLowExpression, errorHighExpression, noteTextExpression);

            Container.Series.Add(lineSeries);

            return new ChartLineSeriesBuilder<TModel>(lineSeries);
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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line(string memberName, string categoryMemberName = null,
            string noteTextExpression = null, string errorLowMemberName = null, string errorHighMemberName = null)
        {
            return Line(null, memberName, categoryMemberName, noteTextExpression, errorLowMemberName, errorHighMemberName);
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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line(Type memberType, string memberName, string categoryMemberName = null, 
            string noteTextMemberName = null, string errorLowMemberName = null, string errorHighMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;            

            var seriesType = typeof(ChartLineSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartLineSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = memberName;
            series.CategoryMember = categoryMemberName;
            series.ErrorLowMember = errorLowMemberName;
            series.ErrorHighMember = errorHighMemberName;
            series.NoteTextMember = noteTextMemberName;

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
        /// Defines bound vertical line series.
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
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Line(expression, categoryExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the chart model.
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine<TValue, TCategory, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Line(expression, categoryExpression, errorLowExpression, errorHighExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Line(expression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine<TValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Line(expression, errorLowExpression, errorHighExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical line series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine(string memberName, string categoryMemberName = null, string noteTextMemberName = null,
            string errorLowMemberName = null, string errorHighMemberName = null)
        {
            var builder = Line(memberName, categoryMemberName, noteTextMemberName, errorLowMemberName, errorHighMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical line series.
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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine(
            Type memberType,
            string memberName,
            string categoryMemberName = null,
            string noteTextMemberName = null,
            string errorLowMemberName = null, 
            string errorHighMemberName = null)
        {
            var builder = Line(memberType, memberName, categoryMemberName, noteTextMemberName, errorLowMemberName, errorHighMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines vertical line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine(IEnumerable data)
        {
            ChartLineSeries<TModel, object> verticalLineSeries = new ChartLineSeries<TModel, object>(data);

            Container.Series.Add(verticalLineSeries);

            var builder = new ChartLineSeriesBuilder<TModel>(verticalLineSeries);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            return Area<TValue, string>(expression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area<TValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            return Area<TValue, string, TErrorLowValue, TErrorHighValue>(expression, null, errorLowExpression, errorHighExpression, noteTextExpression);
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
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            ChartAreaSeries<TModel, TValue, TCategory> areaSeries = new ChartAreaSeries<TModel, TValue, TCategory>(expression, categoryExpression, noteTextExpression);

            Container.Series.Add(areaSeries);

            return new ChartAreaSeriesBuilder<TModel>(areaSeries);
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
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area<TValue, TCategory, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            ChartAreaSeries<TModel, TValue, TCategory> areaSeries = new ChartAreaSeries<TModel, TValue, TCategory, TErrorLowValue, TErrorHighValue>(
                expression, categoryExpression, errorLowExpression, errorHighExpression, noteTextExpression);

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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area(string memberName, string categoryMemberName = null, string noteTextMemberName = null,
            string errorLowMemberName = null, string errorHighMemberName = null)
        {
            return Area(null, memberName, categoryMemberName, noteTextMemberName, errorLowMemberName, errorHighMemberName);
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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area(Type memberType, string memberName, string categoryMemberName = null,
            string noteTextMemberName = null, string errorLowMemberName = null, string errorHighMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;            

            var seriesType = typeof(ChartAreaSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);

            var series = (IChartAreaSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = memberName;
            series.CategoryMember = categoryMemberName;
            series.ErrorLowMember = errorLowMemberName;
            series.ErrorHighMember = errorHighMemberName;
            series.NoteTextMember = noteTextMemberName;

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
        /// Defines bound vertical area series.
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
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Area(expression, categoryExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the category from the chart model.
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea<TValue, TCategory, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Area(expression, categoryExpression, errorLowExpression, errorHighExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }        

        /// <summary>
        /// Defines bound vertical area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Area(expression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="errorLowExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea<TValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TErrorLowValue>> errorLowExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = Area(expression, errorLowExpression, errorHighExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }        

        /// <summary>
        /// Defines bound vertical area series.
        /// </summary>
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea(string memberName, string categoryMemberName = null,
            string noteTextMemberName = null, string errorLowMemberName = null, string errorHighMemberName = null)
        {
            var builder = Area(memberName, categoryMemberName, noteTextMemberName, errorLowMemberName, errorHighMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical area series.
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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="errorLowMemberName">
        /// The name of the error low member.
        /// </param>
        /// <param name="errorHighMemberName">
        /// The name of the error high member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea(
            Type memberType,
            string memberName,
            string categoryMemberName = null,
            string noteTextMemberName = null, 
            string errorLowMemberName = null, 
            string errorHighMemberName = null)
        {
            var builder = Area(memberType, memberName, categoryMemberName, noteTextMemberName, errorLowMemberName, errorHighMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines vertical area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea(IEnumerable data)
        {
            ChartAreaSeries<TModel, object> verticalAreaseries = new ChartAreaSeries<TModel, object>(data);

            Container.Series.Add(verticalAreaseries);

            var builder = new ChartAreaSeriesBuilder<TModel>(verticalAreaseries);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound scatter series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var scatterSeries = new ChartScatterSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(scatterSeries);

            return new ChartScatterSeriesBuilder<TModel>(scatterSeries);
        }

        /// <summary>
        /// Defines bound scatter series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="errorBarsAxisType">
        /// The axis type used for the error low and high value
        /// </param>
        /// <param name="errorLowValueExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighValueExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter<TXValue, TYValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            ScatterErrorBarsAxisType errorBarsAxisType,
            Expression<Func<TModel, TErrorLowValue>> errorLowValueExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            IChartScatterSeries scatterSeries;
            if (errorBarsAxisType == ScatterErrorBarsAxisType.X)
            {
                scatterSeries = new ChartScatterSeries<TModel, TXValue, TYValue, TErrorLowValue, TErrorHighValue, object, object>(
                    xValueExpression, yValueExpression, errorLowValueExpression, errorHighValueExpression, null, null, noteTextExpression);
            }
            else
            {
                scatterSeries = new ChartScatterSeries<TModel, TXValue, TYValue, object, object, TErrorLowValue, TErrorHighValue>(
                    xValueExpression, yValueExpression, null, null, errorLowValueExpression, errorHighValueExpression, noteTextExpression);
            }

            Container.Series.Add(scatterSeries);

            return new ChartScatterSeriesBuilder<TModel>(scatterSeries);
        }

        /// <summary>
        /// Defines bound scatter series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="xErrorLowValueExpression">
        /// The expression used to extract the point x error low value from the chart model
        /// </param>
        /// <param name="xErrorHighValueExpression">
        /// The expression used to extract the point x error high value from the chart model
        /// </param>
        /// <param name="yErrorLowValueExpression">
        /// The expression used to extract the point y error low value from the chart model
        /// </param>
        /// <param name="yErrorHighValueExpression">
        /// The expression used to extract the point y error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter<TXValue, TYValue, TXErrorLowValue, TXErrorHighValue, TYErrorLowValue, TYErrorHighValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, TXErrorLowValue>> xErrorLowValueExpression,
            Expression<Func<TModel, TXErrorHighValue>> xErrorHighValueExpression,
            Expression<Func<TModel, TYErrorLowValue>> yErrorLowValueExpression,
            Expression<Func<TModel, TYErrorHighValue>> yErrorHighValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var scatterSeries = new ChartScatterSeries<TModel, TXValue, TYValue, TXErrorLowValue, TXErrorHighValue, TYErrorLowValue, TYErrorHighValue>(
                xValueExpression, yValueExpression, xErrorLowValueExpression, xErrorHighValueExpression, yErrorLowValueExpression, yErrorHighValueExpression, noteTextExpression);

            Container.Series.Add(scatterSeries);

            return new ChartScatterSeriesBuilder<TModel>(scatterSeries);
        }

        /// <summary>
        /// Defines bound scatter series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="xErrorLowMemberName">
        /// The name of the x axis error low member.
        /// </param>
        /// <param name="xErrorHighMemberName">
        /// The name of the x axis error high member.
        /// </param>
        /// <param name="yErrorLowMemberName">
        /// The name of the y axis error low member.
        /// </param>
        /// <param name="yErrorHighMemberName">
        /// The name of the y axis error high member.
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter(string xMemberName, string yMemberName, string noteTextMemberName = null,
            string xErrorLowMemberName = null, string xErrorHighMemberName = null, string yErrorLowMemberName = null, string yErrorHighMemberName = null)
        {
            return Scatter(null, xMemberName, yMemberName, noteTextMemberName, xErrorLowMemberName, xErrorHighMemberName, 
                yErrorLowMemberName, yErrorHighMemberName);
        }

        /// <summary>
        /// Defines bound scatter series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value members.
        /// </param>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        /// <param name="xErrorLowMemberName">
        /// The name of the x axis error low member.
        /// </param>
        /// <param name="xErrorHighMemberName">
        /// The name of the x axis error high member.
        /// </param>
        /// <param name="yErrorLowMemberName">
        /// The name of the y axis error low member.
        /// </param>
        /// <param name="yErrorHighMemberName">
        /// The name of the y axis error high member.
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null,
            string xErrorLowMemberName = null, string xErrorHighMemberName = null, string yErrorLowMemberName = null, string yErrorHighMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartScatterSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.XErrorLowMember = xErrorLowMemberName;
            series.XErrorHighMember = xErrorHighMemberName;
            series.YErrorLowMember = yErrorLowMemberName;
            series.YErrorHighMember = yErrorHighMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartScatterSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines scatter series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter(IEnumerable data)
        {
            ChartScatterSeries<TModel, object, object> scatterSeries = new ChartScatterSeries<TModel, object, object>(data);

            Container.Series.Add(scatterSeries);

            return new ChartScatterSeriesBuilder<TModel>(scatterSeries);
        }

        /// <summary>
        /// Defines bound scatter line series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var scatterLineSeries = new ChartScatterLineSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(scatterLineSeries);

            return new ChartScatterLineSeriesBuilder<TModel>(scatterLineSeries);
        }

        /// <summary>
        /// Defines bound scatter line series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="errorBarsAxisType">
        /// The axis type used for the error low and high value
        /// </param>
        /// <param name="errorLowValueExpression">
        /// The expression used to extract the point error low value from the chart model
        /// </param>
        /// <param name="errorHighValueExpression">
        /// The expression used to extract the point error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine<TXValue, TYValue, TErrorLowValue, TErrorHighValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            ScatterErrorBarsAxisType errorBarsType,
            Expression<Func<TModel, TErrorLowValue>> errorLowValueExpression,
            Expression<Func<TModel, TErrorHighValue>> errorHighValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            IChartScatterLineSeries scatterSeries;
            if (errorBarsType == ScatterErrorBarsAxisType.X)
            {
                scatterSeries = new ChartScatterLineSeries<TModel, TXValue, TYValue, TErrorLowValue, TErrorHighValue, object, object>(
                    xValueExpression, yValueExpression, errorLowValueExpression, errorHighValueExpression, null, null, noteTextExpression);
            }
            else
            {
                scatterSeries = new ChartScatterLineSeries<TModel, TXValue, TYValue, object, object, TErrorLowValue, TErrorHighValue>(
                    xValueExpression, yValueExpression, null, null, errorLowValueExpression, errorHighValueExpression, noteTextExpression);
            }

            Container.Series.Add(scatterSeries);

            return new ChartScatterLineSeriesBuilder<TModel>(scatterSeries);
        }

        /// <summary>
        /// Defines bound scatter line series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="xErrorLowValueExpression">
        /// The expression used to extract the point x error low value from the chart model
        /// </param>
        /// <param name="xErrorHighValueExpression">
        /// The expression used to extract the point x error high value from the chart model
        /// </param>
        /// <param name="yErrorLowValueExpression">
        /// The expression used to extract the point y error low value from the chart model
        /// </param>
        /// <param name="yErrorHighValueExpression">
        /// The expression used to extract the point y error high value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine<TXValue, TYValue, TXErrorLowValue, TXErrorHighValue, TYErrorLowValue, TYErrorHighValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, TXErrorLowValue>> xErrorLowValueExpression,
            Expression<Func<TModel, TXErrorHighValue>> xErrorHighValueExpression,
            Expression<Func<TModel, TYErrorLowValue>> yErrorLowValueExpression,
            Expression<Func<TModel, TYErrorHighValue>> yErrorHighValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var scatterSeries = new ChartScatterLineSeries<TModel, TXValue, TYValue, TXErrorLowValue, TXErrorHighValue, TYErrorLowValue, TYErrorHighValue>(
                xValueExpression, yValueExpression, xErrorLowValueExpression, xErrorHighValueExpression, yErrorLowValueExpression, yErrorHighValueExpression, noteTextExpression);

            Container.Series.Add(scatterSeries);

            return new ChartScatterLineSeriesBuilder<TModel>(scatterSeries);
        }        

        /// <summary>
        /// Defines bound scatter line series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextExpression">
        /// The name of the Y value member.
        /// </param>
        /// <param name="xErrorLowMemberName">
        /// The name of the x axis error low member.
        /// </param>
        /// <param name="xErrorHighMemberName">
        /// The name of the x axis error high member.
        /// </param>
        /// <param name="yErrorLowMemberName">
        /// The name of the y axis error low member.
        /// </param>
        /// <param name="yErrorHighMemberName">
        /// The name of the y axis error high member.
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine(string xMemberName, string yMemberName, string noteTextExpression = null,
            string xErrorLowMemberName = null, string xErrorHighMemberName = null, string yErrorLowMemberName = null, string yErrorHighMemberName = null)
        {
            return ScatterLine(null, xMemberName, yMemberName, noteTextExpression, xErrorLowMemberName, xErrorHighMemberName,
                yErrorLowMemberName, yErrorHighMemberName);
        }

        /// <summary>
        /// Defines bound scatter line series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value members.
        /// </param>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextExpression">
        /// The name of the Y value member.
        /// </param>
        /// <param name="xErrorLowMemberName">
        /// The name of the x axis error low member.
        /// </param>
        /// <param name="xErrorHighMemberName">
        /// The name of the x axis error high member.
        /// </param>
        /// <param name="yErrorLowMemberName">
        /// The name of the y axis error low member.
        /// </param>
        /// <param name="yErrorHighMemberName">
        /// The name of the y axis error high member.
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null,
            string xErrorLowMemberName = null, string xErrorHighMemberName = null, string yErrorLowMemberName = null, string yErrorHighMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartScatterLineSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterLineSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.XErrorLowMember = xErrorLowMemberName;
            series.XErrorHighMember = xErrorHighMemberName;
            series.YErrorLowMember = yErrorLowMemberName;
            series.YErrorHighMember = yErrorHighMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartScatterLineSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines scatter line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine(IEnumerable data)
        {
            ChartScatterLineSeries<TModel, object, object> scatterLineSeries = new ChartScatterLineSeries<TModel, object, object>(data);

            Container.Series.Add(scatterLineSeries);

            return new ChartScatterLineSeriesBuilder<TModel>(scatterLineSeries);
        }

        /// <summary>
        /// Defines bound bubble series.
        /// </summary>
        public virtual ChartBubbleSeriesBuilder<TModel> Bubble<TXValue, TYValue, TSizeValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, TSizeValue>> sizeExpression,
            Expression<Func<TModel, string>> categoryExpression = null,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, bool>> visibleInLegendExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            var bubbleSeries = new ChartBubbleSeries<TModel, TXValue, TYValue, TSizeValue>(
                xValueExpression, yValueExpression, sizeExpression,
                categoryExpression, colorExpression, visibleInLegendExpression, noteTextExpression
            );

            Container.Series.Add(bubbleSeries);

            return new ChartBubbleSeriesBuilder<TModel>(bubbleSeries);
        }

        /// <summary>
        /// Defines bound bubble series.
        /// </summary>
        public virtual ChartBubbleSeriesBuilder<TModel> Bubble(
            string xMemberName,
            string yMemberName,
            string sizeMemberName,
            string categoryMemberName = null,
            string colorMemberName = null,
            string visibleInLegendMemberName = null,
            string textNoteMemberName = null)
        {
            return Bubble(
                null, xMemberName, yMemberName, sizeMemberName,
                categoryMemberName, colorMemberName, visibleInLegendMemberName, textNoteMemberName
            );
        }

        /// <summary>
        /// Defines bound bubble series.
        /// </summary>
        public virtual ChartBubbleSeriesBuilder<TModel> Bubble(
            Type memberType,
            string xMemberName,
            string yMemberName,
            string sizeMemberName,
            string categoryMemberName = null,
            string colorMemberName = null,
            string visibleInLegendMemberName = null,
            string textNoteMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var expressionSize = BuildMemberExpression(memberType, sizeMemberName);
            var categoryExpression = categoryMemberName.HasValue() ? BuildMemberExpression(memberType, categoryMemberName) : null;
            var expressionColor = colorMemberName.HasValue() ? BuildMemberExpression(memberType, colorMemberName) : null;
            var expressionVisibleInLegend = visibleInLegendMemberName.HasValue() ? BuildMemberExpression(memberType, visibleInLegendMemberName) : null;
            var expressionTextNote = textNoteMemberName.HasValue() ? BuildMemberExpression(memberType, textNoteMemberName) : null;

            var seriesType = typeof(ChartBubbleSeries<,,,>).MakeGenericType(
                typeof(TModel), expressionX.Body.Type, expressionY.Body.Type, expressionSize.Body.Type
            );
            var series = (IChartBubbleSeries)BuildSeries(
                seriesType, expressionX, expressionY, expressionSize,
                categoryExpression, expressionColor, expressionVisibleInLegend, expressionTextNote
            );

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartBubbleSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines bubble series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartBubbleSeriesBuilder<TModel> Bubble(IEnumerable data)
        {
            var bubbleSeries = new ChartBubbleSeries<TModel, object, object, object>(data);

            Container.Series.Add(bubbleSeries);

            return new ChartBubbleSeriesBuilder<TModel>(bubbleSeries);
        }

        /// <summary>
        /// Defines bound pie series.
        /// </summary>
        public virtual ChartPieSeriesBuilder<TModel> Pie<TValue>(
            Expression<Func<TModel, TValue>> expressionValue,
            Expression<Func<TModel, string>> categoryExpression,
            Expression<Func<TModel, string>> expressionColor = null,
            Expression<Func<TModel, bool>> expressionExplode = null,
            Expression<Func<TModel, bool>> expressionVisibleInLegend = null
            )
        {
            ChartPieSeries<TModel, TValue> pieSeries = new ChartPieSeries<TModel, TValue>(expressionValue, categoryExpression, expressionColor, expressionExplode, expressionVisibleInLegend);

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
        /// Defines bound funnel series.
        /// </summary>
        public virtual ChartFunnelSeriesBuilder<TModel> Funnel<TValue>(
            Expression<Func<TModel, TValue>> expressionValue,
            Expression<Func<TModel, string>> categoryExpression,
            Expression<Func<TModel, string>> expressionColor = null,
            Expression<Func<TModel, bool>> expressionVisibleInLegend = null
            )
        {
            ChartFunnelSeries<TModel, TValue> funnelSeries = new ChartFunnelSeries<TModel, TValue>(expressionValue, categoryExpression, expressionColor, expressionVisibleInLegend);

            Container.Series.Add(funnelSeries);

            return new ChartFunnelSeriesBuilder<TModel>(funnelSeries);
        }

        /// <summary>
        /// Defines bound funnel series.
        /// </summary>
        public virtual ChartFunnelSeriesBuilder<TModel> Funnel(
            string valueMemberName,
            string categoryMemberName,
            string colorMemberName = null,
            string visibleInLegendMemberName = null
            )
        {
            return Funnel(null, valueMemberName, categoryMemberName, colorMemberName, visibleInLegendMemberName);
        }

        /// <summary>
        /// Defines bound funnel series.
        /// </summary>
        public virtual ChartFunnelSeriesBuilder<TModel> Funnel(
            Type memberType,
            string valueMemberName,
            string categoryMemberName,
            string colorMemberName = null,
            string visibleInLegendMemberName = null
            )
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = BuildMemberExpression(typeof(string), categoryMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var visibleInlegendExpr = visibleInLegendMemberName.HasValue() ? BuildMemberExpression(typeof(bool), visibleInLegendMemberName) : null;

            var seriesType = typeof(ChartFunnelSeries<,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type);
            var series = (IChartFunnelSeries)BuildSeries(seriesType, valueExpr, categoryExpr, colorExpr, visibleInlegendExpr);

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

            if (!series.VisibleInLegendMember.HasValue())
            {
                series.VisibleInLegendMember = visibleInLegendMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartFunnelSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines funnel series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartFunnelSeriesBuilder<TModel> Funnel(IEnumerable data)
        {
            ChartFunnelSeries<TModel, object> funnelSeries = new ChartFunnelSeries<TModel, object>(data);

            Container.Series.Add(funnelSeries);

            return new ChartFunnelSeriesBuilder<TModel>(funnelSeries);
        }        

        /// <summary>
        /// Defines bound Donut series.
        /// </summary>
        public virtual ChartDonutSeriesBuilder<TModel> Donut<TValue>(
            Expression<Func<TModel, TValue>> expressionValue,
            Expression<Func<TModel, string>> categoryExpression,
            Expression<Func<TModel, string>> expressionColor = null,
            Expression<Func<TModel, bool>> expressionExplode = null,
            Expression<Func<TModel, bool>> expressionVisibleInLegend = null
            )
        {
            ChartDonutSeries<TModel, TValue> donutSeries = new ChartDonutSeries<TModel, TValue>(expressionValue, categoryExpression, expressionColor, expressionExplode, expressionVisibleInLegend);

            Container.Series.Add(donutSeries);

            return new ChartDonutSeriesBuilder<TModel>(donutSeries);
        }

        /// <summary>
        /// Defines bound donut series.
        /// </summary>
        public virtual ChartDonutSeriesBuilder<TModel> Donut(
            string valueMemberName,
            string categoryMemberName,
            string colorMemberName = null,
            string explodeMemberName = null,
            string visibleInLegendMemberName = null
            )
        {
            return Donut(null, valueMemberName, categoryMemberName, colorMemberName, explodeMemberName, visibleInLegendMemberName);
        }

        /// <summary>
        /// Defines bound donut series.
        /// </summary>
        public virtual ChartDonutSeriesBuilder<TModel> Donut(
            Type memberType,
            string valueMemberName,
            string categoryMemberName,
            string colorMemberName,
            string explodeMemberName,
            string visibleInLegendMemberName
            )
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = BuildMemberExpression(typeof(string), categoryMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var explodeExpr = explodeMemberName.HasValue() ? BuildMemberExpression(typeof(bool), explodeMemberName) : null;
            var visibleInlegendExpr = visibleInLegendMemberName.HasValue() ? BuildMemberExpression(typeof(bool), visibleInLegendMemberName) : null;

            var seriesType = typeof(ChartDonutSeries<,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type);
            var series = (IChartDonutSeries)BuildSeries(seriesType, valueExpr, categoryExpr, colorExpr, explodeExpr, visibleInlegendExpr);

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

            return new ChartDonutSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines donut series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartDonutSeriesBuilder<TModel> Donut(IEnumerable data)
        {
            ChartDonutSeries<TModel, object> donutSeries = new ChartDonutSeries<TModel, object>(data);

            Container.Series.Add(donutSeries);

            return new ChartDonutSeriesBuilder<TModel>(donutSeries);
        }

        /// <summary>
        /// Defines bound ohlc series.
        /// </summary>
        public virtual ChartOHLCSeriesBuilder<TModel> OHLC<TValue, TCategory>(
            Expression<Func<TModel, TValue>> openExpression,
            Expression<Func<TModel, TValue>> highExpression,
            Expression<Func<TModel, TValue>> lowExpression,
            Expression<Func<TModel, TValue>> closeExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            var ohlcSeries = new ChartOHLCSeries<TModel, TValue, TCategory>(
                openExpression, highExpression, lowExpression, closeExpression, colorExpression, categoryExpression, noteTextExpression
            );

            Container.Series.Add(ohlcSeries);

            return new ChartOHLCSeriesBuilder<TModel>(ohlcSeries);
        }

        /// <summary>
        /// Defines bound ohlc series.
        /// </summary>
        public virtual ChartOHLCSeriesBuilder<TModel> OHLC<TValue>(
            Expression<Func<TModel, TValue>> openExpression,
            Expression<Func<TModel, TValue>> highExpression,
            Expression<Func<TModel, TValue>> lowExpression,
            Expression<Func<TModel, TValue>> closeExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            return OHLC<TValue, string>(openExpression, highExpression, lowExpression, closeExpression, colorExpression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound ohlc series.
        /// </summary>
        public virtual ChartOHLCSeriesBuilder<TModel> OHLC(
            string openMemberName,
            string highMemberName,
            string lowMemberName,
            string closeMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            return OHLC(
                null, openMemberName, highMemberName, lowMemberName,
                closeMemberName, colorMemberName, categoryMemberName, noteTextMemberName
            );
        }

        /// <summary>
        /// Defines bound ohlc series.
        /// </summary>
        public virtual ChartOHLCSeriesBuilder<TModel> OHLC(
            Type memberType,
            string openMemberName,
            string highMemberName,
            string lowMemberName,
            string closeMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var openExpr = BuildMemberExpression(memberType, openMemberName);
            var highExpr = BuildMemberExpression(memberType, highMemberName);
            var lowExpr = BuildMemberExpression(memberType, lowMemberName);
            var closeExpr = BuildMemberExpression(memberType, closeMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(memberType, colorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(memberType, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartOHLCSeries<,,>).MakeGenericType(
                typeof(TModel), openExpr.Body.Type, categoryType
            );

            var series = (IChartOHLCSeries)BuildSeries(
                seriesType, openExpr, highExpr, lowExpr,
                closeExpr, colorExpr, categoryExpr, noteTextExpr
            );

            if (!series.Name.HasValue())
            {
                series.Name = openMemberName.AsTitle() + ", " + highMemberName.AsTitle() + ", " + lowMemberName.AsTitle() + ", " + closeMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartOHLCSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines ohlc series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartOHLCSeriesBuilder<TModel> OHLC(IEnumerable data)
        {
            var ohlcSeries = new ChartOHLCSeries<TModel, object, string>(data);

            Container.Series.Add(ohlcSeries);

            return new ChartOHLCSeriesBuilder<TModel>(ohlcSeries);
        }

        /// <summary>
        /// Defines bound candlestick series.
        /// </summary>
        public virtual ChartCandlestickSeriesBuilder<TModel> Candlestick<TValue, TCategory>(
            Expression<Func<TModel, TValue>> openExpression,
            Expression<Func<TModel, TValue>> highExpression,
            Expression<Func<TModel, TValue>> lowExpression,
            Expression<Func<TModel, TValue>> closeExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> downColorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            var ohlcSeries = new ChartCandlestickSeries<TModel, TValue, TCategory>(
                openExpression, highExpression, lowExpression, closeExpression, colorExpression, downColorExpression, categoryExpression, noteTextExpression
            );

            Container.Series.Add(ohlcSeries);

            return new ChartCandlestickSeriesBuilder<TModel>(ohlcSeries);
        }

        /// <summary>
        /// Defines bound candlestick series.
        /// </summary>
        public virtual ChartCandlestickSeriesBuilder<TModel> Candlestick<TValue>(
            Expression<Func<TModel, TValue>> openExpression,
            Expression<Func<TModel, TValue>> highExpression,
            Expression<Func<TModel, TValue>> lowExpression,
            Expression<Func<TModel, TValue>> closeExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> downColorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            return Candlestick<TValue, string>(openExpression, highExpression, lowExpression, closeExpression, colorExpression, downColorExpression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound candlestick series.
        /// </summary>
        public virtual ChartCandlestickSeriesBuilder<TModel> Candlestick(
            string openMemberName,
            string highMemberName,
            string lowMemberName,
            string closeMemberName,
            string colorMemberName = null,
            string downColorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            return Candlestick(
                null, openMemberName, highMemberName, lowMemberName,
                closeMemberName, colorMemberName, downColorMemberName, categoryMemberName, noteTextMemberName
            );
        }

        /// <summary>
        /// Defines bound candlestick series.
        /// </summary>
        public virtual ChartCandlestickSeriesBuilder<TModel> Candlestick(
            Type memberType,
            string openMemberName,
            string highMemberName,
            string lowMemberName,
            string closeMemberName,
            string colorMemberName = null,
            string downColorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var openExpr = BuildMemberExpression(memberType, openMemberName);
            var highExpr = BuildMemberExpression(memberType, highMemberName);
            var lowExpr = BuildMemberExpression(memberType, lowMemberName);
            var closeExpr = BuildMemberExpression(memberType, closeMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(memberType, colorMemberName) : null;
            var downColorExpr = downColorMemberName.HasValue() ? BuildMemberExpression(memberType, downColorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(memberType, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartCandlestickSeries<,,>).MakeGenericType(
                typeof(TModel), openExpr.Body.Type, categoryType
            );

            var series = (IChartCandlestickSeries)BuildSeries(
                seriesType, openExpr, highExpr, lowExpr,
                closeExpr, colorExpr, downColorExpr, categoryExpr, noteTextExpr
            );

            if (!series.Name.HasValue())
            {
                series.Name = openMemberName.AsTitle() + ", " + highMemberName.AsTitle() + ", " + lowMemberName.AsTitle() + ", " + closeMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartCandlestickSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines candlestick series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartCandlestickSeriesBuilder<TModel> Candlestick(IEnumerable data)
        {
            var candlestickSeries = new ChartCandlestickSeries<TModel, object, string>(data);

            Container.Series.Add(candlestickSeries);

            return new ChartCandlestickSeriesBuilder<TModel>(candlestickSeries);
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
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
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
            var bulletSeries = new ChartBulletSeries<TModel, TValue, TCategory>(
                currentExpression, targetExpression, colorExpression, categoryExpression, noteTextExpression
            );

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
        /// <param name="noteTextMemberName">
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
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(memberType, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var seriesType = typeof(ChartBulletSeries<,,>).MakeGenericType(typeof(TModel), currentExpr.Body.Type, categoryType);
            var series = (IChartBulletSeries)BuildSeries(seriesType, currentExpr, targetExpr, colorExpr, categoryExpr, noteTextExpr);

            series.CurrentMember = currentMemberName;
            series.TargetMember = targetMemberName;
            series.ColorMember = colorMemberName;
            series.CategoryMember = categoryMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = currentMemberName.AsTitle() + targetMemberName.AsTitle();
            }

            Container.Series.Add((IChartSeries)series);

            return new ChartBulletSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines bar series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> Bullet(IEnumerable data)
        {
            var bulletSeries = new ChartBulletSeries<TModel, object, string>(data);

            Container.Series.Add(bulletSeries);

            return new ChartBulletSeriesBuilder<TModel>(bulletSeries);
        }

        /// <summary>
        /// Defines bound verticalBullet series.
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
        public virtual ChartBulletSeriesBuilder<TModel> VerticalBullet<TValue, TCategory>(
            Expression<Func<TModel, TValue>> currentExpression,
            Expression<Func<TModel, TValue>> targetExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            ChartBulletSeriesBuilder<TModel> builder = Bullet(currentExpression, targetExpression, colorExpression, categoryExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound verticalBullet series.
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
        public virtual ChartBulletSeriesBuilder<TModel> VerticalBullet<TValue>(
            Expression<Func<TModel, TValue>> currentExpression,
            Expression<Func<TModel, TValue>> targetExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            ChartBulletSeriesBuilder<TModel> builder = Bullet(currentExpression, targetExpression, colorExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound verticalBullet series.
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
        /// <param name="noteTextMemberName">
        /// The name of the color member.
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> VerticalBullet(
            string currentMemberName,
            string targetMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            return VerticalBullet(null, currentMemberName, targetMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound verticalBullet series.
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
        /// <param name="noteTextMemberName">
        /// The name of the color member.
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> VerticalBullet(
            Type memberType,
            string currentMemberName,
            string targetMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            ChartBulletSeriesBuilder<TModel> builder = Bullet(memberType, currentMemberName, targetMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bar series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartBulletSeriesBuilder<TModel> VerticalBullet(IEnumerable data)
        {
            var bulletSeries = new ChartBulletSeries<TModel, object, string>(data);
            bulletSeries.Orientation = ChartSeriesOrientation.Vertical;

            Container.Series.Add(bulletSeries);

            return new ChartBulletSeriesBuilder<TModel>(bulletSeries);
        }

        /// <summary>
        /// Defines bound radar area series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        public virtual ChartRadarAreaSeriesBuilder<TModel> RadarArea<TValue>(Expression<Func<TModel, TValue>> valueExpression)
        {
            return RadarArea<TValue, string>(valueExpression, null);
        }

        /// <summary>
        /// Defines bound radar area series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartRadarAreaSeriesBuilder<TModel> RadarArea<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarAreaSeries = new ChartRadarAreaSeries<TModel, TValue, TCategory>(valueExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(radarAreaSeries);

            return new ChartRadarAreaSeriesBuilder<TModel>(radarAreaSeries);
        }

        /// <summary>
        /// Defines bound radar area series.
        /// </summary>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartRadarAreaSeriesBuilder<TModel> RadarArea(string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return RadarArea(null, valueMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound radar area series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value member.
        /// </param>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartRadarAreaSeriesBuilder<TModel> RadarArea(Type memberType, string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var seriesType = typeof(ChartRadarAreaSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartRadarAreaSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = valueMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartRadarAreaSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines radar area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartRadarAreaSeriesBuilder<TModel> RadarArea(IEnumerable data)
        {
            ChartRadarAreaSeries<TModel, object> radarAreaSeries = new ChartRadarAreaSeries<TModel, object>(data);

            Container.Series.Add(radarAreaSeries);

            return new ChartRadarAreaSeriesBuilder<TModel>(radarAreaSeries);
        }

        /// <summary>
        /// Defines bound radar column series.
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
        public virtual ChartRadarColumnSeriesBuilder<TModel> RadarColumn<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarColumnSeries = new ChartRadarColumnSeries<TModel, TValue, TCategory>(valueExpression, colorExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(radarColumnSeries);

            return new ChartRadarColumnSeriesBuilder<TModel>(radarColumnSeries);
        }

        /// <summary>
        /// Defines bound radar column series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="colorExpression">
        /// The expression used to extract the point color from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartRadarColumnSeriesBuilder<TModel> RadarColumn<TValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarColumnSeries = new ChartRadarColumnSeries<TModel, TValue, string>(valueExpression, colorExpression, null, noteTextExpression);

            Container.Series.Add(radarColumnSeries);

            return new ChartRadarColumnSeriesBuilder<TModel>(radarColumnSeries);
        }

        /// <summary>
        /// Defines bound radar column series.
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
        public virtual ChartRadarColumnSeriesBuilder<TModel> RadarColumn(string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return RadarColumn(null, valueMemberName, colorMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound radar column series.
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
        public virtual ChartRadarColumnSeriesBuilder<TModel> RadarColumn(Type memberType, string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var ntoeTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var seriesType = typeof(ChartRadarColumnSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IBarSeries)BuildSeries(seriesType, valueExpr, colorExpr, categoryExpr, ntoeTextExpr);

            series.Member = valueMemberName;
            series.ColorMember = colorMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartRadarColumnSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines radar column series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartRadarColumnSeriesBuilder<TModel> RadarColumn(IEnumerable data)
        {
            ChartRadarColumnSeries<TModel, object> radarColumnSeries = new ChartRadarColumnSeries<TModel, object>(data);

            Container.Series.Add(radarColumnSeries);

            return new ChartRadarColumnSeriesBuilder<TModel>(radarColumnSeries);
        }

        /// <summary>
        /// Defines bound radar line series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        public virtual ChartRadarLineSeriesBuilder<TModel> RadarLine<TValue>(Expression<Func<TModel, TValue>> valueExpression)
        {
            return RadarLine<TValue, string>(valueExpression, null, null);
        }

        /// <summary>
        /// Defines bound radar line series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="categoryExpression">
        /// The expression used to extract the point category from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartRadarLineSeriesBuilder<TModel> RadarLine<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarLineSeries = new ChartRadarLineSeries<TModel, TValue, TCategory>(valueExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(radarLineSeries);

            return new ChartRadarLineSeriesBuilder<TModel>(radarLineSeries);
        }

        /// <summary>
        /// Defines bound radar line series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the point note text from the chart model
        /// </param>
        public virtual ChartRadarLineSeriesBuilder<TModel> RadarLine<TValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarLineSeries = new ChartRadarLineSeries<TModel, TValue, string>(valueExpression, null, noteTextExpression);

            Container.Series.Add(radarLineSeries);

            return new ChartRadarLineSeriesBuilder<TModel>(radarLineSeries);
        }

        /// <summary>
        /// Defines bound radar line series.
        /// </summary>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartRadarLineSeriesBuilder<TModel> RadarLine(string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return RadarLine(null, valueMemberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound radar line series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value member.
        /// </param>
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartRadarLineSeriesBuilder<TModel> RadarLine(Type memberType, string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var seriesType = typeof(ChartRadarLineSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartRadarLineSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = valueMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartRadarLineSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines radar line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartRadarLineSeriesBuilder<TModel> RadarLine(IEnumerable data)
        {
            ChartRadarLineSeries<TModel, object> radarLineSeries = new ChartRadarLineSeries<TModel, object>(data);

            Container.Series.Add(radarLineSeries);

            return new ChartRadarLineSeriesBuilder<TModel>(radarLineSeries);
        }

        /// <summary>
        /// Defines bound polar area series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model
        /// </param>
        public virtual ChartPolarAreaSeriesBuilder<TModel> PolarArea<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var polarAreaSeries = new ChartPolarAreaSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(polarAreaSeries);

            return new ChartPolarAreaSeriesBuilder<TModel>(polarAreaSeries);
        }

        /// <summary>
        /// Defines bound polar area series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartPolarAreaSeriesBuilder<TModel> PolarArea(string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            return PolarArea(null, xMemberName, yMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound polar area series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value members.
        /// </param>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartPolarAreaSeriesBuilder<TModel> PolarArea(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartPolarAreaSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartPolarAreaSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartPolarAreaSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines polar area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartPolarAreaSeriesBuilder<TModel> PolarArea(IEnumerable data)
        {
            ChartPolarAreaSeries<TModel, object, object> polarAreaSeries = new ChartPolarAreaSeries<TModel, object, object>(data);

            Container.Series.Add(polarAreaSeries);

            return new ChartPolarAreaSeriesBuilder<TModel>(polarAreaSeries);
        }

        /// <summary>
        /// Defines bound polar line series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model
        /// </param>
        public virtual ChartPolarLineSeriesBuilder<TModel> PolarLine<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var polarLineSeries = new ChartPolarLineSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(polarLineSeries);

            return new ChartPolarLineSeriesBuilder<TModel>(polarLineSeries);
        }

        /// <summary>
        /// Defines bound polar line series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartPolarLineSeriesBuilder<TModel> PolarLine(string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            return PolarLine(null, xMemberName, yMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound polar line series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value members.
        /// </param>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        public virtual ChartPolarLineSeriesBuilder<TModel> PolarLine(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartPolarLineSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartPolarLineSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartPolarLineSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines polar line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartPolarLineSeriesBuilder<TModel> PolarLine(IEnumerable data)
        {
            ChartPolarLineSeries<TModel, object, object> polarLineSeries = new ChartPolarLineSeries<TModel, object, object>(data);

            Container.Series.Add(polarLineSeries);

            return new ChartPolarLineSeriesBuilder<TModel>(polarLineSeries);
        }

        /// <summary>
        /// Defines bound polar scatter series.
        /// </summary>
        /// <param name="xValueExpression">
        /// The expression used to extract the X value from the chart model
        /// </param>
        /// <param name="yValueExpression">
        /// The expression used to extract the Y value from the chart model
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model
        /// </param>
        public virtual ChartPolarScatterSeriesBuilder<TModel> PolarScatter<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var polarScatterSeries = new ChartPolarScatterSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(polarScatterSeries);

            return new ChartPolarScatterSeriesBuilder<TModel>(polarScatterSeries);
        }

        /// <summary>
        /// Defines bound polar scatter series.
        /// </summary>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartPolarScatterSeriesBuilder<TModel> PolarScatter(string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            return PolarScatter(null, xMemberName, yMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound polar scatter series.
        /// </summary>
        /// <param name="memberType">
        /// The type of the value members.
        /// </param>
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartPolarScatterSeriesBuilder<TModel> PolarScatter(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartPolarScatterSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartPolarScatterSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartPolarScatterSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines polar scatter series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartPolarScatterSeriesBuilder<TModel> PolarScatter(IEnumerable data)
        {
            ChartPolarScatterSeries<TModel, object, object> polarScatterSeries = new ChartPolarScatterSeries<TModel, object, object>(data);

            Container.Series.Add(polarScatterSeries);

            return new ChartPolarScatterSeriesBuilder<TModel>(polarScatterSeries);
        }

        /// <summary>
        /// Defines bound box plot series.
        /// </summary>
        public virtual ChartBoxPlotSeriesBuilder<TModel> BoxPlot<TValue, TCategory>(
            Expression<Func<TModel, TValue>> lowerExpression,
            Expression<Func<TModel, TValue>> q1Expression,
            Expression<Func<TModel, TValue>> medianExpression,
            Expression<Func<TModel, TValue>> q3Expression,
            Expression<Func<TModel, TValue>> upperExpression,
            Expression<Func<TModel, TValue>> meanExpression = null,
            Expression<Func<TModel, List<TValue>>> outliersExpression = null,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            var boxPlotSeries = new ChartBoxPlotSeries<TModel, TValue, TCategory>(
                lowerExpression, q1Expression, medianExpression, q3Expression, upperExpression, meanExpression, outliersExpression, colorExpression, categoryExpression, noteTextExpression
            );

            Container.Series.Add(boxPlotSeries);

            return new ChartBoxPlotSeriesBuilder<TModel>(boxPlotSeries);
        }

        /// <summary>
        /// Defines bound box plot series.
        /// </summary>
        public virtual ChartBoxPlotSeriesBuilder<TModel> BoxPlot<TValue>(
            Expression<Func<TModel, TValue>> lowerExpression,
            Expression<Func<TModel, TValue>> q1Expression,
            Expression<Func<TModel, TValue>> medianExpression,
            Expression<Func<TModel, TValue>> q3Expression,
            Expression<Func<TModel, TValue>> upperExpression,
            Expression<Func<TModel, TValue>> meanExpression = null,
            Expression<Func<TModel, List<TValue>>> outliersExpression = null,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null
            )
        {
            return BoxPlot<TValue, string>(lowerExpression, q1Expression, medianExpression, q3Expression, upperExpression, meanExpression, outliersExpression, colorExpression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound box plot series.
        /// </summary>
        public virtual ChartBoxPlotSeriesBuilder<TModel> BoxPlot(
            string lowerMemberName,
            string q1MemberName,
            string medianMemberName,
            string q3MemberName,
            string upperMemberName,
            string meanMemberName,
            string outliersMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            return BoxPlot(
                null, lowerMemberName, q1MemberName, medianMemberName,
                q3MemberName, upperMemberName, meanMemberName, outliersMemberName,
                colorMemberName, categoryMemberName, noteTextMemberName
            );
        }

        /// <summary>
        /// Defines bound box plot series.
        /// </summary>
        public virtual ChartBoxPlotSeriesBuilder<TModel> BoxPlot(
            Type memberType,
            string lowerMemberName,
            string q1MemberName,
            string medianMemberName,
            string q3MemberName,
            string upperMemberName,
            string meanMemberName = null,
            string outliersMemberName = null,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var lowerExpr = BuildMemberExpression(memberType, lowerMemberName);
            var q1Expr = BuildMemberExpression(memberType, q1MemberName);
            var medianExpr = BuildMemberExpression(memberType, medianMemberName);
            var q3Expr = BuildMemberExpression(memberType, q3MemberName);
            var upperExpr = BuildMemberExpression(memberType, upperMemberName);
            var meanExpr = BuildMemberExpression(memberType, meanMemberName);
            var outliersExpr = BuildMemberExpression(memberType, outliersMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(memberType, colorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(memberType, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;

            var seriesType = typeof(ChartBoxPlotSeries<,,>).MakeGenericType(
                typeof(TModel), lowerExpr.Body.Type, categoryType
            );

            var series = (IChartBoxPlotSeries)BuildSeries(
                seriesType, lowerExpr, q1Expr, medianExpr, q3Expr, upperExpr, meanExpr, outliersExpr,
                colorExpr, categoryExpr, noteTextExpr
            );

            if (!series.Name.HasValue())
            {
                series.Name = lowerMemberName.AsTitle() + ", " + q1MemberName.AsTitle() + ", " + medianMemberName.AsTitle() + ", " + q3MemberName.AsTitle() + ", " + upperMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartBoxPlotSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines box plot series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartBoxPlotSeriesBuilder<TModel> BoxPlot(IEnumerable data)
        {
            var boxPlotSeries = new ChartBoxPlotSeries<TModel, object, string>(data);

            Container.Series.Add(boxPlotSeries);

            return new ChartBoxPlotSeriesBuilder<TModel>(boxPlotSeries);
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