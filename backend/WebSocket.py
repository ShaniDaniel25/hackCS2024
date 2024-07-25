import asyncio
import websockets

clients = set()

async def register(websocket):
    clients.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        clients.remove(websocket)

async def broadcast(message):
    if clients:
        await asyncio.wait([client.send(message) for client in clients])

async def handler(websocket, path):
    await register(websocket)
    async for message in websocket:
        await broadcast(message)

start_server = websockets.serve(handler, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
