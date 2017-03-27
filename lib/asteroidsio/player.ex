defmodule Asteroidsio.Player do
  import Asteroidsio.Bullet

  @moduledoc false

  def updatePlayers(id,
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
                    bullets) do
    now = :os.system_time(:milli_seconds)
    delta = if last_update != nil, do: now - last_update, else: 0
    deltaPercent = delta / (1000 / 60)

    newDir = dir
    newDir = if left_pressed, do: newDir - 200 * deltaPercent * :math.pi / 180, else: newDir
    newDir = if right_pressed, do: newDir + 200 * deltaPercent * :math.pi / 180, else: newDir

    speed = if up_pressed, do: 5 * deltaPercent, else: 0

    sx = speed * :math.cos(newDir / 360 * :math.pi * 2)
    sy = speed * :math.sin(newDir / 360 * :math.pi * 2)
    speedVector = Graphmath.Vec2.create(sx, sy)

    { newX, newY } = Graphmath.Vec2.create(x, y) |> Graphmath.Vec2.add(speedVector)

    newBullets = update_bullets(bullets)

    { last_time_fired, newBullets } = if fire_pressed && (last_time_fired == nil || now - last_time_fired > 200) do
      sx = 16 * :math.cos(newDir / 360 * :math.pi * 2)
      sy = 16 * :math.sin(newDir / 360 * :math.pi * 2)
      speedVector = Graphmath.Vec2.create(sx, sy)

      { bulletX, bulletY } = Graphmath.Vec2.create(newX, newY) |> Graphmath.Vec2.add(speedVector)
      bullet = %{:x => bulletX - 14,
                 :y => bulletY - 15,
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
  end
end