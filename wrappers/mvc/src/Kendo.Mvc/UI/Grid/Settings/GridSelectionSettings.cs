namespace Kendo.Mvc.UI
{
    public class GridSelectionSettings
    {
        public GridSelectionSettings()
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
