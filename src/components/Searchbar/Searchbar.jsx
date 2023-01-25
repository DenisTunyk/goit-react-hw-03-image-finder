import { Component } from "react";
import css from './Searchbar.module.css'
import PropTypes from 'prop-types';


export class Searchbar extends Component{
    state = {
        query: '',
    }

    handleChange = (event) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.onSubmit(this.state.query);
        this.reset();
    }

    reset = () => {
        this.setState({query: ''})
    }

    render() {
        
        return (
            <header className={css.Searchbar}>
                <form onSubmit={this.handleSubmit} className={css.SearchForm}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
                        type="text"
                        //autocomplete="off"
                        autoFocus
                        name="query"
                        placeholder="Search images and photos"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
}