defmodule WikiFetch.Utils do

  @fetch_delay_ms 3_000 # Duration of callback silence before concluding that all requests have completed.

  @spec write_data(%{} | []) :: :ok
  def write_data(data) do
    File.write!("data.json", Poison.encode!(data, pretty: true), [:binary])
  end

  @doc """
  ## Examples

      iex> WikiFetch.Utils.get_member_id_string %{a: %{}, b: %{}}
      "a|b"
  """
  @spec get_member_id_string(%{}) :: String.t
  def get_member_id_string(members_by_id) do
    members_by_id
    |> Map.keys()
    |> Enum.reduce(fn id, reduction -> "#{reduction}|#{id}" end)
  end

  @doc """
  ## Examples

      iex> WikiFetch.Utils.snake_case "Mindy Kaling"
      "Mindy_Kaling"
  """
  @spec snake_case(String.t) :: String.t
  def snake_case(string) do
    String.replace(string, " ", "_")
  end

  def fetch_wiki! params do
    response = fetch! "https://en.wikipedia.org/w/api.php?#{params}"

    warnings = response["warnings"]
    if warnings != nil do
      IO.puts :stderr, "Wiki warnings: " <> inspect warnings
    end

    response
  end

  @doc """
  Fetch and parse a JSON API response.

  ## Examples

      iex> response = WikiFetch.Utils.fetch! "https://api.github.com/users/cooperka"
      iex> response["login"]
      "cooperka"
  """
  def fetch!(url) do
    {:ok, response} = fetch(url, false)
    response
  end

  def fetch_async!(url) do
    {:ok, response} = fetch(url, true)
    response
  end

  def fetch(url, async?) do
    IO.puts "GET #{url}"

    stream_to = if async? do
      self()
    else
      nil
    end

    case HTTPoison.get(url, %{}, stream_to: stream_to, hackney: [pool: :wiki_pool]) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, decode(body)}
      {:ok, %HTTPoison.Response{status_code: 404}} ->
        {:error, "Error: 404"}
      {:error, %HTTPoison.Error{reason: reason}} ->
        {:error, reason}
      {:ok, _} ->
        {:ok, "async"}
    end
  end

  def receive_json_chunks(callback) do
    {status, chunk} = receive do
      %HTTPoison.AsyncStatus{} -> {:ignore, nil}
      %HTTPoison.AsyncHeaders{} -> {:ignore, nil}
      %HTTPoison.AsyncChunk{chunk: chunk} -> {:chunk, chunk}
      %HTTPoison.AsyncEnd{} -> {:ignore, nil}
      after @fetch_delay_ms -> {:complete, nil}
    end

    if status == :chunk do
      json = decode(chunk)
      callback.(json)
    end

    if status == :complete do
      send(self(), status)
    else
      receive_json_chunks(callback)
    end
  end

  defp decode(body) do
    {status, json} = case Poison.decode(body) do
      {:ok, json} -> {:ok, json}
      _ -> {:error, nil}
    end

    if status == :error do
      IO.puts :stderr, "Error decoding: " <> inspect body
    end

    json
  end

end
