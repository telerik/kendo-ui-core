
def run_tests(port)
    sh <<-SH
export BROWSER_TEMP=`mktemp -d`
export FIREFOX_PROFILE=${BROWSER_TEMP##*.}
xvfb-run -a firefox -no-remote -CreateProfile $FIREFOX_PROFILE
source build/temp-browser-profiles.sh

tests/tests.js tests/ #{port} 1>test-results.xml || exit 1
    SH
end

namespace :tests do
    { CI: 8884, Production: 8885 }.each do |env, port|
        desc "Run #{env} tests"
        task env => :js do
            run_tests(port)
        end
    end
end
