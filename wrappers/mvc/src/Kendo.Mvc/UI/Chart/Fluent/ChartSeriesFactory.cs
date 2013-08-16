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
        /// <param name="valueMemberName">
        /// The name of the value member.
        /// </param>
        /// <param name="colorMemberName">
        /// The name of the color member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Bar(
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
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
        public virtual ChartBarSeriesBuilder<TModel> Bar(
            Type memberType,
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {           
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
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
        public virtual ChartBarSeriesBuilder<TModel> Column(
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
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
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> Column(
            Type memberType,
            string valueMemberName,
            string colorMemberName = null,
            string categoryMemberName = null,
            string noteTextMemberName = null)
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
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> Line(string memberName, string categoryMemberName = null, string noteTextExpression = null)
        {
            return Line(null, memberName, categoryMemberName, noteTextExpression);
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
        public virtual ChartLineSeriesBuilder<TModel> Line(Type memberType, string memberName, string categoryMemberName = null, string noteTextExpression = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var noteTextExpr = noteTextExpression.HasValue() ? BuildMemberExpression(null, noteTextExpression) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var seriesType = typeof(ChartLineSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
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
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var builder = Line(memberName, categoryMemberName, noteTextMemberName);
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
        public virtual ChartLineSeriesBuilder<TModel> VerticalLine(
            Type memberType,
            string memberName,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var builder = Line(memberType, memberName, categoryMemberName, noteTextMemberName);
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
        /// Defines bound step line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartStepLineSeriesBuilder<TModel> StepLine<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            return StepLine<TValue, string>(expression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound step line series.
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
        public virtual ChartStepLineSeriesBuilder<TModel> StepLine<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            ChartStepLineSeries<TModel, TValue, TCategory> stepLineSeries = new ChartStepLineSeries<TModel, TValue, TCategory>(expression, categoryExpression, noteTextExpression);

            Container.Series.Add(stepLineSeries);

            return new ChartStepLineSeriesBuilder<TModel>(stepLineSeries);
        }

        /// <summary>
        /// Defines bound step line series.
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
        public virtual ChartStepLineSeriesBuilder<TModel> StepLine(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return StepLine(null, memberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound step line series.
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
        public virtual ChartStepLineSeriesBuilder<TModel> StepLine(Type memberType, string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;
            var seriesType = typeof(ChartStepLineSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartStepLineSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = memberName;

            if (!series.Name.HasValue())
            {
                series.Name = memberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartStepLineSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines step line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartStepLineSeriesBuilder<TModel> StepLine(IEnumerable data)
        {
            ChartStepLineSeries<TModel, object> stepLineSeries = new ChartStepLineSeries<TModel, object>(data);

            Container.Series.Add(stepLineSeries);

            return new ChartStepLineSeriesBuilder<TModel>(stepLineSeries);
        }

        /// <summary>
        /// Defines bound vertical step line series.
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
        public virtual ChartStepLineSeriesBuilder<TModel> VerticalStepLine<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = StepLine(expression, categoryExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical step line series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartStepLineSeriesBuilder<TModel> VerticalStepLine<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = StepLine(expression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical step line series.
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
        public virtual ChartStepLineSeriesBuilder<TModel> VerticalStepLine(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var builder = StepLine(memberName, categoryMemberName, noteTextMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical step line series.
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
        public virtual ChartStepLineSeriesBuilder<TModel> VerticalStepLine(
            Type memberType,
            string memberName,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var builder = StepLine(memberType, memberName, categoryMemberName, noteTextMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines vertical line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartStepLineSeriesBuilder<TModel> VerticalStepLine(IEnumerable data)
        {
            ChartStepLineSeries<TModel, object> verticalStepLineSeries = new ChartStepLineSeries<TModel, object>(data);

            Container.Series.Add(verticalStepLineSeries);

            var builder = new ChartStepLineSeriesBuilder<TModel>(verticalStepLineSeries);
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
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> Area(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return Area(null, memberName, categoryMemberName, noteTextMemberName);
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
        public virtual ChartAreaSeriesBuilder<TModel> Area(Type memberType, string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;
            var seriesType = typeof(ChartAreaSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
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
        /// <param name="memberName">
        /// The name of the value member.
        /// </param>
        /// <param name="categoryMemberName">
        /// The name of the category member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var builder = Area(memberName, categoryMemberName, noteTextMemberName);
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
        public virtual ChartAreaSeriesBuilder<TModel> VerticalArea(
            Type memberType,
            string memberName,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var builder = Area(memberType, memberName, categoryMemberName, noteTextMemberName);
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
        /// Defines bound step area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartStepAreaSeriesBuilder<TModel> StepArea<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            return StepArea<TValue, string>(expression, null, noteTextExpression);
        }

        /// <summary>
        /// Defines bound step area series.
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
        public virtual ChartStepAreaSeriesBuilder<TModel> StepArea<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            ChartStepAreaSeries<TModel, TValue, TCategory> stepAreaSeries = new ChartStepAreaSeries<TModel, TValue, TCategory>(expression, categoryExpression, noteTextExpression);

            Container.Series.Add(stepAreaSeries);

            return new ChartStepAreaSeriesBuilder<TModel>(stepAreaSeries);
        }

        /// <summary>
        /// Defines bound step area series.
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
        public virtual ChartStepAreaSeriesBuilder<TModel> StepArea(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            return StepArea(null, memberName, categoryMemberName, noteTextMemberName);
        }

        /// <summary>
        /// Defines bound step area series.
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
        public virtual ChartStepAreaSeriesBuilder<TModel> StepArea(Type memberType, string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, memberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;
            var seriesType = typeof(ChartStepAreaSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartStepAreaSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = memberName;

            if (!series.Name.HasValue())
            {
                series.Name = memberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartStepAreaSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines step area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartStepAreaSeriesBuilder<TModel> StepArea(IEnumerable data)
        {
            ChartStepAreaSeries<TModel, object> stepAreaSeries = new ChartStepAreaSeries<TModel, object>(data);

            Container.Series.Add(stepAreaSeries);

            return new ChartStepAreaSeriesBuilder<TModel>(stepAreaSeries);
        }

        /// <summary>
        /// Defines bound vertical step area series.
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
        public virtual ChartStepAreaSeriesBuilder<TModel> VerticalStepArea<TValue, TCategory>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = StepArea(expression, categoryExpression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical step area series.
        /// </summary>
        /// <param name="expression">
        /// The expression used to extract the value from the chart model.
        /// </param>
        /// <param name="noteTextExpression">
        /// The expression used to extract the note text from the chart model.
        /// </param>
        public virtual ChartStepAreaSeriesBuilder<TModel> VerticalStepArea<TValue>(
            Expression<Func<TModel, TValue>> expression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var builder = StepArea(expression, noteTextExpression);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical step area series.
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
        public virtual ChartStepAreaSeriesBuilder<TModel> VerticalStepArea(string memberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var builder = StepArea(memberName, categoryMemberName, noteTextMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines bound vertical step area series.
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
        public virtual ChartStepAreaSeriesBuilder<TModel> VerticalStepArea(
            Type memberType,
            string memberName,
            string categoryMemberName = null,
            string noteTextMemberName = null)
        {
            var builder = StepArea(memberType, memberName, categoryMemberName, noteTextMemberName);
            builder.Series.Orientation = ChartSeriesOrientation.Vertical;

            return builder;
        }

        /// <summary>
        /// Defines vertical area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartStepAreaSeriesBuilder<TModel> VerticalStepArea(IEnumerable data)
        {
            ChartStepAreaSeries<TModel, object> verticalStepAreaSeries = new ChartStepAreaSeries<TModel, object>(data);

            Container.Series.Add(verticalStepAreaSeries);

            var builder = new ChartStepAreaSeriesBuilder<TModel>(verticalStepAreaSeries);
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
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextMemberName">
        /// The name of the note text member.
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> Scatter(string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            return Scatter(null, xMemberName, yMemberName, noteTextMemberName);
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
        public virtual ChartScatterSeriesBuilder<TModel> Scatter(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;

            var seriesType = typeof(ChartScatterSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
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
        /// <param name="xMemberName">
        /// The name of the X value member.
        /// </param>
        /// <param name="yMemberName">
        /// The name of the Y value member.
        /// </param>
        /// <param name="noteTextExpression">
        /// The name of the Y value member.
        /// </param>
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine(string xMemberName, string yMemberName, string noteTextExpression = null)
        {
            return ScatterLine(null, xMemberName, yMemberName, noteTextExpression);
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
        public virtual ChartScatterLineSeriesBuilder<TModel> ScatterLine(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;

            var seriesType = typeof(ChartScatterLineSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterLineSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
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
            var series = (IChartBubbleSeries) BuildSeries(
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
        /// Defines bound pie series.
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
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(memberType, noteTextMemberName) : null;

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
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(memberType, noteTextMemberName) : null;

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
        public virtual ChartAreaSeriesBuilder<TModel> RadarArea<TValue>(Expression<Func<TModel, TValue>> valueExpression)
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
        public virtual ChartAreaSeriesBuilder<TModel> RadarArea<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarAreaSeries = new ChartRadarAreaSeries<TModel, TValue, TCategory>(valueExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(radarAreaSeries);

            return new ChartAreaSeriesBuilder<TModel>(radarAreaSeries);
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
        public virtual ChartAreaSeriesBuilder<TModel> RadarArea(string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
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
        public virtual ChartAreaSeriesBuilder<TModel> RadarArea(Type memberType, string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var seriesType = typeof(ChartRadarAreaSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartAreaSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = valueMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartAreaSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines radar area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartAreaSeriesBuilder<TModel> RadarArea(IEnumerable data)
        {
            ChartRadarAreaSeries<TModel, object> radarAreaSeries = new ChartRadarAreaSeries<TModel, object>(data);

            Container.Series.Add(radarAreaSeries);

            return new ChartAreaSeriesBuilder<TModel>(radarAreaSeries);
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
        public virtual ChartBarSeriesBuilder<TModel> RadarColumn<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, TCategory>> categoryExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarColumnSeries = new ChartRadarColumnSeries<TModel, TValue, TCategory>(valueExpression, colorExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(radarColumnSeries);

            return new ChartBarSeriesBuilder<TModel>(radarColumnSeries);
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
        public virtual ChartBarSeriesBuilder<TModel> RadarColumn<TValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> colorExpression = null,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarColumnSeries = new ChartRadarColumnSeries<TModel, TValue, string>(valueExpression, colorExpression, null, noteTextExpression);

            Container.Series.Add(radarColumnSeries);

            return new ChartBarSeriesBuilder<TModel>(radarColumnSeries);
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
        public virtual ChartBarSeriesBuilder<TModel> RadarColumn(string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
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
        public virtual ChartBarSeriesBuilder<TModel> RadarColumn(Type memberType, string valueMemberName, string colorMemberName = null, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var colorExpr = colorMemberName.HasValue() ? BuildMemberExpression(typeof(string), colorMemberName) : null;
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var ntoeTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(typeof(string), noteTextMemberName) : null;
            var seriesType = typeof(ChartRadarColumnSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartBarSeries)BuildSeries(seriesType, valueExpr, colorExpr, categoryExpr, ntoeTextExpr);

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
        /// Defines radar column series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartBarSeriesBuilder<TModel> RadarColumn(IEnumerable data)
        {
            ChartRadarColumnSeries<TModel, object> radarColumnSeries = new ChartRadarColumnSeries<TModel, object>(data);

            Container.Series.Add(radarColumnSeries);

            return new ChartBarSeriesBuilder<TModel>(radarColumnSeries);
        }

        /// <summary>
        /// Defines bound radar line series.
        /// </summary>
        /// <param name="valueExpression">
        /// The expression used to extract the point value from the chart model
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> RadarLine<TValue>(Expression<Func<TModel, TValue>> valueExpression)
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
        public virtual ChartLineSeriesBuilder<TModel> RadarLine<TValue, TCategory>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, TCategory>> categoryExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarLineSeries = new ChartRadarLineSeries<TModel, TValue, TCategory>(valueExpression, categoryExpression, noteTextExpression);

            Container.Series.Add(radarLineSeries);

            return new ChartLineSeriesBuilder<TModel>(radarLineSeries);
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
        public virtual ChartLineSeriesBuilder<TModel> RadarLine<TValue>(
            Expression<Func<TModel, TValue>> valueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var radarLineSeries = new ChartRadarLineSeries<TModel, TValue, string>(valueExpression, null, noteTextExpression);

            Container.Series.Add(radarLineSeries);

            return new ChartLineSeriesBuilder<TModel>(radarLineSeries);
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
        public virtual ChartLineSeriesBuilder<TModel> RadarLine(string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
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
        public virtual ChartLineSeriesBuilder<TModel> RadarLine(Type memberType, string valueMemberName, string categoryMemberName = null, string noteTextMemberName = null)
        {
            var valueExpr = BuildMemberExpression(memberType, valueMemberName);
            var categoryExpr = categoryMemberName.HasValue() ? BuildMemberExpression(null, categoryMemberName) : null;
            var categoryType = categoryExpr == null ? typeof(string) : categoryExpr.Body.Type;
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;
            var seriesType = typeof(ChartRadarLineSeries<,,>).MakeGenericType(typeof(TModel), valueExpr.Body.Type, categoryType);
            var series = (IChartLineSeries)BuildSeries(seriesType, valueExpr, categoryExpr, noteTextExpr);

            series.Member = valueMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = valueMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartLineSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines radar line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to.
        /// </param>
        public virtual ChartLineSeriesBuilder<TModel> RadarLine(IEnumerable data)
        {
            ChartRadarLineSeries<TModel, object> radarLineSeries = new ChartRadarLineSeries<TModel, object>(data);

            Container.Series.Add(radarLineSeries);

            return new ChartLineSeriesBuilder<TModel>(radarLineSeries);
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarArea<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var polarAreaSeries = new ChartPolarAreaSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(polarAreaSeries);

            return new ChartScatterSeriesBuilder<TModel>(polarAreaSeries);
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarArea(string xMemberName, string yMemberName, string noteTextMemberName = null)
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarArea(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;

            var seriesType = typeof(ChartPolarAreaSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartScatterSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines polar area series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> PolarArea(IEnumerable data)
        {
            ChartPolarAreaSeries<TModel, object, object> polarAreaSeries = new ChartPolarAreaSeries<TModel, object, object>(data);

            Container.Series.Add(polarAreaSeries);

            return new ChartScatterSeriesBuilder<TModel>(polarAreaSeries);
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarLine<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var polarLineSeries = new ChartPolarLineSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(polarLineSeries);

            return new ChartScatterSeriesBuilder<TModel>(polarLineSeries);
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarLine(string xMemberName, string yMemberName, string noteTextMemberName = null)
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarLine(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;

            var seriesType = typeof(ChartPolarLineSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartScatterSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines polar line series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> PolarLine(IEnumerable data)
        {
            ChartPolarLineSeries<TModel, object, object> polarLineSeries = new ChartPolarLineSeries<TModel, object, object>(data);

            Container.Series.Add(polarLineSeries);

            return new ChartScatterSeriesBuilder<TModel>(polarLineSeries);
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarScatter<TXValue, TYValue>(
            Expression<Func<TModel, TXValue>> xValueExpression,
            Expression<Func<TModel, TYValue>> yValueExpression,
            Expression<Func<TModel, string>> noteTextExpression = null)
        {
            var polarScatterSeries = new ChartPolarScatterSeries<TModel, TXValue, TYValue>(xValueExpression, yValueExpression, noteTextExpression);

            Container.Series.Add(polarScatterSeries);

            return new ChartScatterSeriesBuilder<TModel>(polarScatterSeries);
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarScatter(string xMemberName, string yMemberName, string noteTextMemberName = null)
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
        public virtual ChartScatterSeriesBuilder<TModel> PolarScatter(Type memberType, string xMemberName, string yMemberName, string noteTextMemberName = null)
        {
            var expressionX = BuildMemberExpression(memberType, xMemberName);
            var expressionY = BuildMemberExpression(memberType, yMemberName);
            var noteTextExpr = noteTextMemberName.HasValue() ? BuildMemberExpression(null, noteTextMemberName) : null;

            var seriesType = typeof(ChartPolarScatterSeries<,,>).MakeGenericType(typeof(TModel), expressionX.Body.Type, expressionY.Body.Type);
            var series = (IChartScatterSeries)BuildSeries(seriesType, expressionX, expressionY, noteTextExpr);

            series.XMember = xMemberName;
            series.YMember = yMemberName;
            series.NoteTextMember = noteTextMemberName;

            if (!series.Name.HasValue())
            {
                series.Name = xMemberName.AsTitle() + ", " + yMemberName.AsTitle();
            }

            Container.Series.Add((ChartSeriesBase<TModel>)series);

            return new ChartScatterSeriesBuilder<TModel>(series);
        }

        /// <summary>
        /// Defines polar scatter series bound to inline data.
        /// </summary>
        /// <param name="data">
        /// The data to bind to
        /// </param>
        public virtual ChartScatterSeriesBuilder<TModel> PolarScatter(IEnumerable data)
        {
            ChartPolarScatterSeries<TModel, object, object> polarScatterSeries = new ChartPolarScatterSeries<TModel, object, object>(data);

            Container.Series.Add(polarScatterSeries);

            return new ChartScatterSeriesBuilder<TModel>(polarScatterSeries);
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