namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Extensions;

    internal class GridClientObjectSerializer<T>
        where T : class
    {
        private readonly Grid<T> grid;
        
        public GridClientObjectSerializer(Grid<T> grid)
        {
            this.grid = grid;
        }

        public void Serialize(IClientSideObjectWriter writer)
        {
            var columns = new List<IDictionary<string, object>>();

            grid.VisibleColumns.Each(column =>
            {
                columns.Add(column.CreateSerializer().Serialize());
            });

            if (columns.Any())
            {
                writer.AppendCollection("columns", columns);
            }
            
            new GridPluginSerializer(grid).SerializeTo(writer);
            
            new GridUrlFormatSerializer<T>(grid).SerializeTo(writer);

            grid.Editing.SerializeTo("editing", writer);
            var shouldSerializeDataSource = false;

            if (grid.OutputValidation)
            {
                writer.AppendObject("validationMetadata", grid.ValidationMetadata);
            }

            shouldSerializeDataSource = grid.Editing.Enabled && grid.IsClientBinding && !grid.IsEmpty;

            if (grid.Grouping.Enabled)
            {
                writer.Append("groupable", true);
            }

            if (grid.Paging.Enabled)
            {
                //TODO: autoBind = false when server bound only
                writer.AppendObject("pageable", new { autoBind = false });
            }

            if (grid.Sorting.Enabled)
            {
                writer.Append("sortable", true);
            }

            if (grid.Selection.Enabled)
            {
                writer.Append("selectable", true);
            }

            if (grid.Filtering.Enabled)
            {
                writer.Append("selectable", true);
            }

            if (grid.DataBinding.IsClientOperationMode)
            {
                writer.Append("operationMode", "client");
                shouldSerializeDataSource = true;
            }

            grid.KeyboardNavigation.SerializeTo("keyboardNavigation", writer);
            grid.ColumnContextMenu.SerializeTo("columnContextMenu", writer);

            if (shouldSerializeDataSource)
            {
                grid.SerializeDataSource(writer);
            }

            grid.ClientEvents.SerializeTo("clientEvents", writer);
            //TODO: Localization
            //grid.Localization.SerializeTo("localization", writer);            

            if (grid.DetailView != null)
            {
                grid.DetailView.SerializeTo("detail", writer);
            }

            if (grid.ClientRowTemplate.HasValue())
            {
                writer.Append("rowTemplate", grid.IsSelfInitialized ? grid.ClientRowTemplate.Replace("<", "%3c").Replace(">", "%3e") : grid.ClientRowTemplate);
            }

            //TODO: No records template
            //writer.Append("noRecordsTemplate", grid.NoRecordsTemplate);                
            writer.AppendObject("dataSource", grid.DataSource.ToJson());

            //TODO: This depends on whether the grid is initially bound
            writer.Append("autoBind", false);
        }
    }
}