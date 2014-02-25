using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Windows.Navigation;
using System.Diagnostics;

namespace Company.KendoBootstrapper
{
    /// <summary>
    /// Interaction logic for TestWindow.xaml
    /// </summary>
    public partial class KendoBootstrapperWindow : Window
    {
        private static bool shouldNavigate;

        public KendoBootstrapperWindow(string htmlResult)
        {
            InitializeComponent();
            documentationBrowser.NavigateToString(htmlResult);
        }

        private void onBrowserNavigate(object sender, NavigatingCancelEventArgs e)
        {
            //if (!shouldNavigate)
            //{
            //    shouldNavigate = true;
            //    return;
            //}

            //e.Cancel = true;

            //var startInfo = new ProcessStartInfo
            //{
            //    FileName = e.Uri.ToString()
            //};

            //Process.Start(startInfo);
        }

    }
}
