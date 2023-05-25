# Greetings, future Abrie!
## This is how you pull/push on github

**Pulling files:**

1. Open the desired github main branch in your browser >
2. Open Terminal/Git/Powershell and cd to your local repo >
	> cd Documents/githubRepo
3. Initialize git >
	> git init
4. Copy the main branch HTTPS and add the remote on Terminal/Git/Powershell >
	> git remote add \<name> \<url>
5. Verify remote repository URL >
	> git remote -v
6. Ensure you have the latest updates >
	> git fetch
7. Switch to the branch from which you wish to pull the files
	> git checkout branch-name

	or for remote branch >

	> git checkout origin master
8. Next, pull from the selected branch >
	> git pull origin branch-name

**Pushing files:**

9. Once you're done with the changes, add the files you wish to push >
	> git add filename.extension
10. Now, commit the changes with a comment >
	> git commit -m "Message goes here"
11. Finally, push the changes to the desired branch.
	> git push \<remote> \<branch>

**Adding .gitignore file:**

1. Open terminal and cd to your local repo >
	> cd C:\path\to\your\repository
2. Create a new .gitignore file, if it doesn't exist, and add the cmd.bat file to it using the echo command >
	> echo cmd.bat >> .gitignore
3. Verify that the file has been added by checking dir in the terminal >
	> dir
4. Don't forget to add and push the .gitignore file!
	> git add .gitignore
	> git commit -m "Add .gitignore and exclude cmd.bat file"
	> git push <remote> branch-name

## Additional commands:
- Check status
	> git status
- View all branches
	> git branch -a
- To remove
	> git remote rm \<name>
- To rename
	> git remote rename \<old-name> \<new-name>
