const fs = require('fs');
const inquirer = require('inquirer');
// const fs = require('fs');
// const generatePage = require('./src/page-template');


// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
    return inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is your name? (Required)',
          validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('Please enter your name!');
            }
          }
        },
        {
          type: 'input',
          name: 'github',
          message: 'Enter your github Username',
          validate: githubInput => {
            if (githubInput) {
              return true;
            } else {
              console.log('Please enter your github username!');
            }
          }
        },
        {
          type: 'input',
          name: 'about',
          message: 'Provide some information about yourself:'
        }
      ]);
    };
    // promptUser().then(answers => console.log(answers));

    const promptProject = portfolioData => {
      // If there's no 'projects' array property, create one
      if (!portfolioData.projects) {
        portfolioData.projects = [];
      }
      console.log(`
      ====================
      Add a New Project
      ==============
      `);
        return inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
              if (nameInput) {
                return true;

              } else {
                console.log('Please enter your project name!');
              }
            }

          },
          {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter a description of your project!');
              }
            }
          },
          {
            type: 'checkbox',
            name: 'languages',
            messages: 'What did you buld this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'Jquery', 'Bootsrap', 'Node']
            
          },
          {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter a github link to your project!');
              }
            }
          },
          {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
          },
          {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
          }
        ]);
        promptProject()
        .then(projectData => {
          portfolioData.projects.push(projectData);
          if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
          } else {
            return portfolioData;
          }
        });
    };
    promptUser()
    .then(promptProject)
    .then(portfolioData => {
      console.log(portfolioData);
    });

