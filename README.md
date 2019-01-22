Design suggestions for refactoring the code done in the last PR.

The code in this initial PR is from the call/tutoring session with Felipe.

**In this PR, we're going to be looking to accomplish the following changes.**

- Renaming files so they make more sense.
- Removing/editing some of the folders as they are overkill.
- Encapsulating the code. Generally looking to go along with something like Router → Controller → Store → Mongo
- Starting up and having the database loaded and ready before launching the server. (Hint : Inject the server inside the mongoose database connection start code block. Keep it asynchronous)
