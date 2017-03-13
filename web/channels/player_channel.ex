defmodule Asteroidsio.PlayerChannel do
  use Phoenix.Channel

  intercept ["UPDATE_OTHER_PLAYER"]

  def broadcast_change(id, player) do
    playerWithId = Map.put(player, :id, id)
    Asteroidsio.Endpoint.broadcast("player:default", "UPDATE_OTHER_PLAYER", playerWithId)
  end

  def broadcast_delete(player) do
    Asteroidsio.Endpoint.broadcast("player:default", "DELETE_PLAYER", player)
  end

  def join("player:default", _message, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    #push socket, "This is a test", %{}
    {:noreply, socket}
  end

  def handle_in("UPDATE_PLAYER", payload, socket) do
    IO.puts "Update_player"
    player = Asteroidsio.Bucket.merge(socket.assigns.player_id, payload)
    IO.inspect player
    broadcast_change(socket.assigns.player_id, player)

    {:noreply, socket}
  end

  def handle_out("UPDATE_OTHER_PLAYER", payload, socket) do
    # Do not send player update to himself
    if socket.assigns.player_id != payload.id do
        push socket, "UPDATE_OTHER_PLAYER", payload
    end
    {:noreply, socket}
  end

  def leave(socket, topic) do
      IO.puts "SOMEBODY LEAVING"
      broadcast socket, "user:left", %{ "content" => "somebody is leaving" }
      {:ok, socket}
  end
end
