defmodule Asteroidsio.PlayerChannel do
  use Phoenix.Channel

  intercept ["UPDATE_ENTITIES", "GET_PLAYERS"]

  def update_entities(entities) do
    Asteroidsio.Endpoint.broadcast("player:default", "UPDATE_ENTITIES", entities)
  end

  def join("player:default", _message, socket) do
    send(self(), :after_join)
    :ok = Asteroidsio.ChannelWatcher.monitor(:player, self(), {__MODULE__, :leave, ["default", socket.assigns.player_id]})

    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    IO.inspect Asteroidsio.Bucket.current()
    players = Asteroidsio.Bucket.current()
    push socket, "GET_PLAYERS", players
    push socket, "RECEIVE_PLAYER_ID", %{ :id => socket.assigns.player_id }
    {:noreply, socket}
  end

  def handle_in("UPDATE_PLAYER", payload, socket) do
    clean_payload = %{:up_pressed => payload["up_pressed"],
                      :left_pressed => payload["left_pressed"],
                      :right_pressed => payload["right_pressed"],
                      :fire_pressed => payload["fire_pressed"],}
    player = Asteroidsio.Bucket.merge(socket.assigns.player_id, clean_payload)

    {:noreply, socket}
  end

  def handle_in("COLLISIONS", payload, socket) do
    Enum.map(payload, fn collision ->
        Asteroidsio.Bucket.update(collision["id"], fn elem ->
            %{elem | :health => elem[:health] - 1}
        end)
    end)
    player = Asteroidsio.Bucket.merge(socket.assigns.player_id, clean_payload)

    {:noreply, socket}
  end

  def handle_out("UPDATE_ENTITIES", payload, socket) do
    push socket, "UPDATE_ENTITIES", payload
    {:noreply, socket}
  end

  def leave(room_id, player_id) do
    Asteroidsio.Bucket.delete(player_id)
    Asteroidsio.Endpoint.broadcast("player:default", "PLAYER_LEFT", %{ "id" => player_id })
  end
end
