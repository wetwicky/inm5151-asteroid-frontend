defmodule Asteroidsio.Bullet do
  @moduledoc false

  def update_bullet(bullet) do
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

end