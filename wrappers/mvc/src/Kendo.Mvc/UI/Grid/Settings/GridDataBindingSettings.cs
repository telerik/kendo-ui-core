namespace Kendo.Mvc.UI
{
    public class GridDataBindingSettings
    {
        public GridDataBindingSettings(IGrid grid)
        {
            Server = new GridBindingSettings(grid);
            Ajax = new GridClientBindingSettings(grid);
            WebService = new GridClientBindingSettings(grid);
        }

        public GridBindingSettings Server
        {
            get;
            private set;
        }

        public GridClientBindingSettings Ajax
        {
            get;
            private set;
        }

        public GridClientBindingSettings WebService
        {
            get;
            private set;
        }

        public bool IsClientOperationMode
        {
            get
            {
                return (Ajax.Enabled && Ajax.OperationMode == GridOperationMode.Client) ||
                       (WebService.Enabled && WebService.OperationMode == GridOperationMode.Client);
            }
        }
    }
}
