import socket
import threading

# Define server parameters
HOST = '127.0.0.1'  # Localhost
PORT = 12345        # Port to listen on

# List to hold all client connections
clients = []

def broadcast(message, current_client):
    """Function to broadcast a message to all clients except the sender."""
    for client in clients:
        if client != current_client:
            client.sendall(message)

def handle_client(client_socket):
    """Function to handle client connections."""
    while True:
        try:
            # Receive message from client
            message = client_socket.recv(1024)
            print(message.decode('utf-8'))
            if not message:
                break
            broadcast(message, client_socket)
        except:
            # Remove client from the list if an error occurs
            clients.remove(client_socket)
            client_socket.close()
            break

def start_server():
    """Function to start the server."""
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, PORT))
    server.listen()

    print(f'Server listening on {HOST}:{PORT}')

    while True:
        client_socket, client_address = server.accept()
        print(f'Connected with {client_address}')

        clients.append(client_socket)
        thread = threading.Thread(target=handle_client, args=(client_socket,))
        thread.start()

if __name__ == "__main__":
    start_server()
