defmodule Asteroidsio.GameLoop do
  use GenServer
  require Graphmath.Vec2
  import Asteroidsio.Player
  import Asteroidsio.Asteroid

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
             :last_time_fired => last_time_fired,
             :last_update => last_update,
             :bullets => bullets
            }} ->
        updatePlayers(id,
          v,
          x,
          y,
          dir,
          up_pressed,
          left_pressed,
          right_pressed,
          fire_pressed,
          last_time_fired,
          last_update,
          bullets)

      {id, %{:type => :asteroid,
             :x => x,
             :y => y,
             :direction => dir,
             :speed => speed,
             :last_update => last_update
            }} ->
        updateAsteroid(id,
          v,
          x,
          y,
          dir,
          speed,
          last_update)

      {id, v} ->
        {id, v}
    end
  end

  ## Server API

  def start_link(name) do
    GenServer.start_link(__MODULE__, [], name: name)
  end

  def init(_) do
    {:ok, %{:timer => schedule_work()}}
  end

  def handle_info(:tick, _state) do
    timerRef = schedule_work()
    bucket = Map.drop(Asteroidsio.Bucket.update_all(&tick/1), [:id])
    players = Enum.filter(bucket, fn({_, v}) -> v.type == :player end)
    asteroids = Enum.filter(bucket, fn({_, v}) -> v.type == :asteroid end)
    createAsteroids(players, asteroids)
    deleteAsteroids(players, asteroids)
    
    Asteroidsio.PlayerChannel.update_entities(Asteroidsio.Bucket.current)
    {:noreply, %{:timer => timerRef}}
  end

  def code_change(_old, state, _extra) do
    Process.cancel_timer(state.timer)
    {:ok, %{}}
  end

  def terminate(reason, state) do
    IO.puts "Asked to stop because #{inspect reason} with state #{inspect state}"
    Process.cancel_timer(state.timer)
    :ok
  end

  defp schedule_work() do
    Process.send_after(self(), :tick, trunc(1000/60)) # 60 times per seconds
  end
end
