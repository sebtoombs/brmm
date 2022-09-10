# 🏎 brmm

Build, run, manage & maintain your projects with ease.

`brmm` is a build tool designed to slot in on top of your `package.json` **scripts**, or your `Makefile`, or whatever other commands you might have, to help manage projects with multi step build processes.

`brmm` is currently built with JavaScript, but can be used in any software development project where you need to run commands to develop, build, test, and deploy your project.

# 🚀 Get Started

## Install

`brmm` is a command line tool, and you can download the binary ~~here~~ (coming soon).

Alternatively, you can also download `brmm` as an `npm` package, and use it as a `devDependency` in your project (if you're JavaScript inclined).

```bash
npm install --save-dev brmm
```

## Config

`brmm` requires a config file to run. `brmm` will look for config files in your working directory in the following order:

- `brmm.config.yml`
- `brmm.config.yaml`
- `brmm.config.js`
- `brmm.config.json`

### Example config file

```yaml
# brmm.config.yml
tasks:
  # brmm dev
  dev:
    pre: "echo 'I run before the command'" # I will run first
    command: "npm run dev" # I will run when `pre` finishes
    post: # I will run when `command` finishes (or is terminated)
      - "echo 'post 1'" # multiple commands in series
      - "echo 'post 2'"
      # Mutiple commands in parallel
      - { parallel: ["node server.js", "node server.js -p 8100"] }
  # brmm build
  build: "npm run build"
  # brmm pre-push
  pre-push: ["npm run lint", "npm run test", "npm run build"] # each command runs in series
  # brmm test
  test:
    command: ["npm run test:foo", "npm run test:bar"]
  # brmm parallel
  parallel: { parallel: ["node server.js", "node server.js -p 8100"] }
  # brmm series
  series: ["echo 'series 1'", "echo 'series 2'"]
  # brmm output
  # you can use shell commands as long as your env supports them
  output:
    ["OUTPUT=$(node ./long-running-process.js | grep foo) && echo $OUTPUT"]
  # brmm composed
  # You can reference other tasks
  composed: ["echo 'composed 1'", "echo 'composed 2'", "composed_3"]
  # brmm composed_3
  composed_3: "echo 'composed 3'"
```

## 🏎 Run your tasks

That's it, you're ready to go! Run your tasks with `brmm <task>`.

```bash
# Start your dev task
brmm dev

# Build your project
brmm build

## You can pass arguments to your tasks too
brmm dev --port 8080
```

# 📖 Documentation

## Custom config file path

Alternatively you can specify a custom config file path with the `--config` flag.

```bash
brmm --config ./path/to/brmm.config.yml
# or with short flag
brmm -c ./path/to/brmm.config.yml
```

## Task configuration

Tasks are defined in your `brmm.config` file as an object under the top level `tasks` key. The key is the name of the task, and the value is the command to run.

The value is incredibly flexible and can be a string (single command), and array (multiple commands in series), or a special object syntax to handle pre and post command instructions, or running commands in parallel.

### Single command

```yaml
tasks:
  # brmm dev
  dev: "npm run dev"
```

### Multiple commands in series

Tasks specified in an array will run sequentially, with each task waiting for the previous task to complete.

```yaml
tasks:
  # brmm dev
  dev: ["npm run dev", "npm run dev:watch"]
```

### Pre and post commands

```yaml
tasks:
  # brmm dev
  dev:
    pre: "echo 'I run before the command'"
    command: "npm run dev"
    post: "echo 'I run after the command'"
```

**Note:** each command in `command`, `pre` & `post` can also be a string, array or object!

### Parallel commands

```yaml
tasks:
  # brmm dev
  dev:
    parallel:
      - "npm run dev:styles"
      - "npm run dev:watch"
```

### Compose tasks

`brmm` allows you to compose tasks as well. This is useful if you have a task that is a combination of other tasks.

```yaml
tasks:
  # brmm build
  build: "npm run build"
  # brmm watch
  watch: "npm run watch"
  # brmm dev
  dev: ["build", "watch"]
```

### Referencing another task

To keep things simple, you can simply use a task's name to reference it in another task (see example above). However this can be an issue if you happen to have a task with the same name as a command you want to run. In this case you can also _explicitly_ call another task by prefixing it with `task:`.

```yaml
tasks:
  # brmm build
  build: "npm run build"
  # brmm watch
  watch: "npm run watch"
  # brmm dev
  dev: ["task:build", "task:watch"]
```
