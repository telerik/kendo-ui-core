**#KENDO LABS BOILERPLATE. CUSTOMIZE FOR YOUR PROJECT**

These guidelines are here to facilitate your contribution and streamline the process of getting changes merged into this project and released. Any contributions you can make will help tremendously, even if only in the form of an issue report. Following these guidelines will help to streamline the pull request and change submission process.

## Documentation Fixes

If you notice any problems with any documentation, please fix it and we'll get it merged as soon as we can. For small things like typos and grammar, just click the "Edit this file" button and send in the pull request for the fix. For larger changes and big swaths of documentation changes, a regular pull request as outlined below is more appropriate.

## Code Fixes and Enhancements

### 1. Log an Issue

Before doing anything else, we ask that you file an issue in the Issues list for this project. First, be sure to check the list to ensure that your issue hasn't already been logged. If you're free and clear, file an issue and provide a detailed description of the bug or feature you're interested in. If you're also planning to work on the issue you're creating, let us know so that we can help and provide feedback.

### 2. Fork and Branch

#### Fork Us, Then Create A Topic Branch For Your Work

The work you are doing for your pull request should not be done in the master branch of your forked repository. Create a topic branch for your work. This allows you to isolate the work you are doing from other changes that may be happening.

Github is a smart system, too. If you submit a pull request from a topic branch and we ask you to fix something, pushing a change to your topic branch will automatically update the pull request. 

#### Isolate Your Changes For The Pull Request

See the previous item on creating a topic branch.

If you don't use a topic branch, we may ask you to re-do your pull request on a topic branch. If your pull request contains commits or other changes that are not related to the pull request, we will ask you to re-do your pull request.

#### Branch from "dev" not "master"

The "master" branch of the [PROJECT NAME] repository is for production release code, and documentation updates only. Never create a pull request from the master branch. Always create a branch for your work from the "dev" branch. This will facilitate easier pull request management for the continuous work that is done in the dev branch.

#### Squash your commits

When you've completed your work on a topic branch, we prefer that you squash your work down into a single commit to make the merge process easier. For information on squashing via an interactive rebase, see [the rebase documentation on GitHub](https://help.github.com/articles/interactive-rebase)

### 3. Submit a Pull Request

See [Github's documentation for pull requests](https://help.github.com/articles/using-pull-requests).

Pull requests are the preferred way to contribute to [PROJECT NAME]. Any time you can send us a pull request with the changes that you want, we will have an easier time seeing what you are trying to do. But a pull request in itself is not usually sufficient. There needs to be some context and purpose with it, and it should be done against specific branch.

### Provide A Meaningful Description

It is very important to provide a meaningful description with your pull requests that alter any code. A good format for these descriptions will include three things:

1. Why: The problem you are facing (in as much detail as is necessary to describe the problem to someone who doesn't know anything about the system you're building)

2. What: A summary of the proposed solution

3. How: A description of how this solution solves the problem, in more detail than item #2

4. Any additional discussion on possible problems this might introduce, questions that you have related to the changes, etc.

Without at least the first 2 items in this list, we won't have any clue why you're changing the code. The first thing we'll ask, then, is that you add that information.

## Code Style

We're not dogmatic about code style, here, but we do believe that a project should adhere to a consistent style. All Kendo UI Labs projects are expected to follow the following style guidelines, so please keep these in mind before you submit your Pull Requests:

- Tab indentation, size of 2
- Semicolons are nice. Use them
- Single quotes
- No trailing whitespace
- Declare variables at the top of a scope
- Return early
- Be JSHint Valid

Beyond these, you're best bet, when it doubt it to follow [idiomatic.js](https://github.com/rwldrn/idiomatic.js). 