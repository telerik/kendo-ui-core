// Imports ====================================================================
var path = require("path"),
    fs = require("fs"),
    os = require("os"),
    bundles = require("build/bundles"),
    themebuilder = require("build/themebuilder"),
    kendoBuild = require("build/kendo-build"),
    vsdoc = require("build/vs-doc/vs-doc").vsdoc,
    copyDir = kendoBuild.copyDirSyncRecursive,
    mkdir = kendoBuild.mkdir,
    zip = kendoBuild.zip,
    kendoScripts = require("build/kendo-scripts");

// Configuration ==============================================================
var CDN_ROOT = "http://cdn.kendostatic.com/",
    PROTOCOL_RELATIVE_CDN_ROOT = "//da7xgjtj801h2.cloudfront.net/",
    STAGING_ROOT = "http://mvc-kendobuild/staging",
    SOURCE_PATH = "src",
    STYLES_PATH = "styles",
    SCRIPTS_PATH = "js",
    DEPLOY_PATH = "deploy",
    DEMOS_PATH = path.join("demos", "mvc"),
    DEMOS_PROJECT = "Kendo.csproj",
    DEMOS_LIVE_PATH = path.join(DEPLOY_PATH, "live"),
    DEMOS_LIVE_PACKAGE = path.join(DEPLOY_PATH, "online-examples.zip"),
    DEMOS_OFFLINE_CSS = "examples-offline.css",
    DEMOS_SHARED = path.join(DEMOS_PATH, "content", "shared"),
    DEMOS_STAGING_PATH = path.join(DEPLOY_PATH, "staging"),
    DEMOS_STAGING_CONTENT_PATH = path.join(DEMOS_STAGING_PATH, "content", "cdn"),
    DEMOS_WRAPPERS_SOURCES = path.join(DEMOS_PATH, "sources"),
    DEMOS_WRAPPERS_SOURCES_ASPX = path.join(DEMOS_WRAPPERS_SOURCES, "aspx"),
    DEMOS_WRAPPERS_SOURCES_RAZOR = path.join(DEMOS_WRAPPERS_SOURCES, "razor"),
    DOCS_DEPLOY_PATH = path.join(DEMOS_PATH, "content", "docs"),
    BUILDER_PATH = "download-builder",
    BUILDER_STAGING_PATH = path.join(DEPLOY_PATH, "download-builder-staging"),
    BUILDER_STAGING_SERVICE = STAGING_ROOT + "/download-builder-service",
    BUILDER_DEPLOY_PATH = path.join(DEPLOY_PATH, "download-builder"),
    BUILDER_DEPLOY_SERVICE = "http://www.kendoui.com/services/kendo-download",
    BUILDER_SERVICE_PATH = "service",
    BUILDER_PROJECT = path.join(BUILDER_SERVICE_PATH, "Download.csproj"),
    BUILDER_CONFIG_NAME = path.join("config", "kendo-config.VERSION_NUMBER.json"),
    MVC_WRAPPERS_PATH = path.join("wrappers", "mvc"),
    MVC_WRAPPERS_PROJECT = path.join(MVC_WRAPPERS_PATH, "src", "Kendo.Mvc", "Kendo.Mvc.csproj"),
    MVC_WRAPPERS_DEMO_PROJECT = path.join(MVC_WRAPPERS_PATH, "demos", "Kendo.Mvc.Examples", "Kendo.Mvc.Examples.csproj"),
    MVC_WRAPPERS_DEMO_AREAS_PATH = path.join("wrappers", "mvc", "demos", "Kendo.Mvc.Examples", "Areas"),
    MVC_WRAPPERS_DEMO_AREAS_ASPX_PATH = path.join(MVC_WRAPPERS_DEMO_AREAS_PATH, "aspx", "Views"),
    MVC_WRAPPERS_DEMO_AREAS_RAZOR_PATH = path.join(MVC_WRAPPERS_DEMO_AREAS_PATH, "razor", "Views"),
    THEMEBUILDER_LIVE_PATH = path.join(DEPLOY_PATH, "themebuilder.telerik.com"),
    THEMEBUILDER_LIVE_PACKAGE = path.join(DEPLOY_PATH, "themebuilder.zip"),
    RELEASE_PATH = "release",
    WINJS_PATH = "winjs",
    SUITES = ["web", "mobile", "dataviz"],
    SUITE_CSS = "suite.css";

// CDN Configuration ===========================================================
var CDN_PROJECT = path.join("build", "cdn.proj"),
    CDN_BUNDLE = bundles.cdnBundle,
    CDN_BUNDLE_PATH = path.join(DEPLOY_PATH, "kendoui.cdn.commercial");

// WinJS Configuration ===========================================================
var WINJS_BUNDLE = bundles.winjsBundle,
    WINJS_CSS_PATH = path.join(RELEASE_PATH, WINJS_PATH, 'kendo.winjs.min.css');
    WINJS_BUNDLE_PATH = path.join(DEPLOY_PATH, "kendoui.winjs.commercial");

// Tasks ======================================================================
desc("Clean deploy working directory");
task("clean", function() {
    mkdirClean(DEPLOY_PATH);
    mkdir(RELEASE_PATH);
});

desc("Merge multi-part source scripts");
task("merge-scripts", function() {
    kendoScripts.mergeScripts(SOURCE_PATH);
});

namespace("themebuilder", function() {
    desc("Builds the generated themebuilder sources");
    task("source", function() {
        themebuilder.buildGeneratedSources();
    });

    desc("Builds the themebuilder for live deployment");
    task("production", ["themebuilder:source"], function() {
        themebuilder.deploy(
            THEMEBUILDER_LIVE_PATH,
            PROTOCOL_RELATIVE_CDN_ROOT + version()
        );

        zip(THEMEBUILDER_LIVE_PACKAGE, THEMEBUILDER_LIVE_PATH, complete);
    }, true);
});

namespace("demos", function() {
    desc("Build less.js for demo site");
    task("less-js", function() {
        var lessPath = path.join("build", "less-js");
        var distPath = path.join(lessPath, "dist");

        kendoBuild.spawnSilent("make", [ "less" ], { cwd: path.resolve(lessPath) }, function() {
            kendoBuild.processFilesRecursive(distPath, /.*/, function(fileName) {
                kendoBuild.copyFileSync(fileName, path.join(DEMOS_SHARED, SCRIPTS_PATH, "less.js"));
            });

            kendoBuild.rmdirSyncRecursive(distPath);

            complete();
        });
    }, true);

    desc("Build debug demos site");
    task("debug", ["demos:less-js", "merge-scripts"], function () {
        kendoBuild.msBuild(
            path.join(DEMOS_PATH, DEMOS_PROJECT),
            [ "/t:Clean;Build", "/p:Configuration=Debug" ],
            complete
        );
    }, true);

    desc("Build staging demos site");
    task("staging", ["merge-scripts", "themebuilder:source", "demos:copy-wrappers-sources"], function () {
        var scriptsDest = path.join(DEMOS_STAGING_CONTENT_PATH, "js"),
            stylesDest = path.join(DEMOS_STAGING_CONTENT_PATH, "styles");

        console.log("Building demos");
        deployDemos({
            outputPath: DEMOS_STAGING_PATH,
            cdnRoot: "~/content/cdn",
            themebuilderRoot: "~/content/cdn/themebuilder",
            onSuccess: function() {
                mkdir(DEMOS_STAGING_CONTENT_PATH);

                kendoBuild.rmdirSyncRecursive(CDN_BUNDLE_PATH);
                bundles.buildBundle(CDN_BUNDLE, version(), function() {
                    copyDir(path.join(CDN_BUNDLE_PATH, STYLES_PATH),
                            path.join(DEMOS_STAGING_CONTENT_PATH, STYLES_PATH)
                    );

                    copyDir(path.join(CDN_BUNDLE_PATH, SCRIPTS_PATH),
                            path.join(DEMOS_STAGING_CONTENT_PATH, SCRIPTS_PATH)
                    );

                    themebuilder.deploy(
                        path.join(DEMOS_STAGING_CONTENT_PATH, "themebuilder"),
                        STAGING_ROOT + "/content/cdn/"
                    );
                });
            }
        });
    });

    desc("Build demos site for live deployment");
    task("production", ["merge-scripts", "demos:copy-wrappers-sources"], function () {
        deployDemos({
            outputPath: DEMOS_LIVE_PATH,
            cdnRoot: CDN_ROOT + version(),
            themebuilderRoot: "http://themebuilder.kendoui.com",
            onSuccess: complete
        });
    }, true);

    desc("Pack online-demos.zip");
    task("pack-production", ["demos:production"], function() {
        copyDir(path.join("resources", "live", "bin"), path.join(DEMOS_LIVE_PATH, "bin"), true);
        zip(DEMOS_LIVE_PACKAGE, DEMOS_LIVE_PATH, complete);
    }, true);

    desc("Copy server demo files from ASP.NET MVC wrappers")
    task("copy-wrappers-sources", function() {
        mkdir(DEMOS_WRAPPERS_SOURCES);
        mkdir(DEMOS_WRAPPERS_SOURCES_ASPX);
        mkdir(DEMOS_WRAPPERS_SOURCES_RAZOR);

        console.log("Copy demo sources from wrappers");
        ["web", "dataviz"].forEach(function(suite) {
            var aspx_path = path.join(DEMOS_WRAPPERS_SOURCES_ASPX, suite);
            var razor_path = path.join(DEMOS_WRAPPERS_SOURCES_RAZOR, suite);

            mkdir(aspx_path);
            mkdir(razor_path);

            copyDir(path.join(MVC_WRAPPERS_DEMO_AREAS_ASPX_PATH, suite), aspx_path);
            copyDir(path.join(MVC_WRAPPERS_DEMO_AREAS_RAZOR_PATH, suite), razor_path);
        });
    });
});

desc("Build WinJS bundle");
task("winjs", ["clean"], function() {
    function readCSS(file) {
        return kendoBuild.stripBOM(kendoBuild.readText(path.join(WINJS_BUNDLE_PATH, STYLES_PATH, file)));
    }
    mkdir(path.join(RELEASE_PATH, WINJS_PATH));
    kendoBuild.rmdirSyncRecursive(WINJS_BUNDLE_PATH);
    bundles.buildBundle(WINJS_BUNDLE, version(), function() {
        var cssContents = readCSS('kendo.common.min.css') + readCSS('kendo.dataviz.min.css');
        kendoBuild.writeText(WINJS_CSS_PATH, cssContents);
        kendoBuild.copyFileSync(path.join(WINJS_BUNDLE_PATH, SCRIPTS_PATH, 'kendo.winjs.min.js'), path.join(RELEASE_PATH, WINJS_PATH, 'kendo.winjs.min.js'));
        kendoBuild.copyFileSync(path.join(WINJS_BUNDLE_PATH, "source", SCRIPTS_PATH, 'kendo.winjs.js'), path.join(RELEASE_PATH, WINJS_PATH, 'kendo.winjs.js'));
        kendoBuild.copyFileSync(path.join(WINJS_BUNDLE_PATH, "source", "styles", 'kendo.common.css'), path.join(RELEASE_PATH, WINJS_PATH, 'kendo.common.css'));
        kendoBuild.copyFileSync(path.join(WINJS_BUNDLE_PATH, "source", "styles", 'kendo.dataviz.css'), path.join(RELEASE_PATH, WINJS_PATH, 'kendo.dataviz.css'));
    });
});

desc("Build debug demos site");
task("default", ["clean", "demos:debug"], function() {
});

desc("Build vsdoc");
task("vsdoc", function() {
    console.log(vsdoc("docs/api/", /.+md/));
});

desc("Build bundles");
task("bundles", ["clean", "merge-scripts", "mvc:bundle", "download-builder:bundle"], function() {
    bundles.buildAllBundles(version(), complete);
}, true);

namespace("cdn", function() {
    desc("Build CDN scripts bundle");
    task("bundle", ["clean", "merge-scripts"], function() {
        bundles.buildBundle(CDN_BUNDLE, version(), complete);
    }, true);

    desc("Deploy CDN scripts to CloudFront");
    task("deploy", ["cdn:bundle"], function() {
        kendoBuild.msBuild(
            CDN_PROJECT,
            ["/p:Version=" + version(), "/p:BundleRoot=" + path.join("..", CDN_BUNDLE_PATH)],
            complete
        );
    }, true);
});

namespace("download-builder", function() {
    desc("Build staging download builder site");
    task("staging", ["cdn:bundle"], function() {
        var indexPath = path.join(BUILDER_STAGING_PATH, "index.html"),
            appDataPath = path.join(BUILDER_STAGING_PATH, BUILDER_SERVICE_PATH, "App_Data"),
            sourcePath = path.join(appDataPath, version());

        copyDir(BUILDER_PATH, BUILDER_STAGING_PATH);
        mkdir(appDataPath);
        mkdir(sourcePath);
        copyDir(CDN_BUNDLE_PATH, sourcePath);

        updateIndex(indexPath, BUILDER_STAGING_SERVICE);

        fs.renameSync(path.join(BUILDER_STAGING_PATH, BUILDER_CONFIG_NAME),
                      path.join(BUILDER_STAGING_PATH,
                                BUILDER_CONFIG_NAME.replace("VERSION_NUMBER", version)
                      )
        );

        kendoBuild.msBuild(
            path.join(BUILDER_STAGING_PATH, BUILDER_PROJECT),
            [ "/t:Clean;Build", "/p:Configuration=Release" ]
        );
    });

    desc("Build download builder deploy bundle");
    task("bundle", ["cdn:bundle"], function() {
        var indexPath = path.join(BUILDER_DEPLOY_PATH, "index.html"),
            appDataPath = path.join(BUILDER_DEPLOY_PATH, BUILDER_SERVICE_PATH, "App_Data"),
            sourcePath = path.join(appDataPath, version()),
            packageName = path.join(RELEASE_PATH, "download-builder." + version() + ".zip");

        copyDir(BUILDER_PATH, BUILDER_DEPLOY_PATH);
        mkdir(appDataPath);
        mkdir(sourcePath);
        copyDir(CDN_BUNDLE_PATH, sourcePath);

        updateIndex(indexPath, BUILDER_DEPLOY_SERVICE);

        fs.renameSync(path.join(BUILDER_DEPLOY_PATH, BUILDER_CONFIG_NAME),
                      path.join(BUILDER_DEPLOY_PATH,
                                BUILDER_CONFIG_NAME.replace("VERSION_NUMBER", version)
                      )
        );

        zip(packageName, BUILDER_DEPLOY_PATH, complete);
    }, true);

    function updateIndex(indexPath, service) {
        kendoBuild.writeText(indexPath,
            kendoBuild.readText(indexPath)
                .replace(/SERVICE_ROOT/g, service)
                .replace(/VERSION_NUMBER/g, version())
        );
    }
});

namespace("mvc", function() {
    var examplesProjectPath = path.join("wrappers", "mvc", "demos", "Kendo.Mvc.Examples"),
        sharedStyles = path.join(DEMOS_SHARED, STYLES_PATH),
        stylesDest = path.join(examplesProjectPath, "Content"),
        sharedStylesDest = path.join(stylesDest, "shared"),
        iconsDest = path.join(sharedStylesDest, "icons"),
        scriptsDest = path.join(examplesProjectPath, "Scripts");

    var sharedFiles = [{
            name: "console.js",
            src: path.join(DEMOS_SHARED, SCRIPTS_PATH),
            dst: scriptsDest
        }, {
            name: "prettify.js",
            src: path.join(DEMOS_SHARED, SCRIPTS_PATH),
            dst: scriptsDest
        }, {
            src: path.join(DEMOS_SHARED, "styles"),
            dst: sharedStylesDest
        }, {
            src: path.join(DEMOS_SHARED, "icons"),
            dst: iconsDest
        }, {
            src: path.join(SOURCE_PATH, "cultures"),
            dst: path.join(scriptsDest, "cultures")
        }, {
            name: "jquery.min.js",
            src: path.join(SOURCE_PATH),
            dst: scriptsDest
        }
    ];

    mkdir(stylesDest);
    mkdir(sharedStylesDest);
    mkdir(iconsDest);

    desc("Copy debug scripts and styles to the MVC demo site");
    task("debug-examples", ["merge-scripts"], function() {
        deployExamplesSharedFiles(true);
    });

    desc("Copy release scripts and styles to the MVC demo site");
    task("examples-shared-files", ["merge-scripts"], function() {
        deployExamplesSharedFiles(false);
    });

    desc("Build wrappers project");
    task("build-wrappers-project", ["mvc:examples-shared-files"], function() {
        var assemblyInfoFileName = path.join(MVC_WRAPPERS_PATH, "src", "shared", "CommonAssemblyInfo.cs");
        var assemblyInfo = kendoBuild.readText(assemblyInfoFileName);

        assemblyInfo = assemblyInfo.replace(/AssemblyVersion\([^\)]*\)/, 'AssemblyVersion("' + version() + '.340")') // ".340" means ASP.NET MVC 3 .NET 4.0
                                   .replace(/AssemblyFileVersion\([^\)]*\)/, 'AssemblyFileVersion("' + version() + '.340")');

        kendoBuild.writeText(assemblyInfoFileName, assemblyInfo);

        kendoBuild.msBuild(MVC_WRAPPERS_PROJECT, [ "/t:Clean;Build", "/p:Configuration=Release" ], complete);
    }, true);

    desc("Build wrappers demo project");
    task("build-wrappers-demo-project", ["mvc:build-satellite-assemblies"], function() {
        kendoBuild.msBuild(MVC_WRAPPERS_DEMO_PROJECT, [ "/t:Clean;Build", "/p:Configuration=Release" ], complete);
    }, true);

    desc("Build satellite assemblies");
    task("build-satellite-assemblies", ["mvc:build-wrappers-project"], function() {
        var numberOfCultures = 0;
        var osName = os.type();
        var filesPath = path.join(MVC_WRAPPERS_PATH, "src", "Kendo.Mvc");

        if (osName == "Linux" || osName == "Darwin") {
            //xbuild can't properly set the version of satellite assemblies so we build them using `al`
            kendoBuild.processDirs(path.join(filesPath, "bin", "Release"), function(culture){
                numberOfCultures ++;

                kendoBuild.spawnSilent("al", [
                    "/t:lib",
                    "/embed:" + path.join("obj", "Release", "Kendo.Mvc.Resources.Messages." + culture + ".resources"),
                    "/culture:" + culture,
                    "/out:" + path.join("bin", "Release", culture, "Kendo.Mvc.resources.dll"),
                    "/template:" + path.join("bin", "Release", "Kendo.Mvc.dll"),
                    "/keyfile:" + path.join("..", "shared", "Kendo.snk")
                ], {
                    cwd: path.resolve(filesPath) ,
                }, function() {
                    numberOfCultures --;
                    if (numberOfCultures <= 0) {
                        complete();
                    }
                });
            });
        } else {
           complete();
        }

    }, true);

    desc("Build release version");
    task("bundle", ["clean", "mvc:build-wrappers-demo-project"], function() {
        var projectPath = path.join(MVC_WRAPPERS_PATH, "src", "Kendo.Mvc"),
            binariesPath = path.join(projectPath, "bin", "Release");

        bundles.buildBundle(bundles.mvcWrappersBundle, version(), complete, function(root, bundle, license) {
            var wrappersDeployRoot = path.join(root, "wrappers"),
                mvcDeployRoot = path.join(wrappersDeployRoot, "aspnetmvc")
                binariesDeployRoot = path.join(mvcDeployRoot, "Binaries"),
                mvc3binariesDeployRoot = path.join(binariesDeployRoot, "Mvc3"),
                stylesDeployRoot = path.join(root, "styles"),
                scriptsDeployRoot = path.join(root, "js"),
                sourceDeployRoot = path.join(root, "src"),
                projectDeployRoot = path.join(sourceDeployRoot, "Kendo.Mvc"),
                examplesDeployRoot = path.join(mvcDeployRoot, "Examples");

            // move resources
            fs.renameSync(path.join(root, "js"), scriptsDeployRoot);
            fs.renameSync(path.join(root, "styles"), stylesDeployRoot);

            kendoBuild.mkdir(wrappersDeployRoot);
            kendoBuild.mkdir(mvcDeployRoot);
            kendoBuild.mkdir(binariesDeployRoot);
            kendoBuild.mkdir(mvc3binariesDeployRoot);

            // copy binaries

            kendoBuild.processDirs(binariesPath, function(dir){
                kendoBuild.copyDirSyncRecursive(path.join(binariesPath, dir), path.join(mvc3binariesDeployRoot, dir));
            });

            kendoBuild.copyFileSync(
                path.join(binariesPath, "Kendo.Mvc.dll"),
                path.join(mvc3binariesDeployRoot, "Kendo.Mvc.dll")
            );

            kendoBuild.copyFileSync(
                path.join(binariesPath, "Kendo.Mvc.xml"),
                path.join(mvc3binariesDeployRoot, "Kendo.Mvc.xml")
            );

            // copy editor templates

            var templatesDeployRoot = path.join(mvcDeployRoot, "EditorTemplates");
            var templatesRoot = path.join(examplesProjectPath, "Views", "Shared", "EditorTemplates");

            kendoBuild.mkdir(templatesDeployRoot);
            kendoBuild.mkdir(path.join(templatesDeployRoot, "ascx"));
            kendoBuild.mkdir(path.join(templatesDeployRoot, "razor"));

            fs.readdirSync(templatesRoot).forEach(function(fileName){
                var fullPath = path.join(templatesRoot, fileName);

                if (fs.statSync(fullPath).isFile()) {
                    var viewEngine = "razor";

                    if (/ascx$/.test(fileName)) {
                        viewEngine = "ascx"
                    }

                    kendoBuild.copyFileSync(fullPath, path.join(templatesDeployRoot, viewEngine, fileName));
                }
            });

            // deploy demos
            kendoBuild.copyDirSyncRecursive(
                examplesProjectPath,
                examplesDeployRoot
            );

            kendoBuild.rmdirSyncRecursive(path.join(examplesDeployRoot, "obj"));

            fs.renameSync(path.join(examplesDeployRoot, "Scripts"), path.join(examplesDeployRoot, "Scripts"));
            fs.renameSync(path.join(examplesDeployRoot, "Content"), path.join(examplesDeployRoot, "Content"));
            kendoBuild.rmdirSyncRecursive(path.join(examplesDeployRoot, "Examples"));

            kendoBuild.processFilesRecursive(
                path.join(examplesDeployRoot, "bin"),
                /(system\..*)|(\.mdb$)/i,
                function(fileName) {
                    fs.unlinkSync(fileName);
                });

                // process demos .csproj file
                var projectFileName = path.join(examplesDeployRoot, "Kendo.Mvc.Examples.csproj"),
                csproj = kendoBuild.readText(projectFileName);

                csproj = csproj
                // remove AfterBuild target
                .replace(/\s*<Target Name="AfterBuild"((.|\r|\n)*?)\/Target>/i, "")
                // remove project reference
                .replace(/\s*<ProjectReference((.|\r|\n)*?)\/ProjectReference>/i, "")
                // add reference to Kendo dll
                .replace(/(\s*)(<Reference.*?\/>)/i, '$1$2$1<Reference Include="Kendo.Mvc" />');

                kendoBuild.writeText(projectFileName, csproj);

                // copy legacy themes
                kendoBuild.copyDirSyncRecursive(
                    path.join(MVC_WRAPPERS_PATH, "legacy-themes"),
                    path.join(mvcDeployRoot, "LegacyThemes")
                );

                // copy source code
                if (license.source) {
                    fs.renameSync(path.join(root, "source"), sourceDeployRoot);

                    kendoBuild.copyDirSyncRecursive(
                        projectPath,
                        projectDeployRoot
                    );

                    kendoBuild.copyFileSync(path.join(MVC_WRAPPERS_PATH, "src", "shared", "Source.snk"), path.join(projectDeployRoot, "Kendo.snk"));
                    kendoBuild.copyFileSync(path.join(MVC_WRAPPERS_PATH, "src", "shared", "CommonAssemblyInfo.cs"), path.join(projectDeployRoot, "CommonAssemblyInfo.cs"));

                    projectFileName = path.join(root, "src", "Kendo.Mvc", "Kendo.Mvc.csproj");
                    csproj = kendoBuild.readText(projectFileName);

                    csproj = csproj.replace(/\.\.\\shared\\Kendo.snk/g, "Kendo.snk")
                                   .replace(/<Content Include=".*?data\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/ig, "")
                                   .replace(/<Content Include=".*?combobox\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/ig, "")
                                   .replace(/<Content Include=".*?validator\.aspnetmvc\.js"(.|\r|\n)*?<\/Content>/ig, '<Content Include="..\\js\\kendo.aspnetmvc.js"><Link>Scripts\\kendo.aspnetmvc.js</Link></Content>')
                                   .replace("<Link>Kendo.snk</Link>", "")
                                   .replace(/\.\.\\shared\\CommonAssemblyInfo.cs/g, "CommonAssemblyInfo.cs")
                                   .replace("<Link>CommonAssemblyInfo.cs</Link>", "");

                    kendoBuild.writeText(projectFileName, csproj);

                    kendoBuild.rmdirSyncRecursive(path.join(projectDeployRoot, "bin"));
                    kendoBuild.rmdirSyncRecursive(path.join(projectDeployRoot, "obj"));
                }
        });
    }, true);

    function deployExamplesSharedFiles(debug) {
        mkdirClean(scriptsDest);
        mkdirClean(stylesDest);
        deploySuiteFiles("web", !debug);
        deploySuiteFiles("dataviz", !debug);
        kendoScripts.buildSuiteScripts("aspnetmvc", scriptsDest, "", !debug);
        deployFiles(sharedFiles);

        kendoBuild.processFilesRecursive(scriptsDest, /^(?!.*min\.js$).*\.js/, function(fileName) {
            fs.renameSync(fileName, fileName.replace(".js", ".min.js"));
        });

        kendoBuild.processFilesRecursive(stylesDest, /^(?!.*min\.css$).*\.css/, function(fileName) {
            fs.renameSync(fileName, fileName.replace(".css", ".min.css"));
        });
    }

    function deploySuiteFiles(suite, compress) {
        var suiteStyles = path.join("styles", suite),
            suiteStylesDest = path.join(stylesDest, suite),
            suiteFiles = [{
                name: suite + ".nav.json",
                src: path.join(DEMOS_PATH, "App_Data"),
                dst: path.join(examplesProjectPath, "App_Data")
            }, {
                src: path.join(DEMOS_PATH, "content", suite),
                dst: suiteStylesDest
            }
        ];

        kendoBuild.mkdir(suiteStylesDest);
        deployFiles(suiteFiles);

        kendoScripts.buildSuiteScripts(suite, scriptsDest, "", compress);
        kendoBuild.deployStyles(suiteStyles, suiteStylesDest, "", compress);
    }

    function deployFiles(filesToDeploy) {
        filesToDeploy.forEach(function(file) {
            kendoBuild.mkdir(file.dst);

            if (file.name) {
                kendoBuild.copyFileSync(
                    path.join(file.src, file.name),
                    path.join(file.dst, file.name)
                );
            } else {
                kendoBuild.copyDirSyncRecursive(file.src, file.dst, true);
            }
        });
    }
});

function deployDemos(options) {
    var outputPath = options.outputPath,
        webConfig = path.join(outputPath, "Web.config");

    kendoBuild.rmdirSyncRecursive(outputPath);
    copyDir(DEMOS_PATH, outputPath);

    kendoBuild.writeText(webConfig, kendoBuild
        .readText(webConfig)
        .replace("$CDN_ROOT", options.cdnRoot)
        .replace("$THEMEBUILDER_ROOT", options.themebuilderRoot)
    );

    kendoBuild.msBuild(
        path.join(outputPath, DEMOS_PROJECT),
        [ "/t:Clean;Build", "/p:Configuration=Release" ],
        options.onSuccess
    );
}

function version() {
    var v = JSON.parse(kendoBuild.readText("VERSION"));
    return kendoBuild.buildVersion(v.year, v.release);
}

function mkdirClean(dir) {
    if (path.existsSync(dir)) {
        kendoBuild.rmdirSyncRecursive(dir);
    }

    mkdir(dir);
}

// vim:ft=javascript
