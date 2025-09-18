import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/images/group/01.jpg';
import img2 from '../../assets/images/group/02.jpg';
import img3 from '../../assets/images/group/03.jpg';
import img4 from '../../assets/images/group/04.jpg';

import mem1 from '../../assets/images/group/group-mem/01.png';
import mem2 from '../../assets/images/group/group-mem/01.png';
import mem3 from '../../assets/images/group/group-mem/01.png';
import mem4 from '../../assets/images/group/group-mem/01.png';
import mem5 from '../../assets/images/group/group-mem/01.png';
import mem6 from '../../assets/images/group/group-mem/06.png'

const memberImgs = [mem1, mem2, mem3, mem4, mem5, mem6];
const token = localStorage.getItem("token");
const isLogin = !!token;
const groups = [
  {
    id: 1,
    title: "💬 Flirty Vibes",
    description: "Where playful hearts meet & sweet convos begin. Join and vibe with singles worldwide!",
    image: img1,
    members: 12
  },
  {
    id: 2,
    title: "🌍 Global Crushes",
    description: "From Mumbai to Madrid – find flirty friends & fun convos from around the world!",
    image: img2,
    members: 12
  },
  {
    id: 3,
    title: "🎶 Music & Match",
    description: "Share your favorite romantic tracks & find your rhythm with like-minded singles!",
    image: img3,
    members: 12
  },
  {
    id: 4,
    title: "📸 Selfie Singles",
    description: "Post your cutest selfies, react, and connect with fun, flirty members instantly 💘",
    image: img4,
    members: 12
  }
];

const GroupSection = () => {
  return (
    <section className="group-section padding-tb bg-img">
      <div className="container">
        <div className="section-header">
          <h4>Recently Active Groups</h4>
          <h2>SHY-EYES ❤️ Most Loved Active Groups</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4">
            {groups.map(group => (
              <div className="col-xl-6 col-12" key={group.id}>
                <div className="group-item lab-item">
                  <div className="lab-inner d-flex flex-wrap align-items-center p-4">
                    <div className="lab-thumb me-sm-4 mb-4 mb-sm-0">
                      <img src={group.image} alt="img" />
                    </div>
                    <div className="lab-content">
                      <h4>{group.title}</h4>
                      <p>{group.description}</p>
                      <ul className="img-stack d-flex">
                        {memberImgs.map((mem, i) => (
                          <li key={i}>
                            <img src={mem} alt={`member-${i}`} />
                          </li>
                        ))}
                        <li className="bg-theme">{group.members}+</li>
                      </ul>
                      <div className="test">
                        {isLogin ? (
                          <Link to="/active-group" className="lab-btn">
                            <i className="icofont-users-alt-5"></i> View Group
                          </Link>
                        ) : (
                          <Link to="/login" className="lab-btn">
                            <i className="icofont-users-alt-5"></i> View Group
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupSection;