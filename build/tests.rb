
def run_tests(port)
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

tests/tests.js tests/ #{port} 1>test-results.xml || exit 1
    SH
end

namespace :tests do
    { CI: 8884, Production: 8885 }.each do |env, port|
        desc "Run #{env} tests"
        task env => [:less, :js] do
            run_tests(port)
        end
    end
end
