defmodule Asteroidsio.Asteroid do
  @moduledoc false

  def updateAsteroid(id,
                    v,
                    x,
                    y,
                    dir,
                    speed,
                    last_update) do
    now = :os.system_time(:milli_seconds)
    delta = if last_update != nil, do: now - last_update, else: 0
    deltaPercent = delta / (1000 / 60)

    sx = speed * deltaPercent * :math.cos(dir / 360 * :math.pi * 2)
    sy = speed * deltaPercent * :math.sin(dir / 360 * :math.pi * 2)
    speedVector = Graphmath.Vec2.create(sx, sy)

    { newX, newY } = Graphmath.Vec2.create(x, y) |> Graphmath.Vec2.add(speedVector)

    {id, %{v | :x => newX,
               :y => newY,
               :last_update => now}}
  end

  def createAsteroids(bucket) do
    players = Enum.filter(bucket, fn({k, v}) -> v.type == :player end)
    playersCount = length players
    asteroids = Enum.filter(bucket, fn({k, v}) -> v.type == :asteroid end)
    asteroidsCount = length asteroids

    if asteroidsCount < 12 * playersCount do
      shouldCreateOne = Enum.random(0..50)
      if shouldCreateOne == 1 do
        {_, nearPlayer} = Enum.random(players)
        deltaX = Enum.random(-100..100)
        deltaY = Enum.random(-100..100)
        direction = Enum.random(0..359)
        speed = Enum.random(1..6)

        Asteroidsio.Bucket.add(%{
          :type => :asteroid,
          :x => nearPlayer.x + deltaX,
          :y => nearPlayer.y + deltaY,
          :direction => direction,
          :last_update => nil,
          :speed => speed
        })
      end
    end
  end
end
