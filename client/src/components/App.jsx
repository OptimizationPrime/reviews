/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Stats from './Stats';
import Reviews from './Reviews';
import ReviewModal from './ReviewModal';
import FlagModal from './FlagModal.jsx';
import Carousel from './Carousel.jsx';
import GridModal from './GridModal.jsx'
import styles from '../styles/App.css';

const App = () => {
  const [reviewsTotal, setReviewsTotal] = (0);
  const [neighborhoodName, setNeighborhoodName] = ('');
  const [stats, setStats] = ({});
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewCard, setReviewCard] = useState({});
  const [reviewColor, setReviewColor] = useState('');
  const [flagModal, setFlagModal] = useState(false);
  const [selectedReviews, setSelectedReviews] = ([]);
  const [gridModal, setGridModal] = (false);

  // useEffect(() => {
  //   // axios({
  //   //   method: 'get',
  //   //   url: `${window.location}neighborhood_reviews`,
  //   //   // window.location = current url in the browser
  //   // })
  //   //   .then((result) => {
  //   //     console.log('Get request reviews success');
  //   //     this.setState({
  //   //       reviewsTotal: result.data.length,
  //   //       selectedReviews: result.data,
  //   //     });
  //   // axios({
  //   //   method: 'get',
  //   //   url: `${window.location}neighborhood_stats`,
  //   // })
  //   axios({
  //     method: 'get',
  //     url: `${window.location}/neighborhood`,
  //     // window.location = current url in the browser
  //     // console.log('window location: ', window.location)
  //   })
  //     .then((res) => {
  //       console.log('Get request stats success');
  //       console.log('client side respose: ', res)
  //       // this.setState({
  //       //   neighborhoodName: res.data[0].name,
  //       //   stats: res.data[0].stats,
  //       // });
  //     })
  //     .catch((err) => console.log(err));
  //   // })
  //   // .catch((err) => console.log(err));
  // })

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

  const handleReviewModal = (review, color) => {
    setReviewModal(true);
    setReviewCard(review);
    setReviewColor(color);
    // this.setState({
    //   reviewModal: true,
    //   reviewCard: review,
    //   reviewColor: color,
    // });
  }

  const handleFlagToggle = () => {
    setFlagModal(!flagModal);
    // this.setState({
    //   flagModal: !this.state.flagModal,
    // });
  }

  const toggleReviewModalOff = () => {
    setReviewModal(false);
    // this.setState({
    //   reviewModal: false,
    // });
  }

  const toggleGridModal = () => {
    setGridModal(!gridModal);
    // this.setState({
    //   gridModal: !this.state.gridModal,
    // });
  }

  return (
    <div className={styles.neighborhood}>
      <div className={styles.neighborhood}>
        <Header neighborhoodName={neighborhoodName} reviewsTotal={reviewsTotal} />
      </div>
      <div className={styles.stats}>
        <Stats stats={stats} />
      </div>
      <Reviews handleSelectedReviews={handleSelectedReviews} />
      <Carousel reviews={selectedReviews} handleReviewModal={handleReviewModal} handleFlagToggle={handleFlagToggle} toggleGridModal={toggleGridModal} />
      {gridModal ? <GridModal reviews={selectedReviews} toggleGridModal={toggleGridModal} /> : null}
      {reviewModal ? <ReviewModal review={reviewCard} color={reviewColor} toggleReviewModalOff={toggleReviewModalOff} /> : null}
      {flagModal ? <FlagModal handleFlagToggle={handleFlagToggle} /> : null}
    </div>
  );
}

export default App;
