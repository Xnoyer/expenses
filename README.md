### What is this repository for? ###

* Expenses tracker app as a test task for AKVELON

### How do I get set up? ###

* You should have installed `nodejs` and `npm`
* Optionally `git` binary application is needed to clone repository with console
	If you have not `git` binary, you should download a ZIP archive of repository and unpack it by yourself
* Run a clone command and enter your password when prompted: `git clone https://m_stets@bitbucket.org/m_stets/expenses.git`
* Go into `./expenses/app` directory: `cd expenses/app`
* Run `npm install` command to fetch all dependencies: `npm install --silent`
* Run database initialization script: `npm run initdb`
* Run application: `npm start`
* After message `Expenses app listening on port 8081` the application is accessible by address
`http://localhost:8081`

### Basics ###

After DB initialization the system has two user accounts (<user>:<password>) - user:1 and admin:admin