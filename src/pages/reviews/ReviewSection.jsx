import React from 'react';
// Sare images import karo
import img1 from '../../assets/images/group/group-mem/01.png';
import img2 from '../../assets/images/group/group-mem/02.png';
import img3 from '../../assets/images/group/group-mem/03.png';
import img4 from '../../assets/images/group/group-mem/04.png';
import img5 from '../../assets/images/group/group-mem/05.png';
import img6 from '../../assets/images/group/group-mem/06.png';

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Teacher, Delhi",
    review: "Thanks to SHY-EYES, I found my soulmate just 50 km away! Our first date was magical, and now we're planning a future together.",
    image: img1,
    rating: 5
  },
  {
    id: 2,
    name: "Mark Evans",
    role: "Photographer, UK",
    review: "As a traveler in India, I never expected to meet someone so genuine online. SHY-EYES helped bridge that gap beautifully.",
    image: img2,
    rating: 5
  },
  {
    id: 3,
    name: "Rahul Mehta",
    role: "Engineer, Mumbai",
    review: "I was skeptical about dating apps, but SHY-EYES changed my mind. I met Rhea through a live chat and we instantly clicked.",
    image: img3,
    rating: 5
  },
  {
    id: 4,
    name: "Maria Gonzales",
    role: "Writer, Spain",
    review: "SHY-EYES is so user-friendly! I met an amazing Indian guy while visiting Goa. We're now in a beautiful long-distance relationship.",
    image: img4,
    rating: 5
  },
  {
    id: 5,
    name: "Riya & Karan",
    role: "Couple, Bangalore",
    review: "We both swiped right on SHY-EYES just for fun. But after a few video calls and chats, we realized it was real love.",
    image: img5,
    rating: 5
  },
  {
    id: 6,
    name: "Lucia Moretti",
    role: "Software Developer, Italy",
    review: "I built connections with people across India. SHY-EYES offers both casual chats and serious matchmaking. Impressive platform!",
    image: img6,
    rating: 5
  }
];

const ReviewSection = () => {
  return (
    <section className="clints-section padding-tb">
      <div className="container">
        <div className="section-header">
          <h4 className="theme-color">What Our Members Say</h4>
          <h2>Real Love Stories From SHY-EYES Users 💖</h2>
        </div>
        <div className="section-wrapper">
          <div className="clients">
            {reviews.map(review => (
              <div className="client-list" key={review.id}>
                <div className="client-content">
                  <p>{review.review}</p>
                  <div className="client-info">
                    <div className="name-desi">
                      <h6>{review.name}</h6>
                      <span>{review.role}</span>
                    </div>
                    <div className="rating">
                      <ul>
                        {[...Array(review.rating)].map((_, i) => (
                          <li key={i}><i className="icofont-star"></i></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="client-thumb">
                  <img src={review.image} alt="lab-clients" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;