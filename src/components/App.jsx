import { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Searchbar } from "./Searchbar/Searchbar";
import { Button } from "./Button/Button"
import { Loader } from "./Loader/Loader"
import {Modal} from "./Modal/Modal"
import {fetchPictureQuery} from "../api/api.js"

export class App extends Component { 

    state = {
        page: 1,
        query: "",
        items: [],
        isLoader: false,
        showModal: false,
        imgLarge: "",
        showButton: false
    }

    toogleModal = (imgLarge = "") => {
        this.setState(state => ({
            showModal: !state.showModal,
            imgLarge,
        }))
    }

    getQuery = (query) => {
        if (query !== this.state.query) {
            this.setState({
                page: 1,
                query: query,
                items: []
            })
        }
    }

    loadMore = () => {
        this.setState(prevState => ({
            page: prevState.page + 1
        }))
    }

    async componentDidUpdate(_, prevState) {
        if ((prevState.page !== this.state.page) || (prevState.query !== this.state.query)) {
            this.setState({isLoader: true})
            try {
                const data = await fetchPictureQuery(this.state.query, this.state.page)
                this.setState(prevState => ({
                    items: [...prevState.items, ...data.hits],
                }))
                if (this.state.page < Math.ceil(data.totalHits / 12)) {
                    this.setState({showButton: true})
                } else {
                    this.setState({ showButton: false })
                }
            } catch (error){
                console.log(error); 
            } finally {
                this.setState({isLoader: false})
            }
        }
    }

    render() {
    return (
        <div>
            <Searchbar onSubmit={this.getQuery} />
            <ImageGallery query={this.state.items} openModal={ this.toogleModal } />
            {!(this.state.items.length === 0) && this.state.showButton && <Button onClick={this.loadMore} />}
            <Loader isLoader={this.state.isLoader} />
            {this.state.showModal && <Modal onClose={this.toogleModal} img={this.state.imgLarge}>{ this.props.children }</Modal> }
        </div>
    )
  }
}