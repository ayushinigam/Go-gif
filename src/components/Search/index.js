import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import './Search.css';

class Search extends Component {
    state = {
        value: ''
    }
    onKeyDown = (event) => event.key === 'Enter' && this.updateValue();
    onChange = (event) => this.setState({value: event.target.value});
    updateValue = () => this.props.updateSearchValue(this.state.value);
   render() {       
       return (
           <div className='searchContainer'>
            <input type = 'text' 
            onKeyDown = {this.onKeyDown}
            onChange={this.onChange}
            placeholder='Search'
            className="searchInput"
            disabled={this.props.disabled}
            />
           <img className="searchIcon" src={require(`../../assets/search.svg`)} alt="search" onClick={this.updateValue}/>
           </div>
       )
   }
}

Search.defaultProps = {
    updateSearchValue: () => {}
}

Search.propTypes = {
    updateSearchValue: PropTypes.func
}

export default Search