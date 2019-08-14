#!/bin/bash

for i in "$@"
do
case $i in
    -i=*|--include=*)
    INCLUDE="${i#*=}"
    shift
    ;;
    -s=*|--serve=*)
    SERVE="${i#*=}"
    shift
    ;;
    -c=*|--config=*)
    CONFIG="${i#*=}"
    shift
    ;;
    -d=*|--docker=*)
    DOCKER="${i#*=}"
    shift
    ;;
    --default)
    DEFAULT=YES
    shift
    ;;
    *)
          
    ;;
esac
done
# echo 'Debug arguments:'
# echo "INCLUDE = ${INCLUDE}"
# echo "SERVE = ${SERVE}"
# echo "SECOND CONFIG = ${CONFIG}"
# echo "USING DOCKER = ${DOCKER}"
# exit

config_file="_config.yml"

if [ ! -z $CONFIG ]	
  then 	
    config_file+=",$CONFIG"
fi

reserved_folders=".asset-cache,_assets,_common,_data,_includes,_layouts,_plugins,_templates,docs-watcher,fonts,styles"
include_folders=
echo 'Generating config...'
./_build/tools/ConfigGenerator.exe --include=$INCLUDE --reserved=$reserved_folders --config=_config.yml

tempconfig="_tempconfig.yml"

config_file+=",$tempconfig"

echo "Using config_file: $config_file"
#bundle exec jekyll serve --config=$config_file

if [[ $SERVE == "true" ]];then
  bundle exec jekyll serve --config=$config_file
elif [[ $DOCKER == "true" ]]
then
  sh start-docs.sh $tempconfig
else
  bundle exec jekyll build --config=$config_file
fi
