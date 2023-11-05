import { Component } from 'react';
import { MdSearch } from 'react-icons/md';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css'
class SearchBar extends Component {
  state = {
    searchName: '',
    inputValue: '',
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchName.value.trim();
    this.props.onSubmit(searchQuery);
    event.target.reset();
  };

  render() {
    return (
      <header>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button className={styles.button}>
            <MdSearch style={{ width: 25, height: 25 }} />
          </button>
          <input className={styles.input}
            name="searchName"
            type="text"
            id="search"
            value={this.state.inputValue}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;