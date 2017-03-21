defmodule Asteroidsio.GameLoop do
  use GenServer
  require Graphmath.Vec2

  ## Client API

  def update_bullet(bullet) do
    IO.puts "HERE =============================="
    IO.inspect bullet
    %{:x => x,
      :y => y,
      :speed => speed,
      :direction => dir,
      :last_update => last_update,
      :created_at => created_at} = bullet

    now = :os.system_time(:milli_seconds)

    if now - created_at <= 1500 do
      delta = if last_update != nil, do: now - last_update, else: 0
      deltaPercent = delta / (1000 / 60)

      speedRatio = speed * deltaPercent

      sx = speedRatio * :math.cos(dir / 360 * :math.pi * 2);
      sy = speedRatio * :math.sin(dir / 360 * :math.pi * 2);
      speedVector = Graphmath.Vec2.create(sx, sy)

      { newX, newY } = Graphmath.Vec2.create(x, y) |> Graphmath.Vec2.add(speedVector)
      %{bullet | :x => newX,
                 :y => newY,
                 :last_update => now }
    else
      nil
    end
  end

  def update_bullets(bullets) do
    Enum.map(bullets, &update_bullet/1) |> Enum.filter(fn v -> v != nil end)
  end

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

        newBullets = update_bullets(bullets)

        { last_time_fired, newBullets } = if fire_pressed && (last_time_fired == nil || now - last_time_fired > 200) do
          bullet = %{:x => newX - 14,
                     :y => newY - 15,
                     :speed => 8,
                     :direction => newDir,
                     :last_update => now,
                     :created_at => now}
          { now, [bullet | newBullets] }
        else
          { last_time_fired, newBullets }
        end

        {id, %{v | :x => newX,
                   :y => newY,
                   :direction => newDir,
                   :last_update => now,
                   :bullets => newBullets,
                   :last_time_fired => last_time_fired}}
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