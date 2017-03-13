defmodule Asteroidsio.PlayerChannel do
  use Phoenix.Channel

  intercept ["UPDATE_OTHER_PLAYER"]

  def broadcast_change(id, player) do
    playerWithId = Map.put(player, :id, id)
    Asteroidsio.Endpoint.broadcast("player:default", "UPDATE_OTHER_PLAYER", playerWithId)
  end

  def join("player:default", _message, socket) do
    send(self, :after_join)
    :ok = ChannelWatcher.monitor(:player, self(), {__MODULE__, :leave, ["default", socket.assigns.player_id]})

    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    IO.inspect Asteroidsio.Bucket.current()
    push socket, "GET_PLAYERS", Asteroidsio.Bucket.current()
    {:noreply, socket}
  end

  def handle_in("UPDATE_PLAYER", payload, socket) do
    player = Asteroidsio.Bucket.merge(socket.assigns.player_id, payload)
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

  def leave(room_id, player_id) do
    Asteroidsio.Bucket.delete(player_id)
    Asteroidsio.Endpoint.broadcast("player:default", "PLAYER_LEFT", %{ "id" => player_id })
  end
end
