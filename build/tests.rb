
def run_tests(output, port)
    sh <<-SH
export BROWSER_TEMP=`mktemp -dt tests.XXXXXXXXXXXXXXXXXXXXXXXXX`
export FIREFOX_PROFILE=${BROWSER_TEMP##*.}

case `uname -a` in
  *Linux*)
    xvfb-run -a firefox -no-remote -CreateProfile $FIREFOX_PROFILE
    ;;
  *Darwin*)
    /Applications/Firefox.app/Contents/MacOS/firefox -no-remote -CreateProfile $FIREFOX_PROFILE
    ;;
esac

tests/tests.js tests/ #{port} 1>#{output} || exit 1
    SH
end

tests = FileList["tests/**/*"]
namespace :tests do
    { CI: 8884, Production: 8885 }.each do |env, port|
        output = "#{env}-test-results.xml"

        file output => [MIN_JS, MIN_CSS, tests].flatten do |t|
            run_tests(t.name, port)
        end

        desc "Run #{env} tests"
        task env => [:npm, output] do
            sh "touch #{output}"
        end
    end
end
