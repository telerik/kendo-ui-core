// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using KendoUI.Mvc.UI.Html;
    using KendoUI.Mvc.Extensions;
    using System.Web.Mvc;
    using System.Collections.Generic;
    using KendoUI.Mvc.Infrastructure.Implementation.Expressions;

    public class GridForeignKeyColumn<TModel, TValue> : GridBoundColumn<TModel, TValue>, IGridForeignKeyColumn where TModel : class
    {        
        public GridForeignKeyColumn(Grid<TModel> grid, Expression<Func<TModel, TValue>> expression, SelectList data)
            : base(grid, expression)         
        {
#if MVC2 || MVC3
            EditorTemplateName = "GridForeignKey";
#endif
            Data = data;
        }

        public SelectList Data
        {
            get;
            set;
        }

        public override IGridColumnSerializer CreateSerializer()
        {
            return new GridForeignKeyColumnSerializer(this);
        }

        protected override IGridDataCellBuilder CreateEditBuilderCore(IGridHtmlHelper htmlHelper)
        {
#if MVC2 || MVC3
            if (!ReadOnly)
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
#endif
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
            if (!Data.Any(i => i.Selected))
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
