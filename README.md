# University Marks Service

It is a sample microservice based in NextJs

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install application.

```bash
npm run install
```

## Configuration

add your mongo details in `.env` file as per `env.sample` file.

## Dev environment usage

```bash
npm run dev
```

## Docker run

```bash
docker build -t sample-service .
docker run -p 3000:3000 -e MONGO_URL=<your mongo url> sample-service
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
