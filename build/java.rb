JAVA_WRAPPERS_ROOT = 'wrappers/java/'
POM = JAVA_WRAPPERS_ROOT + 'pom.xml'

JSP_TAGLIB_ROOT = JAVA_WRAPPERS_ROOT + 'kendo-taglib/'
JSP_TAGLIB_JAR = "#{JSP_TAGLIB_ROOT}target/kendo-taglib-#{VERSION}.jar"
JSP_TAGLIB_POM = "#{JSP_TAGLIB_ROOT}pom.xml"
JSP_TAGLIB_SRC_ROOT = JSP_TAGLIB_ROOT + 'src/'
JSP_TAGLIB_SRC = FileList[JSP_TAGLIB_SRC_ROOT + '**/*']

SPRING_DEMOS_ROOT = JAVA_WRAPPERS_ROOT + 'spring-demos/'
SPRING_DEMOS_WAR = "#{SPRING_DEMOS_ROOT}target/sprind-demos-#{VERSION}.war"
SPRING_DEMOS_SRC_ROOT = SPRING_DEMOS_ROOT + 'src/'
SPRING_DEMOS_SRC = FileList[SPRING_DEMOS_SRC_ROOT + '**/*']

# Update a pom.xml file when the VERSION changes
class PomTask < Rake::FileTask
    include Rake::DSL

    def execute(args=nil)
        mvn(name, "versions:set -DnewVersion=#{VERSION} -DgenerateBackupPoms=false")
    end

    def needed?
        super || !File.read(name).include?(VERSION)
    end
end

def pom_file(*args, &block)
    PomTask.define_task(*args, &block)
end

# Update the root pom.xml when the VERION changes. Will update the child pom.xml files.
pom_file POM

# Build the kendo-taglib-*.jar by running maven
file JSP_TAGLIB_JAR => [POM, JSP_TAGLIB_SRC].flatten do

    mvn(JSP_TAGLIB_POM, 'package')

end

# Build the spring-demos-*.war by running maven
file SPRING_DEMOS_WAR => [POM, JSP_TAGLIB_JAR, SPRING_DEMOS_SRC].flatten do

    mvn(POM, 'package')

end

namespace :java do
    desc('Build the Kendo Tag Library')
    task :taglib => JSP_TAGLIB_JAR

    desc('Build the Kendo Spring Demos')
    task :spring => SPRING_DEMOS_WAR
end
