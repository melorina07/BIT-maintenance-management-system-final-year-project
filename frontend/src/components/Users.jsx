import Table from "./Table";

function Users() {

    const columns = useMemo(
        () => [
          {
            // first group - TV Show
            Header: "TV Show",
            // First group columns
            columns: [
              {
                Header: "Name",
                accessor: "show.name",
              },
              {
                Header: "Type",
                accessor: "show.type",
              },
            ],
          },
          {
            // Second group - Details
            Header: "Details",
            // Second group columns
            columns: [
              {
                Header: "Language",
                accessor: "show.language",
              },
              {
                Header: "Genre(s)",
                accessor: "show.genres",
              },
              {
                Header: "Runtime",
                accessor: "show.runtime",
              },
              {
                Header: "Status",
                accessor: "show.status",
              },
            ],
          },
        ],
        []
      );

      const [data, setData] = useState([]);

      // Using useEffect to call the API once mounted and set the data
      useEffect(() => {
        (async () => {
          const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
          setData(result.data);
        })();
      }, []);

      return (
        <div className="App">
          <Table columns={columns} data={data} />
        </div>
      )

}

export default Users;