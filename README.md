# Absent Application

This is a simple application that allows you to create a list of tasks and mark them as completed. It also allows you to delete tasks from the list.

## How to run

1. Clone the repository
2. Kindly check each folder for the README.md file.
    - Frontend: absence_app
    - Backend: absence_backend

## Frontend

1. Install the dependencies
    ```bash
    cd absence_app
    npm install
    ```
2. Run the application
    ```bash
    npm run dev
    ```

    or run in production mode

    ```bash
    npm run build
    npm run start
    ```

## Backend

1. Install the dependencies
    ```bash
    cd absence_backend
    npm install
    ```
2. Run mysql docker container
    ```bash
    docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0
    ```
3. Run the application
    ```bash
    npm run start    
    ```

make sure to adjust the environment variables in the `.env` file.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.   