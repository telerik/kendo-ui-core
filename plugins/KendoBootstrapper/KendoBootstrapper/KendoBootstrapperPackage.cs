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
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Text;

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
    //[ProvideToolWindow(typeof(KendoBootstrapperWindow))]
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

        private static readonly HashSet<string> ExtensionsToLint = new HashSet<string>() { ".js", ".aspx", ".html", ".cshtml", ".master", ".ascx" };

        private const string KendoFilesRegex = @"kendo\..+\.js";

        private static string AssemblyDirectory()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            var uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }

        private void LintSolution(object sender, EventArgs e)
        {
            Lint(SolutionFiles());
        }

        private void LintCurrentFile(object sender, EventArgs e)
        {
            List<ProjectItem> filesToLint = new List<ProjectItem>();

            foreach (SelectedItem selectedItem in DTE.SelectedItems)
            {
                filesToLint.Add(selectedItem.ProjectItem);
            }

            Lint(filesToLint);
        }

        private void Lint(IEnumerable<ProjectItem> projectItems)
        {
            //string npm = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "npm");

            OutputPane.Clear();
            OutputPane.Activate();

            List<string> htmlFiles = new List<string>();
            List<string> jsFiles = new List<string>();

            foreach (ProjectItem projectItem in projectItems)
            {
                string currentFileName = (string)projectItem.Properties.Item("FullPath").Value;
                string currentFileExtension = Path.GetExtension(currentFileName);

                if (ExtensionsToLint.Contains(currentFileExtension))
                {
                    if (currentFileExtension == ".js")
                    {
                        if (!Regex.Match(currentFileName, KendoFilesRegex).Success)
                        {
                            jsFiles.Add(currentFileName);
                        }
                    }
                    else
                    {
                        htmlFiles.Add(currentFileName);
                    }
                }
            }

            RunLinter(htmlFiles, "--html");
            RunLinter(jsFiles, "--js");
        }

        private void RunLinter(IEnumerable<string> fileNames, string args)
        {
            if (fileNames.Count() == 0)
            {
                return;
            }

            DTE.StatusBar.Text = "Kendo Bootstrapper is looking for errors...";

            var process = new System.Diagnostics.Process();

            var node = Path.Combine(AssemblyDirectory(), "node", "node");
            var lint = Path.Combine(AssemblyDirectory(), "node", "node_modules", "kendo-lint", "bin", "kendo-lint");

            process.StartInfo.FileName = node;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.Arguments = string.Format(@"""{0}"" {1} {2}", lint, args, String.Join(" ", fileNames.Select(a => "\"" + a + "\"").ToArray()));

            process.Start();
            process.WaitForExit();

            while (!process.StandardOutput.EndOfStream)
            {
                var output = process.StandardOutput.ReadLine();

                var lineAndColumn = Regex.Match(output, @"\[(\d+),(\d+)\]");

                var path = output.Substring(0, output.IndexOf(lineAndColumn.Value));

                var line = Convert.ToInt32(lineAndColumn.Groups[1].Value);

                var column = Convert.ToInt32(lineAndColumn.Groups[2].Value);

                var message = output.Replace("[", "(").Replace("]", ")");

                var description = message.Split(new[] { "):" }, StringSplitOptions.None).Last();

                OutputPane.OutputTaskItemString(message + Environment.NewLine,
                    vsTaskPriority.vsTaskPriorityMedium,
                    "Kendo Lint", vsTaskIcon.vsTaskIconCompile,
                    path, line, description, true);
            }

            DTE.StatusBar.Text = "Ready";
        }

        private void CreateCustomKendoFile(object sender, EventArgs e)
        {
            List<string> filesToLint = new List<string>();
            string kendoLocation = null;
            bool isKendoFound = false;

            foreach (var projectItem in SolutionFiles())
            {
                if (ExtensionsToLint.Contains(Path.GetExtension(projectItem.Name)))
                {
                    string currentFilePath = (string)projectItem.Properties.Item("FullPath").Value;

                    if (!Regex.Match(currentFilePath, KendoFilesRegex).Success)
                    {
                        filesToLint.Add(currentFilePath);
                    }

                    if (!isKendoFound && Regex.Match(currentFilePath, KendoFilesRegex).Success)
                    {
                        isKendoFound = true;
                        kendoLocation = Path.GetDirectoryName(currentFilePath);
                    }
                }
            }

            DTE.StatusBar.Text = "Creating custom Kendo UI file...";

            var process = new System.Diagnostics.Process();

            var node = Path.Combine(AssemblyDirectory(), "node", "node");
            var lint = Path.Combine(AssemblyDirectory(), "node", "node_modules", "kendo-lint", "bin", "kendo-lint");

            process.StartInfo.FileName = node;
            process.StartInfo.CreateNoWindow = true;
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;

            string customFileName = kendoLocation + "\\kendo.custom.min.js";
            string listOfFiles = String.Join(" ", filesToLint.Select(a => "\"" + a + "\"").ToArray());

            process.StartInfo.Arguments = string.Format(@"""{0}"" {1} --build-kendo ""{2}"" -o ""{3}""", lint, listOfFiles, kendoLocation, customFileName);

            process.Start();
            process.WaitForExit();

            DTE.StatusBar.Text = "Ready";
            //string s = process.StandardOutput.ReadToEnd();
            //string t = process.StandardError.ReadToEnd();

            //while (!process.StandardOutput.EndOfStream)
            //{
            //    var output = process.StandardOutput.ReadToEnd();
            //}
        }

        private string parseDocumentation(string output, string selection)
        {
            JArray items = JArray.Parse(output);
            StringBuilder result = new StringBuilder();

            if (items.Count > 0)
            {
                foreach (JToken item in items.Children())
                {
                    result.Append("<h2 style=\"font-size: 35px; font-family: Arial, Helvetica, sans-serif; color: #444; font-weight: normal;\">" + item["widget"] + "</h2>");
                    result.Append("<h4 style=\"font-size: 16px; font-family: Arial, Helvetica, sans-serif; color: #2e2e2e; font-weight: bold; \">" + item["prop"]["name"] + "</h4>");

                    if (item["prop"]["type"] != null)
                    {
                        result.Append("<code style=\"font-family: monospace; font-size: 16px; font-weight: bold; color: #e15613;\">" + String.Join("|", item["prop"]["type"]) + "</code>");
                    }

                    result.Append("<div style=\"font-size: 13px; font-family: Arial, Helvetica, sans-serif; line-height: 1.33em; color: #656565;\">" + item["prop"]["short_doc"] + "</div>");
                }
            }
            else
            {
                result.Append("<h3>Property " + selection + " not found in Kendo UI Documentation</h3>");
            }

            return result.ToString();
        }

        private void DisplayDocumentation(object sender, EventArgs e)
        {
            TextSelection selection = (TextSelection)DTE.ActiveDocument.Selection;

            if (selection.Text != String.Empty)
            {
                var process = new System.Diagnostics.Process();

                var node = Path.Combine(AssemblyDirectory(), "node", "node");
                var lint = Path.Combine(AssemblyDirectory(), "node", "node_modules", "kendo-lint", "bin", "kendo-lint");

                process.StartInfo.FileName = node;
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.RedirectStandardError = true;

                process.StartInfo.Arguments = string.Format(@"""{0}"" --doc "".{1}""", lint, selection.Text);

                process.Start();

                string output = process.StandardOutput.ReadToEnd();
                string t = process.StandardError.ReadToEnd();

                process.WaitForExit();

                KendoBootstrapperWindow wind = new KendoBootstrapperWindow(parseDocumentation(output, selection.Text));
                wind.ShowDialog();
            }
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
                // Create the lint command for the main menu item.
                CommandID menuCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.IdKendoLintCommand);
                MenuCommand menuItem = new MenuCommand(LintSolution, menuCommandID);
                mcs.AddCommand(menuItem);

                //Create the custom file command for the main menu item
                CommandID customFileMenuCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.IdKendoCustomFileCommand);
                MenuCommand customFileCommand = new MenuCommand(CreateCustomKendoFile, customFileMenuCommandID);
                mcs.AddCommand(customFileCommand);

                //Create the command for the context menu item
                CommandID contextCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.IdKendoLintCommandContext);
                MenuCommand contextCommand = new MenuCommand(LintCurrentFile, contextCommandID);
                mcs.AddCommand(contextCommand);

                //Create the command for the documentation context menu item
                CommandID documentationContextCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.IdKendoLintDocumentationContextCommand);
                MenuCommand documentationContextCommand = new MenuCommand(DisplayDocumentation, documentationContextCommandID);
                mcs.AddCommand(documentationContextCommand);

                // Create the command for the tool window
                //CommandID toolwndCommandID = new CommandID(GuidList.guidKendoBootstrapperCmdSet, (int)PkgCmdIDList.cmdidMyTool);
                //MenuCommand menuToolWin = new MenuCommand(ShowToolWindow, toolwndCommandID);
                //mcs.AddCommand(menuToolWin);
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
