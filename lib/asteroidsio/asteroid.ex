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

  def inRange(asteroid, player) do
    asteroid.x - 10000 <= player.x && player.x <= asteroid.x + 10000 &&
      asteroid.y - 10000 <= player.y && player.y <= asteroid.x + 10000
  end

  def inRangeOfAny(asteroid, players) do
    Enum.any?(players, fn({k, player}) -> inRange(asteroid, player) end)
  end

  def deleteAsteroids(players, asteroids) do
    Enum.filter_map(
      asteroids,
      fn({k, asteroid}) -> not inRangeOfAny(asteroid, players) end,
      fn({k, asteroid}) -> Asteroidsio.Bucket.delete(k) end
    )
  end

  def createAsteroids(players, asteroids) do
    playersCount = length players
    asteroidsCount = length asteroids

    for _ <- players do
      if asteroidsCount < 12 * playersCount do
        shouldCreateOne = Enum.random(0..5)
        if shouldCreateOne == 1 do
          {_, nearPlayer} = Enum.random(players)
          deltaX = Enum.random(-100..100)
          deltaY = Enum.random(-100..100)
          direction = Enum.random(0..359)
          speed = Enum.random(1..6)

          IO.puts "Creating an asteroid"
          Asteroidsio.Bucket.add(%{
            :type => :asteroid,
            :x => nearPlayer.x + deltaX,
            :y => nearPlayer.y + deltaY,
            :direction => direction,
            :last_update => nil,
            :size => 1,
            :speed => speed
          })
        end
      end
    end
  end
end
