namespace KendoUI.Mvc.UI
{
    /// <summary>
    /// Specifies the expand mode in which the panelbar will expand its items
    /// </summary>
    public enum PanelBarExpandMode
    {
        /// <summary>
        /// Only one item can be expanded.
        /// </summary>
        [ClientSideEnumValue("'single'")]
        Single,

        /// <summary>
        /// All items can be expanded
        /// </summary>
        [ClientSideEnumValue("'multiple'")]
        Multiple
    }
}