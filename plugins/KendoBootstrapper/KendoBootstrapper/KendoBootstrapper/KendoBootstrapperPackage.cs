using System;
using System.Diagnostics;
using System.Globalization;
using System.Runtime.InteropServices;
using System.ComponentModel.Design;
using Microsoft.Win32;
using Microsoft.VisualStudio;
using Microsoft.VisualStudio.Shell.Interop;
using Microsoft.VisualStudio.OLE.Interop;
using Microsoft.VisualStudio.Shell;
using System.Linq;
using EnvDTE;
using EnvDTE80;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;
using System.Reflection;

namespace Company.KendoBootstrapper
{
    /// <summary>
    /// This is the class that implements the package exposed by this assembly.
    ///
    /// The minimum requirement for a class to be considered a valid package for Visual Studio
    /// is to implement the IVsPackage interface and register itself with the shell.
    /// This package uses the helper classes defined inside the Managed Package Framework (MPF)
    /// to do it: it derives from the Package class that provides the implementation of the 
    /// IVsPackage interface and uses the registration attributes defined in the framework to 
    /// register itself and its components with the shell.
    /// </summary>
    // This attribute tells the PkgDef creation utility (CreatePkgDef.exe) that this class is
    // a package.
    [PackageRegistration(UseManagedResourcesOnly = true)]
    // This attribute is used to register the informations needed to show the this package
    // in the Help/About dialog of Visual Studio.
    [InstalledProductRegistration("#110", "#112", "1.0", IconResourceID = 400)]
    // This attribute is needed to let the shell know that this package exposes some menus.
    [ProvideMenuResource("Menus.ctmenu", 1)]
    // This attribute registers a tool window exposed by this package.
    [ProvideToolWindow(typeof(MyToolWindow))]
    [Guid(GuidList.guidKendoBootstrapperPkgString)]
    public sealed class KendoBootstrapperPackage : Package
    {
        /// <summary>
        /// Default constructor of the package.
        /// Inside this method you can place any initialization code that does not require 
        /// any Visual Studio service because at this point the package object is created but 
        /// not sited yet inside Visual Studio environment. The place to do all the other 
        /// initialization is the Initialize method.
        /// </summary>
        public KendoBootstrapperPackage()
        {
            Trace.WriteLine(string.Format(CultureInfo.CurrentCulture, "Entering constructor for: {0}", this.ToString()));
        }


        private ErrorListProvider errorProvider;

        public ErrorListProvider ErrorProvider
        {
            get
            {
                return errorProvider = errorProvider ?? new ErrorListProvider(this);
            }
        }

        private OutputWindowPane outputPane;

        public OutputWindowPane OutputPane
        {
            get
            {
                if (outputPane == null)
                {
                    var outputWindow = (OutputWindow)DTE.Windows.Item(EnvDTE.Constants.vsWindowKindOutput).Object;
                    outputPane = outputWindow.OutputWindowPanes.Add("Kendo Lint");
                }

                return outputPane;
            }
        }

        private static string AssemblyDirectory()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            var uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }

        /// <summary>
        /// This function is called when the user clicks the menu item that shows the 
        /// tool window. See the Initialize method to see how the menu item is associated to 
        /// this function using the OleMenuCommandService service and the MenuCommand class.
        /// </summary>
        private void ShowToolWindow(object sender, EventArgs e)
        {
            string npm = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "npm");

            foreach (var projectItem in SolutionFiles())
            {
                //Debug.WriteLine(projectItem.Name);
                if (projectItem.Name == "Index.cshtml")
                {
                    Lint(npm, projectItem);
                }
            }


            /*
                        // Get the instance number 0 of this tool window. This window is single instance so this instance
                        // is actually the only one.
                        // The last flag is set to true so that if the tool window does not exists it will be created.
                        ToolWindowPane window = this.FindToolWindow(typeof(MyToolWindow), 0, true);
                        if ((null == window) || (null == window.Frame))
                        {
                            throw new NotSupportedException(Resources.CanNotCreateWindow);
                        }
                        IVsWindowFrame windowFrame = (IVsWindowFrame)window.Frame;
                        Microsoft.VisualStudio.ErrorHandler.ThrowOnFailure(windowFrame.Show());
            */
        }

        private void Lint(string npm, ProjectItem projectItem)
        {
            string path = (string)projectItem.Properties.Item("FullPath").Value;

            var process = new System.Diagnostics.Process();

            var node = Path.Combine(AssemblyDirectory(), "node", "node");
            var lint = Path.Combine(AssemblyDirectory(), "node", "node_modules", "kendo-lint", "bin", "kendo-lint");

            process.StartInfo.FileName = node;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.Arguments = string.Format(@"""{0}"" --html ""{1}""", lint, path);
            process.Start();
            process.WaitForExit();

            //OutputWindow outputWindow = (OutputWindow)DTE.Windows.Item(EnvDTE.Constants.vsWindowKindOutput).Object;
            //outputWindow.ActivePane.Activate();
            //outputWindow.ActivePane.OutputString(output);
            // Debug.WriteLine(process.StandardError.ReadToEnd());

            /*
            ErrorListProvider provider = ErrorProvider;
            provider.ProviderGuid = Guid.NewGuid();
            provider.ProviderName = "Kendo Lint";

            provider.Tasks.Clear();
            */

            OutputPane.Clear();
            OutputPane.Activate();

            while (!process.StandardOutput.EndOfStream)
            {
                var output = process.StandardOutput.ReadLine();

                var lineAndColumn = Regex.Match(output, @"\[(\d+),(\d+)\]");

                var line = Convert.ToInt32(lineAndColumn.Groups[1].Value);

                var column = Convert.ToInt32(lineAndColumn.Groups[2].Value);

                var message = output.Replace("[", "(").Replace("]", ")");

                var description = message.Split(new[] { "):" }, StringSplitOptions.None).Last();

                OutputPane.OutputTaskItemString(message + Environment.NewLine,
                    vsTaskPriority.vsTaskPriorityMedium,
                    "Kendo Lint", vsTaskIcon.vsTaskIconCompile,
                    path, line, description, true);

                /*
                ErrorTask task = new ErrorTask();

                task.Text = description;
                task.Document = path;
                task.Line = line;
                task.Column = column;
                task.ErrorCategory = TaskErrorCategory.Warning;

                provider.Tasks.Add(task);
                */
            }

            //pane.ForceItemsToTaskList();

            //outputWindow.ActivePane.Activate();
            //outputWindow.ActivePane.OutputString(output);
        }

        private DTE2 dte;

        public DTE2 DTE
        {
            get
            {
                if (dte == null)
                {
                    dte = this.GetService(typeof(DTE)) as DTE2;
                }
                return dte;
            }
        }

        public IEnumerable<ProjectItem> Recurse(ProjectItems i)
        {
            if (i != null)
            {
                foreach (ProjectItem j in i)
                {
                    foreach (ProjectItem k in Recurse(j))
                    {
                        yield return k;
                    }
                }

            }
        }
        public IEnumerable<ProjectItem> Recurse(ProjectItem i)
        {
            yield return i;
            foreach (ProjectItem j in Recurse(i.ProjectItems))
            {
                yield return j;
            }
        }

        public IEnumerable<ProjectItem> SolutionFiles()
        {
            foreach (Project project in DTE.Solution.Projects)
            {
                foreach (ProjectItem item in Recurse(project.ProjectItems))
                {
                    yield return item;
                }
            }
        }

        private static IEnumerable<Project> GetChildProjects(Project parent)
        {
            if (!String.IsNullOrEmpty(parent.FullName))
                return new[] { parent };
            return parent.ProjectItems
                    .Cast<ProjectItem>()
                    .Where(p => p.SubProject != null)
                    .SelectMany(p => GetChildProjects(p.SubProject));
        }

        /////////////////////////////////////////////////////////////////////////////
        // Overriden Package Implementation
        #region Package Members

        /// <summary>
        /// Initialization of the package; this method is called right after the package is sited, so this is the place
        /// where you can put all the initilaization code that rely on services provided by VisualStudio.
        /// </summary>
        protected override void Initialize()
        {
            Trace.WriteLine(string.Format(CultureInfo.CurrentCulture, "Entering Initialize() of: {0}", this.ToString()));
            base.Initialize();

            // Add our command handlers for menu (commands must exist in the .vsct file)
            OleMenuCommandService mcs = GetService(typeof(IMenuCommandService)) as OleMenuCommandService;
            if (null != mcs)
            {
                // Create the command for the menu item.
                CommandID menuCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.IdKendoLintCommand);
                MenuCommand menuItem = new MenuCommand(ShowToolWindow, menuCommandID);
                mcs.AddCommand(menuItem);

                // Create the command for the tool window
                CommandID toolwndCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.cmdidMyTool);
                MenuCommand menuToolWin = new MenuCommand(ShowToolWindow, toolwndCommandID);
                mcs.AddCommand(menuToolWin);
            }
        }
        #endregion

        /// <summary>
        /// This function is the callback used to execute a command when the a menu item is clicked.
        /// See the Initialize method to see how the menu item is associated to this function using
        /// the OleMenuCommandService service and the MenuCommand class.
        /// </summary>
        private void MenuItemCallback(object sender, EventArgs e)
        {
            // Show a Message Box to prove we were here
            IVsUIShell uiShell = (IVsUIShell)GetService(typeof(SVsUIShell));
            Guid clsid = Guid.Empty;
            int result;
            Microsoft.VisualStudio.ErrorHandler.ThrowOnFailure(uiShell.ShowMessageBox(
                       0,
                       ref clsid,
                       "KendoBootstrapper",
                       string.Format(CultureInfo.CurrentCulture, "Inside {0}.MenuItemCallback()", this.ToString()),
                       string.Empty,
                       0,
                       OLEMSGBUTTON.OLEMSGBUTTON_OK,
                       OLEMSGDEFBUTTON.OLEMSGDEFBUTTON_FIRST,
                       OLEMSGICON.OLEMSGICON_INFO,
                       0,        // false
                       out result));
        }
    }
}
