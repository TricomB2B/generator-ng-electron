'use strict';

/**
 * Generate an Electron Boilerplate app and import an Angular
 * project (from a repository), making the necessary edits
 * to work within Electron.
 */

var Generator = require('yeoman-generator'),
    chalk     = require('chalk'),
    yosay     = require('yosay'),
    download  = require('download-git-repo'),
    fsp       = require('fs-promise');

module.exports = class extends Generator {
  // Initializing Queue
  initializing () {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ngElectron generator`));
  }

  // Prompting Queue
  prompting () {
    this.log('Tell me about the Angular app you wish to import...');

    const prompts = [{
      type: 'input',
      name: 'owner',
      message: 'Who is the GitHub owner of the app?',
      default: 'TricomB2B'
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the name of the GitHub repo?',
      validate: Boolean
    }, {
      type: 'input',
      name: 'branch',
      message: 'Which branch would you like to import?',
      default: 'master'
    }];

    return this.prompt(prompts)
      .then((answers) => {
        this.props             = answers;
        this.props.boilerplate = 'TricomB2B/electron-boilerplate';
        this.props.ngRepo      = `${this.props.owner}/${this.props.repo}#${this.props.branch}`;
      });
  }

  // Writing Queue
  writing () {
    const props = this.props;

    let p1, p2 = null;

    return download(props.boilerplate, this.destinationPath())
      .then(() => {
        return this.spawnCommandSync('rm', ['./boilerplate/app/index.html', './boilerplate/app/index.css']);
      })
      .then(() => {
        return download(props.ngRepo, this.destinationPath('boilerplate/app'), { clone: true });
      })
      .then(() => {
        p1 = fsp
          .readFile(this.destinationPath('boilerplate/app/index.html'), 'utf8')
          .then((data) => {
            let newFile = data.replace('<base href="/">', '');
            newFile     = newFile.replace('<script src="dist/js/app.min.js"></script>', '<script src="dist/js/app.js"></script>');

            return fsp.writeFile(this.destinationPath('boilerplate/app/index.html'), newFile);
          });

        p2 = fsp
          .readFile(this.destinationPath('boilerplate/app/dist/js/app.js'), 'utf8')
          .then((data) => {
            let newFile = data.replace('$locationProvider.html5Mode(true);', '$locationProvider.html5Mode(false);');

            return fsp.writeFile(this.destinationPath('boilerplate/app/dist/js/app.js'), newFile);
          });

        return Promise.all([p1, p2]);
      });
  }

  // Install Queue
  install () {
    this.spawnCommandSync('yarn', [], { cwd: 'boilerplate' });
  }

  // End Queue
  end () {
    this.log(chalk.green('Your app is ready!'))
    this.spawnCommand('npm', ['start'], { cwd: 'boilerplate' });
  }
}
