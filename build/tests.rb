tests = FileList["tests/**/*"]

namespace :tests do
    task :java do
        mvn(POM, 'clean test')
    end

    task :aspnetmvc do
        msbuild "wrappers/mvc/Kendo.Mvc.sln"
        sh "build/xunit/xunit.console.clr4.exe wrappers/mvc/tests/Kendo.Mvc.Tests/bin/Release/Kendo.Mvc.Tests.dll"
    end

    %w[CI Production TZ].each do |env|
        output = "#{env}-test-results.xml"
        cmd = "./node_modules/.bin/grunt jshint karma --junit-results=#{output} --single-run=true"

        file output => [MIN_JS, MIN_CSS, KENDO_CONFIG_FILE, tests].flatten do |t|
            sh <<-SH
              if which xvfb-run >/dev/null; then
                xvfb-run -e /dev/stdout #{cmd}
              else
                #{cmd}
              fi
            SH
        end

        desc "Run #{env} tests"
        task env => [output, :java] do
            sh "touch #{output}"
        end
    end
end
