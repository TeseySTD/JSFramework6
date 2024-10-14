interface SearchBarProps {
  className?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = (props: SearchBarProps) => {
  const debounceDecorator = (
    func: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    let timeoutId: NodeJS.Timeout;
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(event);
      }, 250);
    };
  };
  return (
    <div className={`search-bar ${props.className}`}>
      <input
        id="search-user-bar"
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={debounceDecorator(props.changeHandler)}
      />
    </div>
  );
};

export default SearchBar;
