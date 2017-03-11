defmodule Asteroidsio.PlayerChannel do
  use Phoenix.Channel
  import RethinkDB.Query

  intercept ["SEND_HELLO", "RECEIVE_HELLO"]

  def join("player:default", _message, socket) do
    {:ok, socket}
  end

  def handle_in("SEND_HELLO", _payload, socket) do
    user = (table("players")
               |> get(socket.assigns.user_id)
               |> Asteroidsio.Repo.run
               |> IO.inspect).data
    broadcast! socket, "RECEIVE_HELLO", %{"type": "RECEIVE_HELLO", "payload": "Hello from #{user["name"]}"}
    {:noreply, socket}
  end

  def handle_out("RECEIVE_HELLO", payload, socket) do
    push socket, "RECEIVE_HELLO", payload
    {:noreply, socket}
  end
end
