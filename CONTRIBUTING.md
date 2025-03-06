# Contributing to Git Graph

Thank you for taking the time to contribute!

The following are a set of guidelines for contributing to vscode-git-graph.

## Code of Conduct

This project and everyone participating in it is governed by the [Git Graph Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [Alexandre Foley](mailto:Alexandre.Foley@usherbrooke.ca).


## regarding MHutchies

Please don't bother him, he has moved off of github and doesn't seem interested in this project anymore. We are thankful to him for this wonderful VScode addon.
This fork start from the last commit still licensed under MIT. 

## How Can I Contribute?

### Reporting Bugs

Raise a bug you've found to help us improve! Due to the extremely broad nature of Git repositories, some bugs might slip through the cracks.

Check the [open bugs](https://github.com/AlexandreFoley/vscode-git-graph/issues?q=is%3Aissue+is%3Aopen+label%3A"bugs"), to see if the bug as already been reported. Share in the Issue all relevant information you have discovered about that bug.

If the bug hasn't previously been reported, please follow these steps:
1. Raise an issue by selecting the "Bug Report" template.
2. Follow the template as you see appropriate, it's only meant to be a guide.
3. Click "Submit new issue"

We aim to respond promptly, and get it resolved as quickly as possible.

### Feature Suggestions

Suggest an idea for this extension! We want to make Git Graph an even more useful tool in Visual Studio Code, so any suggestions you have are greatly appreciated.

Check the [open feature requests](https://github.com/AlexandreFoley/vscode-git-graph/issues?q=is%3Aissue+is%3Aopen+label%3A"feature+request").

If your feature hasn't previously been suggested, please follow these steps:
1. Raise an issue by selecting the "Feature Request" template.
2. Follow the template as you see appropriate, it's only meant to be a guide.
3. Click "Submit new issue"

We aim to respond promptly, and prioritize it as we and the community see appropriate.

### Contributing To Development

If you're interested in helping contribute, either:
* Find an open issue you'd like to work on, and comment on it. Once the maintainer has responded with some background information and initial ideas, it will be assigned to you to work on.
* Raise an issue describing the feature you'd like to work on, mentioning that you'd like to implement it. Once it has been responded to by the maintainer, it has been confirmed as a suitable feature of Git Graph and it will be assigned to you to work on.

Step 1: To set up your development environment, please follow these steps:
1. Install [Node.js](https://nodejs.org/en/) if it is not already installed.
2. Clone the [vscode-git-graph](https://github.com/mhutchie/vscode-git-graph) repo on GitHub.
3. Open the repo in Visual Studio Code.
4. In the Visual Studio Code terminal, run `npm install` to automatically download all of the required Node.js dependencies.
5. Install the [TSLint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) extension if it is not already installed.
6. Create and checkout a branch for the issue you're going to work on.

Step 2: Review the [Codebase Outline](https://github.com/mhutchie/vscode-git-graph/wiki/Codebase-Outline), so you have an understanding of the structure of the code.

Step 3: To compile the code, run the appropriate npm script in the Visual Studio Code terminal as follows:
* `npm run compile`: Compiles both front and backend code
* `npm run compile-src`: Compiles the backend code only
* `npm run compile-web`: Compiles the frontend code only, with minification.
* `npm run compile-web-debug`: Compiles the frontend code, without minification.

Step 4: To quickly test your changes:
* Pressing F5 launches the Extension Development Host in a new window, overriding the installed version of Git Graph with the version compiled in Step 3. You can:
    * Use the extension to test your changes
    * View the Webview Developer Tools by running the Visual Studio Code command `Developer: Open Webview Developer Tools`. This allows you to:
        * View the front end JavaScript console
        * View and modify the CSS rules (temporarily)
        * View and modify the DOM tree (temporarily)
        * If you ran `npm run compile-web-debug` in Step 3, you can also add breakpoints to the compiled frontend JavaScript.
* Switching back to the Visual Studio Code window that you were in (from Step 3), you can:
    * Add breakpoints to the backend TypeScript
    * Restart the Extension Development Host
    * Stop the Extension Development Host

Step 5: To do a complete test of your changes:
1. Install Visual Studio Code Extensions `npm install -g vsce` if it is not already installed.
2. Change the version of the extension defined in `package.json` on line 4 to an alpha release, for example `1.4.6-alpha.0`. You should increment the alpha version each time you package a modified version of the extension. _Make sure you don't commit the version number with your changes._
3. Run the npm script `npm run package` in the Visual Studio Code terminal. This will compile and package the extension into a `vsix` file.
4. Install the `vsix` file by running `code --install-extension <VSIX_FILENAME_HERE>` in the Visual Studio Code terminal.
5. Restart Visual Studio Code, and verify that you have the correct alpha version installed.
6. Test out the extension, it will behave exactly the same as a published release.

Step 6: Raise a pull request once you've completed development, we'll have a look at it.

#### Style Guide

The required style is produced by running "Format Document" in Visual Studio Code.
