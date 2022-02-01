# random-title-api

get a random title from a list of markov chained titles from the likes of xQc and Forsen.

the original list is from [@MrAuro](https://github.com/MrAuro), in which he ran his [markov title generator](https://github.com/MrAuro/markov-title-generator) program.

## Documentation

- `GET` `https://api.mmatt.net/json`

  - Response:
  - ```
    {
        "title": "random title",
        "status": "200",
    }
    ```

- `GET` `https://api.mmatt.net/string`
  - Response:
  - ```
    "random title"
    ```
