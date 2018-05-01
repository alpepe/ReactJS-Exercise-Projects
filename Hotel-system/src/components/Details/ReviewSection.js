import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { postReview, getReviews } from '../../api/remote.js';
import Review from './Review.js';
import toastr from 'toastr'



export default class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rating: '5',
            comment: '',
            reviews: []
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    async getData() {
        const reviews = await getReviews(this.props.hotelId);
        this.setState({ reviews });
    }


    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async onSubmitHandler(e) {
        e.preventDefault();
        const res = await postReview(this.props.hotelId, this.state.comment, Number(this.state.rating))

        if (!res.success) {
            this.setState({ error: res });
            return;
        }
        //ъпдейтвам коментарите след пост на нов коментар 
        const reviews = this.state.reviews.slice();
        reviews.push(res.review);
        this.setState({ reviews });
        this.getData();
        toastr.success('Review posted successfully');
    }

    render() {
        return (
            <div style={{ margin: '25px' }}>
                <form onSubmit={this.onSubmitHandler}>
                    <div>
                        Rating:<br />
                        <select name="rating" value={this.state.rating} onChange={this.onChangeHandler}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div><br />
                    Comment:<br />
                    <textarea name="comment" value={this.state.comment} onChange={this.onChangeHandler} /><br />
                    <input type="submit" value="Post review" />
                </form>

                {this.state.reviews.map((r, index) => (
                    <Review
                        key={index}
                        user={r.user}
                        comment={r.comment}
                        rating={r.rating}
                        date={r.createdOn}
                    ></Review>
                ))}


            </div>
        )
    }
}