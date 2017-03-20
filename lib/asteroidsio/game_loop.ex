defmodule Asteroidsio.GameLoop do
  use GenServer
  require Graphmath.Vec2

  ## Client API

  def tick({k, v}) do
    case {k, v} do
      {:id, _} ->
        {k, v}
      {id, %{:type => :player,
             :x => x,
             :y => y,
             :direction => dir,
             :up_pressed => up_pressed,
             :left_pressed => left_pressed,
             :right_pressed => right_pressed,
             :fire_pressed => fire_pressed,
             :last_update => last_update,
             }} ->

        now = :os.system_time(:milli_seconds)
        delta = if last_update != nil, do: now - last_update, else: 0
        deltaPercent = delta / (1000 / 60)

        newDir = dir
        newDir = if left_pressed, do: newDir - 200 * deltaPercent * :math.pi / 180, else: newDir
        newDir = if right_pressed, do: newDir + 200 * deltaPercent * :math.pi / 180, else: newDir

        speed = if up_pressed, do: 5 * deltaPercent, else: 0

        sx = speed * :math.cos(newDir / 360 * :math.pi * 2);
        sy = speed * :math.sin(newDir / 360 * :math.pi * 2);
        speedVector = Graphmath.Vec2.create(sx, sy)

        { newX, newY } = Graphmath.Vec2.create(x, y) |> Graphmath.Vec2.add(speedVector)

        {id, %{v | :x => newX,
                   :y => newY,
                   :direction => newDir,
                   :last_update => now}}
      {id, v} ->
        {id, v}
    end
  end

  ## Server API

  def start_link(name) do
    GenServer.start_link(__MODULE__, [], name: name)
  end

  def init(_) do
    schedule_work()
    {:ok, %{}}
  end

  def handle_info(:tick, state) do
    schedule_work()
    player_bucket = Map.drop(Asteroidsio.Bucket.update_all(&tick/1), [:id])
    Asteroidsio.PlayerChannel.update_entities(%{:players => player_bucket})
    {:noreply, state}
  end

  def code_change(_old, state, _extra) do
    {:ok, state}
  end

  def terminate(_reason, state) do
    state
  end

  defp schedule_work() do
    Process.send_after(self(), :tick, trunc(1000/60)) # 60 times per seconds
  end
end