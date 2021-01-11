/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import Header from './Header';
import Stats from './Stats';
import Reviews from './Reviews';
import ReviewModal from './ReviewModal';
import FlagModal from './FlagModal.jsx';
import Carousel from './Carousel.jsx';
import GridModal from './GridModal.jsx'
import styles from '../styles/App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewsTotal: 0,
      neighborhoodName: '',
      stats: {},
      reviewModal: false,
      reviewCard: {},
      reviewColor: '',
      flagModal: false,
      selectedReviews: [],
      gridModal: false,
    };
    this.handleReviewModal = this.handleReviewModal.bind(this);
    this.toggleReviewModalOff = this.toggleReviewModalOff.bind(this);
    this.handleFlagToggle = this.handleFlagToggle.bind(this);
    this.handleSelectedReviews = this.handleSelectedReviews.bind(this);
    this.toggleGridModal = this.toggleGridModal.bind(this);
  }

  componentDidMount() {
    // axios({
    //   method: 'get',
    //   url: `${window.location}neighborhood_reviews`,
    //   // window.location = current url in the browser
    // })
    //   .then((result) => {
    //     console.log('Get request reviews success');
    //     this.setState({
    //       reviewsTotal: result.data.length,
    //       selectedReviews: result.data,
    //     });
        // axios({
        //   method: 'get',
        //   url: `${window.location}neighborhood_stats`,
        // })
    axios({
      method: 'get',
      url: `${window.location}/neighborhood`,
      // window.location = current url in the browser
      // console.log('window location: ', window.location)
    })
      .then((res) => {
        console.log('Get request stats success');
        console.log('client side respose: ', res)
        // this.setState({
        //   neighborhoodName: res.data[0].name,
        //   stats: res.data[0].stats,
        // });
      })
      .catch((err) => console.log(err));
    // })
      // .catch((err) => console.log(err));
  }

  // handleSelectedReviews(selectedCategory) {
  //   axios({
  //     method: 'get',
  //     url: `${window.location}neighborhood_reviews`,
  //     params: {
  //       category: selectedCategory,
  //     },
  //   })
  //     .then((result) => {
  //       this.setState({
  //         selectedReviews: result.data,
  //       });
  //     });
  // }

  handleReviewModal(review, color) {
    this.setState({
      reviewModal: true,
      reviewCard: review,
      reviewColor: color,
    });
  }

  handleFlagToggle() {
    this.setState({
      flagModal: !this.state.flagModal,
    });
  }

  toggleReviewModalOff() {
    this.setState({
      reviewModal: false,
    });
  }

  toggleGridModal() {
    this.setState({
      gridModal: !this.state.gridModal,
    });
  }

  render() {
    return (
      <div className={styles.neighborhood}>
        <div className={styles.neighborhood}>
          <Header neighborhoodName={this.state.neighborhoodName} reviewsTotal={this.state.reviewsTotal} />
        </div>
        <div className={styles.stats}>
          <Stats stats={this.state.stats} />
        </div>
        <Reviews handleSelectedReviews={this.handleSelectedReviews} />
        <Carousel reviews={this.state.selectedReviews} handleReviewModal={this.handleReviewModal} handleFlagToggle={this.handleFlagToggle} toggleGridModal={this.toggleGridModal} />
        {this.state.gridModal ? <GridModal reviews={this.state.selectedReviews} toggleGridModal={this.toggleGridModal} /> : null}
        {this.state.reviewModal ? <ReviewModal review={this.state.reviewCard} color={this.state.reviewColor} toggleReviewModalOff={this.toggleReviewModalOff} /> : null}
        {this.state.flagModal ? <FlagModal handleFlagToggle={this.handleFlagToggle} /> : null}
      </div>
    );
  }
}

export default App;
