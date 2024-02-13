import socket
import threading


def handle_client(client_socket):
    request = client_socket.recv(1024)
    print("[*] Received request from client:\n", request.decode('utf-8'))

    # Заменяем порт 80 на порт 8000 в запросе
    modified_request = request.replace(b':80', b':8000')

    # Подключаемся к серверу на порту 8000
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.connect(('127.0.0.1', 8000))

    # Пересылаем измененный запрос серверу
    server_socket.send(modified_request)

    # Получаем ответ от сервера
    server_response = server_socket.recv(1024)
    print("[*] Received response from server:\n", server_response.decode('utf-8'))

    # Пересылаем ответ клиенту
    client_socket.send(server_response)

    # Закрываем соединения
    client_socket.close()
    server_socket.close()


def start_proxy():
    # Создаем сокет, слушающий порт 80
    proxy_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    proxy_socket.bind(('0.0.0.0', 80))
    proxy_socket.listen(5)
    print("[*] Listening on port 80")

    while True:
        client_socket, addr = proxy_socket.accept()
        print("[*] Accepted connection from:", addr)

        # Запускаем отдельный поток для обработки клиента
        client_handler = threading.Thread(target=handle_client, args=(client_socket,))
        client_handler.start()


if __name__ == "__main__":
    start_proxy()
