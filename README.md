# fastapi template


This templates combines Fastapi + tailwind + daisyUI + hyperscript 



## Install  dependencines

- Javascript and CSS dependencines 
```sh
npm i 
```
- python dependencies 
```sh
uv sync
```
- Building js and css

```sh
npx vite build
```
or to watch for changes in css and rebuild automatically 
```sh
npx vite 
```
I recommend to be use mise ("Running the server with browser live reload" section below ) so it watches all js,css and py files,
and can re-build js, restart fastapi and refresh the server with just one command 

## Running the server 
- Running the server 
```sh
fastapi run app/main.py
```
or 
```sh
fastapi dev app/main.py
```

- Running the server with browser live reload 
If you have [mise](https://mise.jdx.dev/dev-tools/) you run `mide dev` and it starts the website in port `3000` with a live reload proxy
that watches for changes and reloads the website in the browser, it injects a script near </body> so make sure the tag exists, you can 
adjust settings in `.air.toml` like file to ignore, extensions to watch etc, delay after build, etc.
