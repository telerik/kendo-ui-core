namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Represents the dependency types supported by Kendo UI Gantt for ASP.NET MVC
    /// </summary>
    public enum DependencyType
    {
        /// <summary>
        /// The task cannot end before its predecessor task ends, although it may end later.
        /// </summary>
        FinishFinish = 0,
        /// <summary>
        /// The task cannot start before its predecessor task ends, although it may start later.
        /// </summary>
        FinishStart = 1,
        /// <summary>
        /// The task cannot end before its predecessor task starts, although it may end later.
        /// </summary>
        StartFinish = 2,
        /// <summary>
        /// The task cannot start until the predecessor tasks starts, although it may start later.
        /// </summary>
        StartStart = 3
    }
}
