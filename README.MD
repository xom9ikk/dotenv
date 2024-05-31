# dotenv@v2.3.0
> GitHub Action to read .env file and add variables to GITHUB_ENV

## 🔥 Usage
```yaml
- name: Load .env file
  uses: xom9ikk/dotenv@v2.3.0
  with:
    path: custom/path/to/folder/with/env
    mode: development
    load-mode: strict

- name: Some other action
  run: |
    echo "Variable 1: ${{ env.VARIABLE_1 }}"
    echo "Variable 2: ${{ env.VARIABLE_2 }}"
    echo "Variable 3: ${{ env.VARIABLE_3 }}"
```

## ✨ Features
* ⛳ ability to specify the path to the folder;
* 🎨 setup mode;
* 💎 simple API;
* 🍃 variable expansion;

## 💡 Input

| property | isRequired | default | comment                                                                                                      | example
|----------|:----------:|:-------:|----------------------------------------------------|:--------:
| `path` |     x      | ./      | path to the folder where the .env file is located. | ./custom/path/to/folder/with/env
| `mode`   |     x      | `empty` | mode for loading the .env file.                       | test
| `load-mode` |    x    | `strict` | sets whether the program should fail when the .env file is not present (`strict`) or continue (`skip`) | skip|

## 🧩 Notes
This action is built on top of the [dotenv](https://github.com/motdotla/dotenv) and [dotenv-expand](https://github.com/motdotla/dotenv-expand) libraries.
When starting the action, the file is read from the target folder in the `path` property and using the mode specified in` mode`.

The name of the `.env` file depends on the startup mode.
If you do not specify the launch mode, the `.env` file will be loaded.
If you need to load a `.env` file for a specific mode, you should specify the `mode` property.

Thus, specifying `mode: test` will read the `.env.test` file. `mode: development` will read `.env.development` and so on.

After reading and parsing the variables from the `.env` file, it writes them to `GITHUB_ENV`.

If the action should continue when the .env file is not present, the optional `load-mode` flag can be set to `skip`. This can be particularly, for example, useful in secondary branches, where some aspects of the action may not be relevant.

Action also supports variable expansion, e.g.
```bash
PASSWORD="s1mpl3"
DB_PASS=$PASSWORD
```
