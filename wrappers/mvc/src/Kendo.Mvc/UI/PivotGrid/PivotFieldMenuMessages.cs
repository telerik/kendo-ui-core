namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Resources;
    using System.Collections.Generic;

    public class PivotFieldMenuMessages : JsonObject
    {
        private const string DefaultInfo = "Show items with value that:";
        private const string DefaultFilterFields = "Fields Filter";
        private const string DefaultFilter = "Filter";
        private const string DefaultInclude = "Include Fields...";
        private const string DefaultTitle = "Fields to include";
        private const string DefaultClear = "Clear";
        private const string DefaultOk = "Ok";
        private const string DefaultCancel = "Cancel";

        public PivotFieldMenuMessages()
        { 
            Info = Messages.PivotFieldMenu_Info;
            FilterFields = Messages.PivotFieldMenu_FilterFields;
            Filter = Messages.PivotFieldMenu_Filter;
            Include = Messages.PivotFieldMenu_Include;
            Title = Messages.PivotFieldMenu_Title;
            Clear = Messages.PivotFieldMenu_Clear;
            Ok = Messages.PivotFieldMenu_Ok;
            Cancel = Messages.PivotFieldMenu_Cancel;
            Operators = new StringOperators();
        }

        public string Info { get; set; }
        public string FilterFields { get; set; }
        public string Filter { get; set; }
        public string Include { get; set; }
        public string Title { get; set; }
        public string Clear { get; set; }
        public string Ok { get; set; }
        public string Cancel { get; set; }
        public StringOperators Operators { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Info != DefaultInfo)
            {
                json["info"] = Info;
            }

            if (FilterFields != DefaultFilterFields)
            {
                json["filterFields"] = FilterFields;
            }

            if (Filter != DefaultFilter)
            {
                json["filter"] = Filter;
            }

            if (Include != DefaultInclude)
            {
                json["include"] = Include;
            }

            if (Title != DefaultTitle)
            {
                json["title"] = Title;
            }

            if (Clear != DefaultClear)
            {
                json["clear"] = Clear;
            }

            if (Ok != DefaultOk)
            {
                json["ok"] = Ok;
            }

            if (Cancel != DefaultCancel)
            {
                json["cancel"] = Cancel;
            }

            var operators = Operators.ToJson();
            if (operators.Count > 0)
            {
                json["operators"] = operators;
            }
        }
    }
}
