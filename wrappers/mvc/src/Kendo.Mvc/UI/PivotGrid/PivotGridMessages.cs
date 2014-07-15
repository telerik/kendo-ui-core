namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class PivotGridMessages : JsonObject
    {
        private const string DefaultMeasureFields = "Drop Data Fields Here";
        private const string DefaultColumnFields = "Drop Column Fields Here";
        private const string DefaultRowFields = "Drop Rows Fields Here";

        public PivotGridMessages()
        {
            MeasureFields = Messages.PivotConfigurator_Measures;
            ColumnFields = Messages.PivotConfigurator_Columns;
            RowFields = Messages.PivotConfigurator_Rows;
            FieldMenu = new PivotFieldMenuMessages();
        }

        public string MeasureFields { get; set; }
        public string ColumnFields { get; set; }
        public string RowFields { get; set; }
        public PivotFieldMenuMessages FieldMenu { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (MeasureFields != DefaultMeasureFields)
            {
                json["measureFields"] = MeasureFields;
            }

            if (ColumnFields != DefaultColumnFields)
            {
                json["columnFields"] = ColumnFields;
            }

            if (RowFields != DefaultRowFields)
            {
                json["rowFields"] = RowFields;
            }

            var fieldMenu = FieldMenu.ToJson();
            if (fieldMenu.Count > 0)
            {
                json["fieldMenu"] = fieldMenu;
            }
        }
    }
}
