# dotenv@v1
> GitHub Action to read .env file and add variables to GITHUB_ENV

## 🔥 Usage
```yaml
- name: Load .env file
  uses: xom9ikk/dotenv@v1
  with:
    path: custom/path/to/folder/with/env
    mode: development

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

## 💡 Input

| property | isRequired | default | comment                                                                                                      | example
|----------|:----------:|:-------:|----------------------------------------------------|:--------:
| `path` |     x      | ./      | path to the folder where the .env file is located. | ./custom/path/to/folder/with/env
| `mode`   |     x      | `empty` | mode for load the .env file.                       | test

## 🧩 Notes
This action is built on top of the [dotenv](https://github.com/motdotla/dotenv) library.
When starting the action, the file is read from the target folder in the `folder` property and using the mode specified in` mode`.

The name of the `.env` file depends on the startup mode.
If you do not specify the launch mode, the `.env` file will be loaded.
If you need to load a `.env` file for a specific mode, you should specify the `mode` property.

Thus, specifying `mode: test` will read the `.env.test` file. `mode: development` will read `.env.development` and so on.

After reading and parsing the variables from the `.env` file, it writes them to `GITHUB_ENV`.
