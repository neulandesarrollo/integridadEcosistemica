Search engine to find cool stuff you can do with your Iot.

# Installation
## Add dependencies
Must add `twbs:bootstrap` and `marvin:piwik-http-sandstorm`.
````
// From project root, create `packages` folder
mkdir packages && cd packages

// Add bootstrap
git clone git@github.com:twbs/bootstrap.git
cd bootstrap
git checkout v4-dev
// You probably have to download tether and add it to the packages.js
// See example: https://github.com/marvinmarnold/bootstrap/blob/stingwatch/package.js

// Add Piwik
cd ..
git clone git@github.com:marvinmarnold/meteor-piwik-http-sandstorm.git piwik
// Follow instructions from the README to finish https://github.com/marvinmarnold/meteor-piwik-http-sandstorm
````

## Settings
Copy `settings-example.json` and fill in the corresponding values.

## Seed DB
You gotta give this thing data for it to run. [Email](mailto:marvin@unplugged.im) me if you actually get this far.
