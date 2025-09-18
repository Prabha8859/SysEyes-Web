import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import c1 from '../../assets/images/profile/dp.png';
import c2 from '../../assets/images/profile/cover.jpg';
import g1 from '../../assets/images/group/01.jpg';
import g2 from '../../assets/images/group/02.jpg';
import g3 from '../../assets/images/group/03.jpg';
import g4 from '../../assets/images/group/04.jpg';
import g5 from '../../assets/images/group/05.jpg';
import m1 from '../../assets/images/member/01.jpg';
import m2 from '../../assets/images/member/02.jpg';
import m3 from '../../assets/images/member/03.jpg';
import m4 from '../../assets/images/member/04.jpg';
import m5 from '../../assets/images/member/05.jpg';
import m6 from '../../assets/images/member/06.jpg';
import m7 from '../../assets/images/member/07.jpg';
import m8 from '../../assets/images/member/08.jpg';
import m9 from '../../assets/images/member/09.jpg';
import m10 from '../../assets/images/member/10.jpg';
import m11 from '../../assets/images/member/11.jpg';
import m12 from '../../assets/images/member/12.jpg';
// Import additional images for widgets
import w1 from '../../assets/images/widget/01.jpg';
import w2 from '../../assets/images/widget/02.jpg';
import w3 from '../../assets/images/widget/03.jpg';
import w4 from '../../assets/images/widget/04.jpg';
import w5 from '../../assets/images/widget/05.jpg';
import w6 from '../../assets/images/widget/06.jpg';
import w7 from '../../assets/images/widget/07.jpg';
import w8 from '../../assets/images/widget/08.jpg';
import w9 from '../../assets/images/widget/09.jpg';
// Import group member images
import gm1 from '../../assets/images/group/group-mem/01.png';
import gm2 from '../../assets/images/group/group-mem/02.png';
import gm3 from '../../assets/images/group/group-mem/03.png';
import gm4 from '../../assets/images/group/group-mem/04.png';
import gm5 from '../../assets/images/group/group-mem/05.png';
import gm6 from '../../assets/images/group/group-mem/06.png';

import defaultAvatar from "../../assets/images/profile/Men-Avtar.jpg";
import { getFullImageUrl } from '../../assets/utils/getFullImageUrl';
import Profile from './Profile';
// Constants
const IMG_BASE_URL = "https://chat.bitmaxtest.com/admin/public/uploads/";
const BASE_URL = "https://chat.bitmaxtest.com/admin/api";
const TOKEN = "getToken"; // Replace with actual token (maybe from auth context/localStorage)

// Profile Header Component
// const ProfileHeader = ({ userData, onEditProfile }) => {
//   const profileImage = userData?.image_url
//     ? `${IMG_BASE_URL}${userData.image_url}`
//     : c1;

//   const coverImage = userData?.cover_image
//     ? `${IMG_BASE_URL}${userData.cover_image}`
//     : c2;

//   return (
//     <div className="profile-item">
//       <div className="profile-cover">
//         <img
//           src={coverImage}
//           alt={userData?.full_name || "profile cover"}
//           className="w-100 h-100 object-cover"
//         />
//         <div className="edit-photo custom-upload">
//           <div className="file-btn"><i className="icofont-camera"></i>Edit Photo</div>
//           <input type="file" />
//         </div>
//       </div>
//       <div className="profile-information">
//         <div className="profile-pic">
//           <img
//             src={profileImage}
//             alt="Profile"
//           />
//           <div className="custom-upload">
//             <div className="file-btn">
//               <span className="d-none d-lg-inline-block">
//                 <i className="icofont-camera"></i>Edit
//               </span>
//               <span className="d-lg-none mr-0">
//                 <i className="icofont-plus"></i>
//               </span>
//             </div>
//             <input type="file" />
//           </div>
//         </div>
//         <div className="profile-name">
//           <h4>{userData?.f_name || userData?.email}</h4>
//           <p>{userData?.status || "Offline"}</p>
//           <Link to="/edit-profile" state={{ userData }}>
//             <button className="btn btn-primary mt-2">
//               <i className="icofont-edit mr-2"></i>Edit Profile
//             </button>
//           </Link>

//         </div>
//         <ul className="profile-contact">
//           <li>
//             <a href="#">
//               <div className="icon"><i className="icofont-user"></i></div>
//               <div className="text"><p>Add Friends</p></div>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <div className="icon"><i className="icofont-envelope"></i></div>
//               <div className="text"><p>Public Message</p></div>
//             </a>
//           </li>
//           <li>
//             <a href="#">
//               <div className="icon"><i className="icofont-envelope"></i></div>
//               <div className="text"><p>Private Message</p></div>
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };
const ProfileHeader = ({ userData }) => {
  const profileImage = getFullImageUrl(userData?.image_url, c1);
  const coverImage = getFullImageUrl(userData?.cover_image, c2);

  return (
    <div className="profile-item">
      <div className="profile-cover">
        <img
          src={coverImage}
          alt={userData?.full_name || "profile cover"}
          className="w-100 h-100 object-cover"
        />
        <div className="edit-photo custom-upload">
          <div className="file-btn"><i className="icofont-camera"></i>Edit Photo</div>
          <input type="file" />
        </div>
      </div>

      <div className="profile-information">
        <div className="profile-pic">
          <img src={profileImage} alt="Profile" />
          <div className="custom-upload">
            <div className="file-btn">
              <span className="d-none d-lg-inline-block">
                <i className="icofont-camera"></i>
              </span>
              <span className="d-lg-none mr-0">
                <i className="icofont-plus"></i>
              </span>
            </div>
            <input type="file" />
          </div>
        </div>

        <div className="profile-name">
         <h4>{userData?.f_name || userData?.email}</h4>
         <h5>{userData?.about ? `${userData.about}` : 'About N/A'}</h5>

          {/* <p>{userData?.status || "Offline"}</p> */}
          <Link to="/edit-profile" state={{ userData }}>
            <button className="button">
              <i className="icofont-edit"></i>Edit Profile
            </button>
          </Link>
        </div>

        <ul className="profile-contact">
          <li><a href="#"><div className="icon"><i className="icofont-user"></i></div><div className="text"><p>Add Friends</p></div></a></li>
          {/* <li><a href="#"><div className="icon"><i className="icofont-envelope"></i></div><div className="text"><p>Public Message</p></div></a></li> */}
          <li><a href="#"><div className="icon"><i className="icofont-envelope"></i></div><div className="text"><p>Private Message</p></div></a></li>
        </ul>
      </div>
    </div>
  );
};

// Activity Tab Component
// const ActivityTab = ({ activeSubTab, setActiveSubTab }) => {
//   return (
//     <div className={`tab-pane activity-page fade show active`} id="activity" role="tabpanel">
//       <div className="row">
//         <div className="col-xl-8">
//           <article>
//             <div className="activity-tab">
//               <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
//                 <li className="nav-item" role="presentation">
//                   <button
//                     className={`nav-link ${activeSubTab === 'pills-personal' ? 'active' : ''}`}
//                     onClick={() => setActiveSubTab('pills-personal')}
//                   >
//                     <i className="icofont-user"></i> Personal
//                   </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                   <button
//                     className={`nav-link ${activeSubTab === 'pills-mentions' ? 'active' : ''}`}
//                     onClick={() => setActiveSubTab('pills-mentions')}
//                   >
//                     <i className="icofont-edit"></i> Mentions
//                   </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                   <button
//                     className={`nav-link ${activeSubTab === 'pills-favorites' ? 'active' : ''}`}
//                     onClick={() => setActiveSubTab('pills-favorites')}
//                   >
//                     <i className="icofont-heart-alt"></i> Favorites
//                   </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                   <button
//                     className={`nav-link ${activeSubTab === 'pills-friends' ? 'active' : ''}`}
//                     onClick={() => setActiveSubTab('pills-friends')}
//                   >
//                     <i className="icofont-favourite"></i> Friends
//                   </button>
//                 </li>
//                 <li className="nav-item" role="presentation">
//                   <button
//                     className={`nav-link ${activeSubTab === 'pills-groups' ? 'active' : ''}`}
//                     onClick={() => setActiveSubTab('pills-groups')}
//                   >
//                     <i className="icofont-users"></i> Groups
//                   </button>
//                 </li>
//                 <li className="custom-select">
//                   <select>
//                     <option value="1">Everything</option>
//                     <option value="2">Recent</option>
//                     <option value="3">Relevant</option>
//                     <option value="4">Popular</option>
//                   </select>
//                 </li>
//               </ul>

//               <div className="tab-content activity-content" id="pills-tabContent">
//                 <div className={`tab-pane fade ${activeSubTab === 'pills-mentions' ? 'show active' : ''}`} id="pills-mentions" role="tabpanel">
//                   <div className="post-item mb-20">
//                     <div className="post-content">
//                       <div className="post-author">
//                         <div className="post-author-inner">
//                           <div className="author-thumb">
//                             <img src={c1} alt="user profile" />
//                           </div>
//                           <div className="author-details">
//                             <h6><a href="#">William Smith</a></h6>
//                             <ul className="post-status">
//                               <li className="post-privacy"><i className="icofont-world"></i> Public</li>
//                               <li className="post-time">6 Minutes Ago</li>
//                             </ul>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="post-description">
//                         <p>Quickly deliver going forward methods info create empowerment before client-centered bandwidth. Credibly pontificate interoperable leadership skills and B2B data awesome Continually whiteboard.</p>
//                       </div>
//                     </div>
//                     <div className="post-meta">
//                       <div className="post-meta-top">
//                         <p><a href="#"><i className="icofont-like"></i> <i className="icofont-heart"></i> <i className="icofont-laughing"></i> <span>Julia, Petrova and 306 like this</span></a></p>
//                         <p><a href="#">136 Comments</a></p>
//                       </div>
//                       <div className="post-meta-bottom">
//                         <ul className="react-list">
//                           <li className="react"><a href="#"><i className="icofont-like"></i> Like</a></li>
//                           <li className="react"><a href="#"><i className="icofont-speech-comments"></i> Comment</a></li>
//                           <li className="react"><a href="#"><i className="icofont-share"></i> Share</a></li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </article>
//         </div>

//         {/* Sidebar */}
//         <div className="col-xl-4">
//           <aside className="mt-5 mt-xl-0">
//             <SearchWidget />
//             <LikeMemberWidget />
//             <ActiveGroupWidget />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

// Profile Tab Component
// const ProfileTab = ({ userData }) => {
//   return (
//     <div className={`tab-pane activity-page fade show active`} id="profile" role="tabpanel">
//       <div className="row">
//         <div className="col-xl-8">
//           <article>
//             <div className="info-card mb-20">
//               <div className="info-card-title"><h6>Base Info</h6></div>
//               <div className="info-card-content">
//                 <ul className="info-list">
//                   <li><p className="info-name">Name</p><p className="info-details">{userData?.f_name || 'N/A'}</p></li>
//                   <li><p className="info-name">I'm a</p><p className="info-details">{userData?.gender || 'N/A'}</p></li>
//                   <li><p className="info-name">Looking for a</p><p className="info-details">{userData?.looking_for || 'Money'}</p></li>
//                   <li><p className="info-name">Marital Status</p><p className="info-details">{userData?.marital_status || 'UnMarried'}</p></li>
//                   <li><p className="info-name">Age</p><p className="info-details">{userData?.age || 'N/A'}</p></li>
//                   <li><p className="info-name">Date of Birth</p><p className="info-details">{userData?.dob || 'N/A'}</p></li>
//                   <li><p className="info-name">Address</p><p className="info-details">{userData?.location || 'N/A'}</p></li>
//                   <li><p className="info-name">Bio</p><p className="info-details">{userData?.about || 'N/A'}</p></li>
//                 </ul>
//               </div>
//             </div>
//           </article>
//         </div>

//         {/* Sidebar */}
//         <div className="col-xl-4">
//           <aside className="mt-5 mt-xl-0">
//             <SearchWidget />
//             <LikeMemberWidget />
//             {/* <ActiveGroupWidget /> */}
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };

const ProfileTab = ({ userData }) => {
  return (
    <div
      className="tab-pane activity-page fade show active profile-tab"
      id="profile"
      role="tabpanel"
    >
      <div className="row">
        {/* Main Info */}
        <div className="col-xl-8 col-lg-7">
          <article>
            <div className="profile-card">
              <div className="profile-card-header">
                <h6>Base Info</h6>
              </div>
              <div className="profile-card-body">
                <ul className="profile-info-list">
                  <li>
                    <span className="info-label">Name</span>
                    <span className="info-value">{userData?.f_name || "N/A"}</span>
                  </li>
                  <li>
                    <span className="info-label">I'm a</span>
                    <span className="info-value">{userData?.gender || "N/A"}</span>
                  </li>
                  <li>
                    <span className="info-label">Looking for a</span>
                    <span className="info-value">
                      {userData?.looking_for || "Money"}
                    </span>
                  </li>
                  <li>
                    <span className="info-label">Marital Status</span>
                    <span className="info-value">
                      {userData?.marital_status || "UnMarried"}
                    </span>
                  </li>
                  <li>
                    <span className="info-label">Age</span>
                    <span className="info-value">{userData?.age || "N/A"}</span>
                  </li>
                  <li>
                    <span className="info-label">Date of Birth</span>
                    <span className="info-value">{userData?.dob || "N/A"}</span>
                  </li>
                  <li>
                    <span className="info-label">Address</span>
                    <span className="info-value">{userData?.location || "N/A"}</span>
                  </li>
                  <li>
                    <span className="info-label">Bio</span>
                    <span className="info-value">{userData?.about || "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-xl-4 col-lg-5">
          <aside className="sidebar-widgets">
            <SearchWidget />
            <LikeMemberWidget />
          </aside>
        </div>
      </div>
    </div>
  );
};

// const ProfileTab = ({ userData }) => {
  
//   // Helper: cleanly return value or fallback
//   const safeValue = (val) => (val && val !== "null" ? val : "N/A");

//   return (
//     <div className="tab-pane fade" id="profile" role="tabpanel">
//       <div className="row">
//         <div className="col-xl-8">
//           <article>
//             <div className="info-card mb-20">
//               <div className="info-card-title">
//                 <h6>Base Info</h6>
//               </div>
//               <div className="info-card-content">
//                 <ul className="info-list">
//                   <li>
//                     <p className="info-name">Name</p>
//                     <p className="info-details">{safeValue(userData?.f_name)}</p>
//                   </li>
//                   <li>
//                     <p className="info-name">I'm a</p>
//                     <p className="info-details">{safeValue(userData?.gender)}</p>
//                   </li>
//                   <li>
//                     <p className="info-name">Looking for a</p>
//                     <p className="info-details">{safeValue(userData?.looking_for)}</p>
//                   </li>
//                   <li>
//                     <p className="info-name">Marital Status</p>
//                     <p className="info-details">{safeValue(userData?.marital_status)}</p>
//                   </li>
//                   <li>
//                     <p className="info-name">Age</p>
//                     <p className="info-details">{safeValue(userData?.age)}</p>
//                   </li>
//                   <li>
//                     <p className="info-name">Date of Birth</p>
//                     <p className="info-details">{safeValue(userData?.dob)}</p>
//                   </li>
//                   <li>
//                     <p className="info-name">Address</p>
//                     <p className="info-details">{safeValue(userData?.address)}</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </article>
//         </div>

//         {/* Sidebar */}
//         <div className="col-xl-4">
//           <aside className="mt-5 mt-xl-0">
            // <SearchWidget />
//             <LikeMemberWidget />
//             <ActiveGroupWidget />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// };



// Friends Tab Component
const FriendsTab = ({ friends }) => {
  return (
    <div className={`tab-pane activity-page fade show active`} id="friends" role="tabpanel">
      <div className="row">
        <div className="col-xl-8">
          <article>
            <div className="row gy-4 gx-3 justify-content-center">
              {friends.map(friend => (
                <div key={friend.id} className="col-lg-3 col-md-4 col-6">
                  <div className="lab-item member-item style-1">
                    <div className="lab-inner">
                      <div className="lab-thumb">
                        <img src={friend.image} alt="member-img" />
                      </div>
                      <div className="lab-content">
                        <h6><a href="#">{friend.name}</a></h6>
                        <p>Active {friend.active}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-xl-4">
          <aside className="mt-5 mt-xl-0">
            <SearchWidget />
            <LikeMemberWidget />
            {/* <ActiveGroupWidget /> */}
          </aside>
        </div>
      </div>
    </div>
  );
};

// Groups Tab Component
const GroupsTab = ({ groups }) => {
    console.log("GroupsTab groups:", groups); // Debugging line
  const groupMemberImages = [gm1, gm2, gm3, gm4, gm5, gm6];

  return (
    <div className={`tab-pane activity-page fade show active`} id="groups" role="tabpanel">
      <div className="row">
        <div className="col-xl-8">
          <article>
            <div className="row gy-3">
              {groups.map(group => (
                <div key={group.id} className="col-12">
                  <div className="group-item lab-item style-1">
                    <div className="lab-inner d-flex flex-wrap align-items-center p-4">
                      <div className="lab-thumb me-md-4 mb-4 mb-md-0">
                        <img src={group.image} alt="group" />
                      </div>
                      <div className="lab-content">
                        <h4>{group.name}</h4>
                        <p>Collaboratively innovate compelling mindshare after prospective partnerships</p>
                        <ul className="img-stack d-flex">
                          {groupMemberImages.map((image, i) => (
                            <li key={i}><img src={image} alt="group member" /></li>
                          ))}
                          <li className="bg-theme">{group.members}+</li>
                        </ul>
                        <div className="test">
                          <a href="profile.html" className="lab-btn">
                            <i className="icofont-users-alt-5"></i> View Group
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-xl-4">
          <aside className="mt-5 mt-xl-0">
            <SearchWidget />
            <LikeMemberWidget />
            {/* <ActiveGroupWidget /> */}
          </aside>
        </div>
      </div>
    </div>
  );
};

// Photos Tab Component
// const PhotosTab = () => {
//     // ✅ Fetch images on mount
//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch all images
//   const fetchImages = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}/images`, {
//         headers: { Authorization: `Bearer ${TOKEN}` },
//       });

//       if (res.data.success) {
//         setPhotos(res.data.images || []); // adjust if API response differs
//       }
//     } catch (err) {
//       console.error("Error fetching images:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Upload image
//   const handleUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await axios.post(`${BASE_URL}/images/upload`, formData, {
//         headers: {
//           Authorization: `Bearer ${TOKEN}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.data.success) {
//         // push new image into state
//         setPhotos((prev) => [...prev, res.data.image]);
//       }
//     } catch (err) {
//       console.error("Error uploading image:", err);
//     }
//   };

//   // ✅ Delete image
//   const handleDelete = async (id) => {
//     try {
//       const res = await axios.delete(`${BASE_URL}/images/${id}`, {
//         headers: { Authorization: `Bearer ${TOKEN}` },
//       });

//       if (res.data.success) {
//         setPhotos((prev) => prev.filter((p) => p.id !== id));
//       }
//     } catch (err) {
//       console.error("Error deleting image:", err);
//     }
//   };


//   return (
//     <div
//       className="tab-pane activity-page fade show active"
//       style={{ backgroundColor: "red" }}
//       id="photos"
//       role="tabpanel"
//     >
//       <div className="photo-title text-center border-radius-2 bg-white p-1 mb-4">
//         <h3 className="mb-0">All Uploaded Pictures</h3>
//       </div>

//       {/* Upload input */}
//       <div className="text-center mb-3">
//         <input type="file" onChange={handleUpload} />
//       </div>

//       {loading ? (
//         <p className="text-center">Loading images...</p>
//       ) : (
//         <div className="row g-3 g-lg-4 justify-content-center row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
//           {photos.map((photo) => (
//             <div key={photo.id} className="col">
//               <div className="gallery-img position-relative">
//                 <img
//                   src={photo.url} // assuming API returns image URL
//                   alt="gallery"
//                   className="rounded w-100"
//                 />
//                 <button
//                   className="btn btn-sm btn-danger position-absolute top-0 end-0"
//                   onClick={() => handleDelete(photo.id)}
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="load-btn text-center mt-3">
//         <button className="lab-btn" onClick={fetchImages}>
//           Reload <i className="icofont-spinner"></i>
//         </button>
//       </div>
//     </div>
//   );
// };

// Media Tab Component
const MediaTab = async () => {
  return (
    <div className={`tab-pane activity-page fade show active`} id="media" role="tabpanel">
      <div className="row">
        <div className="col-xl-8">
          <article>
            <div className="media-wrapper">
              <h3>Media Gallery</h3>
              <p>Media content would be displayed here</p>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="col-xl-4">
          <aside className="mt-5 mt-xl-0">
            <SearchWidget />
            <LikeMemberWidget />
            {/* <ActiveGroupWidget /> */}
          </aside>
        </div>
      </div>
    </div>
  );
};

// Reusable Widget Components
const SearchWidget = () => {
  return (
    <div className="widget search-widget">
      <div className="widget-inner">
        <div className="widget-title"><h5>Filter Search Member</h5></div>
        <div className="widget-content">
          <p>Serious Dating With Shy-Eyes Your Perfect Match is Just a Click Away.</p>
          <form className="banner-form">
            <div className="gender">
              <div className="custom-select right w-100">
                <select>
                  <option value="0">I am a</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Others</option>
                </select>
              </div>
            </div>
            <button className="">Find Your Partner</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const LikeMemberWidget = () => {
  const widgetImages = [w1, w2, w3, w4, w5, w6, w7, w8, w9];

  return (
    <div className="widget like-member">
      <div className="widget-inner">
        <div className="widget-title"><h5>you may like</h5></div>
        <div className="widget-content">
          <div className="row row-cols-3 row-cols-sm-auto g-3">
            {widgetImages.map((image, i) => (
              <div key={i} className="col">
                <div className="image-thumb">
                  <a href="#">
                    <img src={image} alt="potential match" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// const ActiveGroupWidget = () => {
//   const groupMemberImages = [gm1, gm2, gm3, gm4, gm5, gm6];

//   return (
//     <div className="widget active-group">
//       <div className="widget-inner">
//         <div className="widget-title"><h5>join the group</h5></div>
//         <div className="widget-content">
//           <div className="group-item lab-item">
//             <div className="lab-inner d-flex flex-wrap align-items-center">
//               <div className="lab-content w-100">
//                 <h6>Active Group A1</h6>
//                 <p>Collaboratively fabricate best breed and applications through visionary</p>
//                 <ul className="img-stack d-flex">
//                   {groupMemberImages.map((image, i) => (
//                     <li key={i}><img src={image} alt="group member" /></li>
//                   ))}
//                   <li className="bg-theme">12+</li>
//                 </ul>
//                 <div className="test">
//                   <a href="profile.html" className="lab-btn">
//                     <i className="icofont-users-alt-5"></i> View Group
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Main ProfilePage Component
const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const passedData = location.state?.userData;

  const [activeTab, setActiveTab] = useState("profile");
  const [activeSubTab, setActiveSubTab] = useState("pills-mentions");

  // Memoize user data to prevent unnecessary re-renders
const userData = useMemo(() => {
  // ✅ Helper to safely handle backend nulls and images
  const safeImage = (img) => (img && img !== "null" ? img : defaultAvatar);

  return {
    ...passedData,

    friends: [
      { id: 1, name: "Jenifer Guido", image: safeImage(m1), active: "1 Day" },
      { id: 2, name: "Andrea Guido", image: safeImage(m2), active: "2 Day" },
      { id: 3, name: "Anna Hawk", image: safeImage(m3), active: "5 Day" },
      { id: 4, name: "Andreas Adam", image: safeImage(m4), active: "4 Day" },
      { id: 5, name: "Alaina T", image: safeImage(m5), active: "1 Day" },
      { id: 6, name: "Aron Smith", image: safeImage(m6), active: "3 Day" },
      { id: 7, name: "Helen Gomz", image: safeImage(m7), active: "3 Day" },
      { id: 8, name: "Andrez Jr", image: safeImage(m8), active: "5 Day" },
      { id: 9, name: "Ladiga Guido", image: safeImage(m9), active: "5 Day" },
      { id: 10, name: "Andrea Guido", image: safeImage(m10), active: "1 Day" },
      { id: 11, name: "Jene Aiko", image: safeImage(m11), active: "4 Day" },
      { id: 12, name: "Jhon Cena", image: safeImage(m12), active: "2 Day" },
    ],

    groups: [
      { id: 1, name: "Active Group A1", image: safeImage(g1), members: 12 },
      { id: 2, name: "Active Group A2", image: safeImage(g2), members: 16 },
      { id: 3, name: "Active Group A3", image: safeImage(g3), members: 8 },
      { id: 4, name: "Active Group A4", image: safeImage(g4), members: 20 },
      { id: 5, name: "Active Group A5", image: safeImage(g5), members: 15 },
    ],

    photos: [
      safeImage(m1),
      safeImage(m2),
      safeImage(m3),
      safeImage(m4),
      safeImage(m5),
      safeImage(m6),
      safeImage(m7),
      safeImage(m8),
      safeImage(m9),
      safeImage(m10),
      safeImage(m11),
      safeImage(m12),
    ],
  };
}, [passedData]);

  // Handle edit profile navigation
  const handleEditProfile = useCallback(() => {
    navigate('/edit-profile', { state: { userData } });
  }, [navigate, userData]);

  const renderTabContent = useCallback(() => {
    switch (activeTab) {
      // case 'activity':
      //   return <ActivityTab activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />;
      case 'profile':
        return <ProfileTab userData={userData} />;
      case 'friends':
        return <FriendsTab friends={userData.friends} />;
      // case 'groups':
      //   return <GroupsTab groups={userData.groups} />;
      case 'photos':
        return <PhotosTab photos={userData.photos} />;
      // case 'media':
      //   return <MediaTab />;
      default:
        return <ProfileTab activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />;
    }
  }, [activeTab, activeSubTab, userData]);

  return (
    <>
      {/* Page Header Section */}
      <section className="page-header-section style-1 bg-pink">
        <div className="container">
          <div className="page-header-content">
            <div className="page-header-inner">
              <div className="page-title">
                <h2>Member Single Profile</h2>
              </div>
              <ol className="breadcrumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">{userData.f_name || userData.email}</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="profile-section padding-tb bg-ash">
        <div className="container">
          <div className="section-wrapper">
            <div className="member-profile">
              {/* Profile Header */}
              <ProfileHeader userData={userData} onEditProfile={handleEditProfile} />

              {/* Profile Navigation */}
              <div className="profile-details">
                <nav className="profile-nav">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                      onClick={() => setActiveTab('activity')}
                    >
                      Activity
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                      onClick={() => setActiveTab('profile')}
                    >
                      Profile
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'friends' ? 'active' : ''}`}
                      onClick={() => setActiveTab('friends')}
                    >
                      Friends <span className="item-number">{userData.friends.length}</span>
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'groups' ? 'active' : ''}`}
                      onClick={() => setActiveTab('groups')}
                    >
                      Groups <span className="item-number">{userData.groups.length}</span>
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`}
                      onClick={() => setActiveTab('photos')}
                    >
                      Photos
                    </button>
                    <button
                      className={`nav-link ${activeTab === 'media' ? 'active' : ''}`}
                      onClick={() => setActiveTab('media')}
                    >
                      Media <span className="item-number">35</span>
                    </button>
                    <div className="dropdown">
                      <a className="btn dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" href="#">Activity</a></li>
                        <li><a className="dropdown-item" href="#">Privacy</a></li>
                        <li><a className="dropdown-item" href="#">Block user</a></li>
                      </ul>
                    </div>
                  </div>
                </nav>

                {/* Tab Content */}
                <div className="tab-content" id="nav-tabContent">
                  {renderTabContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;