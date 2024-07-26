import socket
import threading

# Define server parameters
HOST = '127.0.0.1'  # Localhost
PORT = 12345        # Port to connect to

def receive_messages(client_socket):
    """Function to receive messages from the server."""
    while True:
        try:
            message = client_socket.recv(1024).decode('utf-8')
            if not message:
                break
            print(message)
        except:
            print("An error occurred!")
            client_socket.close()
            break

def send_messages(client_socket):
    """Function to send messages to the server."""
    while True:
        message = input("Enter location and message (format: location:message): ")
        client_socket.sendall(message.encode('utf-8'))

def start_client():
    """Function to start the client."""
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    client_socket.connect((HOST, PORT))

    # Start thread to receive messages from the server
    receive_thread = threading.Thread(target=receive_messages, args=(client_socket,))
    receive_thread.start()

    # Start thread to send messages to the server
    send_thread = threading.Thread(target=send_messages, args=(client_socket,))
    send_thread.start()

if __name__ == "__main__":
    start_client()
