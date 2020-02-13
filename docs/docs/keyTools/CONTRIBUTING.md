## CONTRIBUTING

- **Avoid pushing to the `master` branch.** Instead, create a _Pull Request_ (PR) in the general format `milestone` and `milestone-feature` like so:

  ```bash
  git checkout -b milestone
  ```

  Prior to committing, `pull` from the base branch:

  ```
  git pull origin milestone
  ```

  Periodically the team should be able to pull in from master and base branches to avoid regressions and large merge conflicts.

Push your changes like so:

```
git add --all
git commit -m 'feature works as expected, almost'
git push origin milestone-feature
```

Git will create a link in your terminal for you to create a new PR. Click this link or go to Github.com in your browser. Make sure to merge into the right branch. For example, `master` will appear on the left of the Github 'Create Pull Request' page. and `milestone` on the right (in the case of merging a milestone into master). If you accidentally create a PR where `master` is on the left and `milestone-feature` is on the right, hit the **Edit** button in the upper right of the page to select the correct base branch.

- **Pull Requests require review.** Github will automatically suggest someone who has recently edited the files under review to be merged. **When reviewing a PR, read the code.** Try to give a thorough review. Post a few words about the review in the comment, or suggest a change. Be constructive.

- **After the PR has been accepted, the author of the PR will hit the green 'merge' button.** This gives the author a chance to make any changes they or the team have arrived at, and then doubly confirm the merge. We will almost never want to commit a feature directly to master- the exception being referred to as a 'hot fix'.

There are development tools installed:

- Husky: runs pre-commit and pre-push tasks.
- ESlint: will block a commit if there is a comma out of place or a bracket missing, etc.
- Prettier will ensure the code conforms to a consistent style.

---

## CODE OF CONDUCT

- Don't play the blame game. We win as a team.
- Accept critique. We all want to get better.

_HAVE FUN DAMIT! Break stuff, experiment, hack-away, but remember to be a good teammate! We want **Everyone** to have fun!_ -- Austin
