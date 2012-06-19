namespace Kendo.Mvc.UI
{
    public class GridSelectableSettings
    {
        public GridSelectableSettings()
        {
            Mode = GridSelectionMode.Single;
            Type = GridSelectionType.Row;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public GridSelectionMode Mode
        {
            get;
            set;
        }

        public GridSelectionType Type
        {
            get;
            set;
        }
    }       
}
