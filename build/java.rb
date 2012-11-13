JAVA_WRAPPERS_ROOT = 'wrappers/java/'
POM = JAVA_WRAPPERS_ROOT + 'pom.xml'

JSP_TAGLIB_ROOT = JAVA_WRAPPERS_ROOT + 'kendo-taglib/'
JAR_NAME = "kendo-taglib-#{VERSION}.jar"

JSP_TAGLIB_JAR = "#{JSP_TAGLIB_ROOT}target/#{JAR_NAME}"
JSP_TAGLIB_POM = "#{JSP_TAGLIB_ROOT}pom.xml"
JSP_TAGLIB_SRC_ROOT = JSP_TAGLIB_ROOT + 'src/'
JSP_TAGLIB_SRC = FileList[JSP_TAGLIB_SRC_ROOT + '**/*'].exclude('**/target/*')

SPRING_DEMOS_ROOT = JAVA_WRAPPERS_ROOT + 'spring-demos/'
SPRING_DEMOS_WAR = "#{SPRING_DEMOS_ROOT}target/sprind-demos-#{VERSION}.war"
SPRING_DEMOS_SRC_ROOT = SPRING_DEMOS_ROOT + 'src/'
SPRING_DEMOS_SRC = FileList[SPRING_DEMOS_SRC_ROOT + '**/*'].exclude('**/target/*')
SPRING_DEMOS_SHARED_CONTENT = FileList['demos/mvc/content/{dataviz,shared,web}/**/*'].exclude('**/globalization/**/*')
SPRING_DEMOS_NAVIGATION= FileList['demos/mvc/App_Data/{dataviz,web}.nav.json']
SPRING_DEMOS_RESOURCES = SPRING_DEMOS_SRC_ROOT + 'main/webapp/resources/'

JSP_BUNDLE = 'jsp.beta'

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

# Build the spring-demos-*.war by running maven
file SPRING_DEMOS_WAR => [POM, SPRING_DEMOS_SRC].flatten do

    mvn(POM, 'clean package')

end

# Build the kendo-taglib-*.jar by running maven
file JSP_TAGLIB_JAR => [POM, JSP_TAGLIB_SRC].flatten do

    mvn(POM, 'clean package')

    # remove older tag library jars
    rm_rf "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/kendo-taglib"
    rm_rf "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/"
end

=begin
file_copy :to => 'dist/bundles/trial/wrappers/jsp/spring-demos/pom.xml',
          :from => SPRING_DEMOS_ROOT + 'pom.xml'

file_copy :to => "dist/bundles/trial/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
          :from => JSP_TAGLIB_JAR
=end

file_copy :to => "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/spring-demos/pom.xml",
          :from => SPRING_DEMOS_ROOT + 'pom.xml'

=begin
file_copy :to => "dist/bundles/#{JSP_BUNDLE}/src/kendo-taglib/pom.xml",
          :from => JSP_TAGLIB_POM
=end

file_copy :to => "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/spring-demos/src/main/webapp/WEB-INF/lib/#{JAR_NAME}",
          :from => JSP_TAGLIB_JAR

PROJECT = <<-eos
    <groupId>com.kendoui</groupId>
    <version>#{VERSION}</version>
eos

JUNIT = <<-eos
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.8.1</version>
        <scope>test</scope>
    </dependency>
eos

BUILD = <<-eos
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <configuration>
                        <source>1.7</source>
                        <target>1.7</target>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
eos

# Patch POM - remove parent etc.
def patch_demos_pom(name)
    pom = File.read(name)

    pom.sub!(/<parent>(.|\n)*<\/parent>/, PROJECT)
    pom.sub!(/<dependency>\n\s*<groupId>com\.kendoui(.|\n)*<\/dependency>/, '')
    pom.sub!(/<build>(.|\n)*<\/build>/, BUILD)

    File.open(name, 'w') do |file|
        file.write(pom)
    end
end

def patch_taglib_pom(name)
    pom = File.read(name)

    pom.sub!(/<parent>(.|\n)*<\/parent>/, PROJECT)
    pom.sub!(/<dependency>\n\s*<groupId>com\.kendoui(.|\n)*<\/dependency>/, '')
    pom.sub!(/<\/dependencies>/, JUNIT + '</dependencies>')
    pom.sub!(/<\/dependencies>/, '</dependencies>' + BUILD)

    File.open(name, 'w') do |file|
        file.write(pom)
    end
end


# Prepare the demos pom.xml for end users (trial package)
#file 'dist/bundles/trial/wrappers/jsp/spring-demos/pom.xml' do |t|
#    patch_demos_pom(t.name)
#end

# Prepare the demos pom.xml for end users (commercial package)
file "dist/bundles/#{JSP_BUNDLE}/wrappers/jsp/spring-demos/pom.xml" do |t|
    patch_demos_pom(t.name)
end

# Prepare the src pom.xml for end users
#file "dist/bundles/#{JSP_BUNDLE}/src/kendo-taglib/pom.xml" do |t|
#    patch_taglib_pom(t.name)
#end

tree :to => SPRING_DEMOS_RESOURCES,
     :from => SPRING_DEMOS_SHARED_CONTENT,
     :root => 'demos/mvc/content/'

tree :to => SPRING_DEMOS_RESOURCES + "js",
     :from => FileList[MIN_JS].include('src/jquery.min.js'),
     :root => 'src/'

tree :to => SPRING_DEMOS_RESOURCES + "css",
     :from => MIN_CSS_RESOURCES,
     :root => 'styles/'

tree :to => SPRING_DEMOS_RESOURCES,
     :from => SPRING_DEMOS_NAVIGATION,
     :root => 'demos/mvc/App_Data/'

namespace :java do
    task :assets_js => [:js, SPRING_DEMOS_RESOURCES + "js"]

    task :assets_css => [:less, SPRING_DEMOS_RESOURCES + "css"]

    desc('Copy demo resource files')
    task :assets => [:assets_js, :assets_css, SPRING_DEMOS_RESOURCES]

    desc('Build the Kendo Spring Demos')
    task :spring => [:assets, SPRING_DEMOS_WAR]
end
