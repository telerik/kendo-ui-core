namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class PivotConfiguratorMessages : JsonObject
    {
        private const string DefaultMeasures = "Drop Data Fields Here";
        private const string DefaultColumns = "Drop Column Fields Here";
        private const string DefaultRows = "Drop Rows Fields Here";
        private const string DefaultMeasuresLabel = "Measures";
        private const string DefaultColumnsLabel = "Columns";
        private const string DefaultRowsLabel = "Rows";
        private const string DefaultFieldsLabel = "Fields";

        public PivotConfiguratorMessages() 
        {
            Measures = Messages.PivotConfigurator_Measures;
            Columns = Messages.PivotConfigurator_Columns;
            Rows = Messages.PivotConfigurator_Rows;
            MeasuresLabel = Messages.PivotConfigurator_MeasuresLabel;
            ColumnsLabel = Messages.PivotConfigurator_ColumnsLabel;
            RowsLabel = Messages.PivotConfigurator_RowsLabel;
            FieldsLabel = Messages.PivotConfigurator_FieldsLabel;
            FieldMenu = new PivotFieldMenuMessages();
        }

        public string Measures { get; set; }
        public string Columns { get; set; }
        public string Rows { get; set; }
        public string MeasuresLabel { get; set; }
        public string ColumnsLabel { get; set; }
        public string RowsLabel { get; set; }
        public string FieldsLabel { get; set; }
        public PivotFieldMenuMessages FieldMenu { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Measures != DefaultMeasures)
            {
                json["measures"] = Measures;
            }

            if (Columns != DefaultColumns)
            {
                json["columns"] = Columns;
            }

            if (Rows != DefaultRows)
            {
                json["rows"] = Rows;
            }

            if (MeasuresLabel != DefaultMeasuresLabel)
            {
                json["measuresLabel"] = MeasuresLabel;
            }

            if (ColumnsLabel != DefaultColumnsLabel)
            {
                json["columnsLabel"] = ColumnsLabel;
            }

            if (RowsLabel != DefaultRowsLabel)
            {
                json["rowsLabel"] = RowsLabel;
            }

            if (FieldsLabel != DefaultFieldsLabel)
            {
                json["fieldsLabel"] = FieldsLabel;
            }

            var fieldMenu = FieldMenu.ToJson();
            if (fieldMenu.Count > 0)
            {
                json["fieldMenu"] = fieldMenu;
            }
        }
    }
}
