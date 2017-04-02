defmodule Asteroidsio.Bucket do
  @doc """
  Starts a new bucket.
  """
  def start_link do
    Agent.start_link(fn -> %{:id => "0"} end, name: :bucket)
  end

  @doc """
  Create a new value in the `bucket` with a new `key` based on the bucket id.
  Return the id.
  """
  def add(value) do
    Agent.get_and_update(:bucket, fn dict ->
      {dict.id,
       Map.put(Map.put(dict, :id, Integer.to_string(String.to_integer(dict.id) + 1)), dict.id, value)}
    end)
  end

  @doc """
  Gets a value from the `bucket` by `key`.
  """
  def get(key) do
    Agent.get(:bucket, &Map.get(&1, key))
  end

  @doc """
  Gets the current state.
  """
  def current() do
    Agent.get(:bucket, &Map.drop(&1, [:id]))
  end

  @doc """
  Update all values of the map with a function.
  """
  def update_all(f) do
    Agent.get_and_update(:bucket, fn dict ->
      result = for {k, v} <- dict, into: %{}, do: f.({k, v})
      {result, result}
    end)
  end

  @doc """
  Check if a `key` is present in the `bucket`.
  """
  def has_key?(key) do
    Agent.get(:bucket, &Map.has_key?(&1, key))
  end

  @doc """
  Puts the `value` for the given `key` in the `bucket`.
  """
  def put(key, value) do
    Agent.update(:bucket, fn dict ->
      Map.put(dict, key, value)
    end)
  end

  @doc """
  Merge the `value` for the given `key` in the `bucket`.
  """
  def merge(key, value) do
    Agent.get_and_update(:bucket, fn dict ->
      content = Map.get(dict, key, %{})
      result = Map.merge(content, value)
      {result,
       Map.put(dict, key, result)}
    end)
  end

  @doc """
  Deletes `key` from `bucket`.

  Returns the current value of `key`, if `key` exists.
  """
  def delete(key) do
    Agent.get_and_update(:bucket, fn dict ->
      Map.pop(dict, key)
    end)
  end
end
