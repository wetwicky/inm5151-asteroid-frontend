defmodule Asteroidsio.Asteroid do
  @moduledoc false

  def updateAsteroid(id,
                    v,
                    x,
                    y,
                    dir,
                    last_update) do
    now = :os.system_time(:milli_seconds)
    delta = if last_update != nil, do: now - last_update, else: 0
    deltaPercent = delta / (1000 / 60)

    speed = 2

    sx = speed * :math.cos(dir / 360 * :math.pi * 2)
    sy = speed * :math.sin(dir / 360 * :math.pi * 2)
    speedVector = Graphmath.Vec2.create(sx, sy)

    { newX, newY } = Graphmath.Vec2.create(x, y) |> Graphmath.Vec2.add(speedVector)

    {id, %{v | :x => newX,
               :y => newY,
               :last_update => now}}
  end
end