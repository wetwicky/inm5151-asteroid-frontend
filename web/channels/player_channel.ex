defmodule Asteroidsio.PlayerChannel do
  use Phoenix.Channel

  intercept ["connect"]

  def join("player:default", _message, socket) do
    {:ok, socket}
  end

  def handle_in("connect", %{"name" => name}, socket) do
    broadcast! socket, "connect", %{name: name}
    {:noreply, socket}
  end

  def handle_out("connect", payload, socket) do
    push socket, "connect", payload
    {:noreply, socket}
  end
end
