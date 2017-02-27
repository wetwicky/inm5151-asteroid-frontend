defmodule Asteroidsio.PageController do
  use Asteroidsio.Web, :controller
  import RethinkDB.Query

  def init(conn, _params) do
    res1 = table_create("players")
    |> Asteroidsio.Repo.run
    |> IO.inspect

    text conn, "Players table created."
  end

  def index(conn, _params) do
    results = table("players")
    |> Asteroidsio.Repo.run
    |> IO.inspect

    render conn, "index.html"
  end
end
