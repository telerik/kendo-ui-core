namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.UI;
    using Extensions;
    using Infrastructure;
    using System.Collections.Generic;
    using System.Linq;
    using System;

    public class GridRowBuilderFactory : IGridRowBuilderFactory
    {
        private readonly IGridCellBuilderFactory cellBuilderFactory;
        private readonly IGridRowBuilderDecoratorProvider decoratorProvider;
        private readonly IGridTableBulderFactory tableBuilderFactory;

        public GridRowBuilderFactory(IGridTableBulderFactory tableBuilderFactory, IGridCellBuilderFactory cellBuilderFactory, IGridRowBuilderDecoratorProvider decoratorProvider)
        {
            this.tableBuilderFactory = tableBuilderFactory;
            this.cellBuilderFactory = cellBuilderFactory;
            this.decoratorProvider = decoratorProvider;

            BuilderRegistry = new Dictionary<GridItemType, Func<GridRenderingData, GridItem, IGridRowBuilder>>{
                { GridItemType.DataRow, CreateDataRowBuilder },
                { GridItemType.GroupRow, CreateGroupRowBuilder },
                { GridItemType.EditRow, CreateEditRowBuilder },
                { GridItemType.InsertRow, CreateInsertRowBuilder },
                { GridItemType.DetailRow, CreateDetailRowBuilder },
                { GridItemType.EmptyRow, CreateEmptyRowBuilder },
                { GridItemType.GroupFooterRow, CreateGroupFooterRowBuilder },
            };
        }

        protected IDictionary<GridItemType, Func<GridRenderingData, GridItem, IGridRowBuilder>> BuilderRegistry 
        { 
            get; 
            private set; 
        }

        public IGridRowBuilder CreateBuilder(GridRenderingData renderingData, GridItem item)
        {
            var creator = BuilderRegistry[item.Type];

            ExecuteRowCallback(item, renderingData.Callback);

            var gridRowBuilder = creator(renderingData, item);

            return decoratorProvider.ApplyDecorators(gridRowBuilder, item, renderingData.HasDetailTemplate);
        }

        public virtual IGridRowBuilder CreateFooterBuilder(GridRenderingData renderingData)
        {
            var builder = new GridRowBuilder(renderingData.Columns.Select(column => cellBuilderFactory.CreateFooterCellBuilder(column, renderingData.AggregateResults )));

            var item = new GridItem
            {
                GroupLevel = renderingData.GroupMembers.Count(),
                Type = GridItemType.FooterRow
            };

            return decoratorProvider.ApplyDecorators(builder, item, renderingData.HasDetailTemplate);
        }

        public virtual IGridRowBuilder CreateHeaderBuilder(GridRenderingData renderingData)
        {
            var builder = new GridRowBuilder(renderingData.Columns.Select(cellBuilderFactory.CreateHeaderCellBuilder));

            var item = new GridItem
            {
                GroupLevel = renderingData.GroupMembers.Count(),
                Type = GridItemType.HeaderRow
            };

            return decoratorProvider.ApplyDecorators(builder, item, renderingData.HasDetailTemplate);
        }

        protected virtual IGridRowBuilder CreateDataRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            if (renderingData.RowTemplate != null)
            {
                return new GridTemplateRowBuilder(td => renderingData.RowTemplate(item.DataItem, td), renderingData.Colspan);
            }

            return new GridDataRowBuilder(item.DataItem, renderingData.Columns.Select(column => cellBuilderFactory.CreateDisplayCellBuilder(column, renderingData.HtmlHelper)));
        }

        protected virtual IGridRowBuilder CreateDetailRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return new GridDetailRowBuilder
            {
                Colspan = (renderingData.Colspan - 1) - item.GroupLevel,
                DataItem = item.DataItem,
                Template = renderingData.DetailTemplate,
                Expanded = item.Expanded,
                IsMasterAlternate = item is GridDetailViewItem && ((item as GridDetailViewItem).Parent.State & GridItemStates.Alternating) == GridItemStates.Alternating,
                Html = item.DetailRowHtml,
                HtmlAttributes = item.DetailRowHtmlAttributes
            };
        }

        protected virtual IGridEditFormBuilder CreateEditFormBuilder(GridRenderingData renderingData, GridItem item)
        {
            return CreateEditFormBuilder(renderingData, 
                item, 
                (command) => command.CreateEditButtons(renderingData.Localization, renderingData.UrlBuilder, renderingData.HtmlHelper), 
                renderingData.UrlBuilder.UpdateUrl
            );
        }

        protected virtual IGridRowBuilder CreateEditRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            switch (renderingData.EditMode)
            {
               //TODO: Implement InForms editing
                //case GridEditMode.InForm:
                //    return CreateInformEditRowBuilder(renderingData, item);
                case GridEditMode.PopUp:
                    return CreatePopUpEditRowBuilder(renderingData, item);
                default:
                    return CreateInLineEditRowBuilder(renderingData, item);
            }
        }

        protected virtual IGridRowBuilder CreateEmptyRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return new GridEmptyRowBuilder(renderingData.Colspan, renderingData.NoRecordsTemplate);
        }

        private object ExtractForeignKeyText(IGridBoundColumn column, object key) 
        {
            var foreignKeyColumn = column as IGridForeignKeyColumn;
            if (foreignKeyColumn != null && foreignKeyColumn.Data != null)
            {
                var data = foreignKeyColumn.Data;
                if (!data.Any(i => i.Selected))
                {
                    if (key != null)
                    {
                        var selectedItem = data.FirstOrDefault(i => i.Value.Equals(key.ToString()));
                        if (selectedItem != null)
                        {
                            return selectedItem.Text;
                        }
                    }
                }
                else
                {
                    return data.First(i => i.Selected).Text;
                }
            }
            return key;
        }

        protected virtual IGridRowBuilder CreateGroupRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            var groupKey = ((IGroup) item.DataItem).Key;
            
            var colspan = renderingData.Colspan - item.GroupLevel;
            
            var member = renderingData.GroupMembers.ElementAtOrDefault(item.GroupLevel);
            
            var column = renderingData.Columns.OfType<IGridBoundColumn>().FirstOrDefault(c => c.Member == member);

            var format = column != null && column.Format.HasValue() ? column.Format : "{0}";
                       

            var template = new HtmlTemplate<GridGroupAggregateResult>
            {
                InlineTemplate = (result) => "{0}: {1}".FormatWith(result.Title, format.FormatWith(ExtractForeignKeyText(column, result.Key)))
            };

            var title = member.AsTitle();

            if (column != null)
            {
                title = column.Title.HasValue() ? column.Title : column.Member.AsTitle();
                if (column.GroupHeaderTemplate.HasValue())
                {
                    template = column.GroupHeaderTemplate;
                }
            }
            
            var functionsGroup = item.DataItem as AggregateFunctionsGroup;
            var itemAggregateResult = functionsGroup.GetAggregateResults(renderingData.Aggregates);

            var aggregateResult = new GridGroupAggregateResult(title, groupKey, itemAggregateResult);
            
            return new GridGroupRowBuilder((container) => template.Apply(aggregateResult, container), colspan);
        }

        protected virtual IGridRowBuilder CreateGroupFooterRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            var functionsGroup = item.DataItem as AggregateFunctionsGroup;
            var itemAggregateResult = functionsGroup.GetAggregateResults(renderingData.Aggregates);
            return new GridGroupFooterRowBuilder(renderingData.Columns.Select(column => cellBuilderFactory.CreateGroupFooterCellBuilder(column, itemAggregateResult)));
        }

        protected virtual IGridRowBuilder CreateInformEditRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return new GridInFormEditRowBuilder(CreateEditFormBuilder(renderingData, item), renderingData.Colspan);
        }

        protected virtual IGridRowBuilder CreateInFormInsertRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return new GridInFormEditRowBuilder(CreateInsertFormBuilder(renderingData, item), renderingData.Colspan);
        }

        protected virtual IGridRowBuilder CreateInLineEditRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return CreateInLineRowBuilder(renderingData, item, renderingData.UrlBuilder.UpdateUrl, cellBuilderFactory.CreateEditCellBuilder);
        }

        protected virtual IGridRowBuilder CreateInLineInsertRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return CreateInLineRowBuilder(renderingData, item, renderingData.UrlBuilder.InsertUrl, cellBuilderFactory.CreateInsertCellBuilder);
        }

        protected virtual IGridEditFormBuilder CreateInsertFormBuilder(GridRenderingData renderingData, GridItem item)
        {
            return CreateEditFormBuilder(renderingData,
                item,
                (command) => command.CreateInsertButtons(renderingData.Localization, renderingData.UrlBuilder,
                                                        renderingData.HtmlHelper), 
                renderingData.UrlBuilder.InsertUrl
            );
        }

        protected virtual IGridRowBuilder CreateInsertRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            switch (renderingData.EditMode)
            {
                //TODO: Implement InForm editing
                //case GridEditMode.InForm:
                //    return CreateInFormInsertRowBuilder(renderingData, item);
                case GridEditMode.PopUp:
                    return CreatePopUpInsertRowBuilder(renderingData, item);
                default:
                    return CreateInLineInsertRowBuilder(renderingData, item);
            }
        }

        protected virtual IGridRowBuilder CreatePopUpEditRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return new GridPopUpEditRowBuilder(CreateDataRowBuilder(renderingData, item), CreateEditFormBuilder(renderingData, item), renderingData.PopUpContainer);
        }

        protected virtual IGridRowBuilder CreatePopUpInsertRowBuilder(GridRenderingData renderingData, GridItem item)
        {
            return new GridPopUpInsertRowBuilder(CreateInsertFormBuilder(renderingData, item), renderingData.PopUpContainer);
        }

        private IGridEditFormBuilder CreateEditFormBuilder(GridRenderingData renderingData, GridItem item, 
            Func<IGridActionCommand, IEnumerable<IGridButtonBuilder>> buttons, Func<object, string> action)
        {
            var commands = renderingData.Columns.OfType<IGridActionColumn>().SelectMany(column => column.Commands);

            var editCommand = commands.OfType<GridEditActionCommand>().FirstOrDefault() ?? new GridEditActionCommand();

            var buttonBuilders = buttons(editCommand).Select(builder =>
            {
                Func<IHtmlNode> result = () => builder.Create(item.DataItem);
                return result;
            });

            var formHtmlAttributes = CreateFormAttributes(renderingData.FormId, action(item.DataItem));
            //formHtmlAttributes.Merge(renderingData.EditFormHtmlAttributes);

            return new GridEditFormBuilder(new GridFormBuilder(formHtmlAttributes), 
                () => renderingData.HtmlHelper.EditorForModel(item.DataItem, 
                    renderingData.EditTemplateName, 
                    renderingData.Columns.OfType<IGridForeignKeyColumn>().Select(c => c.SerializeSelectList),
                    renderingData.AdditionalViewData
                ), 
                buttonBuilders);
        }

        private Dictionary<string, object> CreateFormAttributes(string formId, string action)
        {
            var formHtmlAttributes = new Dictionary<string, object>{
                { "id", formId },
                { "action", action },
                { "class" , UIPrimitives.Grid.EditingForm }
            };
            return formHtmlAttributes;
        }

        private IGridRowBuilder CreateInLineRowBuilder(GridRenderingData renderingData, GridItem item, Func<object, string> action, Func<IGridColumn, IGridHtmlHelper, IGridDataCellBuilder> cellBuilder)
        {
            //TODO: Implement hidden columns
            var tableBuilder = tableBuilderFactory.CreateTableBuilder(renderingData.Columns.Select(c => new GridColData { Width = c.Width/*, Hidden = c.Hidden*/ }));

            var cellBuilders = renderingData.Columns.Select(column => cellBuilder(column, renderingData.HtmlHelper));

            var formHtmlAttributes = CreateFormAttributes(renderingData.FormId, action(item.DataItem));
            //formHtmlAttributes.Merge(renderingData.EditFormHtmlAttributes);

            return new GridInLineEditRowBuilder(tableBuilder, new GridFormBuilder(formHtmlAttributes),
                                                renderingData.Colspan, item.DataItem, cellBuilders);
        }

        private void ExecuteRowCallback(GridItem item, Action<GridItem> callback)
        {
            if (item.Type != GridItemType.DetailRow 
                && item.Type != GridItemType.GroupRow
                && item.Type != GridItemType.GroupFooterRow                
                && item.Type != GridItemType.EmptyRow)
            {
                callback(item);
            }
        }
    }
}
