namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using Kendo.Mvc.UI.Html;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure.Implementation.Expressions;

    public class GridForeignKeyColumn<TModel, TValue> : GridBoundColumn<TModel, TValue>, IGridForeignKeyColumn where TModel : class
    {        
        public GridForeignKeyColumn(Grid<TModel> grid, Expression<Func<TModel, TValue>> expression, SelectList data)
            : base(grid, expression)         
        {
            EditorTemplateName = "GridForeignKey";
            Data = data;
        }

        public SelectList Data
        {
            get;
            set;
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            base.Serialize(json);            
            
            if (Grid.IsClientBinding || (!Grid.IsClientBinding && Grid.Filterable.Enabled))
            {
                json["values"] = Data.Select(i => new { text = i.Text, value = i.Value });
            }                        
        }

        protected override IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper)
        {
            if (!Grid.DataSource.IsReadOnly(Member))
            {
                var builder = new GridForeignKeyEditorForCellBuilder<TModel, TValue>()
                {
                    Expression = Expression,
                    AdditionalViewData = AdditionalViewData,
                    ViewContext = Grid.ViewContext,
                    TemplateName = EditorTemplateName,
                    Member = Member,
                    AppendViewData = SerializeSelectList
                };                
                builder.HtmlAttributes.Merge(HtmlAttributes);

                return builder;
            }
            return CreateDisplayBuilder(htmlHelper);
        }

        protected override IGridDataCellBuilder CreateDisplayBuilderCore(Html.IGridHtmlHelper htmlHelper)
        {
            if (Template != null || InlineTemplate != null)
            {
                return base.CreateDisplayBuilderCore(htmlHelper);
            }

            IGridDataCellBuilder builder;

            builder = new GridForeignKeyDataCellBuilder<TModel, TValue>
            {
                Encoded = Encoded,
                Format = Format,
                Value = Value,
                Data = Data
            };            
            builder.HtmlAttributes.Merge(HtmlAttributes);

            return builder;
        }

        protected void AppendSelectList(IDictionary<string, object> viewData, object dataItem)
        {        
            object selectedValue;
            if (!Data.Any(i => i.Selected) && !typeof(TModel).IsDataRow())
            {
                selectedValue = ((Expression<Func<TModel, TValue>>)System.Linq.Expressions.Expression.Lambda(typeof(Func<TModel, TValue>), ExpressionFactory.LiftMemberAccessToNull(Expression.Body), Expression.Parameters)).Compile().Invoke((TModel)dataItem);
            }
            else
            {
                selectedValue = Data.SelectedValue;
            }

            viewData[Member + "_Data"] = new SelectList(Data.Items, Data.DataValueField, Data.DataTextField, selectedValue);
        }
        
        public Action<IDictionary<string, object>, object> SerializeSelectList
        {
            get { return AppendSelectList; }
        }
    }
}
