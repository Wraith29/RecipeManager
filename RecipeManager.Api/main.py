from src import create_app


def main() -> None:
    create_app().run(port=5000)


if __name__ == "__main__":
    main()
